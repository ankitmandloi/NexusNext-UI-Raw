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
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from '@/components/pagination'
import { PlusIcon, EyeIcon, PencilSquareIcon, ChevronDownIcon } from '@heroicons/react/16/solid'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface GroupEntity {
  id: number
  name: string
}

export interface GroupTag {
  id: number
  groupId: number
  groupName: string
  tagName: string
}

type ModalType = 'view' | 'edit' | 'delete' | 'add' | null

// ============================================================================
// CUSTOM ICON
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
// SAMPLE DATA
// ============================================================================

const initialGroups: GroupEntity[] = [
  { id: 1, name: 'Retail' },
  { id: 2, name: 'Wholesale' },
  { id: 3, name: 'Corporate' },
  { id: 4, name: 'Government' },
]

const initialGroupTags: GroupTag[] = [
  { id: 1, groupId: 1, groupName: 'Retail', tagName: 'Seasonal' },
  { id: 2, groupId: 1, groupName: 'Retail', tagName: 'Online' },
  { id: 3, groupId: 2, groupName: 'Wholesale', tagName: 'Bulk' },
  { id: 4, groupId: 3, groupName: 'Corporate', tagName: 'Enterprise' },
]

// ============================================================================
// ACTION BUTTON
// ============================================================================

function ActionButton({ children, variant, title, onClick }: { children: React.ReactNode; variant: 'view' | 'edit' | 'delete'; title: string; onClick?: () => void }) {
  const variantStyles = {
    view: 'hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/10',
    edit: 'hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50 dark:hover:text-amber-400 dark:hover:border-amber-500/50 dark:hover:bg-amber-500/10',
    delete: 'hover:text-red-600 hover:border-red-300 hover:bg-red-50 dark:hover:text-red-400 dark:hover:border-red-500/50 dark:hover:bg-red-500/10',
  }

  return (
    <button type="button" title={title} onClick={onClick} className={`inline-flex items-center justify-center w-8 h-8 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-all duration-150 ease-in-out hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 ${variantStyles[variant]}`}>
      {children}
    </button>
  )
}

// ============================================================================
// VIEW ALERT
// ============================================================================

