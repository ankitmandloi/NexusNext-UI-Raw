// @ts-nocheck
'use client'

import { useEffect, useMemo, useState } from 'react'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import Header from '@/app/(app)/basic-master/address-master/common/components/Header.jsx'
import CommonTable from '@/app/(app)/basic-master/address-master/common/components/Table.jsx'
import CommonPagination from '@/app/(app)/basic-master/address-master/common/components/Pagination.jsx'
import Actions from '@/app/(app)/basic-master/address-master/common/components/Actions.jsx'
import { VoucherInventory, voucherInventoryData, STATUS_OPTIONS, PRODUCT_OPTIONS } from './data'

const ITEMS_PER_PAGE = 10

type ModalState = 'add' | 'view' | 'edit' | 'delete' | null

export default function VoucherInventoryPage() {
  const [inventory, setInventory] = useState<VoucherInventory[]>(voucherInventoryData)
  const [activeModal, setActiveModal] = useState<ModalState>(null)
  const [selectedItem, setSelectedItem] = useState<VoucherInventory | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Form states
  const [product, setProduct] = useState('')
  const [code, setCode] = useState('')
  const [purchaseDate, setPurchaseDate] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [status, setStatus] = useState('')
  const [referenceNumber, setReferenceNumber] = useState('')
  const [uploadedBy, setUploadedBy] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(inventory.length / ITEMS_PER_PAGE))
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [inventory, currentPage])

  const paginatedInventory = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return inventory.slice(start, start + ITEMS_PER_PAGE)
  }, [inventory, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const openModal = (type: ModalState, payload?: VoucherInventory) => {
    setActiveModal(type)
    setSelectedItem(payload ?? null)
    if (type === 'add') {
      setProduct('')
      setCode('')
      setPurchaseDate('')
      setExpiryDate('')
      setStatus('')
      setReferenceNumber('')
      setUploadedBy('')
    } else if (type === 'edit' && payload) {
      setProduct(payload.product)
      setCode(payload.code)
      setPurchaseDate(payload.purchaseDate)
      setExpiryDate(payload.expiryDate)
      setStatus(payload.status)
      setReferenceNumber(payload.referenceNumber || '')
      setUploadedBy(payload.uploadedBy || '')
    }
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedItem(null)
    setProduct('')
    setCode('')
    setPurchaseDate('')
    setExpiryDate('')
    setStatus('')
    setReferenceNumber('')
    setUploadedBy('')
    setIsSubmitting(false)
  }

  const handleAddItem = async () => {
    if (!product || !code || !purchaseDate || !expiryDate || !status) return

    setIsSubmitting(true)

    setTimeout(() => {
      const newItem: VoucherInventory = {
        id: `VI-${String(inventory.length + 1).padStart(3, '0')}`,
        product,
        code,
        purchaseDate,
        expiryDate,
        status,
        referenceNumber: referenceNumber || undefined,
        uploadedBy: uploadedBy || undefined,
      }

      setInventory((prev) => [...prev, newItem])
      setIsSubmitting(false)
      closeModal()
    }, 300)
  }

  const handleSaveEdit = async () => {
    if (!selectedItem || !product || !code || !purchaseDate || !expiryDate || !status) return

    setIsSubmitting(true)

    setTimeout(() => {
      setInventory((prev) =>
        prev.map((item) =>
          item.id === selectedItem.id
            ? {
                ...item,
                product,
                code,
                purchaseDate,
                expiryDate,
                status,
                referenceNumber: referenceNumber || undefined,
                uploadedBy: uploadedBy || undefined,
              }
            : item
        )
      )
      setIsSubmitting(false)
      closeModal()
    }, 300)
  }

  const handleDelete = async () => {
    if (!selectedItem) return

    setIsSubmitting(true)

    setTimeout(() => {
      setInventory((prev) => prev.filter((item) => item.id !== selectedItem.id))
      setIsSubmitting(false)
      closeModal()
    }, 300)
  }

  const tableRows = paginatedInventory.map((item) => ({
    id: item.id,
    product: item.product,
    code: item.code,
    purchaseDate: item.purchaseDate,
    expiryDate: item.expiryDate,
    status: item.status,
    raw: item,
  }))

  const totalPages = Math.max(1, Math.ceil(inventory.length / ITEMS_PER_PAGE))

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* @ts-ignore - Header is a JSX component */}
      <Header
        title={
          <>
            Procure And Dispatch &nbsp;
            <span className="text-zinc-600 dark:text-zinc-300">Voucher Inventory</span>
          </>
        }
        subtitle="Manage voucher inventory and track voucher status"
        addLabel="Add Voucher"
        onAdd={() => openModal('add')}
        dropdownOptions={[
          { label: 'Import from Excel' },
          { label: 'Export to Excel' },
          { label: 'Download Format' },
        ]}
      />

      {/* @ts-ignore - CommonTable is a JSX component */}
      <CommonTable
        data={tableRows}
        emptyMessage="No voucher inventory found. Use 'Add Voucher' to create one."
        minWidth="1300px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '100px' },
          { key: 'product', label: 'Product', width: '280px' },
          { key: 'code', label: 'Code', width: '150px' },
          { key: 'purchaseDate', label: 'Purchase Date', width: '150px' },
          { key: 'expiryDate', label: 'Expiry Date', width: '150px' },
          { key: 'status', label: 'Status', width: '120px' },
        ]}
        renderActions={(row) => (
          <Actions
            onView={() => openModal('view', row.raw)}
            onEdit={() => openModal('edit', row.raw)}
            onDelete={() => openModal('delete', row.raw)}
          />
        )}
        pagination={
          <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        }
      />

      {/* Add Modal */}
      <Alert open={activeModal === 'add'} onClose={closeModal}>
        <AlertTitle>Add Voucher</AlertTitle>
        <AlertDescription>Add a new voucher to the inventory.</AlertDescription>
        <AlertBody>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Product *
                </label>
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-950/10 dark:border-white/10 rounded-md bg-white dark:bg-zinc-900"
                >
                  <option value="">Select Product</option>
                  {PRODUCT_OPTIONS.map((prod) => (
                    <option key={prod.id} value={prod.name}>
                      {prod.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Code *
                </label>
                <Input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter voucher code"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Purchase Date *
                </label>
                <Input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Expiry Date *
                </label>
                <Input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Status *
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-950/10 dark:border-white/10 rounded-md bg-white dark:bg-zinc-900"
                >
                  <option value="">Please select</option>
                  {STATUS_OPTIONS.map((stat) => (
                    <option key={stat.id} value={stat.name}>
                      {stat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Reference Number
                </label>
                <Input
                  type="text"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  placeholder="Enter reference number"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Uploaded By
              </label>
              <Input
                type="text"
                value={uploadedBy}
                onChange={(e) => setUploadedBy(e.target.value)}
                placeholder="Enter uploader name"
              />
            </div>
          </div>
        </AlertBody>
        <AlertActions>
          <Button plain onClick={closeModal} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button color="dark/zinc" onClick={handleAddItem} disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add'}
          </Button>
        </AlertActions>
      </Alert>

      {/* View Modal */}
      {selectedItem && (
        <Alert open={activeModal === 'view'} onClose={closeModal}>
          <AlertTitle>Voucher Details</AlertTitle>
          <AlertDescription>View the details of the selected voucher.</AlertDescription>
          <AlertBody>
            <div className="space-y-3">
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">ID:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedItem.id}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Product:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedItem.product}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Code:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedItem.code}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Purchase Date:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedItem.purchaseDate}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Expiry Date:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedItem.expiryDate}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Status:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedItem.status}</span>
              </div>
              {selectedItem.referenceNumber && (
                <div className="flex gap-2">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">Reference Number:</span>
                  <span className="text-zinc-600 dark:text-zinc-400">{selectedItem.referenceNumber}</span>
                </div>
              )}
              {selectedItem.uploadedBy && (
                <div className="flex gap-2">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">Uploaded By:</span>
                  <span className="text-zinc-600 dark:text-zinc-400">{selectedItem.uploadedBy}</span>
                </div>
              )}
            </div>
          </AlertBody>
          <AlertActions>
            <Button color="dark/zinc" onClick={closeModal}>
              Close
            </Button>
          </AlertActions>
        </Alert>
      )}

      {/* Edit Modal */}
      {selectedItem && (
        <Alert open={activeModal === 'edit'} onClose={closeModal}>
          <AlertTitle>Edit Voucher</AlertTitle>
          <AlertDescription>Update the voucher information.</AlertDescription>
          <AlertBody>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Product *
                </label>
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-950/10 dark:border-white/10 rounded-md bg-white dark:bg-zinc-900"
                >
                  <option value="">Select Product</option>
                  {PRODUCT_OPTIONS.map((prod) => (
                    <option key={prod.id} value={prod.name}>
                      {prod.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Code *
                </label>
                <Input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter voucher code"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Purchase Date *
                  </label>
                  <Input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Expiry Date *
                  </label>
                  <Input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Status *
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-950/10 dark:border-white/10 rounded-md bg-white dark:bg-zinc-900"
                >
                  <option value="">Please select</option>
                  {STATUS_OPTIONS.map((stat) => (
                    <option key={stat.id} value={stat.name}>
                      {stat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Reference Number
                </label>
                <Input
                  type="text"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  placeholder="Enter reference number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Uploaded By
                </label>
                <Input
                  type="text"
                  value={uploadedBy}
                  onChange={(e) => setUploadedBy(e.target.value)}
                  placeholder="Enter uploader name"
                />
              </div>
            </div>
          </AlertBody>
          <AlertActions>
            <Button plain onClick={closeModal} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button color="dark/zinc" onClick={handleSaveEdit} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </AlertActions>
        </Alert>
      )}

      {/* Delete Modal */}
      {selectedItem && (
        <Alert open={activeModal === 'delete'} onClose={closeModal}>
          <AlertTitle>Delete Voucher</AlertTitle>
          <AlertDescription>
            Are you sure you want to delete this voucher? This action cannot be undone.
          </AlertDescription>
          <AlertActions>
            <Button plain onClick={closeModal} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button color="red" onClick={handleDelete} disabled={isSubmitting}>
              {isSubmitting ? 'Deleting...' : 'Yes, Delete'}
            </Button>
          </AlertActions>
        </Alert>
      )}
    </div>
  )
}
