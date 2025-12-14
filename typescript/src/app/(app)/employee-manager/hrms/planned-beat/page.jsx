'use client'

import { useState } from 'react'
import { Input } from '@/components/input'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import Actions from '../../../basic-master/address-master/common/components/Actions.jsx'
import Header from '../../../basic-master/address-master/common/components/Header.jsx'
import CommonTable from '../../../basic-master/address-master/common/components/Table.jsx'
import CommonPagination from '../../../basic-master/address-master/common/components/Pagination.jsx'

// ============================================================================
// CONSTANTS
// ============================================================================

const ITEMS_PER_PAGE = 10

// Expense type options
const EXPENSE_TYPES = [
  'Flight Expense',
  'Train Expense',
  'Bus Expense',
  'Lodging / Boarding',
  'Local Conveyance',
  'Auto Conveyance',
]

// ============================================================================
// INITIAL DATA
// ============================================================================

// Sample employee data for dropdown
const initialEmployees = [
  { id: 1, name: 'John Smith', code: 'EMP001' },
  { id: 2, name: 'Sarah Johnson', code: 'EMP002' },
  { id: 3, name: 'Michael Brown', code: 'EMP003' },
  { id: 4, name: 'Emily Davis', code: 'EMP004' },
  { id: 5, name: 'David Wilson', code: 'EMP005' },
  { id: 6, name: 'Lisa Anderson', code: 'EMP006' },
  { id: 7, name: 'Robert Martinez', code: 'EMP007' },
  { id: 8, name: 'Jennifer Taylor', code: 'EMP008' },
]

