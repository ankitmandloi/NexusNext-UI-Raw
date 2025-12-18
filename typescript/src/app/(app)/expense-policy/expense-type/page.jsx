'use client'

import { useState } from 'react'
import { Input } from '@/components/input'
import Actions from '../../basic-master/address-master/common/components/Actions.jsx'
import Header from '../../basic-master/address-master/common/components/Header.jsx'
import CommonPagination from '../../basic-master/address-master/common/components/Pagination.jsx'
import CommonTable from '../../basic-master/address-master/common/components/Table.jsx'
import { 
  ViewAlert, 
  EditAlert, 
  DeleteAlert, 
  AddAlert 
} from '../../basic-master/address-master/common/components/Alert.jsx'

// ============================================================================
// CONSTANTS
// ============================================================================

const ITEMS_PER_PAGE = 10

// Usage type options
const USAGE_TYPES = [
  'Travel',
  'Accommodation',
  'Food & Beverage',
  'Transportation',
  'Communication',
  'Entertainment',
  'Miscellaneous',
]

// ============================================================================
// INITIAL DATA
// ============================================================================

const initialExpenseTypes = [
  {
    id: 1,
    expenseTitle: 'Flight Expense',
    usageType: 'Travel',
    isLocal: false,
    expenseCode: 'FLT-001',
    shortDescription: 'Air travel expenses for business trips',
  },
  {
    id: 2,
    expenseTitle: 'Train Expense',
    usageType: 'Travel',
    isLocal: false,
    expenseCode: 'TRN-001',
    shortDescription: 'Railway travel expenses',
  },
  {
    id: 3,
    expenseTitle: 'Bus Expense',
    usageType: 'Travel',
    isLocal: true,
    expenseCode: 'BUS-001',
    shortDescription: 'Bus travel expenses',
  },
  {
    id: 4,
    expenseTitle: 'Lodging / Boarding',
    usageType: 'Accommodation',
    isLocal: false,
    expenseCode: 'LDG-001',
    shortDescription: 'Hotel and accommodation expenses',
  },
  {
    id: 5,
    expenseTitle: 'Local Conveyance',
    usageType: 'Transportation',
    isLocal: true,
    expenseCode: 'LCV-001',
    shortDescription: 'Local transportation within city',
  },
  {
    id: 6,
    expenseTitle: 'Auto Conveyance',
    usageType: 'Transportation',
    isLocal: true,
    expenseCode: 'ACV-001',
    shortDescription: 'Auto rickshaw expenses',
  },
  {
    id: 7,
    expenseTitle: 'Taxi / Cab',
    usageType: 'Transportation',
    isLocal: true,
    expenseCode: 'TAX-001',
    shortDescription: 'Taxi and cab service expenses',
  },
  {
    id: 8,
    expenseTitle: 'Food Allowance',
    usageType: 'Food & Beverage',
    isLocal: true,
    expenseCode: 'FDA-001',
    shortDescription: 'Daily food and beverage expenses',
  },
  {
    id: 9,
    expenseTitle: 'Mobile Recharge',
    usageType: 'Communication',
    isLocal: true,
    expenseCode: 'MOB-001',
    shortDescription: 'Mobile phone recharge expenses',
  },
  {
    id: 10,
    expenseTitle: 'Internet Charges',
    usageType: 'Communication',
    isLocal: true,
    expenseCode: 'INT-001',
    shortDescription: 'Internet and data charges',
  },
  {
    id: 11,
    expenseTitle: 'Client Entertainment',
    usageType: 'Entertainment',
    isLocal: true,
    expenseCode: 'ENT-001',
    shortDescription: 'Client entertainment and hospitality',
  },
  {
    id: 12,
    expenseTitle: 'Miscellaneous',
    usageType: 'Miscellaneous',
    isLocal: true,
    expenseCode: 'MSC-001',
    shortDescription: 'Other miscellaneous expenses',
  },
]

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function ExpenseTypePage() {
  // State management
  const [expenseTypes, setExpenseTypes] = useState(initialExpenseTypes)

  // Modal state management
  const [activeModal, setActiveModal] = useState(null)
  const [selectedExpenseType, setSelectedExpenseType] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(expenseTypes.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentExpenseTypes = expenseTypes.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // ========================================================================
  // ACTION HANDLERS
  // ========================================================================

  const handleView = (expenseType) => {
    setSelectedExpenseType(expenseType)
    setActiveModal('view')
  }

  const handleEdit = (expenseType) => {
    setSelectedExpenseType(expenseType)
    setActiveModal('edit')
  }

  const handleDelete = (expenseType) => {
    setSelectedExpenseType(expenseType)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setActiveModal('add')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedExpenseType(null)
  }

  // ========================================================================
  // CRUD HANDLERS
  // ========================================================================

  const handleAddExpenseType = (form) => {
    const newId = expenseTypes.length > 0 ? Math.max(...expenseTypes.map(e => e.id)) + 1 : 1

    setExpenseTypes(prev => [...prev, {
      id: newId,
      expenseTitle: form.expenseTitle,
      usageType: form.usageType,
      isLocal: form.isLocal === 'true',
      expenseCode: form.expenseCode,
      shortDescription: form.shortDescription,
    }])
    closeModal()
  }

  const handleSaveEdit = (form) => {
    setExpenseTypes(prev =>
      prev.map(expenseType =>
        expenseType.id === selectedExpenseType.id
          ? {
              ...expenseType,
              expenseTitle: form.expenseTitle,
              usageType: form.usageType,
              isLocal: form.isLocal === 'true',
              expenseCode: form.expenseCode,
              shortDescription: form.shortDescription,
            }
          : expenseType
      )
    )
    closeModal()
  }

  const handleConfirmDelete = () => {
    setExpenseTypes(prev => prev.filter(e => e.id !== selectedExpenseType.id))
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
        title="Expense Type"
        subtitle="Manage expense types and categories"
        addLabel="Add Expense Type"
        onAdd={handleAddClick}
        dropdownOptions={[
          { label: 'Import from Excel', onClick: handleImportExcel },
          { label: 'Export to Excel', onClick: handleExportExcel },
          { label: 'Download Format', onClick: handleDownloadFormat },
        ]}
      />

      {/* Table using CommonTable component */}
      <CommonTable
        data={currentExpenseTypes.map(expenseType => ({
          id: expenseType.id,
          expenseTitle: expenseType.expenseTitle,
          usageType: expenseType.usageType,
          isLocal: (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
              expenseType.isLocal 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
            }`}>
              {expenseType.isLocal ? 'Local' : 'Non-Local'}
            </span>
          ),
          expenseCode: expenseType.expenseCode,
          shortDescription: expenseType.shortDescription,
          raw: expenseType,
        }))}
        emptyMessage="No expense types found. Click 'Add Expense Type' to create one."
        minWidth="1200px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '80px' },
          { key: 'expenseTitle', label: 'Expense Title', width: '200px' },
          { key: 'usageType', label: 'Usage Type', width: '180px' },
          { key: 'isLocal', label: 'Is Local?', width: '130px' },
          { key: 'expenseCode', label: 'Expense Code', width: '150px' },
          { key: 'shortDescription', label: 'Short Description', width: '300px' },
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
        title="Add Expense Type"
        message="Enter the expense type details below"
        fields={{
          expenseTitle: '',
          usageType: '',
          isLocal: '',
          expenseCode: '',
          shortDescription: '',
        }}
        fieldConfig={{
          expenseTitle: {
            label: 'Expense Title',
            type: 'text',
            placeholder: 'e.g., Flight Expense',
            required: true,
          },
          usageType: {
            label: 'Usage Type',
            type: 'select',
            options: USAGE_TYPES.map(type => ({ value: type, label: type })),
            required: true,
          },
          isLocal: {
            label: 'Is Local?',
            type: 'select',
            options: [
              { value: 'true', label: 'Yes - Local' },
              { value: 'false', label: 'No - Non-Local' },
            ],
            required: true,
          },
          expenseCode: {
            label: 'Expense Code',
            type: 'text',
            placeholder: 'e.g., FLT-001',
            required: true,
          },
          shortDescription: {
            label: 'Short Description',
            type: 'textarea',
            placeholder: 'Enter a brief description',
            required: true,
          },
        }}
        onSave={handleAddExpenseType}
      />

      {/* ================================================================== */}
      {/* VIEW MODAL */}
      {/* ================================================================== */}

      {selectedExpenseType && (
        <ViewAlert
          isOpen={activeModal === 'view'}
          onClose={closeModal}
          title="Expense Type Details"
          message="View the expense type information"
          fields={{
            ID: selectedExpenseType.id,
            'Expense Title': selectedExpenseType.expenseTitle,
            'Usage Type': selectedExpenseType.usageType,
            'Is Local?': selectedExpenseType.isLocal ? 'Yes - Local' : 'No - Non-Local',
            'Expense Code': selectedExpenseType.expenseCode,
            'Short Description': selectedExpenseType.shortDescription,
          }}
        />
      )}

      {/* ================================================================== */}
      {/* EDIT MODAL */}
      {/* ================================================================== */}

      {selectedExpenseType && (
        <EditAlert
          isOpen={activeModal === 'edit'}
          onClose={closeModal}
          title="Edit Expense Type"
          message="Update the expense type details"
          fields={{
            expenseTitle: selectedExpenseType.expenseTitle,
            usageType: selectedExpenseType.usageType,
            isLocal: String(selectedExpenseType.isLocal),
            expenseCode: selectedExpenseType.expenseCode,
            shortDescription: selectedExpenseType.shortDescription,
          }}
          fieldConfig={{
            expenseTitle: {
              label: 'Expense Title',
              type: 'text',
              placeholder: 'e.g., Flight Expense',
              required: true,
            },
            usageType: {
              label: 'Usage Type',
              type: 'select',
              options: USAGE_TYPES.map(type => ({ value: type, label: type })),
              required: true,
            },
            isLocal: {
              label: 'Is Local?',
              type: 'select',
              options: [
                { value: 'true', label: 'Yes - Local' },
                { value: 'false', label: 'No - Non-Local' },
              ],
              required: true,
            },
            expenseCode: {
              label: 'Expense Code',
              type: 'text',
              placeholder: 'e.g., FLT-001',
              required: true,
            },
            shortDescription: {
              label: 'Short Description',
              type: 'textarea',
              placeholder: 'Enter a brief description',
              required: true,
            },
          }}
          onSave={handleSaveEdit}
        />
      )}

      {/* ================================================================== */}
      {/* DELETE MODAL */}
      {/* ================================================================== */}

      {selectedExpenseType && (
        <DeleteAlert
          isOpen={activeModal === 'delete'}
          onClose={closeModal}
          title="Delete Expense Type"
          message={`Are you sure you want to delete "${selectedExpenseType.expenseTitle}"? This action cannot be undone.`}
          itemName={selectedExpenseType.expenseTitle}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  )
}
