import { NextResponse } from "next/server";

export async function GET(req) {
    // 👉 direct home redirect
    const response = NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/`
    );

    // 👉 local cookie delete
    response.cookies.set("access_token", "", {
        httpOnly: true,
        expires: new Date(0),
        path: "/",
    });

    return response;
}