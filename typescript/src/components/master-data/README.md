# Master Data Components - Documentation

A standardized, reusable component library for managing master data (State, District, City, Pincode, etc.) with full CRUD operations.

## 📁 Structure

```
src/components/master-data/
├── types.ts              # TypeScript interfaces and types
├── icons.tsx             # Custom icons (DeleteIcon, etc.)
├── action-button.tsx     # View/Edit/Delete action buttons
├── view-alert.tsx        # View entity dialog
├── edit-alert.tsx        # Edit entity dialog
├── add-alert.tsx         # Add new entity dialog
├── delete-alert.tsx      # Delete confirmation dialog
├── data-dropdown.tsx     # Import/Export dropdown
├── use-master-data.ts    # Custom React hook for state management
├── index.ts              # Central export file
└── README.md             # This file
```

## 🚀 Quick Start

### 1. Basic Implementation (Simple Entity with just ID and Name)

```typescript
'use client'

import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
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

// Define your entity interface
interface District extends BaseMasterEntity {
  id: number
  name: string
}

// Initial data
const initialDistricts: District[] = [
  { id: 1, name: 'Indore' },
  { id: 2, name: 'Bhopal' },
  { id: 3, name: 'Gwalior' },
]

export default function DistrictPage() {
  // Use the hook
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
  } = useMasterData<District>(initialDistricts)

  return (
    <div className="flex h-[calc(100vh-theme(spacing.20))] flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Districts</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage all districts in the system
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DataDropdown />
            <Button color="dark/zinc" onClick={openAddModal}>
              <PlusIcon />
              Add District
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Table Header */}
        <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
          <div className="w-[15%] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</div>
          <div className="w-[55%] text-sm font-medium text-zinc-500 dark:text-zinc-400">District Name</div>
          <div className="w-[30%] text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Actions</div>
        </div>

        {/* Table Body */}
        <div className="flex-1 overflow-y-auto">
          {entities.map((entity, index) => (
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
                <ActionButton variant="view" title="View" onClick={() => openViewModal(entity)}>
                  <EyeIcon className="w-4 h-4" />
                </ActionButton>
                <ActionButton variant="edit" title="Edit" onClick={() => openEditModal(entity)}>
                  <PencilSquareIcon className="w-4 h-4" />
                </ActionButton>
                <ActionButton variant="delete" title="Delete" onClick={() => openDeleteModal(entity)}>
                  <DeleteIcon className="w-4 h-4" />
                </ActionButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <ViewAlert
        isOpen={activeModal === 'view'}
        onClose={closeModal}
        entity={selectedEntity}
        entityName="District"
      />

      <EditAlert
        isOpen={activeModal === 'edit'}
        onClose={closeModal}
        entity={selectedEntity}
        entityName="District"
        onSave={updateEntity}
      />

      <AddAlert
        isOpen={activeModal === 'add'}
        onClose={closeModal}
        entityName="District"
        onAdd={addEntity}
      />

      <DeleteAlert
        isOpen={activeModal === 'delete'}
        onClose={closeModal}
        entity={selectedEntity}
        entityName="District"
        onConfirm={deleteEntity}
      />
    </div>
  )
}
```

### 2. Advanced Implementation (Entity with Additional Fields)

```typescript
'use client'

import { useState } from 'react'
import { Input } from '@/components/input'
import { 
  useMasterData,
  AddAlert,
  EditAlert,
  ViewAlert,
  type BaseMasterEntity 
} from '@/components/master-data'

// Entity with additional fields
interface City extends BaseMasterEntity {
  id: number
  name: string
  districtId: number
  districtName: string
  population?: number
}

export default function CityPage() {
  const {
    entities,
    activeModal,
    selectedEntity,
    openAddModal,
    openEditModal,
    closeModal,
    addEntity,
    updateEntity,
  } = useMasterData<City>(initialCities)

  // State for additional fields
  const [districtId, setDistrictId] = useState<number>(0)
  const [population, setPopulation] = useState<string>('')

  // Custom add handler with additional data
  const handleAdd = (name: string) => {
    addEntity(name, { districtId, districtName: 'Sample District', population: parseInt(population) })
    setDistrictId(0)
    setPopulation('')
  }

  // Additional fields for Add modal
  const additionalAddFields = (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          District
        </label>
        <Input
          type="number"
          value={districtId}
          onChange={(e) => setDistrictId(parseInt(e.target.value))}
          placeholder="Enter district ID"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Population
        </label>
        <Input
          type="number"
          value={population}
          onChange={(e) => setPopulation(e.target.value)}
          placeholder="Enter population"
        />
      </div>
    </>
  )

  // Custom fields for View modal
  const viewFields = [
    { key: 'id' as keyof City, label: 'ID' },
    { key: 'name' as keyof City, label: 'City Name' },
    { key: 'districtName' as keyof City, label: 'District' },
    { key: 'population' as keyof City, label: 'Population' },
  ]

  return (
    <div>
      {/* Your table UI */}
      
      {/* Modals with additional fields */}
      <AddAlert
        isOpen={activeModal === 'add'}
        onClose={closeModal}
        entityName="City"
        onAdd={handleAdd}
        additionalFields={additionalAddFields}
      />

      <ViewAlert
        isOpen={activeModal === 'view'}
        onClose={closeModal}
        entity={selectedEntity}
        entityName="City"
        fields={viewFields}
      />

      <EditAlert
        isOpen={activeModal === 'edit'}
        onClose={closeModal}
        entity={selectedEntity}
        entityName="City"
        onSave={updateEntity}
        additionalFields={additionalAddFields}
      />
    </div>
  )
}
```

