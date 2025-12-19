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

type BannerInfo = {
  id: number
  bannerTitle: string
  language: string
  bannerType: string
  bannerLink: string
  bannerAttachment: string
  customerType: string[]
  employeeDesignation: string[]
  bannerDetails?: string
}

const initialBannerInfo: BannerInfo[] = [
  {
    id: 3,
    bannerTitle: 'Program Booklet',
    language: 'en',
    bannerType: 'Program Booklet',
    bannerLink: '',
    bannerAttachment: 'Download file',
    customerType: ['Mechanic'],
    employeeDesignation: [],
    bannerDetails: '',
  },
  {
    id: 5,
    bannerTitle: 'About us',
    language: 'en',
    bannerType: 'What`s New',
    bannerLink: 'https://www.lumanauto.com/about-us.aspx',
    bannerAttachment: 'Download file',
    customerType: ['Mechanic'],
    employeeDesignation: [],
    bannerDetails: '',
  },
  {
    id: 6,
    bannerTitle: 'E-Catalogue',
    language: 'en',
    bannerType: 'What`s New',
    bannerLink: 'https://www.lumanauto.com/Default.aspx',
    bannerAttachment: 'Download file',
    customerType: ['Mechanic'],
    employeeDesignation: [],
    bannerDetails: '',
  },
  {
    id: 8,
    bannerTitle: 'Popup Banner',
    language: 'en',
    bannerType: 'Popup Banner',
    bannerLink: '',
    bannerAttachment: 'Download file',
    customerType: ['Mechanic'],
    employeeDesignation: ['Administrator', 'Sales and Marketing Head', 'Zonal Head', 'Regional Manager', 'Area Head', 'LME-LV2', 'LME/RME/SRME'],
    bannerDetails: '',
  },
  {
    id: 10,
    bannerTitle: 'Popup Banner',
    language: 'en',
    bannerType: 'Popup Banner',
    bannerLink: '',
    bannerAttachment: 'Download file',
    customerType: ['Retailer'],
    employeeDesignation: [],
    bannerDetails: '',
  },
  {
    id: 15,
    bannerTitle: 'Luman MLP Scheme',
    language: 'en',
    bannerType: 'What`s New',
    bannerLink: '',
    bannerAttachment: 'Download file',
    customerType: ['Mechanic'],
    employeeDesignation: [],
    bannerDetails: '',
  },
  {
    id: 22,
    bannerTitle: 'Brake Liner',
    language: 'en',
    bannerType: 'Popup Banner',
    bannerLink: '',
    bannerAttachment: 'Download file',
    customerType: ['Retailer'],
    employeeDesignation: ['Administrator', 'Sales and Marketing Head', 'Zonal Head', 'Regional Manager', 'Area Head', 'LME-LV2', 'LME/RME/SRME'],
    bannerDetails: '',
  },
  {
    id: 23,
    bannerTitle: 'PUPUP',
    language: 'en',
    bannerType: 'Popup Banner',
    bannerLink: '',
    bannerAttachment: 'Download file',
    customerType: ['Distributor', 'Plant', 'Prospect Distributor', 'Fleet owner'],
    employeeDesignation: ['Administrator', 'Sales and Marketing Head', 'Zonal Head', 'Regional Manager', 'Area Head', 'LME-LV2', 'LME/RME/SRME'],
    bannerDetails: '',
  },
]

const bannerTypes = ['Program Booklet', 'What`s New', 'Popup Banner', 'Promotional Banner']
const languages = ['en', 'hi', 'mr', 'gu', 'ta', 'te', 'kn']
const customerTypeOptions = [
  'Retailer',
  'Distributor',
  'Mechanic',
  'Plant',
  'Prospect Distributor',
  'Fleet owner',
  'Fleet Owner Mechanic',
]
const employeeDesignationOptions = [
  'Administrator',
  'Sales and Marketing Head',
  'Zonal Head',
  'Regional Manager',
  'Area Head',
  'LME-LV2',
  'LME/RME/SRME',
]

// ============================================================================
// MULTISELECT COMPONENT
// ============================================================================

