// @ts-nocheck
'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Field, Label } from '@/components/fieldset'
import { Select } from '@/components/select'
import Header from '@/app/(app)/basic-master/address-master/common/components/Header.jsx'
import CommonTable from '@/app/(app)/basic-master/address-master/common/components/Table.jsx'
import CommonPagination from '@/app/(app)/basic-master/address-master/common/components/Pagination.jsx'
import Actions from '@/app/(app)/basic-master/address-master/common/components/Actions.jsx'
import { RewardBaseCategory, rewardHierarchy, slugifyLabel } from '../primary-category/data'

const ITEMS_PER_PAGE = 10

type ModalState = 'add' | 'view' | 'edit' | 'delete' | null

export default function RewardBaseCategoryPage() {
  const searchParams = useSearchParams()
  const primarySlug = searchParams.get('primary')

  // Get all base categories from all primary categories
  const allBaseCategories = useMemo(() => {
    const bases: RewardBaseCategory[] = []
    rewardHierarchy.forEach((primary) => {
      primary.baseCategories.forEach((base) => {
        bases.push(base)
      })
    })
    return bases
  }, [])

  const [baseCategories, setBaseCategories] = useState<RewardBaseCategory[]>(allBaseCategories)
  const [activeModal, setActiveModal] = useState<ModalState>(null)
  const [selectedBase, setSelectedBase] = useState<RewardBaseCategory | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  
  // Form states
  const [primaryCategory, setPrimaryCategory] = useState('')
  const [baseCategoryName, setBaseCategoryName] = useState('')
  const [baseCategoryImage, setBaseCategoryImage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Filter by primary category if specified
  const filteredCategories = useMemo(() => {
    if (!primarySlug) return baseCategories
    return baseCategories.filter((base) => {
      const primary = rewardHierarchy.find((p) => p.slug === primarySlug)
      return primary && base.primaryCategoryId === primary.id
    })
  }, [baseCategories, primarySlug])

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filteredCategories.length / ITEMS_PER_PAGE))
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [filteredCategories, currentPage])

  const paginatedCategories = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredCategories.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredCategories, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const openModal = (type: ModalState, payload?: RewardBaseCategory) => {
    setActiveModal(type)
    setSelectedBase(payload ?? null)
    if (type === 'add') {
      setPrimaryCategory('')
      setBaseCategoryName('')
      setBaseCategoryImage('')
    } else if (type === 'edit' && payload) {
      setPrimaryCategory(payload.primaryCategoryId)
      setBaseCategoryName(payload.name)
      setBaseCategoryImage(payload.image)
    }
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedBase(null)
    setPrimaryCategory('')
    setBaseCategoryName('')
    setBaseCategoryImage('')
    setIsSubmitting(false)
  }

  const handleAddBaseCategory = async () => {
    const trimmedName = baseCategoryName.trim()
    if (!trimmedName || !primaryCategory) return

    const primary = rewardHierarchy.find((p) => p.id === primaryCategory)
    if (!primary) return

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      const newBase: RewardBaseCategory = {
        id: `RBC-${Date.now()}`,
        name: trimmedName,
        slug: slugifyLabel(trimmedName),
        primaryCategoryId: primary.id,
        primaryCategoryName: primary.name,
        image: baseCategoryImage || '/rewards/default-base.jpg',
        products: [],
      }

      setBaseCategories((prev) => [...prev, newBase])
      setIsSubmitting(false)
      closeModal()
    }, 300)
  }

  const handleSaveEdit = async () => {
    if (!selectedBase || !baseCategoryName.trim()) return

    const primary = rewardHierarchy.find((p) => p.id === primaryCategory)

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setBaseCategories((prev) =>
        prev.map((base) =>
          base.id === selectedBase.id
            ? {
                ...base,
                name: baseCategoryName,
                slug: slugifyLabel(baseCategoryName),
                primaryCategoryId: primary?.id || base.primaryCategoryId,
                primaryCategoryName: primary?.name || base.primaryCategoryName,
                image: baseCategoryImage || base.image,
              }
            : base
        )
      )
      setIsSubmitting(false)
      closeModal()
    }, 300)
  }

  const handleDelete = async () => {
    if (!selectedBase) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setBaseCategories((prev) => prev.filter((base) => base.id !== selectedBase.id))
      setIsSubmitting(false)
      closeModal()
    }, 300)
  }

  const tableRows = paginatedCategories.map((base) => ({
    id: base.id,
    primaryCategory: base.primaryCategoryName,
    baseCategoryName: base.name,
    image: base.image,
    productsCount: `${base.products.length} Products`,
    navigator: (
      <Button
        href={`/reward-manager/rewards/products?base=${base.slug}`}
        color="zinc"
        className="text-xs px-3 py-1.5 h-8 whitespace-nowrap"
      >
        View Products
      </Button>
    ),
    raw: base,
  }))

  const totalPages = Math.max(1, Math.ceil(filteredCategories.length / ITEMS_PER_PAGE))

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* @ts-ignore - Header is a JSX component */}
      <Header
        title={
          <>
            Reward Manager &nbsp;
            <span className="text-zinc-600 dark:text-zinc-300">Base Categories</span>
          </>
        }
        subtitle="Manage base reward categories"
        addLabel="Add Base Category"
        onAdd={() => openModal('add')}
        dropdownOptions={[
          { label: 'Import from Excel' },
          { label: 'Export to Excel' },
          { label: 'Download Format' },
        ]}
      />

      {/* @ts-ignore - CommonTable is a JSX component */}
      <CommonTable
        data={tableRows}
        emptyMessage="No base categories found. Use 'Add Base Category' to create one."
        minWidth="1300px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '120px' },
          { key: 'primaryCategory', label: 'Primary Category', width: '200px' },
          { key: 'baseCategoryName', label: 'Base Category Name', width: '200px' },
          { key: 'image', label: 'Base Category Image', width: '180px' },
          { key: 'productsCount', label: 'Products', width: '150px' },
          { key: 'navigator', label: 'Navigate', width: '130px' },
        ]}
        renderActions={(row) => (
          <Actions
            onView={() => openModal('view', row.raw)}
            onEdit={() => openModal('edit', row.raw)}
            onDelete={() => openModal('delete', row.raw)}
          />
        )}
        pagination={
          <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        }
      />

      {/* Add Modal */}
      <Alert open={activeModal === 'add'} onClose={closeModal}>
        <AlertTitle>Add Base Category</AlertTitle>
        <AlertDescription>Create a new base reward category.</AlertDescription>
        <AlertBody>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Primary Category *
              </label>
              <select
                value={primaryCategory}
                onChange={(e) => setPrimaryCategory(e.target.value)}
                className="w-full px-3 py-2 border border-zinc-950/10 dark:border-white/10 rounded-md bg-white dark:bg-zinc-900"
              >
                <option value="">Select Primary Category</option>
                {rewardHierarchy.map((primary) => (
                  <option key={primary.id} value={primary.id}>
                    {primary.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Base Category Name *
              </label>
              <Input
                type="text"
                value={baseCategoryName}
                onChange={(e) => setBaseCategoryName(e.target.value)}
                placeholder="Enter base category name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Image URL
              </label>
              <Input
                type="text"
                value={baseCategoryImage}
                onChange={(e) => setBaseCategoryImage(e.target.value)}
                placeholder="Enter image URL"
              />
            </div>
          </div>
        </AlertBody>
        <AlertActions>
          <Button plain onClick={closeModal} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button color="dark/zinc" onClick={handleAddBaseCategory} disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add'}
          </Button>
        </AlertActions>
      </Alert>

      {/* View Modal */}
      {selectedBase && (
        <Alert open={activeModal === 'view'} onClose={closeModal}>
          <AlertTitle>Base Category Details</AlertTitle>
          <AlertDescription>View the details of the selected base category.</AlertDescription>
          <AlertBody>
            <div className="space-y-3">
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">ID:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedBase.id}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Primary Category:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedBase.primaryCategoryName}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Base Category Name:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedBase.name}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Slug:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedBase.slug}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Image URL:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedBase.image}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Products:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedBase.products.length} products</span>
              </div>
            </div>
          </AlertBody>
          <AlertActions>
            <Button color="dark/zinc" onClick={closeModal}>
              Close
            </Button>
          </AlertActions>
        </Alert>
      )}

      {/* Edit Modal */}
      {selectedBase && (
        <Alert open={activeModal === 'edit'} onClose={closeModal}>
          <AlertTitle>Edit Base Category</AlertTitle>
          <AlertDescription>Update the base category information.</AlertDescription>
          <AlertBody>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Primary Category *
                </label>
                <select
                  value={primaryCategory}
                  onChange={(e) => setPrimaryCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-950/10 dark:border-white/10 rounded-md bg-white dark:bg-zinc-900"
                >
                  <option value="">Select Primary Category</option>
                  {rewardHierarchy.map((primary) => (
                    <option key={primary.id} value={primary.id}>
                      {primary.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Base Category Name *
                </label>
                <Input
                  type="text"
                  value={baseCategoryName}
                  onChange={(e) => setBaseCategoryName(e.target.value)}
                  placeholder="Enter base category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Image URL
                </label>
                <Input
                  type="text"
                  value={baseCategoryImage}
                  onChange={(e) => setBaseCategoryImage(e.target.value)}
                  placeholder="Enter image URL"
                />
              </div>
            </div>
          </AlertBody>
          <AlertActions>
            <Button plain onClick={closeModal} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button color="dark/zinc" onClick={handleSaveEdit} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </AlertActions>
        </Alert>
      )}

      {/* Delete Modal */}
      {selectedBase && (
        <Alert open={activeModal === 'delete'} onClose={closeModal}>
          <AlertTitle>Delete Base Category</AlertTitle>
          <AlertDescription>
            Are you sure you want to delete "{selectedBase.name}"? This action cannot be undone.
          </AlertDescription>
          <AlertActions>
            <Button plain onClick={closeModal} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button color="red" onClick={handleDelete} disabled={isSubmitting}>
              {isSubmitting ? 'Deleting...' : 'Yes, Delete'}
            </Button>
          </AlertActions>
        </Alert>
      )}
    </div>
  )
}
