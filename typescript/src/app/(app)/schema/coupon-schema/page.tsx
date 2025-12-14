// @ts-nocheck
'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/app/(app)/basic-master/address-master/common/components/Header.jsx'
import CommonTable from '@/app/(app)/basic-master/address-master/common/components/Table.jsx'
import CommonPagination from '@/app/(app)/basic-master/address-master/common/components/Pagination.jsx'
import Actions from '@/app/(app)/basic-master/address-master/common/components/Actions.jsx'
import {
  DeleteAlert,
  EditAlert,
  ViewAlert,
} from '@/app/(app)/basic-master/address-master/common/components/Alert.jsx'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import {
  CouponProfile,
  initialCouponProfiles,
  couponPatterns,
  customerTypeRequiredOptions,
  customerTypes,
  statusOptions,
} from './data'

const ITEMS_PER_PAGE = 10

export default function CouponProfilePage() {
  const router = useRouter()
  const [profiles, setProfiles] = useState<CouponProfile[]>(initialCouponProfiles)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [selectedProfile, setSelectedProfile] = useState<CouponProfile | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Add form state
  const [form, setForm] = useState({
    couponProfileName: '',
    couponPatternId: '',
    couponLength: '',
    excludingCharacter: '',
    customerTypeRequiredId: '',
    customerTypeId: '',
    statusId: '',
  })

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(profiles.length / ITEMS_PER_PAGE))
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [profiles, currentPage])

  const paginatedProfiles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return profiles.slice(start, start + ITEMS_PER_PAGE)
  }, [profiles, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const openModal = (type: string, payload?: CouponProfile) => {
    setActiveModal(type)
    setSelectedProfile(payload ?? null)
    if (type === 'add') {
      setForm({
        couponProfileName: '',
        couponPatternId: '',
        couponLength: '',
        excludingCharacter: '',
        customerTypeRequiredId: '',
        customerTypeId: '',
        statusId: '',
      })
    }
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedProfile(null)
  }

  const handleAddProfile = () => {
    const pattern = couponPatterns.find((p) => p.id === Number(form.couponPatternId))
    const custTypeReq = customerTypeRequiredOptions.find((c) => c.id === Number(form.customerTypeRequiredId))
    const custType = customerTypes.find((c) => c.id === Number(form.customerTypeId))
    const status = statusOptions.find((s) => s.id === Number(form.statusId))

    if (
      !form.couponProfileName ||
      !pattern ||
      !form.couponLength ||
      !custTypeReq ||
      !status
    ) {
      return
    }

    const newProfile: CouponProfile = {
      id: `CP-${String(profiles.length + 1).padStart(3, '0')}`,
      couponProfileName: form.couponProfileName,
      couponPattern: pattern.name,
      couponLength: Number(form.couponLength),
      excludingCharacter: form.excludingCharacter || '',
      customerTypeRequired: custTypeReq.name,
      customerType: custType?.name || 'N/A',
      status: status.name,
    }

    setProfiles((prev) => [...prev, newProfile])
    closeModal()
  }

  const handleSaveEdit = (editForm: any) => {
    if (!selectedProfile) return

    setProfiles((prev) =>
      prev.map((profile) =>
        profile.id === selectedProfile.id
          ? {
              ...profile,
              couponProfileName: editForm.couponProfileName || profile.couponProfileName,
            }
          : profile
      )
    )
  }

  const handleDelete = () => {
    if (!selectedProfile) return
    setProfiles((prev) => prev.filter((profile) => profile.id !== selectedProfile.id))
  }

  const handleGenerateCoupon = (profile: CouponProfile) => {
    router.push(`/schema/coupon-schema/generate-coupon?profileId=${profile.id}&profileName=${encodeURIComponent(profile.couponProfileName)}`)
  }

  const tableRows = paginatedProfiles.map((profile) => ({
    id: profile.id,
    couponProfileName: profile.couponProfileName,
    couponPattern: profile.couponPattern,
    couponLength: profile.couponLength,
    excludingCharacter: profile.excludingCharacter || 'None',
    customerTypeRequired: profile.customerTypeRequired,
    customerType: profile.customerType,
    status: profile.status,
    activity: (
      <Button
        color="dark/zinc"
        onClick={() => handleGenerateCoupon(profile)}
      >
        Generate Coupon
      </Button>
    ),
    raw: profile,
  }))

  const totalPages = Math.max(1, Math.ceil(profiles.length / ITEMS_PER_PAGE))

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* @ts-ignore - Header is a JSX component */}
      <Header
        title="Coupon Profile"
        subtitle="Manage coupon profiles, patterns, and customer type configurations"
        addLabel="Add Coupon Profile"
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
        emptyMessage="No coupon profiles found."
        minWidth="1800px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '90px' },
          { key: 'couponProfileName', label: 'Coupon Profile Name', width: '200px' },
          { key: 'couponPattern', label: 'Coupon Pattern', width: '140px' },
          { key: 'couponLength', label: 'Coupon Length', width: '120px' },
          { key: 'excludingCharacter', label: 'Excluding Character', width: '160px' },
          { key: 'customerTypeRequired', label: 'Customer Type Required', width: '180px' },
          { key: 'customerType', label: 'Customer Type', width: '140px' },
          { key: 'status', label: 'Status', width: '110px' },
          { key: 'activity', label: 'Activity', width: '160px' },
        ]}
        renderActions={(row: any) => (
          <Actions
            onView={() => openModal('view', row.raw)}
            onEdit={() => openModal('edit', row.raw)}
            onDelete={() => openModal('delete', row.raw)}
          />
        )}
        pagination={
          <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        }
      />

      {/* Add Coupon Profile Alert */}
      <Alert open={activeModal === 'add'} onClose={closeModal} size="2xl">
        <AlertTitle>Add Coupon Profile</AlertTitle>
        <AlertDescription>Fill in the coupon profile details below</AlertDescription>

        <AlertBody>
          <div className="max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Coupon Profile Name */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Coupon Profile Name
                </label>
                <Input
                  type="text"
                  value={form.couponProfileName}
                  onChange={(e) => setForm({ ...form, couponProfileName: e.target.value })}
                  placeholder="Enter profile name..."
                />
              </div>

              {/* Coupon Pattern Dropdown */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Coupon Pattern
                </label>
                <select
                  value={form.couponPatternId}
                  onChange={(e) => setForm({ ...form, couponPatternId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800"
                >
                  <option value="">Select Coupon Pattern</option>
                  {couponPatterns.map((pattern) => (
                    <option key={pattern.id} value={pattern.id}>
                      {pattern.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Coupon Length */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Coupon Length
                </label>
                <Input
                  type="number"
                  value={form.couponLength}
                  onChange={(e) => setForm({ ...form, couponLength: e.target.value })}
                  placeholder="Enter coupon length..."
                  min="1"
                />
              </div>

              {/* Excluding Character */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Excluding Character
                </label>
                <Input
                  type="text"
                  value={form.excludingCharacter}
                  onChange={(e) => setForm({ ...form, excludingCharacter: e.target.value })}
                  placeholder="e.g., O0I1..."
                />
              </div>

              {/* Customer Type Required Dropdown */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Customer Type Required
                </label>
                <select
                  value={form.customerTypeRequiredId}
                  onChange={(e) => setForm({ ...form, customerTypeRequiredId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800"
                >
                  <option value="">Select Option</option>
                  {customerTypeRequiredOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Customer Type Dropdown */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Customer Type
                </label>
                <select
                  value={form.customerTypeId}
                  onChange={(e) => setForm({ ...form, customerTypeId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800"
                  disabled={form.customerTypeRequiredId !== '1'}
                >
                  <option value="">Select Customer Type</option>
                  {customerTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Dropdown */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Status</label>
                <select
                  value={form.statusId}
                  onChange={(e) => setForm({ ...form, statusId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800"
                >
                  <option value="">Select Status</option>
                  {statusOptions.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </AlertBody>

        <AlertActions>
          <Button plain onClick={closeModal}>
            Cancel
          </Button>
          <Button
            color="dark/zinc"
            onClick={handleAddProfile}
            disabled={
              !form.couponProfileName ||
              !form.couponPatternId ||
              !form.couponLength ||
              !form.customerTypeRequiredId ||
              !form.statusId
            }
          >
            Add Coupon Profile
          </Button>
        </AlertActions>
      </Alert>

      {selectedProfile && (
        <>
          <ViewAlert
            isOpen={activeModal === 'view'}
            onClose={closeModal}
            title="Coupon Profile Details"
            message="View the details of the selected coupon profile"
            fields={{
              ID: selectedProfile.id,
              'Coupon Profile Name': selectedProfile.couponProfileName,
              'Coupon Pattern': selectedProfile.couponPattern,
              'Coupon Length': selectedProfile.couponLength,
              'Excluding Character': selectedProfile.excludingCharacter || 'None',
              'Customer Type Required': selectedProfile.customerTypeRequired,
              'Customer Type': selectedProfile.customerType,
              Status: selectedProfile.status,
            }}
          />

          <EditAlert
            isOpen={activeModal === 'edit'}
            onClose={closeModal}
            title="Edit Coupon Profile"
            message="Update the coupon profile name"
            fields={{
              couponProfileName: selectedProfile.couponProfileName,
            }}
            onSave={handleSaveEdit}
          />

          <DeleteAlert
            isOpen={activeModal === 'delete'}
            onClose={closeModal}
            title="Delete Coupon Profile?"
            message={`Do you really want to delete the coupon profile "${selectedProfile.couponProfileName}"?`}
            onConfirm={handleDelete}
          />
        </>
      )}
    </div>
  )
}
