"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import TicketCard from "../components/TicketCard";
import { useRouter } from "next/navigation";
import Nav from "../components/Nav";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);
  useEffect(() => {
    const getTickets = async () => {
      try {
        const res = await fetch("/api/Tickets", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch tickets");
        }

        const data = await res.json();
        setTickets(data.tickets || []);
      } catch (error) {
        console.log("Error loading tickets: ", error);
      }
    };

    getTickets();
  }, []);

  if (!tickets.length) {
    return <p>No tickets.</p>;
  }

  const uniqueCategories = [
    ...new Set(tickets.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      <Nav /> {/* Ensure Nav component is included */}
      <div>
        {uniqueCategories.map((uniqueCategory, categoryIndex) => (
          <div key={categoryIndex} className="mb-4">
            <h2>{uniqueCategory}</h2>
            <div className="lg:grid grid-cols-2 xl:grid-cols-4">
              {tickets
                .filter((ticket) => ticket.category === uniqueCategory)
                .map((filteredTicket, index) => (
                  <TicketCard key={index} ticket={filteredTicket} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
