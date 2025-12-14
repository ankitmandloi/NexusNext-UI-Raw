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
import {
  initialSingleBulkPayouts,
  requestRewardTypes,
  customerTypes,
  tdsApplicableOptions,
  requestStatusOptions,
} from './data'

const ITEMS_PER_PAGE = 10

export default function SingleBulkPayoutPage() {
  const [payouts, setPayouts] = useState(initialSingleBulkPayouts)
  const [activeModal, setActiveModal] = useState(null)
  const [selectedPayout, setSelectedPayout] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Add form state
  const [form, setForm] = useState({
    customer: '',
    requestRewardTypeId: '',
    customerTypeId: '',
    payoutStartDate: '',
    payoutEndDate: '',
    isTDSApplicableId: '',
    requestCreatedBy: '',
    requestStatusId: '',
  })

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(payouts.length / ITEMS_PER_PAGE))
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [payouts, currentPage])

  const paginatedPayouts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return payouts.slice(start, start + ITEMS_PER_PAGE)
  }, [payouts, currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const openModal = (type, payload) => {
    setActiveModal(type)
    setSelectedPayout(payload ?? null)
    if (type === 'add') {
      setForm({
        customer: '',
        requestRewardTypeId: '',
        customerTypeId: '',
        payoutStartDate: '',
        payoutEndDate: '',
        isTDSApplicableId: '',
        requestCreatedBy: '',
        requestStatusId: '',
      })
    }
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedPayout(null)
  }

  const handleAddPayout = () => {
    const rewardType = requestRewardTypes.find((r) => r.id === Number(form.requestRewardTypeId))
    const customerType = customerTypes.find((c) => c.id === Number(form.customerTypeId))
    const tdsApplicable = tdsApplicableOptions.find((t) => t.id === Number(form.isTDSApplicableId))
    const requestStatus = requestStatusOptions.find((s) => s.id === Number(form.requestStatusId))

    if (
      !form.customer ||
      !rewardType ||
      !customerType ||
      !form.payoutStartDate ||
      !form.payoutEndDate ||
      !tdsApplicable ||
      !form.requestCreatedBy ||
      !requestStatus
    ) {
      return
    }

    const newPayout = {
      id: `SBP-${String(payouts.length + 1).padStart(3, '0')}`,
      transactionNumber: `TXN-2025-${String(payouts.length + 1).padStart(3, '0')}`,
      requestRewardType: rewardType.name,
      customerType: customerType.name,
      payoutStartDate: form.payoutStartDate,
      payoutEndDate: form.payoutEndDate,
      requestStatus: requestStatus.name,
      isTDSApplicable: tdsApplicable.name,
      requestCreatedBy: form.requestCreatedBy,
      requestApprovedBy: 'N/A',
    }

    setPayouts((prev) => [...prev, newPayout])
    closeModal()
  }

  const handleSaveEdit = (editForm) => {
    if (!selectedPayout) return

    setPayouts((prev) =>
      prev.map((payout) =>
        payout.id === selectedPayout.id
          ? {
              ...payout,
              requestCreatedBy: editForm.requestCreatedBy || payout.requestCreatedBy,
              requestApprovedBy: editForm.requestApprovedBy || payout.requestApprovedBy,
            }
          : payout
      )
    )
  }

  const handleDelete = () => {
    if (!selectedPayout) return
    setPayouts((prev) => prev.filter((payout) => payout.id !== selectedPayout.id))
  }

  const tableRows = paginatedPayouts.map((payout) => ({
    id: payout.id,
    transactionNumber: payout.transactionNumber,
    requestRewardType: payout.requestRewardType,
    customerType: payout.customerType,
    payoutStartDate: payout.payoutStartDate,
    payoutEndDate: payout.payoutEndDate,
    requestStatus: payout.requestStatus,
    isTDSApplicable: payout.isTDSApplicable,
    requestCreatedBy: payout.requestCreatedBy,
    requestApprovedBy: payout.requestApprovedBy,
    raw: payout,
  }))

  const totalPages = Math.max(1, Math.ceil(payouts.length / ITEMS_PER_PAGE))

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      <Header
        title="Single / Bulk Payout"
        subtitle="Manage single and bulk payout requests, reward types, and approval status"
        addLabel="Add Single / Bulk Payout"
        onAdd={() => openModal('add')}
        dropdownOptions={[
          { label: 'Import from Excel' },
          { label: 'Export to Excel' },
          { label: 'Download Format' },
        ]}
      />

      <CommonTable
        data={tableRows}
        emptyMessage="No payout records found."
        minWidth="2400px"
        stickyColumns={true}
        actionColumnWidth="150px"
        columns={[
          { key: 'id', label: 'ID', width: '120px' },
          { key: 'transactionNumber', label: 'Transaction Number', width: '180px' },
          { key: 'requestRewardType', label: 'Request Reward Type', width: '180px' },
          { key: 'customerType', label: 'Customer Type', width: '160px' },
          { key: 'payoutStartDate', label: 'Payout Start Date', width: '160px' },
          { key: 'payoutEndDate', label: 'Payout End Date', width: '160px' },
          { key: 'requestStatus', label: 'Request Status', width: '150px' },
          { key: 'isTDSApplicable', label: 'Is TDS Applicable?', width: '170px' },
          { key: 'requestCreatedBy', label: 'Request Created By', width: '180px' },
          { key: 'requestApprovedBy', label: 'Request Approved By', width: '190px' },
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

      {/* Add Single / Bulk Payout Alert */}
      <Alert open={activeModal === 'add'} onClose={closeModal} size="2xl">
        <AlertTitle>Add Single / Bulk Payout</AlertTitle>
        <AlertDescription>Fill in the payout details below</AlertDescription>

        <AlertBody>
          <div className="max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Customer with Search */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Customer
                </label>
                <Input
                  type="text"
                  value={form.customer}
                  onChange={(e) => setForm({ ...form, customer: e.target.value })}
                  placeholder="Search customer..."
                />
              </div>

              {/* Request Reward Type Dropdown */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Request Reward Type
                </label>
                <select
                  value={form.requestRewardTypeId}
                  onChange={(e) => setForm({ ...form, requestRewardTypeId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800"
                >
                  <option value="">Select Reward Type</option>
                  {requestRewardTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Customer Type Dropdown */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Customer Type
                </label>
                <select
                  value={form.customerTypeId}
                  onChange={(e) => setForm({ ...form, customerTypeId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800"
                >
                  <option value="">Select Customer Type</option>
                  {customerTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payout Start Date */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Payout Start Date
                </label>
                <Input
                  type="date"
                  value={form.payoutStartDate}
                  onChange={(e) => setForm({ ...form, payoutStartDate: e.target.value })}
                />
              </div>

              {/* Payout End Date */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Payout End Date
                </label>
                <Input
                  type="date"
                  value={form.payoutEndDate}
                  onChange={(e) => setForm({ ...form, payoutEndDate: e.target.value })}
                />
              </div>

              {/* Is TDS Applicable Dropdown */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Is TDS Applicable?
                </label>
                <select
                  value={form.isTDSApplicableId}
                  onChange={(e) => setForm({ ...form, isTDSApplicableId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800"
                >
                  <option value="">Select Option</option>
                  {tdsApplicableOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Request Created By */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Request Created By
                </label>
                <Input
                  type="text"
                  value={form.requestCreatedBy}
                  onChange={(e) => setForm({ ...form, requestCreatedBy: e.target.value })}
                  placeholder="Enter creator name..."
                />
              </div>

              {/* Request Status Dropdown */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Request Status
                </label>
                <select
                  value={form.requestStatusId}
                  onChange={(e) => setForm({ ...form, requestStatusId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800"
                >
                  <option value="">Select Status</option>
                  {requestStatusOptions.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
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
            onClick={handleAddPayout}
            disabled={
              !form.customer ||
              !form.requestRewardTypeId ||
              !form.customerTypeId ||
              !form.payoutStartDate ||
              !form.payoutEndDate ||
              !form.isTDSApplicableId ||
              !form.requestCreatedBy ||
              !form.requestStatusId
            }
          >
            Add Payout
          </Button>
        </AlertActions>
      </Alert>

      {selectedPayout && (
        <>
          <ViewAlert
            isOpen={activeModal === 'view'}
            onClose={closeModal}
            title="Payout Details"
            message="View the details of the selected payout"
            fields={{
              ID: selectedPayout.id,
              'Transaction Number': selectedPayout.transactionNumber,
              'Request Reward Type': selectedPayout.requestRewardType,
              'Customer Type': selectedPayout.customerType,
              'Payout Start Date': selectedPayout.payoutStartDate,
              'Payout End Date': selectedPayout.payoutEndDate,
              'Request Status': selectedPayout.requestStatus,
              'Is TDS Applicable?': selectedPayout.isTDSApplicable,
              'Request Created By': selectedPayout.requestCreatedBy,
              'Request Approved By': selectedPayout.requestApprovedBy,
            }}
          />

          <EditAlert
            isOpen={activeModal === 'edit'}
            onClose={closeModal}
            title="Edit Payout"
            message="Update the payout details"
            fields={{
              requestCreatedBy: selectedPayout.requestCreatedBy,
              requestApprovedBy: selectedPayout.requestApprovedBy,
            }}
            onSave={handleSaveEdit}
          />

          <DeleteAlert
            isOpen={activeModal === 'delete'}
            onClose={closeModal}
            title="Delete Payout?"
            message={`Do you really want to delete the payout "${selectedPayout.transactionNumber}"?`}
            onConfirm={handleDelete}
          />
        </>
      )}
    </div>
  )
}
