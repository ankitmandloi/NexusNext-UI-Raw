'use client'

import { useState, useEffect } from 'react'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
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
// TYPES & INTERFACES
// ============================================================================

export interface Group {
  id: number
  name: string
  description: string
}

type ModalType = 'view' | 'edit' | 'delete' | 'add' | null

const ITEMS_PER_PAGE = 10

// ============================================================================
// CUSTOM ICONS
// ============================================================================

function DeleteIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <polyline points="3,6 5,6 21,6"></polyline>
      <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"></path>
    </svg>
  )
}

// ============================================================================
// INITIAL DATA
// ============================================================================

const initialGroups: Group[] = [
  { id: 1, name: 'Premium Customers', description: 'High-value customers with premium membership' },
  { id: 2, name: 'Regular Customers', description: 'Standard customers with basic membership' },
  { id: 3, name: 'Wholesale Partners', description: 'B2B wholesale partners' },
  { id: 4, name: 'Retail Partners', description: 'Retail store partners' },
  { id: 5, name: 'VIP Members', description: 'VIP loyalty program members' },
  { id: 6, name: 'New Customers', description: 'Recently onboarded customers' },
  { id: 7, name: 'Inactive Accounts', description: 'Accounts with no recent activity' },
]

// ============================================================================
// ACTION BUTTON COMPONENT
// ============================================================================

function ActionButton({ children, variant, title, onClick }: { children: React.ReactNode; variant: 'view' | 'edit' | 'delete'; title: string; onClick?: () => void }) {
  const variantStyles = {
    view: 'hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/10',
    edit: 'hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50 dark:hover:text-amber-400 dark:hover:border-amber-500/50 dark:hover:bg-amber-500/10',
    delete: 'hover:text-red-600 hover:border-red-300 hover:bg-red-50 dark:hover:text-red-400 dark:hover:border-red-500/50 dark:hover:bg-red-500/10',
  }

  return (
    <button type="button" title={title} onClick={onClick}
      className={`inline-flex items-center justify-center w-8 h-8 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-all duration-150 ease-in-out hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 ${variantStyles[variant]}`}
    >
      {children}
    </button>
  )
}

// ============================================================================
// MODAL COMPONENTS
// ============================================================================

function ViewGroupAlert({ isOpen, onClose, group }: { isOpen: boolean; onClose: () => void; group: Group | null }) {
  if (!group) return null
  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Group Details</AlertTitle>
      <AlertDescription>View the details of the selected group below.</AlertDescription>
      <AlertBody>
        <div className="space-y-3">
          <div className="flex gap-2"><span className="font-medium text-zinc-700 dark:text-zinc-300">ID:</span><span className="text-zinc-600 dark:text-zinc-400">{group.id}</span></div>
          <div className="flex gap-2"><span className="font-medium text-zinc-700 dark:text-zinc-300">Name:</span><span className="text-zinc-600 dark:text-zinc-400">{group.name}</span></div>
          <div className="flex gap-2"><span className="font-medium text-zinc-700 dark:text-zinc-300">Description:</span><span className="text-zinc-600 dark:text-zinc-400">{group.description}</span></div>
        </div>
      </AlertBody>
      <AlertActions><Button color="dark/zinc" onClick={onClose}>Close</Button></AlertActions>
    </Alert>
  )
}

function EditGroupAlert({ isOpen, onClose, group, onSave }: { isOpen: boolean; onClose: () => void; group: Group | null; onSave: (id: number, name: string, description: string) => void }) {
  const [editedName, setEditedName] = useState('')
  const [editedDescription, setEditedDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (group && isOpen) {
      setEditedName(group.name)
      setEditedDescription(group.description)
    }
  }, [group, isOpen])

  const handleSave = () => {
    if (!group || !editedName.trim()) return
    setIsSubmitting(true)
    setTimeout(() => { onSave(group.id, editedName.trim(), editedDescription.trim()); setIsSubmitting(false); onClose() }, 300)
  }

  const handleCancel = () => { setEditedName(''); setEditedDescription(''); onClose() }
  if (!group) return null

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Edit Group</AlertTitle>
      <AlertDescription>Update the group details below.</AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Group Name</label>
            <Input value={editedName} onChange={(e) => setEditedName(e.target.value)} placeholder="Enter group name" autoFocus />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Description</label>
            <Input value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} placeholder="Enter description" />
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>Cancel</Button>
        <Button color="dark/zinc" onClick={handleSave} disabled={!editedName.trim() || isSubmitting}>{isSubmitting ? 'Saving...' : 'Save'}</Button>
      </AlertActions>
    </Alert>
  )
}

