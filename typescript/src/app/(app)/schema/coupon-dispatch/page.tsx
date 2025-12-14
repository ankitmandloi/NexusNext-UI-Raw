// @ts-nocheck
'use client'

import { useEffect, useMemo, useState } from 'react'
import Header from '@/app/(app)/basic-master/address-master/common/components/Header.jsx'
import CommonTable from '@/app/(app)/basic-master/address-master/common/components/Table.jsx'
import CommonPagination from '@/app/(app)/basic-master/address-master/common/components/Pagination.jsx'
import Actions from '@/app/(app)/basic-master/address-master/common/components/Actions.jsx'
import {
  DeleteAlert,
  EditAlert,
  ViewAlert,
} from '@/app/(app)/basic-master/address-master/common/components/Alert.jsx'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { initialCouponDispatches, statusOptions, CouponDispatch } from './data'

const ITEMS_PER_PAGE = 10

export default function CouponDispatchPage() {
  const [dispatches, setDispatches] = useState<CouponDispatch[]>(initialCouponDispatches)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [selectedDispatch, setSelectedDispatch] = useState<CouponDispatch | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Add form state
  const [form, setForm] = useState({
    invoiceNumber: '',
    invoiceDate: '',
    dispatchTo: '',
    shipmentNumber: '',
    shipmentRemark: '',
    shipmentDate: '',
    statusId: '',
  })

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(dispatches.length / ITEMS_PER_PAGE))
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [dispatches, currentPage])

  const paginatedDispatches = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return dispatches.slice(start, start + ITEMS_PER_PAGE)
  }, [dispatches, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const openModal = (type: string, payload?: CouponDispatch) => {
    setActiveModal(type)
    setSelectedDispatch(payload ?? null)
    if (type === 'add') {
      setForm({
        invoiceNumber: '',
        invoiceDate: '',
        dispatchTo: '',
        shipmentNumber: '',
        shipmentRemark: '',
        shipmentDate: '',
        statusId: '',
      })
    }
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedDispatch(null)
  }

  const handleAddDispatch = () => {
    const status = statusOptions.find((s) => s.id === Number(form.statusId))

    if (
      !form.invoiceNumber ||
      !form.invoiceDate ||
      !form.dispatchTo ||
      !form.shipmentNumber ||
      !form.shipmentDate ||
      !status
    ) {
      return
    }

    const newDispatch: CouponDispatch = {
      id: `CD-${String(dispatches.length + 1).padStart(3, '0')}`,
      invoiceNumber: form.invoiceNumber,
      invoiceDate: form.invoiceDate,
      dispatchTo: form.dispatchTo,
      shipmentNumber: form.shipmentNumber,
      shipmentRemark: form.shipmentRemark || '',
      shipmentDate: form.shipmentDate,
      status: status.name,
    }

    setDispatches((prev) => [...prev, newDispatch])
    closeModal()
  }

  const handleSaveEdit = (editForm: any) => {
    if (!selectedDispatch) return

    setDispatches((prev) =>
      prev.map((dispatch) =>
        dispatch.id === selectedDispatch.id
          ? {
              ...dispatch,
              invoiceNumber: editForm.invoiceNumber || dispatch.invoiceNumber,
              dispatchTo: editForm.dispatchTo || dispatch.dispatchTo,
              shipmentRemark: editForm.shipmentRemark || dispatch.shipmentRemark,
            }
          : dispatch
      )
    )
  }

  const handleDelete = () => {
    if (!selectedDispatch) return
    setDispatches((prev) => prev.filter((dispatch) => dispatch.id !== selectedDispatch.id))
  }

  const tableRows = paginatedDispatches.map((dispatch) => ({
    id: dispatch.id,
    invoiceNumber: dispatch.invoiceNumber,
    invoiceDate: dispatch.invoiceDate,
    dispatchTo: dispatch.dispatchTo,
    shipmentNumber: dispatch.shipmentNumber,
    shipmentRemark: dispatch.shipmentRemark || 'N/A',
    shipmentDate: dispatch.shipmentDate,
    status: dispatch.status,
    raw: dispatch,
  }))

  const totalPages = Math.max(1, Math.ceil(dispatches.length / ITEMS_PER_PAGE))

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* @ts-ignore - Header is a JSX component */}
      <Header
        title="Coupon Dispatch"
        subtitle="Manage coupon dispatches, shipments, and delivery tracking"
        addLabel="Add Coupon Dispatch"
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
        emptyMessage="No coupon dispatches found."
        minWidth="1800px"
        stickyColumns={true}
        actionColumnWidth="150px"
        columns={[
          { key: 'id', label: 'ID', width: '120px' },
          { key: 'invoiceNumber', label: 'Invoice Number', width: '180px' },
          { key: 'invoiceDate', label: 'Invoice Date', width: '140px' },
          { key: 'dispatchTo', label: 'Dispatch To', width: '200px' },
          { key: 'shipmentNumber', label: 'Shipment Number', width: '180px' },
          { key: 'shipmentRemark', label: 'Shipment Remark', width: '200px' },
          { key: 'shipmentDate', label: 'Shipment Date', width: '140px' },
          { key: 'status', label: 'Status', width: '120px' },
        ]}
        renderActions={(row: any) => (
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

      {/* Add Coupon Dispatch Alert */}
      <Alert open={activeModal === 'add'} onClose={closeModal} size="2xl">
        <AlertTitle>Add Coupon Dispatch</AlertTitle>
        <AlertDescription>Fill in the coupon dispatch details below</AlertDescription>

        <AlertBody>
          <div className="max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Invoice Number */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Invoice Number
                </label>
                <Input
                  type="text"
                  value={form.invoiceNumber}
                  onChange={(e) => setForm({ ...form, invoiceNumber: e.target.value })}
                  placeholder="Enter invoice number..."
                />
              </div>

              {/* Invoice Date */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Invoice Date
                </label>
                <Input
                  type="date"
                  value={form.invoiceDate}
                  onChange={(e) => setForm({ ...form, invoiceDate: e.target.value })}
                />
              </div>

              {/* Dispatch To */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Dispatch To
                </label>
                <Input
                  type="text"
                  value={form.dispatchTo}
                  onChange={(e) => setForm({ ...form, dispatchTo: e.target.value })}
                  placeholder="Enter dispatch to..."
                />
              </div>

              {/* Shipment Number */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Shipment Number
                </label>
                <Input
                  type="text"
                  value={form.shipmentNumber}
                  onChange={(e) => setForm({ ...form, shipmentNumber: e.target.value })}
                  placeholder="Enter shipment number..."
                />
              </div>

              {/* Shipment Date */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Shipment Date
                </label>
                <Input
                  type="date"
                  value={form.shipmentDate}
                  onChange={(e) => setForm({ ...form, shipmentDate: e.target.value })}
                />
              </div>

              {/* Status Dropdown */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Status</label>
                <select
                  value={form.statusId}
                  onChange={(e) => setForm({ ...form, statusId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800"
                >
                  <option value="">Select Status</option>
                  {statusOptions.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Shipment Remark - Full Width */}
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Shipment Remark
                </label>
                <Input
                  type="text"
                  value={form.shipmentRemark}
                  onChange={(e) => setForm({ ...form, shipmentRemark: e.target.value })}
                  placeholder="Enter shipment remark..."
                />
              </div>
            </div>
          </div>
        </AlertBody>

        <AlertActions>
          <Button plain onClick={closeModal}>
            Cancel
          </Button>
          <Button
            color="dark/zinc"
            onClick={handleAddDispatch}
            disabled={
              !form.invoiceNumber ||
              !form.invoiceDate ||
              !form.dispatchTo ||
              !form.shipmentNumber ||
              !form.shipmentDate ||
              !form.statusId
            }
          >
            Add Coupon Dispatch
          </Button>
        </AlertActions>
      </Alert>

      {selectedDispatch && (
        <>
          <ViewAlert
            isOpen={activeModal === 'view'}
            onClose={closeModal}
            title="Coupon Dispatch Details"
            message="View the details of the selected coupon dispatch"
            fields={{
              ID: selectedDispatch.id,
              'Invoice Number': selectedDispatch.invoiceNumber,
              'Invoice Date': selectedDispatch.invoiceDate,
              'Dispatch To': selectedDispatch.dispatchTo,
              'Shipment Number': selectedDispatch.shipmentNumber,
              'Shipment Remark': selectedDispatch.shipmentRemark || 'N/A',
              'Shipment Date': selectedDispatch.shipmentDate,
              Status: selectedDispatch.status,
            }}
          />

          <EditAlert
            isOpen={activeModal === 'edit'}
            onClose={closeModal}
            title="Edit Coupon Dispatch"
            message="Update the coupon dispatch details"
            fields={{
              invoiceNumber: selectedDispatch.invoiceNumber,
              dispatchTo: selectedDispatch.dispatchTo,
              shipmentRemark: selectedDispatch.shipmentRemark,
            }}
            onSave={handleSaveEdit}
          />

          <DeleteAlert
            isOpen={activeModal === 'delete'}
            onClose={closeModal}
            title="Delete Coupon Dispatch?"
            message={`Do you really want to delete the coupon dispatch "${selectedDispatch.invoiceNumber}"?`}
            onConfirm={handleDelete}
          />
        </>
      )}
    </div>
  )
}
