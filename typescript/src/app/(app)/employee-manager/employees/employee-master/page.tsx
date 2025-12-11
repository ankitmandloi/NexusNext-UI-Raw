'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/button'
import { Checkbox, CheckboxField, CheckboxGroup } from '@/components/checkbox'
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/dropdown'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/listbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import {
  Pagination,
  PaginationList,
} from '@/components/pagination'
import {
  ChevronDownIcon,
  EyeIcon,
  PencilSquareIcon,
  PlusIcon,
} from '@heroicons/react/16/solid'



// ============================================================================
// TYPES & INTERFACES
// ============================================================================

type EmployeeStatus = 'Active' | 'Deactive'

type Employee = {
  id: number
  name: string
  code: string
  designation: string
  mobileNumber: string
  alternateNumber?: string
  email: string
  address?: string
  reportingManager?: string
  regions: string[]
  roles: string[]
  expensePolicy?: string
  baseLocation?: string
  status: EmployeeStatus
  profilePictureName?: string
}

type EmployeeFormState = Omit<Employee, 'id'>

type ModalType = 'view' | 'edit' | 'add' | null

// ============================================================================
// CONSTANTS
// ============================================================================

const regionOptions = ['North', 'South', 'East', 'West', 'Central']
const rolesOptions = ['Dsr', 'Area head', 'Hr', 'Finance', 'Admin']
const designationOptions = ['Dsr', 'Area head', 'Lme/rme/srme', 'Hr', 'Manager']
const expensePolicies = ['Standard', 'Field team', 'Corporate']
const baseLocations = ['Bhopal', 'Indore', 'Pune', 'Mumbai', 'Delhi']
const statusOptions: EmployeeStatus[] = ['Active', 'Deactive']

const ITEMS_PER_PAGE = 10

// ============================================================================
// INITIAL DATA
// ============================================================================

const seedEmployees: Employee[] = [
  { id: 1, code: 'EMP001', name: 'A KARTHIKEYAN', designation: 'Dsr', mobileNumber: '9750166666', email: 'jbhaimse@loyaltymast.in', reportingManager: '', regions: ['South'], roles: ['Dsr'], status: 'Deactive' },
  { id: 2, code: 'EMP002', name: 'A RAVI', designation: 'Dsr', mobileNumber: '9842706499', email: 'icotulb@loyaltymast.in', reportingManager: 'Shivaprakasam mohan', regions: ['South'], roles: ['Dsr'], status: 'Active' },
  { id: 3, code: 'EMP003', name: 'AAKASH MISHRA', designation: 'Area head', mobileNumber: '8980225238', email: 'yhruccie@loyaltymast.in', reportingManager: 'Anhad sethi', regions: ['Central'], roles: ['Area head'], status: 'Active' },
  { id: 4, code: 'EMP004', name: 'AAKUMPAN', designation: 'Dsr', mobileNumber: '7814166332', email: 'sabharwalaakumpan@gmail.com', reportingManager: 'Harvinder singh', regions: ['North'], roles: ['Dsr'], status: 'Active' },
  { id: 5, code: 'EMP005', name: 'ABDUL', designation: 'Area head', mobileNumber: '9901737390', email: 'abdul.a@lumanauto.net', reportingManager: 'Nagaraja naik', regions: ['North'], roles: ['Area head'], status: 'Active' },
  { id: 6, code: 'EMP006', name: 'ABHAY MISHRA', designation: 'Lme/rme/srme', mobileNumber: '8922893761', email: 'abhaymishra@gmail.com', reportingManager: '', regions: ['Central'], roles: ['Dsr'], status: 'Deactive' },
  { id: 7, code: 'EMP007', name: 'ABHIJIT DAREKAR', designation: 'Area head', mobileNumber: '7666875143', email: 'darekar17abhijeet@gmail.com', reportingManager: '', regions: ['West'], roles: ['Area head'], status: 'Deactive' },
  { id: 8, code: 'EMP008', name: 'ABHIJIT LAXMAN SANGLE', designation: 'Dsr', mobileNumber: '8698691895', email: 'egwpwsnm@loyaltymast.in', reportingManager: 'Suhas kankarej', regions: ['West'], roles: ['Dsr'], status: 'Active' },
  { id: 9, code: 'EMP009', name: 'ABHINAV NAMPALLI', designation: 'Area head', mobileNumber: '9963630059', email: 'abhinavn@lumanauto.net', reportingManager: '', regions: ['South'], roles: ['Area head'], status: 'Deactive' },
  { id: 10, code: 'EMP010', name: 'ABHISHEK JAISWAL', designation: 'Lme/rme/srme', mobileNumber: '9926084478', email: 'abhishek.jaiswal0704@gmail.com', reportingManager: '', regions: ['Central'], roles: ['Dsr'], status: 'Deactive' },
  { id: 11, code: 'EMP011', name: 'ABHISHEK MISHRA', designation: 'Area head', mobileNumber: '7000782192', email: 'abhishek.mishra@lumanauto.net', reportingManager: 'Vijay sharma', regions: ['Central'], roles: ['Area head'], status: 'Active' },
  { id: 12, code: 'EMP012', name: 'ABHISHEK PANDEY', designation: 'Lme/rme/srme', mobileNumber: '9450557820', email: 'abhidev3282.ap@gmail.com', reportingManager: '', regions: ['North'], roles: ['Dsr'], status: 'Deactive' },
]

