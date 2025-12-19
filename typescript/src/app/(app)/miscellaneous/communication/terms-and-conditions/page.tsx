'use client'

import { useState, useEffect } from 'react'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Textarea } from '@/components/textarea'
import Actions from '../../../basic-master/address-master/common/components/Actions.jsx'
import CommonPagination from '../../../basic-master/address-master/common/components/Pagination.jsx'
import { PlusIcon } from '@heroicons/react/16/solid'

// ============================================================================
// INITIAL DATA
// ============================================================================
const ITEMS_PER_PAGE = 10

type TermsAndCondition = {
  id: number
  tncTitle: string
  language: string
  tncPoints: string
  customerType: string
}

const initialTermsAndConditions: TermsAndCondition[] = [
  {
    id: 1,
    tncTitle: 'T&C',
    language: 'en',
    tncPoints: `• This scheme would be part of the Terms& conditions

• This scheme would be part of the LUMAN Sabki jeet Mechanic Loyalty Program. ...

• Points Worth Can be modified and changed at any time as per the LUMAN Policy

For any dispute, the company's decision shall be final. All disputes, if any, are subject to Delhi's jurisdiction`,
    customerType: 'Mechanic',
  },
]

const languages = ['en', 'hi', 'mr', 'gu', 'ta', 'te', 'kn']
const customerTypes = ['Retailer', 'Distributor', 'Mechanic', 'Plant', 'Prospect Distributor', 'Fleet owner']

// ============================================================================
// VIEW ALERT COMPONENT
// ============================================================================

