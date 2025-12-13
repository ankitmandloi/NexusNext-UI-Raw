'use client'

import { useState, useEffect } from 'react'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import Actions from '../common/components/Actions'
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/dropdown'
import CommonPagination from '../common/components/Pagination.jsx'

import { PlusIcon, ChevronDownIcon } from '@heroicons/react/16/solid'

// ============================================================================
// TYPES & INTERFACES (REMOVED FOR JSX)
// ============================================================================

// ModalType removed (was 'view' | 'edit' | 'delete' | 'add' | null)
const ITEMS_PER_PAGE = 10

// ============================================================================
// CUSTOM ICONS
// ============================================================================


// ============================================================================
// INITIAL DATA
// ============================================================================

const initialRegions = [
  { id: 1, name: 'North' },
  { id: 2, name: 'South' },
  { id: 3, name: 'East' },
  { id: 4, name: 'West' },
  { id: 5, name: 'Central' },
]

const initialEmployees = [
  { id: 1, name: 'Rahul Sharma' },
  { id: 2, name: 'Priya Patel' },
  { id: 3, name: 'Amit Kumar' },
  { id: 4, name: 'Sneha Gupta' },
  { id: 5, name: 'Vikram Singh' },
]

const initialAssignments = [
  { id: 1, regionId: 1, regionName: 'North', employeeId: 1, employeeName: 'Rahul Sharma' },
  { id: 2, regionId: 2, regionName: 'South', employeeId: 2, employeeName: 'Priya Patel' },
  { id: 3, regionId: 3, regionName: 'East', employeeId: 3, employeeName: 'Amit Kumar' },
  { id: 4, regionId: 4, regionName: 'West', employeeId: 4, employeeName: 'Sneha Gupta' },
  { id: 5, regionId: 5, regionName: 'Central', employeeId: 5, employeeName: 'Vikram Singh' },
  { id: 6, regionId: 1, regionName: 'North', employeeId: 3, employeeName: 'Amit Kumar' },
  { id: 7, regionId: 2, regionName: 'South', employeeId: 5, employeeName: 'Vikram Singh' },
  { id: 8, regionId: 3, regionName: 'East', employeeId: 1, employeeName: 'Rahul Sharma' },
  { id: 9, regionId: 4, regionName: 'West', employeeId: 2, employeeName: 'Priya Patel' },
  { id: 10, regionId: 5, regionName: 'Central', employeeId: 4, employeeName: 'Sneha Gupta' },
  { id: 11, regionId: 1, regionName: 'North', employeeId: 2, employeeName: 'Priya Patel' },
  { id: 12, regionId: 2, regionName: 'South', employeeId: 4, employeeName: 'Sneha Gupta' },
]

// ============================================================================
// ACTION BUTTON COMPONENT
// ============================================================================



// ============================================================================
// MODAL COMPONENTS
// ============================================================================

function ViewAssignmentAlert({ isOpen, onClose, assignment }) {
  if (!assignment) return null
  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Region Assignment Details</AlertTitle>
      <AlertDescription>View the details of the selected assignment below.</AlertDescription>
      <AlertBody>
        <div className="space-y-3">
          <div className="flex gap-2"><span className="font-medium text-zinc-700 dark:text-zinc-300">ID:</span><span className="text-zinc-600 dark:text-zinc-400">{assignment.id}</span></div>
          <div className="flex gap-2"><span className="font-medium text-zinc-700 dark:text-zinc-300">Region:</span><span className="text-zinc-600 dark:text-zinc-400">{assignment.regionName}</span></div>
          <div className="flex gap-2"><span className="font-medium text-zinc-700 dark:text-zinc-300">Employee:</span><span className="text-zinc-600 dark:text-zinc-400">{assignment.employeeName}</span></div>
        </div>
      </AlertBody>
      <AlertActions><Button color="dark/zinc" onClick={onClose}>Close</Button></AlertActions>
    </Alert>
  )
}

