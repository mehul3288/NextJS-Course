import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({ message: "Upload API GET success" });
}

export async function POST(request: Request) {
  return NextResponse.json({ message: "Upload API POST success" });
}