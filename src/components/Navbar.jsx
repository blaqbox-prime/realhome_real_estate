import React from "react";
import { Button } from "@/components/ui/button";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RiMenu3Line } from "react-icons/ri";

const Navbar = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return isMobile ? (
    <Sheet>
      <div className="flex justify-between items-center">
        <h1 className="font-extrabold text-left line">REAL HOME</h1>
        <SheetTrigger>
          <RiMenu3Line size={24} />
        </SheetTrigger>
      </div>
      <SheetContent>
        <SheetHeader>
         
          <SheetDescription>
            <nav className="navbar flex flex-col gap-8">
              <h1 className="font-extrabold text-gray-800 text-2xl text-left line">REAL HOME</h1>
              <ul className="navbar-links flex flex-col gap-6 text-left">
                <li className="hover:text-gray-400 transition-colors duration-150">
                  <Link>Home</Link>
                </li>
                <li className="hover:text-gray-400 transition-colors duration-150">
                  <Link to="properties">Properties</Link>
                </li>
                <li className="hover:text-gray-400 transition-colors duration-150">
                  <Link to="agents">Our Agents</Link>
                </li>
                <li className="hover:text-gray-400 transition-colors duration-150">
                  <Link to="contact">Contact Us</Link>
                </li>
              </ul>

              <div className="navbar-auth-links mt-4 flex gap-4 items-center">
                <FaUserCircle size={26} />
                <Link to="/signin">
                  <Button className="h-7">Sign In</Button>
                </Link>
              </div>
            </nav>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ) : (
    <nav className="navbar flex justify-between items-center">
      <h1 className="font-extrabold text-left line">REAL HOME</h1>
      <ul className="navbar-links flex gap-8 ">
        <li className="hover:text-gray-400 transition-colors duration-150">
          <Link>Home</Link>
        </li>
        <li className="hover:text-gray-400 transition-colors duration-150">
          <Link to="properties">Properties</Link>
        </li>
        <li className="hover:text-gray-400 transition-colors duration-150">
          <Link to="agents">Our Agents</Link>
        </li>
        <li className="hover:text-gray-400 transition-colors duration-150">
          <Link to="contact">Contact Us</Link>
        </li>
      </ul>

      <div className="navbar-auth-links flex gap-4 items-center">
        <FaUserCircle size={26} />
        <Link to="/signin">
          <Button className="h-7">Sign In</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
