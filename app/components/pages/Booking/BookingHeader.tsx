export default function BookingHeader() {
  return (
    <>
    <div
      className="w-full overflow-visible relative"
      style={{
        background:
          "radial-gradient(ellipse 200% 230% at 50% 20%, #003154 9%, #014D6C 30%, #03778F 60%, #06AEBD 100%)",
        }}
        >
      <div className="container mx-auto px-12 md:px-42 py-5 md:py-5 flex items-center justify-between gap-8">
        <div>
          <h1 className="text-lg md:text-lg font-satoshi font-bold text-white">
            Book Now!
          </h1>
          <p className="text-md font-satoshi font-[300] text-white/90 max-w-3xl">
            Book now and dive into pure thrills and unforgettable moments.
            Already booked? Verify your status.
          </p>
        </div>
        <button className="px-6 py-2 border-2 rounded-md border-navy-main/30 cursor-pointer text-white font-satoshi font-bold whitespace-nowrap hover:bg-white/10 transition">
          CHECK STATUS
        </button>
      </div>
      
    </div>
    
      </>
  );
}