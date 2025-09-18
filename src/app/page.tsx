"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import "keen-slider/keen-slider.min.css"; // ✅ Correct Path
// Import Keen Slider and its CSS
import { useKeenSlider } from "keen-slider/react";
import sanityClient from "@sanity/client";
import Modal from "@/components/Modal"; // Adjust path if needed

// Import Sanity client and helpers
import { createClient, type SanityDocument } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

import Footer from '@/components/Footer';

// ====================================================================
// 1. CONFIGURE SANITY CLIENT
// ====================================================================
// NOTE: Replace 'YOUR_PROJECT_ID' with your actual Sanity project ID.
const client = createClient({
  projectId: 'fklvmw2s', // <--- IMPORTANT: Add your project ID here
  dataset: 'production',
  apiVersion: '2024-02-28',
  useCdn: true, // `false` if you want to ensure fresh data
});

// Helper function to generate image URLs from Sanity data
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}



const faqs = [
  {
    q: "How can AdvanceEdge help law firms get qualified Mass Tort leads?",
    a: "AdvanceEdge delivers high–quality, verified Mass Tort leads through targeted campaigns and rigorous case screening, ensuring law firms receive only eligible claimants.",
  },
  {
    q: "What makes AdvanceEdge’s Virtual Agents cost-effective for law firms?",
    a: "Our Virtual Agents offer an affordable, flexible solution to reduce your firm’s admin and legal workload.",
  },
  {
    q: "How does AdvanceEdge verify Mass Tort leads before sending them to law firms?",
    a: "All Mass Tort leads are meticulously screened to ensure legal eligibility before delivery.",
  },
  {
    q: "What digital marketing services does AdvanceEdge offer for law firms?",
    a: "We provide case acquisition, digital campaigns, lead generation, and technology solutions for law firms.",
  },
  {
    q: "How does AdvanceEdge’s web development service help law firms?",
    a: "Our web development service delivers modern, high-converting sites for improved client acquisition.",
  },
];



