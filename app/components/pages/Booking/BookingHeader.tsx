export default function BookingHeader() {
  return (
    <>
      <div
        className="w-full overflow-visible relative"
        style={{
          background:
            "radial-gradient(ellipse 200% 230% at 50% 20%, #1e1e60 9%, #2a2a8c 30%, #3d3dbd 60%, #5c5ce0 100%)",
        }}
      >
        <div className="container mx-auto px-12 md:px-42 py-5 md:py-5 flex items-center justify-between gap-8">
          <div>
            <h1 className="text-lg md:text-lg font-satoshi font-bold text-white">
              Book Your Journey
            </h1>
            <p className="text-md font-satoshi font-[300] text-white/90 max-w-3xl">
              Secure your passage into the realm and dive into cosmic thrills
              and everlasting moments. Already booked? Verify your threshold
              status.
            </p>
          </div>
          <button className="px-6 py-2 border-2 rounded-md border-navy-main/40 cursor-pointer text-white font-satoshi font-bold whitespace-nowrap hover:bg-navy-main/80 transition">
            CHECK STATUS
          </button>
        </div>
      </div>
    </>
  );
}