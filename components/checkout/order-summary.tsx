import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface OrderSummaryProps {
  plan: {
    id: string
    name: string
    data: string
    duration: string
    price: number
    countries: string[]
    flag: string
  }
}

export function OrderSummary({ plan }: OrderSummaryProps) {
  const subtotal = plan.price
  const tax = subtotal * 0.1 // 10% tax for example
  const total = subtotal + tax

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>Review your order details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium flex items-center gap-2">
                <span className="text-xl">{plan.flag}</span>
                {plan.name}
              </h3>
              <p className="text-sm text-gray-500">{plan.countries.join(", ")}</p>
            </div>
            <div className="text-right">
              <div className="font-semibold">${plan.price.toFixed(2)}</div>
              <div className="text-sm text-gray-500">
                {plan.data} for {plan.duration}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
