'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/input'
import Actions from '../../../basic-master/address-master/common/components/Actions.jsx'
import Header from '../../../basic-master/address-master/common/components/Header.jsx'
import CommonPagination from '../../../basic-master/address-master/common/components/Pagination.jsx'
import CommonTable from '../../../basic-master/address-master/common/components/Table.jsx'
import { 
  ViewAlert, 
  EditAlert, 
  DeleteAlert, 
  AddAlert 
} from '../../../basic-master/address-master/common/components/alert.jsx'

// ============================================================================
// CONSTANTS
// ============================================================================

const ITEMS_PER_PAGE = 10

// Scheme type options
const SCHEME_TYPES = ['Invoice Based', 'Quantity Based', 'Value Based', 'Combo Scheme']

// Scheme on options
const SCHEME_ON_OPTIONS = ['Product', 'Category', 'Brand', 'All Products']

// Customer type options
const CUSTOMER_TYPES = ['Retailer', 'Distributor', 'Wholesaler', 'Dealer', 'All']

// Status options
const STATUS_OPTIONS = ['Active', 'Inactive', 'Expired', 'Upcoming']

// ============================================================================
// INITIAL DATA
// ============================================================================

const initialSchemes = [
  {
    id: 1,
    title: 'Diwali Mega Offer 2024',
    type: 'Invoice Based',
    schemeOn: 'All Products',
    validFrom: '2024-10-15',
    validTo: '2024-11-15',
    customerType: 'All',
    status: 'Active',
  },
  {
    id: 2,
    title: 'New Year Special',
    type: 'Quantity Based',
    schemeOn: 'Product',
    validFrom: '2024-12-20',
    validTo: '2025-01-10',
    customerType: 'Retailer',
    status: 'Upcoming',
  },
  {
    id: 3,
    title: 'Summer Bonanza',
    type: 'Value Based',
    schemeOn: 'Category',
    validFrom: '2024-03-01',
    validTo: '2024-05-31',
    customerType: 'Distributor',
    status: 'Expired',
  },
  {
    id: 4,
    title: 'Monsoon Madness',
    type: 'Combo Scheme',
    schemeOn: 'Brand',
    validFrom: '2024-06-01',
    validTo: '2024-09-30',
    customerType: 'Wholesaler',
    status: 'Active',
  },
  {
    id: 5,
    title: 'Republic Day Offer',
    type: 'Invoice Based',
    schemeOn: 'Product',
    validFrom: '2024-01-20',
    validTo: '2024-02-05',
    customerType: 'All',
    status: 'Expired',
  },
  {
    id: 6,
    title: 'Independence Sale',
    type: 'Quantity Based',
    schemeOn: 'All Products',
    validFrom: '2024-08-10',
    validTo: '2024-08-20',
    customerType: 'Retailer',
    status: 'Expired',
  },
  {
    id: 7,
    title: 'Holi Special Discount',
    type: 'Value Based',
    schemeOn: 'Category',
    validFrom: '2024-03-15',
    validTo: '2024-03-25',
    customerType: 'Dealer',
    status: 'Expired',
  },
  {
    id: 8,
    title: 'Christmas Carnival',
    type: 'Combo Scheme',
    schemeOn: 'Brand',
    validFrom: '2024-12-15',
    validTo: '2024-12-31',
    customerType: 'All',
    status: 'Active',
  },
  {
    id: 9,
    title: 'Black Friday Deal',
    type: 'Invoice Based',
    schemeOn: 'Product',
    validFrom: '2024-11-25',
    validTo: '2024-11-30',
    customerType: 'Wholesaler',
    status: 'Active',
  },
  {
    id: 10,
    title: 'Year End Clearance',
    type: 'Quantity Based',
    schemeOn: 'All Products',
    validFrom: '2024-12-25',
    validTo: '2025-01-05',
    customerType: 'Distributor',
    status: 'Upcoming',
  },
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getStatusColor(status) {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    case 'Inactive':
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
    case 'Expired':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    case 'Upcoming':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
  }
}

// ============================================================================
// ACTIVITY BUTTONS COMPONENT
// ============================================================================

