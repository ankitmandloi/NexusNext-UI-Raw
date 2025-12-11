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

export interface State {
  id: number
  name: string
}

export interface District {
  id: number
  stateId: number
  stateName: string
  districtName: string
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

const initialStates: State[] = [
  { id: 1, name: 'Madhya Pradesh' },
  { id: 2, name: 'Maharashtra' },
  { id: 3, name: 'Gujarat' },
  { id: 4, name: 'Rajasthan' },
]

const initialDistricts: District[] = [
  { id: 1, stateId: 1, stateName: 'Madhya Pradesh', districtName: 'Indore' },
  { id: 2, stateId: 1, stateName: 'Madhya Pradesh', districtName: 'Bhopal' },
  { id: 3, stateId: 1, stateName: 'Madhya Pradesh', districtName: 'Gwalior' },
  { id: 4, stateId: 2, stateName: 'Maharashtra', districtName: 'Mumbai' },
  { id: 5, stateId: 2, stateName: 'Maharashtra', districtName: 'Pune' },
  { id: 6, stateId: 2, stateName: 'Maharashtra', districtName: 'Nashik' },
  { id: 7, stateId: 3, stateName: 'Gujarat', districtName: 'Ahmedabad' },
  { id: 8, stateId: 3, stateName: 'Gujarat', districtName: 'Surat' },
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

function ViewDistrictAlert({ isOpen, onClose, district }: { isOpen: boolean; onClose: () => void; district: District | null }) {
  if (!district) return null
  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>District Details</AlertTitle>
      <AlertDescription>View the details of the selected district below.</AlertDescription>
      <AlertBody>
        <div className="space-y-3">
          <div className="flex gap-2"><span className="font-medium text-zinc-700 dark:text-zinc-300">ID:</span><span className="text-zinc-600 dark:text-zinc-400">{district.id}</span></div>
          <div className="flex gap-2"><span className="font-medium text-zinc-700 dark:text-zinc-300">State:</span><span className="text-zinc-600 dark:text-zinc-400">{district.stateName}</span></div>
          <div className="flex gap-2"><span className="font-medium text-zinc-700 dark:text-zinc-300">District Name:</span><span className="text-zinc-600 dark:text-zinc-400">{district.districtName}</span></div>
        </div>
      </AlertBody>
      <AlertActions><Button color="dark/zinc" onClick={onClose}>Close</Button></AlertActions>
    </Alert>
  )
}

function EditDistrictAlert({ isOpen, onClose, district, states, onSave }: { isOpen: boolean; onClose: () => void; district: District | null; states: State[]; onSave: (id: number, stateId: number, stateName: string, districtName: string) => void }) {
  const [editedStateId, setEditedStateId] = useState<number>(0)
  const [editedDistrictName, setEditedDistrictName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (district && isOpen) {
      setEditedStateId(district.stateId)
      setEditedDistrictName(district.districtName)
    }
  }, [district, isOpen])

  const handleSave = () => {
    if (!district || !editedDistrictName.trim() || editedStateId === 0) return
    setIsSubmitting(true)
    const stateName = states.find(s => s.id === editedStateId)?.name || ''
    setTimeout(() => { onSave(district.id, editedStateId, stateName, editedDistrictName.trim()); setIsSubmitting(false); onClose() }, 300)
  }

  const handleCancel = () => { setEditedStateId(0); setEditedDistrictName(''); onClose() }
  if (!district) return null

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Edit District</AlertTitle>
      <AlertDescription>Update the district details below.</AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">State</label>
            <select value={editedStateId} onChange={(e) => setEditedStateId(parseInt(e.target.value))} className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value={0}>Select a state</option>
              {states.map((state) => (<option key={state.id} value={state.id}>{state.name}</option>))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">District Name</label>
            <Input value={editedDistrictName} onChange={(e) => setEditedDistrictName(e.target.value)} placeholder="Enter district name" autoFocus />
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>Cancel</Button>
        <Button color="dark/zinc" onClick={handleSave} disabled={!editedDistrictName.trim() || editedStateId === 0 || isSubmitting}>{isSubmitting ? 'Saving...' : 'Save'}</Button>
      </AlertActions>
    </Alert>
  )
}

function AddDistrictAlert({ isOpen, onClose, states, onAdd }: { isOpen: boolean; onClose: () => void; states: State[]; onAdd: (stateId: number, stateName: string, districtName: string) => void }) {
  const [selectedStateId, setSelectedStateId] = useState<number>(0)
  const [newDistrictName, setNewDistrictName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => { if (!isOpen) { setSelectedStateId(0); setNewDistrictName('') } }, [isOpen])

  const handleAdd = () => {
    if (!newDistrictName.trim() || selectedStateId === 0) return
    setIsSubmitting(true)
    const stateName = states.find(s => s.id === selectedStateId)?.name || ''
    setTimeout(() => { onAdd(selectedStateId, stateName, newDistrictName.trim()); setIsSubmitting(false); setSelectedStateId(0); setNewDistrictName(''); onClose() }, 300)
  }

  const handleCancel = () => { setSelectedStateId(0); setNewDistrictName(''); onClose() }

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Add New District</AlertTitle>
      <AlertDescription>Enter the details of the new district below.</AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">State</label>
            <select value={selectedStateId} onChange={(e) => setSelectedStateId(parseInt(e.target.value))} className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" autoFocus>
              <option value={0}>Select a state</option>
              {states.map((state) => (<option key={state.id} value={state.id}>{state.name}</option>))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">District Name</label>
            <Input value={newDistrictName} onChange={(e) => setNewDistrictName(e.target.value)} placeholder="Enter district name" />
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>Cancel</Button>
        <Button color="dark/zinc" onClick={handleAdd} disabled={!newDistrictName.trim() || selectedStateId === 0 || isSubmitting}>{isSubmitting ? 'Adding...' : 'Add'}</Button>
      </AlertActions>
    </Alert>
  )
}

