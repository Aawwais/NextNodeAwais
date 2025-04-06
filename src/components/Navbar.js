"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    // Add logic for logging out
    console.log("User logged out");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">MyApp</div>

        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
          </button>
        </div>

        {/* Links for Desktop */}
        <div className="hidden lg:flex space-x-6">
          <Link href="/admin/todo" className="hover:text-gray-400">
            Todo App
          </Link>
          <Link href="/admin/dashboard" className="hover:text-gray-400">
            Dashboard
          </Link>
          <Link href="/admin/chat" className="hover:text-gray-400">
            Chat
          </Link>
          <button onClick={handleLogout} className="hover:text-gray-400">
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden mt-4 space-y-4">
          <Link href="/admin/todo" className="hover:text-gray-400">
            Todo App
          </Link>
          <Link href="/admin/dashboard" className="hover:text-gray-400">
            Dashboard
          </Link>
          <Link href="/admin/chat" className="hover:text-gray-400">
            Chat
          </Link>
          <button
            onClick={handleLogout}
            className="block px-4 py-2 w-full text-left hover:bg-gray-700 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
