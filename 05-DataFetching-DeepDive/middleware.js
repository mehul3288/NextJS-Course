import { NextResponse } from "next/server";

export function middleware(request){
    console.log(request);
    
    return NextResponse.next(); //this will continue the request to go to it main destination after we have do some operation on it like adding the auth token for e.g.
    // return NextResponse.redirect();
}

export const config={
    matcher:"/news"
}