// @ts-nocheck
'use client'

import { use, useEffect, useMemo, useState } from 'react'
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
import { Region, STATUS_OPTIONS, slugifyLabel } from '../../../../data'
import { useTerritoryContext } from '../../../../TerritoryContext'

const ITEMS_PER_PAGE = 10

type ModalState = 'add' | 'view' | 'edit' | 'delete' | null

type RegionForm = {
  regionName: string
  code: string
  description: string
  status: string
}

type PageProps = {
  params: Promise<{
    territorySlug: string
    zoneSlug: string
  }>
}

export default function RegionListPage({ params }: PageProps) {
  const { territorySlug, zoneSlug } = use(params)
  const { territories, updateTerritories } = useTerritoryContext()
  const territory = territories.find((territory) => territory.slug === territorySlug)
  const zone = territory?.zones.find((zone) => zone.slug === zoneSlug)

  const [regions, setRegions] = useState<Region[]>(() => zone?.regions ?? [])
  const [activeModal, setActiveModal] = useState<ModalState>(null)
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(regions.length / ITEMS_PER_PAGE))
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [regions, currentPage])

  useEffect(() => {
    if (!zone) return
    setRegions(zone.regions)
  }, [zone])

  const paginatedRegions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return regions.slice(start, start + ITEMS_PER_PAGE)
  }, [regions, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const openModal = (type: ModalState, payload?: Region) => {
    setActiveModal(type)
    setSelectedRegion(payload ?? null)
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedRegion(null)
  }

  const handleAddRegion = (form: RegionForm) => {
    if (!zone || !territory) return

    const label = form.regionName.trim()
    if (!label) return

    const newRegion: Region = {
      id: `RGN-${Date.now()}`,
      name: label,
      slug: slugifyLabel(label),
      code: form.code || 'NA',
      description: form.description || 'No description added yet.',
      status: form.status || 'Active',
    }

    const updatedRegions = [...regions, newRegion]
    setRegions(updatedRegions)
    
    // Update territory context
    const updatedTerritories = territories.map((t) =>
      t.id === territory.id
        ? {
            ...t,
            zones: t.zones.map((z) =>
              z.id === zone.id ? { ...z, regions: updatedRegions } : z
            ),
          }
        : t
    )
    updateTerritories(updatedTerritories)
  }

  const handleSaveEdit = (form: RegionForm) => {
    if (!selectedRegion || !zone || !territory) return

    const updatedRegions = regions.map((region) =>
      region.id === selectedRegion.id
        ? {
            ...region,
            name: form.regionName || region.name,
            slug: slugifyLabel(form.regionName || region.name),
            code: form.code || region.code,
            description: form.description || region.description,
            status: form.status || region.status,
          }
        : region
    )
    setRegions(updatedRegions)
    
    // Update territory context
    const updatedTerritories = territories.map((t) =>
      t.id === territory.id
        ? {
            ...t,
            zones: t.zones.map((z) =>
              z.id === zone.id ? { ...z, regions: updatedRegions } : z
            ),
          }
        : t
    )
    updateTerritories(updatedTerritories)
  }

  const handleDelete = () => {
    if (!selectedRegion || !zone || !territory) return
    
    const updatedRegions = regions.filter((region) => region.id !== selectedRegion.id)
    setRegions(updatedRegions)
    
    // Update territory context
    const updatedTerritories = territories.map((t) =>
      t.id === territory.id
        ? {
            ...t,
            zones: t.zones.map((z) =>
              z.id === zone.id ? { ...z, regions: updatedRegions } : z
            ),
          }
        : t
    )
    updateTerritories(updatedTerritories)
  }

  const tableRows = paginatedRegions.map((region) => ({
    id: region.id,
    zone: zone?.name ?? '—',
    regionName: region.name,
    status: region.status,
    raw: region,
  }))

  if (!territory) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-red-500">
        Territory not found.
      </div>
    )
  }

  if (!zone) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-red-500">
        Zone not found.
      </div>
    )
  }

  const totalPages = Math.max(1, Math.ceil(regions.length / ITEMS_PER_PAGE))

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* @ts-ignore - Header is a JSX component */}
      <Header
        title={
          <>
            Filter &nbsp;
            <span className="text-zinc-600 dark:text-zinc-300">{zone.name} Regions</span>
          </>
        }
        subtitle={`Manage regions under ${zone.name} (${territory.name})`}
        addLabel="Add Region"
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
        emptyMessage="No regions found. Use 'Add Region' to create one."
        minWidth="810px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '100px' },
          { key: 'zone', label: 'Zone', flexible: true },
          { key: 'regionName', label: 'Region Name', flexible: true },
          { key: 'status', label: 'Status', flexible: true },
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
            totalItems={regions.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        }
      />

      {/* Modals */}
      <AddAlert
        isOpen={activeModal === 'add'}
        onClose={closeModal}
        title="Add Region"
        message="Create a new region"
        fields={{ regionName: '', code: '', description: '', status: 'Active' }}
        dropdowns={{ status: STATUS_OPTIONS }}
        onSave={handleAddRegion}
      />

      {selectedRegion && (
        <>
          <ViewAlert
            isOpen={activeModal === 'view'}
            onClose={closeModal}
            title="Region Details"
            message="View region information"
            fields={{
              ID: selectedRegion.id,
              Territory: territory.name,
              Zone: zone.name,
              'Region Name': selectedRegion.name,
              Code: selectedRegion.code,
              Description: selectedRegion.description,
              Status: selectedRegion.status,
            }}
          />

          <EditAlert
            isOpen={activeModal === 'edit'}
            onClose={closeModal}
            title="Edit Region"
            message="Update region information"
            fields={{
              regionName: selectedRegion.name,
              code: selectedRegion.code,
              description: selectedRegion.description,
              status: selectedRegion.status,
            }}
            dropdowns={{ status: STATUS_OPTIONS }}
            onSave={handleSaveEdit}
          />

          <DeleteAlert
            isOpen={activeModal === 'delete'}
            onClose={closeModal}
            title="Delete Region"
            message={`Are you sure you want to delete "${selectedRegion.name}"?`}
            onConfirm={handleDelete}
          />
        </>
      )}
    </div>
  )
}
