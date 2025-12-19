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

// Type options
const TYPE_OPTIONS = ['State', 'District', 'City', 'Zone', 'Region']

// Scheme on options
const SCHEME_ON_OPTIONS = ['Product', 'Category', 'Brand', 'All Products']

// Region options
const REGIONS = [
  'North Region',
  'South Region',
  'East Region',
  'West Region',
  'Central Region',
  'North-East Region',
]

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

const initialTerritoryAssignments = {
  1: [
    {
      id: 1,
      invoiceScheme: 'Diwali Mega Offer 2024',
      type: 'Region',
      schemeOn: 'All Products',
      schemeRegion: 'North Region',
    },
    {
      id: 2,
      invoiceScheme: 'Diwali Mega Offer 2024',
      type: 'Region',
      schemeOn: 'All Products',
      schemeRegion: 'South Region',
    },
    {
      id: 3,
      invoiceScheme: 'Diwali Mega Offer 2024',
      type: 'State',
      schemeOn: 'Category',
      schemeRegion: 'West Region',
    },
  ],
  2: [
    {
      id: 1,
      invoiceScheme: 'New Year Special',
      type: 'City',
      schemeOn: 'Product',
      schemeRegion: 'East Region',
    },
    {
      id: 2,
      invoiceScheme: 'New Year Special',
      type: 'Zone',
      schemeOn: 'Brand',
      schemeRegion: 'Central Region',
    },
  ],
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function TerritoryAssignmentPage() {
  const router = useRouter()
  const params = useParams()
  const schemeId = params?.id ? parseInt(params.id) : null

  // State management
  const [territoryAssignments, setTerritoryAssignments] = useState([])
  const [schemeName, setSchemeName] = useState('')

  // Modal state management
  const [activeModal, setActiveModal] = useState(null)
  const [selectedAssignment, setSelectedAssignment] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)

  // Load data based on scheme ID
  useEffect(() => {
    if (schemeId) {
      setTerritoryAssignments(initialTerritoryAssignments[schemeId] || [])
      setSchemeName(SCHEMES[schemeId] || `Scheme #${schemeId}`)
    }
  }, [schemeId])

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(territoryAssignments.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentTerritoryAssignments = territoryAssignments.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // ========================================================================
  // ACTION HANDLERS
  // ========================================================================

  const handleView = (assignment) => {
    setSelectedAssignment(assignment)
    setActiveModal('view')
  }

  const handleEdit = (assignment) => {
    setSelectedAssignment(assignment)
    setActiveModal('edit')
  }

  const handleDelete = (assignment) => {
    setSelectedAssignment(assignment)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setActiveModal('add')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedAssignment(null)
  }

  const handleBack = () => {
    router.push('/schema/invoice-schema/scheme')
  }

  // ========================================================================
  // CRUD HANDLERS
  // ========================================================================

  const handleAddAssignment = (form) => {
    const newId = territoryAssignments.length > 0 ? Math.max(...territoryAssignments.map(a => a.id)) + 1 : 1

    setTerritoryAssignments(prev => [...prev, {
      id: newId,
      invoiceScheme: schemeName,
      type: form.type,
      schemeOn: form.schemeOn,
      schemeRegion: form.schemeRegion,
    }])
    closeModal()
  }

  const handleSaveEdit = (form) => {
    setTerritoryAssignments(prev =>
      prev.map(assignment =>
        assignment.id === selectedAssignment.id
          ? {
              ...assignment,
              type: form.type,
              schemeOn: form.schemeOn,
              schemeRegion: form.schemeRegion,
            }
          : assignment
      )
    )
    closeModal()
  }

  const handleConfirmDelete = () => {
    setTerritoryAssignments(prev => prev.filter(a => a.id !== selectedAssignment.id))
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
        title={`Territory Assignment List - ${schemeName}`}
        subtitle="Manage territory assignments for this scheme"
        addLabel="Add Territory Assignment"
        onAdd={handleAddClick}
        dropdownOptions={[
          { label: 'Import from Excel', onClick: handleImportExcel },
          { label: 'Export to Excel', onClick: handleExportExcel },
          { label: 'Download Format', onClick: handleDownloadFormat },
        ]}
      />

      {/* Table using CommonTable component */}
      <CommonTable
        data={currentTerritoryAssignments.map(assignment => ({
          id: assignment.id,
          invoiceScheme: assignment.invoiceScheme,
          type: assignment.type,
          schemeOn: assignment.schemeOn,
          schemeRegion: assignment.schemeRegion,
          raw: assignment,
        }))}
        emptyMessage="No territory assignments found. Click 'Add Territory Assignment' to create one."
        minWidth="1100px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '80px' },
          { key: 'invoiceScheme', label: 'Invoice Scheme', width: '250px' },
          { key: 'type', label: 'Type', width: '150px' },
          { key: 'schemeOn', label: 'Scheme On', width: '150px' },
          { key: 'schemeRegion', label: 'Scheme Region', width: '200px' },
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
        title="Add Territory Assignment"
        message="Enter the territory assignment details below"
        fields={{
          type: '',
          schemeOn: '',
          schemeRegion: '',
        }}
        fieldConfig={{
          type: {
            label: 'Type',
            type: 'select',
            options: TYPE_OPTIONS.map(type => ({ value: type, label: type })),
            required: true,
          },
          schemeOn: {
            label: 'Scheme On',
            type: 'select',
            options: SCHEME_ON_OPTIONS.map(opt => ({ value: opt, label: opt })),
            required: true,
          },
          schemeRegion: {
            label: 'Scheme Region',
            type: 'select',
            options: REGIONS.map(region => ({ value: region, label: region })),
            required: true,
          },
        }}
        onSave={handleAddAssignment}
      />

      {/* ================================================================== */}
      {/* VIEW MODAL */}
      {/* ================================================================== */}

      {selectedAssignment && (
        <ViewAlert
          isOpen={activeModal === 'view'}
          onClose={closeModal}
          title="Territory Assignment Details"
          message="View the territory assignment information"
          fields={{
            ID: selectedAssignment.id,
            'Invoice Scheme': selectedAssignment.invoiceScheme,
            Type: selectedAssignment.type,
            'Scheme On': selectedAssignment.schemeOn,
            'Scheme Region': selectedAssignment.schemeRegion,
          }}
        />
      )}

      {/* ================================================================== */}
      {/* EDIT MODAL */}
      {/* ================================================================== */}

      {selectedAssignment && (
        <EditAlert
          isOpen={activeModal === 'edit'}
          onClose={closeModal}
          title="Edit Territory Assignment"
          message="Update the territory assignment details"
          fields={{
            type: selectedAssignment.type,
            schemeOn: selectedAssignment.schemeOn,
            schemeRegion: selectedAssignment.schemeRegion,
          }}
          fieldConfig={{
            type: {
              label: 'Type',
              type: 'select',
              options: TYPE_OPTIONS.map(type => ({ value: type, label: type })),
              required: true,
            },
            schemeOn: {
              label: 'Scheme On',
              type: 'select',
              options: SCHEME_ON_OPTIONS.map(opt => ({ value: opt, label: opt })),
              required: true,
            },
            schemeRegion: {
              label: 'Scheme Region',
              type: 'select',
              options: REGIONS.map(region => ({ value: region, label: region })),
              required: true,
            },
          }}
          onSave={handleSaveEdit}
        />
      )}

      {/* ================================================================== */}
      {/* DELETE MODAL */}
      {/* ================================================================== */}

      {selectedAssignment && (
        <DeleteAlert
          isOpen={activeModal === 'delete'}
          onClose={closeModal}
          title="Delete Territory Assignment"
          message={`Are you sure you want to delete this territory assignment for "${selectedAssignment.schemeRegion}"? This action cannot be undone.`}
          itemName={selectedAssignment.schemeRegion}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  )
}
