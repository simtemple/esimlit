import Link from "next/link"
import { ArrowRight, Globe, Shield, Smartphone, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#005EB8] to-[#4A90E2] py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Seamlessly Connect Anytime, Anywhere
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                No physical SIM cards needed! Enjoy seamless global roaming with eSIM technology in 200+ countries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" asChild className="bg-white text-[#005EB8] hover:bg-[#E6E6E6]">
                  <Link href="/plans">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
                  <Link href="/how-it-works">How It Works</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-white/10 rounded-3xl blur-xl"></div>
                <img
                  src="/connect-smartphone.png"
                  alt="eSIM Global Connectivity"
                  className="relative z-10 w-full h-auto rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#005EB8] mb-4">Why Choose Lit Mobile</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience the future of connectivity with our cutting-edge eSIM technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Globe className="h-10 w-10 text-[#005EB8]" />,
                title: "Global Coverage",
                description: "Connect in 200+ countries with reliable network coverage worldwide",
              },
              {
                icon: <Zap className="h-10 w-10 text-[#005EB8]" />,
                title: "Instant Activation",
                description: "Activate your eSIM instantly with just a few clicks, no physical SIM needed",
              },
              {
                icon: <Shield className="h-10 w-10 text-[#005EB8]" />,
                title: "Secure Connection",
                description: "Enterprise-grade security for all your data and communications",
              },
              {
                icon: <Smartphone className="h-10 w-10 text-[#005EB8]" />,
                title: "Multi-Device Support",
                description: "Use one account to manage eSIMs across all your compatible devices",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-[#005EB8]">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Preview Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#005EB8] mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your travel needs with no hidden fees
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Traveler",
                data: "1GB",
                duration: "7 days",
                price: "$9.99",
                features: [
                  "1GB high-speed data",
                  "Valid for 7 days",
                  "Coverage in 100+ countries",
                  "24/7 customer support",
                ],
              },
              {
                name: "Explorer",
                data: "3GB",
                duration: "15 days",
                price: "$19.99",
                popular: true,
                features: [
                  "3GB high-speed data",
                  "Valid for 15 days",
                  "Coverage in 150+ countries",
                  "24/7 customer support",
                  "Data sharing",
                ],
              },
              {
                name: "Global",
                data: "5GB",
                duration: "30 days",
                price: "$29.99",
                features: [
                  "5GB high-speed data",
                  "Valid for 30 days",
                  "Coverage in 200+ countries",
                  "24/7 customer support",
                  "Data sharing",
                  "Multi-device support",
                ],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-xl overflow-hidden ${plan.popular ? "ring-2 ring-[#4A90E2]" : "border border-gray-200"}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-[#4A90E2] text-white px-4 py-1 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="bg-white p-6">
                  <h3 className="text-xl font-semibold text-[#005EB8] mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-bold text-[#005EB8]">{plan.price}</span>
                    <span className="text-gray-500 ml-1">/ {plan.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-lg font-medium">{plan.data}</span>
                    <span className="px-2 py-1 bg-[#A3DFFA] text-[#005EB8] text-xs font-medium rounded-full">
                      {plan.duration}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <svg
                          className="h-5 w-5 text-[#4A90E2] mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? "bg-[#005EB8] hover:bg-[#004a93]" : "bg-[#4A90E2] hover:bg-[#3a80d2]"}`}
                  >
                    Select Plan
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" asChild className="border-[#005EB8] text-[#005EB8]">
              <Link href="/plans">View All Plans</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#005EB8] mb-4">How Lit Mobile eSIM Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Get connected in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Plan",
                description: "Select from our range of data plans based on your destination and needs",
              },
              {
                step: "02",
                title: "Activate eSIM",
                description: "Scan the QR code or download the profile to activate your eSIM instantly",
              },
              {
                step: "03",
                title: "Connect & Go",
                description: "Enjoy seamless connectivity wherever you travel with no roaming charges",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-[#A3DFFA]/20 rounded-full h-20 w-20 flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-[#005EB8]">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#005EB8]">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>

                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-16 h-0.5 bg-[#A3DFFA] transform -translate-x-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#005EB8] to-[#4A90E2] py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Connect Globally?</h2>
              <p className="text-lg text-white/90 mb-8">
                Join thousands of satisfied travelers and businesses who trust Lit mobile eSIM for their connectivity needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-white text-[#005EB8] hover:bg-[#E6E6E6]">
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/10 p-6 rounded-xl">
                <div className="text-white text-center">
                  <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
                  <p className="mb-4">Our support team is available 24/7</p>
                  <div className="text-2xl font-bold">01 470 5444</div>
                  <p className="mt-2 text-sm">or</p>
                  <Button variant="link" asChild className="text-white">
                    <Link href="/support">Visit Support Center</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Lit Mobile eSIM</h3>
              <p className="text-gray-400 mb-4">
                Seamlessly connect anytime, anywhere with our global eSIM technology.
              </p>
              <div className="flex space-x-4">
                {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                  <a key={social} href={`#${social}`} className="text-gray-400 hover:text-white">
                    <span className="sr-only">{social}</span>
                    <div className="h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center">
                      <span className="text-xs">{social[0].toUpperCase()}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2">
                {["Travel eSIM", "Business Solutions", "IoT Connectivity", "Data Plans", "Enterprise"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                {["Help Center", "Blog", "Developers", "API Documentation", "Compatibility"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {["About Us", "Careers", "Press", "Contact", "Privacy Policy", "Terms of Service"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Lit Mobile. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
