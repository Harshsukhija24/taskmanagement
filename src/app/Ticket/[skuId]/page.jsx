"use client";

import { useSession } from "next-auth/react";
import EditTicketForm from "../../components/Editticket";
import { useRouter } from "next/navigation"; // Corrected import statement

const GetTicketById = async (skuId, session) => {
  const router = useRouter();

  if (!session) {
    router.push("/Login");
    return null;
  }

  try {
    const res = await fetch(`/api/Tickets/${skuId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch ticket");
    }

    return res.json();
  } catch (error) {
    console.log("Error fetching ticket:", error);
    return null; // Return null or handle error as needed
  }
};

const TicketPage = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const skuId = params.skuId; // Assuming skuId is the parameter name

  const updateTicketData = {
    _id: skuId,
  };

  return <EditTicketForm ticket={updateTicketData} />;
};

export default TicketPage;
