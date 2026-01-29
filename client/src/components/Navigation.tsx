"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className="fixed top-4 left-4 right-4 z-50 glass-nav rounded-2xl text-purple-100 shadow-lg"
      aria-label="主選單"
    >
      <div className="px-5 py-3 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link
          href="/"
          className="font-semibold text-base sm:text-lg text-purple-200 hover:text-amber-300 transition-colors duration-200"
          onClick={closeMenu}
        >
          Wade Through Tarot
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-1 items-center">
          <Link href="/" className="px-3 py-2 rounded-lg text-purple-200/80 hover:text-purple-100 hover:bg-purple-500/10 transition-all duration-200">
            首頁
          </Link>
          <Link href="/cards" className="px-3 py-2 rounded-lg text-purple-200/80 hover:text-purple-100 hover:bg-purple-500/10 transition-all duration-200">
            塔羅牌圖鑑
          </Link>
          <Link href="/learn" className="px-3 py-2 rounded-lg text-purple-200/80 hover:text-purple-100 hover:bg-purple-500/10 transition-all duration-200">
            塔羅教學
          </Link>
          <Link
            href="/history"
            className="px-3 py-2 rounded-lg text-purple-200/80 hover:text-purple-100 hover:bg-purple-500/10 transition-all duration-200"
          >
            占卜記錄
          </Link>
          <Link href="/info" className="px-3 py-2 rounded-lg text-purple-200/80 hover:text-purple-100 hover:bg-purple-500/10 transition-all duration-200">
            關於與隱私
          </Link>
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 hover:bg-purple-500/20 rounded-lg transition-colors duration-200"
          onClick={toggleMenu}
          aria-label={isOpen ? "關閉選單" : "開啟選單"}
          aria-expanded={isOpen}
        >
          <span
            className={`w-5 h-0.5 bg-purple-200 transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-purple-200 transition-opacity duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-purple-200 transition-transform duration-300 ${
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
        <div className="px-4 py-3 flex flex-col gap-1 border-t border-purple-500/20">
          <Link
            href="/"
            className="py-2.5 px-4 text-purple-200/80 hover:text-purple-100 hover:bg-purple-500/15 rounded-lg transition-all duration-200"
            onClick={closeMenu}
          >
            首頁
          </Link>
          <Link
            href="/cards"
            className="py-2.5 px-4 text-purple-200/80 hover:text-purple-100 hover:bg-purple-500/15 rounded-lg transition-all duration-200"
            onClick={closeMenu}
          >
            塔羅牌圖鑑
          </Link>
          <Link
            href="/learn"
            className="py-2.5 px-4 text-purple-200/80 hover:text-purple-100 hover:bg-purple-500/15 rounded-lg transition-all duration-200"
            onClick={closeMenu}
          >
            塔羅教學
          </Link>
          <Link
            href="/history"
            className="py-2.5 px-4 text-purple-200/80 hover:text-purple-100 hover:bg-purple-500/15 rounded-lg transition-all duration-200"
            onClick={closeMenu}
          >
            占卜記錄
          </Link>
          <Link
            href="/info"
            className="py-2.5 px-4 text-purple-200/80 hover:text-purple-100 hover:bg-purple-500/15 rounded-lg transition-all duration-200"
            onClick={closeMenu}
          >
            關於與隱私
          </Link>
        </div>
      </div>
    </nav>
  );
}
