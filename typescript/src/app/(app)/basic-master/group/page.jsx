'use client'

import { useState, useEffect } from 'react'
import CommonPagination from '../common/components/Pagination.jsx'
import CommonTable from '../common/components/Table.jsx'
import Actions from '../common/components/Actions.jsx'
import Header from '../common/components/Header.jsx'
import { ViewAlert, EditAlert, DeleteAlert, AddAlert } from '../common/components/Alert.jsx'


// ============================================================================
// REMOVE TYPES (JSX DOES NOT SUPPORT INTERFACES)
// ============================================================================

// const ITEMS_PER_PAGE = 10
const ITEMS_PER_PAGE = 10

// ============================================================================
// CUSTOM ICONS
// ============================================================================

const initialNames = [
  { id: 1, name: 'Premium Customers' },
  { id: 2, name: 'Regular Customers' }, 
  { id: 3, name: 'Wholesale Partners' },
  { id: 4, name: 'Retail Partners' },
  { id: 5, name: 'VIP Members' },
  { id: 6, name: 'New Customers' },
  { id: 7, name: 'Inactive Accounts' },
]

// ============================================================================
// INITIAL DATA
// ============================================================================

const initialGroups = [ 
  { id: 1, nameId: 1, name: 'Premium Customers', description: 'Customers with premium membership' },
  { id: 2, nameId: 2, name: 'Regular Customers', description: 'Customers with regular membership' },
  { id: 3, nameId: 3, name: 'Wholesale Partners', description: 'Partners involved in wholesale trade' },    
  { id: 4, nameId: 4, name: 'Retail Partners', description: 'Partners involved in retail trade' },
  { id: 5, nameId: 5, name: 'VIP Members', description: 'Very Important Persons with special privileges' },
  { id: 6, nameId: 6, name: 'New Customers', description: 'Recently registered customers' },
  { id: 7, nameId: 7, name: 'Inactive Accounts', description: 'Customers with inactive accounts' },
  {id: 8, nameId: 1, name: 'Premium Customers', description: 'Customers with premium membership' },
  { id: 9, nameId: 2, name: 'Regular Customers', description: 'Customers with regular membership' },
  { id: 10, nameId: 3, name: 'Wholesale Partners', description: 'Partners involved in wholesale trade' }, 
]

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function GroupPage() {
  const [groups, setGroups] = useState(initialGroups)
  const [names] = useState(initialNames)
  const [activeModal, setActiveModal] = useState(null)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(groups.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentGroups = groups.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page) => setCurrentPage(page)
  const handleView = (g) => {
    setSelectedGroup(g)
    setActiveModal('view')
  }
  const handleEdit = (g) => {
    setSelectedGroup(g)
    setActiveModal('edit')
  }
  const handleDelete = (g) => {
    setSelectedGroup(g)
    setActiveModal('delete')
  }
  const handleAddClick = () => setActiveModal('add')
  const closeModal = () => {
    setActiveModal(null)
    setSelectedGroup(null)
  }

  


  const handleAddGroup = (form) => {
    const newId = groups.length > 0 ? Math.max(...groups.map((g) => g.id)) + 1 : 1
    const name = names.find((n) => n.id === form.name)?.name 

    setGroups((prev) => [...prev, { id: newId, 
      nameId : Number(form.nameId),
      name, 
      description : form.description }])
  }

  
  const handleConfirmDelete = () => {
    setGroups(prev => prev.filter((g) => g.id !== selectedGroup.id))
  }

  
  
  const handleSaveEdit = (updated) => {
    setGroups(prev =>
      prev.map(g =>
        g.id === selectedGroup.id
          ? {
              ...g,
              nameId: Number(updated.nameId),
              name: names.find(n => n.id == updated.nameId)?.name,
              description: updated.description,
            }
          : g 
      )
    )
  }

  
  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* HEADER */}
            <Header
                    title="Groups"
                    subtitle="Manage all groups in the system"
                    addLabel="Add Group"
                    onAdd={handleAddClick}
                    dropdownOptions={[
                      { label: 'Import from Excel' },
                      { label: 'Export to Excel' },
                      { label: 'Download Format' },
                    ]}
                  />
      
      {/* TABLE WRAPPER */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">

        {/* Outer scroll */}

        <CommonTable
            data={currentGroups}
            emptyMessage="No groups found. Click 'Add Group' to create one."
            columns={[
              { key: 'id', label: 'ID', width: 100 },
              { key: 'name', label: 'Name' },
              { key: 'description', label: 'Description' },
            ]}
            renderActions={(group) => (
              <Actions
                onView={() => handleView(group)}
                onEdit={() => handleEdit(group)}
                onDelete={() => handleDelete(group)}
              />
            )}
          />
        {/* PAGINATION FOOTER */}
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
              title="Add Group"
              message="Enter the details of the new group below."
              fields={{ nameId: '', description : '' }}
              dropdowns={{nameId : names}} 
              onSave={handleAddGroup}
            /> 

      {selectedGroup && (
              <>
                {/* VIEW */}
                <ViewAlert
                  isOpen={activeModal === 'view'}
                  onClose={closeModal}
                  title="Group Details"
                  message="View the details of the selected group below."
                  fields={{
                    ID: selectedGroup.id,
                    Name: selectedGroup.name,
                    'Description': selectedGroup.description,
                  }}
                />  
                
                {/* EDIT */}
                <EditAlert
                  isOpen={activeModal === 'edit'}
                  onClose={closeModal}
                  title="Edit Group"
                  message="Update the group details below."
                  fields={{
                    nameId : selectedGroup.nameId,
                    description : selectedGroup.description,
                  }}
                  dropdowns={{ nameId: names }}
                  onSave={handleSaveEdit}
                />
      
                {/* DELETE */}
                <DeleteAlert
                  isOpen={activeModal === 'delete'}
                  onClose={closeModal}
                  title=" Are you sure you want to delete this group?"
                  message={`Do you really want to delete ${selectedGroup.description} from ${selectedGroup.name}? This action cannot be undone.`}
                  onConfirm={handleConfirmDelete}
                />
              </>
            )}

      
    </div>
  )
}
