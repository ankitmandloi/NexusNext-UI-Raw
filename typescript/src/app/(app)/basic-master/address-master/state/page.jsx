'use client'

import { useState } from 'react'
import Actions from '../common/components/Actions.jsx'
import Header from '../common/components/Header.jsx'
import CommonPagination from '../common/components/Pagination.jsx'
import CommonTable from '../common/components/Table.jsx'
import {
  ViewAlert,
  EditAlert,
  DeleteAlert,
  AddAlert,
} from '../common/components/Alert.jsx'

// ============================================================================
// CONSTANTS
// ============================================================================

const ITEMS_PER_PAGE = 10

// ============================================================================
// INITIAL DATA
// ============================================================================

const initialStates = [
  { id: 1, name: 'Madhya Pradesh' },
  { id: 2, name: 'Maharashtra' },
  { id: 3, name: 'Andaman and Nicobar' },
  { id: 4, name: 'Andhra Pradesh' },
  { id: 5, name: 'Assam' },
  { id: 6, name: 'Bihar' },
  { id: 7, name: 'Chhattisgarh' },
  { id: 8, name: 'Goa' },
  { id: 9, name: 'Gujarat' },
  { id: 10, name: 'Haryana' },
  { id: 11, name: 'Himachal Pradesh' },
  { id: 12, name: 'Jharkhand' },
]

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function StatePage() {
  const [states, setStates] = useState(initialStates)
  const [activeModal, setActiveModal] = useState(null)
  const [selectedState, setSelectedState] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Pagination
  const totalPages = Math.max(1, Math.ceil(states.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentStates = states.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page) => setCurrentPage(page)

  // ========================================================================
  // ACTION HANDLERS
  // ========================================================================

  const handleView = (state) => {
    setSelectedState(state)
    setActiveModal('view')
  }

  const handleEdit = (state) => {
    setSelectedState(state)
    setActiveModal('edit')
  }

  const handleDelete = (state) => {
    setSelectedState(state)
    setActiveModal('delete')
  }

  const handleAddClick = () => setActiveModal('add')

  const closeModal = () => {
    setActiveModal(null)
    setSelectedState(null)
  }

  // ========================================================================
  // CRUD HANDLERS
  // ========================================================================

  const handleAddState = (form) => {
    const newId =
      states.length > 0 ? Math.max(...states.map(s => s.id)) + 1 : 1

    setStates(prev => [...prev, { id: newId, name: form.name }])
  }

  const handleSaveEdit = (updated) => {
    setStates(prev =>
      prev.map(s =>
        s.id === selectedState.id ? { ...s, name: updated.name } : s
      )
    )
  }

  const handleConfirmDelete = () => {
    setStates(prev => prev.filter(s => s.id !== selectedState.id))
  }

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* HEADER */}
      <Header
        title="States"
        subtitle="Manage all states in the system"
        addLabel="Add State"
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
          data={currentStates}
          emptyMessage='No states found. Click "Add State" to create one.'
          columns={[
            { key: 'id', label: 'ID', width: 100 },
            { key: 'name', label: 'State Name' },
          ]}
          renderActions={(state) => (
            <Actions
              onView={() => handleView(state)}
              onEdit={() => handleEdit(state)}
              onDelete={() => handleDelete(state)}
            />
          )}
        />

        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* ================================================================== */}
      {/* ALERT MODALS */}
      {/* ================================================================== */}

      {/* ADD */}
      <AddAlert
        isOpen={activeModal === 'add'}
        onClose={closeModal}
        title="Add New State"
        message="Enter the name of the new state below."
        fields={{ name: '' }}
        onSave={handleAddState}
      />

      {selectedState && (
        <>
          {/* VIEW */}
          <ViewAlert
            isOpen={activeModal === 'view'}
            onClose={closeModal}
            title="State Details"
            message="View the details of the selected state below."
            fields={{
              ID: selectedState.id,
              'State Name': selectedState.name,
            }}
          />

          {/* EDIT */}
          <EditAlert
            isOpen={activeModal === 'edit'}
            onClose={closeModal}
            title="Edit State"
            message="Update the state name below."
            fields={{ name: selectedState.name }}
            onSave={handleSaveEdit}
          />

          {/* DELETE */}
          <DeleteAlert
            isOpen={activeModal === 'delete'}
            onClose={closeModal}
            title="Are you sure you want to delete this state?"
            message={`You are about to delete ${selectedState.name}. This action cannot be undone. All associated data will be permanently removed.`}
            onConfirm={handleConfirmDelete}
          />
        </>
      )}
    </div>
  )
}
