interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}

const ContactItem = ({ icon, label, children }: ContactItemProps) => (
  <div className="flex flex-col items-center gap-3">
    <div className="w-8 h-8 text-[#047C88]">{icon}</div>
    <h3 className="font-satoshi font-bold text-[#047C88] text-lg">{label}</h3>
    <p className="font-satoshi text-navy-dark/70 text-sm leading-relaxed text-center">
      {children}
    </p>
  </div>
);

const ContactInfo = () => (
  <div className="rounded-2xl py-8 md:py-10 px-6 md:px-10">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
      <ContactItem
        label="Location"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6zm0 8.5A2.5 2.5 0 1 1 12 5.5a2.5 2.5 0 0 1 0 5z" />
          </svg>
        }
      >
        123 St. Sample Address of Blue Sky
        <br />
        Themed Park, Bayambang, Pangasinan
      </ContactItem>

      <ContactItem
        label="Email"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
          </svg>
        }
      >
        bybmetro@email.com
        <br />
        bluesky@email.com
      </ContactItem>

      <ContactItem
        label="Phone"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
        }
      >
        Globe: 09123456789
        <br />
        Smart: 09123456789
      </ContactItem>
    </div>
  </div>
);

export default ContactInfo;
