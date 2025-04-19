"use client"

import { useState } from "react"
import { CreditCard, Edit2, MoreHorizontal, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { EditPaymentMethod } from "@/components/payment/edit-payment-method"
import { deleteSavedPaymentMethod } from "@/lib/payment-actions"

interface SavedPaymentMethodsProps {
  paymentMethods: SavedPaymentMethod[]
  onSelect?: (method: SavedPaymentMethod) => void
  onAddNew?: () => void
  onDelete?: (id: string) => void
  onEdit?: (method: SavedPaymentMethod) => void
  selectable?: boolean
  selectedId?: string
  isLoading?: boolean
}

export interface SavedPaymentMethod {
  id: string
  cardType: string
  lastFour: string
  expiryDate: string
  cardholderName: string
  isDefault: boolean
}

export function SavedPaymentMethods({
  paymentMethods,
  onSelect,
  onAddNew,
  onDelete,
  onEdit,
  selectable = false,
  selectedId,
  isLoading = false,
}: SavedPaymentMethodsProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [editingMethod, setEditingMethod] = useState<SavedPaymentMethod | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id)
      await deleteSavedPaymentMethod(id)
      if (onDelete) {
        onDelete(id)
      }
    } catch (error) {
      console.error("Error deleting payment method:", error)
    } finally {
      setDeletingId(null)
    }
  }

  const handleEdit = (method: SavedPaymentMethod) => {
    setEditingMethod(method)
    setIsEditDialogOpen(true)
  }

  const handleEditSuccess = (updatedMethod: SavedPaymentMethod) => {
    setIsEditDialogOpen(false)
    if (onEdit) {
      onEdit(updatedMethod)
    }
  }

  const getCardIcon = (cardType: string) => {
    switch (cardType.toLowerCase()) {
      case "visa":
        return (
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" fill="#1434CB" rx="4" />
            <path
              d="M9.5 15.5h-2L9 9h2l-1.5 6.5zm7.5-6.5l-1.5 4-1-4H12L9.5 15.5h2l.5-1.5h3l.5 1.5h2L17 9z"
              fill="#FFFFFF"
            />
            <path d="M13 12l.5-1.5h1L15 12h-2z" fill="#FFFFFF" />
          </svg>
        )
      case "mastercard":
        return (
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" fill="#FFB600" rx="4" />
            <path d="M12 18.5A6.5 6.5 0 1 0 12 5.5a6.5 6.5 0 0 0 0 13z" fill="#EB001B" />
            <path d="M12 18.5A6.5 6.5 0 0 0 18.5 12H5.5a6.5 6.5 0 0 0 6.5 6.5z" fill="#F79E1B" />
          </svg>
        )
      case "amex":
        return (
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" fill="#1F72CD" rx="4" />
            <path d="M12 7.5h3.5v1H12v-1zm-6.5 0H9v3h-3.5v-3zm0 6H9v3h-3.5v-3zm10-3H19v3h-3.5v-3z" fill="#FFFFFF" />
          </svg>
        )
      default:
        return <CreditCard className="h-6 w-6 text-gray-500" />
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Card key={i} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {paymentMethods.length === 0 ? (
        <div className="text-center py-8">
          <div className="mx-auto bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <CreditCard className="h-6 w-6 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium mb-1">No saved payment methods</h3>
          <p className="text-gray-500 text-sm mb-4">Add a payment method to make checkout faster next time</p>
          {onAddNew && (
            <Button onClick={onAddNew} className="bg-[#005EB8] hover:bg-[#004a93]">
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          )}
        </div>
      ) : (
        <>
          {paymentMethods.map((method) => (
            <Card
              key={method.id}
              className={`relative overflow-hidden ${
                selectable
                  ? selectedId === method.id
                    ? "ring-2 ring-[#005EB8]"
                    : "cursor-pointer hover:border-[#005EB8]"
                  : ""
              }`}
              onClick={() => selectable && onSelect && onSelect(method)}
            >
              {method.isDefault && (
                <div className="absolute top-0 right-0">
                  <div className="bg-[#005EB8] text-white text-xs px-2 py-1 rounded-bl-md">Default</div>
                </div>
              )}
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {getCardIcon(method.cardType)}
                    <CardTitle className="text-base">{method.cardType}</CardTitle>
                  </div>
                  {!selectable && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEdit(method)
                          }}
                        >
                          <Edit2 className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(method.id)
                          }}
                          disabled={deletingId === method.id}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {deletingId === method.id ? "Deleting..." : "Delete"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="font-medium">•••• •••• •••• {method.lastFour}</p>
                  <p className="text-sm text-gray-500">
                    {method.cardholderName} • Expires {method.expiryDate}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
          {onAddNew && (
            <Button
              onClick={onAddNew}
              variant="outline"
              className="w-full py-8 border-dashed border-2 hover:border-[#005EB8] hover:text-[#005EB8]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Payment Method
            </Button>
          )}
        </>
      )}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Payment Method</DialogTitle>
            <DialogDescription>Update your payment method details</DialogDescription>
          </DialogHeader>
          {editingMethod && (
            <EditPaymentMethod
              paymentMethod={editingMethod}
              onSuccess={handleEditSuccess}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
