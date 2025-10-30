"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

type NavItem = {
  name: string;
  route: string;
};

type Category = {
  id: number;
  name: string;
  slug: string;
};

interface NavigationProps {
  categories?: Category[];
}

function buildNavItems(categories: Category[] = []): NavItem[] {
  // Start with home link
  const items: NavItem[] = [
    {
      name: "home",
      route: "/",
    },
  ];

  // Add dynamic category links
  if (categories && categories.length > 0) {
    const categoryItems = categories.map((category) => ({
      name: category.name,
      route: `/${category.slug}`,
    }));
    items.push(...categoryItems);
  }

  // Add info link at the end
  items.push({
    name: "info",
    route: "/info",
  });

  return items;
}

export default function Navigation({ categories = [] }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const navItems = useMemo(() => {
    return buildNavItems(categories);
  }, [categories]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="absolute top-0 w-full z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center pt-4">
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link key={item.name} href={item.route} className="link">
                  {item.name.valueOf()}
                </Link>
              ))}
            </div>
            <button
              ref={buttonRef}
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-16 6h16"
                />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex horizontalRule"></div>
        </div>
        {isMobileMenuOpen && (
          <div ref={menuRef} className="md:hidden px-4 py-2 space-y-4">
            {navItems.map((item) => (
              <Link key={item.name} href={item.route} className=" block link">
                {item.name.valueOf()}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
