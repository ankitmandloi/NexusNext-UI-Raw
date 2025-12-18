'use client'

import { useState } from 'react'
import { Input } from '@/components/input'
import Actions from '../common/components/Actions'
import Header from '../common/components/Header.jsx'
import CommonTable from '../common/components/Table'
import { 
  ViewAlert, 
  EditAlert, 
  DeleteAlert, 
  AddAlert 
} from '../common/components/Alert.jsx'

import CommonPagination from '../common/components/Pagination.jsx'

// ============================================================================
// INITIAL DATA
// ============================================================================

const ITEMS_PER_PAGE = 10

const initialStates = [
  { id: 1, name: 'Madhya Pradesh' },
  { id: 2, name: 'Maharashtra' },
  { id: 3, name: 'Gujarat' },
  { id: 4, name: 'Rajasthan' },
]

const initialDistricts = [
  { id: 1, stateId: 1, stateName: 'Madhya Pradesh', districtName: 'Indore' },
  { id: 2, stateId: 1, stateName: 'Madhya Pradesh', districtName: 'Bhopal' },
  { id: 3, stateId: 1, stateName: 'Madhya Pradesh', districtName: 'Gwalior' },
  { id: 4, stateId: 2, stateName: 'Maharashtra', districtName: 'Mumbai' },
  { id: 5, stateId: 2, stateName: 'Maharashtra', districtName: 'Pune' },
  { id: 6, stateId: 2, stateName: 'Maharashtra', districtName: 'Nashik' },
  { id: 7, stateId: 3, stateName: 'Gujarat', districtName: 'Ahmedabad' },
  { id: 8, stateId: 3, stateName: 'Gujarat', districtName: 'Surat' },
]

// ============================================================================
// CUSTOM ICONS
// ============================================================================
// ============================================================================
// ACTION BUTTON COMPONENT
// ============================================================================

// ============================================================================
// MODAL COMPONENTS
// ============================================================================

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function DistrictPage() {
  const [districts, setDistricts] = useState(initialDistricts)
  const [states] = useState(initialStates)
  const [activeModal, setActiveModal] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(districts.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentDistricts = districts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page) => setCurrentPage(page)
  const handleView = (d) => { setSelectedDistrict(d); setActiveModal('view') }
  const handleEdit = (d) => { setSelectedDistrict(d); setActiveModal('edit') }
  const handleDelete = (d) => { setSelectedDistrict(d); setActiveModal('delete') }
  const handleAddClick = () => setActiveModal('add')
  const closeModal = () => { setActiveModal(null); setSelectedDistrict(null) }

 
  const handleAddDistrict = (form) => {
    const newId = districts.length > 0 ? Math.max(...districts.map(d => d.id)) + 1 : 1
    const stateName = states.find(s => s.id == form.stateId)?.name
    setDistricts(prev => [...prev, { id: newId, stateId: Number(form.stateId), stateName, districtName: form.districtName }])
  }

  
  const handleSaveEdit = (updated) => {
    setDistricts(prev =>
       prev.map(d => d.id === selectedDistrict.id ? {
         ...d, 
         stateId: Number(updated.stateId),
          stateName: states.find(s => s.id == updated.stateId)?.name, 
          districtName: updated.districtName } 
        : d))
  }

  

  const handleConfirmDelete = () => {
    setDistricts(prev => prev.filter(d => d.id !== selectedDistrict.id))
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>

          {/* HEADER */}
            <Header
              title="districts"
              subtitle="Manage all districts in the system"
              addLabel="Add District"
              onAdd={handleAddClick}
              dropdownOptions={[
                { label: 'Import from Excel' },
                { label: 'Export to Excel' },
                { label: 'Download Format' },
              ]}
            />
      
          {/* Table */}
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
      
        {/* PAGINATION */}
        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        
      {/* MODALS */}
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
                title="City Details"
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
                title="Edit City"
                message={`Update district details below`}
                fields={{
                  stateId: selectedDistrict.stateId,
                  districtName: selectedDistrict.districtName,
                }}
                dropdowns={{
                  stateId: states,
                }}
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
