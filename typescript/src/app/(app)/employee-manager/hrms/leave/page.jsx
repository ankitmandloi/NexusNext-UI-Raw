'use client'

import { useState, useEffect } from 'react'
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

// Approval statuses
const approvalStatuses = ['Pending', 'Approved', 'Rejected']

// Sample leave data
const initialLeaves = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'John Smith',
    leaveDate: '2024-12-20',
    remark: 'Personal work',
    approvalStatus: 'Approved',
    approvedOn: '2024-12-15',
    approvedBy: 'Manager A',
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: 'Sarah Johnson',
    leaveDate: '2024-12-21',
    remark: 'Family function',
    approvalStatus: 'Pending',
    approvedOn: '',
    approvedBy: '',
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: 'Michael Brown',
    leaveDate: '2024-12-18',
    remark: 'Medical appointment',
    approvalStatus: 'Approved',
    approvedOn: '2024-12-14',
    approvedBy: 'Manager B',
  },
  {
    id: 4,
    employeeId: 4,
    employeeName: 'Emily Davis',
    leaveDate: '2024-12-22',
    remark: 'Sick leave',
    approvalStatus: 'Rejected',
    approvedOn: '2024-12-16',
    approvedBy: 'Manager A',
  },
  {
    id: 5,
    employeeId: 5,
    employeeName: 'David Wilson',
    leaveDate: '2024-12-19',
    remark: 'Vacation',
    approvalStatus: 'Approved',
    approvedOn: '2024-12-13',
    approvedBy: 'Manager C',
  },
  {
    id: 6,
    employeeId: 6,
    employeeName: 'Lisa Anderson',
    leaveDate: '2024-12-23',
    remark: 'Personal emergency',
    approvalStatus: 'Pending',
    approvedOn: '',
    approvedBy: '',
  },
  {
    id: 7,
    employeeId: 7,
    employeeName: 'Robert Martinez',
    leaveDate: '2024-12-17',
    remark: 'Medical leave',
    approvalStatus: 'Approved',
    approvedOn: '2024-12-12',
    approvedBy: 'Manager B',
  },
  {
    id: 8,
    employeeId: 8,
    employeeName: 'Jennifer Taylor',
    leaveDate: '2024-12-24',
    remark: 'Festival celebration',
    approvalStatus: 'Pending',
    approvedOn: '',
    approvedBy: '',
  },
  {
    id: 9,
    employeeId: 1,
    employeeName: 'John Smith',
    leaveDate: '2024-12-25',
    remark: 'Christmas holiday',
    approvalStatus: 'Approved',
    approvedOn: '2024-12-14',
    approvedBy: 'Manager A',
  },
  {
    id: 10,
    employeeId: 3,
    employeeName: 'Michael Brown',
    leaveDate: '2024-12-26',
    remark: 'Extended leave',
    approvalStatus: 'Rejected',
    approvedOn: '2024-12-15',
    approvedBy: 'Manager B',
  },
  {
    id: 11,
    employeeId: 5,
    employeeName: 'David Wilson',
    leaveDate: '2024-12-27',
    remark: 'Year-end vacation',
    approvalStatus: 'Pending',
    approvedOn: '',
    approvedBy: '',
  },
  {
    id: 12,
    employeeId: 2,
    employeeName: 'Sarah Johnson',
    leaveDate: '2024-12-28',
    remark: 'Personal leave',
    approvalStatus: 'Approved',
    approvedOn: '2024-12-16',
    approvedBy: 'Manager C',
  },
]

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function LeavePage() {
  const [leaves, setLeaves] = useState(initialLeaves)
  const [employees] = useState(initialEmployees)
  const [activeModal, setActiveModal] = useState(null)
  const [selectedLeave, setSelectedLeave] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Add form state
  const [addForm, setAddForm] = useState({
    employeeId: '',
    leaveDate: '',
    remark: '',
    approvalStatus: 'Pending',
    approvedOn: '',
    approvedBy: '',
  })

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(leaves.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentLeaves = leaves.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page) => setCurrentPage(page)

  // Modal handlers
  const handleView = (leave) => {
    setSelectedLeave(leave)
    setActiveModal('view')
  }

  const handleEdit = (leave) => {
    setSelectedLeave(leave)
    setActiveModal('edit')
  }

  const handleDelete = (leave) => {
    setSelectedLeave(leave)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setActiveModal('add')
    setAddForm({
      employeeId: '',
      leaveDate: '',
      remark: '',
      approvalStatus: 'Pending',
      approvedOn: '',
      approvedBy: '',
    })
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedLeave(null)
  }

  // CRUD operations
  const handleAddLeave = () => {
    if (!addForm.employeeId || !addForm.leaveDate) return

    const employee = employees.find(emp => emp.id == addForm.employeeId)
    const newId = leaves.length > 0 ? Math.max(...leaves.map(l => l.id)) + 1 : 1

    const newLeave = {
      id: newId,
      employeeId: Number(addForm.employeeId),
      employeeName: employee?.name || '',
      leaveDate: addForm.leaveDate,
      remark: addForm.remark,
      approvalStatus: addForm.approvalStatus,
      approvedOn: addForm.approvedOn,
      approvedBy: addForm.approvedBy,
    }

    setLeaves(prev => [...prev, newLeave])
    closeModal()
  }

  const handleSaveEdit = (updatedData) => {
    setLeaves(prev =>
      prev.map(leave =>
        leave.id === selectedLeave.id
          ? {
              ...leave,
              employeeId: updatedData.employeeId,
              employeeName: employees.find(emp => emp.id == updatedData.employeeId)?.name || leave.employeeName,
              leaveDate: updatedData.leaveDate,
              remark: updatedData.remark,
              approvalStatus: updatedData.approvalStatus,
              approvedOn: updatedData.approvedOn,
              approvedBy: updatedData.approvedBy,
            }
          : leave
      )
    )
  }

  const handleConfirmDelete = () => {
    setLeaves(prev => prev.filter(l => l.id !== selectedLeave.id))
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

  // Approval status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'Rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      default:
        return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400'
    }
  }

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 110px)" }}>
      {/* HEADER */}
      <Header
        title="Leave Management"
        subtitle="Manage employee leave requests and approvals"
        addLabel="Add Leave"
        onAdd={handleAddClick}
        dropdownOptions={[
          { label: 'Import from Excel', onClick: handleImportExcel },
          { label: 'Export to Excel', onClick: handleExportExcel },
          { label: 'Download Format', onClick: handleDownloadFormat },
        ]}
      />

      {/* Table using CommonTable component */}
      <CommonTable
        data={currentLeaves.map(leave => ({
          id: leave.id,
          employeeName: leave.employeeName,
          leaveDate: new Date(leave.leaveDate).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          }),
          remark: leave.remark || '-',
          approvalStatus: (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(leave.approvalStatus)}`}>
              {leave.approvalStatus}
            </span>
          ),
          approvedOn: leave.approvedOn ? new Date(leave.approvedOn).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          }) : '-',
          approvedBy: leave.approvedBy || '-',
          raw: leave,
        }))}
        emptyMessage="No leave records found. Click 'Add Leave' to create one."
        minWidth="1400px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '80px' },
          { key: 'employeeName', label: 'Employee Name', width: '180px' },
          { key: 'leaveDate', label: 'Leave Date', width: '130px' },
          { key: 'remark', label: 'Remark', width: '220px' },
          { key: 'approvalStatus', label: 'Approval Status', width: '150px' },
          { key: 'approvedOn', label: 'Approved On', width: '130px' },
          { key: 'approvedBy', label: 'Approved By', width: '150px' },
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
      {/* ALERT MODALS */}
      {/* ================================================================== */}

      {/* ADD - Custom Alert with better layout */}
      {activeModal === 'add' && (
        <Alert open={true} onClose={closeModal} size="4xl" className="sm:my-16">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-white dark:bg-zinc-900 pb-2 border-b border-zinc-200 dark:border-zinc-700">
            <AlertTitle>Add New Leave</AlertTitle>
            <AlertDescription>Enter the leave details below</AlertDescription>
          </div>

          {/* Scrollable Form Body */}
          <AlertBody>
            <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4
              [&::-webkit-scrollbar]:w-2
              [&::-webkit-scrollbar-track]:bg-zinc-100
              dark:[&::-webkit-scrollbar-track]:bg-zinc-800
              [&::-webkit-scrollbar-thumb]:bg-zinc-300
              dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600
              [&::-webkit-scrollbar-thumb]:rounded-full">
              
              {/* Row 1: Employee and Leave Date */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Employee *
                  </label>
                  <select
                    value={addForm.employeeId}
                    onChange={(e) => setAddForm({...addForm, employeeId: e.target.value})}
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="">Select Employee</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} ({emp.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Leave Date *
                  </label>
                  <input
                    type="date"
                    value={addForm.leaveDate}
                    onChange={(e) => setAddForm({...addForm, leaveDate: e.target.value})}
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              {/* Row 2: Remark */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Remark
                </label>
                <textarea
                  value={addForm.remark}
                  onChange={(e) => setAddForm({...addForm, remark: e.target.value})}
                  rows={3}
                  placeholder="Enter leave reason"
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                />
              </div>

              {/* Approval Details Section */}
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700">
                <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-3">Approval Details</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Approval Status
                    </label>
                    <select
                      value={addForm.approvalStatus}
                      onChange={(e) => setAddForm({...addForm, approvalStatus: e.target.value})}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    >
                      {approvalStatuses.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Approved On
                    </label>
                    <input
                      type="date"
                      value={addForm.approvedOn}
                      onChange={(e) => setAddForm({...addForm, approvedOn: e.target.value})}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>

                <div className="mt-3 space-y-1.5">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Approved By
                  </label>
                  <input
                    type="text"
                    value={addForm.approvedBy}
                    onChange={(e) => setAddForm({...addForm, approvedBy: e.target.value})}
                    placeholder="Enter approver name"
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>
            </div>
          </AlertBody>

          {/* Sticky Footer */}
          <AlertActions>
            <Button plain onClick={closeModal}>Cancel</Button>
            <Button color="dark/zinc" onClick={handleAddLeave}>
              Add Leave
            </Button>
          </AlertActions>
        </Alert>
      )}

      {selectedLeave && (
        <>
          {/* VIEW */}
          {activeModal === 'view' && (
            <Alert open={true} onClose={closeModal}>
              <AlertTitle>Leave Details</AlertTitle>
              <AlertDescription>View the leave request details below</AlertDescription>
              <AlertBody>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">ID:</span>
                    <span className="text-zinc-600 dark:text-zinc-400">{selectedLeave.id}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">Employee Name:</span>
                    <span className="text-zinc-600 dark:text-zinc-400">{selectedLeave.employeeName}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">Leave Date:</span>
                    <span className="text-zinc-600 dark:text-zinc-400">{new Date(selectedLeave.leaveDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">Remark:</span>
                    <span className="text-zinc-600 dark:text-zinc-400">{selectedLeave.remark || 'N/A'}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">Approval Status:</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedLeave.approvalStatus)}`}>
                      {selectedLeave.approvalStatus}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">Approved On:</span>
                    <span className="text-zinc-600 dark:text-zinc-400">{selectedLeave.approvedOn ? new Date(selectedLeave.approvedOn).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">Approved By:</span>
                    <span className="text-zinc-600 dark:text-zinc-400">{selectedLeave.approvedBy || 'N/A'}</span>
                  </div>
                </div>
              </AlertBody>
              <AlertActions>
                <Button color="dark/zinc" onClick={closeModal}>Close</Button>
              </AlertActions>
            </Alert>
          )}

          {/* EDIT - Custom Alert matching Add design */}
          {activeModal === 'edit' && (
            <Alert open={true} onClose={closeModal} size="4xl" className="sm:my-16">
              {/* Sticky Header */}
              <div className="sticky top-0 z-10 bg-white dark:bg-zinc-900 pb-2 border-b border-zinc-200 dark:border-zinc-700">
                <AlertTitle>Edit Leave</AlertTitle>
                <AlertDescription>Update the leave details below</AlertDescription>
              </div>

              {/* Scrollable Form Body */}
              <AlertBody>
                <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4
                  [&::-webkit-scrollbar]:w-2
                  [&::-webkit-scrollbar-track]:bg-zinc-100
                  dark:[&::-webkit-scrollbar-track]:bg-zinc-800
                  [&::-webkit-scrollbar-thumb]:bg-zinc-300
                  dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600
                  [&::-webkit-scrollbar-thumb]:rounded-full">
                  
                  {/* Row 1: Employee and Leave Date */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Employee *
                      </label>
                      <select
                        value={selectedLeave.employeeId}
                        onChange={(e) => setSelectedLeave({...selectedLeave, employeeId: Number(e.target.value), employeeName: employees.find(emp => emp.id == e.target.value)?.name || selectedLeave.employeeName})}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                      >
                        <option value="">Select Employee</option>
                        {employees.map((emp) => (
                          <option key={emp.id} value={emp.id}>
                            {emp.name} ({emp.code})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Leave Date *
                      </label>
                      <input
                        type="date"
                        value={selectedLeave.leaveDate}
                        onChange={(e) => setSelectedLeave({...selectedLeave, leaveDate: e.target.value})}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                      />
                    </div>
                  </div>

                  {/* Row 2: Remark */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Remark
                    </label>
                    <textarea
                      value={selectedLeave.remark}
                      onChange={(e) => setSelectedLeave({...selectedLeave, remark: e.target.value})}
                      rows={3}
                      placeholder="Enter leave reason"
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  {/* Approval Details Section */}
                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700">
                    <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-3">Approval Details</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Approval Status
                        </label>
                        <select
                          value={selectedLeave.approvalStatus}
                          onChange={(e) => setSelectedLeave({...selectedLeave, approvalStatus: e.target.value})}
                          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        >
                          {approvalStatuses.map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Approved On
                        </label>
                        <input
                          type="date"
                          value={selectedLeave.approvedOn || ''}
                          onChange={(e) => setSelectedLeave({...selectedLeave, approvedOn: e.target.value})}
                          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        />
                      </div>
                    </div>

                    <div className="mt-3 space-y-1.5">
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Approved By
                      </label>
                      <input
                        type="text"
                        value={selectedLeave.approvedBy || ''}
                        onChange={(e) => setSelectedLeave({...selectedLeave, approvedBy: e.target.value})}
                        placeholder="Enter approver name"
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                      />
                    </div>
                  </div>
                </div>
              </AlertBody>

              {/* Sticky Footer */}
              <AlertActions>
                <Button plain onClick={closeModal}>Cancel</Button>
                <Button color="dark/zinc" onClick={() => {
                  handleSaveEdit({
                    employeeId: selectedLeave.employeeId,
                    leaveDate: selectedLeave.leaveDate,
                    remark: selectedLeave.remark,
                    approvalStatus: selectedLeave.approvalStatus,
                    approvedOn: selectedLeave.approvedOn,
                    approvedBy: selectedLeave.approvedBy,
                  })
                  closeModal()
                }}>
                  Save Changes
                </Button>
              </AlertActions>
            </Alert>
          )}

          {/* DELETE */}
          {activeModal === 'delete' && (
            <Alert open={true} onClose={closeModal}>
              <AlertTitle>Are you sure you want to delete this leave?</AlertTitle>
              <AlertDescription>
                You are about to delete leave request for <strong className="text-zinc-900 dark:text-white">{selectedLeave.employeeName}</strong> on {new Date(selectedLeave.leaveDate).toLocaleDateString()}. This action cannot be undone.
              </AlertDescription>
              <AlertActions>
                <Button plain onClick={closeModal}>Cancel</Button>
                <Button color="red" onClick={() => { handleConfirmDelete(); closeModal(); }}>
                  Yes, Delete
                </Button>
              </AlertActions>
            </Alert>
          )}
        </>
      )}
    </div>
  )
}
