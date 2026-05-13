const WhyDreamGateContent = () => (
  <div className="flex-1">
    <h2 className="font-bitcrusher text-4xl sm:text-5xl lg:text-6xl uppercase mb-6">
      <span className="text-accent-gold">Why </span>
      {/* 
          Maintains your theme variable names 'text-navy-dark' 
          while shifting the actual brand text to your new name.
      */}
      <span className="text-navy-dark">Dream Gate?</span>
    </h2>

    <div className="flex flex-col gap-4 font-satoshi font-medium text-navy-dark text-base leading-relaxed">
      <p>
        Dream Gate isn&apos;t just a conceptual attraction; it represents a
        forward-looking vision for the future of interactive entertainment
        architecture. Built on a framework of physical engineering and rich
        digital integration, this venture stands as a benchmark for high-end
        design, immersive tourism, and creative spatial layout. The entire
        architecture is designed to celebrate the spirit of ambition, the thrill
        of discovery, and the boundless potential of creative tech.
      </p>
      <p>
        Set against a beautifully framed, atmospheric backdrop, Dream Gate
        represents a strong artistic trajectory—where high-end visual design,
        conceptual growth, and future portfolio possibilities come together to
        showcase a world-class entertainment standard.
      </p>
    </div>
  </div>
);

export default WhyDreamGateContent;
