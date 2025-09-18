import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="bg-[#111224] min-h-screen w-full text-white font-sans">
      {/* Banner Section */}
      <section className=" bg-[#181a22] min-h-[70vh] flex flex-col items-start  justify-center pt-32 pb-16 px-72">
  <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mt-8 mb-3 text-left">
    Where Legal Expertise Meets Digital Innovation
  </h1>
  <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-[100%] w-full text-left">
    Delivering scalable, expert-driven solutions for law firms & businesses.
  </p>
  <div className="w-full max-w-3xl">
    <button 
      className="w-[200px] bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-4 px-8 font-semibold text-lg text-center shadow-lg transition-all text-left"
    >
      Book A Call
    </button>
  </div>
</section>


      {/* Expertise & Team Section */}
      <section className="bg-white py-18 px-8 text-[#111224]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="uppercase text-orange-500 font-bold text-sm mb-2">About Advance Edge</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-5">
              Empowering Law Firms & Businesses with Expert Virtual Solutions
            </h3>
            <p className="mb-6 text-lg text-gray-700">
              AdvanceEdge specializes in delivering high-performance virtual legal support, web development, and digital marketing. Our team’s deep understanding of legal and digital landscapes ensures clients receive customized solutions for optimal results and scalable growth.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>100+ professionals across our global delivery centers</li>
              <li>Customer-centric support</li>
              <li>Modernized case acquisition and digital campaigns</li>
              <li>Data-driven, secure marketing and technology solutions</li>
            </ul>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src="/images/about-team.webp"
              alt="AdvanceEdge Team"
              width={380}
              height={420}
              className="rounded-2xl shadow-xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-[#0c0d1a] py-16 px-6 text-center md:text-left">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-extrabold mb-6">Our Commitment: Trust, Confidentiality & Excellence</h3>
          <p className="mb-7 text-gray-300 text-lg">
            We operate with the strictest standards of integrity and confidentiality, delivering reliable results through every solution we provide. Our advice is guided by legal precision, security, and quality.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-10">
            <div className="flex-1 bg-[#161b29] p-7 rounded-2xl shadow-lg">
              <h4 className="font-semibold text-lg text-orange-400 mb-2">Tech-Enabled Efficiency</h4>
              <p className="text-gray-200">Modern automation and next-gen tools for streamlined, superior results.</p>
            </div>
            <div className="flex-1 bg-[#161b29] p-7 rounded-2xl shadow-lg">
              <h4 className="font-semibold text-lg text-orange-400 mb-2">Strategic Insight</h4>
              <p className="text-gray-200">In-depth legal and marketing expertise for complex case strategies.</p>
            </div>
            <div className="flex-1 bg-[#161b29] p-7 rounded-2xl shadow-lg">
              <h4 className="font-semibold text-lg text-orange-400 mb-2">Client-Centric Solutions</h4>
              <p className="text-gray-200">Personalized, data-driven support for your firm’s growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[#111224] py-15 px-6 text-center">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl md:text-3xl text-[#111224] font-bold mb-3">Ready to Elevate Your Business?</h3>
          <p className="mb-6 text-gray-700">Partner with AdvanceEdge and experience a smarter way to scale.</p>
          <form className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Email Address"
              required
              className="flex-1 px-4 py-3 rounded-md border border-gray-300"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-6 py-3 font-semibold transition-all">
              Submit
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
