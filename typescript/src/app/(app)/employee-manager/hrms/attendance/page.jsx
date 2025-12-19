'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/input'
import { Avatar } from '@/components/avatar'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import Actions from '../../../employee-manager/common/components/Actions.jsx'
import Header from '../../../employee-manager/common/components/Header.jsx'
import CommonTable from '../../../employee-manager/common/components/Table.jsx'
import CommonPagination from '../../../employee-manager/common/components/Pagination.jsx'


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

// Sample attendance data
const initialAttendance = [
  {
    id: 1,
    attendanceDate: '2024-12-14',
    employeeId: 1,
    employeeName: 'John Smith',
    employeeCode: 'EMP001',
    checkinDate: '2024-12-14 09:00:00',
    checkinLocation: 'Office Main Gate',
    checkinImage: '/users/1.jpg',
    checkoutDate: '2024-12-14 18:00:00',
    checkoutLocation: 'Office Main Gate',
    checkoutImage: '/users/1.jpg',
  },
  {
    id: 2,
    attendanceDate: '2024-12-14',
    employeeId: 2,
    employeeName: 'Sarah Johnson',
    employeeCode: 'EMP002',
    checkinDate: '2024-12-14 09:15:00',
    checkinLocation: 'Office Reception',
    checkinImage: '/users/2.jpg',
    checkoutDate: '2024-12-14 18:30:00',
    checkoutLocation: 'Office Reception',
    checkoutImage: '/users/2.jpg',
  },
  {
    id: 3,
    attendanceDate: '2024-12-14',
    employeeId: 3,
    employeeName: 'Michael Brown',
    employeeCode: 'EMP003',
    checkinDate: '2024-12-14 08:45:00',
    checkinLocation: 'Building A Entrance',
    checkinImage: '/users/3.jpg',
    checkoutDate: '2024-12-14 17:45:00',
    checkoutLocation: 'Building A Entrance',
    checkoutImage: '/users/3.jpg',
  },
  {
    id: 4,
    attendanceDate: '2024-12-13',
    employeeId: 4,
    employeeName: 'Emily Davis',
    employeeCode: 'EMP004',
    checkinDate: '2024-12-13 09:30:00',
    checkinLocation: 'Office Main Gate',
    checkinImage: '/users/4.jpg',
    checkoutDate: '2024-12-13 18:15:00',
    checkoutLocation: 'Office Main Gate',
    checkoutImage: '/users/4.jpg',
  },
  {
    id: 5,
    attendanceDate: '2024-12-13',
    employeeId: 5,
    employeeName: 'David Wilson',
    employeeCode: 'EMP005',
    checkinDate: '2024-12-13 09:05:00',
    checkinLocation: 'Building B Entrance',
    checkinImage: '/users/5.jpg',
    checkoutDate: '2024-12-13 18:00:00',
    checkoutLocation: 'Building B Entrance',
    checkoutImage: '/users/5.jpg',
  },
  {
    id: 6,
    attendanceDate: '2024-12-13',
    employeeId: 6,
    employeeName: 'Lisa Anderson',
    employeeCode: 'EMP006',
    checkinDate: '2024-12-13 08:50:00',
    checkinLocation: 'Office Reception',
    checkinImage: '/users/6.jpg',
    checkoutDate: '2024-12-13 17:50:00',
    checkoutLocation: 'Office Reception',
    checkoutImage: '/users/6.jpg',
  },
  {
    id: 7,
    attendanceDate: '2024-12-12',
    employeeId: 7,
    employeeName: 'Robert Martinez',
    employeeCode: 'EMP007',
    checkinDate: '2024-12-12 09:20:00',
    checkinLocation: 'Office Main Gate',
    checkinImage: '/users/7.jpg',
    checkoutDate: '2024-12-12 18:10:00',
    checkoutLocation: 'Office Main Gate',
    checkoutImage: '/users/7.jpg',
  },
  {
    id: 8,
    attendanceDate: '2024-12-12',
    employeeId: 8,
    employeeName: 'Jennifer Taylor',
    employeeCode: 'EMP008',
    checkinDate: '2024-12-12 09:10:00',
    checkinLocation: 'Building A Entrance',
    checkinImage: '/users/8.jpg',
    checkoutDate: '2024-12-12 18:05:00',
    checkoutLocation: 'Building A Entrance',
    checkoutImage: '/users/8.jpg',
  },
  {
    id: 9,
    attendanceDate: '2024-12-12',
    employeeId: 1,
    employeeName: 'John Smith',
    employeeCode: 'EMP001',
    checkinDate: '2024-12-12 08:55:00',
    checkinLocation: 'Office Main Gate',
    checkinImage: '/users/1.jpg',
    checkoutDate: '2024-12-12 17:55:00',
    checkoutLocation: 'Office Main Gate',
    checkoutImage: '/users/1.jpg',
  },
  {
    id: 10,
    attendanceDate: '2024-12-11',
    employeeId: 2,
    employeeName: 'Sarah Johnson',
    employeeCode: 'EMP002',
    checkinDate: '2024-12-11 09:25:00',
    checkinLocation: 'Office Reception',
    checkinImage: '/users/2.jpg',
    checkoutDate: '2024-12-11 18:20:00',
    checkoutLocation: 'Office Reception',
    checkoutImage: '/users/2.jpg',
  },
  {
    id: 11,
    attendanceDate: '2024-12-11',
    employeeId: 3,
    employeeName: 'Michael Brown',
    employeeCode: 'EMP003',
    checkinDate: '2024-12-11 08:40:00',
    checkinLocation: 'Building A Entrance',
    checkinImage: '/users/3.jpg',
    checkoutDate: '2024-12-11 17:40:00',
    checkoutLocation: 'Building A Entrance',
    checkoutImage: '/users/3.jpg',
  },
  {
    id: 12,
    attendanceDate: '2024-12-11',
    employeeId: 4,
    employeeName: 'Emily Davis',
    employeeCode: 'EMP004',
    checkinDate: '2024-12-11 09:35:00',
    checkinLocation: 'Office Main Gate',
    checkinImage: '/users/4.jpg',
    checkoutDate: '2024-12-11 18:25:00',
    checkoutLocation: 'Office Main Gate',
    checkoutImage: '/users/4.jpg',
  },
]

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function AttendancePage() {
  // State management for the lists
  const [attendance, setAttendance] = useState(initialAttendance)
  const [employees] = useState(initialEmployees)

  // Modal state management
  const [activeModal, setActiveModal] = useState(null)
  const [selectedAttendance, setSelectedAttendance] = useState(null)
  
  // Form state for Add modal
  const [addForm, setAddForm] = useState({
    employeeId: '',
    attendanceDate: '',
    checkinDate: '',
    checkinLocation: '',
    checkinImage: '',
    checkoutDate: '',
    checkoutLocation: '',
    checkoutImage: '',
  })

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(attendance.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentAttendance = attendance.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // ========================================================================
  // ACTION HANDLERS
  // ========================================================================

  const handleView = (record) => {
    setSelectedAttendance(record)
    setActiveModal('view')
  }

  const handleEdit = (record) => {
    setSelectedAttendance(record)
    setActiveModal('edit')
  }

  const handleDelete = (record) => {
    setSelectedAttendance(record)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setActiveModal('add')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedAttendance(null)
    // Reset add form
    setAddForm({
      employeeId: '',
      attendanceDate: '',
      checkinDate: '',
      checkinLocation: '',
      checkinImage: '',
      checkoutDate: '',
      checkoutLocation: '',
      checkoutImage: '',
    })
  }

  // ========================================================================
  // CRUD HANDLERS - Ready for backend integration
  // ========================================================================

  const handleAddAttendance = (form) => {
    const newId = attendance.length > 0 ? Math.max(...attendance.map(a => a.id)) + 1 : 1
    const employee = employees.find(e => e.id == form.employeeId)

    setAttendance(prev => [
      ...prev,
      {
        id: newId,
        attendanceDate: form.attendanceDate,
        employeeId: Number(form.employeeId),
        employeeName: employee?.name || '',
        employeeCode: employee?.code || '',
        checkinDate: form.checkinDate,
        checkinLocation: form.checkinLocation,
        checkinImage: form.checkinImage || '/users/1.jpg',
        checkoutDate: form.checkoutDate,
        checkoutLocation: form.checkoutLocation,
        checkoutImage: form.checkoutImage || '/users/1.jpg',
      }
    ])
  }

  const handleSaveEdit = (updated) => {
    setAttendance(prev =>
      prev.map(a =>
        a.id === selectedAttendance.id
          ? {
              ...a,
              attendanceDate: updated.attendanceDate,
              employeeId: Number(updated.employeeId),
              employeeName: employees.find(e => e.id == updated.employeeId)?.name || a.employeeName,
              employeeCode: employees.find(e => e.id == updated.employeeId)?.code || a.employeeCode,
              checkinDate: updated.checkinDate,
              checkinLocation: updated.checkinLocation,
              checkinImage: updated.checkinImage || a.checkinImage,
              checkoutDate: updated.checkoutDate,
              checkoutLocation: updated.checkoutLocation,
              checkoutImage: updated.checkoutImage || a.checkoutImage,
            }
          : a
      )
    )
  }

  const handleConfirmDelete = () => {
    setAttendance(prev => prev.filter(a => a.id !== selectedAttendance.id))
  }

  // Import/Export handlers
  const handleImportExcel = () => {
    console.log('Import from Excel clicked')
    // TODO: Implement file upload logic
  }

  const handleExportExcel = () => {
    console.log('Export to Excel clicked')
    // TODO: Implement export logic
  }

  const handleDownloadFormat = () => {
    console.log('Download Format clicked')
    // TODO: Implement format download logic
  }

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 110px)" }}>

      {/* HEADER */}
      <Header
        title="Attendance"
        subtitle="Manage employee attendance records"
        addLabel="Add Attendance"
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
        data={currentAttendance.map(record => ({
          id: record.id,
          attendanceDate: new Date(record.attendanceDate).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          }),
          employeeName: record.employeeName,
          employeeCode: record.employeeCode,
          checkinDate: new Date(record.checkinDate).toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          checkinLocation: record.checkinLocation,
          checkinImage: <Avatar src={record.checkinImage} className="size-6" />,
          checkoutDate: record.checkoutDate ? new Date(record.checkoutDate).toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
          }) : '-',
          checkoutLocation: record.checkoutLocation || '-',
          checkoutImage: record.checkoutImage ? <Avatar src={record.checkoutImage} className="size-6" /> : <span className="text-zinc-400">-</span>,
          raw: record,
        }))}
        emptyMessage="No attendance records found. Click 'Add Attendance' to create one."
        minWidth="1500px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '80px' },
          { key: 'attendanceDate', label: 'Date', width: '130px' },
          { key: 'employeeName', label: 'Employee Name', width: '160px' },
          { key: 'employeeCode', label: 'Code', width: '110px' },
          { key: 'checkinDate', label: 'Check In', width: '160px' },
          { key: 'checkinLocation', label: 'In Location', width: '160px' },
          { key: 'checkinImage', label: 'In Image', width: '90px' },
          { key: 'checkoutDate', label: 'Check Out', width: '160px' },
          { key: 'checkoutLocation', label: 'Out Location', width: '160px' },
          { key: 'checkoutImage', label: 'Out Image', width: '90px' },
        ]}
        renderActions={(row) => (
          <Actions
            onView={() => handleView(row.raw)}
            onEdit={() => handleEdit(row.raw)}
            onDelete={() => handleDelete(row.raw)}
          />
        )}
        />

        {/* Pagination using CommonPagination component */}
          <CommonPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        
      </div>

      {/* ================================================================== */}
      {/* ALERT MODALS */}
      {/* ================================================================== */}

      {/* ADD - Custom Alert with better layout */}
      {activeModal === 'add' && (
        <Alert open={true} onClose={closeModal} size="4xl" className="sm:my-16">\n          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-white dark:bg-zinc-900 pb-2 border-b border-zinc-200 dark:border-zinc-700">
            <AlertTitle>Add New Attendance</AlertTitle>
            <AlertDescription>Enter the attendance details below</AlertDescription>
          </div>

          {/* Scrollable Form Body */}
          <AlertBody>
            <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4
              [&::-webkit-scrollbar]:w-2
              [&::-webkit-scrollbar-track]:bg-zinc-100
              dark:[&::-webkit-scrollbar-track]:bg-zinc-800
              [&::-wvalue={addForm.employeeId}
                    onChange={(e) => setAddForm({...addForm, employeeId: e.target.value})}
                    ebkit-scrollbar-thumb]:bg-zinc-300
              dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600
              [&::-webkit-scrollbar-thumb]:rounded-full">
              
              {/* Row 1: Employee and Date */}
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
                    Attendance Date *
                  </label>
                  <input
                    type="date"
                    value={addForm.attendanceDate}
                    onChange={(e) => setAddForm({...addForm, attendanceDate: e.target.value})}
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              {/* Check In Section */}
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700">
                <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-3">Check In Details</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Check In Time *
                    </label>
                    <input
                      type="datetime-local"
                      value={addForm.checkinDate}
                      onChange={(e) => setAddForm({...addForm, checkinDate: e.target.value})}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Check In Location *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Office Main Gate"
                      value={addForm.checkinLocation}
                      onChange={(e) => setAddForm({...addForm, checkinLocation: e.target.value})}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>

                <div className="mt-3 space-y-1.5">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Check In Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onload = (event) => {
                          setAddForm({...addForm, checkinImage: event.target?.result})
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 dark:file:bg-zinc-700 dark:file:text-zinc-200 dark:hover:file:bg-zinc-600"
                  />
                </div>
              </div>

              {/* Check Out Section */}
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700">
                <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-3">Check Out Details</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Check Out Time
                    </label>
                    <input
                      type="datetime-local"
                      value={addForm.checkoutDate}
                      onChange={(e) => setAddForm({...addForm, checkoutDate: e.target.value})}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Check Out Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Office Main Gate"
                      value={addForm.checkoutLocation}
                      onChange={(e) => setAddForm({...addForm, checkoutLocation: e.target.value})}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>

                <div className="mt-3 space-y-1.5">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Check Out Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onload = (event) => {
                          setAddForm({...addForm, checkoutImage: event.target?.result})
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 dark:file:bg-zinc-700 dark:file:text-zinc-200 dark:hover:file:bg-zinc-600"
                  />
                </div>
              </div>
            </div>
          </AlertBody>

          {/* Sticky Footer */}
          <AlertActions>
            <Button plain onClick={closeModal}>Cancel</Button>
            <Button color="dark/zinc" onClick={() => {
              handleAddAttendance(addForm)
              closeModal()
            }}>
              Add Attendance
            </Button>
          </AlertActions>
        </Alert>
      )}

      {selectedAttendance && (
        <>
          {/* VIEW */}
          <ViewAlert
            isOpen={activeModal === 'view'}
            onClose={closeModal}
            title="Attendance Details"
            message="View the attendance record details below"
            fields={{
              ID: selectedAttendance.id,
              'Attendance Date': new Date(selectedAttendance.attendanceDate).toLocaleDateString(),
              'Employee Name': selectedAttendance.employeeName,
              'Employee Code': selectedAttendance.employeeCode,
              'Check In': new Date(selectedAttendance.checkinDate).toLocaleString(),
              'Check In Location': selectedAttendance.checkinLocation,
              'Check In Image': selectedAttendance.checkinImage,
              'Check Out': selectedAttendance.checkoutDate ? new Date(selectedAttendance.checkoutDate).toLocaleString() : 'N/A',
              'Check Out Location': selectedAttendance.checkoutLocation || 'N/A',
              'Check Out Image': selectedAttendance.checkoutImage || 'N/A',
            }}
          />

          {/* EDIT - Custom Alert matching Add design */}
          {activeModal === 'edit' && (
            <Alert open={true} onClose={closeModal} size="4xl" className="sm:my-16">
              {/* Sticky Header */}
              <div className="sticky top-0 z-10 bg-white dark:bg-zinc-900 pb-2 border-b border-zinc-200 dark:border-zinc-700">
                <AlertTitle>Edit Attendance</AlertTitle>
                <AlertDescription>Update the attendance details below</AlertDescription>
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
                  
                  {/* Row 1: Employee and Date */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Employee *
                      </label>
                      <select
                        value={selectedAttendance.employeeId}
                        onChange={(e) => setSelectedAttendance({...selectedAttendance, employeeId: Number(e.target.value), employeeName: employees.find(emp => emp.id == e.target.value)?.name || selectedAttendance.employeeName, employeeCode: employees.find(emp => emp.id == e.target.value)?.code || selectedAttendance.employeeCode})}
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
                        Attendance Date *
                      </label>
                      <input
                        type="date"
                        value={selectedAttendance.attendanceDate}
                        onChange={(e) => setSelectedAttendance({...selectedAttendance, attendanceDate: e.target.value})}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                      />
                    </div>
                  </div>

                  {/* Check In Section */}
                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700">
                    <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-3">Check In Details</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Check In Time *
                        </label>
                        <input
                          type="datetime-local"
                          value={selectedAttendance.checkinDate.replace(' ', 'T').substring(0, 16)}
                          onChange={(e) => setSelectedAttendance({...selectedAttendance, checkinDate: e.target.value.replace('T', ' ') + ':00'})}
                          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Check In Location *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Office Main Gate"
                          value={selectedAttendance.checkinLocation}
                          onChange={(e) => setSelectedAttendance({...selectedAttendance, checkinLocation: e.target.value})}
                          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        />
                      </div>
                    </div>

                    <div className="mt-3 space-y-1.5">
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Check In Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onload = (event) => {
                              setSelectedAttendance({...selectedAttendance, checkinImage: event.target?.result})
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 dark:file:bg-zinc-700 dark:file:text-zinc-200 dark:hover:file:bg-zinc-600"
                      />
                      {selectedAttendance.checkinImage && (
                        <div className="mt-2">
                          <img src={selectedAttendance.checkinImage} alt="Check In" className="h-16 w-16 object-cover rounded" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Check Out Section */}
                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700">
                    <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-3">Check Out Details</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Check Out Time
                        </label>
                        <input
                          type="datetime-local"
                          value={selectedAttendance.checkoutDate ? selectedAttendance.checkoutDate.replace(' ', 'T').substring(0, 16) : ''}
                          onChange={(e) => setSelectedAttendance({...selectedAttendance, checkoutDate: e.target.value ? e.target.value.replace('T', ' ') + ':00' : ''})}
                          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Check Out Location
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Office Main Gate"
                          value={selectedAttendance.checkoutLocation || ''}
                          onChange={(e) => setSelectedAttendance({...selectedAttendance, checkoutLocation: e.target.value})}
                          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        />
                      </div>
                    </div>

                    <div className="mt-3 space-y-1.5">
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Check Out Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onload = (event) => {
                              setSelectedAttendance({...selectedAttendance, checkoutImage: event.target?.result})
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 dark:file:bg-zinc-700 dark:file:text-zinc-200 dark:hover:file:bg-zinc-600"
                      />
                      {selectedAttendance.checkoutImage && (
                        <div className="mt-2">
                          <img src={selectedAttendance.checkoutImage} alt="Check Out" className="h-16 w-16 object-cover rounded" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </AlertBody>

              {/* Sticky Footer */}
              <AlertActions>
                <Button plain onClick={closeModal}>Cancel</Button>
                <Button color="dark/zinc" onClick={() => {
                  handleSaveEdit({
                    employeeId: selectedAttendance.employeeId,
                    attendanceDate: selectedAttendance.attendanceDate,
                    checkinDate: selectedAttendance.checkinDate,
                    checkinLocation: selectedAttendance.checkinLocation,
                    checkinImage: selectedAttendance.checkinImage,
                    checkoutDate: selectedAttendance.checkoutDate,
                    checkoutLocation: selectedAttendance.checkoutLocation,
                    checkoutImage: selectedAttendance.checkoutImage,
                  })
                  closeModal()
                }}>
                  Save Changes
                </Button>
              </AlertActions>
            </Alert>
          )}

          {/* DELETE */}
          <DeleteAlert
            isOpen={activeModal === 'delete'}
            onClose={closeModal}
            title="Delete Attendance?"
            message={`Do you really want to delete attendance record for ${selectedAttendance.employeeName} on ${new Date(selectedAttendance.attendanceDate).toLocaleDateString()}?`}
            onConfirm={handleConfirmDelete}
          />
        </>
      )}
    </div>
  )
}
