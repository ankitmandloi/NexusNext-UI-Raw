// @ts-nocheck
'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/button'
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertBody,
  AlertActions,
} from '@/components/alert'
import { Input } from '@/components/input'
import { giftDispatchData, DISPATCH_STATUS_OPTIONS, type GiftDispatch } from './data'
import Header from '../../../basic-master/address-master/common/components/Header.jsx'
import CommonTable from '../../../basic-master/address-master/common/components/Table.jsx'
import CommonPagination from '../../../basic-master/address-master/common/components/Pagination.jsx'
import Actions from '../../../basic-master/address-master/common/components/Actions.jsx'

export default function GiftDispatchDetailsPage() {
  const [dispatches, setDispatches] = useState<GiftDispatch[]>(giftDispatchData)
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [selectedDispatch, setSelectedDispatch] = useState<GiftDispatch | null>(null)

  // Form states
  const [redemptionHeader, setRedemptionHeader] = useState('')
  const [redemptionDetail, setRedemptionDetail] = useState('')
  const [address, setAddress] = useState('')
  const [consignmentReference, setConsignmentReference] = useState('')
  const [docket, setDocket] = useState('')
  const [shippingDate, setShippingDate] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [deliveryProof, setDeliveryProof] = useState('')
  const [status, setStatus] = useState('pending')

  const itemsPerPage = 10
  const totalPages = Math.ceil(dispatches.length / itemsPerPage)

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return dispatches.slice(startIndex, startIndex + itemsPerPage)
  }, [dispatches, currentPage])

  const resetForm = () => {
    setRedemptionHeader('')
    setRedemptionDetail('')
    setAddress('')
    setConsignmentReference('')
    setDocket('')
    setShippingDate('')
    setDeliveryDate('')
    setDeliveryProof('')
    setStatus('pending')
  }

  const handleAdd = () => {
    const newDispatch: GiftDispatch = {
      id: `GD-${String(dispatches.length + 1).padStart(3, '0')}`,
      redemptionHeader,
      redemptionDetail,
      address,
      consignmentReference,
      docket,
      shippingDate,
      deliveryDate: deliveryDate || undefined,
      deliveryProof: deliveryProof || undefined,
      status,
    }

    setTimeout(() => {
      setDispatches([...dispatches, newDispatch])
      setIsAddOpen(false)
      resetForm()
    }, 500)
  }

  const handleEdit = () => {
    if (!selectedDispatch) return

    const updatedDispatches = dispatches.map((d) =>
      d.id === selectedDispatch.id
        ? {
            ...d,
            redemptionHeader,
            redemptionDetail,
            address,
            consignmentReference,
            docket,
            shippingDate,
            deliveryDate: deliveryDate || undefined,
            deliveryProof: deliveryProof || undefined,
            status,
          }
        : d
    )

    setTimeout(() => {
      setDispatches(updatedDispatches)
      setIsEditOpen(false)
      setSelectedDispatch(null)
      resetForm()
    }, 500)
  }

  const handleDelete = () => {
    if (!selectedDispatch) return

    setTimeout(() => {
      setDispatches(dispatches.filter((d) => d.id !== selectedDispatch.id))
      setIsDeleteOpen(false)
      setSelectedDispatch(null)
    }, 500)
  }

  const openEditModal = (dispatch: GiftDispatch) => {
    setSelectedDispatch(dispatch)
    setRedemptionHeader(dispatch.redemptionHeader)
    setRedemptionDetail(dispatch.redemptionDetail)
    setAddress(dispatch.address || '')
    setConsignmentReference(dispatch.consignmentReference)
    setDocket(dispatch.docket)
    setShippingDate(dispatch.shippingDate)
    setDeliveryDate(dispatch.deliveryDate || '')
    setDeliveryProof(dispatch.deliveryProof || '')
    setStatus(dispatch.status.toLowerCase().replace(' ', '-'))
    setIsEditOpen(true)
  }

  const openDeleteModal = (dispatch: GiftDispatch) => {
    setSelectedDispatch(dispatch)
    setIsDeleteOpen(true)
  }

  const openViewModal = (dispatch: GiftDispatch) => {
    setSelectedDispatch(dispatch)
    setIsViewOpen(true)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const tableRows = paginatedData.map((item) => ({
    id: item.id,
    redemptionHeader: item.redemptionHeader,
    redemptionDetail: item.redemptionDetail,
    consignmentReference: item.consignmentReference,
    docket: item.docket,
    shippingDate: item.shippingDate,
    deliveryDate: item.deliveryDate || '-',
    deliveryProof: item.deliveryProof || '-',
    status: (
      <span
        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
          item.status === 'Delivered'
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            : item.status === 'In Transit'
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
            : item.status === 'Processing'
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
            : item.status === 'Pending'
            ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
            : item.status === 'Cancelled'
            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
            : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
        }`}
      >
        {item.status}
      </span>
    ),
    raw: item,
  }))

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* @ts-ignore - Header is a JSX component */}
      <Header
        title={
          <>
            Procure And Dispatch &nbsp;
            <span className="text-zinc-600 dark:text-zinc-300">Gift Dispatch Details</span>
          </>
        }
        subtitle="Track and manage gift dispatch and delivery details"
        addLabel="Add Dispatch"
        onAdd={() => setIsAddOpen(true)}
        dropdownOptions={[
          { label: 'Import from Excel' },
          { label: 'Export to Excel' },
          { label: 'Download Format' },
        ]}
      />

      {/* @ts-ignore - CommonTable is a JSX component */}
      <CommonTable
        data={tableRows}
        emptyMessage="No gift dispatches found. Use 'Add Dispatch' to create one."
        minWidth="1400px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '100px' },
          { key: 'redemptionHeader', label: 'Redemption Header', width: '150px' },
          { key: 'redemptionDetail', label: 'Redemption Detail', width: '250px' },
          { key: 'consignmentReference', label: 'Consignment Ref', width: '180px' },
          { key: 'docket', label: 'Docket', width: '150px' },
          { key: 'shippingDate', label: 'Shipping Date', width: '130px' },
          { key: 'deliveryDate', label: 'Delivery Date', width: '130px' },
          { key: 'deliveryProof', label: 'Delivery Proof', width: '150px' },
          { key: 'status', label: 'Status', width: '120px' },
        ]}
        renderActions={(row) => (
          <div className="flex items-center gap-2">
            <Button onClick={() => openViewModal(row.raw)} className="px-3 py-1.5 h-8 whitespace-nowrap">
              View
            </Button>
            <Actions
              onEdit={() => openEditModal(row.raw)}
              onDelete={() => openDeleteModal(row.raw)}
            />
          </div>
        )}
        pagination={
          <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        }
      />

      {/* Add Dispatch Modal */}
      <Alert open={isAddOpen} onClose={() => { setIsAddOpen(false); resetForm(); }} size="3xl">
        <AlertTitle>Add Gift Dispatch</AlertTitle>
        <AlertDescription>
          Fill in the details below to add a new gift dispatch record.
        </AlertDescription>
        <AlertBody>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-950 dark:text-white mb-1">
                  Redemption Header *
                </label>
                <Input
                  value={redemptionHeader}
                  onChange={(e) => setRedemptionHeader(e.target.value)}
                  placeholder="Enter redemption header"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-950 dark:text-white mb-1">
                  Redemption Detail *
                </label>
                <Input
                  value={redemptionDetail}
                  onChange={(e) => setRedemptionDetail(e.target.value)}
                  placeholder="Enter product description"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-950 dark:text-white mb-1">
                Address *
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter delivery address"
                rows={2}
                className="block w-full rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm text-zinc-950 placeholder:text-zinc-500 focus:border-zinc-950/20 focus:outline-none focus:ring-2 focus:ring-zinc-950/5 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-zinc-400 dark:focus:border-white/20 dark:focus:ring-white/10"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-950 dark:text-white mb-1">
                  Consignment Reference *
                </label>
                <Input
                  value={consignmentReference}
                  onChange={(e) => setConsignmentReference(e.target.value)}
                  placeholder="Enter consignment reference"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-950 dark:text-white mb-1">
                  Docket *
                </label>
                <Input
                  value={docket}
                  onChange={(e) => setDocket(e.target.value)}
                  placeholder="Enter docket number"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-950 dark:text-white mb-1">
                  Shipping Date *
                </label>
                <Input
                  type="date"
                  value={shippingDate}
                  onChange={(e) => setShippingDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-950 dark:text-white mb-1">
                  Delivery Date
                </label>
                <Input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-950 dark:text-white mb-1">
                  Status *
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="block w-full rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm text-zinc-950 focus:border-zinc-950/20 focus:outline-none focus:ring-2 focus:ring-zinc-950/5 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/20 dark:focus:ring-white/10"
                >
                  {DISPATCH_STATUS_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-950 dark:text-white mb-1">
                Delivery Proof
              </label>
              <Input
                value={deliveryProof}
                onChange={(e) => setDeliveryProof(e.target.value)}
                placeholder="Enter delivery proof document name"
              />
            </div>
          </div>
        </AlertBody>
        <AlertActions>
          <Button color="zinc" onClick={() => { setIsAddOpen(false); resetForm(); }}>
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={
              !redemptionHeader ||
              !redemptionDetail ||
              !address ||
              !consignmentReference ||
              !docket ||
              !shippingDate
            }
          >
            Add Dispatch
          </Button>
        </AlertActions>
      </Alert>

      {/* Edit Dispatch Modal */}
      <Alert open={isEditOpen} onClose={() => { setIsEditOpen(false); setSelectedDispatch(null); resetForm(); }} size="3xl">
        <AlertTitle>Edit Gift Dispatch</AlertTitle>
        <AlertDescription>
          Update the dispatch details below.
        </AlertDescription>
        <AlertBody>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-950 dark:text-white mb-1">
                  Redemption Header *
                </label>
                <Input
                  value={redemptionHeader}
                  onChange={(e) => setRedemptionHeader(e.target.value)}
                  placeholder="Enter redemption header"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-950 dark:text-white mb-1">
                  Redemption Detail *
                </label>
                <Input
                  value={redemptionDetail}
                  onChange={(e) => setRedemptionDetail(e.target.value)}
                  placeholder="Enter product description"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-950 dark:text-white mb-1">
                Address *
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter delivery address"
                rows={2}
                className="block w-full rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm text-zinc-950 placeholder:text-zinc-500 focus:border-zinc-950/20 focus:outline-none focus:ring-2 focus:ring-zinc-950/5 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-zinc-400 dark:focus:border-white/20 dark:focus:ring-white/10"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-950 dark:text-white mb-1">
                  Consignment Reference *
                </label>
                <Input
                  value={consignmentReference}
                  onChange={(e) => setConsignmentReference(e.target.value)}
                  placeholder="Enter consignment reference"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-950 dark:text-white mb-1">
                  Docket *
                </label>
                <Input
                  value={docket}
                  onChange={(e) => setDocket(e.target.value)}
                  placeholder="Enter docket number"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-950 dark:text-white mb-1">
                  Shipping Date *
                </label>
                <Input
                  type="date"
                  value={shippingDate}
                  onChange={(e) => setShippingDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-950 dark:text-white mb-1">
                  Delivery Date
                </label>
                <Input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-950 dark:text-white mb-1">
                  Status *
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="block w-full rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm text-zinc-950 focus:border-zinc-950/20 focus:outline-none focus:ring-2 focus:ring-zinc-950/5 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/20 dark:focus:ring-white/10"
                >
                  {DISPATCH_STATUS_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-950 dark:text-white mb-1">
                Delivery Proof
              </label>
              <Input
                value={deliveryProof}
                onChange={(e) => setDeliveryProof(e.target.value)}
                placeholder="Enter delivery proof document name"
              />
            </div>
          </div>
        </AlertBody>
        <AlertActions>
          <Button color="zinc" onClick={() => { setIsEditOpen(false); setSelectedDispatch(null); resetForm(); }}>
            Cancel
          </Button>
          <Button
            onClick={handleEdit}
            disabled={
              !redemptionHeader ||
              !redemptionDetail ||
              !address ||
              !consignmentReference ||
              !docket ||
              !shippingDate
            }
          >
            Update Dispatch
          </Button>
        </AlertActions>
      </Alert>

      {/* Delete Confirmation Modal */}
      <Alert open={isDeleteOpen} onClose={() => { setIsDeleteOpen(false); setSelectedDispatch(null); }}>
        <AlertTitle>Delete Dispatch</AlertTitle>
        <AlertDescription>
          Are you sure you want to delete dispatch <strong>{selectedDispatch?.id}</strong>? This action cannot be undone.
        </AlertDescription>
        <AlertActions>
          <Button color="zinc" onClick={() => { setIsDeleteOpen(false); setSelectedDispatch(null); }}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete}>
            Delete
          </Button>
        </AlertActions>
      </Alert>

      {/* View Dispatch Details Modal */}
      <Alert open={isViewOpen} onClose={() => { setIsViewOpen(false); setSelectedDispatch(null); }} size="2xl">
        <AlertTitle>Dispatch Details</AlertTitle>
        <AlertBody>
          {selectedDispatch && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Dispatch ID
                  </label>
                  <p className="mt-1 text-sm text-zinc-950 dark:text-white">
                    {selectedDispatch.id}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Status
                  </label>
                  <p className="mt-1">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        selectedDispatch.status === 'Delivered'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : selectedDispatch.status === 'In Transit'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          : selectedDispatch.status === 'Processing'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                      }`}
                    >
                      {selectedDispatch.status}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Redemption Header
                </label>
                <p className="mt-1 text-sm text-zinc-950 dark:text-white">
                  {selectedDispatch.redemptionHeader}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Redemption Detail
                </label>
                <p className="mt-1 text-sm text-zinc-950 dark:text-white">
                  {selectedDispatch.redemptionDetail}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Delivery Address
                </label>
                <p className="mt-1 text-sm text-zinc-950 dark:text-white">
                  {selectedDispatch.address || 'N/A'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Consignment Reference
                  </label>
                  <p className="mt-1 text-sm text-zinc-950 dark:text-white">
                    {selectedDispatch.consignmentReference}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Docket Number
                  </label>
                  <p className="mt-1 text-sm text-zinc-950 dark:text-white">
                    {selectedDispatch.docket}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Shipping Date
                  </label>
                  <p className="mt-1 text-sm text-zinc-950 dark:text-white">
                    {selectedDispatch.shippingDate}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Delivery Date
                  </label>
                  <p className="mt-1 text-sm text-zinc-950 dark:text-white">
                    {selectedDispatch.deliveryDate || 'Not Delivered'}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Delivery Proof
                </label>
                <p className="mt-1 text-sm text-zinc-950 dark:text-white">
                  {selectedDispatch.deliveryProof || 'Not Available'}
                </p>
              </div>
            </div>
          )}
        </AlertBody>
        <AlertActions>
          <Button onClick={() => { setIsViewOpen(false); setSelectedDispatch(null); }}>
            Close
          </Button>
        </AlertActions>
      </Alert>
    </div>
  )
}
