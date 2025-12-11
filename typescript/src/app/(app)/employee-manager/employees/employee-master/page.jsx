'use client'

import { useState, useEffect, useMemo } from 'react'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Checkbox, CheckboxField, CheckboxGroup } from '@/components/checkbox'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/listbox'
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/dropdown'
import {
  Pagination,
  PaginationList,
} from '@/components/pagination'
import { PlusIcon, EyeIcon, PencilSquareIcon, ChevronDownIcon } from '@heroicons/react/16/solid'

// ============================================================================
// TYPES & CONSTANT
// ============================================================================

const regionOptions = ['North', 'South', 'East', 'West', 'Central']
const rolesOptions = ['Dsr', 'Area head', 'Hr', 'Finance', 'Admin']
const designationOptions = ['Dsr', 'Area head', 'Lme/rme/srme', 'Hr', 'Manager']
const expensePolicies = ['Standard', 'Field team', 'Corporate']
const baseLocations = ['Bhopal', 'Indore', 'Pune', 'Mumbai', 'Delhi']
const statusOptions = ['Active', 'Deactive']
const ITEMS_PER_PAGE = 10

// ============================================================================
// CUSTOM ICONS
// ============================================================================

function DeleteIcon({ className }) {
  return (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      className={className}
    >
      <polyline points="3,6 5,6 21,6"></polyline>
      <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"></path>
    </svg>
  )
}

// ============================================================================
// INITIAL DATA
// ============================================================================

const initialEmployees = [
  { id: 1, code: 'EMP001', name: 'A KARTHIKEYAN', designation: 'Dsr', mobileNumber: '9750166666', email: 'jbhaimse@loyaltymast.in', reportingManager: '', regions: ['South'], roles: ['Dsr'], status: 'Deactive', alternateNumber: '', address: '', expensePolicy: '', baseLocation: '', profilePictureName: '' },
  { id: 2, code: 'EMP002', name: 'A RAVI', designation: 'Dsr', mobileNumber: '9842706499', email: 'icotulb@loyaltymast.in', reportingManager: 'Shivaprakasam mohan', regions: ['South'], roles: ['Dsr'], status: 'Active', alternateNumber: '', address: '', expensePolicy: '', baseLocation: '', profilePictureName: '' },
  { id: 3, code: 'EMP003', name: 'AAKASH MISHRA', designation: 'Area head', mobileNumber: '8980225238', email: 'yhruccie@loyaltymast.in', reportingManager: 'Anhad sethi', regions: ['Central'], roles: ['Area head'], status: 'Active', alternateNumber: '', address: '', expensePolicy: '', baseLocation: '', profilePictureName: '' },
  { id: 4, code: 'EMP004', name: 'AAKUMPAN', designation: 'Dsr', mobileNumber: '7814166332', email: 'sabharwalaakumpan@gmail.com', reportingManager: 'Harvinder singh', regions: ['North'], roles: ['Dsr'], status: 'Active', alternateNumber: '', address: '', expensePolicy: '', baseLocation: '', profilePictureName: '' },
  { id: 5, code: 'EMP005', name: 'ABDUL', designation: 'Area head', mobileNumber: '9901737390', email: 'abdul.a@lumanauto.net', reportingManager: 'Nagaraja naik', regions: ['North'], roles: ['Area head'], status: 'Active', alternateNumber: '', address: '', expensePolicy: '', baseLocation: '', profilePictureName: '' },
  { id: 6, code: 'EMP006', name: 'ABHAY MISHRA', designation: 'Lme/rme/srme', mobileNumber: '8922893761', email: 'abhaymishra@gmail.com', reportingManager: '', regions: ['Central'], roles: ['Dsr'], status: 'Deactive', alternateNumber: '', address: '', expensePolicy: '', baseLocation: '', profilePictureName: '' },
  { id: 7, code: 'EMP007', name: 'ABHIJIT DAREKAR', designation: 'Area head', mobileNumber: '7666875143', email: 'darekar17abhijeet@gmail.com', reportingManager: '', regions: ['West'], roles: ['Area head'], status: 'Deactive', alternateNumber: '', address: '', expensePolicy: '', baseLocation: '', profilePictureName: '' },
  { id: 8, code: 'EMP008', name: 'ABHIJIT LAXMAN SANGLE', designation: 'Dsr', mobileNumber: '8698691895', email: 'egwpwsnm@loyaltymast.in', reportingManager: 'Suhas kankarej', regions: ['West'], roles: ['Dsr'], status: 'Active', alternateNumber: '', address: '', expensePolicy: '', baseLocation: '', profilePictureName: '' },
  { id: 9, code: 'EMP009', name: 'ABHINAV NAMPALLI', designation: 'Area head', mobileNumber: '9963630059', email: 'abhinavn@lumanauto.net', reportingManager: '', regions: ['South'], roles: ['Area head'], status: 'Deactive', alternateNumber: '', address: '', expensePolicy: '', baseLocation: '', profilePictureName: '' },
  { id: 10, code: 'EMP010', name: 'ABHISHEK JAISWAL', designation: 'Lme/rme/srme', mobileNumber: '9926084478', email: 'abhishek.jaiswal0704@gmail.com', reportingManager: '', regions: ['Central'], roles: ['Dsr'], status: 'Deactive', alternateNumber: '', address: '', expensePolicy: '', baseLocation: '', profilePictureName: '' },
  { id: 11, code: 'EMP011', name: 'ABHISHEK MISHRA', designation: 'Area head', mobileNumber: '7000782192', email: 'abhishek.mishra@lumanauto.net', reportingManager: 'Vijay sharma', regions: ['Central'], roles: ['Area head'], status: 'Active', alternateNumber: '', address: '', expensePolicy: '', baseLocation: '', profilePictureName: '' },
  { id: 12, code: 'EMP012', name: 'ABHISHEK PANDEY', designation: 'Lme/rme/srme', mobileNumber: '9450557820', email: 'abhidev3282.ap@gmail.com', reportingManager: '', regions: ['North'], roles: ['Dsr'], status: 'Deactive', alternateNumber: '', address: '', expensePolicy: '', baseLocation: '', profilePictureName: '' },
]

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function getDefaultForm() {
  return {
    name: '', code: '', designation: '', mobileNumber: '',
    alternateNumber: '', email: '', address: '', reportingManager: '',
    regions: [], roles: [], expensePolicy: '', baseLocation: '',
    status: 'Active', profilePictureName: ''
  }
}

