// @ts-nocheck
'use client'

import { useState } from 'react'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Badge } from '@/components/badge'
import { Select } from '@/components/select'
import { Input } from '@/components/input'
import { Combobox, ComboboxOption } from '@/components/combobox'
import { Textarea } from '@/components/textarea'
import CommonPagination from '@/app/(app)/basic-master/address-master/common/components/Pagination.jsx'
import CommonTable from '@/app/(app)/basic-master/address-master/common/components/Table.jsx'
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/dropdown'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import {
  Order,
  initialOrders,
  orderStatusOptions,
  flagOptions,
  availableSellers,
  availableBuyers,
} from './data'

const ITEMS_PER_PAGE = 10

export default function OrderPage() {
  const [orders, setOrders] = useState(initialOrders)
  const [activeModal, setActiveModal] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Add Order Form State
  const [addForm, setAddForm] = useState({
    orderSeller: null,
    sellerCustomerCode: '',
    orderBuyer: null,
    buyerCustomerCode: '',
    orderDate: '',
    orderNumber: '',
    orderQuantity: '',
    orderValue: '',
    attachImage: null,
    orderStatus: '2',
    sapSaleOrderNumber: '',
    sapOrderDate: '',
    deliveryDate: '',
    remark: '',
    flag: '1',
    shippingDifferentAddress: '',
  })

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(orders.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentOrders = orders.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleAddOrderClick = () => {
    setActiveModal('add')
    setAddForm({
      orderSeller: null,
      sellerCustomerCode: '',
      orderBuyer: null,
      buyerCustomerCode: '',
      orderDate: '',
      orderNumber: '',
      orderQuantity: '',
      orderValue: '',
      attachImage: null,
      orderStatus: '2',
      sapSaleOrderNumber: '',
      sapOrderDate: '',
      deliveryDate: '',
      remark: '',
      flag: '1',
      shippingDifferentAddress: '',
    })
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  const handleStatusChange = (orderId, newStatusId) => {
    if (!newStatusId) return
    const status = orderStatusOptions.find((s) => s.id === newStatusId)
    if (!status) return

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, orderStatus: status.name } : order
      )
    )
  }

  const handleAddOrderSubmit = () => {
    if (!addForm.orderSeller || !addForm.orderBuyer || !addForm.orderDate || !addForm.orderNumber) {
      alert('Please fill in all required fields')
      return
    }

    const newOrder: Order = {
      id: Math.max(...orders.map((o) => o.id)) + 1,
      orderDate: addForm.orderDate,
      orderNumber: addForm.orderNumber,
      orderSeller: addForm.orderSeller.name,
      sellerCustomerCode: addForm.sellerCustomerCode,
      orderBuyer: addForm.orderBuyer.name,
      buyerCustomerCode: addForm.buyerCustomerCode,
      orderQuantity: parseInt(addForm.orderQuantity) || 0,
      orderValue: addForm.orderValue,
      attachImage: addForm.attachImage?.name || '',
      orderStatus: orderStatusOptions.find((s) => s.id === addForm.orderStatus)?.name || 'Pending',
      sapSaleOrderNumber: addForm.sapSaleOrderNumber,
      sapOrderDate: addForm.sapOrderDate,
      deliveryDate: addForm.deliveryDate,
      remark: addForm.remark,
      flag: flagOptions.find((f) => f.id === addForm.flag)?.name || 'Not Synced',
      shippingDifferentAddress: addForm.shippingDifferentAddress,
    }

    setOrders([...orders, newOrder])
    closeModal()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'lime'
      case 'Pending':
        return 'amber'
      case 'Rejected':
        return 'red'
      case 'Completed':
        return 'cyan'
      default:
        return 'zinc'
    }
  }

  const getFlagColor = (flag: string) => {
    switch (flag) {
      case 'Synced':
        return 'lime'
      case 'Not Synced':
        return 'red'
      case 'Pending':
        return 'amber'
      default:
        return 'zinc'
    }
  }

  return (
    <div className="flex h-[calc(100vh-110px)] flex-col">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between pb-4">
        <Heading>Orders</Heading>
        <div className="flex items-center gap-3">
          <Dropdown>
            <DropdownButton color="white">
              Your Data
              <ChevronDownIcon />
            </DropdownButton>
            <DropdownMenu>
              <DropdownItem>Export</DropdownItem>
              <DropdownItem>Import</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button color="dark/zinc" onClick={handleAddOrderClick}>
            Add Order
          </Button>
        </div>
      </div>

      {/* Table using CommonTable with sticky columns */}
      <CommonTable
        data={currentOrders.map(order => ({
          id: order.id,
          orderDate: order.orderDate,
          orderNumber: order.orderNumber,
          orderSeller: order.orderSeller,
          orderBuyer: order.orderBuyer,
          orderQuantity: order.orderQuantity,
          orderValue: `₹${order.orderValue}`,
          orderStatus: <Badge color={getStatusColor(order.orderStatus)}>{order.orderStatus}</Badge>,
          changeStatus: (
            <Select
              value={orderStatusOptions.find((s) => s.name === order.orderStatus)?.id.toString() || ''}
              onChange={(e) => handleStatusChange(order.id, e.target.value)}
              className="text-xs"
            >
              <option value="">Change...</option>
              {orderStatusOptions.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </Select>
          ),
          deliveryDate: order.deliveryDate,
          remark: order.remark || '-',
          flag: <Badge color={getFlagColor(order.flag)}>{order.flag}</Badge>,
          raw: order,
        }))}
        emptyMessage="No orders found."
        minWidth="1600px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '80px' },
          { key: 'orderNumber', label: 'Order Number', width: '160px' },
          { key: 'orderDate', label: 'Order Date', width: '130px' },
          { key: 'orderSeller', label: 'Order Seller', width: '180px' },
          { key: 'orderBuyer', label: 'Order Buyer', width: '180px' },
          { key: 'orderQuantity', label: 'Quantity', width: '100px' },
          { key: 'orderValue', label: 'Order Value', width: '130px' },
          { key: 'orderStatus', label: 'Status', width: '120px' },
          { key: 'changeStatus', label: 'Change Status', width: '150px' },
          { key: 'deliveryDate', label: 'Delivery Date', width: '130px' },
          { key: 'remark', label: 'Remark', width: '180px' },
          { key: 'flag', label: 'Flag', width: '120px' },
        ]}
        pagination={
          <CommonPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        }
      />

      {/* Add Order Modal */}
      {activeModal === 'add' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm overflow-hidden">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-zinc-950/10 dark:border-white/10">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Add Order</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Seller and Buyer Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                      Order Seller <span className="text-red-500">*</span>
                    </label>
                    <Combobox
                      value={addForm.orderSeller}
                      onChange={(seller) => setAddForm({ ...addForm, orderSeller: seller })}
                      displayValue={(seller) => seller?.name || ''}
                    >
                      {availableSellers.map((seller) => (
                        <ComboboxOption key={seller.id} value={seller}>
                          {seller.name} ({seller.code})
                        </ComboboxOption>
                      ))}
                    </Combobox>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                      Seller Customer Code
                    </label>
                    <Input
                      value={addForm.sellerCustomerCode}
                      onChange={(e) =>
                        setAddForm({ ...addForm, sellerCustomerCode: e.target.value })
                      }
                      placeholder="Enter seller customer code"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                      Order Buyer <span className="text-red-500">*</span>
                    </label>
                    <Combobox
                      value={addForm.orderBuyer}
                      onChange={(buyer) => setAddForm({ ...addForm, orderBuyer: buyer })}
                      displayValue={(buyer) => buyer?.name || ''}
                    >
                      {availableBuyers.map((buyer) => (
                        <ComboboxOption key={buyer.id} value={buyer}>
                          {buyer.name} ({buyer.code})
                        </ComboboxOption>
                      ))}
                    </Combobox>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                      Buyer Customer Code
                    </label>
                    <Input
                      value={addForm.buyerCustomerCode}
                      onChange={(e) =>
                        setAddForm({ ...addForm, buyerCustomerCode: e.target.value })
                      }
                      placeholder="Enter buyer customer code"
                    />
                  </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                      Order Date <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="date"
                      value={addForm.orderDate}
                      onChange={(e) => setAddForm({ ...addForm, orderDate: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                      Order Number <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={addForm.orderNumber}
                      onChange={(e) => setAddForm({ ...addForm, orderNumber: e.target.value })}
                      placeholder="Enter order number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                      Order Status
                    </label>
                    <Select
                      value={addForm.orderStatus}
                      onChange={(e) => setAddForm({ ...addForm, orderStatus: e.target.value })}
                    >
                      {orderStatusOptions.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.name}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                      Order Quantity
                    </label>
                    <Input
                      type="number"
                      value={addForm.orderQuantity}
                      onChange={(e) => setAddForm({ ...addForm, orderQuantity: e.target.value })}
                      placeholder="Enter quantity"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                      Order Value
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      value={addForm.orderValue}
                      onChange={(e) => setAddForm({ ...addForm, orderValue: e.target.value })}
                      placeholder="Enter order value"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                      Delivery Date
                    </label>
                    <Input
                      type="date"
                      value={addForm.deliveryDate}
                      onChange={(e) => setAddForm({ ...addForm, deliveryDate: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                      SAP Sale Order Number
                    </label>
                    <Input
                      value={addForm.sapSaleOrderNumber}
                      onChange={(e) =>
                        setAddForm({ ...addForm, sapSaleOrderNumber: e.target.value })
                      }
                      placeholder="Enter SAP sale order number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                      SAP Order Date
                    </label>
                    <Input
                      type="date"
                      value={addForm.sapOrderDate}
                      onChange={(e) => setAddForm({ ...addForm, sapOrderDate: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                      Flag
                    </label>
                    <Select
                      value={addForm.flag}
                      onChange={(e) => setAddForm({ ...addForm, flag: e.target.value })}
                    >
                      {flagOptions.map((flag) => (
                        <option key={flag.id} value={flag.id}>
                          {flag.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>

                {/* Additional Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                      Attach Image
                    </label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setAddForm({ ...addForm, attachImage: e.target.files?.[0] || null })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                      Shipping Different Address
                    </label>
                    <Input
                      value={addForm.shippingDifferentAddress}
                      onChange={(e) =>
                        setAddForm({ ...addForm, shippingDifferentAddress: e.target.value })
                      }
                      placeholder="Enter shipping address if different"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
                    Remark
                  </label>
                  <Textarea
                    value={addForm.remark}
                    onChange={(e) => setAddForm({ ...addForm, remark: e.target.value })}
                    placeholder="Enter remarks"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-zinc-950/10 dark:border-white/10 flex justify-end gap-3">
              <Button color="white" onClick={closeModal}>
                Cancel
              </Button>
              <Button color="dark/zinc" onClick={handleAddOrderSubmit}>
                Add Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
