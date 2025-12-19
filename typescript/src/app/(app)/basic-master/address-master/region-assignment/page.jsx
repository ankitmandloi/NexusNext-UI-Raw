'use client'

import { useState } from 'react'
import Actions from '../common/components/Actions'
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

const initialRegions = [
  { id: 1, name: 'North' },
  { id: 2, name: 'South' },
  { id: 3, name: 'East' },
  { id: 4, name: 'West' },
  { id: 5, name: 'Central' },
]

const initialCities = [
  { id: 1, name: 'Mumbai' },
  { id: 2, name: 'Delhi' },
  { id: 3, name: 'Bangalore' },
  { id: 4, name: 'Hyderabad' },
  { id: 5, name: 'Chennai' },
]

const initialAssignments = [
  { id: 1, regionId: 1, regionName: 'North', cityId: 1, cityName: 'Mumbai' },
  { id: 2, regionId: 2, regionName: 'South', cityId: 2, cityName: 'Delhi' },
  { id: 3, regionId: 3, regionName: 'East', cityId: 3, cityName: 'Bangalore' },
  { id: 4, regionId: 4, regionName: 'West', cityId: 4, cityName: 'Hyderabad' },
  { id: 5, regionId: 5, regionName: 'Central', cityId: 5, cityName: 'Chennai' },
  { id: 6, regionId: 1, regionName: 'North', cityId: 3, cityName: 'Bangalore' },
  { id: 7, regionId: 2, regionName: 'South', cityId: 5, cityName: 'Chennai' },
  { id: 8, regionId: 3, regionName: 'East', cityId: 1, cityName: 'Mumbai' },
  { id: 9, regionId: 4, regionName: 'West', cityId: 2, cityName: 'Delhi' },
  { id: 10, regionId: 5, regionName: 'Central', cityId: 4, cityName: 'Hyderabad' },
  { id: 11, regionId: 1, regionName: 'North', cityId: 2, cityName: 'Delhi' },
  { id: 12, regionId: 2, regionName: 'South', cityId: 4, cityName: 'Hyderabad' },
]

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function RegionAssignmentPage() {
  const [assignments, setAssignments] = useState(initialAssignments)
  const [regions] = useState(initialRegions)
  const [cities] = useState(initialCities)

  const [activeModal, setActiveModal] = useState(null)
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Pagination
  const totalPages = Math.max(1, Math.ceil(assignments.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentAssignments = assignments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  const handlePageChange = (page) => setCurrentPage(page)

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

  const handleAddClick = () => setActiveModal('add')

  const closeModal = () => {
    setActiveModal(null)
    setSelectedAssignment(null)
  }

  // ========================================================================
  // CRUD HANDLERS
  // ========================================================================

  const handleAddAssignment = (form) => {
    const newId =
      assignments.length > 0
        ? Math.max(...assignments.map(a => a.id)) + 1
        : 1

    const regionName = regions.find(r => r.id == form.regionId)?.name
    const cityName = cities.find(c => c.id == form.cityId)?.name

    setAssignments(prev => [
      ...prev,
      {
        id: newId,
        regionId: Number(form.regionId),
        regionName,
        cityId: Number(form.cityId),
        cityName,
      },
    ])
  }

  const handleSaveEdit = (updated) => {
    setAssignments(prev =>
      prev.map(a =>
        a.id === selectedAssignment.id
          ? {
              ...a,
              regionId: Number(updated.regionId),
              regionName: regions.find(r => r.id == updated.regionId)?.name,
              cityId: Number(updated.cityId),
              cityName: cities.find(c => c.id == updated.cityId)?.name,
            }
          : a
      )
    )
  }

  const handleConfirmDelete = () => {
    setAssignments(prev =>
      prev.filter(a => a.id !== selectedAssignment.id)
    )
  }

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* HEADER */}
      <Header
        title="Region Assignment"
        subtitle="Manage city-region assignments"
        addLabel="Add Assignment"
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
          data={currentAssignments}
          emptyMessage='No assignments found. Click "Add Assignment" to create one.'
          columns={[
            { key: 'id', label: 'ID', width: 100 },
            { key: 'regionName', label: 'Region' },
            { key: 'cityName', label: 'City' },
          ]}
          renderActions={(assignment) => (
            <Actions
              onView={() => handleView(assignment)}
              onEdit={() => handleEdit(assignment)}
              onDelete={() => handleDelete(assignment)}
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
        title="Add New Region Assignment"
        message="Assign a city to a region."
        fields={{ regionId: '', cityId: '' }}
        dropdowns={{ regionId: regions, cityId: cities }}
        onSave={handleAddAssignment}
      />

      {selectedAssignment && (
        <>
          {/* VIEW */}
          <ViewAlert
            isOpen={activeModal === 'view'}
            onClose={closeModal}
            title="Region Assignment Details"
            message="View the details of the selected assignment below."
            fields={{
              ID: selectedAssignment.id,
              Region: selectedAssignment.regionName,
              City: selectedAssignment.cityName,
            }}
          />

          {/* EDIT */}
          <EditAlert
            isOpen={activeModal === 'edit'}
            onClose={closeModal}
            title="Edit Region Assignment"
            message="Update the assignment details below."
            fields={{
              regionId: selectedAssignment.regionId,
              cityId: selectedAssignment.cityId,
            }}
            dropdowns={{ regionId: regions, cityId: cities }}
            onSave={handleSaveEdit}
          />

          {/* DELETE */}
          <DeleteAlert
            isOpen={activeModal === 'delete'}
            onClose={closeModal}
            title="Are you sure you want to delete this assignment?"
            message={`You are about to remove ${selectedAssignment.cityName} from ${selectedAssignment.regionName} region. This action cannot be undone.`}
            onConfirm={handleConfirmDelete}
          />
        </>
      )}
    </div>
  )
}
