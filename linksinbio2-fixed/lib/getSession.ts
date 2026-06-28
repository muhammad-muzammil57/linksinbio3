import { cookies } from "next/headers";

type TokenPayload = {
  sub: string
}

export async function getSession() {
  // ✅ Build time par env vars nahi hote - safely return null
  if (!process.env.SCALEKIT_ENVIRONMENT_URL) {
    return null;
  }

  try {
    const session = await cookies();
    const token = session.get("access_token")?.value;
    if (!token) return null;

    // Dynamic import taake build time par module load na ho
    const { getScalekit } = await import("./scalekit");
    const scalekit = getScalekit();

    const result: TokenPayload = await scalekit.validateToken(token);
    const user = await scalekit.user.getUser(result.sub);
    return user;

  } catch (error) {
    console.log("Session error:", error);
    return null;
  }
}
