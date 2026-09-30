"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { href: "/pregnancy-calculator", label: "Pregnancy" },
  { href: "/due-date-calculator", label: "Due Date" },
  { href: "/pregnancy-week-calculator", label: "Week Calculator" },
  { href: "/trimester-calculator", label: "Trimester" },
  { href: "/baby-size-by-week", label: "Baby Size" },
  { href: "/pregnancy-week-by-week", label: "Week by Week" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu automatically whenever route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle Escape key to close navigation and lock background scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        toggleBtnRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        {/* Brand / Logo (Always on the left) */}
        <Link
          href="/"
          className={styles.brand}
          aria-label="CalculatePregnancy.com Home"
          onClick={closeMenu}
        >
          <span className={styles.brandLogo} aria-hidden="true">🌱</span>
          <span>CalculatePregnancy<span style={{ color: "var(--accent-terracotta)" }}>.com</span></span>
        </Link>

        {/* Desktop Navigation (Hidden on mobile) */}
        <nav className={styles.nav} aria-label="Primary Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA (Hidden on mobile) */}
        <div className={styles.desktopCta}>
          <Link href="/pregnancy-calculator" className={styles.headerCta}>
            Calculate Now
          </Link>
        </div>

        {/* Mobile Hamburger Button (Visible only on mobile) */}
        <button
          ref={toggleBtnRef}
          type="button"
          className={styles.hamburgerBtn}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation-menu"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          onClick={toggleMenu}
        >
          {isOpen ? (
            <svg
              className={styles.hamburgerIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              className={styles.hamburgerIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu & Overlay */}
      {isOpen && (
        <>
          <div
            className={styles.mobileOverlay}
            onClick={closeMenu}
            aria-hidden="true"
          />
          <div
            ref={menuRef}
            id="mobile-navigation-menu"
            className={styles.mobileMenu}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <nav aria-label="Mobile Primary Navigation">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ""}`}
                    onClick={closeMenu}
                  >
                    <span>{item.label}</span>
                    <span className={styles.mobileNavArrow} aria-hidden="true">→</span>
                  </Link>
                );
              })}
            </nav>

            <div className={styles.mobileCtaWrapper}>
              <Link
                href="/pregnancy-calculator"
                className={styles.mobileCta}
                onClick={closeMenu}
              >
                Calculate Now
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
