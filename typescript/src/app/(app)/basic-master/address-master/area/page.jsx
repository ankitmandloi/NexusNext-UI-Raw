'use client'

import { useState } from 'react'
import { Input } from '@/components/input'
import Actions from '../common/components/Actions.jsx'
import Header from '../common/components/Header.jsx'
import CommonPagination from '../common/components/Pagination.jsx'
import CommonTable from '../common/components/Table.jsx'
import { 
  ViewAlert, 
  EditAlert, 
  DeleteAlert, 
  AddAlert 
} from '../common/components/Alert.jsx'

// ============================================================================
// CONSTANTS
// ============================================================================

const ITEMS_PER_PAGE = 10

// ============================================================================
// INITIAL DATA
// ============================================================================

// Sample city data for dropdown
const initialCities = [
  { id: 1, name: 'Mumbai' },
  { id: 2, name: 'Delhi' },
  { id: 3, name: 'Bangalore' },
  { id: 4, name: 'Hyderabad' },
  { id: 5, name: 'Chennai' },
  { id: 6, name: 'Kolkata' },
  { id: 7, name: 'Pune' },
  { id: 8, name: 'Ahmedabad' },
]

// Sample area data
const initialAreas = [
  { id: 1, cityId: 1, cityName: 'Mumbai', areaName: 'Andheri West', areaCode: 'MUM-AW-001' },
  { id: 2, cityId: 1, cityName: 'Mumbai', areaName: 'Bandra', areaCode: 'MUM-BAN-002' },
  { id: 3, cityId: 1, cityName: 'Mumbai', areaName: 'Powai', areaCode: 'MUM-POW-003' },
  { id: 4, cityId: 2, cityName: 'Delhi', areaName: 'Connaught Place', areaCode: 'DEL-CP-001' },
  { id: 5, cityId: 2, cityName: 'Delhi', areaName: 'Karol Bagh', areaCode: 'DEL-KB-002' },
  { id: 6, cityId: 3, cityName: 'Bangalore', areaName: 'Koramangala', areaCode: 'BLR-KOR-001' },
  { id: 7, cityId: 3, cityName: 'Bangalore', areaName: 'Whitefield', areaCode: 'BLR-WHT-002' },
  { id: 8, cityId: 4, cityName: 'Hyderabad', areaName: 'Hitech City', areaCode: 'HYD-HTC-001' },
  { id: 9, cityId: 4, cityName: 'Hyderabad', areaName: 'Jubilee Hills', areaCode: 'HYD-JH-002' },
  { id: 10, cityId: 5, cityName: 'Chennai', areaName: 'T Nagar', areaCode: 'CHE-TNG-001' },
  { id: 11, cityId: 6, cityName: 'Kolkata', areaName: 'Park Street', areaCode: 'KOL-PS-001' },
  { id: 12, cityId: 7, cityName: 'Pune', areaName: 'Hinjewadi', areaCode: 'PUN-HIN-001' },
]

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function AreaMasterPage() {
  // State management for the lists
  const [areas, setAreas] = useState(initialAreas)
  const [cities] = useState(initialCities)

  // Modal state management
  const [activeModal, setActiveModal] = useState(null)
  const [selectedArea, setSelectedArea] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(areas.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentAreas = areas.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // ========================================================================
  // ACTION HANDLERS
  // ========================================================================

  const handleView = (area) => {
    setSelectedArea(area)
    setActiveModal('view')
  }

  const handleEdit = (area) => {
    setSelectedArea(area)
    setActiveModal('edit')
  }

  const handleDelete = (area) => {
    setSelectedArea(area)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setActiveModal('add')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedArea(null)
  }

  // ========================================================================
  // CRUD HANDLERS
  // ========================================================================

  const handleAddArea = (form) => {
    const newId = areas.length > 0 ? Math.max(...areas.map(a => a.id)) + 1 : 1
    const cityName = cities.find(c => c.id == form.cityId)?.name

    setAreas(prev => [...prev, { 
      id: newId,
      cityId: Number(form.cityId),
      cityName, 
      areaName: form.areaName,
      areaCode: form.areaCode,
    }])
    closeModal()
  }

  const handleSaveEdit = (form) => {
    const cityName = cities.find(c => c.id == form.cityId)?.name
    
    setAreas(prev =>
      prev.map(area =>
        area.id === selectedArea.id
          ? { 
              ...area, 
              cityId: Number(form.cityId),
              cityName,
              areaName: form.areaName,
              areaCode: form.areaCode,
            }
          : area
      )
    )
    closeModal()
  }

  const handleConfirmDelete = () => {
    setAreas(prev => prev.filter(a => a.id !== selectedArea.id))
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
        title="Area Master"
        subtitle="Manage area information for cities"
        addLabel="Add Area"
        onAdd={handleAddClick}
        dropdownOptions={[
          { label: 'Import from Excel', onClick: handleImportExcel },
          { label: 'Export to Excel', onClick: handleExportExcel },
          { label: 'Download Format', onClick: handleDownloadFormat },
        ]}
      />

      {/* Table using CommonTable component */}
      <CommonTable
        data={currentAreas}
        emptyMessage="No areas found. Click 'Add Area' to create one."
        minWidth="900px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '80px' },
          { key: 'areaName', label: 'Area Name', width: '220px' },
          { key: 'areaCode', label: 'Area Code', width: '180px' },
          { key: 'cityName', label: 'City', width: '180px' },
        ]}
        renderActions={(row) => (
          <Actions
            onView={() => handleView(row)}
            onEdit={() => handleEdit(row)}
            onDelete={() => handleDelete(row)}
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
      {/* ALERT MODALS */}
      {/* ================================================================== */}

      {/* ADD MODAL */}
      <AddAlert
        isOpen={activeModal === 'add'}
        onClose={closeModal}
        title="Add Area"
        message="Enter the area details below"
        fields={{
          cityId: '',
          areaName: '',
          areaCode: '',
        }}
        fieldConfig={{
          cityId: {
            label: 'City',
            type: 'select',
            options: cities.map(city => ({ value: city.id, label: city.name })),
            required: true,
          },
          areaName: {
            label: 'Area Name',
            type: 'text',
            placeholder: 'e.g., Andheri West',
            required: true,
          },
          areaCode: {
            label: 'Area Code',
            type: 'text',
            placeholder: 'e.g., MUM-AW-001',
            required: true,
          },
        }}
        onSave={handleAddArea}
      />

      {/* VIEW MODAL */}
      {selectedArea && (
        <ViewAlert
          isOpen={activeModal === 'view'}
          onClose={closeModal}
          title="Area Details"
          message="View the area information"
          fields={{
            ID: selectedArea.id,
            'Area Name': selectedArea.areaName,
            'Area Code': selectedArea.areaCode,
            'City': selectedArea.cityName,
          }}
        />
      )}

      {/* EDIT MODAL */}
      {selectedArea && (
        <EditAlert
          isOpen={activeModal === 'edit'}
          onClose={closeModal}
          title="Edit Area"
          message="Update the area details"
          fields={{
            cityId: selectedArea.cityId,
            areaName: selectedArea.areaName,
            areaCode: selectedArea.areaCode,
          }}
          fieldConfig={{
            cityId: {
              label: 'City',
              type: 'select',
              options: cities.map(city => ({ value: city.id, label: city.name })),
              required: true,
            },
            areaName: {
              label: 'Area Name',
              type: 'text',
              placeholder: 'e.g., Andheri West',
              required: true,
            },
            areaCode: {
              label: 'Area Code',
              type: 'text',
              placeholder: 'e.g., MUM-AW-001',
              required: true,
            },
          }}
          onSave={handleSaveEdit}
        />
      )}

      {/* DELETE MODAL */}
      {selectedArea && (
        <DeleteAlert
          isOpen={activeModal === 'delete'}
          onClose={closeModal}
          title="Delete Area"
          message={`Are you sure you want to delete "${selectedArea.areaName}"? This action cannot be undone.`}
          itemName={selectedArea.areaName}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  )
}
