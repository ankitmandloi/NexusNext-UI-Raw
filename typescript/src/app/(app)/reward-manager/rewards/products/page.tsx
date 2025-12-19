// @ts-nocheck
'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Textarea } from '@/components/textarea'
import Header from '@/app/(app)/basic-master/address-master/common/components/Header.jsx'
import CommonTable from '@/app/(app)/basic-master/address-master/common/components/Table.jsx'
import CommonPagination from '@/app/(app)/basic-master/address-master/common/components/Pagination.jsx'
import Actions from '@/app/(app)/basic-master/address-master/common/components/Actions.jsx'
import { RewardProduct, rewardHierarchy, REWARD_TYPE_OPTIONS } from '../primary-category/data'

const ITEMS_PER_PAGE = 10

type ModalState = 'add' | 'view' | 'edit' | 'delete' | null

export default function RewardProductsPage() {
  const searchParams = useSearchParams()
  const baseSlug = searchParams.get('base')

  // Get all products from all base categories
  const allProducts = useMemo(() => {
    const products: RewardProduct[] = []
    rewardHierarchy.forEach((primary) => {
      primary.baseCategories.forEach((base) => {
        base.products.forEach((product) => {
          products.push(product)
        })
      })
    })
    return products
  }, [])

  const [products, setProducts] = useState<RewardProduct[]>(allProducts)
  const [activeModal, setActiveModal] = useState<ModalState>(null)
  const [selectedProduct, setSelectedProduct] = useState<RewardProduct | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  
  // Form states
  const [baseCategory, setBaseCategory] = useState('')
  const [productName, setProductName] = useState('')
  const [code, setCode] = useState('')
  const [hsn, setHsn] = useState('')
  const [basePrice, setBasePrice] = useState('')
  const [listPrice, setListPrice] = useState('')
  const [mrp, setMrp] = useState('')
  const [tax, setTax] = useState('')
  const [points, setPoints] = useState('')
  const [details, setDetails] = useState('')
  const [image, setImage] = useState('')
  const [rewardType, setRewardType] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Filter by base category if specified
  const filteredProducts = useMemo(() => {
    if (!baseSlug) return products
    return products.filter((product) => {
      return product.baseCategory
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') === baseSlug
    })
  }, [products, baseSlug])

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE))
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [filteredProducts, currentPage])

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredProducts, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const openModal = (type: ModalState, payload?: RewardProduct) => {
    setActiveModal(type)
    setSelectedProduct(payload ?? null)
    if (type === 'add') {
      setBaseCategory('')
      setProductName('')
      setCode('')
      setHsn('')
      setBasePrice('')
      setListPrice('')
      setMrp('')
      setTax('')
      setPoints('')
      setDetails('')
      setImage('')
      setRewardType('')
    } else if (type === 'edit' && payload) {
      setBaseCategory(payload.baseCategory)
      setProductName(payload.name)
      setCode(payload.code)
      setHsn(payload.hsn)
      setBasePrice(payload.basePrice)
      setListPrice(payload.listPrice)
      setMrp(payload.mrp)
      setTax(payload.tax)
      setPoints(payload.points)
      setDetails(payload.details)
      setImage(payload.image)
      setRewardType(payload.rewardType)
    }
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedProduct(null)
    setBaseCategory('')
    setProductName('')
    setCode('')
    setHsn('')
    setBasePrice('')
    setListPrice('')
    setMrp('')
    setTax('')
    setPoints('')
    setDetails('')
    setImage('')
    setRewardType('')
    setIsSubmitting(false)
  }

  const handleAddProduct = async () => {
    const trimmedName = productName.trim()
    if (!trimmedName || !baseCategory) return

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      const newProduct: RewardProduct = {
        id: `RP-${Date.now()}`,
        name: trimmedName,
        baseCategory: baseCategory,
        code: code || '',
        hsn: hsn || '',
        basePrice: basePrice || '0',
        listPrice: listPrice || '0',
        mrp: mrp || '0',
        tax: tax || '0',
        points: points || '0',
        details: details || '',
        image: image || '/rewards/default-product.jpg',
        rewardType: rewardType || 'Gift',
      }

      setProducts((prev) => [...prev, newProduct])
      setIsSubmitting(false)
      closeModal()
    }, 300)
  }

  const handleSaveEdit = async () => {
    if (!selectedProduct || !productName.trim()) return

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === selectedProduct.id
            ? {
                ...product,
                name: productName,
                baseCategory: baseCategory || product.baseCategory,
                code: code || product.code,
                hsn: hsn || product.hsn,
                basePrice: basePrice || product.basePrice,
                listPrice: listPrice || product.listPrice,
                mrp: mrp || product.mrp,
                tax: tax || product.tax,
                points: points || product.points,
                details: details || product.details,
                image: image || product.image,
                rewardType: rewardType || product.rewardType,
              }
            : product
        )
      )
      setIsSubmitting(false)
      closeModal()
    }, 300)
  }

  const handleDelete = async () => {
    if (!selectedProduct) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setProducts((prev) => prev.filter((product) => product.id !== selectedProduct.id))
      setIsSubmitting(false)
      closeModal()
    }, 300)
  }

  const tableRows = paginatedProducts.map((product) => ({
    id: product.id,
    name: product.name,
    baseCategory: product.baseCategory,
    code: product.code,
    basePrice: `₹${product.basePrice}`,
    mrp: `₹${product.mrp}`,
    tax: `${product.tax}%`,
    points: product.points,
    image: product.image,
    rewardType: product.rewardType,
    raw: product,
  }))

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE))

  // Prepare base category options for dropdown
  const baseCategoryOptions = []
  rewardHierarchy.forEach((primary) => {
    primary.baseCategories.forEach((base) => {
      baseCategoryOptions.push(base.name)
    })
  })

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* @ts-ignore - Header is a JSX component */}
      <Header
        title={
          <>
            Reward Manager &nbsp;
            <span className="text-zinc-600 dark:text-zinc-300">Products</span>
          </>
        }
        subtitle="Manage reward products"
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
        emptyMessage="No products found. Use 'Add Product' to create one."
        minWidth="1500px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '100px' },
          { key: 'name', label: 'Name', width: '200px' },
          { key: 'baseCategory', label: 'Base Category', width: '150px' },
          { key: 'code', label: 'Code', width: '100px' },
          { key: 'basePrice', label: 'Base Price', width: '100px' },
          { key: 'mrp', label: 'MRP', width: '100px' },
          { key: 'tax', label: 'Tax', width: '80px' },
          { key: 'points', label: 'Points', width: '90px' },
          { key: 'image', label: 'Image', width: '100px' },
          { key: 'rewardType', label: 'Reward Type', width: '130px' },
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
        <AlertTitle>Add Product</AlertTitle>
        <AlertDescription>Create a new reward product.</AlertDescription>
        <AlertBody>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Base Category *
              </label>
              <select
                value={baseCategory}
                onChange={(e) => setBaseCategory(e.target.value)}
                className="w-full px-3 py-2 border border-zinc-950/10 dark:border-white/10 rounded-md bg-white dark:bg-zinc-900"
              >
                <option value="">Select Base Category</option>
                {baseCategoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Name *
              </label>
              <Input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Code
                </label>
                <Input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Product code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  HSN
                </label>
                <Input
                  type="text"
                  value={hsn}
                  onChange={(e) => setHsn(e.target.value)}
                  placeholder="HSN code"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Base Price
                </label>
                <Input
                  type="number"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  List Price
                </label>
                <Input
                  type="number"
                  value={listPrice}
                  onChange={(e) => setListPrice(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  MRP
                </label>
                <Input
                  type="number"
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Tax (%)
                </label>
                <Input
                  type="number"
                  value={tax}
                  onChange={(e) => setTax(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Points
                </label>
                <Input
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Details
              </label>
              <Textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Enter product details"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Image URL
              </label>
              <Input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Enter image URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Reward Type *
              </label>
              <select
                value={rewardType}
                onChange={(e) => setRewardType(e.target.value)}
                className="w-full px-3 py-2 border border-zinc-950/10 dark:border-white/10 rounded-md bg-white dark:bg-zinc-900"
              >
                <option value="">Select Reward Type</option>
                {REWARD_TYPE_OPTIONS.map((type) => (
                  <option key={type.id} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </AlertBody>
        <AlertActions>
          <Button plain onClick={closeModal} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button color="dark/zinc" onClick={handleAddProduct} disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add'}
          </Button>
        </AlertActions>
      </Alert>

      {/* View Modal */}
      {selectedProduct && (
        <Alert open={activeModal === 'view'} onClose={closeModal}>
          <AlertTitle>Product Details</AlertTitle>
          <AlertDescription>View the details of the selected product.</AlertDescription>
          <AlertBody>
            <div className="space-y-3">
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">ID:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedProduct.id}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Name:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedProduct.name}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Base Category:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedProduct.baseCategory}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Code:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedProduct.code}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">HSN:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedProduct.hsn}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Base Price:</span>
                <span className="text-zinc-600 dark:text-zinc-400">₹{selectedProduct.basePrice}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">List Price:</span>
                <span className="text-zinc-600 dark:text-zinc-400">₹{selectedProduct.listPrice}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">MRP:</span>
                <span className="text-zinc-600 dark:text-zinc-400">₹{selectedProduct.mrp}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Tax:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedProduct.tax}%</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Points:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedProduct.points}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Details:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedProduct.details}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Image URL:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedProduct.image}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-zinc-700 dark:text-zinc-300">Reward Type:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{selectedProduct.rewardType}</span>
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
      {selectedProduct && (
        <Alert open={activeModal === 'edit'} onClose={closeModal}>
          <AlertTitle>Edit Product</AlertTitle>
          <AlertDescription>Update the product information.</AlertDescription>
          <AlertBody>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Base Category *
                </label>
                <select
                  value={baseCategory}
                  onChange={(e) => setBaseCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-950/10 dark:border-white/10 rounded-md bg-white dark:bg-zinc-900"
                >
                  <option value="">Select Base Category</option>
                  {baseCategoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Name *
                </label>
                <Input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter product name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Code
                  </label>
                  <Input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Product code"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    HSN
                  </label>
                  <Input
                    type="text"
                    value={hsn}
                    onChange={(e) => setHsn(e.target.value)}
                    placeholder="HSN code"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Base Price
                  </label>
                  <Input
                    type="number"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    List Price
                  </label>
                  <Input
                    type="number"
                    value={listPrice}
                    onChange={(e) => setListPrice(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    MRP
                  </label>
                  <Input
                    type="number"
                    value={mrp}
                    onChange={(e) => setMrp(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Tax (%)
                  </label>
                  <Input
                    type="number"
                    value={tax}
                    onChange={(e) => setTax(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Points
                  </label>
                  <Input
                    type="number"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Details
                </label>
                <Textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Enter product details"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Image URL
                </label>
                <Input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Enter image URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Reward Type *
                </label>
                <select
                  value={rewardType}
                  onChange={(e) => setRewardType(e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-950/10 dark:border-white/10 rounded-md bg-white dark:bg-zinc-900"
                >
                  <option value="">Select Reward Type</option>
                  {REWARD_TYPE_OPTIONS.map((type) => (
                    <option key={type.id} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
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
      {selectedProduct && (
        <Alert open={activeModal === 'delete'} onClose={closeModal}>
          <AlertTitle>Delete Product</AlertTitle>
          <AlertDescription>
            Are you sure you want to delete "{selectedProduct.name}"? This action cannot be undone.
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
