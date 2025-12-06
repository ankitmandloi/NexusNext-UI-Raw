/**
 * MASTER DATA PAGE TEMPLATE
 * 
 * Copy this template to quickly create new master data pages
 * Replace "Entity" with your entity name (e.g., District, City, Pincode)
 */

'use client'

import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import {
  Pagination,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from '@/components/pagination'
import { PlusIcon, EyeIcon, PencilSquareIcon } from '@heroicons/react/16/solid'
import {
  ActionButton,
  AddAlert,
  DeleteAlert,
  DeleteIcon,
  EditAlert,
  ViewAlert,
  DataDropdown,
  useMasterData,
  type BaseMasterEntity,
} from '@/components/master-data'

// ============================================================================
// 1. DEFINE YOUR ENTITY INTERFACE
// ============================================================================

interface Entity extends BaseMasterEntity {
  id: number
  name: string
  // Add more fields as needed:
  // parentId?: number
  // code?: string
  // isActive?: boolean
}

// ============================================================================
// 2. INITIAL DATA (Replace with API call in production)
// ============================================================================

const initialEntities: Entity[] = [
  { id: 1, name: 'Entity 1' },
  { id: 2, name: 'Entity 2' },
  { id: 3, name: 'Entity 3' },
]

// ============================================================================
// 3. MAIN PAGE COMPONENT
// ============================================================================

export default function EntityPage() {
  // Use the master data hook
  const {
    entities,
    activeModal,
    selectedEntity,
    openViewModal,
    openEditModal,
    openDeleteModal,
    openAddModal,
    closeModal,
    addEntity,
    updateEntity,
    deleteEntity,
  } = useMasterData<Entity>(initialEntities)

  // ============================================================================
  // 4. OPTIONAL: CUSTOM HANDLERS FOR API INTEGRATION
  // ============================================================================

  /* Uncomment and implement when ready to integrate with backend
  
  const handleAdd = async (name: string) => {
    try {
      const response = await fetch('/api/entities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      const newEntity = await response.json()
      addEntity(name, newEntity)
    } catch (error) {
      console.error('Failed to add entity:', error)
    }
  }

  const handleUpdate = async (id: number, name: string) => {
    try {
      await fetch(`/api/entities/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      updateEntity(id, name)
    } catch (error) {
      console.error('Failed to update entity:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/entities/${id}`, { method: 'DELETE' })
      deleteEntity(id)
    } catch (error) {
      console.error('Failed to delete entity:', error)
    }
  }

  */

  // ============================================================================
  // 5. RENDER
  // ============================================================================

  return (
    <div className="flex h-[calc(100vh-theme(spacing.20))] flex-col">
      {/* Header - Sticky */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Entities</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage all entities in the system
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DataDropdown 
              // onImport={handleImport}
              // onExport={handleExport}
              // onDownloadTemplate={handleDownloadTemplate}
            />
            <Button color="dark/zinc" onClick={openAddModal}>
              <PlusIcon />
              Add Entity
            </Button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Table Header - Fixed */}
        <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
          <div className="w-[15%] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</div>
          <div className="w-[55%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Entity Name</div>
          <div className="w-[30%] text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Actions</div>
        </div>

        {/* Scrollable Table Body */}
        <div className="flex-1 overflow-y-auto overflow-x-auto
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar]:h-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-zinc-300
          [&::-webkit-scrollbar-thumb]:rounded-full
          dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
        >
          {entities.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
              No entities found. Click "Add Entity" to create one.
            </div>
          ) : (
            entities.map((entity, index) => (
              <div 
                key={entity.id} 
                className={`flex items-center py-[1.1rem] border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                  index === entities.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <div className="w-[15%] pl-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">
                  {entity.id}
                </div>
                <div className="w-[55%] text-sm font-medium text-zinc-950 dark:text-white">
                  {entity.name}
                </div>
                <div className="w-[30%] flex items-center justify-center gap-2">
                  <ActionButton 
                    variant="view" 
                    title="View"
                    onClick={() => openViewModal(entity)}
                  >
                    <EyeIcon className="w-4 h-4" />
                  </ActionButton>
                  <ActionButton 
                    variant="edit" 
                    title="Edit"
                    onClick={() => openEditModal(entity)}
                  >
                    <PencilSquareIcon className="w-4 h-4" />
                  </ActionButton>
                  <ActionButton 
                    variant="delete" 
                    title="Delete"
                    onClick={() => openDeleteModal(entity)}
                  >
                    <DeleteIcon className="w-4 h-4" />
                  </ActionButton>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-center border-t border-zinc-950/5 dark:border-white/5 px-4 h-11 shrink-0">
          <Pagination>
            <PaginationPrevious href={null} />
            <PaginationList>
              <PaginationPage href="?page=1" current>1</PaginationPage>
              <PaginationPage href="?page=2">2</PaginationPage>
              <PaginationPage href="?page=3">3</PaginationPage>
            </PaginationList>
            <PaginationNext href="?page=2" />
          </Pagination>
        </div>
      </div>

      {/* ================================================================== */}
      {/* ALERT MODALS */}
      {/* ================================================================== */}

      {/* Add Entity Alert */}
      <AddAlert
        isOpen={activeModal === 'add'}
        onClose={closeModal}
        entityName="Entity"
        onAdd={addEntity} // Replace with handleAdd for API integration
      />

      {/* View Entity Alert */}
      <ViewAlert
        isOpen={activeModal === 'view'}
        onClose={closeModal}
        entity={selectedEntity}
        entityName="Entity"
      />

      {/* Edit Entity Alert */}
      <EditAlert
        isOpen={activeModal === 'edit'}
        onClose={closeModal}
        entity={selectedEntity}
        entityName="Entity"
        onSave={updateEntity} // Replace with handleUpdate for API integration
      />

      {/* Delete Entity Alert */}
      <DeleteAlert
        isOpen={activeModal === 'delete'}
        onClose={closeModal}
        entity={selectedEntity}
        entityName="Entity"
        onConfirm={deleteEntity} // Replace with handleDelete for API integration
      />
    </div>
  )
}

