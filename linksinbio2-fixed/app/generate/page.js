"use client"
import React, { useState, Suspense } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams, useRouter } from 'next/navigation';

function GenerateContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [links, setLinks] = useState([{ link: "", linktext: "" }]);
  const [handle, setHandle] = useState(searchParams.get('handle') || "");
  const [pic, setPic] = useState("");
  const [desc, setdesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (index, link, linktext) => {
    setLinks(prevLinks =>
      prevLinks.map((item, i) => (i === index ? { link, linktext } : item))
    );
  };

  const addLink = () => {
    setLinks(prevLinks => [...prevLinks, { link: "", linktext: "" }]);
  };

  const removeLink = (index) => {
    if (links.length === 1) return; // kam se kam ek link zaroori
    setLinks(prevLinks => prevLinks.filter((_, i) => i !== index));
  };

  const submitLinks = async () => {
    // ✅ Basic validation
    if (!handle.trim()) {
      toast.error("Handle enter karein");
      return;
    }
    if (!pic.trim()) {
      toast.error("Profile picture link enter karein");
      return;
    }
    if (!links[0].linktext.trim() || !links[0].link.trim()) {
      toast.error("Kam se kam ek link zaroori hai");
      return;
    }

    setLoading(true);
    const raw = JSON.stringify({ links, handle: handle.trim(), pic, desc });

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: raw
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        setTimeout(() => router.push(`/${handle.trim()}`), 1500);
        setLinks([{ link: "", linktext: "" }]);
        setPic("");
        setHandle("");
      } else if (response.status === 401 || result.message?.includes('login')) {
        toast.error("Pehle login karein!");
        setTimeout(() => window.location.href = "/api/auth/login", 1500);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Kuch masla aa gaya. Dobara try karein.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !pic || !handle || !links[0].linktext || !links[0].link || loading;

  return (
    <div className='bg-[#254f1a] min-h-screen overflow-hidden grid grid-cols-1 lg:grid-cols-2'>

      {/* Left Form Section */}
      <div className='col1 flex justify-center items-center flex-col overflow-y-auto p-8'>
        <h1 className='pt-24 lg:pt-28 font-bold text-4xl text-yellow-300'>
          Create Your Bittree
        </h1>

        <div className='flex flex-col gap-5 my-8 w-full max-w-lg'>

          {/* Step 1 */}
          <h2 className='font-bold text-2xl text-white flex items-center gap-2'>
            <span className='bg-yellow-300 text-black rounded-full w-8 h-8 flex items-center justify-center text-base'>1</span>
            Handle chunein
          </h2>
          <input
            value={handle}
            onChange={e => setHandle(e.target.value)}
            className='bg-amber-50 px-4 py-4 focus:outline-green-600 rounded-2xl'
            type='text'
            placeholder='jaise: muzammil123'
          />

          {/* Step 2 */}
          <h2 className='font-bold text-2xl text-white flex items-center gap-2 mt-2'>
            <span className='bg-yellow-300 text-black rounded-full w-8 h-8 flex items-center justify-center text-base'>2</span>
            Apne links shamil karein
          </h2>

          {Array.isArray(links) && links.map((item, index) => (
            <div key={index} className='flex flex-col md:flex-row gap-3 mb-1 items-center'>
              <input
                value={item.linktext}
                onChange={e => handleChange(index, item.link, e.target.value)}
                className='bg-amber-50 px-4 py-3 focus:outline-green-600 rounded-2xl flex-1'
                type='text'
                placeholder='Link ka naam (jaise: YouTube)'
              />
              <input
                value={item.link}
                onChange={e => handleChange(index, e.target.value, item.linktext)}
                className='bg-amber-50 px-4 py-3 focus:outline-green-600 rounded-2xl flex-1'
                type='url'
                placeholder='https://...'
              />
              {links.length > 1 && (
                <button
                  onClick={() => removeLink(index)}
                  className='text-red-300 hover:text-red-100 font-bold text-xl px-2'
                  title="Link hatao"
                >✕</button>
              )}
            </div>
          ))}

          <button
            onClick={addLink}
            className='w-auto self-start px-6 py-2 cursor-pointer rounded-full text-lg bg-purple-300 text-white font-bold mt-1 hover:bg-purple-400 transition'
          >
            + Link Add Karein
          </button>

          {/* Step 3 */}
          <h2 className='font-bold text-2xl text-white flex items-center gap-2 mt-2'>
            <span className='bg-yellow-300 text-black rounded-full w-8 h-8 flex items-center justify-center text-base'>3</span>
            Profile details
          </h2>

          <input
            value={pic}
            onChange={e => setPic(e.target.value)}
            className='bg-amber-50 px-4 py-4 focus:outline-green-600 rounded-2xl'
            type='url'
            placeholder='Profile picture ka link (https://...)'
          />
          <textarea
            value={desc}
            onChange={e => setdesc(e.target.value)}
            className='bg-amber-50 px-4 py-4 focus:outline-green-600 rounded-2xl resize-none'
            rows={3}
            placeholder='Apne baare mein kuch likhein (optional)'
          />

          <button
            disabled={isDisabled}
            onClick={submitLinks}
            className='disabled:opacity-50 disabled:cursor-not-allowed w-full mt-2 px-6 py-4 cursor-pointer rounded-full text-xl bg-yellow-300 text-black font-bold hover:bg-yellow-400 transition'
          >
            {loading ? 'Ban rahi hai...' : '🌳 Apni BitTree Banao'}
          </button>

          <ToastContainer position="top-center" />
        </div>
      </div>

      {/* Right Image Section */}
      <div className='col2 w-full h-64 sm:h-96 lg:h-screen'>
        <img className='w-full h-full object-cover' src='/generate.webp' alt="Create Bittree" />
      </div>

    </div>
  );
}

// ✅ Suspense wrapper zaroori hai useSearchParams ke liye
export default function GeneratePage() {
  return (
    <Suspense fallback={
      <div className="bg-[#254f1a] min-h-screen flex items-center justify-center">
        <p className="text-yellow-300 text-2xl font-bold">Loading...</p>
      </div>
    }>
      <GenerateContent />
    </Suspense>
  );
}
