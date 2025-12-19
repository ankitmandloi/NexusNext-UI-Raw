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

type TicketTag = {
  id: number
  name: string
  type: string
  userType: string
  customerType: string
  assignTo: string
}

const initialTicketTags: TicketTag[] = [
  { id: 1, name: 'Redemption Query / Points Query', type: 'loyalty', userType: 'customer', customerType: 'Distributor', assignTo: 'Naresh Vilas Chaudhari' },
  { id: 2, name: 'QR Code Query', type: 'loyalty', userType: 'customer', customerType: 'Distributor', assignTo: 'Naresh Vilas Chaudhari' },
  { id: 3, name: 'Product Quality/Technical', type: 'sfa', userType: 'customer', customerType: 'Mechanic', assignTo: 'Shivam Pandey' },
  { id: 4, name: 'Gift Receiving Issue', type: 'loyalty', userType: 'customer', customerType: 'Distributor', assignTo: 'Naresh Vilas Chaudhari' },
  { id: 5, name: 'Deliver/ Availability', type: 'dms', userType: 'customer', customerType: 'Plant', assignTo: 'Sankit Singh' },
  { id: 6, name: 'Invoice / Price Related Query', type: 'loyalty', userType: 'customer', customerType: 'Distributor', assignTo: 'Naresh Vilas Chaudhari' },
  { id: 7, name: 'Employee Incentives / Salary', type: 'loyalty', userType: 'employee', customerType: 'Distributor', assignTo: 'Naresh Vilas Chaudhari' },
  { id: 8, name: 'KYC Related Query', type: 'loyalty', userType: 'customer', customerType: 'Distributor', assignTo: 'Naresh Vilas Chaudhari' },
  { id: 9, name: 'Visit Query', type: 'sfa', userType: 'employee', customerType: 'Distributor', assignTo: 'Naresh Vilas Chaudhari' },
  { id: 10, name: 'Other Query', type: 'loyalty', userType: 'customer', customerType: 'Distributor', assignTo: 'Naresh Vilas Chaudhari' },
]

const assignToOptions = [
  'Naresh Vilas Chaudhari',
  'Shivam Pandey',
  'Sankit Singh',
]

// ============================================================================
// VIEW ALERT COMPONENT
// ============================================================================

function ViewTagAlert({ isOpen, onClose, tag }: any) {
  if (!tag) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Ticket Tag Details</AlertTitle>
      <AlertDescription>
        View the details of the selected ticket tag below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-3">
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">ID:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{tag.id}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Name:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{tag.name}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Type:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{tag.type}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">User Type:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{tag.userType}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Customer Type:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{tag.customerType}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Assigned To:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{tag.assignTo}</span>
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
// EDIT ALERT COMPONENT
// ============================================================================

function EditTagAlert({ isOpen, onClose, tag, onSave }: any) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'loyalty',
    userType: 'customer',
    customerType: 'Distributor',
    assignTo: assignToOptions[0],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (tag && isOpen) {
      setFormData({
        name: tag.name,
        type: tag.type,
        userType: tag.userType,
        customerType: tag.customerType,
        assignTo: tag.assignTo,
      })
    }
  }, [tag, isOpen])

  const handleSave = async () => {
    if (!tag || !formData.name.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      onSave(tag.id, formData)
      setIsSubmitting(false)
      onClose()
    }, 300)
  }

  const handleCancel = () => {
    onClose()
  }

  if (!tag) return null

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Edit Ticket Tag</AlertTitle>
      <AlertDescription>
        Update the ticket tag information below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="editName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Name
            </label>
            <Input
              id="editName"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter ticket tag name"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="editType" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Type
            </label>
            <Select
              id="editType"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="loyalty">Loyalty</option>
              <option value="sfa">SFA</option>
              <option value="dms">DMS</option>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="editUserType" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              User Type
            </label>
            <Select
              id="editUserType"
              value={formData.userType}
              onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
            >
              <option value="customer">Customer</option>
              <option value="employee">Employee</option>
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
              <option value="Distributor">Distributor</option>
              <option value="Mechanic">Mechanic</option>
              <option value="Plant">Plant</option>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="editAssignTo" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Assign To
            </label>
            <Select
              id="editAssignTo"
              value={formData.assignTo}
              onChange={(e) => setFormData({ ...formData, assignTo: e.target.value })}
            >
              {assignToOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button color="dark/zinc" onClick={handleSave} disabled={!formData.name.trim() || isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// ADD TAG ALERT COMPONENT
// ============================================================================

function AddTagAlert({ isOpen, onClose, onAdd }: any) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'loyalty',
    userType: 'customer',
    customerType: 'Distributor',
    assignTo: assignToOptions[0],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        type: 'loyalty',
        userType: 'customer',
        customerType: 'Distributor',
        assignTo: assignToOptions[0],
      })
    }
  }, [isOpen])

  const handleAdd = async () => {
    if (!formData.name.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      onAdd(formData)
      setIsSubmitting(false)
      onClose()
    }, 300)
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Create Ticket Tag</AlertTitle>
      <AlertDescription>
        Add a new ticket tag to organize and assign tickets.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="newName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Name
            </label>
            <Input
              id="newName"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter ticket tag name"
              autoFocus
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="newType" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Type
            </label>
            <Select
              id="newType"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="loyalty">Loyalty</option>
              <option value="sfa">SFA</option>
              <option value="dms">DMS</option>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="newUserType" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              User Type
            </label>
            <Select
              id="newUserType"
              value={formData.userType}
              onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
            >
              <option value="customer">Customer</option>
              <option value="employee">Employee</option>
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
              <option value="Distributor">Distributor</option>
              <option value="Mechanic">Mechanic</option>
              <option value="Plant">Plant</option>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="newAssignTo" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Assign To
            </label>
            <Select
              id="newAssignTo"
              value={formData.assignTo}
              onChange={(e) => setFormData({ ...formData, assignTo: e.target.value })}
            >
              {assignToOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button color="dark/zinc" onClick={handleAdd} disabled={!formData.name.trim() || isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// DELETE ALERT COMPONENT
// ============================================================================

function DeleteTagAlert({ isOpen, onClose, tag, onConfirm }: any) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!tag) return

    setIsDeleting(true)
    setTimeout(() => {
      onConfirm(tag.id)
      setIsDeleting(false)
      onClose()
    }, 300)
  }

  if (!tag) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Are you sure you want to delete this ticket tag?</AlertTitle>
      <AlertDescription>
        You are about to delete <strong className="text-zinc-900 dark:text-white">{tag.name}</strong>. 
        This action cannot be undone.
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

