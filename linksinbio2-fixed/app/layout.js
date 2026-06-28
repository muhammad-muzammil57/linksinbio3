import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/getSession";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "BitTree - Apni saari links ek jagah",
  description: "BitTree se apna link in bio banao — bilkul free",
};

export default async function RootLayout({ children }) {
  const session = await getSession();
  // ✅ session.email use karo - normalized field
  const email = session?.email || null;
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar email={email} />
        {children}
      </body>
    </html>
  );
}