function ActivityButtons({ schemeId, schemeTitle }) {
  const router = useRouter()

  const handleProductSlab = () => {
    router.push(`/schema/invoice-schema/scheme/${schemeId}/product-slab`)
  }

  const handleTerritoryAssignment = () => {
    router.push(`/schema/invoice-schema/scheme/${schemeId}/territory-assignment`)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleProductSlab}
        className="inline-flex items-center rounded-md bg-zinc-600 px-2 py-1 text-[11px] font-medium text-white shadow-sm hover:bg-zinc-500 dark:bg-zinc-600 dark:hover:bg-zinc-500 whitespace-nowrap"
      >
        Product Slab
      </button>
      <button
        onClick={handleTerritoryAssignment}
        className="inline-flex items-center rounded-md bg-zinc-600 px-2 py-1 text-[11px] font-medium text-white shadow-sm hover:bg-zinc-500 dark:bg-zinc-600 dark:hover:bg-zinc-500 whitespace-nowrap"
      >
        Territory Assignment
      </button>
    </div>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function SchemePage() {
  const router = useRouter()

  // State management
  const [schemes, setSchemes] = useState(initialSchemes)

  // Modal state management
  const [activeModal, setActiveModal] = useState(null)
  const [selectedScheme, setSelectedScheme] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(schemes.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentSchemes = schemes.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // ========================================================================
  // ACTION HANDLERS
  // ========================================================================

  const handleView = (scheme) => {
    setSelectedScheme(scheme)
    setActiveModal('view')
  }

  const handleEdit = (scheme) => {
    setSelectedScheme(scheme)
    setActiveModal('edit')
  }

  const handleDelete = (scheme) => {
    setSelectedScheme(scheme)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setActiveModal('add')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedScheme(null)
  }

  // ========================================================================
  // CRUD HANDLERS
  // ========================================================================

  const handleAddScheme = (form) => {
    const newId = schemes.length > 0 ? Math.max(...schemes.map(s => s.id)) + 1 : 1

    setSchemes(prev => [...prev, {
      id: newId,
      title: form.title,
      type: form.type,
      schemeOn: form.schemeOn,
      validFrom: form.validFrom,
      validTo: form.validTo,
      customerType: form.customerType,
      status: form.status,
    }])
    closeModal()
  }

  const handleSaveEdit = (form) => {
    setSchemes(prev =>
      prev.map(scheme =>
        scheme.id === selectedScheme.id
          ? {
              ...scheme,
              title: form.title,
              type: form.type,
              schemeOn: form.schemeOn,
              validFrom: form.validFrom,
              validTo: form.validTo,
              customerType: form.customerType,
              status: form.status,
            }
          : scheme
      )
    )
    closeModal()
  }

  const handleConfirmDelete = () => {
    setSchemes(prev => prev.filter(s => s.id !== selectedScheme.id))
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
      {/* HEADER */}
      <Header
        title="Scheme"
        subtitle="Manage invoice schemes and offers"
        addLabel="Add Scheme"
        onAdd={handleAddClick}
        dropdownOptions={[
          { label: 'Import from Excel', onClick: handleImportExcel },
          { label: 'Export to Excel', onClick: handleExportExcel },
          { label: 'Download Format', onClick: handleDownloadFormat },
        ]}
      />

      {/* Table using CommonTable component */}
      <CommonTable
        data={currentSchemes.map(scheme => ({
          id: scheme.id,
          title: scheme.title,
          type: scheme.type,
          schemeOn: scheme.schemeOn,
          validFrom: scheme.validFrom,
          validTo: scheme.validTo,
          customerType: scheme.customerType,
          status: (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(scheme.status)}`}>
              {scheme.status}
            </span>
          ),
          activity: <ActivityButtons schemeId={scheme.id} schemeTitle={scheme.title} />,
          raw: scheme,
        }))}
        emptyMessage="No schemes found. Click 'Add Scheme' to create one."
        minWidth="1400px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '80px' },
          { key: 'title', label: 'Title', width: '220px' },
          { key: 'type', label: 'Type', width: '150px' },
          { key: 'schemeOn', label: 'Scheme On', width: '150px' },
          { key: 'validFrom', label: 'Valid From', width: '130px' },
          { key: 'validTo', label: 'Valid To', width: '130px' },
          { key: 'customerType', label: 'Customer Type', width: '150px' },
          { key: 'status', label: 'Status', width: '120px' },
          { key: 'activity', label: 'Activity', width: '240px' },
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
        title="Add Scheme"
        message="Enter the scheme details below"
        fields={{
          title: '',
          type: '',
          schemeOn: '',
          validFrom: '',
          validTo: '',
          customerType: '',
          status: '',
        }}
        fieldConfig={{
          title: {
            label: 'Title',
            type: 'text',
            placeholder: 'e.g., Diwali Mega Offer 2024',
            required: true,
          },
          type: {
            label: 'Type',
            type: 'select',
            options: SCHEME_TYPES.map(type => ({ value: type, label: type })),
            required: true,
          },
          schemeOn: {
            label: 'Scheme On',
            type: 'select',
            options: SCHEME_ON_OPTIONS.map(opt => ({ value: opt, label: opt })),
            required: true,
          },
          validFrom: {
            label: 'Valid From',
            type: 'date',
            required: true,
          },
          validTo: {
            label: 'Valid To',
            type: 'date',
            required: true,
          },
          customerType: {
            label: 'Customer Type',
            type: 'select',
            options: CUSTOMER_TYPES.map(type => ({ value: type, label: type })),
            required: true,
          },
          status: {
            label: 'Status',
            type: 'select',
            options: STATUS_OPTIONS.map(status => ({ value: status, label: status })),
            required: true,
          },
        }}
        onSave={handleAddScheme}
      />

      {/* ================================================================== */}
      {/* VIEW MODAL */}
      {/* ================================================================== */}

      {selectedScheme && (
        <ViewAlert
          isOpen={activeModal === 'view'}
          onClose={closeModal}
          title="Scheme Details"
          message="View the scheme information"
          fields={{
            ID: selectedScheme.id,
            Title: selectedScheme.title,
            Type: selectedScheme.type,
            'Scheme On': selectedScheme.schemeOn,
            'Valid From': selectedScheme.validFrom,
            'Valid To': selectedScheme.validTo,
            'Customer Type': selectedScheme.customerType,
            Status: selectedScheme.status,
          }}
        />
      )}

      {/* ================================================================== */}
      {/* EDIT MODAL */}
      {/* ================================================================== */}

      {selectedScheme && (
        <EditAlert
          isOpen={activeModal === 'edit'}
          onClose={closeModal}
          title="Edit Scheme"
          message="Update the scheme details"
          fields={{
            title: selectedScheme.title,
            type: selectedScheme.type,
            schemeOn: selectedScheme.schemeOn,
            validFrom: selectedScheme.validFrom,
            validTo: selectedScheme.validTo,
            customerType: selectedScheme.customerType,
            status: selectedScheme.status,
          }}
          fieldConfig={{
            title: {
              label: 'Title',
              type: 'text',
              placeholder: 'e.g., Diwali Mega Offer 2024',
              required: true,
            },
            type: {
              label: 'Type',
              type: 'select',
              options: SCHEME_TYPES.map(type => ({ value: type, label: type })),
              required: true,
            },
            schemeOn: {
              label: 'Scheme On',
              type: 'select',
              options: SCHEME_ON_OPTIONS.map(opt => ({ value: opt, label: opt })),
              required: true,
            },
            validFrom: {
              label: 'Valid From',
              type: 'date',
              required: true,
            },
            validTo: {
              label: 'Valid To',
              type: 'date',
              required: true,
            },
            customerType: {
              label: 'Customer Type',
              type: 'select',
              options: CUSTOMER_TYPES.map(type => ({ value: type, label: type })),
              required: true,
            },
            status: {
              label: 'Status',
              type: 'select',
              options: STATUS_OPTIONS.map(status => ({ value: status, label: status })),
              required: true,
            },
          }}
          onSave={handleSaveEdit}
        />
      )}

      {/* ================================================================== */}
      {/* DELETE MODAL */}
      {/* ================================================================== */}

      {selectedScheme && (
        <DeleteAlert
          isOpen={activeModal === 'delete'}
          onClose={closeModal}
          title="Delete Scheme"
          message={`Are you sure you want to delete "${selectedScheme.title}"? This action cannot be undone.`}
          itemName={selectedScheme.title}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  )
}
