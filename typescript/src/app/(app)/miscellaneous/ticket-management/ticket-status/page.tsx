'use client'

import { useState, useEffect } from 'react'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import Actions from '../../../basic-master/address-master/common/components/Actions.jsx'
import CommonPagination from '../../../basic-master/address-master/common/components/Pagination.jsx'
import { PlusIcon } from '@heroicons/react/16/solid'

// ============================================================================
// INITIAL DATA
// ============================================================================
const ITEMS_PER_PAGE = 10

const initialTicketStatuses = [
  { id: 1, name: 'Open' },
  { id: 2, name: 'In progress' },
  { id: 3, name: 'Closed' },
]

// ============================================================================
// VIEW ALERT COMPONENT
// ============================================================================

function ViewStatusAlert({ isOpen, onClose, status }: any) {
  if (!status) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Ticket Status Details</AlertTitle>
      <AlertDescription>
        View the details of the selected ticket status below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-3">
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">ID:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{status.id}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Status Name:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{status.name}</span>
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

function EditStatusAlert({ isOpen, onClose, status, onSave }: any) {
  const [editedName, setEditedName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (status && isOpen) {
      setEditedName(status.name)
    }
  }, [status, isOpen])

  const handleSave = async () => {
    if (!status || !editedName.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      onSave(status.id, editedName.trim())
      setIsSubmitting(false)
      onClose()
    }, 300)
  }

  const handleCancel = () => {
    setEditedName('')
    onClose()
  }

  if (!status) return null

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Edit Ticket Status</AlertTitle>
      <AlertDescription>
        Update the ticket status name below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-2">
          <label htmlFor="editStatusName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Status Name
          </label>
          <Input
            id="editStatusName"
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            placeholder="Enter status name"
            autoFocus
          />
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button color="dark/zinc" onClick={handleSave} disabled={!editedName.trim() || isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// ADD STATUS ALERT COMPONENT
// ============================================================================

function AddStatusAlert({ isOpen, onClose, onAdd }: any) {
  const [newStatusName, setNewStatusName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setNewStatusName('')
    }
  }, [isOpen])

  const handleAdd = async () => {
    if (!newStatusName.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      onAdd(newStatusName.trim())
      setIsSubmitting(false)
      setNewStatusName('')
      onClose()
    }, 300)
  }

  const handleCancel = () => {
    setNewStatusName('')
    onClose()
  }

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Add New Ticket Status</AlertTitle>
      <AlertDescription>
        Enter the name of the new ticket status below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-2">
          <label htmlFor="newStatusName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Status Name
          </label>
          <Input
            id="newStatusName"
            type="text"
            value={newStatusName}
            onChange={(e) => setNewStatusName(e.target.value)}
            placeholder="Enter status name"
            autoFocus
          />
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button color="dark/zinc" onClick={handleAdd} disabled={!newStatusName.trim() || isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// DELETE ALERT COMPONENT
// ============================================================================

function DeleteStatusAlert({ isOpen, onClose, status, onConfirm }: any) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!status) return

    setIsDeleting(true)
    setTimeout(() => {
      onConfirm(status.id)
      setIsDeleting(false)
      onClose()
    }, 300)
  }

  if (!status) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Are you sure you want to delete this ticket status?</AlertTitle>
      <AlertDescription>
        You are about to delete <strong className="text-zinc-900 dark:text-white">{status.name}</strong>. 
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

export default function TicketStatusPage() {
  const [statuses, setStatuses] = useState(initialTicketStatuses)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(statuses.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentStatuses = statuses.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleView = (status: any) => {
    setSelectedStatus(status)
    setActiveModal('view')
  }

  const handleEdit = (status: any) => {
    setSelectedStatus(status)
    setActiveModal('edit')
  }

  const handleDelete = (status: any) => {
    setSelectedStatus(status)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setActiveModal('add')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedStatus(null)
  }

  const handleAddStatus = (name: string) => {
    const newId = statuses.length > 0 ? Math.max(...statuses.map(s => s.id)) + 1 : 1
    const newStatus = { id: newId, name }
    setStatuses((prevStatuses) => [...prevStatuses, newStatus])
  }

  const handleSaveEdit = (id: number, newName: string) => {
    setStatuses((prevStatuses) =>
      prevStatuses.map((status) =>
        status.id === id ? { ...status, name: newName } : status
      )
    )
  }

  const handleConfirmDelete = (id: number) => {
    setStatuses((prevStatuses) => prevStatuses.filter((status) => status.id !== id))
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Ticket Status</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage all ticket statuses in the system
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button color="dark/zinc" onClick={handleAddClick}>
              <PlusIcon />
              Add Status
            </Button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Table Header */}
        <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
          <div className="w-[15%] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</div>
          <div className="w-[55%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Status Name</div>
          <div className="w-[30%] text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Actions</div>
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
          {statuses.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
              No ticket statuses found. Click "Add Status" to create one.
            </div>
          ) : (
            currentStatuses.map((status, index) => (
              <div
                key={status.id}
                className={`flex items-center py-[1.1rem] border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                  index === currentStatuses.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <div className="w-[15%] pl-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">
                  {status.id}
                </div>
                <div className="w-[55%] text-sm font-medium text-zinc-950 dark:text-white">
                  {status.name}
                </div>
                <div className="w-[160px] px-4 flex items-center justify-center">
                  <Actions
                    onView={() => handleView(status)}
                    onEdit={() => handleEdit(status)}
                    onDelete={() => handleDelete(status)}
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
      <AddStatusAlert
        isOpen={activeModal === 'add'}
        onClose={closeModal}
        onAdd={handleAddStatus}
      />

      <ViewStatusAlert
        isOpen={activeModal === 'view'}
        onClose={closeModal}
        status={selectedStatus}
      />

      <EditStatusAlert
        isOpen={activeModal === 'edit'}
        onClose={closeModal}
        status={selectedStatus}
        onSave={handleSaveEdit}
      />

      <DeleteStatusAlert
        isOpen={activeModal === 'delete'}
        onClose={closeModal}
        status={selectedStatus}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