function ViewTncAlert({ isOpen, onClose, tnc }: any) {
  if (!tnc) return null

  return (
    <Alert open={isOpen} onClose={onClose} size="3xl">
      <AlertTitle>Terms And Condition Details</AlertTitle>
      <AlertDescription>View the complete details of the selected terms and condition below.</AlertDescription>
      <AlertBody>
        <div className="space-y-3 max-w-4xl">
          <div>
            <span className="font-medium text-zinc-700 dark:text-zinc-300 block">ID</span>
            <span className="text-zinc-600 dark:text-zinc-400">{tnc.id}</span>
          </div>

          <div>
            <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Tnc Title</span>
            <span className="text-zinc-600 dark:text-zinc-400">{tnc.tncTitle}</span>
          </div>

          <div>
            <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Language</span>
            <span className="text-zinc-600 dark:text-zinc-400">{tnc.language}</span>
          </div>

          <div>
            <span className="font-medium text-zinc-700 dark:text-zinc-300 block">TnC Points</span>
            <div className="text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg mt-1">
              {tnc.tncPoints}
            </div>
          </div>

          <div>
            <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Customer Type</span>
            <span className="text-zinc-600 dark:text-zinc-400">{tnc.customerType}</span>
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

function EditTncAlert({ isOpen, onClose, tnc, onSave }: any) {
  const [formData, setFormData] = useState({
    tncTitle: '',
    language: 'en',
    tncPoints: '',
    customerType: customerTypes[0],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (tnc && isOpen) {
      setFormData({
        tncTitle: tnc.tncTitle,
        language: tnc.language,
        tncPoints: tnc.tncPoints,
        customerType: tnc.customerType,
      })
    }
  }, [tnc, isOpen])

  const handleSave = async () => {
    if (!tnc || !formData.tncTitle.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      onSave(tnc.id, formData)
      setIsSubmitting(false)
      onClose()
    }, 300)
  }

  const handleCancel = () => {
    onClose()
  }

  if (!tnc) return null

  return (
    <Alert open={isOpen} onClose={handleCancel} size="3xl">
      <AlertTitle>Edit Terms And Condition</AlertTitle>
      <AlertDescription>Update the terms and condition information below.</AlertDescription>
      <AlertBody>
        <div className="space-y-4 max-w-4xl">
          <div className="space-y-2">
            <label htmlFor="editTncTitle" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Tnc Title
            </label>
            <Input
              id="editTncTitle"
              type="text"
              value={formData.tncTitle}
              onChange={(e) => setFormData({ ...formData, tncTitle: e.target.value })}
              placeholder="Enter TnC title"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="editLanguage" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Language
            </label>
            <Select
              id="editLanguage"
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="editTncPoints" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              TnC Points
            </label>
            <Textarea
              id="editTncPoints"
              value={formData.tncPoints}
              onChange={(e) => setFormData({ ...formData, tncPoints: e.target.value })}
              placeholder="Enter terms and conditions points"
              rows={8}
            />
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
              {customerTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
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
        <Button color="dark/zinc" onClick={handleSave} disabled={!formData.tncTitle.trim() || isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// ADD TNC ALERT COMPONENT
// ============================================================================

function AddTncAlert({ isOpen, onClose, onAdd }: any) {
  const [formData, setFormData] = useState({
    tncTitle: '',
    language: 'en',
    tncPoints: '',
    customerType: customerTypes[0],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        tncTitle: '',
        language: 'en',
        tncPoints: '',
        customerType: customerTypes[0],
      })
    }
  }, [isOpen])

  const handleAdd = async () => {
    if (!formData.tncTitle.trim()) return

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
    <Alert open={isOpen} onClose={handleCancel} size="3xl">
      <AlertTitle>Create Terms And Condition</AlertTitle>
      <AlertDescription>Fill in the details to create new terms and conditions.</AlertDescription>
      <AlertBody>
        <div className="space-y-4 max-w-4xl">
          <div className="space-y-2">
            <label htmlFor="newTncTitle" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Tnc Title
            </label>
            <Input
              id="newTncTitle"
              type="text"
              value={formData.tncTitle}
              onChange={(e) => setFormData({ ...formData, tncTitle: e.target.value })}
              placeholder="Enter TnC title"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="newLanguage" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Language
            </label>
            <Select
              id="newLanguage"
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            >
              <option value="">Please select</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="newTncPoints" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              TnC Points
            </label>
            <Textarea
              id="newTncPoints"
              value={formData.tncPoints}
              onChange={(e) => setFormData({ ...formData, tncPoints: e.target.value })}
              placeholder="Enter terms and conditions points"
              rows={8}
            />
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
              {customerTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
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
        <Button color="dark/zinc" onClick={handleAdd} disabled={!formData.tncTitle.trim() || isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// DELETE ALERT COMPONENT
// ============================================================================

function DeleteTncAlert({ isOpen, onClose, tnc, onConfirm }: any) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!tnc) return

    setIsDeleting(true)
    setTimeout(() => {
      onConfirm(tnc.id)
      setIsDeleting(false)
      onClose()
    }, 300)
  }

  if (!tnc) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Are you sure you want to delete this terms and condition?</AlertTitle>
      <AlertDescription>
        You are about to delete <strong className="text-zinc-900 dark:text-white">{tnc.tncTitle}</strong>. This
        action cannot be undone.
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

export default function TermsAndConditionsPage() {
  const [tncList, setTncList] = useState(initialTermsAndConditions)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [selectedTnc, setSelectedTnc] = useState<TermsAndCondition | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(tncList.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentTnc = tncList.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleView = (tnc: TermsAndCondition) => {
    setSelectedTnc(tnc)
    setActiveModal('view')
  }

  const handleEdit = (tnc: TermsAndCondition) => {
    setSelectedTnc(tnc)
    setActiveModal('edit')
  }

  const handleDelete = (tnc: TermsAndCondition) => {
    setSelectedTnc(tnc)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setActiveModal('add')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedTnc(null)
  }

  const handleAddTnc = (formData: any) => {
    const newId = tncList.length > 0 ? Math.max(...tncList.map((t) => t.id)) + 1 : 1
    const newTnc: TermsAndCondition = { id: newId, ...formData }
    setTncList((prevTnc) => [...prevTnc, newTnc])
  }

  const handleSaveEdit = (id: number, formData: any) => {
    setTncList((prevTnc) => prevTnc.map((tnc) => (tnc.id === id ? { ...tnc, ...formData } : tnc)))
  }

  const handleConfirmDelete = (id: number) => {
    setTncList((prevTnc) => prevTnc.filter((tnc) => tnc.id !== id))
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Terms And Conditions</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage all terms and conditions in the system
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button color="dark/zinc" onClick={handleAddClick}>
              <PlusIcon />
              Add Terms And Condition
            </Button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Table Header - Fixed */}
        <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
          <div className="w-[15%] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</div>
          <div className="w-[25%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Tnc Title</div>
          <div className="w-[15%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Language</div>
          <div className="w-[25%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Customer Type</div>
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
          {tncList.length === 0 ? (
              <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
                No terms and conditions found. Click "Add Terms And Condition" to create one.
              </div>
            ) : (
              currentTnc.map((tnc, index) => (
                <div
                  key={tnc.id}
                  className={`flex items-center py-[1.1rem] border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                    index === currentTnc.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <div className="w-[15%] pl-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">{tnc.id}</div>
                  <div className="w-[25%] text-sm font-medium text-zinc-950 dark:text-white truncate pr-4">
                    {tnc.tncTitle}
                  </div>
                  <div className="w-[15%] text-sm text-zinc-600 dark:text-zinc-300">{tnc.language}</div>
                  <div className="w-[25%] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {tnc.customerType}
                  </div>
                  <div className="w-[160px] px-4 flex items-center justify-center">
                    <Actions onView={() => handleView(tnc)} onEdit={() => handleEdit(tnc)} onDelete={() => handleDelete(tnc)} />
                  </div>
                </div>
              ))
            )}
        </div>

        {/* Pagination Footer */}
        <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

      {/* ALERT MODALS */}
      <AddTncAlert isOpen={activeModal === 'add'} onClose={closeModal} onAdd={handleAddTnc} />

      <ViewTncAlert isOpen={activeModal === 'view'} onClose={closeModal} tnc={selectedTnc} />

      <EditTncAlert isOpen={activeModal === 'edit'} onClose={closeModal} tnc={selectedTnc} onSave={handleSaveEdit} />

      <DeleteTncAlert isOpen={activeModal === 'delete'} onClose={closeModal} tnc={selectedTnc} onConfirm={handleConfirmDelete} />
    </div>
  )
}
