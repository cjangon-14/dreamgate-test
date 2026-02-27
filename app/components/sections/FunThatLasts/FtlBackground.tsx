import { ftlBg } from "~/assets";

const FtlBackground = () => (
  <div
    className="absolute inset-0 -z-10 pointer-events-none bg-cover bg-bottom bg-no-repeat w-full h-full"
    style={{ backgroundImage: `url(${ftlBg})` }}
  />
);

export default FtlBackground;
