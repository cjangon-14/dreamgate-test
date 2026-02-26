const ContactUs = () => {
  return (
    <section className="bg-linear-to-b from-[#e8f9fc] to-white py-16 px-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Header Box */}
        <div className=" rounded-2xl py-8 px-10 text-center">
          <p className="font-satoshi text-sm font-semibold text-[#047C88] tracking-widest uppercase mb-2">
            Get In Touch
          </p>
          <h2 className="font-bitcrusher text-5xl uppercase mb-3">
            <span className="text-accent-yellow">Contact </span>
            <span className="text-[#047C88]">Us!</span>
          </h2>
          <p className="font-satoshi text-navy-dark/70 text-base tracking-wide">
            Need help with your visit? Our team is just a message away!
          </p>
        </div>

        {/* Contact Info Box */}
        <div className=" rounded-2xl py-10 px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Location */}
            <div className="flex flex-col items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-[#047C88]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6zm0 8.5A2.5 2.5 0 1 1 12 5.5a2.5 2.5 0 0 1 0 5z"
                />
              </svg>
              <h3 className="font-satoshi font-bold text-[#047C88] text-lg">
                Location
              </h3>
              <p className="font-satoshi text-navy-dark/70 text-sm leading-relaxed">
                123 St. Sample Adress of Blue Sky
                <br />
                Themed Park, Bayambang, Pangasinan
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-[#047C88]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"
                />
              </svg>
              <h3 className="font-satoshi font-bold text-[#047C88] text-lg">
                Email
              </h3>
              <p className="font-satoshi text-navy-dark/70 text-sm leading-relaxed">
                bybmetro@email.com /
                <br />
                bluesky@email.com
              </p>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-[#047C88]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              <h3 className="font-satoshi font-bold text-[#047C88] text-lg">
                Phone
              </h3>
              <p className="font-satoshi text-navy-dark/70 text-sm leading-relaxed">
                Globe: 09123456789
                <br />
                Smart: 09123456789
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;