export default function TicketTagsPage() {
  const [tags, setTags] = useState(initialTicketTags)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<TicketTag | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(tags.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentTags = tags.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleView = (tag: TicketTag) => {
    setSelectedTag(tag)
    setActiveModal('view')
  }

  const handleEdit = (tag: TicketTag) => {
    setSelectedTag(tag)
    setActiveModal('edit')
  }

  const handleDelete = (tag: TicketTag) => {
    setSelectedTag(tag)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setActiveModal('add')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedTag(null)
  }

  const handleAddTag = (formData: any) => {
    const newId = tags.length > 0 ? Math.max(...tags.map(t => t.id)) + 1 : 1
    const newTag: TicketTag = { id: newId, ...formData }
    setTags((prevTags) => [...prevTags, newTag])
  }

  const handleSaveEdit = (id: number, formData: any) => {
    setTags((prevTags) =>
      prevTags.map((tag) =>
        tag.id === id ? { ...tag, ...formData } : tag
      )
    )
  }

  const handleConfirmDelete = (id: number) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id))
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Ticket Tags</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage all ticket tags in the system
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button color="dark/zinc" onClick={handleAddClick}>
              <PlusIcon />
              Add Ticket Tag
            </Button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Table Header */}
        <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
          <div className="w-[10%] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</div>
          <div className="w-[40%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Name</div>
          <div className="w-[30%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Assign To</div>
          <div className="w-[20%] text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Actions</div>
        </div>

        {/* Scrollable Table Body */}
        <div
          className="flex-1 overflow-y-auto overflow-x-auto
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar]:h-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-zinc-300
          [&::-webkit-scrollbar-thumb]:rounded-full
          dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
        >
          {tags.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
              No ticket tags found. Click "Add Ticket Tag" to create one.
            </div>
          ) : (
            currentTags.map((tag, index) => (
              <div
                key={tag.id}
                className={`flex items-center py-[1.1rem] border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                  index === currentTags.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <div className="w-[10%] pl-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">
                  {tag.id}
                </div>
                <div className="w-[40%] text-sm font-medium text-zinc-950 dark:text-white">
                  {tag.name}
                </div>
                <div className="w-[30%] text-sm text-zinc-600 dark:text-zinc-300">
                  {tag.assignTo}
                </div>
                <div className="w-[160px] px-4 flex items-center justify-center">
                  <Actions
                    onView={() => handleView(tag)}
                    onEdit={() => handleEdit(tag)}
                    onDelete={() => handleDelete(tag)}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Footer */}
        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* ALERT MODALS */}
      <AddTagAlert
        isOpen={activeModal === 'add'}
        onClose={closeModal}
        onAdd={handleAddTag}
      />

      <ViewTagAlert
        isOpen={activeModal === 'view'}
        onClose={closeModal}
        tag={selectedTag}
      />

      <EditTagAlert
        isOpen={activeModal === 'edit'}
        onClose={closeModal}
        tag={selectedTag}
        onSave={handleSaveEdit}
      />

      <DeleteTagAlert
        isOpen={activeModal === 'delete'}
        onClose={closeModal}
        tag={selectedTag}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
