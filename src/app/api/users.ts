import { connectDB } from "@/utils/mongodb";
import { User } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  await connectDB();

  try {
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Error getting users" }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  await connectDB();

  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
};
