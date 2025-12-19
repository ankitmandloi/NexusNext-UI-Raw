'use client'

import { useState, useEffect } from 'react'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import Actions from '../../../basic-master/address-master/common/components/Actions.jsx'
import CommonPagination from '../../../basic-master/address-master/common/components/Pagination.jsx'
import { PlusIcon } from '@heroicons/react/16/solid'

// ============================================================================
// INITIAL DATA
// ============================================================================
const ITEMS_PER_PAGE = 10

type User = {
  id: number
  name: string
  username: string
  email: string
  emailVerifiedAt: string
  roles: string
  customerType: string
  customer: string
  employee: string
}

const initialUsers: User[] = [
  {
    id: 2,
    name: 'Admin',
    username: '9630986098',
    email: 'admin@imast.in',
    emailVerifiedAt: '',
    roles: 'Admin',
    customerType: '',
    customer: '',
    employee: 'Admin',
  },
  {
    id: 14,
    name: 'Divyesh Modha',
    username: '9054320743',
    email: 'divyesh.modha16@gmail.com',
    emailVerifiedAt: '',
    roles: 'Client Employee',
    customerType: '',
    customer: '',
    employee: 'Divyesh Modha',
  },
  {
    id: 16,
    name: 'Subash Jha',
    username: '9624083942',
    email: 'saubhashjhas01@gmail.com',
    emailVerifiedAt: '',
    roles: 'Client Employee',
    customerType: '',
    customer: '',
    employee: 'Subash Jha',
  },
  {
    id: 17,
    name: 'Ankit Pandey',
    username: '9930473337',
    email: 'sunnypandey9495@gmail.com',
    emailVerifiedAt: '',
    roles: 'Client Employee',
    customerType: '',
    customer: '',
    employee: 'Ankit Pandey',
  },
  {
    id: 18,
    name: 'Harmesh',
    username: '9414212085',
    email: 'harmeshmohil@gmail.com',
    emailVerifiedAt: '',
    roles: 'Client Employee',
    customerType: '',
    customer: '',
    employee: 'Harmesh',
  },
  {
    id: 20,
    name: 'Manmohan Singh',
    username: '9749118853',
    email: 'man.mohan1936@gmail.com',
    emailVerifiedAt: '',
    roles: 'Client Employee',
    customerType: '',
    customer: '',
    employee: 'Manmohan Singh',
  },
  {
    id: 21,
    name: 'Vijay singh Gahlot',
    username: '9252003006',
    email: 'vijaygahlot94@rediffmail.com',
    emailVerifiedAt: '',
    roles: 'Client Employee',
    customerType: '',
    customer: '',
    employee: 'Vijay singh Gahlot',
  },
  {
    id: 22,
    name: 'Muthukrishnan',
    username: '8667025947',
    email: 'muthumuppulian@gmail.com',
    emailVerifiedAt: '',
    roles: 'Client Employee',
    customerType: '',
    customer: '',
    employee: 'Muthukrishnan',
  },
]

const roleOptions = ['Super Admin', 'Admin', 'Client Employee', 'Customer', 'Client Admin', 'DMS', 'HR']
const customerTypeOptions = ['Retailer', 'Distributor', 'Mechanic', 'Plant', 'Prospect Distributor', 'Fleet owner']

// Mock data for search select functionality
const customerOptions = [
  'ABC Enterprises',
  'XYZ Motors',
  'Global Trading Co.',
  'Tech Solutions Ltd.',
  'Prime Distributors',
]
const employeeOptions = [
  'Admin',
  'Divyesh Modha',
  'Subash Jha',
  'Ankit Pandey',
  'Harmesh',
  'Manmohan Singh',
  'Vijay singh Gahlot',
  'Muthukrishnan',
  'Rajesh Kumar',
  'Priya Sharma',
]

// ============================================================================
// SEARCHABLE SELECT COMPONENT
// ============================================================================

