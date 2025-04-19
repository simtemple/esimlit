import { Check, Globe, Info } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PlansPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#005EB8] py-16 px-4 md:px-6 lg:px-8 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your eSIM Plan</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Find the perfect data plan for your travel needs with coverage in over 200 countries
            </p>
          </div>
        </div>
      </section>

      {/* Plan Selection */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1 md:col-span-2">
                <h2 className="text-xl font-semibold text-[#005EB8] mb-4">Find Your Destination</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input type="text" placeholder="Search country or region" className="w-full" />
                  </div>
                  <Button className="bg-[#005EB8] hover:bg-[#004a93]">Search</Button>
                </div>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Need Help?</h3>
                <p className="text-gray-600 mb-4">Not sure which plan is right for you?</p>
                <Button variant="outline" className="w-full border-[#005EB8] text-[#005EB8]">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="popular" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="popular">Popular Destinations</TabsTrigger>
                <TabsTrigger value="regional">Regional Plans</TabsTrigger>
                <TabsTrigger value="global">Global Plans</TabsTrigger>
              </TabsList>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                <Info className="h-4 w-4" />
                <span>Prices shown in USD</span>
              </div>
            </div>

            <TabsContent value="popular" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    country: "Japan",
                    flag: "🇯🇵",
                    plans: [
                      { data: "1GB", days: 7, price: 9.99 },
                      { data: "3GB", days: 15, price: 19.99, popular: true },
                      { data: "5GB", days: 30, price: 29.99 },
                    ],
                  },
                  {
                    country: "United States",
                    flag: "🇺🇸",
                    plans: [
                      { data: "2GB", days: 7, price: 14.99 },
                      { data: "5GB", days: 15, price: 24.99, popular: true },
                      { data: "10GB", days: 30, price: 39.99 },
                    ],
                  },
                  {
                    country: "United Kingdom",
                    flag: "🇬🇧",
                    plans: [
                      { data: "1GB", days: 7, price: 9.99 },
                      { data: "3GB", days: 15, price: 19.99, popular: true },
                      { data: "5GB", days: 30, price: 29.99 },
                    ],
                  },
                  {
                    country: "Thailand",
                    flag: "🇹🇭",
                    plans: [
                      { data: "1GB", days: 7, price: 7.99 },
                      { data: "3GB", days: 15, price: 16.99, popular: true },
                      { data: "5GB", days: 30, price: 24.99 },
                    ],
                  },
                  {
                    country: "Singapore",
                    flag: "🇸🇬",
                    plans: [
                      { data: "1GB", days: 7, price: 8.99 },
                      { data: "3GB", days: 15, price: 18.99, popular: true },
                      { data: "5GB", days: 30, price: 27.99 },
                    ],
                  },
                  {
                    country: "Australia",
                    flag: "🇦🇺",
                    plans: [
                      { data: "1GB", days: 7, price: 9.99 },
                      { data: "3GB", days: 15, price: 19.99, popular: true },
                      { data: "5GB", days: 30, price: 29.99 },
                    ],
                  },
                ].map((destination, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{destination.flag}</span>
                        <CardTitle>{destination.country}</CardTitle>
                      </div>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Globe className="h-3 w-3" />
                        <span>4G/LTE Coverage</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {destination.plans.map((plan, planIndex) => (
                          <div
                            key={planIndex}
                            className={`flex justify-between items-center p-3 rounded-lg border ${plan.popular ? "border-[#4A90E2] bg-[#A3DFFA]/10" : "border-gray-200"}`}
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{plan.data}</span>
                                {plan.popular && (
                                  <span className="px-2 py-0.5 bg-[#4A90E2] text-white text-xs rounded-full">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-500">{plan.days} days</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <div className="font-semibold text-[#005EB8]">${plan.price}</div>
                              </div>
                              <Button size="sm" className="bg-[#005EB8] hover:bg-[#004a93]" asChild>
                                <Link
                                  href={`/checkout?planId=${destination.country.toLowerCase()}-${plan.data.toLowerCase().replace("gb", "")}`}
                                >
                                  Select
                                </Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Instant activation</span>
                      </div>
                      <Button variant="link" className="text-[#005EB8] p-0">
                        View details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="regional" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    region: "Europe",
                    icon: "🇪🇺",
                    countries: "30+ countries",
                    plans: [
                      { data: "3GB", days: 10, price: 19.99 },
                      { data: "5GB", days: 15, price: 29.99, popular: true },
                      { data: "10GB", days: 30, price: 49.99 },
                    ],
                  },
                  {
                    region: "Asia Pacific",
                    icon: "🌏",
                    countries: "15+ countries",
                    plans: [
                      { data: "3GB", days: 10, price: 19.99 },
                      { data: "5GB", days: 15, price: 29.99, popular: true },
                      { data: "10GB", days: 30, price: 49.99 },
                    ],
                  },
                  {
                    region: "North America",
                    icon: "🌎",
                    countries: "3 countries",
                    plans: [
                      { data: "3GB", days: 10, price: 19.99 },
                      { data: "5GB", days: 15, price: 29.99, popular: true },
                      { data: "10GB", days: 30, price: 49.99 },
                    ],
                  },
                ].map((region, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 pb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{region.icon}</span>
                        <CardTitle>{region.region}</CardTitle>
                      </div>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Globe className="h-3 w-3" />
                        <span>{region.countries}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {region.plans.map((plan, planIndex) => (
                          <div
                            key={planIndex}
                            className={`flex justify-between items-center p-3 rounded-lg border ${plan.popular ? "border-[#4A90E2] bg-[#A3DFFA]/10" : "border-gray-200"}`}
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{plan.data}</span>
                                {plan.popular && (
                                  <span className="px-2 py-0.5 bg-[#4A90E2] text-white text-xs rounded-full">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-500">{plan.days} days</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <div className="font-semibold text-[#005EB8]">${plan.price}</div>
                              </div>
                              <Button size="sm" className="bg-[#005EB8] hover:bg-[#004a93]">
                                Select
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Regional coverage</span>
                      </div>
                      <Button variant="link" className="text-[#005EB8] p-0">
                        View countries
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="global" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "Global Lite",
                    data: "5GB",
                    days: 15,
                    price: 39.99,
                    features: [
                      "Coverage in 100+ countries",
                      "4G/LTE where available",
                      "24/7 customer support",
                      "No hidden fees",
                    ],
                  },
                  {
                    name: "Global Plus",
                    data: "10GB",
                    days: 30,
                    price: 59.99,
                    popular: true,
                    features: [
                      "Coverage in 170+ countries",
                      "4G/LTE where available",
                      "24/7 customer support",
                      "No hidden fees",
                      "Data sharing",
                    ],
                  },
                  {
                    name: "Global Pro",
                    data: "20GB",
                    days: 30,
                    price: 89.99,
                    features: [
                      "Coverage in 200+ countries",
                      "4G/LTE where available",
                      "24/7 customer support",
                      "No hidden fees",
                      "Data sharing",
                      "Multi-device support",
                    ],
                  },
                ].map((plan, index) => (
                  <Card key={index} className={`overflow-hidden ${plan.popular ? "ring-2 ring-[#4A90E2]" : ""}`}>
                    {plan.popular && (
                      <div className="bg-[#4A90E2] text-white text-center py-1 text-sm font-medium">Most Popular</div>
                    )}
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>Global coverage for travelers</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <div className="text-3xl font-bold text-[#005EB8]">${plan.price}</div>
                        <div className="text-sm text-gray-500">Valid for {plan.days} days</div>
                      </div>

                      <div className="flex items-center gap-2 mb-6">
                        <span className="text-lg font-medium">{plan.data}</span>
                        <span className="px-2 py-1 bg-[#A3DFFA] text-[#005EB8] text-xs font-medium rounded-full">
                          {plan.days} days
                        </span>
                      </div>

                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="h-5 w-5 text-[#4A90E2] mr-2 shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                      <Button className="w-full bg-[#005EB8] hover:bg-[#004a93]" asChild>
                        <Link href={`/checkout?planId=global-${plan.data.toLowerCase().replace("gb", "")}`}>
                          Select Plan
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#005EB8] mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Find answers to common questions about our eSIM plans</p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "What is an eSIM?",
                answer:
                  "An eSIM (embedded SIM) is a digital SIM that allows you to activate a cellular plan without having to use a physical SIM card. It's built into your device and can be programmed to connect to different mobile networks.",
              },
              {
                question: "How do I activate my eSIM?",
                answer:
                  "After purchasing a plan, you'll receive a QR code. On your device, go to Settings > Cellular/Mobile > Add Cellular/Mobile Plan, then scan the QR code. Follow the on-screen instructions to complete activation.",
              },
              {
                question: "Which devices are compatible with eSIM?",
                answer:
                  "Most newer smartphones and tablets support eSIM, including iPhone XS and newer, Google Pixel 3 and newer, Samsung Galaxy S20 and newer, and many iPad models. Check your device specifications or our compatibility checker for confirmation.",
              },
              {
                question: "Can I use my eSIM and physical SIM at the same time?",
                answer:
                  "Yes, if your device supports dual SIM functionality, you can use both your eSIM and physical SIM simultaneously. This allows you to have two different phone numbers or data plans on one device.",
              },
              {
                question: "What happens when my data runs out or expires?",
                answer:
                  "When your data is depleted or your plan expires, you'll need to purchase a new plan to continue using data services. You can easily buy a new plan through our app or website.",
              },
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#005EB8] mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Button className="bg-[#005EB8] hover:bg-[#004a93]">Contact Support</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
