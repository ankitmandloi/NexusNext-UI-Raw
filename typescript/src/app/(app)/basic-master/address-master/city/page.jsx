'use client'

import { useState, useEffect } from 'react'
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
// CUSTOM ICONS
// ============================================================================



// ============================================================================
// INITIAL DATA
// ============================================================================

// Sample district data
const initialDistricts = [
  { id: 1, name: 'Indore' },
  { id: 2, name: 'Bhopal' },
  { id: 3, name: 'Gwalior' },
  { id: 4, name: 'Mumbai' },
  { id: 5, name: 'Pune' },
  { id: 6, name: 'Nashik' },
  { id: 7, name: 'Ahmedabad' },
  { id: 8, name: 'Surat' },
]

// Sample city data
const initialCities = [
  { id: 1, districtId: 1, districtName: 'Indore', cityName: 'Indore City' },
  { id: 2, districtId: 1, districtName: 'Indore', cityName: 'Mhow' },
  { id: 3, districtId: 2, districtName: 'Bhopal', cityName: 'Bhopal City' },
  { id: 4, districtId: 2, districtName: 'Bhopal', cityName: 'Raisen' },
  { id: 5, districtId: 4, districtName: 'Mumbai', cityName: 'Mumbai City' },
  { id: 6, districtId: 4, districtName: 'Mumbai', cityName: 'Thane' },
  { id: 7, districtId: 5, districtName: 'Pune', cityName: 'Pune City' },
  { id: 8, districtId: 7, districtName: 'Ahmedabad', cityName: 'Ahmedabad City' },
]

// ============================================================================
// COMPONENTS
// ============================================================================



// ============================================================================
// VIEW ALERT COMPONENT
// ============================================================================



// ============================================================================
// EDIT ALERT COMPONENT
// ============================================================================



// ============================================================================
// ADD CITY ALERT COMPONENT
// ============================================================================



// ============================================================================
// DELETE ALERT COMPONENT
// ============================================================================



// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function CityPage() {
  // State management for the lists
  const [cities, setCities] = useState(initialCities)
  const [districts] = useState(initialDistricts)

  // Modal state management
  const [activeModal, setActiveModal] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(cities.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentCities = cities.slice(startIndex, endIndex)

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
  // CRUD HANDLERS - Ready for backend integration
  // ========================================================================

    const handleAddCity = (form) => {
    const newId = cities.length > 0 ? Math.max(...cities.map(c => c.id)) + 1 : 1
    const districtName = districts.find(d => d.id == form.districtId)?.name

    setCities(prev => [...prev, { id: newId,districtId: Number(form.districtId),districtName, cityName: form.cityName,
    }])
    }

    const handleSaveEdit = (updated) => {
      setCities(prev =>
        prev.map(c =>
          c.id === selectedCity.id
            ? {
                ...c,
                districtId: Number(updated.districtId),
                districtName: districts.find(d => d.id == updated.districtId)?.name,
                cityName: updated.cityName,
              }
            : c
        )
      )
    }


  const handleConfirmDelete = () => {
    setCities(prev => prev.filter(c => c.id !== selectedCity.id))
  }


  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 110px)" }}>

      {/* HEADER */}
      <Header
        title="Cities"
        subtitle="Manage all cities in the system"
        addLabel="Add City"
        onAdd={handleAddClick}
        dropdownOptions={[
          { label: 'Import from Excel' },
          { label: 'Export to Excel' },
          { label: 'Download Format' },
        ]}
      />

      

      {/* Table */}
        <CommonTable
        data={currentCities}
        emptyMessage="No cities found. Click 'Add City' to create one."   
        columns={[
          { key: 'id', label: 'ID', width: 100 },
          { key: 'districtName', label: 'District' },
          { key: 'cityName', label: 'City Name' },
        ]}
        renderActions={(city) => (
          <Actions
            onView={() => handleView(city)}
            onEdit={() => handleEdit(city)}
            onDelete={() => handleDelete(city)}
          />
        )}
      />

        {/* Pagination Footer */}
        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      

      

      {/* ================================================================== */}
      {/* ALERT MODALS */}
      {/* ================================================================== */}

      {/* ADD */}
      <AddAlert
        isOpen={activeModal === 'add'}
        onClose={closeModal}
        title="Add New City"
        message={`Enter the details of the new city below`}
        fields={{ districtId: '', cityName: '' }}
        dropdowns={{ districtId: districts }}
        onSave={handleAddCity}
      />


      {selectedCity && (
        <>
          {/* VIEW */}
          <ViewAlert
            isOpen={activeModal === 'view'}
            onClose={closeModal}
            title="City Details"
            message={`View the details of the selected city below`}
            fields={{
              ID: selectedCity.id,
              District: selectedCity.districtName,
              'City Name': selectedCity.cityName,
            }}
          />

          {/* EDIT */}
          <EditAlert
            isOpen={activeModal === 'edit'}
            onClose={closeModal}
            title="Edit City"
            message={`Update city details below`}
            fields={{
              districtId: selectedCity.districtId,
              cityName: selectedCity.cityName,
            }}
            dropdowns={{
              districtId: districts,
            }}
            onSave={handleSaveEdit}
          />

          {/* DELETE */}
          <DeleteAlert
            isOpen={activeModal === 'delete'}
            onClose={closeModal}
            title="Delete City?"
            message={`Do you really want to delete ${selectedCity.cityName}?`}
            onConfirm={handleConfirmDelete}
          />
        </>
      )}
    </div>
  )
}