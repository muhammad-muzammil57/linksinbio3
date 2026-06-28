import { cookies } from "next/headers";

export async function getSession() {
  if (!process.env.SCALEKIT_ENVIRONMENT_URL) return null;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    if (!token) return null;

    const { getScalekit } = await import("./scalekit");
    const scalekit = getScalekit();

    // Token validate karo - sub = user ID milega
    const payload = await scalekit.validateToken(token) as { sub: string };
    if (!payload?.sub) return null;

    // User details fetch karo
    const user = await scalekit.user.getUser(payload.sub);
    if (!user) return null;

    // ✅ Normalized session return karo - email multiple jagah ho sakta hai
    const email =
      user?.email ||
      user?.primaryEmail ||
      user?.emails?.[0]?.email ||
      user?.profile?.email ||
      null;

    return { user, email };

  } catch (error) {
    console.error("getSession error:", error);
    return null;
  }
}