function EditAssignmentAlert({ isOpen, onClose, assignment, regions, employees, onSave }) {
  const [editedRegionId, setEditedRegionId] = useState(0)
  const [editedEmployeeId, setEditedEmployeeId] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (assignment && isOpen) {
      setEditedRegionId(assignment.regionId)
      setEditedEmployeeId(assignment.employeeId)
    }
  }, [assignment, isOpen])

  const handleSave = () => {
    if (!assignment || editedRegionId === 0 || editedEmployeeId === 0) return
    setIsSubmitting(true)
    const regionName = regions.find(r => r.id === editedRegionId)?.name || ''
    const employeeName = employees.find(e => e.id === editedEmployeeId)?.name || ''
    setTimeout(() => { onSave(assignment.id, editedRegionId, regionName, editedEmployeeId, employeeName); setIsSubmitting(false); onClose() }, 300)
  }

  const handleCancel = () => { setEditedRegionId(0); setEditedEmployeeId(0); onClose() }
  if (!assignment) return null

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Edit Region Assignment</AlertTitle>
      <AlertDescription>Update the assignment details below.</AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Region</label>
            <select value={editedRegionId} onChange={(e) => setEditedRegionId(parseInt(e.target.value))} className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value={0}>Select a region</option>
              {regions.map((r) => (<option key={r.id} value={r.id}>{r.name}</option>))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Employee</label>
            <select value={editedEmployeeId} onChange={(e) => setEditedEmployeeId(parseInt(e.target.value))} className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value={0}>Select an employee</option>
              {employees.map((e) => (<option key={e.id} value={e.id}>{e.name}</option>))}
            </select>
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>Cancel</Button>
        <Button color="dark/zinc" onClick={handleSave} disabled={editedRegionId === 0 || editedEmployeeId === 0 || isSubmitting}>{isSubmitting ? 'Saving...' : 'Save'}</Button>
      </AlertActions>
    </Alert>
  )
}

function AddAssignmentAlert({ isOpen, onClose, regions, employees, onAdd }) {
  const [selectedRegionId, setSelectedRegionId] = useState(0)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => { if (!isOpen) { setSelectedRegionId(0); setSelectedEmployeeId(0) } }, [isOpen])

  const handleAdd = () => {
    if (selectedRegionId === 0 || selectedEmployeeId === 0) return
    setIsSubmitting(true)
    const regionName = regions.find(r => r.id === selectedRegionId)?.name || ''
    const employeeName = employees.find(e => e.id === selectedEmployeeId)?.name || ''
    setTimeout(() => { onAdd(selectedRegionId, regionName, selectedEmployeeId, employeeName); setIsSubmitting(false); setSelectedRegionId(0); setSelectedEmployeeId(0); onClose() }, 300)
  }

  const handleCancel = () => { setSelectedRegionId(0); setSelectedEmployeeId(0); onClose() }

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Add New Region Assignment</AlertTitle>
      <AlertDescription>Assign an employee to a region.</AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Region</label>
            <select value={selectedRegionId} onChange={(e) => setSelectedRegionId(parseInt(e.target.value))} className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" autoFocus>
              <option value={0}>Select a region</option>
              {regions.map((r) => (<option key={r.id} value={r.id}>{r.name}</option>))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Employee</label>
            <select value={selectedEmployeeId} onChange={(e) => setSelectedEmployeeId(parseInt(e.target.value))} className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value={0}>Select an employee</option>
              {employees.map((e) => (<option key={e.id} value={e.id}>{e.name}</option>))}
            </select>
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>Cancel</Button>
        <Button color="dark/zinc" onClick={handleAdd} disabled={selectedRegionId === 0 || selectedEmployeeId === 0 || isSubmitting}>{isSubmitting ? 'Adding...' : 'Add'}</Button>
      </AlertActions>
    </Alert>
  )
}

