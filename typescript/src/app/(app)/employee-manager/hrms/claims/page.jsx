'use client'

import { useState } from 'react'
import { Input } from '@/components/input'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import Actions from '../../../employee-manager/common/components/Actions'
import Header from '../../../employee-manager/common/components/Header'
import CommonTable from '../../../employee-manager/common/components/Table'
import CommonPagination from '../../../employee-manager/common/components/Pagination'
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

// Sample travel plan data for dropdown
const initialTravelPlans = [
  { id: 1, destination: 'Mumbai - Client Visit', date: '2024-12-15' },
  { id: 2, destination: 'Delhi - Conference', date: '2024-12-16' },
  { id: 3, destination: 'Bangalore - Training', date: '2024-12-17' },
  { id: 4, destination: 'Hyderabad - Meeting', date: '2024-12-18' },
  { id: 5, destination: 'Chennai - Project', date: '2024-12-19' },
]

// Sample claim data
const initialClaims = [
  {
    id: 1,
    expenseType: 'Flight Expense',
    travelPlanId: 1,
    travelPlan: 'Mumbai - Client Visit',
    expenseProof: '/users/1.jpg',
    expenseAmount: 8500,
    expenseStatus: 'Approved',
    employeeId: 1,
    employeeName: 'John Smith',
    expenseDate: '2024-12-15',
    expenseRemark: 'Return flight for client meeting',
  },
  {
    id: 2,
    expenseType: 'Train Expense',
    travelPlanId: 2,
    travelPlan: 'Delhi - Conference',
    expenseProof: '/users/2.jpg',
    expenseAmount: 1200,
    expenseStatus: 'Pending',
    employeeId: 2,
    employeeName: 'Sarah Johnson',
    expenseDate: '2024-12-16',
    expenseRemark: 'AC 2-tier train ticket',
  },
  {
    id: 3,
    expenseType: 'Lodging / Boarding',
    travelPlanId: 3,
    travelPlan: 'Bangalore - Training',
    expenseProof: '/users/3.jpg',
    expenseAmount: 4500,
    expenseStatus: 'Approved',
    employeeId: 3,
    employeeName: 'Michael Brown',
    expenseDate: '2024-12-17',
    expenseRemark: '2 nights hotel stay',
  },
  {
    id: 4,
    expenseType: 'Local Conveyance',
    travelPlanId: 4,
    travelPlan: 'Hyderabad - Meeting',
    expenseProof: '/users/4.jpg',
    expenseAmount: 800,
    expenseStatus: 'Rejected',
    employeeId: 4,
    employeeName: 'Emily Davis',
    expenseDate: '2024-12-18',
    expenseRemark: 'Uber rides for site visits',
  },
  {
    id: 5,
    expenseType: 'Bus Expense',
    travelPlanId: 5,
    travelPlan: 'Chennai - Project',
    expenseProof: '/users/5.jpg',
    expenseAmount: 600,
    expenseStatus: 'Approved',
    employeeId: 5,
    employeeName: 'David Wilson',
    expenseDate: '2024-12-19',
    expenseRemark: 'Volvo bus ticket',
  },
  {
    id: 6,
    expenseType: 'Auto Conveyance',
    travelPlanId: 1,
    travelPlan: 'Mumbai - Client Visit',
    expenseProof: '/users/6.jpg',
    expenseAmount: 350,
    expenseStatus: 'Pending',
    employeeId: 6,
    employeeName: 'Lisa Anderson',
    expenseDate: '2024-12-15',
    expenseRemark: 'Auto fare for local travel',
  },
  {
    id: 7,
    expenseType: 'Flight Expense',
    travelPlanId: 2,
    travelPlan: 'Delhi - Conference',
    expenseProof: '/users/7.jpg',
    expenseAmount: 9200,
    expenseStatus: 'Approved',
    employeeId: 7,
    employeeName: 'Robert Martinez',
    expenseDate: '2024-12-16',
    expenseRemark: 'Business class flight',
  },
  {
    id: 8,
    expenseType: 'Lodging / Boarding',
    travelPlanId: 3,
    travelPlan: 'Bangalore - Training',
    expenseProof: '/users/8.jpg',
    expenseAmount: 3800,
    expenseStatus: 'Pending',
    employeeId: 8,
    employeeName: 'Jennifer Taylor',
    expenseDate: '2024-12-17',
    expenseRemark: 'Hotel accommodation',
  },
  {
    id: 9,
    expenseType: 'Train Expense',
    travelPlanId: 4,
    travelPlan: 'Hyderabad - Meeting',
    expenseProof: '/users/1.jpg',
    expenseAmount: 1500,
    expenseStatus: 'Approved',
    employeeId: 1,
    employeeName: 'John Smith',
    expenseDate: '2024-12-18',
    expenseRemark: 'Express train ticket',
  },
  {
    id: 10,
    expenseType: 'Local Conveyance',
    travelPlanId: 5,
    travelPlan: 'Chennai - Project',
    expenseProof: '/users/2.jpg',
    expenseAmount: 450,
    expenseStatus: 'Rejected',
    employeeId: 2,
    employeeName: 'Sarah Johnson',
    expenseDate: '2024-12-19',
    expenseRemark: 'Taxi charges',
  },
  {
    id: 11,
    expenseType: 'Flight Expense',
    travelPlanId: 1,
    travelPlan: 'Mumbai - Client Visit',
    expenseProof: '/users/3.jpg',
    expenseAmount: 7800,
    expenseStatus: 'Pending',
    employeeId: 3,
    employeeName: 'Michael Brown',
    expenseDate: '2024-12-15',
    expenseRemark: 'One-way flight ticket',
  },
  {
    id: 12,
    expenseType: 'Auto Conveyance',
    travelPlanId: 2,
    travelPlan: 'Delhi - Conference',
    expenseProof: '/users/4.jpg',
    expenseAmount: 280,
    expenseStatus: 'Approved',
    employeeId: 4,
    employeeName: 'Emily Davis',
    expenseDate: '2024-12-16',
    expenseRemark: 'Auto fare',
  },
]

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function ClaimListPage() {
  // State management
  const [claims, setClaims] = useState(initialClaims)
  const [employees] = useState(initialEmployees)
  const [travelPlans] = useState(initialTravelPlans)

  // Modal state management
  const [activeModal, setActiveModal] = useState(null)
  const [selectedClaim, setSelectedClaim] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(claims.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentClaims = claims.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // ========================================================================
  // ACTION HANDLERS
  // ========================================================================

  const handleView = (claim) => {
    setSelectedClaim(claim)
    setActiveModal('view')
  }

  const handleEdit = (claim) => {
    setSelectedClaim(claim)
    setActiveModal('edit')
  }

  const handleDelete = (claim) => {
    setSelectedClaim(claim)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setActiveModal('add')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedClaim(null)
  }

  // ========================================================================
  // CRUD HANDLERS
  // ========================================================================

  const handleFileUpload = (e, callback) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        callback(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddClaim = (formData) => {
    const newId = claims.length > 0 ? Math.max(...claims.map(c => c.id)) + 1 : 1
    const employeeName = employees.find(e => e.id == formData.get('employeeId'))?.name
    const travelPlan = travelPlans.find(t => t.id == formData.get('travelPlanId'))?.destination

    const expenseProofFile = formData.get('expenseProof')
    
    setClaims(prev => [...prev, {
      id: newId,
      expenseType: formData.get('expenseType'),
      travelPlanId: Number(formData.get('travelPlanId')),
      travelPlan,
      expenseProof: expenseProofFile || '/users/1.jpg',
      expenseAmount: Number(formData.get('expenseAmount')),
      expenseStatus: formData.get('expenseStatus'),
      employeeId: Number(formData.get('employeeId')),
      employeeName,
      expenseDate: formData.get('expenseDate'),
      expenseRemark: formData.get('expenseRemark'),
    }])
    closeModal()
  }

  const handleSaveEdit = (formData) => {
    const employeeName = employees.find(e => e.id == formData.get('employeeId'))?.name
    const travelPlan = travelPlans.find(t => t.id == formData.get('travelPlanId'))?.destination

    const expenseProofFile = formData.get('expenseProof')

    setClaims(prev =>
      prev.map(claim =>
        claim.id === selectedClaim.id
          ? {
              ...claim,
              expenseType: formData.get('expenseType'),
              travelPlanId: Number(formData.get('travelPlanId')),
              travelPlan,
              expenseProof: expenseProofFile || claim.expenseProof,
              expenseAmount: Number(formData.get('expenseAmount')),
              expenseStatus: formData.get('expenseStatus'),
              employeeId: Number(formData.get('employeeId')),
              employeeName,
              expenseDate: formData.get('expenseDate'),
              expenseRemark: formData.get('expenseRemark'),
            }
          : claim
      )
    )
    closeModal()
  }

  const handleConfirmDelete = () => {
    setClaims(prev => prev.filter(c => c.id !== selectedClaim.id))
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
        title="Claim List"
        subtitle="Manage employee expense claims"
        addLabel="Add Claim"
        onAdd={handleAddClick}
        dropdownOptions={[
          { label: 'Import from Excel', onClick: handleImportExcel },
          { label: 'Export to Excel', onClick: handleExportExcel },
          { label: 'Download Format', onClick: handleDownloadFormat },
        ]}
      />

    <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">

      {/* Table using CommonTable component */}
      <CommonTable
        data={currentClaims.map(claim => ({
          id: claim.id,
          expenseType: claim.expenseType,
          travelPlan: claim.travelPlan,
          expenseProof: (
            <img 
              src={claim.expenseProof} 
              alt="Expense Proof" 
              className="w-10 h-10 rounded object-cover mx-auto cursor-pointer hover:scale-110 transition-transform"
              onClick={() => {
                setSelectedClaim(claim)
                setActiveModal('viewProof')
              }}
            />
          ),
          expenseAmount: `₹${claim.expenseAmount.toLocaleString()}`,
          expenseStatus: (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.expenseStatus)}`}>
              {claim.expenseStatus}
            </span>
          ),
          employee: claim.employeeName,
          raw: claim,
        }))}
        emptyMessage="No claims found. Click 'Add Claim' to create one."
        minWidth="1300px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '80px' },
          { key: 'expenseType', label: 'Expense Type', width: '180px' },
          { key: 'travelPlan', label: 'Travel Plan', width: '200px' },
          { key: 'expenseProof', label: 'Expense Proof', width: '140px' },
          { key: 'expenseAmount', label: 'Expense Amount', width: '150px' },
          { key: 'expenseStatus', label: 'Expense Status', width: '140px' },
          { key: 'employee', label: 'Employee', width: '180px' },
        ]}
        renderActions={(row) => (
          <Actions
            onView={() => handleView(row.raw)}
            onEdit={() => handleEdit(row.raw)}
            onDelete={() => handleDelete(row.raw)}
          />
        )}
        />
          <CommonPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      
      {/* ================================================================== */}
      {/* VIEW PROOF MODAL */}
      {/* ================================================================== */}

      {activeModal === 'viewProof' && selectedClaim && (
        <Alert open={true} onClose={closeModal} size="2xl">
          <AlertTitle>Expense Proof</AlertTitle>
          <AlertDescription>{selectedClaim.employeeName} - {selectedClaim.expenseType}</AlertDescription>
          <AlertBody>
            <div className="flex justify-center">
              <img 
                src={selectedClaim.expenseProof} 
                alt="Expense Proof" 
                className="max-w-full max-h-96 rounded-lg border border-zinc-300 dark:border-zinc-600"
              />
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
      {/* VIEW MODAL */}
      {/* ================================================================== */}

      {activeModal === 'view' && selectedClaim && (
        <Alert open={true} onClose={closeModal} size="3xl">
          <AlertTitle>Claim Details</AlertTitle>
          <AlertDescription>View the expense claim information</AlertDescription>
          <AlertBody>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</p>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">{selectedClaim.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Expense Date</p>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">
                    {new Date(selectedClaim.expenseDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Employee</p>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">{selectedClaim.employeeName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Expense Type</p>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">{selectedClaim.expenseType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Travel Plan</p>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">{selectedClaim.travelPlan}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Expense Amount</p>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">₹{selectedClaim.expenseAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedClaim.expenseStatus)}`}>
                    {selectedClaim.expenseStatus}
                  </span>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Expense Proof</p>
                  <img 
                    src={selectedClaim.expenseProof} 
                    alt="Expense Proof" 
                    className="mt-2 max-w-xs max-h-48 rounded-lg border border-zinc-300 dark:border-zinc-600"
                  />
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Remark</p>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">{selectedClaim.expenseRemark || '-'}</p>
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
            <AlertTitle>Add Claim</AlertTitle>
            <AlertDescription>Create a new expense claim</AlertDescription>
          </div>

          {/* Scrollable Body */}
          <AlertBody className="overflow-y-auto max-h-[calc(80vh-200px)] py-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleAddClaim(new FormData(e.target))
              }}
              id="addClaimForm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Expense Date */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Expense Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    name="expenseDate"
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

                {/* Expense Type */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Expense Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="expenseType"
                    required
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

                {/* Travel Plan */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Travel Plan <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="travelPlanId"
                    required
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="">Select Travel Plan</option>
                    {travelPlans.map(plan => (
                      <option key={plan.id} value={plan.id}>
                        {plan.destination} ({new Date(plan.date).toLocaleDateString()})
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
                    name="expenseAmount"
                    placeholder="Enter amount"
                    required
                    className="w-full"
                  />
                </div>

                {/* Expense Status */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Expense Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="expenseStatus"
                    required
                    defaultValue="Pending"
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                {/* Expense Proof */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Expense Proof <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="file"
                    name="expenseProof"
                    accept="image/*"
                    className="w-full"
                  />
                </div>

                {/* Expense Remark */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Expense Remark
                  </label>
                  <textarea
                    name="expenseRemark"
                    placeholder="Enter any additional remarks"
                    rows={4}
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>
            </form>
          </AlertBody>

          {/* Sticky Footer */}
          <AlertActions className="sticky bottom-0 bg-white dark:bg-zinc-900 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <Button plain onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" form="addClaimForm">
              Add Claim
            </Button>
          </AlertActions>
        </Alert>
      )}

      {/* ================================================================== */}
      {/* EDIT MODAL */}
      {/* ================================================================== */}

      {activeModal === 'edit' && selectedClaim && (
        <Alert open={true} onClose={closeModal} size="3xl" className="sm:my-16">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-white dark:bg-zinc-900 pb-2 border-b border-zinc-200 dark:border-zinc-700">
            <AlertTitle>Edit Claim</AlertTitle>
            <AlertDescription>Update the expense claim details</AlertDescription>
          </div>

          {/* Scrollable Body */}
          <AlertBody className="overflow-y-auto max-h-[calc(80vh-200px)] py-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSaveEdit(new FormData(e.target))
              }}
              id="editClaimForm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Expense Date */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Expense Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    name="expenseDate"
                    defaultValue={selectedClaim.expenseDate}
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
                    defaultValue={selectedClaim.employeeId}
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

                {/* Expense Type */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Expense Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="expenseType"
                    defaultValue={selectedClaim.expenseType}
                    required
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

                {/* Travel Plan */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Travel Plan <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="travelPlanId"
                    defaultValue={selectedClaim.travelPlanId}
                    required
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="">Select Travel Plan</option>
                    {travelPlans.map(plan => (
                      <option key={plan.id} value={plan.id}>
                        {plan.destination} ({new Date(plan.date).toLocaleDateString()})
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
                    name="expenseAmount"
                    defaultValue={selectedClaim.expenseAmount}
                    placeholder="Enter amount"
                    required
                    className="w-full"
                  />
                </div>

                {/* Expense Status */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Expense Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="expenseStatus"
                    defaultValue={selectedClaim.expenseStatus}
                    required
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                {/* Current Expense Proof */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Current Expense Proof
                  </label>
                  <img 
                    src={selectedClaim.expenseProof} 
                    alt="Current Expense Proof" 
                    className="max-w-xs max-h-32 rounded-lg border border-zinc-300 dark:border-zinc-600"
                  />
                </div>

                {/* Expense Proof (Update) */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Update Expense Proof (optional)
                  </label>
                  <Input
                    type="file"
                    name="expenseProof"
                    accept="image/*"
                    className="w-full"
                  />
                </div>

                {/* Expense Remark */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Expense Remark
                  </label>
                  <textarea
                    name="expenseRemark"
                    defaultValue={selectedClaim.expenseRemark}
                    placeholder="Enter any additional remarks"
                    rows={4}
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>
            </form>
          </AlertBody>

          {/* Sticky Footer */}
          <AlertActions className="sticky bottom-0 bg-white dark:bg-zinc-900 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <Button plain onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" form="editClaimForm">
              Save Changes
            </Button>
          </AlertActions>
        </Alert>
      )}

      {/* ================================================================== */}
      {/* DELETE MODAL */}
      {/* ================================================================== */}

      {activeModal === 'delete' && selectedClaim && (
        <Alert open={true} onClose={closeModal}>
          <AlertTitle>Delete Claim</AlertTitle>
          <AlertDescription>
            Are you sure you want to delete the claim for <strong>{selectedClaim.employeeName}</strong> - <strong>{selectedClaim.expenseType}</strong>? 
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
