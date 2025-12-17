// @ts-nocheck
'use client'

import { useEffect, useMemo, useState } from 'react'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import Header from '@/app/(app)/basic-master/address-master/common/components/Header.jsx'
import CommonTable from '@/app/(app)/basic-master/address-master/common/components/Table.jsx'
import CommonPagination from '@/app/(app)/basic-master/address-master/common/components/Pagination.jsx'
import Actions from '@/app/(app)/basic-master/address-master/common/components/Actions.jsx'
import { RewardPrimaryCategory, rewardHierarchy, slugifyLabel } from './data'

const ITEMS_PER_PAGE = 10

type ModalState = 'add' | 'view' | 'edit' | 'delete' | null

export default function RewardPrimaryCategoryPage() {
  const [categories, setCategories] = useState<RewardPrimaryCategory[]>(rewardHierarchy)
  const [activeModal, setActiveModal] = useState<ModalState>(null)
  const [selectedCategory, setSelectedCategory] = useState<RewardPrimaryCategory | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  
  // Form states
  const [categoryName, setCategoryName] = useState('')
  const [categoryImage, setCategoryImage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(categories.length / ITEMS_PER_PAGE))
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [categories, currentPage])

  const paginatedCategories = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return categories.slice(start, start + ITEMS_PER_PAGE)
  }, [categories, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const openModal = (type: ModalState, payload?: RewardPrimaryCategory) => {
    setActiveModal(type)
    setSelectedCategory(payload ?? null)
    if (type === 'add') {
      setCategoryName('')
      setCategoryImage('')
    } else if (type === 'edit' && payload) {
      setCategoryName(payload.name)
      setCategoryImage(payload.image)
    }
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedCategory(null)
    setCategoryName('')
    setCategoryImage('')
    setIsSubmitting(false)
  }

  const handleAddCategory = async () => {
    const trimmedName = categoryName.trim()
    if (!trimmedName) return

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      const newCategory: RewardPrimaryCategory = {
        id: `RPC-${String(categories.length + 1).padStart(3, '0')}`,
        name: trimmedName,
        slug: slugifyLabel(trimmedName),
        image: categoryImage || '/rewards/default-category.jpg',
        baseCategories: [],
      }

      setCategories((prev) => [...prev, newCategory])
      setIsSubmitting(false)
      closeModal()
    }, 300)
  }

  const handleSaveEdit = async () => {
    if (!selectedCategory || !categoryName.trim()) return

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === selectedCategory.id
            ? {
                ...category,
                name: categoryName,
                slug: slugifyLabel(categoryName),
                image: categoryImage || category.image,
              }
            : category
        )
      )
      setIsSubmitting(false)
      closeModal()
    }, 300)
  }

  const handleDelete = async () => {
    if (!selectedCategory) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setCategories((prev) => prev.filter((category) => category.id !== selectedCategory.id))
      setIsSubmitting(false)
      closeModal()
    }, 300)
  }

  const tableRows = paginatedCategories.map((category) => ({
    id: category.id,
    categoryName: category.name,
    image: category.image,
    baseOverview: `${category.baseCategories.length} Base Categories`,
    navigator: (
      <Button
        href={`/reward-manager/rewards/base-category?primary=${category.slug}`}
        color="zinc"
        className="text-xs px-3 py-1.5 h-8 whitespace-nowrap"
      >
        View Base
      </Button>
    ),
    raw: category,
  }))

  const totalPages = Math.max(1, Math.ceil(categories.length / ITEMS_PER_PAGE))

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* @ts-ignore - Header is a JSX component */}
      <Header
        title={
          <>
            Reward Manager &nbsp;
            <span className="text-zinc-600 dark:text-zinc-300">Primary Categories</span>
          </>
        }
        subtitle="Manage primary reward categories"
        addLabel="Add Primary Category"
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
        emptyMessage="No primary categories found. Use 'Add Primary Category' to create one."
        minWidth="1200px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '120px' },
          { key: 'categoryName', label: 'Primary Category Name', width: '250px' },
          { key: 'image', label: 'Primary Category Image', width: '180px' },
          { key: 'baseOverview', label: 'Base Categories', width: '180px' },
          { key: 'navigator', label: 'Navigate', width: '120px' },
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
        <AlertTitle>Add Primary Category</AlertTitle>
        <AlertDescription>Create a new primary reward category.</AlertDescription>
        <AlertBody>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Primary Category Name *
              </label>
              <Input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Image URL
              </label>
              <Input
                type="text"
                value={categoryImage}
                onChange={(e) => setCategoryImage(e.target.value)}
                placeholder="Enter image URL"
              />
            </div>
          </div>
        </AlertBody>
        <AlertActions>
          <Button plain onClick={closeModal} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button color="dark/zinc" onClick={handleAddCategory} disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add'}
          </Button>
        </AlertActions>
      </Alert>

      {/* View Modal */}
      {selectedCategory && (
        <Alert open={activeModal === 'view'} onClose={closeModal}>
          <AlertTitle>Primary Category Details</AlertTitle>
          <AlertDescription>View the details of the selected primary category.</AlertDescription>
          <AlertBody>
            <div className="space-y-3">
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">ID:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedCategory.id}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Category Name:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedCategory.name}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Slug:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedCategory.slug}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Image URL:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedCategory.image}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Base Categories:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedCategory.baseCategories.length} categories</span>
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
      {selectedCategory && (
        <Alert open={activeModal === 'edit'} onClose={closeModal}>
          <AlertTitle>Edit Primary Category</AlertTitle>
          <AlertDescription>Update the primary category information.</AlertDescription>
          <AlertBody>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Primary Category Name *
                </label>
                <Input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Image URL
                </label>
                <Input
                  type="text"
                  value={categoryImage}
                  onChange={(e) => setCategoryImage(e.target.value)}
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
      {selectedCategory && (
        <Alert open={activeModal === 'delete'} onClose={closeModal}>
          <AlertTitle>Delete Primary Category</AlertTitle>
          <AlertDescription>
            Are you sure you want to delete "{selectedCategory.name}"? This action cannot be undone.
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
