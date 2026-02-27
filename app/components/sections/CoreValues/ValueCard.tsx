interface ValueCardProps {
  title: string;
  description: string;
}

const ValueCard = ({ title, description }: ValueCardProps) => (
  <div className="gradient-border backdrop-blur-xs rounded-4xl lg:rounded-[3rem] w-full sm:w-56 lg:w-75 flex-none">
    <div className="rounded-4xl lg:rounded-[3rem] bg-transparent h-full px-4 lg:px-5 py-5 lg:py-6 flex flex-col gap-2 items-center text-center justify-center min-h-36 lg:h-60">
      <h3 className="font-goteam text-accent-yellow text-base lg:text-lg uppercase tracking-wide">
        {title}
      </h3>
      <p className="font-satoshi font-medium text-white/75 text-sm lg:text-md leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

export default ValueCard;
