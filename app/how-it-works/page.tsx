import Link from "next/link"
import { ArrowRight, Check, HelpCircle, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#005EB8] py-16 px-4 md:px-6 lg:px-8 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">How eSIM Plus Works</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Get connected in minutes with our simple, hassle-free eSIM activation process
            </p>
          </div>
        </div>
      </section>

      {/* Step by Step Guide */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#005EB8] mb-4">Simple 3-Step Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our streamlined process gets you connected quickly and easily
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Choose Your Plan",
                description:
                  "Browse our range of data plans based on your destination and needs. We offer plans for 200+ countries with transparent pricing.",
                image: "/choosing-service-plan.png",
              },
              {
                step: "02",
                title: "Activate Your eSIM",
                description:
                  "After purchase, you'll receive a QR code. Scan it with your device to download and install your eSIM profile instantly.",
                image: "/qr-code-scan.png",
              },
              {
                step: "03",
                title: "Connect & Go",
                description:
                  "Once activated, your eSIM is ready to use. Simply enable data roaming and enjoy seamless connectivity wherever you travel.",
                image: "/train-commute-texting.png",
              },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="bg-[#A3DFFA]/20 rounded-full h-20 w-20 flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-[#005EB8]">{step.step}</span>
                </div>
                <img
                  src={step.image || "/placeholder.svg"}
                  alt={step.title}
                  className="rounded-lg mb-6 w-full max-w-xs h-auto"
                />
                <h3 className="text-xl font-semibold mb-3 text-[#005EB8]">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" asChild className="bg-[#005EB8] hover:bg-[#004a93]">
              <Link href="/plans">
                Browse Plans
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Device Compatibility */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#005EB8] mb-4">Device Compatibility</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Check if your device supports eSIM technology</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Compatible Smartphones</CardTitle>
                <CardDescription>Most newer smartphones support eSIM technology</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "iPhone XS and newer",
                    "Google Pixel 3 and newer",
                    "Samsung Galaxy S20 and newer",
                    "Samsung Galaxy Note 20 and newer",
                    "Samsung Galaxy Fold and Z Flip series",
                    "Motorola Razr (2020)",
                    "Huawei P40 and newer",
                  ].map((device, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>{device}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compatible Tablets & Wearables</CardTitle>
                <CardDescription>Many tablets and smartwatches also support eSIM</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "iPad Pro (2018 and newer)",
                    "iPad Air (3rd generation and newer)",
                    "iPad (7th generation and newer)",
                    "iPad mini (5th generation and newer)",
                    "Apple Watch Series 4 and newer",
                    "Samsung Galaxy Watch 3 and newer",
                    "Microsoft Surface Pro X",
                  ].map((device, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>{device}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="rounded-full bg-[#A3DFFA]/20 p-4 shrink-0">
                <HelpCircle className="h-8 w-8 text-[#005EB8]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[#005EB8]">Not sure if your device is compatible?</h3>
                <p className="text-gray-600 mb-4">
                  Use our compatibility checker tool or contact our support team for assistance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-[#005EB8] hover:bg-[#004a93]">Check Compatibility</Button>
                  <Button variant="outline" className="border-[#005EB8] text-[#005EB8]">
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Activate */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#005EB8] mb-4">How to Activate Your eSIM</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to activate your eSIM on your device
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/esim-activation-progress.png"
                alt="eSIM Activation"
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-[#005EB8]">iPhone Activation</h3>
              <ol className="space-y-6">
                {[
                  {
                    title: "Go to Settings",
                    description: "Open the Settings app on your iPhone",
                  },
                  {
                    title: "Select Cellular/Mobile",
                    description: "Tap on Cellular or Mobile Data depending on your region",
                  },
                  {
                    title: "Add Cellular/Mobile Plan",
                    description: "Tap on 'Add Cellular Plan' or 'Add Mobile Data Plan'",
                  },
                  {
                    title: "Scan QR Code",
                    description: "Use your iPhone camera to scan the QR code we provided after purchase",
                  },
                  {
                    title: "Confirm Activation",
                    description: "Follow the on-screen instructions to complete the activation",
                  },
                ].map((step, index) => (
                  <li key={index} className="flex">
                    <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#A3DFFA] text-[#005EB8] font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-8">
                <Button asChild className="bg-[#005EB8] hover:bg-[#004a93]">
                  <Link href="/support/activation-guides">
                    View All Device Guides
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#005EB8] mb-4">Benefits of Using eSIM</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover why eSIM technology is revolutionizing global connectivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "No Physical SIM Card",
                description: "No need to swap SIM cards or worry about losing them. eSIM is built into your device.",
                icon: <Smartphone className="h-10 w-10 text-[#005EB8]" />,
              },
              {
                title: "Multiple Profiles",
                description: "Store multiple eSIM profiles on one device and switch between them easily.",
                icon: (
                  <svg className="h-10 w-10 text-[#005EB8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                ),
              },
              {
                title: "Instant Activation",
                description: "Activate your eSIM instantly without waiting for physical delivery.",
                icon: (
                  <svg className="h-10 w-10 text-[#005EB8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                title: "Cost Effective",
                description: "Save on expensive roaming charges with our affordable global data plans.",
                icon: (
                  <svg className="h-10 w-10 text-[#005EB8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Eco-Friendly",
                description: "Reduce plastic waste by eliminating the need for physical SIM cards.",
                icon: (
                  <svg className="h-10 w-10 text-[#005EB8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                ),
              },
              {
                title: "Secure Connection",
                description: "eSIM technology offers enhanced security features compared to physical SIM cards.",
                icon: (
                  <svg className="h-10 w-10 text-[#005EB8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                ),
              },
            ].map((benefit, index) => (
              <Card key={index} className="border border-gray-200">
                <CardContent className="pt-6">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-[#005EB8]">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#005EB8] to-[#4A90E2] py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience eSIM?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of satisfied travelers who enjoy seamless connectivity worldwide with eSIM Plus
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-[#005EB8] hover:bg-[#E6E6E6]">
              <Link href="/plans">Browse Plans</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
