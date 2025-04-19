"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

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

export function NavMenu() {
  const pathname = usePathname()

  // Function to check if a link is active
  const isActive = (path: string) => {
    // Exact match for home page
    if (path === "/" && pathname === "/") return true

    // For other pages, check if pathname starts with the path (for nested routes)
    if (path !== "/" && pathname.startsWith(path)) return true

    return false
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigationItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuTrigger
              className={cn(
                "text-sm font-medium",
                isActive(item.href) ? "text-[#005EB8]" : "text-gray-700 hover:text-[#005EB8]",
              )}
            >
              {item.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[400px] lg:w-[500px] p-4">
                {item.sections ? (
                  <div className="grid grid-cols-2 gap-4">
                    {item.sections.map((section) => (
                      <div key={section.title}>
                        <h3 className="font-medium text-sm text-gray-500 mb-2">{section.title}</h3>
                        <ul className="space-y-2">
                          {section.items.map((subItem) => (
                            <ListItem
                              key={subItem.title}
                              title={subItem.title}
                              href={subItem.href}
                              isActive={isActive(subItem.href)}
                            >
                              {subItem.description}
                            </ListItem>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : item.items ? (
                  <ul className="grid gap-2">
                    {item.items.map((subItem) => (
                      <ListItem
                        key={subItem.title}
                        title={subItem.title}
                        href={subItem.href}
                        isActive={isActive(subItem.href)}
                      >
                        {subItem.description}
                      </ListItem>
                    ))}
                  </ul>
                ) : null}
                <div className="mt-4 pt-4 border-t">
                  <Link
                    href={item.href}
                    className="text-[#005EB8] hover:underline text-sm font-medium flex items-center"
                  >
                    View All {item.title}
                  </Link>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

interface ListItemProps {
  title: string
  href: string
  children?: React.ReactNode
  isActive?: boolean
}

const ListItem = ({ title, href, children, isActive }: ListItemProps) => {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#A3DFFA]/20",
          isActive ? "bg-[#A3DFFA]/20 text-[#005EB8]" : "text-gray-700 hover:text-[#005EB8]",
        )}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        {children && <p className="line-clamp-2 text-xs leading-snug text-gray-500">{children}</p>}
      </Link>
    </li>
  )
}
