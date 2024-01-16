import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../public/logo.png";

const Navbar = () => {
  return (
    <div className="w-screen h-[60px] flex items-center justify-between bg-slate-500 text-white p-4">
      <Link href="/">
        <Image src={logo} alt="" width={100} height={100} />
      </Link>
      <Link href="/">
        <div>Watch List</div>
      </Link>
    </div>
  );
};

export default Navbar;
