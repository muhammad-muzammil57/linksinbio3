import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const handle = (await params).handle
    const client = await clientPromise;
    const db = client.db("bittree")
    const collection = db.collection("links")

    const item = await collection.findOne({ handle: handle })
    if (!item) {
        return notFound()
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-purple-600 to-purple-900 justify-center items-start py-16 px-4">
            <div className="w-full max-w-md">
                {/* Profile Card */}
                <div className="flex flex-col items-center gap-4 mb-8">
                    {item.pic && (
                        <img
                            className="rounded-full w-24 h-24 object-cover border-4 border-white shadow-xl"
                            src={item.pic}
                            alt={`@${item.handle}`}
                        />
                    )}
                    <h1 className="font-bold text-2xl text-white">@{item.handle}</h1>
                    {item.desc && (
                        <p className="text-purple-200 text-center text-sm max-w-xs leading-relaxed">
                            {item.desc}
                        </p>
                    )}
                </div>

                {/* Links */}
                <div className="flex flex-col gap-3">
                    {item.links.map((linkItem, index) => (
                        <a
                            key={index}
                            href={linkItem.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                        >
                            <div className="bg-white/90 backdrop-blur py-4 px-6 rounded-2xl shadow-lg flex justify-center items-center font-semibold text-gray-800 hover:bg-white hover:scale-[1.02] transition-all duration-200 group-hover:shadow-xl">
                                {linkItem.linktext}
                            </div>
                        </a>
                    ))}
                </div>

                {/* Footer branding */}
                <div className="text-center mt-10">
                    <Link href="/" className="text-purple-300 text-xs hover:text-white transition">
                        🌳 BitTree par apna link page banao — Free mein!
                    </Link>
                </div>
            </div>
        </div>
    )
}