function ViewGroupTagAlert({ isOpen, onClose, tag }: { isOpen: boolean; onClose: () => void; tag: GroupTag | null }) {
  if (!tag) return null
  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Group Tag Details</AlertTitle>
      <AlertDescription>View details of the selected group tag below.</AlertDescription>
      <AlertBody>
        <div className="space-y-3">
          <div className="flex gap-2"><span className="font-medium text-zinc-700 dark:text-zinc-300">ID:</span><span className="text-zinc-600 dark:text-zinc-400">{tag.id}</span></div>
          <div className="flex gap-2"><span className="font-medium text-zinc-700 dark:text-zinc-300">Group:</span><span className="text-zinc-600 dark:text-zinc-400">{tag.groupName}</span></div>
          <div className="flex gap-2"><span className="font-medium text-zinc-700 dark:text-zinc-300">Group Tag Name:</span><span className="text-zinc-600 dark:text-zinc-400">{tag.tagName}</span></div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button color="dark/zinc" onClick={onClose}>Close</Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// EDIT ALERT
// ============================================================================

function EditGroupTagAlert({ isOpen, onClose, tag, groups, onSave }: { isOpen: boolean; onClose: () => void; tag: GroupTag | null; groups: GroupEntity[]; onSave: (id: number, groupId: number, groupName: string, tagName: string) => void }) {
  const [editedGroupId, setEditedGroupId] = useState<number>(0)
  const [editedTagName, setEditedTagName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (tag && isOpen) {
      setEditedGroupId(tag.groupId)
      setEditedTagName(tag.tagName)
    }
  }, [tag, isOpen])

  const handleSave = () => {
    if (!tag || editedGroupId === 0 || !editedTagName.trim()) return
    setIsSubmitting(true)
    const groupName = groups.find(g => g.id === editedGroupId)?.name || ''
    setTimeout(() => {
      onSave(tag.id, editedGroupId, groupName, editedTagName.trim())
      setIsSubmitting(false)
      onClose()
    }, 300)
  }

  const handleCancel = () => { setEditedGroupId(0); setEditedTagName(''); onClose() }

  if (!tag) return null
  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Edit Group Tag</AlertTitle>
      <AlertDescription>Update the group and tag name below.</AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Group</label>
            <select value={editedGroupId} onChange={(e) => setEditedGroupId(parseInt(e.target.value))} className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
              <option value={0}>Select a group</option>
              {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Group Tag Name</label>
            <Input value={editedTagName} onChange={(e) => setEditedTagName(e.target.value)} placeholder="Enter group tag name" autoFocus />
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>Cancel</Button>
        <Button color="dark/zinc" onClick={handleSave} disabled={isSubmitting || editedGroupId === 0 || !editedTagName.trim()}>{isSubmitting ? 'Saving...' : 'Save'}</Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// ADD ALERT
// ============================================================================

function AddGroupTagAlert({ isOpen, onClose, groups, onAdd }: { isOpen: boolean; onClose: () => void; groups: GroupEntity[]; onAdd: (groupId: number, groupName: string, tagName: string) => void }) {
  const [selectedGroupId, setSelectedGroupId] = useState<number>(0)
  const [newTagName, setNewTagName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => { if (!isOpen) { setSelectedGroupId(0); setNewTagName('') } }, [isOpen])

  const handleAdd = () => {
    if (selectedGroupId === 0 || !newTagName.trim()) return
    setIsSubmitting(true)
    const groupName = groups.find(g => g.id === selectedGroupId)?.name || ''
    setTimeout(() => {
      onAdd(selectedGroupId, groupName, newTagName.trim())
      setIsSubmitting(false)
      setSelectedGroupId(0)
      setNewTagName('')
      onClose()
    }, 300)
  }

  const handleCancel = () => { setSelectedGroupId(0); setNewTagName(''); onClose() }

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Add Group Tag</AlertTitle>
      <AlertDescription>Select a group and provide the group tag name.</AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Group</label>
            <select value={selectedGroupId} onChange={(e) => setSelectedGroupId(parseInt(e.target.value))} className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" autoFocus>
              <option value={0}>Select a group</option>
              {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Group Tag Name</label>
            <Input value={newTagName} onChange={(e) => setNewTagName(e.target.value)} placeholder="Enter group tag name" />
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>Cancel</Button>
        <Button color="dark/zinc" onClick={handleAdd} disabled={isSubmitting || selectedGroupId === 0 || !newTagName.trim()}>{isSubmitting ? 'Adding...' : 'Add'}</Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// DELETE ALERT
// ============================================================================

function DeleteGroupTagAlert({ isOpen, onClose, tag, onConfirm }: { isOpen: boolean; onClose: () => void; tag: GroupTag | null; onConfirm: (id: number) => void }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDelete = () => { if (!tag) return; setIsDeleting(true); setTimeout(() => { onConfirm(tag.id); setIsDeleting(false); onClose() }, 300) }

  if (!tag) return null
  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Are you sure you want to delete this group tag?</AlertTitle>
      <AlertDescription>
        You are about to delete <strong className="text-zinc-900 dark:text-white">{tag.tagName}</strong> from <strong className="text-zinc-900 dark:text-white">{tag.groupName}</strong>. This action cannot be undone.
      </AlertDescription>
      <AlertActions>
        <Button plain onClick={onClose} disabled={isDeleting}>Cancel</Button>
        <Button color="red" onClick={handleDelete} disabled={isDeleting}>{isDeleting ? 'Deleting...' : 'Yes, Delete'}</Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function GroupTagPage() {
  const [groupTags, setGroupTags] = useState<GroupTag[]>(initialGroupTags)
  const [groups] = useState<GroupEntity[]>(initialGroups)

  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [selectedTag, setSelectedTag] = useState<GroupTag | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.max(1, Math.ceil(groupTags.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentTags = groupTags.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => setCurrentPage(page)

  const handleView = (t: GroupTag) => { setSelectedTag(t); setActiveModal('view') }
  const handleEdit = (t: GroupTag) => { setSelectedTag(t); setActiveModal('edit') }
  const handleDelete = (t: GroupTag) => { setSelectedTag(t); setActiveModal('delete') }
  const handleAddClick = () => setActiveModal('add')
  const closeModal = () => { setActiveModal(null); setSelectedTag(null) }

  const handleImportExcel = () => console.log('Import from Excel clicked')
  const handleExportExcel = () => console.log('Export to Excel clicked')
  const handleDownloadFormat = () => console.log('Download Format clicked')

  const handleAddTag = (groupId: number, groupName: string, tagName: string) => {
    const newId = groupTags.length > 0 ? Math.max(...groupTags.map(g => g.id)) + 1 : 1
    setGroupTags(prev => [...prev, { id: newId, groupId, groupName, tagName }])
  }

  const handleSaveEdit = (id: number, groupId: number, groupName: string, tagName: string) => {
    setGroupTags(prev => prev.map(g => g.id === id ? { ...g, groupId, groupName, tagName } : g))
  }

  const handleConfirmDelete = (id: number) => {
    setGroupTags(prev => prev.filter(g => g.id !== id))
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Group Tags</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Manage group tags and their parent group</div>
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
            <Button color="dark/zinc" onClick={handleAddClick}><PlusIcon />Add Group Tag</Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
          <div className="w-[10%] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</div>
          <div className="w-[40%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Group Tag Name</div>
          <div className="w-[30%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Group</div>
          <div className="w-[20%] text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Actions</div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
          {groupTags.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">No group tags found. Click "Add Group Tag" to create one.</div>
          ) : (
            currentTags.map((t, index) => (
              <div key={t.id} className={`flex items-center py-[1.1rem] border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${index === currentTags.length - 1 ? 'border-b-0' : ''}`}>
                <div className="w-[10%] pl-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">{t.id}</div>
                <div className="w-[40%] text-sm font-medium text-zinc-950 dark:text-white">{t.tagName}</div>
                <div className="w-[30%] text-sm font-medium text-zinc-950 dark:text-white">{t.groupName}</div>
                <div className="w-[20%] flex items-center justify-center gap-2">
                  <ActionButton variant="view" title="View" onClick={() => handleView(t)}><EyeIcon className="w-4 h-4" /></ActionButton>
                  <ActionButton variant="edit" title="Edit" onClick={() => handleEdit(t)}><PencilSquareIcon className="w-4 h-4" /></ActionButton>
                  <ActionButton variant="delete" title="Delete" onClick={() => handleDelete(t)}><DeleteIcon className="w-4 h-4" /></ActionButton>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-center border-t border-zinc-950/5 dark:border-white/5 px-4 h-11 shrink-0">
          <Pagination>
            <button onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">← Previous</button>
            <PaginationList>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button key={page} onClick={() => handlePageChange(page)} className={`px-3 py-1 mx-1 text-sm rounded ${page === currentPage ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>{page}</button>
              ))}
            </PaginationList>
            <button onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">Next →</button>
          </Pagination>
        </div>
      </div>

      <AddGroupTagAlert isOpen={activeModal === 'add'} onClose={closeModal} groups={groups} onAdd={handleAddTag} />
      <ViewGroupTagAlert isOpen={activeModal === 'view'} onClose={closeModal} tag={selectedTag} />
      <EditGroupTagAlert isOpen={activeModal === 'edit'} onClose={closeModal} tag={selectedTag} groups={groups} onSave={handleSaveEdit} />
      <DeleteGroupTagAlert isOpen={activeModal === 'delete'} onClose={closeModal} tag={selectedTag} onConfirm={handleConfirmDelete} />
    </div>
  )
}
