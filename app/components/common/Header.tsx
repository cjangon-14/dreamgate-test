import React from 'react'
import headerLogo from "../../assets/header-logo.svg"

const Header = () => {
  return (
    <header className=" sticky top-0 w-full py-4 text-center z-1 flex justify-between items-center px-15">
      <div className="w-80">
        <img src={headerLogo} alt="Header Logo" />
        <img src="../assets/header-logo.svg" alt="" />
      </div>

      <div className=" mr-4 flex flex-1 justify-center items-center gap-4">
        <p>section 1</p>
        <p>section 2</p>
        <p>section 3</p>
      </div>

      <div className="flex justify-center items-center gap-4 w-80 ">
        <button className="btn-outline text-[14px]">Customer Support</button>
        <button className="btn-outline text-[14px]">Help</button>
      </div>
    </header>
  );
}

export default Header