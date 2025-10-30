"use client";

import PageHeader from "../components/PageHeader";

export default function InfoPage() {
  return (
    <div>
      <PageHeader heading="Contact & Info" text="Get in Touch" />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="grid gap-12">
          {/* Contact Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <a
                  href="mailto:contact@example.com"
                  className="link hover:underline"
                >
                  contact@example.com
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Phone</h3>
                <a href="tel:+1234567890" className="link hover:underline">
                  +1 (234) 567-890
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Address</h3>
                <p className="text-gray-700">
                  123 Main Street
                  <br />
                  City, State 12345
                  <br />
                  Country
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Hours</h3>
                <p className="text-gray-700">
                  Monday - Friday: 9:00 AM - 5:00 PM
                  <br />
                  Saturday: 10:00 AM - 3:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </section>

          {/* Copyright & Legal Section */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-6">Copyright & Legal</h2>
            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="font-semibold text-lg mb-2">Copyright</h3>
                <p>
                  &copy; {new Date().getFullYear()} Your Studio Name. All rights
                  reserved.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Terms of Service</h3>
                <p>
                  All content on this website is the property of Your Studio Name.
                  Unauthorized reproduction or distribution is prohibited.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Privacy Policy</h3>
                <p>
                  We respect your privacy. Any information collected on this site
                  is used solely for the purpose of communicating with you about
                  our services.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
