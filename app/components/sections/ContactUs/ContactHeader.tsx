const ContactHeader = () => (
  <div className="rounded-2xl py-6 md:py-8 px-6 md:px-10 text-center">
    {/* 
        Updated from #047C88 to your main brand Nebula Blue (#3d3dbd).
        This matches your new global color system perfectly.
    */}
    <p className="font-satoshi text-sm font-semibold text-[#3d3dbd] tracking-widest uppercase mb-2">
      Get In Touch
    </p>
    <h2 className="font-bitcrusher text-4xl md:text-5xl uppercase mb-3">
      <span className="text-accent-yellow">Contact </span>
      <span className="text-[#3d3dbd]">Us!</span>
    </h2>
    <p className="font-satoshi text-navy-dark/70 text-base tracking-wide">
      Need help with your journey? Our team is just a message away!
    </p>
  </div>
);

export default ContactHeader;