export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [opened, setOpened] = useState<number | null>(null);
   // ====================================================================
  // 2. STATE FOR BLOG POSTS & SLIDER
  // ====================================================================
  const [posts, setPosts] = useState<SanityDocument[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Autoplay plugin for Keen Slider
  const AutoplayPlugin = (slider: any) => {
    let timeout: ReturnType<typeof setTimeout>;
    let mouseOver = false;
    function clearNextTimeout() {
      clearTimeout(timeout);
    }
    function nextTimeout() {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => {
        slider.next();
      }, 4000); // Change slide every 4 seconds
    }
    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clearNextTimeout();
      });
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false;
        nextTimeout();
      });
      nextTimeout();
    });
    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", nextTimeout);
    slider.on("updated", nextTimeout);
  };

  // Keen Slider initialization
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 15,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 2, spacing: 20 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 2, spacing: 30 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  }, [AutoplayPlugin]);

  // ====================================================================
  // 3. FETCH BLOG POSTS FROM SANITY
  // ====================================================================
  // 3. FETCH BLOG POSTS FROM SANITY
  // 3. FETCH BLOG POSTS FROM SANITY
  useEffect(() => {
    const fetchPosts = async () => {
      const query = `*[_type == "post" && defined(mainImage)] | order(_createdAt desc)[0...6] {
        _id,
        title,
        mainImage {
          asset->
        },
        slug
      }`;

      try {
        const fetchedPosts = await client.fetch(query);
        // THIS IS THE IMPORTANT PART
        console.log("DATA FROM SANITY:", JSON.stringify(fetchedPosts, null, 2));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);


  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section
  className="
    relative 
    min-h-[50vh]        /* Mobile: 50% viewport height */
    sm:min-h-[60vh]     /* Small tablets and up: 60% viewport height */
    md:min-h-[80vh]     /* Tablets and small laptops (≥768px): 80% viewport height */
    lg:min-h-[1150px]     /* Large screens and desktops (≥1024px): full screen height */
    flex items-center
  "
  style={{
    backgroundImage: "url('/images/hero-bg.webp')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>

  {/* Black overlay */}
  <div className="absolute inset-0 bg-black opacity-50"></div>

  {/* Container for hero content */}
  <div className="relative z-10 max-w-[90rem] mx-auto w-full px-6 ">
  <div className="max-w-full text-left text-white pt-12 pb-24 md:pt-[19rem] md:pb-32">
    <h4 className="hero-sub-title">
    The Legal Industry's
      </h4>
      <h1 className="text-4xl md:text-6xl font-bold mb-4 py-8 hero-title">
      Trusted Partner in <br/>Growth & Efficiency</h1>
      
      {/* <Link
        href="/blog"
        className="inline-block px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
      >
        Visit Blog
      </Link> */}
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
    </div>

     {/* Three Boxes at Bottom of Hero */}
  <div className="
    w-full
    max-w-[100%]
    mx-auto
    grid
    grid-cols-1
    md:grid-cols-3
    gap-6
    bg-transparent
    rounded-xl
    z-20
    mt-10
    relative
    ">
    <div className=" backdrop-blur-sm  rounded-lg p-6 flex flex-col items-start">
      <span className="text-2xl mb-2">
        {/* Icon (example) */}
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512">
    <path fill="#fff" d="M425.706 142.294A240 240 0 0 0 16 312v88h144v-32H48v-56c0-114.691 93.309-208 208-208s208 93.309 208 208v56H352v32h144v-88a238.432 238.432 0 0 0-70.294-169.706Z"/>
    <path fill="#fff" d="M80 264h32v32H80zm160-136h32v32h-32zm-104 40h32v32h-32zm264 96h32v32h-32zm-102.778 71.1l69.2-144.173l-28.85-13.848l-69.183 144.135a64.141 64.141 0 1 0 28.833 13.886ZM256 416a32 32 0 1 1 32-32a32.036 32.036 0 0 1-32 32Z"/>
</svg>
        </span>
      <h3 className="font-bold text-lg mb-2 text-white">Proven Success</h3>
      <p className="text-white text-sm">Empowering law firms and legal marketing teams with data-driven strategies and high-impact results.</p>
    </div>
    <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-6 flex flex-col items-start">
      <span className="text-2xl mb-2">
        {/* Icon (example) */}
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16 16">
    <g fill="#fff">
        <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v.634l.549-.317a.5.5 0 1 1 .5.866L9 6l.549.317a.5.5 0 1 1-.5.866L8.5 6.866V7.5a.5.5 0 0 1-1 0v-.634l-.549.317a.5.5 0 1 1-.5-.866L7 6l-.549-.317a.5.5 0 0 1 .5-.866l.549.317V4.5A.5.5 0 0 1 8 4zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
    </g>
</svg>
      </span>
      <h3 className="font-bold text-lg mb-2 text-gray-900">Premier Litigation Support</h3>
      <p className="text-gray-600 text-sm">From mass tort case acquisition to specialized legal operations, we streamline your firm's growth.</p>
    </div>
    <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-6 flex flex-col items-start">
      <span className="text-2xl mb-2">
        {/* Icon (example) */}
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
    <path fill="#fff" d="M19.63 3.65a1 1 0 0 0-.84-.2a8 8 0 0 1-6.22-1.27a1 1 0 0 0-1.14 0a8 8 0 0 1-6.22 1.27a1 1 0 0 0-.84.2a1 1 0 0 0-.37.78v7.45a9 9 0 0 0 3.77 7.33l3.65 2.6a1 1 0 0 0 1.16 0l3.65-2.6A9 9 0 0 0 20 11.88V4.43a1 1 0 0 0-.37-.78ZM18 11.88a7 7 0 0 1-2.93 5.7L12 19.77l-3.07-2.19A7 7 0 0 1 6 11.88v-6.3a10 10 0 0 0 6-1.39a10 10 0 0 0 6 1.39Zm-4.46-2.29l-2.69 2.7l-.89-.9a1 1 0 0 0-1.42 1.42l1.6 1.6a1 1 0 0 0 1.42 0L15 11a1 1 0 0 0-1.42-1.42Z"/>
</svg>
       </span>
      <h3 className="font-bold text-lg mb-2 text-gray-900">Industry-Leading Expertise</h3>
      <p className="text-gray-600 text-sm">Leverage deep knowledge and cutting-edge solutions for optimized litigation practices.</p>
    </div>
  </div>
  </div>
</section>

       {/* About Us Section */}
       <section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-12 items-start">
    {/* Left Side – Image, Play Button, Quote */}
    <div className="flex flex-col">
      <div className="relative rounded-[2rem] overflow-hidden w-full">
        <Image
          src="/images/About-us-img-1-min.webp"
          alt="About Us Professional"
          width={600}
          height={700}
          className="object-cover w-full h-[400px]"
        />
        <button
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 p-4 rounded-lg shadow-md"
          aria-label="Play About Video"
          onClick={() => setShowModal(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-8 h-8">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </button>
      </div>
      <div className="flex items-start gap-4 mt-8">
        <div className="text-4xl text-[#bfa395] font-serif leading-none select-none">&#10077;</div>
        <div>
          <p className="text-lg text-gray-700 italic">
            Success in the legal industry isn’t just about winning cases—it’s about having the right support to grow and thrive.
          </p>
        </div>
      </div>
    </div>

    {/* Right Side – Title, Description, Team Image, CTA */}
    <div className="flex flex-col gap-0">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
        <span className="text-orange-500 uppercase text-sm font-semibold tracking-wide">About Us</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-4">
        Empowering Legal Professionals<br className="hidden md:block" /> with Innovation and Expertise
      </h2>
      <div className="border-t border-orange-200 w-12 mb-6" />
      <p className="text-gray-600 text-base leading-relaxed mb-6">
        At Advance Edge, we are dedicated to empowering legal professionals with innovative solutions that drive success. With over 12 years of experience, we specialize in providing high-quality case acquisition, expert virtual agents, and cutting-edge digital marketing services tailored to the unique needs of law firms, legal marketing agencies, and attorneys across the United States.
      </p>

      <div className="relative w-full">
        <Image
          src="/images/Relentless-Commitment-min.webp"
          alt="Professional Team"
          width={600}
          height={400}
          className="rounded-xl object-cover w-full h-[100%]"
        />
        {/* CTA Box - CALL US opens modal */}
        <div className="absolute left-6 right-0 -bottom-12 bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-full">
          <div className="text-center mb-4">
            <h3 className="text-lg md:text-xl font-medium text-gray-800 mb-1">
              Relentless Commitment.
            </h3>
            <h4 className="text-base md:text-lg text-gray-600 font-light">
              Unmatched Results.
            </h4>
          </div>
          <div className="flex gap-0 rounded-lg overflow-hidden">
            <button
              className="bg-gray-800 text-white px-6 py-3 font-semibold hover:bg-gray-700 transition flex items-center justify-center gap-1 flex-1 text-sm"
              onClick={() => setShowModal(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              CALL US
            </button>
            <button className="bg-orange-500 text-white px-6 py-3 font-semibold hover:bg-orange-600 transition flex-1 text-sm">
              +(832) 937 7738
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Modal Popup - triggers from CALL US button and play button */}
  <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
    <h2 className="text-2xl font-bold mb-4 text-center">Contact Our Team</h2>
    {/* Example: Contact form or informational content */}
    <div className="w-full flex flex-col justify-center items-center mb-4">
      <p className="text-lg text-center mb-2">
        Please fill out the contact form or call us directly to speak with our expert legal team. We’re here to help you succeed!
      </p>
      <a
        href="tel:+18329377738"
        className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow hover:bg-orange-600 transition"
      >
        +(832) 937 7738
      </a>
    </div>
  </Modal>
</section>

<section className="bg-gray-50 py-20">
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
    {/* Left Column: Two stacked cards */}
    <div className="flex flex-col gap-8">
      {/* Card 1 */}
      <div className="relative rounded-tl-3xl  overflow-hidden h-[400px] w-full">
  <Image
    src="/images/Maximize-Efficiency.webp"
    alt="Law Firms"
    fill
    className="object-cover rounded-tl-3xl "
  />
  <div className="absolute bottom-0 left-0 w-[90%] bg-white/95 px-8 py-6">
    <span className="text-orange-600 font-semibold text-base mb-1 block">For Law Firms</span>
    <h3 className="text-gray-800 font-semibold text-2xl mb-2">Maximize Efficiency</h3>
    <p className="text-gray-700 text-base">
      Managing operations while delivering exceptional representation is a challenge. Our services, from case acquisition to virtual agents, help your firm enhance efficiency and focus on what matters most – your clients.
    </p>
  </div>
</div>

      {/* Card 2 */}
      <div className="relative rounded-tr-3xl  overflow-hidden h-[500px] w-full">
  <Image
    src="/images/Attorney.webp"
    alt="Law Firms"
    fill
    className="object-cover rounded-tr-3xl "
  />
  <div className="absolute bottom-0 left-0 w-[90%] bg-white/95 px-8 py-6">
    <span className="text-orange-600 font-semibold text-base mb-1 block">For Law Firms</span>
    <h3 className="text-gray-800 font-semibold text-2xl mb-2">Maximize Efficiency</h3>
    <p className="text-gray-700 text-base">
      Managing operations while delivering exceptional representation is a challenge. Our services, from case acquisition to virtual agents, help your firm enhance efficiency and focus on what matters most – your clients.
    </p>
  </div>
</div>
    </div>
    {/* Right Column: Heading + Card + Highlight bar */}
    <div className="flex flex-col gap-8">
      {/* Heading and Description */}
      <div>
        <span className="uppercase text-orange-600 text-xs font-bold tracking-widest mb-3 block">
          Who We Help?
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Your Partner in Success
        </h2>
        <div className="w-16 h-0.5 bg-orange-300 mb-4"/>
        <p className="text-gray-700 text-base leading-relaxed">
          At AdvanceEdge, we offer personalized, results–oriented services to legal professionals. Whether navigating complex cases, growing your client base, or streamlining operations, we provide the tools and expertise to drive success. Our solutions are designed for the evolving needs of law firms, legal marketing firms, and attorneys across the U.S.
        </p>
      </div>
      {/* Card 3 */}
      <div className="relative rounded-tr-3xl  overflow-hidden h-[500px] w-full">
  <Image
    src="/images/LegalMarketing-firm.webp"
    alt="Law Firms"
    fill
    className="object-cover rounded-tr-3xl "
  />
  <div className="absolute bottom-0 left-0 w-[90%] bg-white/95 px-8 py-6">
    <span className="text-orange-600 font-semibold text-base mb-1 block">For Law Firms</span>
    <h3 className="text-gray-800 font-semibold text-2xl mb-2">Maximize Efficiency</h3>
    <p className="text-gray-700 text-base">
      Managing operations while delivering exceptional representation is a challenge. Our services, from case acquisition to virtual agents, help your firm enhance efficiency and focus on what matters most – your clients.
    </p>
  </div>
</div>
      {/* Highlight Bar */}
      <div className="bg-orange-500 text-white text-center font-semibold py-12 px-8 rounded-bl-3xl mt-2 shadow w-[80%]">
        <h4 className="text-black">10+ Years of Legal Expertise, 100% Commitment to Your Success</h4>
      </div>
    </div>
  </div>
</section>

{/* Why Choose Us? */}
<section className="bg-[#0C0D1A] py-24">
  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12 items-center md:items-start">
    {/* Features Grid */}
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-8 border-r border-white/10 pr-8">
      {/* Feature 1 */}
      <div>
        <div className="mb-6">
          {/* Trophy Icon */}
          <svg className="w-10 h-10 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 6a1 1 0 0 0-1-1h-1V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v1H4a1 1 0 0 0-1 1c0 3.657 2.408 6.72 5.75 7.648A6.002 6.002 0 0 0 11 21h2a6.002 6.002 0 0 0 2.25-7.352C19.592 12.72 22 9.657 22 6Zm-2.001.001c-.071 2.858-2.13 5.277-4.999 5.812V18h-.998v-6.187c-2.869-.535-4.928-2.954-4.999-5.812h10.996Z" />
          </svg>
        </div>
        <h3 className="text-white text-2xl font-medium mb-2">Proven Success</h3>
        <p className="text-white/80 text-base">
          We take pride in delivering top-quality case acquisition and legal support solutions that drive real results for our clients.
        </p>
      </div>
      {/* Feature 2 */}
      <div>
        <div className="mb-6">
          {/* Alarm Clock Icon */}
          <svg className="w-10 h-10 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8a1 1 0 011 1v4h3a1 1 0 110 2h-4a1 1 0 01-1-1V9a1 1 0 011-1zm8 8a8 8 0 11-16 0 8 8 0 0116 0zm-2.293-10.293a1 1 0 011.415-1.414l2 2a1 1 0 01-1.415 1.414l-2-2zm-13.415 0l2 2a1 1 0 11-1.415 1.414l-2-2A1 1 0 114.293 5.707z" />
          </svg>
        </div>
        <h3 className="text-white text-2xl font-medium mb-2">Industry Expertise</h3>
        <p className="text-white/80 text-base">
          With years of experience in legal marketing and operations, we help law firms and agencies scale efficiently.
        </p>
      </div>
      {/* Feature 3 */}
      <div className="mt-12 border-t border-white/10 pt-12">
        <div className="mb-6">
          {/* Diamond Icon */}
          <svg className="w-8 h-8 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="6" width="12" height="12" rx="2.5" transform="rotate(45 12 12)" />
          </svg>
        </div>
        <h3 className="text-white text-2xl font-medium mb-2">Trusted by Professionals</h3>
        <p className="text-white/80 text-base">
          Trusted by professionals. Our tailored services are designed to meet the unique needs of law firms and legal marketing firms across the U.S.
        </p>
      </div>
      {/* Feature 4 */}
      <div className="mt-12 border-t border-white/10 pt-12">
        <div className="mb-6">
          {/* Calendar Icon */}
          <svg className="w-9 h-9 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <rect x="7" y="2" width="2" height="4" rx="1" />
            <rect x="15" y="2" width="2" height="4" rx="1" />
          </svg>
        </div>
        <h3 className="text-white text-2xl font-medium mb-2">Consultation at No Cost</h3>
        <p className="text-white/80 text-base">
          Discover how AdvanceEdge can enhance your practice with a free consultation—no commitment required.
        </p>
      </div>
    </div>
    {/* Right Block */}
    <div className="flex-1 flex flex-col items-center md:items-start justify-center pl-0 md:pl-16">
      <span className="uppercase text-orange-400 tracking-wider font-bold text-xs mb-3 flex items-center gap-2">
        <span className="w-2 h-2 bg-orange-400 rounded-full inline-block"></span>
        Why Choose Us?
        <span className="w-2 h-2 bg-orange-400 rounded-full inline-block"></span>
      </span>
      <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
        Results Driven<br />Solutions for Law Firms & Legal Marketing Firms
      </h2>
      <div className="text-white font-semibold text-lg mb-3 text-center md:text-left">
        Empowering Your Growth with Expert Support
      </div>
      {/* Stars */}
      <div className="flex gap-1 mb-7">
        {[...Array(5)].map((_,i) => (
          <svg key={i} className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        ))}
      </div>
      {/* CTA Button */}
      <button className="flex items-center justify-center gap-2 text-base bg-white text-black font-bold px-7 py-4 rounded mt-2 transition hover:bg-gray-200 shadow">
        <span className="inline-block text-2xl text-orange-500 font-bold">+</span>
        BOOK A CALL
      </button>
    </div>
  </div>
</section>

{/* What We Do */}
<section className="bg-[#f7f7f7] py-24">
  <div className="max-w-6xl mx-auto px-6 text-center">
    {/* Section Tag */}
    <span className="uppercase text-orange-500 font-bold tracking-wider text-sm flex items-center justify-center gap-2 mb-4">
      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
      What We Do
      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
    </span>
    {/* Section Title */}
    <h2 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900 mb-5">
      Innovative Solutions for the Evolving Legal Industry
    </h2>
    <div className="w-28 h-[2px] bg-orange-300 mx-auto mb-12"></div>
    {/* Grid Boxes */}
    <div className="flex flex-col md:flex-row gap-0 justify-center items-stretch max-w-8xl mx-auto">
      {/* Box 1 */}
      <div
        className="relative flex-1 bg-white hover:bg-[#161b29] rounded-tl-[2.5rem] rounded-bl-[2.5rem] transition-all duration-300 shadow-lg
        px-10 py-12 border border-[#eee] flex flex-col items-center min-h-[340px] z-10 group"
      >
        {/* Top label */}
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-orange-500 text-white font-semibold rounded-t-md w-16 py-2 text-lg shadow text-center">
          01
        </span>
        {/* Icon */}
        <span className="mb-5">
          <svg className="w-10 h-10 text-orange-500 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="7" y="5" width="10" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M9 9h6M9 13h4" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </span>
        <h3 className="font-serif text-2xl font-medium mb-2 text-gray-900 group-hover:text-white transition">
          Case Acquisition
        </h3>
        <p className="text-gray-700 group-hover:text-white/80 text-base leading-relaxed mb-4 transition">
          Securing verified, high-quality leads is essential for law firms, especially in Mass Tort cases where accuracy is key.
        </p>
        <a href="#readmore" className="text-orange-500 font-semibold tracking-wide group-hover:text-white transition border-b-2 border-orange-500 group-hover:border-white">
          READ MORE
        </a>
      </div>
      {/* Box 2 (middle) */}
      <div
        className="relative flex-1 bg-[#161b29] hover:bg-white rounded-none transition-all duration-300 shadow-lg
        px-10 py-12 border-y border-[#eee] flex flex-col items-center min-h-[340px] z-20 group"
      >
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-orange-500 text-white font-semibold rounded-t-md w-16 py-2 text-lg shadow text-center">
          02
        </span>
        {/* Icon */}
        <span className="mb-5">
          <svg className="w-10 h-10 text-white group-hover:text-orange-500 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
            <path d="M6 20v-2a6 6 0 0112 0v2" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </span>
        <h3 className="font-serif text-2xl font-medium mb-2 text-white group-hover:text-gray-900 transition">
          Virtual Agents
        </h3>
        <p className="text-white/80 group-hover:text-gray-700 text-base leading-relaxed mb-4 transition">
          Our Virtual Agents offer a flexible, affordable solution to streamline your firm's administrative and legal tasks.
        </p>
        <a href="#readmore" className="text-orange-500 font-semibold tracking-wide group-hover:text-orange-500 group-hover:border-b-2 group-hover:border-orange-500 transition">
          READ MORE
        </a>
      </div>
      {/* Box 3 */}
      <div
        className="relative flex-1 bg-white hover:bg-[#161b29] rounded-tr-[2.5rem] rounded-br-[2.5rem] transition-all duration-300 shadow-lg
        px-10 py-12 border border-[#eee] flex flex-col items-center min-h-[340px] z-10 group"
      >
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-orange-500 text-white font-semibold rounded-t-md w-16 py-2 text-lg shadow text-center">
          03
        </span>
        {/* Icon */}
        <span className="mb-5">
          <svg className="w-10 h-10 text-orange-500 group-hover:text-white transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 4v4M7 8l-3 3m5-3l3 3m5-3l3 3M5 13a7 7 0 0 0 14 0V9H5v4Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </span>
        <h3 className="font-serif text-2xl font-medium mb-2 text-gray-900 group-hover:text-white transition">
          Technology Solutions
        </h3>
        <p className="text-gray-700 group-hover:text-white/80 text-base leading-relaxed mb-4 transition">
          High-quality, verified leads are crucial for any law firm’s success, especially in Mass Tort cases.
        </p>
        <a href="#readmore" className="text-orange-500 font-semibold tracking-wide group-hover:text-white transition border-b-2 border-orange-500 group-hover:border-white">
          READ MORE
        </a>
      </div>
    </div>
  </div>
</section>


{/* Faq section */}

<section className="bg-[#121d32] py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">
        {/* Left: Headings & CTA */}
        <div className="flex flex-col justify-center h-full">
          <span className="uppercase text-orange-500 font-bold tracking-wide flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            How can we help?
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
          </span>
          <h2 className="text-white font-serif text-4xl md:text-5xl mb-5">
            Frequently Asked<br />Questions
          </h2>
          <p className="text-white/80 text-lg mb-6">
            Answers You Need. Results You Trust. Your Edge in Mass Tort Success.
          </p>
          <button className="flex items-center gap-2 bg-white text-black font-bold px-8 py-5 rounded mt-2 w-fit shadow hover:bg-orange-500 hover:text-white transition">
            <span className="inline-block text-2xl text-orange-500 font-bold">+</span>
            BOOK A CALL
          </button>
        </div>

        {/* Right: Animated Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#232d45] rounded-lg overflow-hidden shadow group">
              {/* Accordion Header */}
              <button
                className={`w-full text-left px-7 py-5 font-medium transition flex items-center justify-between 
                ${
                  opened === i
                    ? "text-orange-400 bg-[#232d45] border-b border-orange-300"
                    : "text-white hover:text-orange-400"
                }`}
                onClick={() => setOpened(opened === i ? null : i)}
              >
                <span>{faq.q}</span>
                <span className={`transition-transform duration-300 ${opened === i ? "rotate-90" : ""}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} />

                  </svg>
                </span>
              </button>
              {/* Accordion Body */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out px-7 bg-[#232d45] text-white/90 text-base
                  ${opened === i ? "max-h-[200px] py-5 opacity-100" : "max-h-0 py-0 opacity-0"}
                `}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* ==================================================================== */}
      {/* 4. NEW BLOG POST SLIDER SECTION                                     */}
      {/* ==================================================================== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-bold tracking-widest text-orange-500 uppercase">
              RECENT ARTICLES
            </span>
            <h2 className="mt-2 text-4xl md:text-5xl font-serif font-semibold text-gray-900">
              What News Do We Have Today, Latest Blog
            </h2>
          </div>

          {/* Keen Slider Component */}
          {posts.length > 0 && (
            <div className="navigation-wrapper">
              <div ref={sliderRef} className="keen-slider">
                {posts.map((post) => (
                  <div key={post._id} className="keen-slider__slide">
                    <div className="overflow-hidden border border-gray-200/80 rounded-lg shadow-sm group">
                      <div className="relative h-64 w-full">
                      {post.mainImage?.asset && (
                      <Image
                        src={urlFor(post.mainImage).width(500).height(200).url()}
                        alt={post.title}
                        width={500}
                        height={200}
                        className="object-cover"
                      />
                    )}

                      </div>
                      <div className="p-6 bg-white text-left">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 h-14 overflow-hidden">
                          {post.title}
                        </h3>
                        {post.author?.name && (
                <p className="text-sm text-gray-600 mb-3">By {post.author.name}</p>
              )}
                        <Link
                          href={`/blog/${post.slug?.current}`}
                          className="font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                        >
                          LEARN MORE +
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Slider Dots */}
          {loaded && instanceRef.current && posts.length > 0 && (
            <div className="flex justify-center gap-2 mt-8">
              {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      instanceRef.current?.moveToIdx(idx)
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${currentSlide === idx ? 'bg-orange-500 scale-125' : 'bg-gray-300'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  ></button>
                )
              })}
            </div>
          )}
        </div>
      </section>

    </main>
  );
}



