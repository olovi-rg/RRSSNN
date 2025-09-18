import ContactForm from '../../components/ContactForm';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question or want to work together? We'd love to hear from you.
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Contact Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <span className="text-gray-600">contact@yourcompany.com</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <span className="text-gray-600">123 Business St, City, State 12345</span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Business Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
