// Import necessary modules
import { connectDb } from "@/app/lib/connectdb";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Define your POST handler
export async function POST(req) {
  try {
    await connectDb(); // Connect to MongoDB

    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are necessary" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with a generated userId
    const userId =
      Math.random().toString(36).substring(2, 9) +
      Math.random().toString(36).substring(2, 9);

    // Save the new user to MongoDB
    await User.create({
      userId,
      name,
      email,
      password: hashedPassword,
    });
    console.log("User created successfully:", { name, email, userId }); // Log success

    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error); // Log any errors that occur
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
