import ContactHeader from "./ContactUs/ContactHeader";
import ContactInfo from "./ContactUs/ContactInfo";

const ContactUs = () => (
  <section className="bg-linear-to-b from-[#e8f9fc] to-white py-12 md:py-16 px-4 md:px-8">
    <div className="max-w-4xl mx-auto flex flex-col gap-4 md:gap-8">
      <ContactHeader />
      <ContactInfo />
    </div>
  </section>
);

export default ContactUs;
