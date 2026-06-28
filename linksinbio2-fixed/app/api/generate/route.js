import clientPromise from "@/lib/mongodb";
import { getSession } from "@/lib/getSession";

export async function POST(request) {
  try {
    // Login check
    const session = await getSession();
    if (!session) {
      return Response.json(
        { success: false, error: true, message: 'Pehle login karein. Bittree sirf logged-in users create kar sakte hain.' },
        { status: 401 }
      );
    }

    // Body parse karo
    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json(
        { success: false, error: true, message: 'Request data theek nahi hai.' },
        { status: 400 }
      );
    }

    if (!body?.handle) {
      return Response.json(
        { success: false, error: true, message: 'Handle zaroori hai.' },
        { status: 400 }
      );
    }

    // ✅ Email correctly nikalo - normalized session se
    const userEmail = session.email || null;

    // MongoDB connect
    const client = await clientPromise;
    const db = client.db("bittree");
    const collection = db.collection("links");

    // Handle already liya hua check
    const existing = await collection.findOne({ handle: body.handle });
    if (existing) {
      return Response.json(
        { success: false, error: true, message: 'Yeh handle already liya ja chuka hai. Koi aur handle try karein.' },
        { status: 409 }
      );
    }

    // Save karo
    const result = await collection.insertOne({
      handle: body.handle,
      links: body.links || [],
      pic: body.pic || '',
      desc: body.desc || '',
      userEmail,
      createdAt: new Date()
    });

    return Response.json({
      success: true,
      error: false,
      message: 'Aapki BitTree ban gayi! Mubarak ho! 🎉',
      result: { insertedId: result.insertedId.toString() }
    });

  } catch (error) {
    console.error("POST /api/generate error:", error);
    return Response.json(
      { success: false, error: true, message: 'Server error aa gaya. Dobara try karein.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return Response.json({ success: false, bittrees: [], message: 'Login karein pehle.' });
    }

    const userEmail = session.email || null;
    if (!userEmail) {
      return Response.json({ success: true, bittrees: [] });
    }

    const client = await clientPromise;
    const db = client.db("bittree");
    const collection = db.collection("links");

    const userBittrees = await collection
      .find({ userEmail })
      .project({ handle: 1, pic: 1, createdAt: 1, _id: 0 })
      .toArray();

    return Response.json({ success: true, bittrees: userBittrees });

  } catch (error) {
    console.error("GET /api/generate error:", error);
    return Response.json(
      { success: false, bittrees: [], message: 'Server error.' },
      { status: 500 }
    );
  }
}
