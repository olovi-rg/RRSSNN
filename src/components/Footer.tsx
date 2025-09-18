
// src/components/Footer.tsx
import NewsletterForm from './NewsletterForm'; // Import the newsletter form component

export default function Footer() {
    return (
      <footer className="bg-[#111224] text-white pt-20 pb-8 relative">
        <div className="max-w-7xl mx-auto px-8">
          {/* Top CTA Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between pb-10 mb-10 border-b border-gray-800">
            <div className="text-center lg:text-left mb-6 lg:mb-0">
              <span className="block uppercase text-orange-500 font-bold tracking-wider mb-2">Get in Touch</span>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-3">
                Partner with AdvanceEdge today<br/> and take your Firm to the next level.
              </h2>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-[2.5rem] py-7 px-12 bg-gradient-to-r from-orange-500 to-orange-300 shadow-lg text-black text-3xl font-bold mb-2">
               <h2 ><a href='tel:832.937.7738'><h2 className='font-semibold text-lg mb-4 border-b border-orange-500 pb-2'> 832.937.7738 </h2></a></h2>
              </div>
              <span className="uppercase tracking-wide font-semibold text-sm text-orange-100">Feel free to call us</span>
            </div>
          </div>
  
          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white py-8">
            {/* Our Address */}
            <div>
              <h4 className="font-semibold text-lg mb-4 border-b border-orange-500 pb-2">Our Address</h4>
              <p>1008 Hamilton St, Immokalee, Fl 34142.</p>
            </div>
            {/* Connect With Us */}
            <div>
              <h4 className="font-semibold text-lg mb-4 border-b border-orange-500 pb-2">Connect with Us</h4>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">@</span>
                  <span><a href='mailto:info@advanceedgellc.com'>info@advanceedgellc.com</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">📞</span>
                  <span><a href='tel:832-937-7738'>832-937-7738</a></span>
                </div>
              </div>
            </div>
            {/* Newsletter Signup */}
            <div>
  <h4 className="font-semibold text-lg mb-4 border-b border-orange-500 pb-2">Our Newsletter</h4>
  <p className="mb-2">Signup for our latest news & articles.</p>
  <NewsletterForm />
</div>
          </div>
  
          {/* Bottom Line */}
          <div className="mt-10 flex flex-col md:flex-row items-center justify-between border-t border-gray-800 pt-6 text-sm text-gray-300">
            <span>
              © Copyright 2025. All rights reserved.{" "}
              <span className="text-orange-400 font-semibold"><a href='/'>AdvanceEdge</a></span>.
            </span>
            <div className="flex gap-5 mt-4 md:mt-0">
              {/* Use appropriate icons below or Link to social media */}
              <a href="#" aria-label="LinkedIn" className="hover:text-orange-500">
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-orange-500">
                <i className="fab fa-facebook-square text-2xl"></i>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-orange-500">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a href="#" aria-label="TikTok" className="hover:text-orange-500">
                <i className="fab fa-tiktok text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  