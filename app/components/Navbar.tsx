import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../public/dojo-logo.png";

function Navbar() {
  return (
    <nav>
      <Image
        src={Logo}
        alt="dojo-helpdesk-logo"
        width={70}
        quality={100}
        placeholder="blur"
      />
      <h1>Dojo Helpline</h1>
      <Link href="/">Go to Dashboard </Link>
      <Link href="/tickets">Go to Ticket</Link>
    </nav>
  );
}

export default Navbar;
