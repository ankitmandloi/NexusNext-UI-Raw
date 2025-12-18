'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/16/solid'
import Actions from '../../../../../basic-master/address-master/common/components/Actions.jsx'
import Header from '../../../../../basic-master/address-master/common/components/Header.jsx'
import CommonPagination from '../../../../../basic-master/address-master/common/components/Pagination.jsx'
import CommonTable from '../../../../../basic-master/address-master/common/components/Table.jsx'
import { 
  ViewAlert, 
  EditAlert, 
  DeleteAlert, 
  AddAlert 
} from '../../../../../basic-master/address-master/common/components/Alert.jsx'

// ============================================================================
// CONSTANTS
// ============================================================================

const ITEMS_PER_PAGE = 10

// Category options
const CATEGORIES = ['Electronics', 'Appliances', 'Furniture', 'Clothing', 'Groceries', 'Beverages']

// Product options
const PRODUCTS = {
  'Electronics': ['Smartphone', 'Laptop', 'Tablet', 'Smart TV', 'Headphones'],
  'Appliances': ['Refrigerator', 'Washing Machine', 'Microwave', 'Air Conditioner'],
  'Furniture': ['Sofa', 'Dining Table', 'Bed', 'Wardrobe'],
  'Clothing': ['Shirt', 'Jeans', 'T-Shirt', 'Dress'],
  'Groceries': ['Rice', 'Wheat', 'Pulses', 'Oil'],
  'Beverages': ['Soft Drink', 'Juice', 'Water', 'Energy Drink'],
}

// Mock scheme data
const SCHEMES = {
  1: 'Diwali Mega Offer 2024',
  2: 'New Year Special',
  3: 'Summer Bonanza',
  4: 'Monsoon Madness',
  5: 'Republic Day Offer',
  6: 'Independence Sale',
  7: 'Holi Special Discount',
  8: 'Christmas Carnival',
  9: 'Black Friday Deal',
  10: 'Year End Clearance',
}

// ============================================================================
// INITIAL DATA
// ============================================================================