function DeleteAssignmentAlert({ isOpen, onClose, assignment, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDelete = () => { if (!assignment) return; setIsDeleting(true); setTimeout(() => { onConfirm(assignment.id); setIsDeleting(false); onClose() }, 300) }
  if (!assignment) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Are you sure you want to delete this assignment?</AlertTitle>
      <AlertDescription>You are about to remove <strong className="text-zinc-900 dark:text-white">{assignment.employeeName}</strong> from <strong className="text-zinc-900 dark:text-white">{assignment.regionName}</strong> region. This action cannot be undone.</AlertDescription>
      <AlertActions>
        <Button plain onClick={onClose} disabled={isDeleting}>Cancel</Button>
        <Button color="red" onClick={handleDelete} disabled={isDeleting}>{isDeleting ? 'Deleting...' : 'Yes, Delete'}</Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function RegionAssignmentPage() {
  const [assignments, setAssignments] = useState(initialAssignments)
  const [regions] = useState(initialRegions)
  const [employees] = useState(initialEmployees)
  const [activeModal, setActiveModal] = useState(null)
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(assignments.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentAssignments = assignments.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page) => setCurrentPage(page)
  const handleView = (a) => { setSelectedAssignment(a); setActiveModal('view') }
  const handleEdit = (a) => { setSelectedAssignment(a); setActiveModal('edit') }
  const handleDelete = (a) => { setSelectedAssignment(a); setActiveModal('delete') }
  const handleAddClick = () => setActiveModal('add')
  const closeModal = () => { setActiveModal(null); setSelectedAssignment(null) }

  const handleImportExcel = () => console.log('Import from Excel clicked')
  const handleExportExcel = () => console.log('Export to Excel clicked')
  const handleDownloadFormat = () => console.log('Download Format clicked')

  const handleAddAssignment = (regionId, regionName, employeeId, employeeName) => {
    const newId = assignments.length > 0 ? Math.max(...assignments.map(a => a.id)) + 1 : 1
    setAssignments(prev => [...prev, { id: newId, regionId, regionName, employeeId, employeeName }])
  }

  const handleSaveEdit = (id, regionId, regionName, employeeId, employeeName) => {
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, regionId, regionName, employeeId, employeeName } : a))
  }

  const handleConfirmDelete = (id) => {
    setAssignments(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Region Assignment</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Manage employee-region assignments</div>
          </div>
          <div className="flex items-center gap-3">
            <Dropdown>
              <DropdownButton outline>Your Data<ChevronDownIcon /></DropdownButton>
              <DropdownMenu>
                <DropdownItem onClick={handleImportExcel}>Import from Excel</DropdownItem>
                <DropdownItem onClick={handleExportExcel}>Export to Excel</DropdownItem>
                <DropdownItem onClick={handleDownloadFormat}>Download Format</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button color="dark/zinc" onClick={handleAddClick}><PlusIcon />Add Assignment</Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        <div className="flex-1 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
          <div className="min-w-[700px] flex flex-col h-full">
            <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
              <div className="w-[100px] px-6 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">ID</div>
              <div className="flex-1 px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Region</div>
              <div className="flex-1 px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Employee</div>
              <div className="w-[160px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Actions</div>
            </div>

            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
              {assignments.length === 0 ? (
                <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">No assignments found. Click "Add Assignment" to create one.</div>
              ) : (
                currentAssignments.map((assignment, index) => (
                  <div key={assignment.id} className={`flex items-center py-4 border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${index === currentAssignments.length - 1 ? 'border-b-0' : ''}`}>
                    <div className="w-[100px] px-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums text-center">{assignment.id}</div>
                    <div className="flex-1 px-4 text-sm font-medium text-zinc-950 dark:text-white text-center">{assignment.regionName}</div>
                    <div className="flex-1 px-4 text-sm font-medium text-zinc-950 dark:text-white text-center">{assignment.employeeName}</div>
                    <div className="w-[160px] px-4 flex items-center justify-center">
                      <Actions
                        onView={() => handleView(assignment)}
                        onEdit={() => handleEdit(assignment)}
                        onDelete={() => handleDelete(assignment)}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

      </div>

      <AddAssignmentAlert isOpen={activeModal === 'add'} onClose={closeModal} regions={regions} employees={employees} onAdd={handleAddAssignment} />
      <ViewAssignmentAlert isOpen={activeModal === 'view'} onClose={closeModal} assignment={selectedAssignment} />
      <EditAssignmentAlert isOpen={activeModal === 'edit'} onClose={closeModal} assignment={selectedAssignment} regions={regions} employees={employees} onSave={handleSaveEdit} />
      <DeleteAssignmentAlert isOpen={activeModal === 'delete'} onClose={closeModal} assignment={selectedAssignment} onConfirm={handleConfirmDelete} />
    </div>
  )
}
