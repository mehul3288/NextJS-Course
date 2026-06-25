import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({ message: "Bookmarks API GET success" });
}

export async function POST(request: Request) {
  return NextResponse.json({ message: "Bookmarks API POST success" });
}