"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className="w-full fixed top-0 left-0 z-50 bg-slate-900/95 backdrop-blur-sm text-blue-100 shadow-md"
      aria-label="主選單"
    >
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link
          href="/"
          className="font-semibold text-base sm:text-lg hover:text-blue-300 transition-colors"
          onClick={closeMenu}
        >
          Wade Through Tarot
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/" className="hover:text-blue-300 transition-colors">
            首頁
          </Link>
          <Link href="/cards" className="hover:text-blue-300 transition-colors">
            塔羅牌圖鑑
          </Link>
          <Link href="/learn" className="hover:text-blue-300 transition-colors">
            塔羅教學
          </Link>
          <Link
            href="/history"
            className="hover:text-blue-300 transition-colors"
          >
            占卜記錄
          </Link>
          <Link href="/info" className="hover:text-blue-300 transition-colors">
            關於與隱私
          </Link>
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 hover:bg-slate-800 rounded transition-colors"
          onClick={toggleMenu}
          aria-label={isOpen ? "關閉選單" : "開啟選單"}
          aria-expanded={isOpen}
        >
          <span
            className={`w-6 h-0.5 bg-blue-100 transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-blue-100 transition-opacity duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-blue-100 transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-2 flex flex-col gap-1 border-t border-slate-700">
          <Link
            href="/"
            className="py-2.5 px-3 hover:bg-slate-800 rounded transition-colors"
            onClick={closeMenu}
          >
            首頁
          </Link>
          <Link
            href="/cards"
            className="py-2.5 px-3 hover:bg-slate-800 rounded transition-colors"
            onClick={closeMenu}
          >
            塔羅牌圖鑑
          </Link>
          <Link
            href="/learn"
            className="py-2.5 px-3 hover:bg-slate-800 rounded transition-colors"
            onClick={closeMenu}
          >
            塔羅教學
          </Link>
          <Link
            href="/history"
            className="py-2.5 px-3 hover:bg-slate-800 rounded transition-colors"
            onClick={closeMenu}
          >
            占卜記錄
          </Link>
          <Link
            href="/info"
            className="py-2.5 px-3 hover:bg-slate-800 rounded transition-colors"
            onClick={closeMenu}
          >
            關於與隱私
          </Link>
        </div>
      </div>
    </nav>
  );
}
