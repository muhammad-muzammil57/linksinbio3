import { NextResponse } from "next/server";

const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`;

export async function GET(req) {
  try {
    const { getScalekit } = await import("@/lib/scalekit");
    const scalekit = getScalekit();
    const url = scalekit.getAuthorizationUrl(redirectUri);
    return NextResponse.redirect(url);
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Login unavailable. Check env vars." }, { status: 500 });
  }
}