function MultiSelect({
  label,
  options,
  selectedValues,
  onChange,
}: {
  label: string
  options: string[]
  selectedValues: string[]
  onChange: (values: string[]) => void
}) {
  const toggleOption = (option: string) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter((v) => v !== option))
    } else {
      onChange([...selectedValues, option])
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
      <div className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-3 max-h-48 overflow-y-auto bg-white dark:bg-zinc-900">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2 py-1.5 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 px-2 rounded">
            <input
              type="checkbox"
              checked={selectedValues.includes(option)}
              onChange={() => toggleOption(option)}
              className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
            />
            <span className="text-sm text-zinc-700 dark:text-zinc-300">{option}</span>
          </label>
        ))}
      </div>
      {selectedValues.length > 0 && (
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          Selected: {selectedValues.join(', ')}
        </div>
      )}
    </div>
  )
}

// ============================================================================
// VIEW ALERT COMPONENT
// ============================================================================

function ViewBannerAlert({ isOpen, onClose, banner }: any) {
  if (!banner) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Banner Details - {banner.bannerTitle}</AlertTitle>
      <AlertDescription>View the complete details of the selected banner below.</AlertDescription>
      <AlertBody>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">ID:</span>
              <span className="text-zinc-600 dark:text-zinc-400">{banner.id}</span>
            </div>
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Language:</span>
              <span className="text-zinc-600 dark:text-zinc-400">{banner.language}</span>
            </div>
          </div>

          <div>
            <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Banner Title:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{banner.bannerTitle}</span>
          </div>

          <div>
            <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Banner Type:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{banner.bannerType}</span>
          </div>

          {banner.bannerLink && (
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Banner Link:</span>
              <a
                href={banner.bannerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {banner.bannerLink}
              </a>
            </div>
          )}

          <div>
            <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Banner Attachment:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{banner.bannerAttachment}</span>
          </div>

          <div>
            <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Customer Type:</span>
            <span className="text-zinc-600 dark:text-zinc-400">
              {banner.customerType.join(', ') || 'None'}
            </span>
          </div>

          <div>
            <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Employee Designation:</span>
            <span className="text-zinc-600 dark:text-zinc-400">
              {banner.employeeDesignation.join(', ') || 'None'}
            </span>
          </div>

          {banner.bannerDetails && (
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Banner Details:</span>
              <span className="text-zinc-600 dark:text-zinc-400">{banner.bannerDetails}</span>
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

function EditBannerAlert({ isOpen, onClose, banner, onSave }: any) {
  const [formData, setFormData] = useState({
    bannerTitle: '',
    language: 'en',
    bannerType: bannerTypes[0],
    bannerLink: '',
    bannerAttachment: '',
    customerType: [] as string[],
    employeeDesignation: [] as string[],
    bannerDetails: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (banner && isOpen) {
      setFormData({
        bannerTitle: banner.bannerTitle,
        language: banner.language,
        bannerType: banner.bannerType,
        bannerLink: banner.bannerLink,
        bannerAttachment: banner.bannerAttachment,
        customerType: banner.customerType,
        employeeDesignation: banner.employeeDesignation,
        bannerDetails: banner.bannerDetails || '',
      })
    }
  }, [banner, isOpen])

  const handleSave = async () => {
    if (!banner || !formData.bannerTitle.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      onSave(banner.id, formData)
      setIsSubmitting(false)
      onClose()
    }, 300)
  }

  const handleCancel = () => {
    onClose()
  }

  if (!banner) return null

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Edit Banner</AlertTitle>
      <AlertDescription>Update the banner information below.</AlertDescription>
      <AlertBody>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="space-y-2">
            <label htmlFor="editBannerTitle" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Banner Title
            </label>
            <Input
              id="editBannerTitle"
              type="text"
              value={formData.bannerTitle}
              onChange={(e) => setFormData({ ...formData, bannerTitle: e.target.value })}
              placeholder="Enter banner title"
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
            <label htmlFor="editBannerDetails" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Banner Details
            </label>
            <Textarea
              id="editBannerDetails"
              value={formData.bannerDetails}
              onChange={(e) => setFormData({ ...formData, bannerDetails: e.target.value })}
              placeholder="Enter banner details"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="editBannerType" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Banner Type
            </label>
            <Select
              id="editBannerType"
              value={formData.bannerType}
              onChange={(e) => setFormData({ ...formData, bannerType: e.target.value })}
            >
              {bannerTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="editBannerLink" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Banner Link
            </label>
            <Input
              id="editBannerLink"
              type="text"
              value={formData.bannerLink}
              onChange={(e) => setFormData({ ...formData, bannerLink: e.target.value })}
              placeholder="Enter banner link (optional)"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="editBannerAttachment" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Banner Attachment
            </label>
            <Input
              id="editBannerAttachment"
              type="text"
              value={formData.bannerAttachment}
              onChange={(e) => setFormData({ ...formData, bannerAttachment: e.target.value })}
              placeholder="Enter banner attachment"
            />
          </div>

          <MultiSelect
            label="Customer Type"
            options={customerTypeOptions}
            selectedValues={formData.customerType}
            onChange={(values) => setFormData({ ...formData, customerType: values })}
          />

          <MultiSelect
            label="Employee Designation"
            options={employeeDesignationOptions}
            selectedValues={formData.employeeDesignation}
            onChange={(values) => setFormData({ ...formData, employeeDesignation: values })}
          />
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button color="dark/zinc" onClick={handleSave} disabled={!formData.bannerTitle.trim() || isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// ADD BANNER ALERT COMPONENT
// ============================================================================

function AddBannerAlert({ isOpen, onClose, onAdd }: any) {
  const [formData, setFormData] = useState({
    bannerTitle: '',
    language: 'en',
    bannerType: bannerTypes[0],
    bannerLink: '',
    bannerAttachment: '',
    customerType: [] as string[],
    employeeDesignation: [] as string[],
    bannerDetails: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        bannerTitle: '',
        language: 'en',
        bannerType: bannerTypes[0],
        bannerLink: '',
        bannerAttachment: '',
        customerType: [],
        employeeDesignation: [],
        bannerDetails: '',
      })
    }
  }, [isOpen])

  const handleAdd = async () => {
    if (!formData.bannerTitle.trim()) return

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
      <AlertTitle>Add New Banner</AlertTitle>
      <AlertDescription>Fill in the details to create a new banner.</AlertDescription>
      <AlertBody>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="space-y-2">
            <label htmlFor="newBannerTitle" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Banner Title
            </label>
            <Input
              id="newBannerTitle"
              type="text"
              value={formData.bannerTitle}
              onChange={(e) => setFormData({ ...formData, bannerTitle: e.target.value })}
              placeholder="Enter banner title"
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
            <label htmlFor="newBannerDetails" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Banner Details
            </label>
            <Textarea
              id="newBannerDetails"
              value={formData.bannerDetails}
              onChange={(e) => setFormData({ ...formData, bannerDetails: e.target.value })}
              placeholder="Enter banner details"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="newBannerType" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Banner Type
            </label>
            <Select
              id="newBannerType"
              value={formData.bannerType}
              onChange={(e) => setFormData({ ...formData, bannerType: e.target.value })}
            >
              <option value="">Please select</option>
              {bannerTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="newBannerLink" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Banner Link
            </label>
            <Input
              id="newBannerLink"
              type="text"
              value={formData.bannerLink}
              onChange={(e) => setFormData({ ...formData, bannerLink: e.target.value })}
              placeholder="Enter banner link (optional)"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="newBannerAttachment" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Banner Attachment
            </label>
            <Input
              id="newBannerAttachment"
              type="text"
              value={formData.bannerAttachment}
              onChange={(e) => setFormData({ ...formData, bannerAttachment: e.target.value })}
              placeholder="Enter banner attachment"
            />
          </div>

          <MultiSelect
            label="Customer Type"
            options={customerTypeOptions}
            selectedValues={formData.customerType}
            onChange={(values) => setFormData({ ...formData, customerType: values })}
          />

          <MultiSelect
            label="Employee Designation"
            options={employeeDesignationOptions}
            selectedValues={formData.employeeDesignation}
            onChange={(values) => setFormData({ ...formData, employeeDesignation: values })}
          />
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button color="dark/zinc" onClick={handleAdd} disabled={!formData.bannerTitle.trim() || isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// DELETE ALERT COMPONENT
// ============================================================================

function DeleteBannerAlert({ isOpen, onClose, banner, onConfirm }: any) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!banner) return

    setIsDeleting(true)
    setTimeout(() => {
      onConfirm(banner.id)
      setIsDeleting(false)
      onClose()
    }, 300)
  }

  if (!banner) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Are you sure you want to delete this banner?</AlertTitle>
      <AlertDescription>
        You are about to delete <strong className="text-zinc-900 dark:text-white">{banner.bannerTitle}</strong>. This
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

export default function BannerInfoPage() {
  const [banners, setBanners] = useState(initialBannerInfo)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [selectedBanner, setSelectedBanner] = useState<BannerInfo | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(banners.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentBanners = banners.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleView = (banner: BannerInfo) => {
    setSelectedBanner(banner)
    setActiveModal('view')
  }

  const handleEdit = (banner: BannerInfo) => {
    setSelectedBanner(banner)
    setActiveModal('edit')
  }

  const handleDelete = (banner: BannerInfo) => {
    setSelectedBanner(banner)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setActiveModal('add')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedBanner(null)
  }

  const handleAddBanner = (formData: any) => {
    const newId = banners.length > 0 ? Math.max(...banners.map((b) => b.id)) + 1 : 1
    const newBanner: BannerInfo = { id: newId, ...formData }
    setBanners((prevBanners) => [...prevBanners, newBanner])
  }

  const handleSaveEdit = (id: number, formData: any) => {
    setBanners((prevBanners) => prevBanners.map((banner) => (banner.id === id ? { ...banner, ...formData } : banner)))
  }

  const handleConfirmDelete = (id: number) => {
    setBanners((prevBanners) => prevBanners.filter((banner) => banner.id !== id))
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Banner Info</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage all banner information in the system
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button color="dark/zinc" onClick={handleAddClick}>
              <PlusIcon />
              Add Banner
            </Button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Table Header - Fixed */}
        <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
          <div className="w-[8%] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</div>
          <div className="w-[15%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Banner Title</div>
          <div className="w-[8%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Language</div>
          <div className="w-[12%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Banner Type</div>
          <div className="w-[12%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Banner Link</div>
          <div className="w-[10%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Attachment</div>
          <div className="w-[15%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Customer Type</div>
          <div className="w-[12%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Employee</div>
          <div className="w-[8%] text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Actions</div>
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
          {banners.length === 0 ? (
              <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
                No banners found. Click "Add Banner" to create one.
              </div>
            ) : (
              currentBanners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`flex items-center py-[1.1rem] border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                    index === currentBanners.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <div className="w-[8%] pl-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">{banner.id}</div>
                  <div className="w-[15%] text-sm font-medium text-zinc-950 dark:text-white truncate pr-4">
                    {banner.bannerTitle}
                  </div>
                  <div className="w-[8%] text-sm text-zinc-600 dark:text-zinc-300">{banner.language}</div>
                  <div className="w-[12%] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">{banner.bannerType}</div>
                  <div className="w-[12%] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {banner.bannerLink ? (
                      <a
                        href={banner.bannerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Link
                      </a>
                    ) : (
                      '-'
                    )}
                  </div>
                  <div className="w-[10%] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {banner.bannerAttachment}
                  </div>
                  <div className="w-[15%] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {banner.customerType.join(' ')}
                  </div>
                  <div className="w-[12%] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                    {banner.employeeDesignation.length > 0 ? banner.employeeDesignation.join(' ') : '-'}
                  </div>
                  <div className="w-[160px] px-4 flex items-center justify-center">
                    <Actions onView={() => handleView(banner)} onEdit={() => handleEdit(banner)} onDelete={() => handleDelete(banner)} />
                  </div>
                </div>
              ))
            )}
        </div>

        {/* Pagination Footer */}
        <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

      {/* ALERT MODALS */}
      <AddBannerAlert isOpen={activeModal === 'add'} onClose={closeModal} onAdd={handleAddBanner} />

      <ViewBannerAlert isOpen={activeModal === 'view'} onClose={closeModal} banner={selectedBanner} />

      <EditBannerAlert isOpen={activeModal === 'edit'} onClose={closeModal} banner={selectedBanner} onSave={handleSaveEdit} />

      <DeleteBannerAlert isOpen={activeModal === 'delete'} onClose={closeModal} banner={selectedBanner} onConfirm={handleConfirmDelete} />
    </div>
  )
}
