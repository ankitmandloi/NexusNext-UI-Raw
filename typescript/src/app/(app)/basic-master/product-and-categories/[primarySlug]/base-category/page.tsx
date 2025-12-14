// @ts-nocheck
'use client'

import { use, useEffect, useMemo, useState } from 'react'
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
import { BaseCategory, productHierarchy, slugifyLabel } from '../../data'

const ITEMS_PER_PAGE = 10

type ModalState = 'add' | 'view' | 'edit' | 'delete' | null

type BaseCategoryForm = {
  baseCategoryName: string
  code: string
  assortment: string
  description: string
}

type PageProps = {
  params: Promise<{
    primarySlug: string
  }>
}

export default function BaseCategoryPage({ params }: PageProps) {
  const { primarySlug } = use(params)
  const primaryCategory = productHierarchy.find((category) => category.slug === primarySlug)

  const [baseCategories, setBaseCategories] = useState<BaseCategory[]>(() => primaryCategory?.baseCategories ?? [])
  const [activeModal, setActiveModal] = useState<ModalState>(null)
  const [selectedBase, setSelectedBase] = useState<BaseCategory | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(baseCategories.length / ITEMS_PER_PAGE))
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [baseCategories, currentPage])

  useEffect(() => {
    if (!primaryCategory) return
    setBaseCategories(primaryCategory.baseCategories)
  }, [primaryCategory])

  const paginatedBaseCategories = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return baseCategories.slice(start, start + ITEMS_PER_PAGE)
  }, [baseCategories, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const openModal = (type: ModalState, payload?: BaseCategory) => {
    setActiveModal(type)
    setSelectedBase(payload ?? null)
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedBase(null)
  }

  const handleAddBaseCategory = (form: BaseCategoryForm) => {
    if (!primaryCategory) return

    const label = form.baseCategoryName.trim()
    if (!label) return

    const newBase: BaseCategory = {
      id: `BC-${Date.now()}`,
      name: label,
      slug: slugifyLabel(label),
      code: form.code || 'NA',
      assortment: form.assortment || primaryCategory.segment,
      description: form.description || 'No description added yet.',
      products: [],
    }

    setBaseCategories((prev) => [...prev, newBase])
  }

  const handleSaveEdit = (form: BaseCategoryForm) => {
    if (!selectedBase) return

    setBaseCategories((prev) =>
      prev.map((base) =>
        base.id === selectedBase.id
          ? {
              ...base,
              name: form.baseCategoryName || base.name,
              slug: slugifyLabel(form.baseCategoryName || base.name),
              code: form.code || base.code,
              assortment: form.assortment || base.assortment,
              description: form.description || base.description,
            }
          : base
      )
    )
  }

  const handleDelete = () => {
    if (!selectedBase) return
    setBaseCategories((prev) => prev.filter((base) => base.id !== selectedBase.id))
  }

  const tableRows = paginatedBaseCategories.map((base) => ({
    id: base.id,
    baseCategoryName: base.name,
    code: base.code,
    assortment: base.assortment,
    productCount: `${base.products.length} Products`,
    navigator: (
      <Button
        href={`/basic-master/product-and-categories/${primarySlug}/base-category/${base.slug}/product-master`}
        color="zinc"
        className="text-xs px-2 py-1 h-7 flex items-center justify-center"
      >
        Products
      </Button>
    ),
    raw: base,
  }))

  if (!primaryCategory) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-red-500">
        Primary category not found.
      </div>
    )
  }

  const totalPages = Math.max(1, Math.ceil(baseCategories.length / ITEMS_PER_PAGE))

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* @ts-ignore - Header is a JSX component */}
      <Header
        title={
          <>
            {primaryCategory.name} •{' '}
            <span className="text-zinc-600 dark:text-zinc-300">Base Categories</span>
          </>
        }
        subtitle={
          <div className="flex flex-col gap-1">
            <span>
              <span className="font-medium text-zinc-600 dark:text-zinc-300">Primary Category:</span>{' '}
              {primaryCategory.name}
            </span>
            <span>Maintain second-level categorization and map them to product masters</span>
          </div>
        }
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
        emptyMessage="No base categories yet for this primary category."
        minWidth="1250px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '100px' },
          { key: 'baseCategoryName', label: 'Base Category', width: '200px' },
          { key: 'code', label: 'Code', width: '140px' },
          { key: 'assortment', label: 'Assortment', width: '180px' },
          { key: 'productCount', label: 'Products', width: '120px' },
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
        title="Add Base Category"
        message={`Define a base category within ${primaryCategory.name}`}
        fields={{ baseCategoryName: '', code: '', assortment: '', description: '' }}
        onSave={handleAddBaseCategory}
      />

      {selectedBase && (
        <>
          <ViewAlert
            isOpen={activeModal === 'view'}
            onClose={closeModal}
            title="Base Category Details"
            message="Overview for the selected base category"
            fields={{
              ID: selectedBase.id,
              'Base Category': selectedBase.name,
              Code: selectedBase.code,
              Assortment: selectedBase.assortment,
              Description: selectedBase.description,
              Products: `${selectedBase.products.length} mapped`,
            }}
          />

          <EditAlert
            isOpen={activeModal === 'edit'}
            onClose={closeModal}
            title="Edit Base Category"
            message="Update the enrollment for this base category"
            fields={{
              baseCategoryName: selectedBase.name,
              code: selectedBase.code,
              assortment: selectedBase.assortment,
              description: selectedBase.description,
            }}
            onSave={handleSaveEdit}
          />

          <DeleteAlert
            isOpen={activeModal === 'delete'}
            onClose={closeModal}
            title="Delete Base Category?"
            message={`Do you really want to delete ${selectedBase.name}?`}
            onConfirm={handleDelete}
          />
        </>
      )}
    </div>
  )
}
