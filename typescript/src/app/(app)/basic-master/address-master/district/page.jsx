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

// Sample state data
const initialStates = [
  { id: 1, name: 'Madhya Pradesh' },
  { id: 2, name: 'Maharashtra' },
  { id: 3, name: 'Gujarat' },
  { id: 4, name: 'Rajasthan' },
]

// Sample district data
const initialDistricts = [
  { id: 1, stateId: 1, stateName: 'Madhya Pradesh', districtName: 'Indore' },
  { id: 2, stateId: 1, stateName: 'Madhya Pradesh', districtName: 'Bhopal' },
  { id: 3, stateId: 2, stateName: 'Maharashtra', districtName: 'Mumbai' },
  { id: 4, stateId: 3, stateName: 'Gujarat', districtName: 'Ahmedabad' },
  { id: 5, stateId: 4, stateName: 'Rajasthan', districtName: 'Jaipur' },
  { id: 6, stateId: 2, stateName: 'Maharashtra', districtName: 'Pune' },
  { id: 7, stateId: 3, stateName: 'Gujarat', districtName: 'Surat' }, 
  { id: 8, stateId: 4, stateName: 'Rajasthan', districtName: 'Udaipur' },
  { id: 9, stateId: 1, stateName: 'Madhya Pradesh', districtName: 'Gwalior' },
  { id: 10, stateId: 2, stateName: 'Maharashtra', districtName: 'Nagpur' },
  { id: 11, stateId: 3, stateName: 'Gujarat', districtName: 'Vadodara' },
  { id: 12, stateId: 4, stateName: 'Rajasthan', districtName: 'Ajmer' },
  { id: 13, stateId: 1, stateName: 'Madhya Pradesh', districtName: 'Jabalpur' },
  { id: 14, stateId: 2, stateName: 'Maharashtra', districtName: 'Thane' },
  { id: 15, stateId: 3, stateName: 'Gujarat', districtName: 'Rajkot' },
  { id: 16, stateId: 4, stateName: 'Rajasthan', districtName: 'Alwar' },
]

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function DistrictPage() {
  const [districts, setDistricts] = useState(initialDistricts)
  const [states] = useState(initialStates)

  const [activeModal, setActiveModal] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)

  const [currentPage, setCurrentPage] = useState(1)

  // Pagination
  const totalPages = Math.max(1, Math.ceil(districts.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentDistricts = districts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  const handlePageChange = (page) => setCurrentPage(page)

  // ========================================================================
  // ACTION HANDLERS
  // ========================================================================

  const handleView = (district) => {
    setSelectedDistrict(district)
    setActiveModal('view')
  }

  const handleEdit = (district) => {
    setSelectedDistrict(district)
    setActiveModal('edit')
  }

  const handleDelete = (district) => {
    setSelectedDistrict(district)
    setActiveModal('delete')
  }

  const handleAddClick = () => setActiveModal('add')

  const closeModal = () => {
    setActiveModal(null)
    setSelectedDistrict(null)
  }

  // ========================================================================
  // CRUD HANDLERS
  // ========================================================================

  const handleAddDistrict = (form) => {
    const newId =
      districts.length > 0
        ? Math.max(...districts.map(d => d.id)) + 1
        : 1

    const stateName = states.find(s => s.id == form.stateId)?.name

    setDistricts(prev => [
      ...prev,
      {
        id: newId,
        stateId: Number(form.stateId),
        stateName,
        districtName: form.districtName,
      },
    ])
  }

  const handleSaveEdit = (updated) => {
    setDistricts(prev =>
      prev.map(d =>
        d.id === selectedDistrict.id
          ? {
              ...d,
              stateId: Number(updated.stateId),
              stateName: states.find(s => s.id == updated.stateId)?.name,
              districtName: updated.districtName,
            }
          : d
      )
    )
  }

  const handleConfirmDelete = () => {
    setDistricts(prev =>
      prev.filter(d => d.id !== selectedDistrict.id)
    )
  }

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* HEADER */}
      <Header
        title="Districts"
        subtitle="Manage all districts in the system"
        addLabel="Add District"
        onAdd={handleAddClick}
        dropdownOptions={[
          { label: 'Import from Excel' },
          { label: 'Export to Excel' },
          { label: 'Download Format' },
        ]}
      />

      {/* TABLE CARD */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        <CommonTable
          data={currentDistricts}
          emptyMessage="No districts found. Click 'Add District' to create one."
          columns={[
            { key: 'id', label: 'ID', width: 100 },
            { key: 'stateName', label: 'State' },
            { key: 'districtName', label: 'District Name' },
          ]}
          renderActions={(district) => (
            <Actions
              onView={() => handleView(district)}
              onEdit={() => handleEdit(district)}
              onDelete={() => handleDelete(district)}
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
        title="Add New District"
        fields={{ stateId: '', districtName: '' }}
        dropdowns={{ stateId: states }}
        onSave={handleAddDistrict}
      />

      {selectedDistrict && (
        <>
          {/* VIEW */}
          <ViewAlert
            isOpen={activeModal === 'view'}
            onClose={closeModal}
            title="District Details"
            message="View the details of the selected district below"

            fields={{
              ID: selectedDistrict.id,
              State: selectedDistrict.stateName,
              'District Name': selectedDistrict.districtName,
            }}
          />

          {/* EDIT */}
          <EditAlert
            isOpen={activeModal === 'edit'}
            onClose={closeModal}
            title="Edit District"
            fields={{
              stateId: selectedDistrict.stateId,
              districtName: selectedDistrict.districtName,
            }}
            dropdowns={{ stateId: states }}
            onSave={handleSaveEdit}
          />

          {/* DELETE */}
          <DeleteAlert
            isOpen={activeModal === 'delete'}
            onClose={closeModal}
            title="Delete District?"
            message={`Do you really want to delete ${selectedDistrict.districtName}?`}
            onConfirm={handleConfirmDelete}
          />
        </>
      )}
    </div>
  )
}
