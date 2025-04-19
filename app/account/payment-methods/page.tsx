"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AddPaymentMethod } from "@/components/payment/add-payment-method"
import { type SavedPaymentMethod, SavedPaymentMethods } from "@/components/payment/saved-payment-methods"
import { getUserPaymentMethods } from "@/lib/payment-actions"

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState<SavedPaymentMethod[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  useEffect(() => {
    async function loadPaymentMethods() {
      try {
        const methods = await getUserPaymentMethods()
        setPaymentMethods(methods)
      } catch (error) {
        console.error("Error loading payment methods:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPaymentMethods()
  }, [])

  const handleAddSuccess = (newMethod: SavedPaymentMethod) => {
    setPaymentMethods((prev) => {
      // If the new method is default, update all others to not be default
      if (newMethod.isDefault) {
        return [newMethod, ...prev.map((m) => ({ ...m, isDefault: false }))].filter((m) => m.id !== newMethod.id)
      }
      return [newMethod, ...prev.filter((m) => m.id !== newMethod.id)]
    })
    setIsAddDialogOpen(false)
  }

  const handleEditSuccess = (updatedMethod: SavedPaymentMethod) => {
    setPaymentMethods((prev) => {
      // Create a new array with the updated method
      const updated = prev.map((method) => {
        if (method.id === updatedMethod.id) {
          return updatedMethod
        }
        // If the updated method is now default, make sure others are not default
        if (updatedMethod.isDefault) {
          return { ...method, isDefault: false }
        }
        return method
      })
      return updated
    })
  }

  const handleDelete = (id: string) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id))
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6">
        <Link href="/account" className="inline-flex items-center text-sm text-gray-500 hover:text-[#005EB8]">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Account
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Payment Methods</h1>
          <p className="text-gray-500">Manage your saved payment methods</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-[#005EB8] hover:bg-[#004a93]">
          <Plus className="mr-2 h-4 w-4" />
          Add Payment Method
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Saved Cards</CardTitle>
          <CardDescription>Your saved payment methods for faster checkout</CardDescription>
        </CardHeader>
        <CardContent>
          <SavedPaymentMethods
            paymentMethods={paymentMethods}
            onAddNew={() => setIsAddDialogOpen(true)}
            onDelete={handleDelete}
            onEdit={handleEditSuccess}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>Add a new card to your account for faster checkout</DialogDescription>
          </DialogHeader>
          <AddPaymentMethod onSuccess={handleAddSuccess} onCancel={() => setIsAddDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