function SearchableSelect({ id, value, onChange, options, placeholder }: any) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const filteredOptions = options.filter((option: string) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="relative">
      <Input
        id={id}
        type="text"
        value={searchTerm || value}
        onChange={(e) => {
          setSearchTerm(e.target.value)
          setIsOpen(true)
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        autoComplete="off"
      />
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {filteredOptions.map((option: string, index: number) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer text-sm text-zinc-900 dark:text-zinc-100"
              onClick={() => {
                onChange(option)
                setSearchTerm('')
                setIsOpen(false)
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  )
}

// ============================================================================
// VIEW ALERT COMPONENT
// ============================================================================

function ViewUserAlert({ isOpen, onClose, user }: any) {
  if (!user) return null

  return (
    <Alert open={isOpen} onClose={onClose} size="2xl">
      <AlertTitle>User Details</AlertTitle>
      <AlertDescription>View the complete details of the selected user below.</AlertDescription>
      <AlertBody>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">ID</span>
              <span className="text-zinc-600 dark:text-zinc-400">{user.id}</span>
            </div>
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Name</span>
              <span className="text-zinc-600 dark:text-zinc-400">{user.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Username</span>
              <span className="text-zinc-600 dark:text-zinc-400">{user.username}</span>
            </div>
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Email</span>
              <span className="text-zinc-600 dark:text-zinc-400">{user.email}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Roles</span>
              <span className="text-zinc-600 dark:text-zinc-400">{user.roles}</span>
            </div>
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Email Verified At</span>
              <span className="text-zinc-600 dark:text-zinc-400">{user.emailVerifiedAt || '-'}</span>
            </div>
          </div>

          {user.customerType && (
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Customer Type</span>
              <span className="text-zinc-600 dark:text-zinc-400">{user.customerType}</span>
            </div>
          )}

          {user.customer && (
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Customer</span>
              <span className="text-zinc-600 dark:text-zinc-400">{user.customer}</span>
            </div>
          )}

          {user.employee && (
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Employee</span>
              <span className="text-zinc-600 dark:text-zinc-400">{user.employee}</span>
            </div>
          )}
        </div>
      </AlertBody>
      <AlertActions>
        <Button color="dark/zinc" onClick={onClose}>
          Close
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// EDIT ALERT COMPONENT
// ============================================================================

function EditUserAlert({ isOpen, onClose, user, onSave }: any) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    roles: 'Client Employee',
    customerType: '',
    customer: '',
    employee: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        name: user.name,
        username: user.username,
        email: user.email,
        password: '',
        roles: user.roles,
        customerType: user.customerType,
        customer: user.customer,
        employee: user.employee,
      })
    }
  }, [user, isOpen])

  const handleSave = async () => {
    if (!user || !formData.name.trim() || !formData.email.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      const updatedUser = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        emailVerifiedAt: user.emailVerifiedAt,
        roles: formData.roles,
        customerType: formData.customerType,
        customer: formData.customer,
        employee: formData.employee,
      }
      onSave(user.id, updatedUser)
      setIsSubmitting(false)
      onClose()
    }, 300)
  }

  const handleCancel = () => {
    onClose()
  }

  if (!user) return null

  return (
    <Alert open={isOpen} onClose={handleCancel} size="3xl">
      <AlertTitle>Edit User</AlertTitle>
      <AlertDescription>Update the user information below.</AlertDescription>
      <AlertBody>
        <div className="space-y-4 max-w-4xl max-h-[60vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
          <div className="space-y-2">
            <label htmlFor="editName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Name
            </label>
            <Input
              id="editName"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="editUsername" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Username
            </label>
            <Input
              id="editUsername"
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Enter username"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="editEmail" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </label>
            <Input
              id="editEmail"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="editPassword" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Password
            </label>
            <Input
              id="editPassword"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Leave blank to keep current password"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="editRoles" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Roles
            </label>
            <Select id="editRoles" value={formData.roles} onChange={(e) => setFormData({ ...formData, roles: e.target.value })}>
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="editCustomerType" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Customer Type
            </label>
            <Select
              id="editCustomerType"
              value={formData.customerType}
              onChange={(e) => setFormData({ ...formData, customerType: e.target.value })}
            >
              <option value="">Please select</option>
              {customerTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="editCustomer" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Customer
            </label>
            <SearchableSelect
              id="editCustomer"
              value={formData.customer}
              onChange={(val: string) => setFormData({ ...formData, customer: val })}
              options={customerOptions}
              placeholder="Search and select customer"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="editEmployee" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Employee
            </label>
            <SearchableSelect
              id="editEmployee"
              value={formData.employee}
              onChange={(val: string) => setFormData({ ...formData, employee: val })}
              options={employeeOptions}
              placeholder="Search and select employee"
            />
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          color="dark/zinc"
          onClick={handleSave}
          disabled={!formData.name.trim() || !formData.email.trim() || isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// ADD USER ALERT COMPONENT
// ============================================================================

function AddUserAlert({ isOpen, onClose, onAdd }: any) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    roles: 'Client Employee',
    customerType: '',
    customer: '',
    employee: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        username: '',
        email: '',
        password: '',
        roles: 'Client Employee',
        customerType: '',
        customer: '',
        employee: '',
      })
    }
  }, [isOpen])

  const handleAdd = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      const newUser = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        emailVerifiedAt: '',
        roles: formData.roles,
        customerType: formData.customerType,
        customer: formData.customer,
        employee: formData.employee,
      }
      onAdd(newUser)
      setIsSubmitting(false)
      onClose()
    }, 300)
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <Alert open={isOpen} onClose={handleCancel} size="3xl">
      <AlertTitle>Add User</AlertTitle>
      <AlertDescription>Fill in the details to create a new user.</AlertDescription>
      <AlertBody>
        <div className="space-y-4 max-w-4xl max-h-[60vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
          <div className="space-y-2">
            <label htmlFor="newName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Name
            </label>
            <Input
              id="newName"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter name"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="newUsername" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Username
            </label>
            <Input
              id="newUsername"
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Enter username"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="newEmail" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </label>
            <Input
              id="newEmail"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="newPassword" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Password
            </label>
            <Input
              id="newPassword"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter password"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="newRoles" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Roles
            </label>
            <Select id="newRoles" value={formData.roles} onChange={(e) => setFormData({ ...formData, roles: e.target.value })}>
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="newCustomerType" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Customer Type
            </label>
            <Select
              id="newCustomerType"
              value={formData.customerType}
              onChange={(e) => setFormData({ ...formData, customerType: e.target.value })}
            >
              <option value="">Please select</option>
              {customerTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="newCustomer" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Customer
            </label>
            <SearchableSelect
              id="newCustomer"
              value={formData.customer}
              onChange={(val: string) => setFormData({ ...formData, customer: val })}
              options={customerOptions}
              placeholder="Search and select customer"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="newEmployee" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Employee
            </label>
            <SearchableSelect
              id="newEmployee"
              value={formData.employee}
              onChange={(val: string) => setFormData({ ...formData, employee: val })}
              options={employeeOptions}
              placeholder="Search and select employee"
            />
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          color="dark/zinc"
          onClick={handleAdd}
          disabled={!formData.name.trim() || !formData.email.trim() || !formData.password.trim() || isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// DELETE ALERT COMPONENT
// ============================================================================

function DeleteUserAlert({ isOpen, onClose, user, onConfirm }: any) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!user) return

    setIsDeleting(true)
    setTimeout(() => {
      onConfirm(user.id)
      setIsDeleting(false)
      onClose()
    }, 300)
  }

  if (!user) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Are you sure you want to delete this user?</AlertTitle>
      <AlertDescription>
        You are about to delete <strong className="text-zinc-900 dark:text-white">{user.name}</strong>. This action
        cannot be undone.
      </AlertDescription>
      <AlertActions>
        <Button plain onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button color="red" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Yes, Delete'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(users.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentUsers = users.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleView = (user: User) => {
    setSelectedUser(user)
    setActiveModal('view')
  }

  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setActiveModal('edit')
  }

  const handleDelete = (user: User) => {
    setSelectedUser(user)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setActiveModal('add')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedUser(null)
  }

  const handleAddUser = (formData: any) => {
    const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1
    const newUser: User = { id: newId, ...formData }
    setUsers((prevUsers) => [...prevUsers, newUser])
  }

  const handleSaveEdit = (id: number, formData: any) => {
    setUsers((prevUsers) => prevUsers.map((user) => (user.id === id ? { ...user, ...formData } : user)))
  }

  const handleConfirmDelete = (id: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Users</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Manage all users in the system</div>
          </div>
          <div className="flex items-center gap-3">
            <Button color="dark/zinc" onClick={handleAddClick}>
              <PlusIcon />
              Add User
            </Button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="flex flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden">
        {/* Content Container */}
        <div className="overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:h-0">
          <div style={{ minWidth: '1800px' }}>
            {/* Sticky Table Header */}
            <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900 sticky top-0 z-10">
              <div className="w-[80px] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</div>
              <div className="w-[180px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Name</div>
              <div className="w-[150px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Username</div>
              <div className="w-[220px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Email</div>
              <div className="w-[150px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Email Verified At</div>
              <div className="w-[160px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Roles</div>
              <div className="w-[160px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Customer Type</div>
              <div className="w-[180px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Customer</div>
              <div className="w-[180px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Employee</div>
              <div className="w-[160px] text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Actions</div>
            </div>

            {/* Scrollable Table Body */}
            {users.length === 0 ? (
              <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
                No users found. Click "Add User" to create one.
              </div>
            ) : (
              currentUsers.map((user, index) => (
                <div
                  key={user.id}
                  className={`flex items-center py-[1.1rem] border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                    index === currentUsers.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <div className="w-[80px] pl-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">{user.id}</div>
                  <div className="w-[180px] text-sm font-medium text-zinc-950 dark:text-white truncate pr-4">
                    {user.name}
                  </div>
                  <div className="w-[150px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {user.username}
                  </div>
                  <div className="w-[220px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">{user.email}</div>
                  <div className="w-[150px] text-sm text-zinc-600 dark:text-zinc-300">{user.emailVerifiedAt || '-'}</div>
                  <div className="w-[160px] text-sm text-zinc-600 dark:text-zinc-300">{user.roles}</div>
                  <div className="w-[160px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {user.customerType || '-'}
                  </div>
                  <div className="w-[180px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {user.customer || '-'}
                  </div>
                  <div className="w-[180px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {user.employee || '-'}
                  </div>
                  <div className="w-[160px] px-4 flex items-center justify-center">
                    <Actions
                      onView={() => handleView(user)}
                      onEdit={() => handleEdit(user)}
                      onDelete={() => handleDelete(user)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sticky Horizontal Scrollbar at Bottom */}
        <div className="flex shrink-0 sticky bottom-0 bg-white dark:bg-zinc-900">
          <div className="flex-1 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
            <div style={{ width: '1800px', height: '1px' }}></div>
          </div>
        </div>

        {/* Pagination Footer */}
        <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

      {/* ALERT MODALS */}
      <AddUserAlert isOpen={activeModal === 'add'} onClose={closeModal} onAdd={handleAddUser} />

      <ViewUserAlert isOpen={activeModal === 'view'} onClose={closeModal} user={selectedUser} />

      <EditUserAlert isOpen={activeModal === 'edit'} onClose={closeModal} user={selectedUser} onSave={handleSaveEdit} />

      <DeleteUserAlert
        isOpen={activeModal === 'delete'}
        onClose={closeModal}
        user={selectedUser}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
