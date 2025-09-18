"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const pages = [
  { type: "Page", title: "About Us", url: "/about" },
  { type: "Page", title: "Contact", url: "/contact" },
  { type: "Page", title: "Services", url: "/services" },
  { type: "Page", title: "Blog", url: "/blog" },
];

const blogPosts = [
  { type: "Blog", title: "How to Boost Efficiency", url: "/blog/how-to-boost-efficiency" },
  { type: "Blog", title: "Marketing Trends 2025", url: "/blog/marketing-trends-2025" },
  { type: "Blog", title: "Write your first GROQ query", url: "/write-your-first-groq-query" },
];

const services = [
  { type: "Service", title: "Case Acquisition", url: "/case-acquisition" },
  { type: "Service", title: "Virtual Agents", url: "/virtual-agents" },
  { type: "Service", title: "Digital Solutions", url: "/digital-solutions" },
];

const siteContent = [...pages, ...blogPosts, ...services];

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#services-dropdown"))
        setDropdownOpen(false);
    };
    if (dropdownOpen) document.addEventListener("mousedown", handleClose);
    return () => document.removeEventListener("mousedown", handleClose);
  }, [dropdownOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1023) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredResults = siteContent.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-[800ms] ${
          isSticky ? "bg-[#fff] shadow-xl" : "bg-[#rgb(72 77 94 / 0%]"
        }`}
      >

        {/* Top Bar - inside navbar, absolutely positioned, transparent */}
  {!isSticky && (
    <div className="absolute top-0 left-0 w-full bg-transparent pointer-events-none hidden lg:block z-[100] ">
      <div className="max-w-[90rem] mx-auto flex items-center justify-between py-3 px-6 text-white text-sm font-semibold pointer-events-auto mb-2">
        <span className="topbar-mail">Mon – Sun: 9.00 am – 8.00 pm</span>
        <div className="flex items-center gap-6">
          
          <span className="flex items-center gap-2">
            {/* Email Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
        <a  href="mailto:info@advanceedgellc.com"  className="topbar-mail hover:underline">
          info@advanceedgellc.com
        </a>
        </span>
          
          <span className="flex items-center gap-2 topbar-mail">
            {/* Location Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>

 1008 Hamilton St, Immokalee, FL 34142.
          </span>
        </div>
      </div>
    </div>
  )}
        <div className={`relative max-w-[90rem] mx-auto flex justify-between items-center nav-boder py-3 px-6 ${!isSticky ? "lg:pt-[52px] border-b border-right-[1px] border-[#5f5b5b] " : "border-b-0"}`}>
          {/* Logo */}
          <Link href="/" className={`inline-block mr-4 pr-4 ${
        isSticky ? "border-r-0" : "border-r border-right-[1px] border-[#5f5b5b]"
      }`}  >
            <Image
              src="/images/AELogo.webp"
              alt="AdvanceEdge Logo"
              width={160}
              height={44}
              priority
              className="select-none"
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex gap-8 items-center text-sm font-bold uppercase">
            {/* SERVICES Dropdown */}
            <li className="relative group" id="services-dropdown">
            <div className={`flex items-center gap-1 cursor-pointer uppercase nav-services py-2 px-3 select-none transition-colors ${
          isSticky ? "text-black" : "text-white"
        }`}>
          Services
                <svg
                  width="30"
                  height="30"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6 8l4 4 4-4" />
                </svg>
              </div>
              <div style={{ width: '15rem' }}
                className="
                absolute left-0 top-full mt-0 w-56 bg-white rounded-lg shadow-xl
                opacity-0 pointer-events-none
                group-hover:opacity-100 group-hover:pointer-events-auto
                transition-opacity duration-300
                dropdown-menu-rotateX
                z-50 flex flex-col nav-services
              "
              >
                <Link
                  href="/case-acquisition"
                  className="block px-6 py-3 text-gray-800 hover:bg-orange-500 hover:text-white font-semibold no-underline rounded-t-lg"
                >
                  Case Acquisition
                </Link>
                <Link
                  href="/virtual-agents"
                  className="block px-6 py-3 text-gray-800 hover:bg-orange-500 hover:text-white font-semibold no-underline"
                >
                  Virtual Agents
                </Link>
                <Link
                  href="/digital-solutions"
                  className="block px-6 py-3 text-gray-800 hover:bg-orange-500 hover:text-white font-semibold no-underline rounded-b-lg"
                >
                  Digital Solutions
                </Link>
              </div>
            </li>

            {/* Other Links */}
            {[
              { name: "About", href: "/about" },
              { name: "Blog", href: "/blog" },
              { name: "Contact", href: "/contact" },
            ].map((item) => (
              <li key={item.name}>
               <Link
                href={item.href}
                className={`px-2 py-1  no-underline transition-colors ${
                  isSticky ? "text-black hover:text-orange-400" : "text-white hover:text-orange-400"
                }`}
              >
                {item.name}
              </Link>

              </li>
            ))}
{/* Inside your <ul> navigation items, after Contact link */}
<li className={`flex items-center space-x-2 font-semibold uppercase px-2 py-1 ${
  isSticky ? "text-black" : "text-white"
}`}>
   {/* Phone icon SVG */}
   <svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-5 h-5 "
  viewBox="0 0 24 24"
  fill="currentColor"
>
  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.21.49 2.53.76 3.9.76.55 0 1 .45 1 1v3.5a1 1 0 01-1 1c-10.5 0-19-8.5-19-19a1 1 0 011-1H6.5c.55 0 1 .45 1 1 0 1.37.27 2.69.76 3.9a1 1 0 01-.27 1.11l-2.2 2.2z" />
</svg>

  {/* Phone number link */}
  <a href="tel:8329377738" className={`hover:text-orange-400 transition-colors nav-phone ${
    isSticky ? "text-black" : "text-white"
  }`}>
    832.937.7738
  </a>
</li>

            {/* Search Icon Button */}
            <li>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className={`p-2 rounded-full transition ${
                isSticky ? "text-black hover:bg-orange-500 hover:text-white" : "text-white hover:bg-orange-500 hover:text-white"
              }`}
              aria-label="Open site search"
            >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={22}
                  height={22}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-search"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </li>

            {/* Book A Call Button */}
            <li>
              <Link href="/contact" className="inline-block">
                <button
                  type="button"
                  className="navbar-action-btn"
                  style={{ "--clr": "#f58024" } as React.CSSProperties}
                >
                  <span className="navbar-action-btn__icon-wrapper">
                    <svg
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="navbar-action-btn__icon-svg"
                      width="10"
                    >
                      <path
                        d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <svg
                      viewBox="0 0 14 15"
                      fill="none"
                      width="10"
                      xmlns="http://www.w3.org/2000/svg"
                      className="navbar-action-btn__icon-svg navbar-action-btn__icon-svg--copy"
                    >
                      <path
                        d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  BOOK A CALL
                </button>
              </Link>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <button
  className={`lg:hidden text-2xl focus:outline-none ml-3 transition-colors ${
    isSticky ? "text-black" : "text-white"
  }`}
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  aria-label="Open main menu"
>
            <svg
              width="30"
              height="30"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-[#1a244b] shadow-xl z-50 px-6 pb-6">
              <ul className="flex flex-col gap-2 pt-4">
                <li className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full text-left flex items-center gap-1 text-white py-2 font-semibold uppercase focus:outline-none no-underline"
                  >
                    Services
                    <span>
                      <svg
                        width="12"
                        height="12"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6 8l4 4 4-4" />
                      </svg>
                    </span>
                  </button>
                  {dropdownOpen && (
                    <div className="bg-white rounded-lg shadow-xl mt-2 flex flex-col z-60">
                      <Link
                        href="/case-acquisition"
                        className="block px-5 py-3 text-black hover:bg-orange-500 hover:text-white transition-colors font-semibold no-underline"
                        onClick={() => {
                          setDropdownOpen(false);
                          setMobileMenuOpen(false);
                        }}
                      >
                        Case Acquisition
                      </Link>
                      <Link
                        href="/virtual-agents"
                        className="block px-5 py-3 text-black hover:bg-orange-500 hover:text-white transition-colors font-semibold no-underline"
                        onClick={() => {
                          setDropdownOpen(false);
                          setMobileMenuOpen(false);
                        }}
                      >
                        Virtual Agents
                      </Link>
                      <Link
                        href="/digital-solutions"
                        className="block px-5 py-3 text-black hover:bg-orange-500 hover:text-white transition-colors font-semibold no-underline"
                        onClick={() => {
                          setDropdownOpen(false);
                          setMobileMenuOpen(false);
                        }}
                      >
                        Digital Solutions
                      </Link>
                    </div>
                  )}
                </li>
                {[
                  { name: "About", href: "/about" },
                  { name: "Blog", href: "/blog" },
                  { name: "Contact", href: "/contact" },
                ].map((item) => (
                  <li key={item.name} className="w-full">
                    <Link
                      href={item.href}
                      className="block w-full text-white hover:text-orange-400 transition-colors px-2 py-2 font-semibold no-underline text-left uppercase"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                
                {/* Book A Call Button */}
            <li>
              <Link href="/contact" className="inline-block">
                <button
                  type="button"
                  className="navbar-action-btn"
                  style={{ "--clr": "#f58024" } as React.CSSProperties}
                >
                  <span className="navbar-action-btn__icon-wrapper">
                    <svg
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="navbar-action-btn__icon-svg"
                      width="10"
                    >
                      <path
                        d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <svg
                      viewBox="0 0 14 15"
                      fill="none"
                      width="10"
                      xmlns="http://www.w3.org/2000/svg"
                      className="navbar-action-btn__icon-svg navbar-action-btn__icon-svg--copy"
                    >
                      <path
                        d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  BOOK A CALL
                </button>
              </Link>
            </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Search Popup Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 relative">
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-800 font-bold"
              aria-label="Close search"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Search</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Optionally handle submit action
              }}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter all content..."
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none text-lg"
                autoFocus
              />
              {searchQuery && (
                <div className="mt-4 max-h-64 overflow-y-auto border border-gray-200 rounded-md p-2">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((item) => (
                      <Link
                        href={item.url}
                        key={item.url}
                        onClick={() => setSearchOpen(false)}
                        className="block py-2 px-3 rounded hover:bg-orange-100 font-semibold text-gray-700"
                      >
                        {item.title}{" "}
                        <span className="text-xs text-orange-500">{item.type}</span>
                      </Link>
                    ))
                  ) : (
                    <div className="text-gray-400 text-sm py-2">No results found.</div>
                  )}
                </div>
              )}
              <button
                type="submit"
                className="mt-4 w-full bg-orange-500 text-white rounded-md py-2 font-bold hover:bg-orange-600 transition"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
