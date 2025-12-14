// @ts-nocheck
'use client'

import { use, useEffect, useMemo, useState } from 'react'
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
import {
  COUPON_FLAG_OPTIONS,
  PRODUCT_STATUS_OPTIONS,
  PrimaryCategory,
  ProductMaster,
  productHierarchy,
} from '../../../../data'

const ITEMS_PER_PAGE = 10

type ModalState = 'add' | 'view' | 'edit' | 'delete' | null

type ProductForm = {
  productName: string
  productCode: string
  productImage: string
  productQuantity: string
  productUnit: string
  productValue: string
  couponGenerationFlag: string
  couponAllocationQuantity: string
  standardPacking: string
  moq: string
  basePrice: string
  status: string
}

type PageProps = {
  params: Promise<{
    primarySlug: string
    baseSlug: string
  }>
}

export default function ProductMasterPage({ params }: PageProps) {
  const { primarySlug, baseSlug } = use(params)
  const primaryCategory: PrimaryCategory | undefined = productHierarchy.find(
    (category) => category.slug === primarySlug
  )
  const baseCategory = primaryCategory?.baseCategories.find((base) => base.slug === baseSlug)

  const [products, setProducts] = useState<ProductMaster[]>(() => baseCategory?.products ?? [])
  const [activeModal, setActiveModal] = useState<ModalState>(null)
  const [selectedProduct, setSelectedProduct] = useState<ProductMaster | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE))
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [products, currentPage])

  useEffect(() => {
    if (!baseCategory) return
    setProducts(baseCategory.products)
  }, [baseCategory])

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return products.slice(start, start + ITEMS_PER_PAGE)
  }, [products, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const openModal = (type: ModalState, payload?: ProductMaster) => {
    setActiveModal(type)
    setSelectedProduct(payload ?? null)
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedProduct(null)
  }

  const handleAddProduct = (form: ProductForm) => {
    const label = form.productName?.trim()
    if (!label) return

    const newProduct: ProductMaster = {
      id: `PRD-${Date.now()}`,
      name: label,
      code: form.productCode?.trim() || label.replace(/\s+/g, '').slice(0, 8).toUpperCase(),
      image: form.productImage?.trim() || '',
      quantity: form.productQuantity || '0',
      unit: form.productUnit || 'Units',
      value: form.productValue || '₹0',
      couponGenerationFlag: (form.couponGenerationFlag as 'Enabled' | 'Disabled') || 'Enabled',
      couponAllocationQuantity: form.couponAllocationQuantity || '0',
      standardPacking: form.standardPacking || 'Single Unit',
      moq: form.moq || '0',
      basePrice: form.basePrice || '₹0',
      status: form.status || 'Active',
    }

    setProducts((prev) => [...prev, newProduct])
  }

  const handleSaveEdit = (form: ProductForm) => {
    if (!selectedProduct) return

    setProducts((prev) =>
      prev.map((product) =>
        product.id === selectedProduct.id
          ? {
              ...product,
              name: form.productName || product.name,
              code: form.productCode || product.code,
              image: form.productImage || product.image,
              quantity: form.productQuantity || product.quantity,
              unit: form.productUnit || product.unit,
              value: form.productValue || product.value,
              couponGenerationFlag:
                (form.couponGenerationFlag as 'Enabled' | 'Disabled') || product.couponGenerationFlag,
              couponAllocationQuantity: form.couponAllocationQuantity || product.couponAllocationQuantity,
              standardPacking: form.standardPacking || product.standardPacking,
              moq: form.moq || product.moq,
              basePrice: form.basePrice || product.basePrice,
              status: form.status || product.status,
            }
          : product
      )
    )
  }

  const handleDelete = () => {
    if (!selectedProduct) return
    setProducts((prev) => prev.filter((product) => product.id !== selectedProduct.id))
  }

  const tableRows = paginatedProducts.map((product) => ({
    id: product.id,
    baseCategoryName: baseCategory?.name ?? '—',
    productName: product.name,
    productCode: product.code,
    productImage: product.image || 'Not Uploaded',
    productQuantity: product.quantity,
    productUnit: product.unit,
    productValue: product.value,
    couponGenerationFlag: product.couponGenerationFlag,
    couponAllocationQuantity: product.couponAllocationQuantity,
    standardPacking: product.standardPacking,
    moq: product.moq,
    basePrice: product.basePrice,
    status: product.status,
    raw: product,
  }))

  if (!primaryCategory || !baseCategory) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-red-500">
        Base category not found.
      </div>
    )
  }

  const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE))

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* @ts-ignore - Header is a JSX component */}
      <Header
        title={
          <>
            {baseCategory.name} •{' '}
            <span className="text-zinc-600 dark:text-zinc-300">Product Master</span>
          </>
        }
        subtitle={
          <span>
            <span className="font-medium text-zinc-600 dark:text-zinc-300">Primary Category:</span>{' '}
            {primaryCategory.name}
          </span>
        }
        addLabel="Add Product"
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
        emptyMessage="No products configured under this base category."
        minWidth="1600px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '100px' },
          { key: 'baseCategoryName', label: 'Base Category', width: '140px' },
          { key: 'productName', label: 'Product Name', width: '150px' },
          { key: 'productCode', label: 'Product Code', width: '120px' },
          { key: 'productImage', label: 'Image', width: '80px' },
          { key: 'productQuantity', label: 'Quantity', width: '90px' },
          { key: 'productUnit', label: 'Unit', width: '80px' },
          { key: 'productValue', label: 'Value', width: '100px' },
          { key: 'couponGenerationFlag', label: 'Coupon Flag', width: '110px' },
          { key: 'couponAllocationQuantity', label: 'Coupon Qty', width: '100px' },
          { key: 'standardPacking', label: 'Packing', width: '100px' },
          { key: 'moq', label: 'MOQ', width: '80px' },
          { key: 'basePrice', label: 'Price', width: '100px' },
          { key: 'status', label: 'Status', width: '90px' },
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
        title="Add Product"
        message={`Attach a new product master under ${baseCategory.name}`}
        fields={{
          productName: '',
          productCode: '',
          productImage: '',
          productQuantity: '',
          productUnit: 'Units',
          productValue: '',
          couponGenerationFlag: 'Enabled',
          couponAllocationQuantity: '',
          standardPacking: 'Single Unit',
          moq: '',
          basePrice: '',
          status: 'Active',
        }}
        dropdowns={{
          status: PRODUCT_STATUS_OPTIONS,
          couponGenerationFlag: COUPON_FLAG_OPTIONS,
        }}
        onSave={handleAddProduct}
      />

      {selectedProduct && (
        <>
          <ViewAlert
            isOpen={activeModal === 'view'}
            onClose={closeModal}
            title="Product Details"
            message="Complete reference for the selected product"
            fields={{
              ID: selectedProduct.id,
              'Base Category': baseCategory.name,
              Product: selectedProduct.name,
              'Product Code': selectedProduct.code,
              'Product Image': selectedProduct.image || 'Not Uploaded',
              Quantity: selectedProduct.quantity,
              Unit: selectedProduct.unit,
              'Product Value': selectedProduct.value,
              'Coupon Generation Flag': selectedProduct.couponGenerationFlag,
              'Coupon Allocation Quantity': selectedProduct.couponAllocationQuantity,
              'Standard Packing': selectedProduct.standardPacking,
              Moq: selectedProduct.moq,
              'Base Price': selectedProduct.basePrice,
              Status: selectedProduct.status,
            }}
          />

          <EditAlert
            isOpen={activeModal === 'edit'}
            onClose={closeModal}
            title="Edit Product"
            message="Update attributes for this product master"
            fields={{
              productName: selectedProduct.name,
              productCode: selectedProduct.code,
              productImage: selectedProduct.image,
              productQuantity: selectedProduct.quantity,
              productUnit: selectedProduct.unit,
              productValue: selectedProduct.value,
              couponGenerationFlag: selectedProduct.couponGenerationFlag,
              couponAllocationQuantity: selectedProduct.couponAllocationQuantity,
              standardPacking: selectedProduct.standardPacking,
              moq: selectedProduct.moq,
              basePrice: selectedProduct.basePrice,
              status: selectedProduct.status,
            }}
            dropdowns={{
              status: PRODUCT_STATUS_OPTIONS,
              couponGenerationFlag: COUPON_FLAG_OPTIONS,
            }}
            onSave={handleSaveEdit}
          />

          <DeleteAlert
            isOpen={activeModal === 'delete'}
            onClose={closeModal}
            title="Delete Product?"
            message={`Do you really want to delete ${selectedProduct.name}?`}
            onConfirm={handleDelete}
          />
        </>
      )}
    </div>
  )
}
