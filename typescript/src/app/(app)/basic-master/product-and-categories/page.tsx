// @ts-nocheck
'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/button'
import Header from '@/app/(app)/basic-master/address-master/common/components/Header.jsx'
import CommonTable from '@/app/(app)/basic-master/address-master/common/components/Table.jsx'
import CommonPagination from '@/app/(app)/basic-master/address-master/common/components/Pagination.jsx'
import Actions from '@/app/(app)/basic-master/address-master/common/components/Actions.jsx'
import {
  AddAlert,
  DeleteAlert,
  EditAlert,
  ViewAlert,
} from '@/app/(app)/basic-master/address-master/common/components/Alert.jsx'
import { PrimaryCategory, productHierarchy, slugifyLabel } from './data'

const ITEMS_PER_PAGE = 10

type ModalState = 'add' | 'view' | 'edit' | 'delete' | null

type CategoryForm = {
  categoryName: string
  segment: string
  description: string
}

export default function ProductAndCategoriesPage() {
  const [categories, setCategories] = useState<PrimaryCategory[]>(productHierarchy)
  const [activeModal, setActiveModal] = useState<ModalState>(null)
  const [selectedCategory, setSelectedCategory] = useState<PrimaryCategory | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

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

  const openModal = (type: ModalState, payload?: PrimaryCategory) => {
    setActiveModal(type)
    setSelectedCategory(payload ?? null)
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedCategory(null)
  }

  const handleAddCategory = (form: CategoryForm) => {
    const trimmedName = form.categoryName.trim()
    if (!trimmedName) return

    const newCategory: PrimaryCategory = {
      id: `PC-${String(categories.length + 1).padStart(3, '0')}`,
      name: trimmedName,
      slug: slugifyLabel(trimmedName),
      segment: form.segment || 'General',
      description: form.description || 'No description added yet.',
      baseCategories: [],
    }

    setCategories((prev) => [...prev, newCategory])
  }

  const handleSaveEdit = (form: CategoryForm) => {
    if (!selectedCategory) return

    setCategories((prev) =>
      prev.map((category) =>
        category.id === selectedCategory.id
          ? {
              ...category,
              name: form.categoryName || category.name,
              slug: slugifyLabel(form.categoryName || category.name),
              segment: form.segment || category.segment,
              description: form.description || category.description,
            }
          : category
      )
    )
  }

  const handleDelete = () => {
    if (!selectedCategory) return
    setCategories((prev) => prev.filter((category) => category.id !== selectedCategory.id))
  }

  const tableRows = paginatedCategories.map((category) => ({
    id: category.id,
    categoryName: category.name,
    segment: category.segment,
    description: category.description,
    baseOverview: `${category.baseCategories.length} Base Categories`,
    navigator: (
      <Button
        href={`/basic-master/product-and-categories/${category.slug}/base-category`}
        color="zinc"
        className="text-xs px-2 py-1 h-7 flex items-center justify-center"
      >
        Base
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
            Product &nbsp;
            <span className="text-zinc-600 dark:text-zinc-300">Primary Categories</span>
          </>
        }
        subtitle="Manage category hierarchy for every catalog item"
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
        minWidth="1300px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '100px' },
          { key: 'categoryName', label: 'Primary Category', width: '200px' },
          { key: 'segment', label: 'Segment', width: '160px' },
          { key: 'description', label: 'Description', width: '280px' },
          { key: 'baseOverview', label: 'Base Categories', width: '150px' },
          { key: 'navigator', label: 'Navigate', width: '120px' },
        ]}
        renderActions={(row: any) => (
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

      <AddAlert
        isOpen={activeModal === 'add'}
        onClose={closeModal}
        title="Add Primary Category"
        message="Define the top-level category information."
        fields={{ categoryName: '', segment: '', description: '' }}
        onSave={handleAddCategory}
      />

      {selectedCategory && (
        <>
          <ViewAlert
            isOpen={activeModal === 'view'}
            onClose={closeModal}
            title="Primary Category Details"
            message="Insights for the selected primary category"
            fields={{
              ID: selectedCategory.id,
              'Primary Category': selectedCategory.name,
              Segment: selectedCategory.segment,
              Description: selectedCategory.description,
              'Base Categories': `${selectedCategory.baseCategories.length} linked`,
            }}
          />

          <EditAlert
            isOpen={activeModal === 'edit'}
            onClose={closeModal}
            title="Edit Primary Category"
            message="Update core details for this category"
            fields={{
              categoryName: selectedCategory.name,
              segment: selectedCategory.segment,
              description: selectedCategory.description,
            }}
            onSave={handleSaveEdit}
          />

          <DeleteAlert
            isOpen={activeModal === 'delete'}
            onClose={closeModal}
            title="Delete Primary Category?"
            message={`Do you really want to delete ${selectedCategory.name}?`}
            onConfirm={handleDelete}
          />
        </>
      )}
    </div>
  )
}