## 🔌 API Integration

Replace the local state operations with API calls:

```typescript
// In your page component

const handleAdd = async (name: string) => {
  try {
    const response = await fetch('/api/districts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    const newEntity = await response.json()
    addEntity(name, newEntity) // Or refetch the entire list
  } catch (error) {
    console.error('Failed to add district:', error)
  }
}

const handleUpdate = async (id: number, name: string) => {
  try {
    await fetch(`/api/districts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    updateEntity(id, name)
  } catch (error) {
    console.error('Failed to update district:', error)
  }
}

const handleDelete = async (id: number) => {
  try {
    await fetch(`/api/districts/${id}`, { method: 'DELETE' })
    deleteEntity(id)
  } catch (error) {
    console.error('Failed to delete district:', error)
  }
}

// Use these in your modals
<AddAlert onAdd={handleAdd} />
<EditAlert onSave={handleUpdate} />
<DeleteAlert onConfirm={handleDelete} />
```

## 📦 Components Reference

### `useMasterData<T>(initialData)`

Custom hook for managing master data state.

**Returns:**
- `entities` - Array of entities
- `activeModal` - Currently active modal ('view'|'edit'|'delete'|'add'|null)
- `selectedEntity` - Currently selected entity
- `openViewModal(entity)` - Open view modal
- `openEditModal(entity)` - Open edit modal
- `openDeleteModal(entity)` - Open delete modal
- `openAddModal()` - Open add modal
- `closeModal()` - Close all modals
- `addEntity(name, additionalData?)` - Add new entity
- `updateEntity(id, name, additionalData?)` - Update entity
- `deleteEntity(id)` - Delete entity

### `ViewAlert`

Props:
- `isOpen: boolean`
- `onClose: () => void`
- `entity: T | null`
- `entityName: string` (e.g., "District")
- `fields?: Array<{ key: keyof T; label: string }>` (optional custom fields)

### `EditAlert`

Props:
- `isOpen: boolean`
- `onClose: () => void`
- `entity: T | null`
- `entityName: string`
- `onSave: (id, name, additionalData?) => void`
- `additionalFields?: React.ReactNode` (optional custom fields)

### `AddAlert`

Props:
- `isOpen: boolean`
- `onClose: () => void`
- `entityName: string`
- `onAdd: (name, additionalData?) => void`
- `additionalFields?: React.ReactNode`

### `DeleteAlert`

Props:
- `isOpen: boolean`
- `onClose: () => void`
- `entity: T | null`
- `entityName: string`
- `onConfirm: (id) => void`

### `DataDropdown`

Props:
- `onImport?: () => void`
- `onExport?: () => void`
- `onDownloadTemplate?: () => void`

### `ActionButton`

Props:
- `variant: 'view' | 'edit' | 'delete'`
- `title: string`
- `onClick?: () => void`
- `children: React.ReactNode`

## ✨ Features

✅ Fully typed with TypeScript
✅ Reusable across all master data pages
✅ Consistent UI/UX
✅ Dark mode support
✅ Loading states
✅ Form validation
✅ Error handling ready
✅ API integration ready
✅ Extensible for custom fields
✅ Mobile responsive

## 🎨 Customization

All components use Catalyst UI design system. You can customize:
- Button colors (change `color="dark/zinc"` to other Catalyst colors)
- Table layout (modify column widths)
- Additional fields (pass custom React nodes)
- Icons (import different Heroicons)

## 📝 Creating New Master Data Page

1. Copy the basic implementation example
2. Change entity interface and name
3. Update initial data
4. Adjust table columns if needed
5. Add API integration when ready

That's it! You now have a fully functional master data page.

