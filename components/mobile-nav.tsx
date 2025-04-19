"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, UserPlus, Globe, ChevronRight, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
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
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // Function to check if a link is active
  const isActive = (path: string) => {
    // Exact match for home page
    if (path === "/" && pathname === "/") return true

    // For other pages, check if pathname starts with the path (for nested routes)
    if (path !== "/" && pathname.startsWith(path)) return true

    return false
  }

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85%] sm:w-[350px] pr-0 p-0">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <SheetHeader className="mb-2">
              <div className="flex items-center justify-between">
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#005EB8] text-white font-bold">
                    e+
                  </div>
                  <span className="text-xl font-bold text-[#005EB8]">eSIM Plus</span>
                </SheetTitle>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </SheetClose>
              </div>
            </SheetHeader>

            <div className="flex items-center gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1 justify-start">
                <Globe className="h-4 w-4 mr-2" />
                English
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="flex flex-col space-y-1 p-4">
              <Accordion type="multiple" value={expandedItems} className="w-full">
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
                        <AccordionTrigger onClick={() => toggleExpanded(item.title)} className="py-0 px-0">
                          <span className="sr-only">Toggle {item.title} submenu</span>
                        </AccordionTrigger>
                      )}
                    </div>

                    <AccordionContent className="animate-accordion-down">
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
                                        "flex items-center py-2 text-sm",
                                        isActive(subItem.href) ? "text-[#005EB8]" : "text-gray-700",
                                      )}
                                      onClick={() => setOpen(false)}
                                    >
                                      <span className="flex-1">{subItem.title}</span>
                                      <ChevronRight className="h-4 w-4 opacity-50" />
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
                                  "flex items-center py-2 text-sm",
                                  isActive(subItem.href) ? "text-[#005EB8]" : "text-gray-700",
                                )}
                                onClick={() => setOpen(false)}
                              >
                                <span className="flex-1">{subItem.title}</span>
                                <ChevronRight className="h-4 w-4 opacity-50" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Authentication links */}
          <div className="border-t border-gray-200 p-4 space-y-3 mt-auto">
            <Link
              href="/login"
              className="flex items-center w-full py-2.5 px-4 text-base font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              onClick={() => setOpen(false)}
            >
              <User className="h-5 w-5 mr-3 text-gray-600" />
              Log in
            </Link>
            <Link
              href="/signup"
              className="flex items-center justify-center w-full py-2.5 px-4 text-base font-medium text-white bg-[#005EB8] rounded-md hover:bg-[#004a93] transition-colors"
              onClick={() => setOpen(false)}
            >
              <UserPlus className="h-5 w-5 mr-3" />
              Sign up
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
