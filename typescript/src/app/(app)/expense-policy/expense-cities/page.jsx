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
} from '../../basic-master/address-master/common/components/alert.jsx'

// ============================================================================
// CONSTANTS
// ============================================================================

const ITEMS_PER_PAGE = 10

// Expense category options
const EXPENSE_CATEGORIES = [
  'Metro City',
  'Tier 1 City',
  'Tier 2 City',
  'Tier 3 City',
  'Special Economic Zone',
]

// ============================================================================
// INITIAL DATA
// ============================================================================

const initialExpenseCities = [
  {
    id: 1,
    expenseCity: 'Mumbai',
    expenseCategory: 'Metro City',
  },
  {
    id: 2,
    expenseCity: 'Delhi',
    expenseCategory: 'Metro City',
  },
  {
    id: 3,
    expenseCity: 'Bangalore',
    expenseCategory: 'Metro City',
  },
  {
    id: 4,
    expenseCity: 'Hyderabad',
    expenseCategory: 'Metro City',
  },
  {
    id: 5,
    expenseCity: 'Chennai',
    expenseCategory: 'Metro City',
  },
  {
    id: 6,
    expenseCity: 'Kolkata',
    expenseCategory: 'Metro City',
  },
  {
    id: 7,
    expenseCity: 'Pune',
    expenseCategory: 'Tier 1 City',
  },
  {
    id: 8,
    expenseCity: 'Ahmedabad',
    expenseCategory: 'Tier 1 City',
  },
  {
    id: 9,
    expenseCity: 'Jaipur',
    expenseCategory: 'Tier 1 City',
  },
  {
    id: 10,
    expenseCity: 'Surat',
    expenseCategory: 'Tier 2 City',
  },
  {
    id: 11,
    expenseCity: 'Lucknow',
    expenseCategory: 'Tier 2 City',
  },
  {
    id: 12,
    expenseCity: 'Kanpur',
    expenseCategory: 'Tier 2 City',
  },
]

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function ExpenseCitiesPage() {
  // State management
  const [expenseCities, setExpenseCities] = useState(initialExpenseCities)

  // Modal state management
  const [activeModal, setActiveModal] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(expenseCities.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentExpenseCities = expenseCities.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // ========================================================================
  // ACTION HANDLERS
  // ========================================================================

  const handleView = (city) => {
    setSelectedCity(city)
    setActiveModal('view')
  }

  const handleEdit = (city) => {
    setSelectedCity(city)
    setActiveModal('edit')
  }

  const handleDelete = (city) => {
    setSelectedCity(city)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setActiveModal('add')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedCity(null)
  }

  // ========================================================================
  // CRUD HANDLERS
  // ========================================================================

  const handleAddCity = (form) => {
    const newId = expenseCities.length > 0 ? Math.max(...expenseCities.map(c => c.id)) + 1 : 1

    setExpenseCities(prev => [...prev, {
      id: newId,
      expenseCity: form.expenseCity,
      expenseCategory: form.expenseCategory,
    }])
    closeModal()
  }

  const handleSaveEdit = (form) => {
    setExpenseCities(prev =>
      prev.map(city =>
        city.id === selectedCity.id
          ? {
              ...city,
              expenseCity: form.expenseCity,
              expenseCategory: form.expenseCategory,
            }
          : city
      )
    )
    closeModal()
  }

  const handleConfirmDelete = () => {
    setExpenseCities(prev => prev.filter(c => c.id !== selectedCity.id))
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
        title="Expense Cities"
        subtitle="Manage cities and their expense categories"
        addLabel="Add Expense City"
        onAdd={handleAddClick}
        dropdownOptions={[
          { label: 'Import from Excel', onClick: handleImportExcel },
          { label: 'Export to Excel', onClick: handleExportExcel },
          { label: 'Download Format', onClick: handleDownloadFormat },
        ]}
      />

      {/* Table using CommonTable component */}
      <CommonTable
        data={currentExpenseCities.map(city => ({
          id: city.id,
          expenseCity: city.expenseCity,
          expenseCategory: (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
              city.expenseCategory === 'Metro City' 
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                : city.expenseCategory === 'Tier 1 City'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                : city.expenseCategory === 'Tier 2 City'
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : city.expenseCategory === 'Tier 3 City'
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
            }`}>
              {city.expenseCategory}
            </span>
          ),
          raw: city,
        }))}
        emptyMessage="No expense cities found. Click 'Add Expense City' to create one."
        minWidth="900px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '80px' },
          { key: 'expenseCity', label: 'Expense City', width: '250px' },
          { key: 'expenseCategory', label: 'Expense Category', width: '200px' },
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
        title="Add Expense City"
        message="Enter the expense city details below"
        fields={{
          expenseCity: '',
          expenseCategory: '',
        }}
        fieldConfig={{
          expenseCity: {
            label: 'Expense City',
            type: 'text',
            placeholder: 'e.g., Mumbai',
            required: true,
          },
          expenseCategory: {
            label: 'Expense Category',
            type: 'select',
            options: EXPENSE_CATEGORIES.map(cat => ({ value: cat, label: cat })),
            required: true,
          },
        }}
        onSave={handleAddCity}
      />

      {/* ================================================================== */}
      {/* VIEW MODAL */}
      {/* ================================================================== */}

      {selectedCity && (
        <ViewAlert
          isOpen={activeModal === 'view'}
          onClose={closeModal}
          title="Expense City Details"
          message="View the expense city information"
          fields={{
            ID: selectedCity.id,
            'Expense City': selectedCity.expenseCity,
            'Expense Category': selectedCity.expenseCategory,
          }}
        />
      )}

      {/* ================================================================== */}
      {/* EDIT MODAL */}
      {/* ================================================================== */}

      {selectedCity && (
        <EditAlert
          isOpen={activeModal === 'edit'}
          onClose={closeModal}
          title="Edit Expense City"
          message="Update the expense city details"
          fields={{
            expenseCity: selectedCity.expenseCity,
            expenseCategory: selectedCity.expenseCategory,
          }}
          fieldConfig={{
            expenseCity: {
              label: 'Expense City',
              type: 'text',
              placeholder: 'e.g., Mumbai',
              required: true,
            },
            expenseCategory: {
              label: 'Expense Category',
              type: 'select',
              options: EXPENSE_CATEGORIES.map(cat => ({ value: cat, label: cat })),
              required: true,
            },
          }}
          onSave={handleSaveEdit}
        />
      )}

      {/* ================================================================== */}
      {/* DELETE MODAL */}
      {/* ================================================================== */}

      {selectedCity && (
        <DeleteAlert
          isOpen={activeModal === 'delete'}
          onClose={closeModal}
          title="Delete Expense City"
          message={`Are you sure you want to delete "${selectedCity.expenseCity}"? This action cannot be undone.`}
          itemName={selectedCity.expenseCity}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  )
}