function AddGroupAlert({ isOpen, onClose, onAdd }: { isOpen: boolean; onClose: () => void; onAdd: (name: string, description: string) => void }) {
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => { if (!isOpen) { setNewName(''); setNewDescription('') } }, [isOpen])

  const handleAdd = () => {
    if (!newName.trim()) return
    setIsSubmitting(true)
    setTimeout(() => { onAdd(newName.trim(), newDescription.trim()); setIsSubmitting(false); setNewName(''); setNewDescription(''); onClose() }, 300)
  }

  const handleCancel = () => { setNewName(''); setNewDescription(''); onClose() }

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Add New Group</AlertTitle>
      <AlertDescription>Enter the details of the new group below.</AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Group Name</label>
            <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Enter group name" autoFocus />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Description</label>
            <Input value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Enter description" />
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>Cancel</Button>
        <Button color="dark/zinc" onClick={handleAdd} disabled={!newName.trim() || isSubmitting}>{isSubmitting ? 'Adding...' : 'Add'}</Button>
      </AlertActions>
    </Alert>
  )
}

function DeleteGroupAlert({ isOpen, onClose, group, onConfirm }: { isOpen: boolean; onClose: () => void; group: Group | null; onConfirm: (id: number) => void }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDelete = () => { if (!group) return; setIsDeleting(true); setTimeout(() => { onConfirm(group.id); setIsDeleting(false); onClose() }, 300) }
  if (!group) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Are you sure you want to delete this group?</AlertTitle>
      <AlertDescription>You are about to delete <strong className="text-zinc-900 dark:text-white">{group.name}</strong>. This action cannot be undone.</AlertDescription>
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

export default function GroupPage() {
  const [groups, setGroups] = useState<Group[]>(initialGroups)
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(groups.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentGroups = groups.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => setCurrentPage(page)
  const handleView = (g: Group) => { setSelectedGroup(g); setActiveModal('view') }
  const handleEdit = (g: Group) => { setSelectedGroup(g); setActiveModal('edit') }
  const handleDelete = (g: Group) => { setSelectedGroup(g); setActiveModal('delete') }
  const handleAddClick = () => setActiveModal('add')
  const closeModal = () => { setActiveModal(null); setSelectedGroup(null) }

  const handleImportExcel = () => console.log('Import from Excel clicked')
  const handleExportExcel = () => console.log('Export to Excel clicked')
  const handleDownloadFormat = () => console.log('Download Format clicked')

  const handleAddGroup = (name: string, description: string) => {
    const newId = groups.length > 0 ? Math.max(...groups.map(g => g.id)) + 1 : 1
    setGroups(prev => [...prev, { id: newId, name, description }])
  }

  const handleSaveEdit = (id: number, name: string, description: string) => {
    setGroups(prev => prev.map(g => g.id === id ? { ...g, name, description } : g))
  }

  const handleConfirmDelete = (id: number) => {
    setGroups(prev => prev.filter(g => g.id !== id))
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Groups</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Manage all groups in the system</div>
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
            <Button color="dark/zinc" onClick={handleAddClick}><PlusIcon />Add Group</Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        <div className="flex-1 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
          <div className="min-w-[700px] flex flex-col h-full">
            <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
              <div className="w-[80px] px-6 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">ID</div>
              <div className="w-[200px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Name</div>
              <div className="flex-1 px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Description</div>
              <div className="w-[160px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Actions</div>
            </div>

            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
              {groups.length === 0 ? (
                <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">No groups found. Click "Add Group" to create one.</div>
              ) : (
                currentGroups.map((group, index) => (
                  <div key={group.id} className={`flex items-center py-4 border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${index === currentGroups.length - 1 ? 'border-b-0' : ''}`}>
                    <div className="w-[80px] px-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums text-center">{group.id}</div>
                    <div className="w-[200px] px-4 text-sm font-medium text-zinc-950 dark:text-white text-center">{group.name}</div>
                    <div className="flex-1 px-4 text-sm text-zinc-600 dark:text-zinc-400 text-center truncate">{group.description}</div>
                    <div className="w-[160px] px-4 flex items-center justify-center gap-3">
                      <ActionButton variant="view" title="View" onClick={() => handleView(group)}><EyeIcon className="w-4 h-4" /></ActionButton>
                      <ActionButton variant="edit" title="Edit" onClick={() => handleEdit(group)}><PencilSquareIcon className="w-4 h-4" /></ActionButton>
                      <ActionButton variant="delete" title="Delete" onClick={() => handleDelete(group)}><DeleteIcon className="w-4 h-4" /></ActionButton>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center border-t border-zinc-950/5 dark:border-white/5 px-4 h-11 shrink-0">
          <Pagination>
            <button onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">← Previous</button>
            <PaginationList>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => handlePageChange(page)} className={`px-3 py-1 mx-1 text-sm rounded ${page === currentPage ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>{page}</button>
              ))}
            </PaginationList>
            <button onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">Next →</button>
          </Pagination>
        </div>
      </div>

      <AddGroupAlert isOpen={activeModal === 'add'} onClose={closeModal} onAdd={handleAddGroup} />
      <ViewGroupAlert isOpen={activeModal === 'view'} onClose={closeModal} group={selectedGroup} />
      <EditGroupAlert isOpen={activeModal === 'edit'} onClose={closeModal} group={selectedGroup} onSave={handleSaveEdit} />
      <DeleteGroupAlert isOpen={activeModal === 'delete'} onClose={closeModal} group={selectedGroup} onConfirm={handleConfirmDelete} />
    </div>
  )
}
