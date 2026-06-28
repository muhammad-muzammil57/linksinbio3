"use client"
export const dynamic = "force-dynamic";

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const Navbar = ({ email }) => {
  const pathname = usePathname()
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [myBittrees, setMyBittrees] = useState([])
  const [bittreeLoading, setBittreeLoading] = useState(false)
  const popupRef = useRef(null)
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)

  // ✅ Logged in user ki bittrees fetch karo
  const fetchMyBittrees = async () => {
    if (!email) return;
    setBittreeLoading(true);
    try {
      const res = await fetch('/api/generate');
      const data = await res.json();
      if (data.success) {
        setMyBittrees(data.bittrees || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setBittreeLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  // Sirf in routes par show hoga
  if (pathname !== "/" && pathname !== "/generate") {
    return null
  }

  const handleLogin = () => {
    window.location.href = "/api/auth/login"
  }

  const handleLogout = () => {
    window.location.href = "/api/auth/logout";
  };

  const firstLetter = email ? email[0].toUpperCase() : ""

  const handleAvatarClick = () => {
    setOpen(!open);
    if (!open) fetchMyBittrees(); // popup khuley to bittrees fetch karo
  }

  return (
    <>
      <nav className='bg-white/80 backdrop-blur-lg flex items-center w-[90vw] fixed top-6 left-1/2 -translate-x-1/2 rounded-full p-3 z-50 shadow-lg'>

        {/* Desktop Layout */}
        <div className="hidden md:flex w-full justify-between items-center">

          <div className="flex gap-16 items-center">
            <Link href={"/"}>
              <img
                className="h-8 pl-6 mt-2"
                loading="eager"
                src="https://res.cloudinary.com/dcbiaksdi/image/upload/f_auto,q_auto/LinkWithMuzammil_lefj1x"
                alt="logo"
              />
            </Link>

            <ul className='flex gap-10'>
              <li><Link href="/">Products</Link></li>
              <li><Link href="/">Templates</Link></li>
              <li><Link href="/">Marketplace</Link></li>
              <li><Link href="/">Learn</Link></li>
              <li><Link href="/">Pricing</Link></li>
            </ul>
          </div>

          <div className='flex gap-3 items-center pr-4'>

            {!email ? (
              <>
                <button
                  onClick={handleLogin}
                  className='p-2 px-5 bg-gray-100 font-bold rounded-lg hover:bg-gray-200 transition'
                >
                  Login
                </button>
                <button
                  onClick={handleLogin}
                  className='p-3 bg-gray-900 rounded-full font-bold text-white hover:scale-105 transition'
                >
                  Sign up Free
                </button>
              </>
            ) : (
              <div className="relative flex items-center gap-3" ref={popupRef}>
                {/* ✅ "Create New" button */}
                <button
                  onClick={() => router.push('/generate')}
                  className='px-4 py-2 bg-yellow-300 rounded-full font-bold text-black hover:bg-yellow-400 transition text-sm'
                >
                  + Nayi Bittree
                </button>

                {/* Avatar with dropdown */}
                <button
                  className='w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold hover:scale-105 transition'
                  onClick={handleAvatarClick}
                >
                  {firstLetter}
                </button>

                {open && (
                  <div className='absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden z-50'>
                    <div className='px-4 py-3 bg-gray-50 border-b border-zinc-100'>
                      <p className='text-xs text-gray-500'>Logged in as</p>
                      <p className='text-sm font-semibold text-gray-800 truncate'>{email}</p>
                    </div>

                    {/* ✅ Meri Bittrees section */}
                    <div className='px-4 py-2'>
                      <p className='text-xs font-bold text-gray-500 uppercase tracking-wide mb-2'>Meri Bittrees</p>
                      {bittreeLoading ? (
                        <p className='text-sm text-gray-400 py-1'>Loading...</p>
                      ) : myBittrees.length === 0 ? (
                        <p className='text-sm text-gray-400 py-1'>Abhi koi Bittree nahi hai</p>
                      ) : (
                        myBittrees.map((b, i) => (
                          <Link
                            key={i}
                            href={`/${b.handle}`}
                            className='flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-zinc-100 text-sm font-medium text-gray-700 transition'
                            onClick={() => setOpen(false)}
                          >
                            <span className='text-green-600'>🌳</span>
                            @{b.handle}
                          </Link>
                        ))
                      )}
                    </div>

                    <div className='border-t border-zinc-100'>
                      <button
                        onClick={handleLogout}
                        className='w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition'
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex md:hidden w-full justify-between items-center px-4">
          <Link href={"/"}>
            <img
              className="h-8 mt-1"
              src="https://res.cloudinary.com/dcbiaksdi/image/upload/f_auto,q_auto/LinkWithMuzammil_lefj1x"
              alt="logo"
            />
          </Link>

          <div className='flex items-center gap-3 pr-2'>
            <button
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            >
              <span className={`block h-0.5 w-6 bg-black transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
              <span className={`block h-0.5 w-6 bg-black transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
              <span className={`block h-0.5 w-6 bg-black transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div
          ref={dropdownRef}
          className={`absolute right-4 top-20 w-56 bg-white shadow-2xl rounded-2xl p-4 space-y-3 md:hidden transform transition-all duration-300 origin-top z-50
          ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
        >
          {!email ? (
            <>
              <button
                onClick={handleLogin}
                className="w-full bg-gray-100 py-2 rounded-xl font-semibold hover:bg-gray-200 transition"
              >
                Login
              </button>
              <button
                onClick={handleLogin}
                className="w-full bg-gray-900 text-white py-2 rounded-xl font-semibold hover:scale-105 transition"
              >
                Signup
              </button>
            </>
          ) : (
            <div>
              <div className='flex items-center gap-3 mb-3'>
                <button className='w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm'>
                  {firstLetter}
                </button>
                <div>
                  <p className='font-bold text-sm'>Account</p>
                  <p className='text-xs text-gray-500 truncate max-w-[130px]'>{email}</p>
                </div>
              </div>

              <hr className='mb-3' />

              {/* ✅ Mobile mein bhi Meri Bittrees */}
              <div className='mb-3'>
                <p className='text-xs font-bold text-gray-500 uppercase tracking-wide mb-2'>Meri Bittrees</p>
                {myBittrees.length === 0 ? (
                  <button
                    onClick={() => { fetchMyBittrees(); }}
                    className='text-xs text-blue-500 underline'
                  >Load Bittrees</button>
                ) : (
                  myBittrees.map((b, i) => (
                    <Link
                      key={i}
                      href={`/${b.handle}`}
                      className='flex items-center gap-2 py-1.5 text-sm font-medium text-gray-700'
                      onClick={() => setIsOpen(false)}
                    >
                      🌳 @{b.handle}
                    </Link>
                  ))
                )}
              </div>

              <hr className='mb-3' />

              <button
                onClick={() => { router.push('/generate'); setIsOpen(false); }}
                className='w-full bg-yellow-300 text-black py-2 rounded-xl font-bold mb-2 hover:bg-yellow-400 transition'
              >
                + Nayi Bittree
              </button>

              <button
                className='w-full text-center py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition'
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>

      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  )
}

export default Navbar