// Sample planned beat data
const initialPlannedBeats = [
  {
    id: 1,
    travelDate: '2024-12-15',
    employeeId: 1,
    employeeName: 'John Smith',
    approveById: 5,
    approveByName: 'David Wilson',
    approveDate: '2024-12-10',
    status: 'Approved',
  },
  {
    id: 2,
    travelDate: '2024-12-16',
    employeeId: 2,
    employeeName: 'Sarah Johnson',
    approveById: 5,
    approveByName: 'David Wilson',
    approveDate: '2024-12-11',
    status: 'Approved',
  },
  {
    id: 3,
    travelDate: '2024-12-17',
    employeeId: 3,
    employeeName: 'Michael Brown',
    approveById: 6,
    approveByName: 'Lisa Anderson',
    approveDate: '2024-12-12',
    status: 'Approved',
  },
  {
    id: 4,
    travelDate: '2024-12-18',
    employeeId: 4,
    employeeName: 'Emily Davis',
    approveById: 6,
    approveByName: 'Lisa Anderson',
    approveDate: null,
    status: 'Pending',
  },
  {
    id: 5,
    travelDate: '2024-12-19',
    employeeId: 1,
    employeeName: 'John Smith',
    approveById: 5,
    approveByName: 'David Wilson',
    approveDate: '2024-12-13',
    status: 'Approved',
  },
  {
    id: 6,
    travelDate: '2024-12-20',
    employeeId: 7,
    employeeName: 'Robert Martinez',
    approveById: 5,
    approveByName: 'David Wilson',
    approveDate: null,
    status: 'Pending',
  },
  {
    id: 7,
    travelDate: '2024-12-21',
    employeeId: 8,
    employeeName: 'Jennifer Taylor',
    approveById: 6,
    approveByName: 'Lisa Anderson',
    approveDate: '2024-12-14',
    status: 'Approved',
  },
  {
    id: 8,
    travelDate: '2024-12-22',
    employeeId: 2,
    employeeName: 'Sarah Johnson',
    approveById: 5,
    approveByName: 'David Wilson',
    approveDate: '2024-12-14',
    status: 'Approved',
  },
  {
    id: 9,
    travelDate: '2024-12-23',
    employeeId: 3,
    employeeName: 'Michael Brown',
    approveById: 6,
    approveByName: 'Lisa Anderson',
    approveDate: null,
    status: 'Rejected',
  },
  {
    id: 10,
    travelDate: '2024-12-24',
    employeeId: 4,
    employeeName: 'Emily Davis',
    approveById: 5,
    approveByName: 'David Wilson',
    approveDate: '2024-12-13',
    status: 'Approved',
  },
  {
    id: 11,
    travelDate: '2024-12-25',
    employeeId: 7,
    employeeName: 'Robert Martinez',
    approveById: 6,
    approveByName: 'Lisa Anderson',
    approveDate: null,
    status: 'Pending',
  },
  {
    id: 12,
    travelDate: '2024-12-26',
    employeeId: 8,
    employeeName: 'Jennifer Taylor',
    approveById: 5,
    approveByName: 'David Wilson',
    approveDate: '2024-12-14',
    status: 'Approved',
  },
]

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function PlannedBeatPage() {
  // State management
  const [plannedBeats, setPlannedBeats] = useState(initialPlannedBeats)
  const [employees] = useState(initialEmployees)

  // Modal state management
  const [activeModal, setActiveModal] = useState(null)
  const [selectedBeat, setSelectedBeat] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)

  // Form state for Create Claim modal
  const [claimForm, setClaimForm] = useState({
    expenseDate: '',
    employeeId: '',
    expenseType: '',
    expenseAmount: '',
    expenseProof: null,
    expenseProofPreview: '',
    expenseRemark: '',
  })

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(plannedBeats.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentBeats = plannedBeats.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // ========================================================================
  // ACTION HANDLERS
  // ========================================================================

  const handleView = (beat) => {
    setSelectedBeat(beat)
    setActiveModal('view')
  }

  const handleEdit = (beat) => {
    setSelectedBeat(beat)
    setActiveModal('edit')
  }

  const handleDelete = (beat) => {
    setSelectedBeat(beat)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setActiveModal('add')
  }

  const handleCreateClaim = (beat) => {
    setSelectedBeat(beat)
    setClaimForm({
      expenseDate: new Date().toISOString().split('T')[0],
      employeeId: beat.employeeId,
      expenseType: '',
      expenseAmount: '',
      expenseProof: null,
      expenseProofPreview: '',
      expenseRemark: '',
    })
    setActiveModal('createClaim')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedBeat(null)
    setClaimForm({
      expenseDate: '',
      employeeId: '',
      expenseType: '',
      expenseAmount: '',
      expenseProof: null,
      expenseProofPreview: '',
      expenseRemark: '',
    })
  }

  // ========================================================================
  // FORM HANDLERS
  // ========================================================================

  const handleClaimFormChange = (field, value) => {
    setClaimForm(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setClaimForm(prev => ({
          ...prev,
          expenseProof: file,
          expenseProofPreview: reader.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitClaim = () => {
    console.log('Claim submitted:', {
      beatId: selectedBeat.id,
      ...claimForm,
    })
    // Here you would typically send the data to your backend
    closeModal()
  }

  const handleConfirmDelete = () => {
    setPlannedBeats(prev => prev.filter(b => b.id !== selectedBeat.id))
    closeModal()
  }

  const handleAddBeat = (form) => {
    const newId = plannedBeats.length > 0 ? Math.max(...plannedBeats.map(b => b.id)) + 1 : 1
    const employeeName = employees.find(e => e.id == form.employeeId)?.name
    const approveByName = employees.find(e => e.id == form.approveById)?.name

    setPlannedBeats(prev => [...prev, {
      id: newId,
      travelDate: form.travelDate,
      employeeId: Number(form.employeeId),
      employeeName,
      approveById: Number(form.approveById),
      approveByName,
      approveDate: form.status === 'Approved' ? new Date().toISOString().split('T')[0] : null,
      status: form.status,
    }])
    closeModal()
  }

  const handleSaveEdit = (form) => {
    const employeeName = employees.find(e => e.id == form.employeeId)?.name
    const approveByName = employees.find(e => e.id == form.approveById)?.name

    setPlannedBeats(prev =>
      prev.map(beat =>
        beat.id === selectedBeat.id
          ? {
              ...beat,
              travelDate: form.travelDate,
              employeeId: Number(form.employeeId),
              employeeName,
              approveById: Number(form.approveById),
              approveByName,
              approveDate: form.status === 'Approved' && !beat.approveDate ? new Date().toISOString().split('T')[0] : beat.approveDate,
              status: form.status,
            }
          : beat
      )
    )
    closeModal()
  }

  // Import/Export handlers
  const handleImportExcel = () => {
    console.log('Import from Excel clicked')
  }

  const handleExportExcel = () => {
    console.log('Export to Excel clicked')
  }

  const handleDownloadFormat = () => {
    console.log('Download Format clicked')
  }

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'Rejected':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      default:
        return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
    }
  }

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 110px)" }}>
      {/* HEADER */}
      <Header
        title="Planned Beat"
        subtitle="Manage employee travel plans and expense claims"
        addLabel="Add Beat"
        onAdd={handleAddClick}
        dropdownOptions={[
          { label: 'Import from Excel', onClick: handleImportExcel },
          { label: 'Export to Excel', onClick: handleExportExcel },
          { label: 'Download Format', onClick: handleDownloadFormat },
        ]}
      />

      {/* Table using CommonTable component */}
      <CommonTable
        data={currentBeats.map(beat => ({
          id: beat.id,
          travelDate: new Date(beat.travelDate).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
          }),
          employee: beat.employeeName,
          approveBy: beat.approveByName,
          approveDate: beat.approveDate ? new Date(beat.approveDate).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
          }) : '-',
          status: (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(beat.status)}`}>
              {beat.status}
            </span>
          ),
          activity: (
            <Button
              onClick={() => handleCreateClaim(beat)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 h-8"
            >
              Create Claim
            </Button>
          ),
          raw: beat,
        }))}
        emptyMessage="No planned beats found. Click 'Add Beat' to create one."
        minWidth="1200px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '80px' },
          { key: 'travelDate', label: 'Travel Date', width: '140px' },
          { key: 'employee', label: 'Employee', width: '180px' },
          { key: 'approveBy', label: 'Approve By', width: '180px' },
          { key: 'approveDate', label: 'Approve Date', width: '140px' },
          { key: 'status', label: 'Status', width: '130px' },
          { key: 'activity', label: 'Activity', width: '150px' },
        ]}
        renderActions={(row) => (
          <Actions
            onView={() => handleView(row.raw)}
            onEdit={() => handleEdit(row.raw)}
            onDelete={() => handleDelete(row.raw)}
          />
        )}
        pagination={
          <CommonPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        }
      />

      {/* ================================================================== */}
      {/* CREATE CLAIM MODAL */}
      {/* ================================================================== */}

      {activeModal === 'createClaim' && selectedBeat && (
        <Alert open={true} onClose={closeModal} size="3xl" className="sm:my-16">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-white dark:bg-zinc-900 pb-2 border-b border-zinc-200 dark:border-zinc-700">
            <AlertTitle>Create Expense Claim</AlertTitle>
            <AlertDescription>
              Submit expense claim for {selectedBeat.employeeName}
            </AlertDescription>
          </div>

          {/* Scrollable Body */}
          <AlertBody className="overflow-y-auto max-h-[calc(80vh-200px)] py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Expense Date */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Expense Date <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  value={claimForm.expenseDate}
                  onChange={(e) => handleClaimFormChange('expenseDate', e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Employee */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Employee <span className="text-red-500">*</span>
                </label>
                <select
                  value={claimForm.employeeId}
                  onChange={(e) => handleClaimFormChange('employeeId', e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                >
                  <option value="">Select Employee</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Expense Type */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Expense Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={claimForm.expenseType}
                  onChange={(e) => handleClaimFormChange('expenseType', e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                >
                  <option value="">Please select</option>
                  {EXPENSE_TYPES.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Expense Amount */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Expense Amount <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={claimForm.expenseAmount}
                  onChange={(e) => handleClaimFormChange('expenseAmount', e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Expense Proof */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Expense Proof <span className="text-red-500">*</span>
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full"
                />
                {claimForm.expenseProofPreview && (
                  <div className="mt-3">
                    <img
                      src={claimForm.expenseProofPreview}
                      alt="Expense Proof Preview"
                      className="max-w-xs max-h-48 rounded-lg border border-zinc-300 dark:border-zinc-600"
                    />
                  </div>
                )}
              </div>

              {/* Expense Remark */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Expense Remark
                </label>
                <textarea
                  value={claimForm.expenseRemark}
                  onChange={(e) => handleClaimFormChange('expenseRemark', e.target.value)}
                  placeholder="Enter any additional remarks"
                  rows={4}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                />
              </div>
            </div>
          </AlertBody>

          {/* Sticky Footer */}
          <AlertActions className="sticky bottom-0 bg-white dark:bg-zinc-900 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <Button plain onClick={closeModal}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitClaim}
              disabled={!claimForm.expenseDate || !claimForm.employeeId || !claimForm.expenseType || !claimForm.expenseAmount || !claimForm.expenseProof}
            >
              Submit Claim
            </Button>
          </AlertActions>
        </Alert>
      )}

      {/* ================================================================== */}
      {/* VIEW MODAL */}
      {/* ================================================================== */}

      {activeModal === 'view' && selectedBeat && (
        <Alert open={true} onClose={closeModal} size="2xl">
          <AlertTitle>Planned Beat Details</AlertTitle>
          <AlertDescription>View the planned beat information</AlertDescription>
          <AlertBody>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</p>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">{selectedBeat.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Travel Date</p>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">
                    {new Date(selectedBeat.travelDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Employee</p>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">{selectedBeat.employeeName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Approved By</p>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">{selectedBeat.approveByName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Approve Date</p>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">
                    {selectedBeat.approveDate ? new Date(selectedBeat.approveDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    }) : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBeat.status)}`}>
                    {selectedBeat.status}
                  </span>
                </div>
              </div>
            </div>
          </AlertBody>
          <AlertActions>
            <Button plain onClick={closeModal}>
              Close
            </Button>
          </AlertActions>
        </Alert>
      )}

      {/* ================================================================== */}
      {/* ADD MODAL */}
      {/* ================================================================== */}

      {activeModal === 'add' && (
        <Alert open={true} onClose={closeModal} size="3xl" className="sm:my-16">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-white dark:bg-zinc-900 pb-2 border-b border-zinc-200 dark:border-zinc-700">
            <AlertTitle>Add Planned Beat</AlertTitle>
            <AlertDescription>Create a new planned beat entry</AlertDescription>
          </div>

          {/* Scrollable Body */}
          <AlertBody className="overflow-y-auto max-h-[calc(80vh-200px)] py-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                handleAddBeat({
                  travelDate: formData.get('travelDate'),
                  employeeId: formData.get('employeeId'),
                  approveById: formData.get('approveById'),
                  status: formData.get('status'),
                })
              }}
              id="addBeatForm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Travel Date */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Travel Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    name="travelDate"
                    required
                    className="w-full"
                  />
                </div>

                {/* Employee */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Employee <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="employeeId"
                    required
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="">Select Employee</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} ({emp.code})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Approve By */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Approve By <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="approveById"
                    required
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="">Select Approver</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} ({emp.code})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status"
                    required
                    defaultValue="Pending"
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </form>
          </AlertBody>

          {/* Sticky Footer */}
          <AlertActions className="sticky bottom-0 bg-white dark:bg-zinc-900 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <Button plain onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" form="addBeatForm">
              Add Beat
            </Button>
          </AlertActions>
        </Alert>
      )}

      {/* ================================================================== */}
      {/* EDIT MODAL */}
      {/* ================================================================== */}

      {activeModal === 'edit' && selectedBeat && (
        <Alert open={true} onClose={closeModal} size="3xl" className="sm:my-16">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-white dark:bg-zinc-900 pb-2 border-b border-zinc-200 dark:border-zinc-700">
            <AlertTitle>Edit Planned Beat</AlertTitle>
            <AlertDescription>Update the planned beat details</AlertDescription>
          </div>

          {/* Scrollable Body */}
          <AlertBody className="overflow-y-auto max-h-[calc(80vh-200px)] py-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                handleSaveEdit({
                  travelDate: formData.get('travelDate'),
                  employeeId: formData.get('employeeId'),
                  approveById: formData.get('approveById'),
                  status: formData.get('status'),
                })
              }}
              id="editBeatForm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Travel Date */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Travel Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    name="travelDate"
                    defaultValue={selectedBeat.travelDate}
                    required
                    className="w-full"
                  />
                </div>

                {/* Employee */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Employee <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="employeeId"
                    defaultValue={selectedBeat.employeeId}
                    required
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="">Select Employee</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} ({emp.code})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Approve By */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Approve By <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="approveById"
                    defaultValue={selectedBeat.approveById}
                    required
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="">Select Approver</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} ({emp.code})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status"
                    defaultValue={selectedBeat.status}
                    required
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </form>
          </AlertBody>

          {/* Sticky Footer */}
          <AlertActions className="sticky bottom-0 bg-white dark:bg-zinc-900 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <Button plain onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" form="editBeatForm">
              Save Changes
            </Button>
          </AlertActions>
        </Alert>
      )}

      {/* ================================================================== */}
      {/* DELETE MODAL */}
      {/* ================================================================== */}

      {activeModal === 'delete' && selectedBeat && (
        <Alert open={true} onClose={closeModal}>
          <AlertTitle>Delete Planned Beat</AlertTitle>
          <AlertDescription>
            Are you sure you want to delete the planned beat for <strong>{selectedBeat.employeeName}</strong> on{' '}
            <strong>{new Date(selectedBeat.travelDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong>? 
            This action cannot be undone.
          </AlertDescription>
          <AlertActions>
            <Button plain onClick={closeModal}>
              Cancel
            </Button>
            <Button color="red" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </AlertActions>
        </Alert>
      )}
    </div>
  )
}
