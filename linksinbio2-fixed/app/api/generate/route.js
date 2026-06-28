import clientPromise from "@/lib/mongodb";
import { getSession } from "@/lib/getSession";

export async function POST(request) {
    // ✅ Login check - bina login ke nahi chalega
    const session = await getSession();
    if (!session) {
        return Response.json({ success: false, error: true, message: 'Pehle login karein. Bittree sirf logged-in users create kar sakte hain.' });
    }

    const body = await request.json();
    const userEmail = session?.user?.email;

    const client = await clientPromise;
    const db = client.db("bittree");
    const collection = db.collection("links");

    // Handle already claimed check
    const doc = await collection.findOne({ handle: body.handle });
    if (doc) {
        return Response.json({ success: false, error: true, message: 'Yeh handle already liya ja chuka hai. Koi aur handle try karein.', result: null });
    }

    // ✅ User ka email bhi save karo taake baad mein uski bittree dhundh sakein
    const result = await collection.insertOne({ ...body, userEmail, createdAt: new Date() });

    return Response.json({ success: true, error: false, message: 'Aapki BitTree ban gayi! Mubarak ho! 🎉', result: result });
}

// ✅ User ki apni bittree fetch karne ke liye
export async function GET(request) {
    const session = await getSession();
    if (!session) {
        return Response.json({ success: false, message: 'Login karein pehle.' });
    }

    const userEmail = session?.user?.email;
    const client = await clientPromise;
    const db = client.db("bittree");
    const collection = db.collection("links");

    const userBittrees = await collection.find({ userEmail }).toArray();

    return Response.json({ success: true, bittrees: userBittrees });
}
