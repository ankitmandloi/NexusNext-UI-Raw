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

// Sample customer data for dropdown
const initialCustomers = [
  { id: 1, name: 'ABC Corporation', mobile: '+91-9876543210' },
  { id: 2, name: 'XYZ Enterprises', mobile: '+91-9876543211' },
  { id: 3, name: 'Tech Solutions Ltd', mobile: '+91-9876543212' },
  { id: 4, name: 'Global Trading Co', mobile: '+91-9876543213' },
  { id: 5, name: 'Smart Retail Store', mobile: '+91-9876543214' },
  { id: 6, name: 'Metro Wholesale', mobile: '+91-9876543215' },
  { id: 7, name: 'Prime Distributors', mobile: '+91-9876543216' },
  { id: 8, name: 'Elite Business Hub', mobile: '+91-9876543217' },
]

// Sample visit detail data
const initialVisitDetails = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'John Smith',
    customerId: 1,
    customerName: 'ABC Corporation',
    customerMobile: '+91-9876543210',
    checkinTime: '2024-12-14 10:30:00',
    checkinAddress: '123 Business Park, Sector 5, Mumbai',
    checkoutTime: '2024-12-14 11:45:00',
    checkoutAddress: '123 Business Park, Sector 5, Mumbai',
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: 'Sarah Johnson',
    customerId: 2,
    customerName: 'XYZ Enterprises',
    customerMobile: '+91-9876543211',
    checkinTime: '2024-12-14 09:15:00',
    checkinAddress: '456 Corporate Tower, Delhi',
    checkoutTime: '2024-12-14 10:30:00',
    checkoutAddress: '456 Corporate Tower, Delhi',
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: 'Michael Brown',
    customerId: 3,
    customerName: 'Tech Solutions Ltd',
    customerMobile: '+91-9876543212',
    checkinTime: '2024-12-14 11:00:00',
    checkinAddress: '789 Tech Hub, Bangalore',
    checkoutTime: '2024-12-14 12:15:00',
    checkoutAddress: '789 Tech Hub, Bangalore',
  },
  {
    id: 4,
    employeeId: 4,
    employeeName: 'Emily Davis',
    customerId: 4,
    customerName: 'Global Trading Co',
    customerMobile: '+91-9876543213',
    checkinTime: '2024-12-14 14:00:00',
    checkinAddress: '321 Trade Center, Hyderabad',
    checkoutTime: '2024-12-14 15:30:00',
    checkoutAddress: '321 Trade Center, Hyderabad',
  },
  {
    id: 5,
    employeeId: 5,
    employeeName: 'David Wilson',
    customerId: 5,
    customerName: 'Smart Retail Store',
    customerMobile: '+91-9876543214',
    checkinTime: '2024-12-14 10:00:00',
    checkinAddress: '654 Mall Road, Chennai',
    checkoutTime: '2024-12-14 11:00:00',
    checkoutAddress: '654 Mall Road, Chennai',
  },
  {
    id: 6,
    employeeId: 6,
    employeeName: 'Lisa Anderson',
    customerId: 6,
    customerName: 'Metro Wholesale',
    customerMobile: '+91-9876543215',
    checkinTime: '2024-12-14 13:30:00',
    checkinAddress: '987 Market Street, Pune',
    checkoutTime: '2024-12-14 14:45:00',
    checkoutAddress: '987 Market Street, Pune',
  },
  {
    id: 7,
    employeeId: 7,
    employeeName: 'Robert Martinez',
    customerId: 7,
    customerName: 'Prime Distributors',
    customerMobile: '+91-9876543216',
    checkinTime: '2024-12-14 09:45:00',
    checkinAddress: '147 Industrial Area, Ahmedabad',
    checkoutTime: '2024-12-14 11:15:00',
    checkoutAddress: '147 Industrial Area, Ahmedabad',
  },
  {
    id: 8,
    employeeId: 8,
    employeeName: 'Jennifer Taylor',
    customerId: 8,
    customerName: 'Elite Business Hub',
    customerMobile: '+91-9876543217',
    checkinTime: '2024-12-14 12:00:00',
    checkinAddress: '258 Business District, Kolkata',
    checkoutTime: '2024-12-14 13:30:00',
    checkoutAddress: '258 Business District, Kolkata',
  },
  {
    id: 9,
    employeeId: 1,
    employeeName: 'John Smith',
    customerId: 3,
    customerName: 'Tech Solutions Ltd',
    customerMobile: '+91-9876543212',
    checkinTime: '2024-12-13 15:00:00',
    checkinAddress: '789 Tech Hub, Bangalore',
    checkoutTime: '2024-12-13 16:30:00',
    checkoutAddress: '789 Tech Hub, Bangalore',
  },
  {
    id: 10,
    employeeId: 3,
    employeeName: 'Michael Brown',
    customerId: 1,
    customerName: 'ABC Corporation',
    customerMobile: '+91-9876543210',
    checkinTime: '2024-12-13 10:30:00',
    checkinAddress: '123 Business Park, Sector 5, Mumbai',
    checkoutTime: '2024-12-13 12:00:00',
    checkoutAddress: '123 Business Park, Sector 5, Mumbai',
  },
  {
    id: 11,
    employeeId: 5,
    employeeName: 'David Wilson',
    customerId: 4,
    customerName: 'Global Trading Co',
    customerMobile: '+91-9876543213',
    checkinTime: '2024-12-13 14:15:00',
    checkinAddress: '321 Trade Center, Hyderabad',
    checkoutTime: '2024-12-13 15:45:00',
    checkoutAddress: '321 Trade Center, Hyderabad',
  },
  {
    id: 12,
    employeeId: 2,
    employeeName: 'Sarah Johnson',
    customerId: 6,
    customerName: 'Metro Wholesale',
    customerMobile: '+91-9876543215',
    checkinTime: '2024-12-13 11:00:00',
    checkinAddress: '987 Market Street, Pune',
    checkoutTime: '2024-12-13 12:30:00',
    checkoutAddress: '987 Market Street, Pune',
  },
]

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function VisitDetailsPage() {
  const [visitDetails, setVisitDetails] = useState(initialVisitDetails)
  const [employees] = useState(initialEmployees)
  const [customers] = useState(initialCustomers)
  const [activeModal, setActiveModal] = useState(null)
  const [selectedVisit, setSelectedVisit] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Add form state
  const [addForm, setAddForm] = useState({
    employeeId: '',
    customerId: '',
    checkinTime: '',
    checkinAddress: '',
    checkoutTime: '',
    checkoutAddress: '',
  })

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(visitDetails.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentVisits = visitDetails.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page) => setCurrentPage(page)

  // Modal handlers
  const handleView = (visit) => {
    setSelectedVisit(visit)
    setActiveModal('view')
  }

  const handleEdit = (visit) => {
    setSelectedVisit(visit)
    setActiveModal('edit')
  }

  const handleDelete = (visit) => {
    setSelectedVisit(visit)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setActiveModal('add')
    setAddForm({
      employeeId: '',
      customerId: '',
      checkinTime: '',
      checkinAddress: '',
      checkoutTime: '',
      checkoutAddress: '',
    })
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedVisit(null)
  }

  // CRUD operations
  const handleAddVisit = () => {
    if (!addForm.employeeId || !addForm.customerId || !addForm.checkinTime) return

    const employee = employees.find(emp => emp.id == addForm.employeeId)
    const customer = customers.find(cust => cust.id == addForm.customerId)
    const newId = visitDetails.length > 0 ? Math.max(...visitDetails.map(v => v.id)) + 1 : 1

    const newVisit = {
      id: newId,
      employeeId: Number(addForm.employeeId),
      employeeName: employee?.name || '',
      customerId: Number(addForm.customerId),
      customerName: customer?.name || '',
      customerMobile: customer?.mobile || '',
      checkinTime: addForm.checkinTime,
      checkinAddress: addForm.checkinAddress,
      checkoutTime: addForm.checkoutTime,
      checkoutAddress: addForm.checkoutAddress,
    }

    setVisitDetails(prev => [...prev, newVisit])
    closeModal()
  }

  const handleSaveEdit = (updatedData) => {
    const employee = employees.find(emp => emp.id == updatedData.employeeId)
    const customer = customers.find(cust => cust.id == updatedData.customerId)

    setVisitDetails(prev =>
      prev.map(visit =>
        visit.id === selectedVisit.id
          ? {
              ...visit,
              employeeId: updatedData.employeeId,
              employeeName: employee?.name || visit.employeeName,
              customerId: updatedData.customerId,
              customerName: customer?.name || visit.customerName,
              customerMobile: customer?.mobile || visit.customerMobile,
              checkinTime: updatedData.checkinTime,
              checkinAddress: updatedData.checkinAddress,
              checkoutTime: updatedData.checkoutTime,
              checkoutAddress: updatedData.checkoutAddress,
            }
          : visit
      )
    )
  }

  const handleConfirmDelete = () => {
    setVisitDetails(prev => prev.filter(v => v.id !== selectedVisit.id))
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

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 110px)" }}>
      {/* HEADER */}
      <Header
        title="Visit Details"
        subtitle="Manage employee customer visit records"
        addLabel="Add Visit"
        onAdd={handleAddClick}
        dropdownOptions={[
          { label: 'Import from Excel', onClick: handleImportExcel },
          { label: 'Export to Excel', onClick: handleExportExcel },
          { label: 'Download Format', onClick: handleDownloadFormat },
        ]}
      />

      {/* Table using CommonTable component */}
      <CommonTable
        data={currentVisits.map(visit => ({
          id: visit.id,
          employeeId: `${visit.employeeName} (${employees.find(e => e.id === visit.employeeId)?.code || ''})`,
          customerId: visit.customerName,
          customerMobile: visit.customerMobile,
          checkinTime: new Date(visit.checkinTime).toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          checkinAddress: visit.checkinAddress,
          checkoutTime: visit.checkoutTime ? new Date(visit.checkoutTime).toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
          }) : '-',
          checkoutAddress: visit.checkoutAddress || '-',
          raw: visit,
        }))}
        emptyMessage="No visit records found. Click 'Add Visit' to create one."
        minWidth="1600px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '80px' },
          { key: 'employeeId', label: 'Employee ID', width: '180px' },
          { key: 'customerId', label: 'Customer ID', width: '180px' },
          { key: 'customerMobile', label: 'Customer Mobile', width: '150px' },
          { key: 'checkinTime', label: 'Visit Checkin Time', width: '160px' },
          { key: 'checkinAddress', label: 'Checkin Address', width: '220px' },
          { key: 'checkoutTime', label: 'Checkout Time', width: '160px' },
          { key: 'checkoutAddress', label: 'Checkout Address', width: '220px' },
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
            <AlertTitle>Add New Visit</AlertTitle>
            <AlertDescription>Enter the visit details below</AlertDescription>
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
              
              {/* Row 1: Employee and Customer */}
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
                    Customer *
                  </label>
                  <select
                    value={addForm.customerId}
                    onChange={(e) => setAddForm({...addForm, customerId: e.target.value})}
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="">Select Customer</option>
                    {customers.map((cust) => (
                      <option key={cust.id} value={cust.id}>
                        {cust.name} ({cust.mobile})
                      </option>
                    ))}
                  </select>
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
                      value={addForm.checkinTime}
                      onChange={(e) => setAddForm({...addForm, checkinTime: e.target.value})}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Check In Address *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 123 Business Park, Mumbai"
                      value={addForm.checkinAddress}
                      onChange={(e) => setAddForm({...addForm, checkinAddress: e.target.value})}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
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
                      value={addForm.checkoutTime}
                      onChange={(e) => setAddForm({...addForm, checkoutTime: e.target.value})}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Check Out Address
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 123 Business Park, Mumbai"
                      value={addForm.checkoutAddress}
                      onChange={(e) => setAddForm({...addForm, checkoutAddress: e.target.value})}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </AlertBody>

          {/* Sticky Footer */}
          <AlertActions>
            <Button plain onClick={closeModal}>Cancel</Button>
            <Button color="dark/zinc" onClick={handleAddVisit}>
              Add Visit
            </Button>
          </AlertActions>
        </Alert>
      )}

      {selectedVisit && (
        <>
          {/* VIEW */}
          {activeModal === 'view' && (
            <Alert open={true} onClose={closeModal}>
              <AlertTitle>Visit Details</AlertTitle>
              <AlertDescription>View the visit record details below</AlertDescription>
              <AlertBody>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">ID:</span>
                    <span className="text-zinc-600 dark:text-zinc-400">{selectedVisit.id}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">Employee:</span>
                    <span className="text-zinc-600 dark:text-zinc-400">{selectedVisit.employeeName}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">Customer:</span>
                    <span className="text-zinc-600 dark:text-zinc-400">{selectedVisit.customerName}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">Customer Mobile:</span>
                    <span className="text-zinc-600 dark:text-zinc-400">{selectedVisit.customerMobile}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">Check In Time:</span>
                    <span className="text-zinc-600 dark:text-zinc-400">{new Date(selectedVisit.checkinTime).toLocaleString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">Check In Address:</span>
                    <span className="text-zinc-600 dark:text-zinc-400">{selectedVisit.checkinAddress}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">Check Out Time:</span>
                    <span className="text-zinc-600 dark:text-zinc-400">{selectedVisit.checkoutTime ? new Date(selectedVisit.checkoutTime).toLocaleString() : 'N/A'}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">Check Out Address:</span>
                    <span className="text-zinc-600 dark:text-zinc-400">{selectedVisit.checkoutAddress || 'N/A'}</span>
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
                <AlertTitle>Edit Visit</AlertTitle>
                <AlertDescription>Update the visit details below</AlertDescription>
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
                  
                  {/* Row 1: Employee and Customer */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Employee *
                      </label>
                      <select
                        value={selectedVisit.employeeId}
                        onChange={(e) => setSelectedVisit({...selectedVisit, employeeId: Number(e.target.value), employeeName: employees.find(emp => emp.id == e.target.value)?.name || selectedVisit.employeeName})}
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
                        Customer *
                      </label>
                      <select
                        value={selectedVisit.customerId}
                        onChange={(e) => {
                          const customer = customers.find(c => c.id == e.target.value)
                          setSelectedVisit({
                            ...selectedVisit, 
                            customerId: Number(e.target.value), 
                            customerName: customer?.name || selectedVisit.customerName,
                            customerMobile: customer?.mobile || selectedVisit.customerMobile
                          })
                        }}
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                      >
                        <option value="">Select Customer</option>
                        {customers.map((cust) => (
                          <option key={cust.id} value={cust.id}>
                            {cust.name} ({cust.mobile})
                          </option>
                        ))}
                      </select>
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
                          value={selectedVisit.checkinTime.replace(' ', 'T').substring(0, 16)}
                          onChange={(e) => setSelectedVisit({...selectedVisit, checkinTime: e.target.value.replace('T', ' ') + ':00'})}
                          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Check In Address *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 123 Business Park, Mumbai"
                          value={selectedVisit.checkinAddress}
                          onChange={(e) => setSelectedVisit({...selectedVisit, checkinAddress: e.target.value})}
                          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        />
                      </div>
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
                          value={selectedVisit.checkoutTime ? selectedVisit.checkoutTime.replace(' ', 'T').substring(0, 16) : ''}
                          onChange={(e) => setSelectedVisit({...selectedVisit, checkoutTime: e.target.value ? e.target.value.replace('T', ' ') + ':00' : ''})}
                          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Check Out Address
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 123 Business Park, Mumbai"
                          value={selectedVisit.checkoutAddress || ''}
                          onChange={(e) => setSelectedVisit({...selectedVisit, checkoutAddress: e.target.value})}
                          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AlertBody>

              {/* Sticky Footer */}
              <AlertActions>
                <Button plain onClick={closeModal}>Cancel</Button>
                <Button color="dark/zinc" onClick={() => {
                  handleSaveEdit({
                    employeeId: selectedVisit.employeeId,
                    customerId: selectedVisit.customerId,
                    checkinTime: selectedVisit.checkinTime,
                    checkinAddress: selectedVisit.checkinAddress,
                    checkoutTime: selectedVisit.checkoutTime,
                    checkoutAddress: selectedVisit.checkoutAddress,
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
              <AlertTitle>Are you sure you want to delete this visit?</AlertTitle>
              <AlertDescription>
                You are about to delete visit record for <strong className="text-zinc-900 dark:text-white">{selectedVisit.employeeName}</strong> to {selectedVisit.customerName}. This action cannot be undone.
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
