// @ts-nocheck
'use client'

import { use, useEffect, useMemo, useState } from 'react'
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
import { Zone, slugifyLabel } from '../../data'
import { useTerritoryContext } from '../../TerritoryContext'

const ITEMS_PER_PAGE = 10

type ModalState = 'add' | 'view' | 'edit' | 'delete' | null

type ZoneForm = {
  zoneName: string
  code: string
  description: string
}

type PageProps = {
  params: Promise<{
    territorySlug: string
  }>
}

export default function ZoneListPage({ params }: PageProps) {
  const { territorySlug } = use(params)
  const { territories, updateTerritories } = useTerritoryContext()
  const territory = territories.find((territory) => territory.slug === territorySlug)

  const [zones, setZones] = useState<Zone[]>(() => territory?.zones ?? [])
  const [activeModal, setActiveModal] = useState<ModalState>(null)
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(zones.length / ITEMS_PER_PAGE))
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [zones, currentPage])

  useEffect(() => {
    if (!territory) return
    setZones(territory.zones)
  }, [territory])

  const paginatedZones = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return zones.slice(start, start + ITEMS_PER_PAGE)
  }, [zones, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const openModal = (type: ModalState, payload?: Zone) => {
    setActiveModal(type)
    setSelectedZone(payload ?? null)
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedZone(null)
  }

  const handleAddZone = (form: ZoneForm) => {
    if (!territory) return

    const label = form.zoneName.trim()
    if (!label) return

    const newZone: Zone = {
      id: `ZN-${Date.now()}`,
      name: label,
      slug: slugifyLabel(label),
      code: form.code || 'NA',
      description: form.description || 'No description added yet.',
      regions: [],
    }

    const updatedZones = [...zones, newZone]
    setZones(updatedZones)
    
    // Update territory context
    const updatedTerritories = territories.map((t) =>
      t.id === territory.id ? { ...t, zones: updatedZones } : t
    )
    updateTerritories(updatedTerritories)
  }

  const handleSaveEdit = (form: ZoneForm) => {
    if (!selectedZone || !territory) return

    const updatedZones = zones.map((zone) =>
      zone.id === selectedZone.id
        ? {
            ...zone,
            name: form.zoneName || zone.name,
            slug: slugifyLabel(form.zoneName || zone.name),
            code: form.code || zone.code,
            description: form.description || zone.description,
          }
        : zone
    )
    setZones(updatedZones)
    
    // Update territory context
    const updatedTerritories = territories.map((t) =>
      t.id === territory.id ? { ...t, zones: updatedZones } : t
    )
    updateTerritories(updatedTerritories)
  }

  const handleDelete = () => {
    if (!selectedZone || !territory) return
    
    const updatedZones = zones.filter((zone) => zone.id !== selectedZone.id)
    setZones(updatedZones)
    
    // Update territory context
    const updatedTerritories = territories.map((t) =>
      t.id === territory.id ? { ...t, zones: updatedZones } : t
    )
    updateTerritories(updatedTerritories)
  }

  const tableRows = paginatedZones.map((zone) => ({
    id: zone.id,
    territory: territory?.name ?? '—',
    zoneName: zone.name,
    details: (
      <Button
        href={`/basic-master/address-master/territory-zones-regions/${territorySlug}/zone-list/${zone.slug}/region-list`}
        color="zinc"
        className="text-xs px-2 py-1 h-7 flex items-center justify-center"
      >
        Region
      </Button>
    ),
    raw: zone,
  }))

  if (!territory) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-red-500">
        Territory not found.
      </div>
    )
  }

  const totalPages = Math.max(1, Math.ceil(zones.length / ITEMS_PER_PAGE))

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* @ts-ignore - Header is a JSX component */}
      <Header
        title={
          <>
            Filter &nbsp;
            <span className="text-zinc-600 dark:text-zinc-300">{territory.name} Zones</span>
          </>
        }
        subtitle={`Manage zones under ${territory.name}`}
        addLabel="Add Zone"
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
        emptyMessage="No zones found. Use 'Add Zone' to create one."
        minWidth="810px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '100px' },
          { key: 'territory', label: 'Territory', flexible: true },
          { key: 'zoneName', label: 'Zone Name', flexible: true },
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
            totalItems={zones.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        }
      />

      {/* Modals */}
      <AddAlert
        isOpen={activeModal === 'add'}
        onClose={closeModal}
        title="Add Zone"
        message="Create a new zone"
        fields={{ zoneName: '', code: '', description: '' }}
        onSave={handleAddZone}
      />

      {selectedZone && (
        <>
          <ViewAlert
            isOpen={activeModal === 'view'}
            onClose={closeModal}
            title="Zone Details"
            message="View zone information"
            fields={{
              ID: selectedZone.id,
              Territory: territory.name,
              'Zone Name': selectedZone.name,
              Code: selectedZone.code,
              Description: selectedZone.description,
              'Total Regions': `${selectedZone.regions.length} Regions`,
            }}
          />

          <EditAlert
            isOpen={activeModal === 'edit'}
            onClose={closeModal}
            title="Edit Zone"
            message="Update zone information"
            fields={{
              zoneName: selectedZone.name,
              code: selectedZone.code,
              description: selectedZone.description,
            }}
            onSave={handleSaveEdit}
          />

          <DeleteAlert
            isOpen={activeModal === 'delete'}
            onClose={closeModal}
            title="Delete Zone"
            message={`Are you sure you want to delete "${selectedZone.name}"? This will also delete all associated regions.`}
            onConfirm={handleDelete}
          />
        </>
      )}
    </div>
  )
}
