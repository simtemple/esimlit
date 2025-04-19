import { ArrowUpDown, BarChart3, Download, Globe, Plus, RefreshCw, Settings, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <div className="container grid items-start gap-6 pb-8 pt-6 md:gap-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Manage your eSIM profiles and data usage</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button size="sm" className="h-9 bg-[#005EB8] hover:bg-[#004a93]">
                <Plus className="mr-2 h-4 w-4" />
                Add New eSIM
              </Button>
            </div>
          </div>

          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">Active eSIMs</TabsTrigger>
              <TabsTrigger value="inactive">Inactive eSIMs</TabsTrigger>
              <TabsTrigger value="all">All eSIMs</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "Japan Travel",
                    status: "Active",
                    dataTotal: "3GB",
                    dataUsed: "1.2GB",
                    dataRemaining: "1.8GB",
                    percentUsed: 40,
                    expiryDate: "May 15, 2025",
                    network: "NTT DoCoMo",
                    countries: ["Japan"],
                    flag: "🇯🇵",
                  },
                  {
                    name: "US Business",
                    status: "Active",
                    dataTotal: "5GB",
                    dataUsed: "3.7GB",
                    dataRemaining: "1.3GB",
                    percentUsed: 74,
                    expiryDate: "June 2, 2025",
                    network: "T-Mobile",
                    countries: ["United States"],
                    flag: "🇺🇸",
                  },
                ].map((profile, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <span className="text-xl">{profile.flag}</span>
                            {profile.name}
                          </CardTitle>
                          <CardDescription>{profile.network}</CardDescription>
                        </div>
                        <div className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          {profile.status}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1 text-sm">
                            <span>Data Usage</span>
                            <span className="font-medium">
                              {profile.dataUsed} / {profile.dataTotal}
                            </span>
                          </div>
                          <Progress value={profile.percentUsed} className="h-2" />
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-muted-foreground">{profile.dataRemaining} remaining</span>
                            <span className="text-xs text-muted-foreground">Expires: {profile.expiryDate}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-[#4A90E2]" />
                            <span>{profile.countries.join(", ")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4 text-[#4A90E2]" />
                            <span>iPhone 14 Pro</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <div className="flex justify-between w-full">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Manage
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4 mr-1" />
                          Usage
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}

                <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6 h-full">
                  <div className="rounded-full bg-[#A3DFFA]/30 p-3 mb-4">
                    <Plus className="h-6 w-6 text-[#005EB8]" />
                  </div>
                  <h3 className="text-lg font-medium text-[#005EB8] mb-2">Add New eSIM</h3>
                  <p className="text-center text-sm text-gray-500 mb-4">
                    Purchase a new plan for your next destination
                  </p>
                  <Button className="bg-[#005EB8] hover:bg-[#004a93]">Browse Plans</Button>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="inactive" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "Europe Trip",
                    status: "Expired",
                    dataTotal: "5GB",
                    dataUsed: "4.8GB",
                    dataRemaining: "0.2GB",
                    percentUsed: 96,
                    expiryDate: "March 10, 2025",
                    network: "Orange",
                    countries: ["France", "Germany", "Italy"],
                    flag: "🇪🇺",
                  },
                  {
                    name: "Thailand Vacation",
                    status: "Inactive",
                    dataTotal: "3GB",
                    dataUsed: "0GB",
                    dataRemaining: "3GB",
                    percentUsed: 0,
                    expiryDate: "Not activated",
                    network: "AIS",
                    countries: ["Thailand"],
                    flag: "🇹🇭",
                  },
                ].map((profile, index) => (
                  <Card key={index} className="opacity-80">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <span className="text-xl">{profile.flag}</span>
                            {profile.name}
                          </CardTitle>
                          <CardDescription>{profile.network}</CardDescription>
                        </div>
                        <div
                          className={`px-2 py-1 ${profile.status === "Expired" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"} text-xs font-medium rounded-full`}
                        >
                          {profile.status}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1 text-sm">
                            <span>Data Usage</span>
                            <span className="font-medium">
                              {profile.dataUsed} / {profile.dataTotal}
                            </span>
                          </div>
                          <Progress value={profile.percentUsed} className="h-2" />
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-muted-foreground">{profile.dataRemaining} remaining</span>
                            <span className="text-xs text-muted-foreground">Expires: {profile.expiryDate}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-[#4A90E2]" />
                            <span>{profile.countries.join(", ")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4 text-[#4A90E2]" />
                            <span>iPhone 14 Pro</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <div className="flex justify-between w-full">
                        {profile.status === "Expired" ? (
                          <Button variant="outline" size="sm" className="w-full">
                            <ArrowUpDown className="h-4 w-4 mr-1" />
                            Renew Plan
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="w-full">
                            <Download className="h-4 w-4 mr-1" />
                            Activate
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* This would combine both active and inactive eSIMs */}
                <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6 h-full">
                  <div className="rounded-full bg-[#A3DFFA]/30 p-3 mb-4">
                    <Plus className="h-6 w-6 text-[#005EB8]" />
                  </div>
                  <h3 className="text-lg font-medium text-[#005EB8] mb-2">Add New eSIM</h3>
                  <p className="text-center text-sm text-gray-500 mb-4">
                    Purchase a new plan for your next destination
                  </p>
                  <Button className="bg-[#005EB8] hover:bg-[#004a93]">Browse Plans</Button>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Data Usage Summary */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Active eSIMs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground mt-1">+1 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Data Used This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.9 GB</div>
                <p className="text-xs text-muted-foreground mt-1">Across all active eSIMs</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Data Remaining</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.1 GB</div>
                <p className="text-xs text-muted-foreground mt-1">Across all active eSIMs</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Next Expiry</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">May 15</div>
                <p className="text-xs text-muted-foreground mt-1">Japan Travel eSIM</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
