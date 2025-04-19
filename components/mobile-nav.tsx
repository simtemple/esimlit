"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

// Import the same navigation structure from nav-menu.tsx
// Define the types for our navigation items
interface NavItem {
  title: string
  href: string
  description?: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

interface MainNavItem {
  title: string
  href: string
  sections?: NavSection[]
  items?: NavItem[]
}

// Define our navigation structure
const navigationItems: MainNavItem[] = [
  {
    title: "Plans",
    href: "/plans",
    sections: [
      {
        title: "By Region",
        items: [
          {
            title: "Popular Destinations",
            href: "/plans?tab=popular",
            description: "Most popular travel destinations with eSIM coverage",
          },
          {
            title: "Regional Plans",
            href: "/plans?tab=regional",
            description: "Multi-country plans for specific regions",
          },
          {
            title: "Global Plans",
            href: "/plans?tab=global",
            description: "Worldwide coverage for international travelers",
          },
        ],
      },
      {
        title: "By Type",
        items: [
          {
            title: "Data Packages",
            href: "/plans/data-packages",
            description: "Choose the right amount of data for your needs",
          },
          {
            title: "Long-term Plans",
            href: "/plans/long-term",
            description: "Extended coverage for frequent travelers",
          },
          {
            title: "Compare Plans",
            href: "/plans/compare",
            description: "Side-by-side comparison of all available plans",
          },
        ],
      },
    ],
  },
  {
    title: "Business",
    href: "/business",
    sections: [
      {
        title: "Solutions",
        items: [
          {
            title: "Enterprise Solutions",
            href: "/business/enterprise",
            description: "Custom eSIM solutions for large organizations",
          },
          {
            title: "Team Management",
            href: "/business/team",
            description: "Manage eSIMs for your entire team",
          },
          {
            title: "Bulk Ordering",
            href: "/business/bulk-ordering",
            description: "Volume discounts for multiple eSIMs",
          },
        ],
      },
      {
        title: "Resources",
        items: [
          {
            title: "Case Studies",
            href: "/business/case-studies",
            description: "Success stories from our business customers",
          },
          {
            title: "Request Demo",
            href: "/business/demo",
            description: "Schedule a demonstration of our business platform",
          },
          {
            title: "Pricing",
            href: "/business/pricing",
            description: "Transparent pricing for business customers",
          },
        ],
      },
    ],
  },
  {
    title: "How It Works",
    href: "/how-it-works",
    items: [
      {
        title: "eSIM Technology",
        href: "/how-it-works#technology",
        description: "Learn about the technology behind eSIMs",
      },
      {
        title: "Activation Guide",
        href: "/how-it-works#activation",
        description: "Step-by-step guide to activating your eSIM",
      },
      {
        title: "Device Compatibility",
        href: "/how-it-works#compatibility",
        description: "Check if your device supports eSIM technology",
      },
      {
        title: "FAQs",
        href: "/how-it-works#faqs",
        description: "Answers to commonly asked questions",
      },
    ],
  },
  {
    title: "Support",
    href: "/support",
    items: [
      {
        title: "Help Center",
        href: "/support/help",
        description: "Browse our knowledge base for answers",
      },
      {
        title: "Contact Us",
        href: "/support/contact",
        description: "Get in touch with our customer support team",
      },
      {
        title: "Troubleshooting",
        href: "/support/troubleshooting",
        description: "Solutions to common technical issues",
      },
      {
        title: "Account Issues",
        href: "/support/account",
        description: "Help with account-related problems",
      },
    ],
  },
]

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Function to check if a link is active
  const isActive = (path: string) => {
    // Exact match for home page
    if (path === "/" && pathname === "/") return true

    // For other pages, check if pathname starts with the path (for nested routes)
    if (path !== "/" && pathname.startsWith(path)) return true

    return false
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85%] sm:w-[350px] pr-0">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#005EB8] text-white font-bold">
              e+
            </div>
            <span className="text-xl font-bold text-[#005EB8]">eSIM Plus</span>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4 pr-6">
          <Accordion type="multiple" className="w-full">
            {navigationItems.map((item) => (
              <AccordionItem key={item.title} value={item.title} className="border-b border-gray-200">
                <div className="flex">
                  {/* Main category link */}
                  <Link
                    href={item.href}
                    className={cn(
                      "flex-1 py-4 text-base font-medium",
                      isActive(item.href) ? "text-[#005EB8]" : "text-gray-700",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.title}
                  </Link>

                  {/* Expand/collapse trigger if there are subitems */}
                  {(item.sections || item.items) && (
                    <AccordionTrigger className="py-0 px-0">
                      <span className="sr-only">Toggle {item.title} submenu</span>
                    </AccordionTrigger>
                  )}
                </div>

                <AccordionContent>
                  {item.sections ? (
                    // Render sections with their items
                    <div className="pl-4 pb-2 space-y-4">
                      {item.sections.map((section) => (
                        <div key={section.title} className="space-y-2">
                          <h3 className="text-sm font-medium text-gray-500">{section.title}</h3>
                          <ul className="space-y-2 pl-2">
                            {section.items.map((subItem) => (
                              <li key={subItem.title}>
                                <Link
                                  href={subItem.href}
                                  className={cn(
                                    "block py-2 text-sm",
                                    isActive(subItem.href) ? "text-[#005EB8]" : "text-gray-700",
                                  )}
                                  onClick={() => setOpen(false)}
                                >
                                  {subItem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : item.items ? (
                    // Render direct items
                    <ul className="pl-4 pb-2 space-y-2">
                      {item.items.map((subItem) => (
                        <li key={subItem.title}>
                          <Link
                            href={subItem.href}
                            className={cn(
                              "block py-2 text-sm",
                              isActive(subItem.href) ? "text-[#005EB8]" : "text-gray-700",
                            )}
                            onClick={() => setOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Authentication links */}
          <div className="border-t border-gray-200 pt-4 space-y-4">
            <Link
              href="/login"
              className="block py-2 text-base font-medium text-gray-700"
              onClick={() => setOpen(false)}
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="block w-full py-2 px-4 text-center text-base font-medium text-white bg-[#005EB8] rounded-md hover:bg-[#004a93]"
              onClick={() => setOpen(false)}
            >
              Sign up
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