// ============================================================================
// CUSTOM ICONS
// ============================================================================

function DeleteIcon({ className }: { className?: string }) {
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
// ACTION BUTTON COMPONENT
// ============================================================================

function ActionButton({
  children,
  title,
  onClick,
}: {
  children: React.ReactNode
  title: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-zinc-200 bg-white text-zinc-500 transition-all duration-150 hover:bg-zinc-100 hover:text-zinc-900 hover:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white dark:focus:ring-offset-zinc-900"
    >
      {children}
    </button>
  )
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getDefaultForm(): EmployeeFormState {
  return {
    name: '',
    code: '',
    designation: '',
    mobileNumber: '',
    alternateNumber: '',
    email: '',
    address: '',
    reportingManager: '',
    regions: [],
    roles: [],
    expensePolicy: '',
    baseLocation: '',
    status: 'Active',
    profilePictureName: '',
  }
}

function generateCode(employees: Employee[]): string {
  const nextNum = employees.length + 1
  return `EMP${String(nextNum).padStart(3, '0')}`
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function EmployeeMasterPage() {
  const [employees, setEmployees] = useState<Employee[]>(seedEmployees)
  const [search, setSearch] = useState('')
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [formState, setFormState] = useState<EmployeeFormState>(getDefaultForm)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        !search ||
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.code.toLowerCase().includes(search.toLowerCase()) ||
        employee.mobileNumber.includes(search) ||
        employee.email.toLowerCase().includes(search.toLowerCase())
      return matchesSearch
    })
  }, [employees, search])

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentEmployees = filteredEmployees.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // ============================================================================
  // ACTION HANDLERS
  // ============================================================================

  const handleView = (employee: Employee) => {
    setSelectedEmployee(employee)
    setActiveModal('view')
  }

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee)
    setFormState({ ...employee })
    setActiveModal('edit')
  }

  const handleDeactivate = (employee: Employee) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === employee.id ? { ...emp, status: 'Deactive' } : emp
      )
    )
  }

  const handleAddClick = () => {
    setSelectedEmployee(null)
    setFormState({
      ...getDefaultForm(),
      code: generateCode(employees),
    })
    setActiveModal('add')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedEmployee(null)
    setFormState(getDefaultForm())
  }

  const updateForm = <K extends keyof EmployeeFormState>(key: K, value: EmployeeFormState[K]) => {
    setFormState((prev) => ({ ...prev, [key]: value }))
  }

  const toggleSelection = (key: 'regions' | 'roles', value: string) => {
    setFormState((prev) => {
      const current = prev[key]
      const exists = current.includes(value)
      return {
        ...prev,
        [key]: exists ? current.filter((item) => item !== value) : [...current, value],
      }
    })
  }

  const handleSubmit = () => {
    if (!formState.name || !formState.mobileNumber || !formState.designation) return

    if (activeModal === 'edit' && selectedEmployee) {
      setEmployees((prev) =>
        prev.map((item) => (item.id === selectedEmployee.id ? { ...item, ...formState } : item))
      )
    } else {
      const nextId = employees.length ? Math.max(...employees.map((e) => e.id)) + 1 : 1
      setEmployees((prev) => [...prev, { id: nextId, ...formState }])
    }

    closeModal()
  }

  const handleProfilePicture = (fileList: FileList | null) => {
    if (!fileList?.length) return
    updateForm('profilePictureName', fileList[0].name)
  }

  const handleImportEmployees = () => {
    console.log('Import Employees clicked')
  }

  const handleBulkUpdate = () => {
    console.log('Bulk Update clicked')
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <Heading>Employee Master</Heading>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Manage all employees in the system
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Dropdown>
            <DropdownButton outline>
              Your Data
              <ChevronDownIcon />
            </DropdownButton>
            <DropdownMenu>
              <DropdownItem onClick={handleImportEmployees}>Import Employees</DropdownItem>
              <DropdownItem onClick={handleBulkUpdate}>Bulk Update</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button onClick={handleAddClick}>
            <PlusIcon />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Code</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Designation</TableHeader>
            <TableHeader>Mobile number</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Reporting manager</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader className="text-center">Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentEmployees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-zinc-500">
                No employees found. Click "Add Employee" to create one.
              </TableCell>
            </TableRow>
          ) : (
            currentEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.code}</TableCell>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell className="text-zinc-500">{employee.designation}</TableCell>
                <TableCell className="text-zinc-500 tabular-nums">{employee.mobileNumber}</TableCell>
                <TableCell className="text-zinc-500">{employee.email}</TableCell>
                <TableCell className="text-zinc-500">{employee.reportingManager || '—'}</TableCell>
                <TableCell className="text-zinc-500">{employee.status}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <ActionButton title="View" onClick={() => handleView(employee)}>
                      <EyeIcon className="w-4 h-4" />
                    </ActionButton>
                    <ActionButton title="Edit" onClick={() => handleEdit(employee)}>
                      <PencilSquareIcon className="w-4 h-4" />
                    </ActionButton>
                    <ActionButton title="Deactivate" onClick={() => handleDeactivate(employee)}>
                      <DeleteIcon className="w-4 h-4" />
                    </ActionButton>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-center">
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

      {/* ================================================================== */}
      {/* VIEW EMPLOYEE MODAL */}
      {/* ================================================================== */}
      {activeModal === 'view' && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-zinc-950/25 dark:bg-zinc-950/50" onClick={closeModal} />
          <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-8 shadow-lg ring-1 ring-zinc-950/10 dark:bg-zinc-900 dark:ring-white/10">
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">Employee Details</h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              View the details of the selected employee below.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Code:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedEmployee.code}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Name:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedEmployee.name}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Designation:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedEmployee.designation}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Mobile:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedEmployee.mobileNumber}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Email:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedEmployee.email}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Reporting Manager:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedEmployee.reportingManager || '—'}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Status:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedEmployee.status}</span>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button onClick={closeModal}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* ADD/EDIT EMPLOYEE MODAL - Scrollable */}
      {/* ================================================================== */}
      {(activeModal === 'add' || activeModal === 'edit') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-zinc-950/25 dark:bg-zinc-950/50" onClick={closeModal} />
          <div className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-lg ring-1 ring-zinc-950/10 dark:bg-zinc-900 dark:ring-white/10">
            {/* Modal Header - Fixed */}
            <div className="shrink-0 border-b border-zinc-200 px-8 py-6 dark:border-zinc-700">
              <h2 className="text-lg font-semibold text-zinc-950 dark:text-white">
                {activeModal === 'edit' ? 'Edit Employee' : 'Create Employee Master'}
              </h2>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                {activeModal === 'edit'
                  ? 'Update the employee details below.'
                  : 'Enter the details for the new employee below.'}
              </p>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto px-8 py-6
              [&::-webkit-scrollbar]:w-1.5
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-zinc-300
              [&::-webkit-scrollbar-thumb]:rounded-full
              dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Row 1 */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Name<span className="text-zinc-500">*</span>
                  </label>
                  <Input
                    value={formState.name}
                    onChange={(e) => updateForm('name', e.target.value)}
                    placeholder="Employee name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Code</label>
                  <Input
                    value={formState.code}
                    onChange={(e) => updateForm('code', e.target.value)}
                    placeholder="EMP001"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
                  <Input
                    type="email"
                    value={formState.email}
                    onChange={(e) => updateForm('email', e.target.value)}
                    placeholder="employee@company.com"
                  />
                </div>

                {/* Row 2 */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Mobile No.<span className="text-zinc-500">*</span>
                  </label>
                  <Input
                    value={formState.mobileNumber}
                    onChange={(e) => updateForm('mobileNumber', e.target.value)}
                    placeholder="9876543210"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Employee Alternate Number
                  </label>
                  <Input
                    value={formState.alternateNumber}
                    onChange={(e) => updateForm('alternateNumber', e.target.value)}
                    placeholder="Optional"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Employee Address
                  </label>
                  <Input
                    value={formState.address}
                    onChange={(e) => updateForm('address', e.target.value)}
                    placeholder="Street, City, State"
                  />
                </div>

                {/* Row 3 */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Designation<span className="text-zinc-500">*</span>
                  </label>
                  <Listbox
                    value={formState.designation}
                    onChange={(value) => updateForm('designation', value)}
                    placeholder="Please select"
                    aria-label="Designation"
                  >
                    {designationOptions.map((option) => (
                      <ListboxOption key={option} value={option}>
                        <ListboxLabel>{option}</ListboxLabel>
                      </ListboxOption>
                    ))}
                  </Listbox>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Reporting To</label>
                  <Listbox
                    value={formState.reportingManager}
                    onChange={(value) => updateForm('reportingManager', value)}
                    placeholder="Please select"
                    aria-label="Reporting To"
                  >
                    {employees.map((emp) => (
                      <ListboxOption key={emp.id} value={emp.name}>
                        <ListboxLabel>{emp.name}</ListboxLabel>
                      </ListboxOption>
                    ))}
                  </Listbox>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Employee Status<span className="text-zinc-500">*</span>
                  </label>
                  <Listbox
                    value={formState.status}
                    onChange={(value) => updateForm('status', value)}
                    aria-label="Employee Status"
                  >
                    {statusOptions.map((status) => (
                      <ListboxOption key={status} value={status}>
                        <ListboxLabel>{status}</ListboxLabel>
                      </ListboxOption>
                    ))}
                  </Listbox>
                </div>
              </div>

              {/* Region Tagging & Roles */}
              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Region Tagging</p>
                    <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                      <button
                        type="button"
                        onClick={() => updateForm('regions', regionOptions)}
                        className="hover:text-zinc-900 dark:hover:text-white underline"
                      >
                        Select all
                      </button>
                      <span className="text-zinc-400">|</span>
                      <button
                        type="button"
                        onClick={() => updateForm('regions', [])}
                        className="hover:text-zinc-900 dark:hover:text-white underline"
                      >
                        Deselect all
                      </button>
                    </div>
                  </div>
                  <CheckboxGroup className="grid grid-cols-2 gap-3">
                    {regionOptions.map((region) => (
                      <CheckboxField key={region}>
                        <Checkbox
                          color="dark/zinc"
                          checked={formState.regions.includes(region)}
                          onChange={() => toggleSelection('regions', region)}
                        />
                        <span data-slot="label" className="text-sm text-zinc-700 dark:text-zinc-200">
                          {region}
                        </span>
                      </CheckboxField>
                    ))}
                  </CheckboxGroup>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Roles</p>
                    <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                      <button
                        type="button"
                        onClick={() => updateForm('roles', rolesOptions)}
                        className="hover:text-zinc-900 dark:hover:text-white underline"
                      >
                        Select all
                      </button>
                      <span className="text-zinc-400">|</span>
                      <button
                        type="button"
                        onClick={() => updateForm('roles', [])}
                        className="hover:text-zinc-900 dark:hover:text-white underline"
                      >
                        Deselect all
                      </button>
                    </div>
                  </div>
                  <CheckboxGroup className="grid grid-cols-2 gap-3">
                    {rolesOptions.map((role) => (
                      <CheckboxField key={role}>
                        <Checkbox
                          color="dark/zinc"
                          checked={formState.roles.includes(role)}
                          onChange={() => toggleSelection('roles', role)}
                        />
                        <span data-slot="label" className="text-sm text-zinc-700 dark:text-zinc-200">
                          {role}
                        </span>
                      </CheckboxField>
                    ))}
                  </CheckboxGroup>
                </div>
              </div>

              {/* Profile Picture */}
              <div className="mt-6">
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Profile Picture</p>
                <label className="mt-2 flex min-h-24 cursor-pointer items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-50 text-sm text-zinc-500 transition hover:border-zinc-400 hover:bg-zinc-100 dark:border-white/15 dark:bg-white/5 dark:text-zinc-400 dark:hover:border-white/25 dark:hover:bg-white/10">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleProfilePicture(e.target.files)}
                  />
                  {formState.profilePictureName ? (
                    <span className="text-zinc-700 dark:text-zinc-200">{formState.profilePictureName}</span>
                  ) : (
                    <span>Drop files here to upload</span>
                  )}
                </label>
              </div>

              {/* Bottom Row */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Expense Policy</label>
                  <Listbox
                    value={formState.expensePolicy}
                    onChange={(value) => updateForm('expensePolicy', value)}
                    placeholder="Please select"
                    aria-label="Expense Policy"
                  >
                    {expensePolicies.map((policy) => (
                      <ListboxOption key={policy} value={policy}>
                        <ListboxLabel>{policy}</ListboxLabel>
                      </ListboxOption>
                    ))}
                  </Listbox>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Employee Base Location
                  </label>
                  <Listbox
                    value={formState.baseLocation}
                    onChange={(value) => updateForm('baseLocation', value)}
                    placeholder="Please select"
                    aria-label="Employee Base Location"
                  >
                    {baseLocations.map((location) => (
                      <ListboxOption key={location} value={location}>
                        <ListboxLabel>{location}</ListboxLabel>
                      </ListboxOption>
                    ))}
                  </Listbox>
                </div>
              </div>
            </div>

            {/* Modal Footer - Fixed */}
            <div className="shrink-0 border-t border-zinc-200 px-8 py-4 dark:border-zinc-700">
              <div className="flex flex-col-reverse items-center justify-end gap-3 sm:flex-row">
                <Button plain onClick={closeModal}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  {activeModal === 'edit' ? 'Save Changes' : 'Save'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
