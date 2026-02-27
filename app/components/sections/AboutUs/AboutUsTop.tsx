import { aboutUsBg } from "~/assets";

const AboutUsTop = () => (
  <div className="relative flex-[3] px-6 md:px-12 py-16 md:py-24 flex items-start md:items-center bg-linear-to-b from-[#CAF7FF] to-[#6ed8f5] overflow-hidden">
    <div className="absolute -top-50 left-0 w-full pointer-events-none">
      <img src={aboutUsBg} alt="" className="w-full" />
    </div>

    <div className="relative z-10 max-w-5xl mx-auto w-full mt-8 md:mt-32 lg:mt-40">
      <div className="w-full lg:max-w-[68%]">
        <h2 className="section-title mb-6">
          About <span className="text-[#047C88]">Us!</span>
        </h2>
        <p className="font-satoshi font-medium text-navy-dark text-base md:text-lg leading-relaxed">
          A project of the Agriculture Infrastructure &amp; Leasing
          Corporation (AILC), Blue Sky Theme Park is the centerpiece of the
          BYB Metro township in Bayambang, Pangasinan. Designed to be the
          ultimate destination for families, thrill-seekers, and tourists,
          our park offers a unique blend of adventure, fun, and community
          spirit. Blue Sky Theme Park stands as a symbol of transformation.
          With its world-class attractions, immersive experiences, and
          vibrant atmosphere, it is poised to become Northern Luzon's
          premier leisure destination. As a key component of BYB Metro's
          ambition to become the "BGC of the North," Blue Sky promises to
          offer an unmatched experience in entertainment, relaxation, and
          enjoyment.
        </p>
      </div>
    </div>
  </div>
);

export default AboutUsTop;