const initialProductSlabs = {
  1: [
    {
      id: 1,
      slabTitle: 'Slab 1 - Basic',
      invoiceScheme: 'Diwali Mega Offer 2024',
      category: 'Electronics',
      product: 'Smartphone',
      pointsPerQty: 10,
    },
    {
      id: 2,
      slabTitle: 'Slab 2 - Premium',
      invoiceScheme: 'Diwali Mega Offer 2024',
      category: 'Electronics',
      product: 'Laptop',
      pointsPerQty: 50,
    },
    {
      id: 3,
      slabTitle: 'Slab 3 - Gold',
      invoiceScheme: 'Diwali Mega Offer 2024',
      category: 'Appliances',
      product: 'Refrigerator',
      pointsPerQty: 100,
    },
  ],
  2: [
    {
      id: 1,
      slabTitle: 'New Year Slab 1',
      invoiceScheme: 'New Year Special',
      category: 'Clothing',
      product: 'Shirt',
      pointsPerQty: 5,
    },
    {
      id: 2,
      slabTitle: 'New Year Slab 2',
      invoiceScheme: 'New Year Special',
      category: 'Clothing',
      product: 'Jeans',
      pointsPerQty: 8,
    },
  ],
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function ProductSlabPage() {
  const router = useRouter()
  const params = useParams()
  const schemeId = params?.id ? parseInt(params.id) : null

  // State management
  const [productSlabs, setProductSlabs] = useState([])
  const [schemeName, setSchemeName] = useState('')

  // Modal state management
  const [activeModal, setActiveModal] = useState(null)
  const [selectedSlab, setSelectedSlab] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)

  // Load data based on scheme ID
  useEffect(() => {
    if (schemeId) {
      setProductSlabs(initialProductSlabs[schemeId] || [])
      setSchemeName(SCHEMES[schemeId] || `Scheme #${schemeId}`)
    }
  }, [schemeId])

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(productSlabs.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProductSlabs = productSlabs.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // ========================================================================
  // ACTION HANDLERS
  // ========================================================================

  const handleView = (slab) => {
    setSelectedSlab(slab)
    setActiveModal('view')
  }

  const handleEdit = (slab) => {
    setSelectedSlab(slab)
    setActiveModal('edit')
  }

  const handleDelete = (slab) => {
    setSelectedSlab(slab)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setActiveModal('add')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedSlab(null)
  }

  const handleBack = () => {
    router.push('/schema/invoice-schema/scheme')
  }

  // ========================================================================
  // CRUD HANDLERS
  // ========================================================================

  const handleAddSlab = (form) => {
    const newId = productSlabs.length > 0 ? Math.max(...productSlabs.map(s => s.id)) + 1 : 1

    setProductSlabs(prev => [...prev, {
      id: newId,
      slabTitle: form.slabTitle,
      invoiceScheme: schemeName,
      category: form.category,
      product: form.product,
      pointsPerQty: parseFloat(form.pointsPerQty),
    }])
    closeModal()
  }

  const handleSaveEdit = (form) => {
    setProductSlabs(prev =>
      prev.map(slab =>
        slab.id === selectedSlab.id
          ? {
              ...slab,
              slabTitle: form.slabTitle,
              category: form.category,
              product: form.product,
              pointsPerQty: parseFloat(form.pointsPerQty),
            }
          : slab
      )
    )
    closeModal()
  }

  const handleConfirmDelete = () => {
    setProductSlabs(prev => prev.filter(s => s.id !== selectedSlab.id))
    closeModal()
  }

  // Import/Export handlers
  const handleImportExcel = () => {
    console.log('Import from Excel clicked')
  }

  const handleExportExcel = () => {
    console.log('Export to Excel clicked')
  }

  const handleDownloadFormat = () => {
    console.log('Download Format clicked')
  }

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 110px)" }}>
      {/* BACK BUTTON */}
      <div className="mb-4">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 dark:bg-zinc-800 dark:text-white dark:ring-zinc-700 dark:hover:bg-zinc-700"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Schemes
        </button>
      </div>

      {/* HEADER */}
      <Header
        title={`Product Slab List - ${schemeName}`}
        subtitle="Manage product slabs and points for this scheme"
        addLabel="Add Product Slab"
        onAdd={handleAddClick}
        dropdownOptions={[
          { label: 'Import from Excel', onClick: handleImportExcel },
          { label: 'Export to Excel', onClick: handleExportExcel },
          { label: 'Download Format', onClick: handleDownloadFormat },
        ]}
      />

      {/* Table using CommonTable component */}
      <CommonTable
        data={currentProductSlabs.map(slab => ({
          id: slab.id,
          slabTitle: slab.slabTitle,
          invoiceScheme: slab.invoiceScheme,
          category: slab.category,
          product: slab.product,
          pointsPerQty: slab.pointsPerQty,
          raw: slab,
        }))}
        emptyMessage="No product slabs found. Click 'Add Product Slab' to create one."
        minWidth="1200px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '80px' },
          { key: 'slabTitle', label: 'Slab Title', width: '200px' },
          { key: 'invoiceScheme', label: 'Invoice Scheme', width: '220px' },
          { key: 'category', label: 'Category', width: '150px' },
          { key: 'product', label: 'Product', width: '180px' },
          { key: 'pointsPerQty', label: 'Points(per qty)', width: '150px' },
        ]}
        renderActions={(row) => (
          <Actions
            onView={() => handleView(row.raw)}
            onEdit={() => handleEdit(row.raw)}
            onDelete={() => handleDelete(row.raw)}
          />
        )}
        pagination={
          <CommonPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        }
      />

      {/* ================================================================== */}
      {/* ADD MODAL */}
      {/* ================================================================== */}

      <AddAlert
        isOpen={activeModal === 'add'}
        onClose={closeModal}
        title="Add Product Slab"
        message="Enter the product slab details below"
        fields={{
          slabTitle: '',
          category: '',
          product: '',
          pointsPerQty: '',
        }}
        fieldConfig={{
          slabTitle: {
            label: 'Slab Title',
            type: 'text',
            placeholder: 'e.g., Slab 1 - Basic',
            required: true,
          },
          category: {
            label: 'Category',
            type: 'select',
            options: CATEGORIES.map(cat => ({ value: cat, label: cat })),
            required: true,
          },
          product: {
            label: 'Product',
            type: 'text',
            placeholder: 'e.g., Smartphone',
            required: true,
          },
          pointsPerQty: {
            label: 'Points(per qty)',
            type: 'number',
            placeholder: 'e.g., 10',
            required: true,
          },
        }}
        onSave={handleAddSlab}
      />

      {/* ================================================================== */}
      {/* VIEW MODAL */}
      {/* ================================================================== */}

      {selectedSlab && (
        <ViewAlert
          isOpen={activeModal === 'view'}
          onClose={closeModal}
          title="Product Slab Details"
          message="View the product slab information"
          fields={{
            ID: selectedSlab.id,
            'Slab Title': selectedSlab.slabTitle,
            'Invoice Scheme': selectedSlab.invoiceScheme,
            Category: selectedSlab.category,
            Product: selectedSlab.product,
            'Points(per qty)': selectedSlab.pointsPerQty,
          }}
        />
      )}

      {/* ================================================================== */}
      {/* EDIT MODAL */}
      {/* ================================================================== */}

      {selectedSlab && (
        <EditAlert
          isOpen={activeModal === 'edit'}
          onClose={closeModal}
          title="Edit Product Slab"
          message="Update the product slab details"
          fields={{
            slabTitle: selectedSlab.slabTitle,
            category: selectedSlab.category,
            product: selectedSlab.product,
            pointsPerQty: selectedSlab.pointsPerQty,
          }}
          fieldConfig={{
            slabTitle: {
              label: 'Slab Title',
              type: 'text',
              placeholder: 'e.g., Slab 1 - Basic',
              required: true,
            },
            category: {
              label: 'Category',
              type: 'select',
              options: CATEGORIES.map(cat => ({ value: cat, label: cat })),
              required: true,
            },
            product: {
              label: 'Product',
              type: 'text',
              placeholder: 'e.g., Smartphone',
              required: true,
            },
            pointsPerQty: {
              label: 'Points(per qty)',
              type: 'number',
              placeholder: 'e.g., 10',
              required: true,
            },
          }}
          onSave={handleSaveEdit}
        />
      )}

      {/* ================================================================== */}
      {/* DELETE MODAL */}
      {/* ================================================================== */}

      {selectedSlab && (
        <DeleteAlert
          isOpen={activeModal === 'delete'}
          onClose={closeModal}
          title="Delete Product Slab"
          message={`Are you sure you want to delete "${selectedSlab.slabTitle}"? This action cannot be undone.`}
          itemName={selectedSlab.slabTitle}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  )
}