function generateCode(list) {
  return `EMP${String(list.length + 1).padStart(3, '0')}`
}

// ============================================================================
// ACTION BUTTON COMPONENT
// ============================================================================

function ActionButton({ children, variant, title, onClick }) {
  const variantStyles = {
    view: 'hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/10',
    edit: 'hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50 dark:hover:text-amber-400 dark:hover:border-amber-500/50 dark:hover:bg-amber-500/10',
    delete: 'hover:text-red-600 hover:border-red-300 hover:bg-red-50 dark:hover:text-red-400 dark:hover:border-red-500/50 dark:hover:bg-red-500/10',
  }

  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center
        w-8 h-8 rounded-md
        border border-zinc-200 dark:border-zinc-700
        bg-white dark:bg-zinc-800
        text-zinc-500 dark:text-zinc-400
        transition-all duration-150 ease-in-out
        hover:-translate-y-0.5
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900
        ${variantStyles[variant]}
      `}
    >
      {children}
    </button>
  )
}

// ============================================================================
// VIEW EMPLOYEE ALERT
// ============================================================================

function ViewEmployeeAlert({ isOpen, onClose, employee }) {
  if (!employee) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Employee Details</AlertTitle>
      <AlertDescription>
        View the details of the selected employee below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-2">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">Code:</span>
              <span className="text-zinc-600 dark:text-zinc-400">{employee.code}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">Name:</span>
              <span className="text-zinc-600 dark:text-zinc-400">{employee.name}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">Designation:</span>
              <span className="text-zinc-600 dark:text-zinc-400">{employee.designation}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">Mobile:</span>
              <span className="text-zinc-600 dark:text-zinc-400">{employee.mobileNumber}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">Email:</span>
              <span className="text-zinc-600 dark:text-zinc-400">{employee.email}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">Reporting Manager:</span>
              <span className="text-zinc-600 dark:text-zinc-400">{employee.reportingManager || '—'}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">Status:</span>
              <span className={`${employee.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                {employee.status}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">Regions:</span>
              <span className="text-zinc-600 dark:text-zinc-400">{employee.regions?.join(', ') || '—'}</span>
            </div>
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button color="dark/zinc" onClick={onClose}>Close</Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// DELETE EMPLOYEE ALERT
// ============================================================================

function DeleteEmployeeAlert({ isOpen, onClose, employee, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!employee) return

    setIsDeleting(true)
    setTimeout(() => {
      onConfirm(employee.id)
      setIsDeleting(false)
      onClose()
    }, 300)
  }

  if (!employee) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Are you sure you want to deactivate this employee?</AlertTitle>
      <AlertDescription>
        You are about to deactivate <strong className="text-zinc-900 dark:text-white">{employee.name}</strong>. 
        The employee status will be set to "Deactive".
      </AlertDescription>
      <AlertActions>
        <Button plain onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button color="red" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deactivating...' : 'Yes, Deactivate'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// ADD/EDIT EMPLOYEE ALERT
// ============================================================================

function EmployeeFormAlert({ isOpen, onClose, employee, employees, onSave, mode }) {
  const [formState, setFormState] = useState(getDefaultForm())
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && employee) {
        setFormState({ ...employee })
      } else {
        setFormState({ ...getDefaultForm(), code: generateCode(employees) })
      }
    }
  }, [isOpen, employee, employees, mode])

  const updateForm = (k, v) => setFormState(prev => ({ ...prev, [k]: v }))

  const toggleSelection = (key, val) => {
    updateForm(key,
      formState[key].includes(val)
        ? formState[key].filter(i => i !== val)
        : [...formState[key], val]
    )
  }

  const handleSubmit = async () => {
    if (!formState.name || !formState.mobileNumber || !formState.designation) return

    setIsSubmitting(true)
    setTimeout(() => {
      onSave(formState)
      setIsSubmitting(false)
      onClose()
    }, 300)
  }

  const handleCancel = () => {
    setFormState(getDefaultForm())
    onClose()
  }

  const handleProfilePicture = (fileList) => {
    if (!fileList?.length) return
    updateForm("profilePictureName", fileList[0].name)
  }

  return (
    <Alert open={isOpen} onClose={handleCancel} size="2xl">
      <AlertTitle>{mode === 'edit' ? 'Edit Employee' : 'Create Employee'}</AlertTitle>
      <AlertDescription>
        {mode === 'edit' ? 'Update employee details below.' : 'Enter employee details below.'}
      </AlertDescription>
      <AlertBody>
        <div className="max-h-[60vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Name *</label>
              <Input value={formState.name} onChange={(e) => updateForm("name", e.target.value)} placeholder="Employee name" />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Code</label>
              <Input value={formState.code} onChange={(e) => updateForm("code", e.target.value)} placeholder="EMP001" />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email</label>
              <Input value={formState.email} onChange={(e) => updateForm("email", e.target.value)} type="email" />
            </div>

                <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Mobile *</label>
              <Input value={formState.mobileNumber} onChange={(e) => updateForm("mobileNumber", e.target.value)} />
                </div>

                <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Alternate Number</label>
              <Input value={formState.alternateNumber} onChange={(e) => updateForm("alternateNumber", e.target.value)} />
                </div>

                <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Address</label>
              <Input value={formState.address} onChange={(e) => updateForm("address", e.target.value)} />
                </div>

                <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Designation *</label>
              <Listbox value={formState.designation} onChange={(v) => updateForm("designation", v)}>
                {designationOptions.map(d => (
                      <ListboxOption key={d} value={d}><ListboxLabel>{d}</ListboxLabel></ListboxOption>
                    ))}
                  </Listbox>
                </div>

                <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Reporting To</label>
              <Listbox value={formState.reportingManager} onChange={(v) => updateForm("reportingManager", v)}>
                {employees.map(emp => (
                      <ListboxOption key={emp.id} value={emp.name}><ListboxLabel>{emp.name}</ListboxLabel></ListboxOption>
                    ))}
                  </Listbox>
                </div>

                <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Status *</label>
              <Listbox value={formState.status} onChange={(v) => updateForm("status", v)}>
                {statusOptions.map(s => (
                      <ListboxOption key={s} value={s}><ListboxLabel>{s}</ListboxLabel></ListboxOption>
                    ))}
                  </Listbox>
                </div>
              </div>

              {/* Regions + Roles */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div>
                  <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Region Tagging</p>
                    <div className="text-xs flex gap-2">
                  <button className="text-blue-600 hover:text-blue-700" onClick={() => updateForm("regions", regionOptions)}>Select All</button>
                  <span>|</span>
                  <button className="text-blue-600 hover:text-blue-700" onClick={() => updateForm("regions", [])}>Clear</button>
                    </div>
                  </div>
                  <CheckboxGroup className="grid grid-cols-2 gap-2 mt-2">
                {regionOptions.map(r => (
                      <CheckboxField key={r}>
                    <Checkbox checked={formState.regions.includes(r)} onChange={() => toggleSelection("regions", r)} />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{r}</span>
                      </CheckboxField>
                    ))}
                  </CheckboxGroup>
                </div>

                <div>
                  <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Roles</p>
                    <div className="text-xs flex gap-2">
                  <button className="text-blue-600 hover:text-blue-700" onClick={() => updateForm("roles", rolesOptions)}>Select All</button>
                  <span>|</span>
                  <button className="text-blue-600 hover:text-blue-700" onClick={() => updateForm("roles", [])}>Clear</button>
                    </div>
                  </div>
                  <CheckboxGroup className="grid grid-cols-2 gap-2 mt-2">
                {rolesOptions.map(role => (
                      <CheckboxField key={role}>
                    <Checkbox checked={formState.roles.includes(role)} onChange={() => toggleSelection("roles", role)} />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{role}</span>
                      </CheckboxField>
                    ))}
                  </CheckboxGroup>
                </div>
              </div>

              {/* Profile */}
              <div className="mt-6">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Profile Picture</p>
            <label className="border-dashed border-2 border-zinc-300 dark:border-zinc-600 p-4 rounded-lg flex justify-center cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors">
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleProfilePicture(e.target.files)} />
              <span className="text-sm text-zinc-500">{formState.profilePictureName || "Click to upload"}</span>
                </label>
              </div>

              {/* Expense & Location */}
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Expense Policy</label>
              <Listbox value={formState.expensePolicy} onChange={(v) => updateForm("expensePolicy", v)}>
                {expensePolicies.map(p => (
                      <ListboxOption key={p} value={p}><ListboxLabel>{p}</ListboxLabel></ListboxOption>
                    ))}
                  </Listbox>
                </div>

                <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Base Location</label>
              <Listbox value={formState.baseLocation} onChange={(v) => updateForm("baseLocation", v)}>
                {baseLocations.map(l => (
                      <ListboxOption key={l} value={l}><ListboxLabel>{l}</ListboxLabel></ListboxOption>
                    ))}
                  </Listbox>
                </div>
              </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button color="dark/zinc" onClick={handleSubmit} disabled={!formState.name || !formState.mobileNumber || !formState.designation || isSubmitting}>
          {isSubmitting ? 'Saving...' : (mode === 'edit' ? 'Save Changes' : 'Save')}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function EmployeeMasterPage() {
  // State management
  const [employees, setEmployees] = useState(initialEmployees)
  const [activeModal, setActiveModal] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate pagination
  const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentEmployees = employees.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // ============================================================================
  // ACTION HANDLERS
  // ============================================================================

  const handleView = (employee) => {
    setSelectedEmployee(employee)
    setActiveModal('view')
  }

  const handleEdit = (employee) => {
    setSelectedEmployee(employee)
    setActiveModal('edit')
  }

  const handleDelete = (employee) => {
    setSelectedEmployee(employee)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setSelectedEmployee(null)
    setActiveModal('add')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedEmployee(null)
  }

  // ============================================================================
  // CRUD HANDLERS
  // ============================================================================

  const handleImportEmployees = () => console.log('Import Employees')
  const handleBulkUpdate = () => console.log('Bulk Update')
  const handleExportExcel = () => console.log('Export to Excel')

  const handleSaveEmployee = (formData) => {
    if (activeModal === 'edit' && selectedEmployee) {
      setEmployees(prev => prev.map(e => e.id === selectedEmployee.id ? { ...e, ...formData } : e))
    } else {
      const nextId = employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1
      setEmployees(prev => [...prev, { id: nextId, ...formData }])
    }
  }

  const handleConfirmDeactivate = (id) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, status: 'Deactive' } : e))
  }

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header - Sticky */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Employee Master</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage all employees in the system
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Dropdown>
              <DropdownButton outline>
                Your Data
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu>
                <DropdownItem onClick={handleImportEmployees}>
                  Import Employees
                </DropdownItem>
                <DropdownItem onClick={handleBulkUpdate}>
                  Bulk Update
                </DropdownItem>
                <DropdownItem onClick={handleExportExcel}>
                  Export to Excel
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button color="dark/zinc" onClick={handleAddClick}>
              <PlusIcon />
              Add Employee
            </Button>
          </div>
        </div>
            </div>

      {/* Table Card */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Horizontal Scroll Container */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden
          [&::-webkit-scrollbar]:h-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-zinc-300
          [&::-webkit-scrollbar-thumb]:rounded-full
          dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
        >
          <div className="min-w-[1100px] flex flex-col h-full">
            {/* Table Header - Fixed */}
            <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
              <div className="w-[100px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Code</div>
              <div className="w-[180px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Name</div>
              <div className="w-[130px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Designation</div>
              <div className="w-[130px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Mobile</div>
              <div className="w-[220px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Email</div>
              <div className="w-[180px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Reporting Manager</div>
              <div className="w-[90px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Status</div>
              <div className="flex-1 min-w-[130px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Actions</div>
            </div>

            {/* Scrollable Table Body */}
            <div className="flex-1 overflow-y-auto
              [&::-webkit-scrollbar]:w-1.5
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-zinc-300
              [&::-webkit-scrollbar-thumb]:rounded-full
              dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
            >
              {employees.length === 0 ? (
                <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
                  No employees found. Click "Add Employee" to create one.
                </div>
              ) : (
                currentEmployees.map((employee, index) => (
                  <div 
                    key={employee.id} 
                    className={`flex items-center py-4 border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                      index === currentEmployees.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <div className="w-[100px] px-4 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums text-center">
                      {employee.code}
                    </div>
                    <div className="w-[180px] px-4 text-sm font-medium text-zinc-950 dark:text-white truncate text-center">
                      {employee.name}
                    </div>
                    <div className="w-[130px] px-4 text-sm text-zinc-600 dark:text-zinc-400 text-center">
                      {employee.designation}
                    </div>
                    <div className="w-[130px] px-4 text-sm text-zinc-600 dark:text-zinc-400 tabular-nums text-center">
                      {employee.mobileNumber}
                    </div>
                    <div className="w-[220px] px-4 text-sm text-zinc-600 dark:text-zinc-400 truncate text-center">
                      {employee.email}
                    </div>
                    <div className="w-[180px] px-4 text-sm text-zinc-600 dark:text-zinc-400 truncate text-center">
                      {employee.reportingManager || '—'}
                    </div>
                    <div className="w-[90px] px-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        employee.status === 'Active' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {employee.status}
                      </span>
                    </div>
                    <div className="flex-1 min-w-[130px] px-4 flex items-center justify-center gap-3">
                      <ActionButton 
                        variant="view" 
                        title="View"
                        onClick={() => handleView(employee)}
                      >
                        <EyeIcon className="w-4 h-4" />
                      </ActionButton>
                      <ActionButton 
                        variant="edit" 
                        title="Edit"
                        onClick={() => handleEdit(employee)}
                      >
                        <PencilSquareIcon className="w-4 h-4" />
                      </ActionButton>
                      <ActionButton 
                        variant="delete" 
                        title="Deactivate"
                        onClick={() => handleDelete(employee)}
                      >
                        <DeleteIcon className="w-4 h-4" />
                      </ActionButton>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-center border-t border-zinc-950/5 dark:border-white/5 px-4 h-11 shrink-0">
          <Pagination>
            <button
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            <PaginationList>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 mx-1 text-sm rounded ${
                    page === currentPage
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {page}
                </button>
              ))}
            </PaginationList>
            <button
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </Pagination>
        </div>
      </div>

      {/* ================================================================== */}
      {/* ALERT MODALS */}
      {/* ================================================================== */}

      {/* Add Employee Alert */}
      <EmployeeFormAlert
        isOpen={activeModal === 'add'}
        onClose={closeModal}
        employee={null}
        employees={employees}
        onSave={handleSaveEmployee}
        mode="add"
      />

      {/* Edit Employee Alert */}
      <EmployeeFormAlert
        isOpen={activeModal === 'edit'}
        onClose={closeModal}
        employee={selectedEmployee}
        employees={employees}
        onSave={handleSaveEmployee}
        mode="edit"
      />

      {/* View Employee Alert */}
      <ViewEmployeeAlert
        isOpen={activeModal === 'view'}
        onClose={closeModal}
        employee={selectedEmployee}
      />

      {/* Delete/Deactivate Employee Alert */}
      <DeleteEmployeeAlert
        isOpen={activeModal === 'delete'}
        onClose={closeModal}
        employee={selectedEmployee}
        onConfirm={handleConfirmDeactivate}
      />
    </div>
  )
}
