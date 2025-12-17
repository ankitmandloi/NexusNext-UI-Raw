// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Badge } from '@/components/badge'
import { Select } from '@/components/select'
import { Input } from '@/components/input'
import { Combobox, ComboboxOption } from '@/components/combobox'
import CommonPagination from '@/app/(app)/basic-master/address-master/common/components/Pagination.jsx'
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/dropdown'
import { ChevronDownIcon, PlusIcon, TrashIcon } from '@heroicons/react/16/solid'
import {
  Invoice,
  InvoiceLineItem,
  initialInvoices,
  statusOptions,
  invoiceDetailsMap,
  availableProducts,
  availableBuyersSellers,
} from './data'

const ITEMS_PER_PAGE = 10

export default function InvoicePage() {
  const [invoices, setInvoices] = useState(initialInvoices)
  const [activeModal, setActiveModal] = useState(null)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Add Invoice Form State
  const [addForm, setAddForm] = useState({
    invoiceSeller: null,
    invoiceBuyer: null,
    invoiceDate: '',
    invoiceNumber: '',
    invoiceStatus: '1',
    lineItems: [],
    attachment: null,
  })

  // Add Product Form State
  const [productForm, setProductForm] = useState({
    selectedProduct: null,
    productCode: '',
    productName: '',
    quantity: 1,
    rate: 1,
    amount: 1,
  })

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(invoices.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentInvoices = invoices.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleViewInvoice = (invoiceNumber) => {
    setSelectedInvoice(invoiceNumber)
    setActiveModal('view')
  }

  const handleAddInvoiceClick = () => {
    setActiveModal('add')
    setAddForm({
      invoiceSeller: null,
      invoiceBuyer: null,
      invoiceDate: '',
      invoiceNumber: '',
      invoiceStatus: '1',
      lineItems: [],
      attachment: null,
    })
  }

  const handleAddProductClick = () => {
    setActiveModal('addProduct')
    setProductForm({
      selectedProduct: null,
      productCode: '',
      productName: '',
      quantity: 1,
      rate: 1,
      amount: 1,
    })
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedInvoice(null)
  }

  const handleStatusChange = (invoiceId, newStatusId) => {
    const newStatus = statusOptions.find((s) => s.id === Number(newStatusId))
    if (!newStatus) return

    setInvoices((prev) =>
      prev.map((inv) => (inv.id === invoiceId ? { ...inv, status: newStatus.name } : inv))
    )
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'lime'
      case 'validated':
        return 'sky'
      case 'open':
        return 'zinc'
      case 'rejected':
        return 'red'
      default:
        return 'zinc'
    }
  }

  const handleImportExcel = () => {
    console.log('Import from Excel clicked')
  }

  const handleExportExcel = () => {
    console.log('Export to Excel clicked')
  }

  const handleDownloadFormat = () => {
    console.log('Download Format clicked')
  }

  // Handle product selection in Add Product modal
  const handleProductSelect = (product) => {
    if (!product) {
      setProductForm({
        ...productForm,
        selectedProduct: null,
        productCode: '',
        productName: '',
      })
      return
    }
    
    setProductForm({
      ...productForm,
      selectedProduct: product,
      productCode: product.code,
      productName: product.name,
    })
  }

  // Handle product quantity/rate change
  const handleProductFormChange = (field, value) => {
    const updatedForm = { ...productForm, [field]: value }
    if (field === 'quantity' || field === 'rate') {
      updatedForm.amount = Number(updatedForm.quantity) * Number(updatedForm.rate)
    }
    setProductForm(updatedForm)
  }

  // Add product to line items
  const handleAddProductToInvoice = () => {
    if (!productForm.selectedProduct) return

    const newLineItem = {
      id: Date.now().toString(),
      productCode: productForm.productCode,
      productName: productForm.productName,
      quantity: Number(productForm.quantity),
      rate: Number(productForm.rate),
      amount: Number(productForm.amount),
    }

    setAddForm({
      ...addForm,
      lineItems: [...addForm.lineItems, newLineItem],
    })

    setActiveModal('add')
  }

  // Remove line item
  const handleRemoveLineItem = (id) => {
    setAddForm({
      ...addForm,
      lineItems: addForm.lineItems.filter((item) => item.id !== id),
    })
  }

  // Calculate totals
  const calculateTotals = () => {
    const qtyTotal = addForm.lineItems.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = addForm.lineItems.reduce((sum, item) => sum + item.amount, 0)
    return { qtyTotal, subtotal, total: subtotal }
  }

  // Handle Add Invoice Submit
  const handleAddInvoiceSubmit = () => {
    if (!addForm.invoiceSeller || !addForm.invoiceBuyer || !addForm.invoiceNumber) {
      alert('Please fill all required fields')
      return
    }

    const status = statusOptions.find((s) => s.id === Number(addForm.invoiceStatus))
    const newInvoice = {
      id: `INV-${Date.now()}`,
      invoiceNumber: addForm.invoiceNumber,
      date: addForm.invoiceDate || new Date().toLocaleDateString('en-GB'),
      buyerName: addForm.invoiceBuyer.name,
      buyerType: addForm.invoiceBuyer.type || 'Retailer',
      status: status.name,
    }

    // Add to invoice details map for viewing
    invoiceDetailsMap[addForm.invoiceNumber] = {
      invoiceNumber: addForm.invoiceNumber,
      status: status.name,
      invoiceDate: addForm.invoiceDate || new Date().toLocaleDateString('en-GB'),
      claimDate: addForm.invoiceDate || new Date().toLocaleDateString('en-GB'),
      validatedBy: 'Not Available',
      loyaltyPoints: addForm.lineItems.reduce((sum, item) => sum + item.quantity * 5, 0),
      supplierDetails: {
        name: addForm.invoiceSeller.name,
        code: addForm.invoiceSeller.code,
        address: addForm.invoiceSeller.address,
        city: addForm.invoiceSeller.city,
        district: addForm.invoiceSeller.district,
        state: addForm.invoiceSeller.state,
        mobileNumber: addForm.invoiceSeller.mobileNumber,
      },
      buyerDetails: {
        name: addForm.invoiceBuyer.name,
        code: addForm.invoiceBuyer.code,
        portalAccess: 'Active',
        customerStatus: 'Open',
        address: addForm.invoiceBuyer.address,
        city: addForm.invoiceBuyer.city,
        district: addForm.invoiceBuyer.district,
        state: addForm.invoiceBuyer.state,
        mobileNumber: addForm.invoiceBuyer.mobileNumber,
      },
      lineItems: addForm.lineItems.map((item) => ({
        description: item.productName,
        code: item.productCode,
        hsn: '84212300',
        quantity: item.quantity,
        unit: 'PCS',
        rate: item.rate,
        amount: item.amount,
        points: item.quantity * 5,
      })),
      pointSummary: [
        {
          schemeDetails: 'General Scheme',
          points: addForm.lineItems.reduce((sum, item) => sum + item.quantity * 5, 0),
        },
      ],
    }

    setInvoices([newInvoice, ...invoices])
    closeModal()
  }

  const invoiceDetails = selectedInvoice ? invoiceDetailsMap[selectedInvoice] : null
  const totals = calculateTotals()

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header - Sticky */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Invoice</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage all invoices in the system
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Dropdown>
              <DropdownButton outline>
                Your Data
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu>
                <DropdownItem onClick={handleImportExcel}>
                  Import from Excel
                </DropdownItem>
                <DropdownItem onClick={handleExportExcel}>
                  Export to Excel
                </DropdownItem>
                <DropdownItem onClick={handleDownloadFormat}>
                  Download Format
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button color="dark/zinc" onClick={handleAddInvoiceClick}>
              <PlusIcon />
              Add Invoice
            </Button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Table Header - Fixed */}
        <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
          <div className="w-[9%] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</div>
          <div className="w-[17%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Invoice Number</div>
          <div className="w-[11%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Date</div>
          <div className="w-[15%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Buyer Name</div>
          <div className="w-[9%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Buyer Type</div>
          <div className="w-[10%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Status</div>
          <div className="w-[12%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Change Status</div>
          <div className="w-[17%] text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Schemas</div>
        </div>

        {/* Scrollable Table Body */}
        <div
          className="flex-1 overflow-y-auto overflow-x-auto
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar]:h-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-zinc-300
          [&::-webkit-scrollbar-thumb]:rounded-full
          dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
        >
          {invoices.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
              No invoices found.
            </div>
          ) : (
            currentInvoices.map((invoice, index) => (
              <div
                key={invoice.id}
                className={`flex items-center py-[1.1rem] border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                  index === currentInvoices.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <div className="w-[9%] pl-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">
                  {invoice.id}
                </div>
                <div className="w-[17%] text-sm font-medium text-zinc-950 dark:text-white">
                  {invoice.invoiceNumber}
                </div>
                <div className="w-[11%] text-sm text-zinc-600 dark:text-zinc-400">
                  {invoice.date}
                </div>
                <div className="w-[15%] text-sm text-zinc-950 dark:text-white">
                  {invoice.buyerName}
                </div>
                <div className="w-[9%] text-sm text-zinc-600 dark:text-zinc-400">
                  {invoice.buyerType}
                </div>
                <div className="w-[10%] pr-2">
                  <Badge color={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                </div>
                <div className="w-[12%] pr-2">
                  <Select
                    value={statusOptions.find((s) => s.name === invoice.status)?.id.toString() || ''}
                    onChange={(e) => handleStatusChange(invoice.id, e.target.value)}
                    className="text-xs"
                  >
                    <option value="">Change...</option>
                    {statusOptions.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="w-[17%] px-4 flex items-center justify-center">
                  <Button
                    color="dark/zinc"
                    onClick={() => handleViewInvoice(invoice.invoiceNumber)}
                  >
                    View Invoice
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Footer */}
        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Add Invoice Modal */}
      {activeModal === 'add' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-zinc-950/10 dark:border-white/10">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Add Invoice</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Seller and Buyer Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Invoice Seller*
                  </label>
                  <Combobox
                    value={addForm.invoiceSeller}
                    onChange={(seller) => setAddForm({ ...addForm, invoiceSeller: seller })}
                    options={availableBuyersSellers.filter((bs) => bs.type === 'Seller')}
                    displayValue={(seller) => seller?.name ?? ''}
                    placeholder="Search and select seller"
                  >
                    {(seller) => (
                      <ComboboxOption value={seller}>
                        {seller.name} ({seller.code})
                      </ComboboxOption>
                    )}
                  </Combobox>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Invoice Buyer*
                  </label>
                  <Combobox
                    value={addForm.invoiceBuyer}
                    onChange={(buyer) => setAddForm({ ...addForm, invoiceBuyer: buyer })}
                    options={availableBuyersSellers.filter((bs) => bs.type === 'Buyer')}
                    displayValue={(buyer) => buyer?.name ?? ''}
                    placeholder="Search and select buyer"
                  >
                    {(buyer) => (
                      <ComboboxOption value={buyer}>
                        {buyer.name} ({buyer.code})
                      </ComboboxOption>
                    )}
                  </Combobox>
                </div>
              </div>

              {/* Invoice Date, Number, and Status */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Invoice Date*
                  </label>
                  <Input
                    type="date"
                    value={addForm.invoiceDate}
                    onChange={(e) => setAddForm({ ...addForm, invoiceDate: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Invoice Number*
                  </label>
                  <Input
                    type="text"
                    value={addForm.invoiceNumber}
                    onChange={(e) => setAddForm({ ...addForm, invoiceNumber: e.target.value })}
                    placeholder="Invoice Number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Invoice Status*
                  </label>
                  <Select
                    value={addForm.invoiceStatus}
                    onChange={(e) => setAddForm({ ...addForm, invoiceStatus: e.target.value })}
                  >
                    {statusOptions.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Line Items Table */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Products
                  </label>
                  <Button color="dark/zinc" onClick={handleAddProductClick}>
                    <PlusIcon />
                    Add Product
                  </Button>
                </div>

                <div className="border border-zinc-950/10 dark:border-white/10 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                    <thead className="bg-zinc-50 dark:bg-zinc-900">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Sr no.
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Product Code
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Product Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Qty
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Rate
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Amount
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-700">
                      {addForm.lineItems.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-4 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                            No products added. Click "Add Product" to add items.
                          </td>
                        </tr>
                      ) : (
                        addForm.lineItems.map((item, index) => (
                          <tr key={item.id}>
                            <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                              {index + 1}
                            </td>
                            <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                              {item.productCode}
                            </td>
                            <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                              {item.productName}
                            </td>
                            <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                              {item.quantity}
                            </td>
                            <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                              ₹{item.rate.toFixed(2)}
                            </td>
                            <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                              ₹{item.amount.toFixed(2)}
                            </td>
                            <td className="px-4 py-3">
                              <Button
                                plain
                                onClick={() => handleRemoveLineItem(item.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Supporting Attachment */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Supporting Attachment:
                </label>
                <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-8 text-center">
                  <Input
                    type="file"
                    onChange={(e) => setAddForm({ ...addForm, attachment: e.target.files[0] })}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer text-sm text-zinc-600 dark:text-zinc-400"
                  >
                    Drop files here to upload
                  </label>
                  {addForm.attachment && (
                    <p className="mt-2 text-sm text-zinc-900 dark:text-zinc-100">
                      {addForm.attachment.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Qty Total:</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">{totals.qtyTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Subtotal:</span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      ₹{totals.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Tax:</span>
                    <span className="text-zinc-600 dark:text-zinc-400">Inclusive In Prices</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-zinc-200 dark:border-zinc-700">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">Total:</span>
                    <span className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
                      ₹{totals.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-zinc-950/10 dark:border-white/10 flex justify-end gap-3">
              <Button plain onClick={closeModal}>
                Cancel
              </Button>
              <Button color="dark/zinc" onClick={handleAddInvoiceSubmit}>
                Add Invoice
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {activeModal === 'addProduct' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-3xl">
            <div className="p-6 border-b border-zinc-950/10 dark:border-white/10">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Add Product</h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Select Product*
                </label>
                <Combobox
                  value={productForm.selectedProduct}
                  onChange={handleProductSelect}
                  options={availableProducts}
                  displayValue={(product) => product?.name ?? ''}
                  placeholder="Search and select product"
                >
                  {(product) => (
                    <ComboboxOption value={product}>
                      {product.name} ({product.code})
                    </ComboboxOption>
                  )}
                </Combobox>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Product Code*
                  </label>
                  <Input
                    type="text"
                    value={productForm.productCode}
                    onChange={(e) => setProductForm({ ...productForm, productCode: e.target.value })}
                    placeholder="Product Code"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Product Name*
                  </label>
                  <Input
                    type="text"
                    value={productForm.productName}
                    onChange={(e) => setProductForm({ ...productForm, productName: e.target.value })}
                    placeholder="Product Name"
                    disabled
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Quantity*
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={productForm.quantity}
                    onChange={(e) => handleProductFormChange('quantity', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Rate*
                  </label>
                  <Input
                    type="number"
                    min="1"
                    step="0.01"
                    value={productForm.rate}
                    onChange={(e) => handleProductFormChange('rate', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Amount*
                  </label>
                  <Input
                    type="number"
                    value={productForm.amount}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-zinc-950/10 dark:border-white/10 flex justify-end gap-3">
              <Button plain onClick={() => setActiveModal('add')}>
                Close
              </Button>
              <Button color="dark/zinc" onClick={handleAddProductToInvoice}>
                Add Product
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Invoice Modal - Fixed positioning */}
      {activeModal === 'view' && invoiceDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm overflow-hidden">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-zinc-950/10 dark:border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Invoice</h2>
                <div className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
                  Invoice #{invoiceDetails.invoiceNumber}
                </div>
              </div>
              <Badge color={getStatusColor(invoiceDetails.status)} className="text-base px-4 py-2">
                {invoiceDetails.status}
              </Badge>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Dates and Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                <div>
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Invoice Date</div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {invoiceDetails.invoiceDate}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Claim Date</div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {invoiceDetails.claimDate}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Validated By</div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {invoiceDetails.validatedBy}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Loyalty Points</div>
                  <div className="text-sm font-semibold text-lime-600 dark:text-lime-400">
                    {invoiceDetails.loyaltyPoints}
                  </div>
                </div>
              </div>

              {/* Supplier Details */}
              <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  Supplier Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {invoiceDetails.supplierDetails.name} ({invoiceDetails.supplierDetails.code})
                  </div>
                  <div className="text-zinc-600 dark:text-zinc-400">
                    {invoiceDetails.supplierDetails.address}
                  </div>
                  <div className="text-zinc-600 dark:text-zinc-400">
                    {invoiceDetails.supplierDetails.city}, {invoiceDetails.supplierDetails.district}
                  </div>
                  <div className="text-zinc-600 dark:text-zinc-400">
                    {invoiceDetails.supplierDetails.state}
                  </div>
                  <div className="text-zinc-600 dark:text-zinc-400">
                    Mobile Number: {invoiceDetails.supplierDetails.mobileNumber}
                  </div>
                </div>
              </div>

              {/* Buyer Details */}
              <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  Buyer Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {invoiceDetails.buyerDetails.name} ({invoiceDetails.buyerDetails.code})
                  </div>
                  <div className="flex gap-3 text-xs">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Portal Access ({invoiceDetails.buyerDetails.portalAccess})
                    </span>
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Customer Status ({invoiceDetails.buyerDetails.customerStatus})
                    </span>
                  </div>
                  <div className="text-zinc-600 dark:text-zinc-400">
                    {invoiceDetails.buyerDetails.address}
                  </div>
                  <div className="text-zinc-600 dark:text-zinc-400">
                    {invoiceDetails.buyerDetails.city}, {invoiceDetails.buyerDetails.district}
                  </div>
                  <div className="text-zinc-600 dark:text-zinc-400">
                    {invoiceDetails.buyerDetails.state}
                  </div>
                  <div className="text-zinc-600 dark:text-zinc-400">
                    Mobile Number: {invoiceDetails.buyerDetails.mobileNumber}
                  </div>
                </div>
              </div>

              {/* Line Items Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                  <thead className="bg-zinc-50 dark:bg-zinc-900">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">
                        Description
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">
                        Unit
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">
                        Rate
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">
                        Points
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-700">
                    {invoiceDetails.lineItems.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm">
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">
                            {item.description}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400">
                            Code: {item.code}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400">
                            HSN: {item.hsn}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                          {item.unit}
                        </td>
                        <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                          {item.rate.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                          {item.amount.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-sm text-lime-600 dark:text-lime-400 font-semibold">
                          {item.points}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Invoice Image */}
              <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  Invoice Image
                </h3>
                {invoiceDetails.invoiceImage ? (
                  <img
                    src={invoiceDetails.invoiceImage}
                    alt="Invoice"
                    className="max-w-full h-auto rounded border border-zinc-200 dark:border-zinc-700"
                  />
                ) : (
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 italic">
                    No image available
                  </div>
                )}
              </div>

              {/* Total Section */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                <div>
                  <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                    Total
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Quantity: {invoiceDetails.lineItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </div>
                  <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                    ₹{invoiceDetails.lineItems.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                    Points
                  </div>
                  <div className="text-3xl font-bold text-lime-600 dark:text-lime-400">
                    {invoiceDetails.lineItems.reduce((sum, item) => sum + item.points, 0)}
                  </div>
                </div>
              </div>

              {/* Point Summary */}
              <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  Point Summary
                </h3>
                <table className="min-w-full">
                  <thead className="bg-zinc-50 dark:bg-zinc-900">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">
                        Scheme Details
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">
                        Points
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-zinc-800">
                    {invoiceDetails.pointSummary.map((summary, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-zinc-900 dark:text-zinc-100">
                          {summary.schemeDetails}
                        </td>
                        <td className="px-4 py-2 text-sm text-lime-600 dark:text-lime-400 font-semibold">
                          {summary.points}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-6 border-t border-zinc-950/10 dark:border-white/10 flex justify-end gap-3">
              <Button color="zinc" onClick={() => window.print()}>
                Download as PDF
              </Button>
              <Button color="dark/zinc" onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
