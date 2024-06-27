import Ticket from "../../../models/Ticket";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { skuID } = params;
    const foundTicket = await Ticket.findOne({ _id: skuID });

    if (!foundTicket) {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ foundTicket }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { skuID } = params;
    const ticketData = req.body; // Assuming the request body contains the updated ticket data

    const updatedTicket = await Ticket.findByIdAndUpdate(skuID, ticketData, {
      new: true,
    });

    if (!updatedTicket) {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Ticket updated", updatedTicket },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { skuID } = params;

    const deletedTicket = await Ticket.findByIdAndDelete(skuID);

    if (!deletedTicket) {
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Ticket deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
