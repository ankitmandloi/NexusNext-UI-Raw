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

type Role = {
  id: number
  title: string
}

const initialRoles: Role[] = [
  { id: 1, title: 'Super Admin' },
  { id: 2, title: 'Admin' },
  { id: 3, title: 'Client Employee' },
  { id: 4, title: 'Customer' },
  { id: 5, title: 'Client Admin' },
  { id: 6, title: 'DMS' },
  { id: 7, title: 'HR' },
]

// ============================================================================
// VIEW ALERT COMPONENT
// ============================================================================

function ViewRoleAlert({ isOpen, onClose, role }: any) {
  if (!role) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Role Details</AlertTitle>
      <AlertDescription>View the complete details of the selected role below.</AlertDescription>
      <AlertBody>
        <div className="space-y-3">
          <div>
            <span className="font-medium text-zinc-700 dark:text-zinc-300 block">ID</span>
            <span className="text-zinc-600 dark:text-zinc-400">{role.id}</span>
          </div>
          <div>
            <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Title</span>
            <span className="text-zinc-600 dark:text-zinc-400">{role.title}</span>
          </div>
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

function EditRoleAlert({ isOpen, onClose, role, onSave }: any) {
  const [title, setTitle] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (role && isOpen) {
      setTitle(role.title)
    }
  }, [role, isOpen])

  const handleSave = async () => {
    if (!role || !title.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      onSave(role.id, { title })
      setIsSubmitting(false)
      onClose()
    }, 300)
  }

  const handleCancel = () => {
    onClose()
  }

  if (!role) return null

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Edit Role</AlertTitle>
      <AlertDescription>Update the role information below.</AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="editTitle" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Title
            </label>
            <Input
              id="editTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter role title"
              autoFocus
            />
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button color="dark/zinc" onClick={handleSave} disabled={!title.trim() || isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// ADD ROLE ALERT COMPONENT
// ============================================================================

function AddRoleAlert({ isOpen, onClose, onAdd }: any) {
  const [title, setTitle] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setTitle('')
    }
  }, [isOpen])

  const handleAdd = async () => {
    if (!title.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      onAdd({ title })
      setIsSubmitting(false)
      onClose()
    }, 300)
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Add Role</AlertTitle>
      <AlertDescription>Fill in the details to create a new role.</AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="newTitle" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Title
            </label>
            <Input
              id="newTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter role title"
              autoFocus
            />
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button color="dark/zinc" onClick={handleAdd} disabled={!title.trim() || isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// DELETE ALERT COMPONENT
// ============================================================================

function DeleteRoleAlert({ isOpen, onClose, role, onConfirm }: any) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!role) return

    setIsDeleting(true)
    setTimeout(() => {
      onConfirm(role.id)
      setIsDeleting(false)
      onClose()
    }, 300)
  }

  if (!role) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Are you sure you want to delete this role?</AlertTitle>
      <AlertDescription>
        You are about to delete <strong className="text-zinc-900 dark:text-white">{role.title}</strong>. This action
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

export default function RolesPage() {
  const [roles, setRoles] = useState(initialRoles)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(roles.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentRoles = roles.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleView = (role: Role) => {
    setSelectedRole(role)
    setActiveModal('view')
  }

  const handleEdit = (role: Role) => {
    setSelectedRole(role)
    setActiveModal('edit')
  }

  const handleDelete = (role: Role) => {
    setSelectedRole(role)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setActiveModal('add')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedRole(null)
  }

  const handleAddRole = (formData: any) => {
    const newId = roles.length > 0 ? Math.max(...roles.map((r) => r.id)) + 1 : 1
    const newRole: Role = { id: newId, title: formData.title }
    setRoles((prevRoles) => [...prevRoles, newRole])
  }

  const handleSaveEdit = (id: number, formData: any) => {
    setRoles((prevRoles) => prevRoles.map((role) => (role.id === id ? { ...role, ...formData } : role)))
  }

  const handleConfirmDelete = (id: number) => {
    setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id))
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Roles</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Manage user roles in the system</div>
          </div>
          <div className="flex items-center gap-3">
            <Button color="dark/zinc" onClick={handleAddClick}>
              <PlusIcon />
              Add Role
            </Button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="flex flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden">
        {/* Content Container */}
        <div className="overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:h-0">
          <div style={{ minWidth: '600px' }}>
            {/* Sticky Table Header */}
            <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900 sticky top-0 z-10">
              <div className="w-[100px] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</div>
              <div className="flex-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">Title</div>
              <div className="w-[160px] text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Actions</div>
            </div>

            {/* Scrollable Table Body */}
            {roles.length === 0 ? (
              <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
                No roles found. Click "Add Role" to create one.
              </div>
            ) : (
              currentRoles.map((role, index) => (
                <div
                  key={role.id}
                  className={`flex items-center py-[1.1rem] border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                    index === currentRoles.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <div className="w-[100px] pl-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">
                    {role.id}
                  </div>
                  <div className="flex-1 text-sm font-medium text-zinc-950 dark:text-white">{role.title}</div>
                  <div className="w-[160px] px-4 flex items-center justify-center">
                    <Actions
                      onView={() => handleView(role)}
                      onEdit={() => handleEdit(role)}
                      onDelete={() => handleDelete(role)}
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
            <div style={{ width: '600px', height: '1px' }}></div>
          </div>
        </div>

        {/* Pagination Footer */}
        <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

      {/* ALERT MODALS */}
      <AddRoleAlert isOpen={activeModal === 'add'} onClose={closeModal} onAdd={handleAddRole} />

      <ViewRoleAlert isOpen={activeModal === 'view'} onClose={closeModal} role={selectedRole} />

      <EditRoleAlert isOpen={activeModal === 'edit'} onClose={closeModal} role={selectedRole} onSave={handleSaveEdit} />

      <DeleteRoleAlert
        isOpen={activeModal === 'delete'}
        onClose={closeModal}
        role={selectedRole}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