function DeleteDistrictAlert({ isOpen, onClose, district, onConfirm }: { isOpen: boolean; onClose: () => void; district: District | null; onConfirm: (id: number) => void }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDelete = () => { if (!district) return; setIsDeleting(true); setTimeout(() => { onConfirm(district.id); setIsDeleting(false); onClose() }, 300) }
  if (!district) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Are you sure you want to delete this district?</AlertTitle>
      <AlertDescription>You are about to delete <strong className="text-zinc-900 dark:text-white">{district.districtName}</strong> from <strong className="text-zinc-900 dark:text-white">{district.stateName}</strong>. This action cannot be undone.</AlertDescription>
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

export default function DistrictPage() {
  const [districts, setDistricts] = useState<District[]>(initialDistricts)
  const [states] = useState<State[]>(initialStates)
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(districts.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentDistricts = districts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => setCurrentPage(page)
  const handleView = (d: District) => { setSelectedDistrict(d); setActiveModal('view') }
  const handleEdit = (d: District) => { setSelectedDistrict(d); setActiveModal('edit') }
  const handleDelete = (d: District) => { setSelectedDistrict(d); setActiveModal('delete') }
  const handleAddClick = () => setActiveModal('add')
  const closeModal = () => { setActiveModal(null); setSelectedDistrict(null) }

  const handleImportExcel = () => console.log('Import from Excel clicked')
  const handleExportExcel = () => console.log('Export to Excel clicked')
  const handleDownloadFormat = () => console.log('Download Format clicked')

  const handleAddDistrict = (stateId: number, stateName: string, districtName: string) => {
    const newId = districts.length > 0 ? Math.max(...districts.map(d => d.id)) + 1 : 1
    setDistricts(prev => [...prev, { id: newId, stateId, stateName, districtName }])
  }

  const handleSaveEdit = (id: number, stateId: number, stateName: string, districtName: string) => {
    setDistricts(prev => prev.map(d => d.id === id ? { ...d, stateId, stateName, districtName } : d))
  }

  const handleConfirmDelete = (id: number) => {
    setDistricts(prev => prev.filter(d => d.id !== id))
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Districts</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Manage all districts in the system</div>
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
            <Button color="dark/zinc" onClick={handleAddClick}><PlusIcon />Add District</Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        <div className="flex-1 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
          <div className="min-w-[700px] flex flex-col h-full">
            <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
              <div className="w-[100px] px-6 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">ID</div>
              <div className="flex-1 px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">State</div>
              <div className="flex-1 px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">District Name</div>
              <div className="w-[160px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Actions</div>
            </div>

            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
              {districts.length === 0 ? (
                <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">No districts found. Click "Add District" to create one.</div>
              ) : (
                currentDistricts.map((district, index) => (
                  <div key={district.id} className={`flex items-center py-4 border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${index === currentDistricts.length - 1 ? 'border-b-0' : ''}`}>
                    <div className="w-[100px] px-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums text-center">{district.id}</div>
                    <div className="flex-1 px-4 text-sm font-medium text-zinc-950 dark:text-white text-center">{district.stateName}</div>
                    <div className="flex-1 px-4 text-sm font-medium text-zinc-950 dark:text-white text-center">{district.districtName}</div>
                    <div className="w-[160px] px-4 flex items-center justify-center gap-3">
                      <ActionButton variant="view" title="View" onClick={() => handleView(district)}><EyeIcon className="w-4 h-4" /></ActionButton>
                      <ActionButton variant="edit" title="Edit" onClick={() => handleEdit(district)}><PencilSquareIcon className="w-4 h-4" /></ActionButton>
                      <ActionButton variant="delete" title="Delete" onClick={() => handleDelete(district)}><DeleteIcon className="w-4 h-4" /></ActionButton>
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

      <AddDistrictAlert isOpen={activeModal === 'add'} onClose={closeModal} states={states} onAdd={handleAddDistrict} />
      <ViewDistrictAlert isOpen={activeModal === 'view'} onClose={closeModal} district={selectedDistrict} />
      <EditDistrictAlert isOpen={activeModal === 'edit'} onClose={closeModal} district={selectedDistrict} states={states} onSave={handleSaveEdit} />
      <DeleteDistrictAlert isOpen={activeModal === 'delete'} onClose={closeModal} district={selectedDistrict} onConfirm={handleConfirmDelete} />
    </div>
  )
}
