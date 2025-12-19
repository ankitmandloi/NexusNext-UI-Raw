'use client'

import { useState, useEffect } from 'react'

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
// SAMPLE DATA
// ============================================================================

const ITEMS_PER_PAGE = 10

const initialCities = [
  { id: 1, name: 'Springfield' },
  { id: 2, name: 'Rivertown' },
  { id: 3, name: 'Lakeside' },
  { id: 4, name: 'Hillview' },
]

const initialAreas = [
  { id: 1, cityId: 1, cityName: 'Springfield', areaName: 'North End', areaCode: 'SP-N' },
  { id: 2, cityId: 1, cityName: 'Springfield', areaName: 'Downtown', areaCode: 'SP-D' },
  { id: 3, cityId: 2, cityName: 'Rivertown', areaName: 'Harbor', areaCode: 'RT-H' },
  { id: 4, cityId: 3, cityName: 'Lakeside', areaName: 'West Bay', areaCode: 'LS-W' },
  { id: 5, cityId: 2, cityName: 'Rivertown', areaName: 'Central Plaza', areaCode: 'RT-C' },
  { id: 6, cityId: 4, cityName: 'Hillview', areaName: 'Summit Ridge', areaCode: 'HV-S' },
  { id: 7, cityId: 1, cityName: 'Springfield', areaName: 'East Side', areaCode: 'SP-E' },
  { id: 8, cityId: 3, cityName: 'Lakeside', areaName: 'Marina District', areaCode: 'LS-M' },
]

// ============================================================================
// ICON / ACTION BUTTON
// ============================================================================




// ============================================================================
// MODALS
// ============================================================================



 


// ============================================================================
// MAIN PAGE
// ============================================================================

export default function AreaMasterPage() {
  const [areas, setAreas] = useState(initialAreas)
  const [cities] = useState(initialCities)

  const [activeModal, setActiveModal] = useState(null)
  const [selectedArea, setSelectedArea] = useState(null)

  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(areas.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentItems = areas.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page) => setCurrentPage(page)

  const handleView = (a) => { setSelectedArea(a); setActiveModal('view') }
  const handleEdit = (a) => { setSelectedArea(a); setActiveModal('edit') }
  const handleDelete = (a) => { setSelectedArea(a); setActiveModal('delete') }
  const handleAddClick = () => setActiveModal('add')
  const closeModal = () => { setActiveModal(null); setSelectedArea(null) }

  

  const handleAdd = (cityId, cityName, areaName, areaCode) => {
    const newId = areas.length > 0 ? Math.max(...areas.map(a => a.id)) + 1 : 1
    setAreas(prev => [...prev, { id: newId, cityId, cityName, areaName, areaCode }])
  }

  const handleSaveEdit = (id, cityId, cityName, areaName, areaCode) => {
    setAreas(prev => prev.map(a => a.id === id ? { ...a, cityId, cityName, areaName, areaCode } : a))
  }

  const handleConfirmDelete = (id) => {
    setAreas(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header - Sticky */}
      <Header
        title="Area Master"
        subtitle="Manage areas and area codes"
        addLabel="Add Area"
        onAdd={handleAddClick}
        dropdownOptions={[
          { label: 'Import from Excel' },
          { label: 'Export to Excel' },
          { label: 'Download Format' },
        ]}
      />


      {/* Table Card */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Horizontal Scroll Container */}
          <CommonTable
            data={currentItems}
            emptyMessage='No areas found. Click "Add Area" to create one.'
            columns={[
              { key: 'id', label: 'ID', width: 80 },
              { key: 'areaName', label: 'Area Name' },
              { key: 'areaCode', label: 'Area Code', width: 150 },
              { key: 'cityName', label: 'City', width: 180 },
            ]}
            renderActions={(area) => (
              <Actions
                onView={() => handleView(area)}
                onEdit={() => handleEdit(area)}
                onDelete={() => handleDelete(area)}
              />
            )}
          />


        {/* Pagination */}
        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* MODALS */}
      <AddAlert
          isOpen={activeModal === 'add'}
          onClose={closeModal}
          title="Add New Area"
          message="Select city and provide area name and area code."
          fields={{ cityId: '', areaName: '', areaCode: '' }}
          dropdowns={{ cityId: cities }}
          onSave={(form) =>
            handleAdd(
              Number(form.cityId),
              cities.find(c => c.id == form.cityId)?.name,
              form.areaName,
              form.areaCode
            )
          }
        />

        {selectedArea && (
          <>
            <ViewAlert
              isOpen={activeModal === 'view'}
              onClose={closeModal}
              title="Area Details"
              message="View the selected area details below."
              fields={{
                ID: selectedArea.id,
                City: selectedArea.cityName,
                'Area Name': selectedArea.areaName,
                'Area Code': selectedArea.areaCode,
              }}
            />

            <EditAlert
              isOpen={activeModal === 'edit'}
              onClose={closeModal}
              title="Edit Area"
              message="Update city, area name and area code."
              fields={{
                cityId: selectedArea.cityId,
                areaName: selectedArea.areaName,
                areaCode: selectedArea.areaCode,
              }}
              dropdowns={{ cityId: cities }}
              onSave={(form) =>
                handleSaveEdit(
                  selectedArea.id,
                  Number(form.cityId),
                  cities.find(c => c.id == form.cityId)?.name,
                  form.areaName,
                  form.areaCode
                )
              }
            />

            <DeleteAlert
              isOpen={activeModal === 'delete'}
              onClose={closeModal}
              title="Are you sure you want to delete this area?"
              message={`You are about to delete ${selectedArea.areaName} (${selectedArea.areaCode}) in ${selectedArea.cityName}. This action cannot be undone.`}
              onConfirm={() => handleConfirmDelete(selectedArea.id)}
            />
          </>
        )}
   </div>
  )
}
