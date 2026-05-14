const JustHaveFun = () => (
  /* 
     - bg-primary: Solid Nebula Blue background block with zero gradients.
     - py-16 md:py-24: Balanced padding that gives the solid block an open, professional feel.
  */
  <section className="bg-primary py-16 md:py-24 px-6 md:px-8 text-center">
    <h2 className="font-bitcrusher text-4xl sm:text-5xl md:text-6xl uppercase mb-4 tracking-wide">
      {/* High-visibility branding text sitting on top of the solid blue field */}
      <span className="text-secondary">Unlock The Wonder </span>
      <span className="text-white">With Us!</span>
    </h2>
    <p className="font-satoshi text-cloud-light text-base md:text-lg max-w-sm sm:max-w-md md:max-w-xl lg:max-w-[45%] mx-auto leading-relaxed">
      Feel the rush as you dive into cosmic thrills and pulse-pumping
      attractions built to ignite your imagination. Every corner of the realm
      bursts with reality-bending adventure and moments that keep your energy
      soaring.
    </p>
  </section>
);

export default JustHaveFun;
