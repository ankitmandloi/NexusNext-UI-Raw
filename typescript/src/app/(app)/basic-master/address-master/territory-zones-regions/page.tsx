// @ts-nocheck
'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/button'
import Header from '@/app/(app)/basic-master/address-master/common/components/Header.jsx'
import CommonTable from '@/app/(app)/basic-master/address-master/common/components/Table.jsx'
import CommonPagination from '@/app/(app)/basic-master/address-master/common/components/Pagination.jsx'
import Actions from '@/app/(app)/basic-master/address-master/common/components/Actions.jsx'
import {
  AddAlert,
  DeleteAlert,
  EditAlert,
  ViewAlert,
} from '@/app/(app)/basic-master/address-master/common/components/Alert.jsx'
import { Territory, slugifyLabel } from './data'
import { useTerritoryContext } from './TerritoryContext'

const ITEMS_PER_PAGE = 10

type ModalState = 'add' | 'view' | 'edit' | 'delete' | null

type TerritoryForm = {
  territoryName: string
  description: string
}

export default function TerritoryListPage() {
  const { territories, updateTerritories } = useTerritoryContext()
  const [activeModal, setActiveModal] = useState<ModalState>(null)
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(territories.length / ITEMS_PER_PAGE))
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [territories, currentPage])

  const paginatedTerritories = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return territories.slice(start, start + ITEMS_PER_PAGE)
  }, [territories, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const openModal = (type: ModalState, payload?: Territory) => {
    setActiveModal(type)
    setSelectedTerritory(payload ?? null)
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedTerritory(null)
  }

  const handleAddTerritory = (form: TerritoryForm) => {
    const trimmedName = form.territoryName.trim()
    if (!trimmedName) return

    const newTerritory: Territory = {
      id: `TER-${String(territories.length + 1).padStart(3, '0')}`,
      name: trimmedName,
      slug: slugifyLabel(trimmedName),
      description: form.description || 'No description added yet.',
      zones: [],
    }

    updateTerritories([...territories, newTerritory])
  }

  const handleSaveEdit = (form: TerritoryForm) => {
    if (!selectedTerritory) return

    const updatedTerritories = territories.map((territory) =>
      territory.id === selectedTerritory.id
        ? {
            ...territory,
            name: form.territoryName || territory.name,
            slug: slugifyLabel(form.territoryName || territory.name),
            description: form.description || territory.description,
          }
        : territory
    )
    updateTerritories(updatedTerritories)
  }

  const handleDelete = () => {
    if (!selectedTerritory) return
    updateTerritories(territories.filter((territory) => territory.id !== selectedTerritory.id))
  }

  const tableRows = paginatedTerritories.map((territory) => ({
    id: territory.id,
    territoryName: territory.name,
    details: (
      <Button
        href={`/basic-master/address-master/territory-zones-regions/${territory.slug}/zone-list`}
        color="zinc"
        className="text-xs px-2 py-1 h-7 flex items-center justify-center"
      >
        Zone
      </Button>
    ),
    raw: territory,
  }))

  const totalPages = Math.max(1, Math.ceil(territories.length / ITEMS_PER_PAGE))

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* @ts-ignore - Header is a JSX component */}
      <Header
        title={
          <>
            Territory &nbsp;
            <span className="text-zinc-600 dark:text-zinc-300">Management</span>
          </>
        }
        subtitle="Manage territories and their associated zones and regions"
        addLabel="Add Territory"
        onAdd={() => openModal('add')}
        dropdownOptions={[
          { label: 'Import from Excel' },
          { label: 'Export to Excel' },
          { label: 'Download Format' },
        ]}
      />

      {/* @ts-ignore - CommonTable is a JSX component */}
      <CommonTable
        data={tableRows}
        emptyMessage="No territories found. Use 'Add Territory' to create one."
        minWidth="650px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '100px' },
          { key: 'territoryName', label: 'Territory Name', flexible: true },
          { key: 'details', label: 'Details', flexible: true },
        ]}
        renderActions={(row) => (
          <Actions
            onView={() => openModal('view', row.raw)}
            onEdit={() => openModal('edit', row.raw)}
            onDelete={() => openModal('delete', row.raw)}
          />
        )}
        pagination={
          <CommonPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={territories.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        }
      />

      {/* Modals */}
      <AddAlert
        isOpen={activeModal === 'add'}
        onClose={closeModal}
        title="Add Territory"
        message="Create a new territory"
        fields={{ territoryName: '', description: '' }}
        onSave={handleAddTerritory}
      />

      {selectedTerritory && (
        <>
          <ViewAlert
            isOpen={activeModal === 'view'}
            onClose={closeModal}
            title="Territory Details"
            message="View territory information"
            fields={{
              ID: selectedTerritory.id,
              'Territory Name': selectedTerritory.name,
              Description: selectedTerritory.description,
              'Total Zones': `${selectedTerritory.zones.length} Zones`,
            }}
          />

          <EditAlert
            isOpen={activeModal === 'edit'}
            onClose={closeModal}
            title="Edit Territory"
            message="Update territory information"
            fields={{
              territoryName: selectedTerritory.name,
              description: selectedTerritory.description,
            }}
            onSave={handleSaveEdit}
          />

          <DeleteAlert
            isOpen={activeModal === 'delete'}
            onClose={closeModal}
            title="Delete Territory"
            message={`Are you sure you want to delete "${selectedTerritory.name}"? This will also delete all associated zones and regions.`}
            onConfirm={handleDelete}
          />
        </>
      )}
    </div>
  )
}
