'use client'

import { useState } from 'react'
import Header from '../common/components/Header.jsx'
import Actions from '../common/components/Actions.jsx'
import CommonTable from '../common/components/Table.jsx'
import CommonPagination from '../common/components/Pagination.jsx'
import {
  ViewAlert,
  EditAlert,
  DeleteAlert,
  AddAlert,
} from '../common/components/Alert.jsx'

// ============================================================================
// INITIAL DATA
// ============================================================================

const initialCities = [
  { id: 1, name: 'Indore City' },
  { id: 2, name: 'Mhow' },
  { id: 3, name: 'Bhopal City' },
  { id: 4, name: 'Raisen' },
  { id: 5, name: 'Mumbai City' },
  { id: 6, name: 'Thane' },
  { id: 7, name: 'Pune City' },
  { id: 8, name: 'Ahmedabad City' },
]

const initialPincodes = [
  { id: 1, cityId: 1, cityName: 'Indore City', pincode: '452001' },
  { id: 2, cityId: 1, cityName: 'Indore City', pincode: '452002' },
  { id: 3, cityId: 2, cityName: 'Mhow', pincode: '453441' },
  { id: 4, cityId: 3, cityName: 'Bhopal City', pincode: '462001' },
  { id: 5, cityId: 3, cityName: 'Bhopal City', pincode: '462002' },
  { id: 6, cityId: 5, cityName: 'Mumbai City', pincode: '400001' },
  { id: 7, cityId: 5, cityName: 'Mumbai City', pincode: '400002' },
  { id: 8, cityId: 7, cityName: 'Pune City', pincode: '411001' },
]

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function PincodePage() {
  const [pincodes, setPincodes] = useState(initialPincodes)
  const [cities] = useState(initialCities)

  const [activeModal, setActiveModal] = useState(null)
  const [selectedPincode, setSelectedPincode] = useState(null)

  // Pagination
  const ITEMS_PER_PAGE = 10
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(pincodes.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentPincodes = pincodes.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // --------------------------------------------------------------------------
  // ACTION HANDLERS
  // --------------------------------------------------------------------------

  const handleView = (pincode) => {
    setSelectedPincode(pincode)
    setActiveModal('view')
  }

  const handleEdit = (pincode) => {
    setSelectedPincode(pincode)
    setActiveModal('edit')
  }

  const handleDelete = (pincode) => {
    setSelectedPincode(pincode)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setActiveModal('add')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedPincode(null)
  }

  // --------------------------------------------------------------------------
  // CRUD LOGIC (FORM-BASED, SAME AS CITY PAGE)
  // --------------------------------------------------------------------------

  const handleAddPincode = (form) => {
    const newId =
      pincodes.length > 0
        ? Math.max(...pincodes.map((p) => p.id)) + 1
        : 1

    const cityName = cities.find((c) => c.id == form.cityId)?.name

    setPincodes((prev) => [
      ...prev,
      {
        id: newId,
        cityId: Number(form.cityId),
        cityName,
        pincode: form.pincode,
      },
    ])
  }

  const handleSaveEdit = (updated) => {
    setPincodes((prev) =>
      prev.map((p) =>
        p.id === selectedPincode.id
          ? {
              ...p,
              cityId: Number(updated.cityId),
              cityName: cities.find((c) => c.id == updated.cityId)?.name,
              pincode: updated.pincode,
            }
          : p
      )
    )
  }

  const handleConfirmDelete = () => {
    setPincodes((prev) =>
      prev.filter((p) => p.id !== selectedPincode.id)
    )
  }

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* HEADER */}
      <Header
        title="Pincodes"
        subtitle="Manage all pincodes in the system"
        addLabel="Add Pincode"
        onAdd={handleAddClick}
        dropdownOptions={[
          { label: 'Import from Excel' },
          { label: 'Export to Excel' },
          { label: 'Download Format' },
        ]}
      />

      {/* TABLE */}
      <CommonTable
        data={currentPincodes}
        emptyMessage="No pincodes found. Click 'Add Pincode' to create one."
        columns={[
          { key: 'id', label: 'ID', width: 100 },
          { key: 'cityName', label: 'City' },
          { key: 'pincode', label: 'Pin Code' },
        ]}
        renderActions={(row) => (
          <Actions
            onView={() => handleView(row)}
            onEdit={() => handleEdit(row)}
            onDelete={() => handleDelete(row)}
          />
        )}
      />

      {/* PAGINATION */}
      <CommonPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* ================================================================= */}
      {/* ALERTS */}
      {/* ================================================================= */}

      {/* ADD */}
      <AddAlert
        isOpen={activeModal === 'add'}
        onClose={closeModal}
        title="Add New Pincode"
        message="Enter the details of the new pincode below."
        fields={{
          cityId: '',
          pincode: '',
        }}
        dropdowns={{
          cityId: cities,
        }}
        onSave={handleAddPincode}
      />

      {selectedPincode && (
        <>
          {/* VIEW */}
          <ViewAlert
            isOpen={activeModal === 'view'}
            onClose={closeModal}
            title="Pincode Details"
            message="View the details of the selected pincode below."
            fields={{
              ID: selectedPincode.id,
              City: selectedPincode.cityName,
              'Pin Code': selectedPincode.pincode,
            }}
          />

          {/* EDIT */}
          <EditAlert
            isOpen={activeModal === 'edit'}
            onClose={closeModal}
            title="Edit Pincode"
            message="Update the pincode details below."
            fields={{
              cityId: selectedPincode.cityId,
              pincode: selectedPincode.pincode,
            }}
            dropdowns={{
              cityId: cities,
            }}
            onSave={handleSaveEdit}
          />

          {/* DELETE */}
          <DeleteAlert
            isOpen={activeModal === 'delete'}
            onClose={closeModal}
            title="Delete Are you sure you want to delete this pincode?"
            message={`You are about to delete pincode ${selectedPincode.pincode} from ${selectedPincode.cityName}. This action cannot be undone.`}
            onConfirm={handleConfirmDelete}
          />
        </>
      )}
    </div>
  )
}
