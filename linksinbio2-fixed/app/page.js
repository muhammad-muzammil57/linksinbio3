"use client"
export const dynamic = "force-dynamic";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const [text, setText] = useState("")

  const createTree = () => {
    if (text.trim()) {
      router.push(`/generate?handle=${encodeURIComponent(text.trim())}`)
    } else {
      router.push(`/generate`)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') createTree();
  }

  const ClaimSection = ({ bgClass, textClass = "text-yellow-300" }) => (
    <div className="flex flex-col md:flex-row gap-2 pt-6 md:pt-10">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="px-4 py-3 rounded-xl bg-amber-50 w-full md:w-64 focus:outline-green-600"
        type="text"
        placeholder="Apna handle likho..."
      />
      <button
        onClick={createTree}
        className="bg-pink-400 hover:bg-pink-500 transition rounded-full px-6 py-3 font-bold text-white shadow-lg"
      >
        Claim Your Bittree
      </button>
    </div>
  );

  return (
    <main>
      {/* Section 1 */}
      <section className="bg-[#254f1a] min-h-screen grid grid-cols-1 md:grid-cols-2 px-4">
        <div className="flex justify-center flex-col md:ml-[10vw] gap-4 pt-32 md:pt-0">
          <p className="text-yellow-300 font-bold text-3xl md:text-6xl">Everything you are. In one, simple link in bio.</p>
          <p className="text-yellow-300 text-base md:text-xl">Join 70M+ people using Bittree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
          <ClaimSection />
        </div>
        <div className="flex items-center justify-center pt-10 md:pt-0 pb-10">
          <img className="w-full max-w-sm md:max-w-md" src="/home.png" alt="Bittree preview" />
        </div>
      </section>

      {/* Section 2 */}
      <section className="bg-[#2665d6] min-h-screen grid grid-cols-1 md:grid-cols-2 px-4">
        <div className="flex items-center justify-center pt-10 pb-10">
          <img className="w-full max-w-sm md:max-w-md" src="/home1.jpg" alt="Customize" />
        </div>
        <div className="flex justify-center flex-col gap-4 pt-10 md:pt-0">
          <p className="text-yellow-300 font-bold text-3xl md:text-6xl">Apni Bittree minutes mein banao aur customize karo</p>
          <p className="text-yellow-300 text-base md:text-xl">Apni saari social media, websites, stores aur bhi kai cheezein ek link mein connect karo. Apni marzi se customize karo ya Bittree khud aapke brand ke mutabiq banaye.</p>
          <ClaimSection />
        </div>
      </section>

      {/* Section 3 */}
      <section className="bg-[#780016] min-h-screen grid grid-cols-1 md:grid-cols-2 px-4">
        <div className="flex justify-center flex-col md:ml-[10vw] gap-4 pt-10 md:pt-0">
          <p className="text-yellow-300 font-bold text-2xl md:text-5xl">Apni Bittree kahi bhi share karo!</p>
          <p className="text-yellow-300 text-base md:text-xl">Apna unique Bittree URL tamam platforms par add karo jahan aapke followers hain. QR code se offline traffic ko bhi apne link in bio par lao.</p>
          <ClaimSection />
        </div>
        <div className="flex items-center justify-center pt-10 pb-10">
          <img className="w-full max-w-sm md:max-w-md" src="/home2.jpg" alt="Share" />
        </div>
      </section>

      {/* Section 4 */}
      <section className="bg-[#e8efd6] min-h-screen grid grid-cols-1 md:grid-cols-2 px-4">
        <div className="flex items-center justify-center pt-10 pb-10">
          <img className="w-full max-w-sm md:max-w-md" src="/home3.jpg" alt="Analytics" />
        </div>
        <div className="flex justify-center flex-col gap-4 pt-10 md:pt-0">
          <p className="text-black font-bold text-3xl md:text-6xl">Apne audience ko samjho aur engaged rakho</p>
          <p className="text-black text-base md:text-xl">Apne links ke clicks track karo, audience ka behavior samjho aur apni content strategy improve karo.</p>
          <ClaimSection />
        </div>
      </section>

      {/* Footer Section */}
      <section className="bg-[#502274] min-h-screen px-4 py-10 relative">
        <div className="flex flex-col items-center gap-4 pt-20 md:pt-32 relative z-10">
          <p className="text-pink-300 font-bold text-3xl md:text-5xl text-center">Aaj hi apna internet ka corner shuru karo</p>

          <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center w-full max-w-lg">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="px-4 py-3 rounded-xl bg-amber-50 w-full focus:outline-green-600"
              type="text"
              placeholder="Apna handle likho..."
            />
            <button
              onClick={createTree}
              className="bg-[#d2e823] rounded-full px-6 py-3 font-bold cursor-pointer hover:bg-yellow-300 transition"
            >
              Claim Your Bittree
            </button>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="mt-16 bg-white rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm max-w-4xl mx-auto">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg mb-1">Company</h3>
            <a href="/" className="text-gray-600 hover:text-gray-900">The BitTree Blog</a>
            <a href="/" className="text-gray-600 hover:text-gray-900">Engineering Blog</a>
            <a href="/" className="text-gray-600 hover:text-gray-900">Marketplace</a>
            <a href="/" className="text-gray-600 hover:text-gray-900">About</a>
            <a href="/" className="text-gray-600 hover:text-gray-900">Careers</a>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg mb-1">Community</h3>
            <a href="/" className="text-gray-600 hover:text-gray-900">BitTree for Enterprise</a>
            <a href="/" className="text-gray-600 hover:text-gray-900">2026 Creator Report</a>
            <a href="/" className="text-gray-600 hover:text-gray-900">Charities</a>
            <a href="/" className="text-gray-600 hover:text-gray-900">Explore Templates</a>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg mb-1">Support</h3>
            <a href="/" className="text-gray-600 hover:text-gray-900">Help Topics</a>
            <a href="/" className="text-gray-600 hover:text-gray-900">Getting Started</a>
            <a href="/" className="text-gray-600 hover:text-gray-900">Bittree Pro</a>
            <a href="/" className="text-gray-600 hover:text-gray-900">FAQs</a>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg mb-1">Trust & Legal</h3>
            <a href="/" className="text-gray-600 hover:text-gray-900">Terms & Conditions</a>
            <a href="/" className="text-gray-600 hover:text-gray-900">Privacy Notice</a>{/* ✅ Spelling fix */}
            <a href="/" className="text-gray-600 hover:text-gray-900">Cookie Notice</a>
            <a href="/" className="text-gray-600 hover:text-gray-900">Trust Center</a>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-10">
          <a href="https://www.tiktok.com/@muzammilcoder" target="_blank" rel="noopener noreferrer">
            <button className="bg-black rounded-full p-4 hover:scale-110 transition">
              <img src="tiktok.svg" className="w-5 h-5" alt="TikTok" />
            </button>
          </a>
          <a href="https://www.instagram.com/muzammilcoder" target="_blank" rel="noopener noreferrer">
            <button className="bg-black rounded-full p-4 hover:scale-110 transition">
              <img src="instagram.svg" className="w-5 h-5" alt="Instagram" />
            </button>
          </a>
        </div>

        {/* Flags */}
        <div className="flex items-center justify-center gap-10 mt-10 mb-6">
          <img className="w-28" src="pakistanflag.svg" alt="Pakistan Flag" />
          <img className="w-24" src="azadflag.svg" alt="Azad Flag" />
        </div>

        <div className="flex items-center justify-center text-center max-w-2xl mx-auto">
          <p className="font-bold text-white text-sm">
            Bittree Pty Ltd (ABN 68 608 721 562), Bahria Town, Islamabad
          </p>
        </div>
      </section>
    </main>
  );
}
