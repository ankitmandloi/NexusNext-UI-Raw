'use client'

import { useState, useEffect } from 'react'
import Header from '../../common/components/Header.jsx'
import CommonTable from '../../common/components/Table.jsx'
import CommonPagination from '../../common/components/Pagination.jsx'
import Actions from '../../common/components/Actions.jsx'
import {
  AddAlert,
  ViewAlert,
  EditAlert,
  DeleteAlert,
} from '../../common/components/Alert.jsx'

// ============================================================================
// CONSTANTS
// ============================================================================

const ITEMS_PER_PAGE = 10

const hierarchyLevelOptions = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: i + 1,
}))

// ============================================================================
// INITIAL DATA
// ============================================================================

const initialDesignations = [
  { id: 1, designation: 'DSR', hierarchyLevel: 1 },
  { id: 2, designation: 'Area Head', hierarchyLevel: 2 },
  { id: 3, designation: 'LME/RME/SRME', hierarchyLevel: 3 },
  { id: 4, designation: 'HR', hierarchyLevel: 4 },
  { id: 5, designation: 'Manager', hierarchyLevel: 5 },
  { id: 6, designation: 'Senior Manager', hierarchyLevel: 6 },
  { id: 7, designation: 'Director', hierarchyLevel: 7 },
  { id: 8, designation: 'Vice President', hierarchyLevel: 8 },
]

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function EmployeeDesignationPage() {
  const [designations, setDesignations] = useState(initialDesignations)
  const [activeModal, setActiveModal] = useState(null)
  const [selectedDesignation, setSelectedDesignation] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Pagination
  const totalPages = Math.max(1, Math.ceil(designations.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentDesignations = designations.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  // Pagination safety
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [totalPages])

  // Actions
  const handleView = (d) => {
    setSelectedDesignation(d)
    setActiveModal('view')
  }

  const handleEdit = (d) => {
    setSelectedDesignation(d)
    setActiveModal('edit')
  }

  const handleDelete = (d) => {
    setSelectedDesignation(d)
    setActiveModal('delete')
  }

  const handleAddClick = () => setActiveModal('add')

  const closeModal = () => {
    setActiveModal(null)
    setSelectedDesignation(null)
  }

  // CRUD
  const handleAddDesignation = (designation, hierarchyLevel) => {
    const newId = designations.length
      ? Math.max(...designations.map(d => d.id)) + 1
      : 1

    setDesignations(prev => [
      ...prev,
      { id: newId, designation, hierarchyLevel },
    ])
  }

  const handleSaveEdit = (id, designation, hierarchyLevel) => {
    setDesignations(prev =>
      prev.map(d =>
        d.id === id ? { ...d, designation, hierarchyLevel } : d
      )
    )
  }

  const handleConfirmDelete = (id) => {
    setDesignations(prev => prev.filter(d => d.id !== id))
  }

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* HEADER */}
      <Header
        title="Employee Designation"
        subtitle="Manage all employee designations in the system"
        addLabel="Add Designation"
        onAdd={handleAddClick}
        dropdownOptions={[
          { label: 'Import from Excel' },
          { label: 'Export to Excel' },
          { label: 'Download Format' },
        ]}
      />

      {/* TABLE */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        <CommonTable
          data={currentDesignations}
          emptyMessage='No designations found. Click "Add Designation" to create one.'
          columns={[
            { key: 'id', label: 'ID', width: 120 },
            { key: 'designation', label: 'Employee Designation' },
            { key: 'hierarchyLevel', label: 'Hierarchy Level', width: 220 },
          ]}
          renderActions={(designation) => (
            <Actions
              onView={() => handleView(designation)}
              onEdit={() => handleEdit(designation)}
              onDelete={() => handleDelete(designation)}
            />
          )}
        />

        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* ADD */}
      <AddAlert
        isOpen={activeModal === 'add'}
        onClose={closeModal}
        title="Add New Designation"
        message="Enter the details for the new designation below."
        fields={{ designation: '', hierarchyLevel: 1 }}
        dropdowns={{ hierarchyLevel: hierarchyLevelOptions }}
        onSave={(form) =>
          handleAddDesignation(
            form.designation,
            Number(form.hierarchyLevel)
          )
        }
      />

      {selectedDesignation && (
        <>
          {/* VIEW */}
          <ViewAlert
            isOpen={activeModal === 'view'}
            onClose={closeModal}
            title="Designation Details"
            message="View the details of the selected designation below."
            fields={{
              ID: selectedDesignation.id,
              'Employee Designation': selectedDesignation.designation,
              'Hierarchy Level': selectedDesignation.hierarchyLevel,
            }}
          />

          {/* EDIT */}
          <EditAlert
            isOpen={activeModal === 'edit'}
            onClose={closeModal}
            title="Edit Designation"
            message="Update the designation details below."
            fields={{
              designation: selectedDesignation.designation,
              hierarchyLevel: selectedDesignation.hierarchyLevel,
            }}
            dropdowns={{ hierarchyLevel: hierarchyLevelOptions }}
            onSave={(form) =>
              handleSaveEdit(
                selectedDesignation.id,
                form.designation,
                Number(form.hierarchyLevel)
              )
            }
          />

          {/* DELETE */}
          <DeleteAlert
            isOpen={activeModal === 'delete'}
            onClose={closeModal}
            title="Are you sure you want to delete this designation?"
            message={`You are about to delete ${selectedDesignation.designation}. This action cannot be undone.`}
            onConfirm={() =>
              handleConfirmDelete(selectedDesignation.id)
            }
          />
        </>
      )}
    </div>
  )
}
