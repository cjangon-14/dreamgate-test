import { aboutUsBg } from "~/assets";

const AboutUsTop = () => (
  <div className="relative flex-3 px-6 md:px-12 py-16 md:py-24 flex items-start md:items-center bg-linear-to-b from-[#F8F9FF] to-[#A5A5FF] overflow-hidden">
    <div className="absolute -top-50 left-0 w-full pointer-events-none">
      <img src={aboutUsBg} alt="" className="w-full" />
    </div>

    <div className="relative z-10 max-w-5xl mx-auto w-full mt-8 md:mt-32 lg:mt-40">
      <div className="w-full lg:max-w-[68%]">
        <h2 className="section-title mb-6">
          About <span className="text-[#047C88]">Us!</span>
        </h2>
        <p className="font-satoshi font-medium text-navy-dark text-base md:text-lg leading-relaxed">
          Born from a passion for immersive storytelling and cutting-edge
          entertainment technology,{" "}
          <span className="font-bold text-secondary">Dream Gate</span> is a
          conceptual portfolio project designed to push the boundaries of the
          modern theme park experience. Originally developed as a centerpiece
          for a major regional township, this vision has evolved into a
          standalone exploration of digital-physical integration.
          <br />
          <br />
          Dream Gate stands as a symbol of creative transformation. With its
          conceptual world-class attractions and vibrant, nebula-themed
          atmosphere, it serves as a benchmark for Northern Luzon's potential in
          the leisure and tourism sector. This project represents the ambition
          to create the ultimate destination for families and thrill-seekers,
          offering an unmatched experience in digital entertainment and
          community-driven fun.
        </p>
      </div>
    </div>
  </div>
);

export default AboutUsTop;
