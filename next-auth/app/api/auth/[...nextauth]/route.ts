// import { NextResponse } from "next/server";

import { authOptions } from "@/app/lib/auth";
import NextAuth from "next-auth";

// export function GET(){
//     return NextResponse.json({
//         message:"Hello"
//     })
// }

const handler=NextAuth(authOptions)

export {handler as GET, handler as POST}