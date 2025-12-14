// @ts-nocheck
'use client'

import { useEffect, useMemo, useState } from 'react'
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
import { initialRedemptionSettings, customerTypes, statusOptions } from './data'

const ITEMS_PER_PAGE = 10

export default function RedemptionSettingPage() {
  const [settings, setSettings] = useState(initialRedemptionSettings)
  const [activeModal, setActiveModal] = useState(null)
  const [selectedSetting, setSelectedSetting] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Add form state
  const [form, setForm] = useState({
    redemptionTitle: '',
    customerTypeId: '',
    windowStartDate: '',
    windowEndDate: '',
    minimumBlockPoint: '',
    maxRedeemPercent: '',
    pointConversion: '',
    rewardType: '',
    calculationStartDate: '',
    calculationEndDate: '',
    statusId: '',
  })

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(settings.length / ITEMS_PER_PAGE))
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [settings, currentPage])

  const paginatedSettings = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return settings.slice(start, start + ITEMS_PER_PAGE)
  }, [settings, currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const openModal = (type, payload) => {
    setActiveModal(type)
    setSelectedSetting(payload ?? null)
    if (type === 'add') {
      setForm({
        redemptionTitle: '',
        customerTypeId: '',
        windowStartDate: '',
        windowEndDate: '',
        minimumBlockPoint: '',
        maxRedeemPercent: '',
        pointConversion: '',
        rewardType: '',
        calculationStartDate: '',
        calculationEndDate: '',
        statusId: '',
      })
    }
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedSetting(null)
  }

  const handleAddSetting = () => {
    const customerType = customerTypes.find((c) => c.id === Number(form.customerTypeId))
    const status = statusOptions.find((s) => s.id === Number(form.statusId))

    if (
      !form.redemptionTitle ||
      !customerType ||
      !form.windowStartDate ||
      !form.windowEndDate ||
      !form.minimumBlockPoint ||
      !form.maxRedeemPercent ||
      !form.pointConversion ||
      !form.calculationStartDate ||
      !form.calculationEndDate ||
      !status
    ) {
      return
    }

    const newSetting = {
      id: `RS-${String(settings.length + 1).padStart(3, '0')}`,
      redemptionTitle: form.redemptionTitle,
      customerType: customerType.name,
      windowStartDate: form.windowStartDate,
      windowEndDate: form.windowEndDate,
      minimumBlockPoint: Number(form.minimumBlockPoint),
      maxRedeemPercent: Number(form.maxRedeemPercent),
      pointConversion: Number(form.pointConversion),
      calculationStartDate: form.calculationStartDate,
      calculationEndDate: form.calculationEndDate,
      status: status.name,
    }

    setSettings((prev) => [...prev, newSetting])
    closeModal()
  }

  const handleSaveEdit = (editForm) => {
    if (!selectedSetting) return

    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === selectedSetting.id
          ? {
              ...setting,
              redemptionTitle: editForm.redemptionTitle || setting.redemptionTitle,
              minimumBlockPoint: editForm.minimumBlockPoint
                ? Number(editForm.minimumBlockPoint)
                : setting.minimumBlockPoint,
              maxRedeemPercent: editForm.maxRedeemPercent
                ? Number(editForm.maxRedeemPercent)
                : setting.maxRedeemPercent,
            }
          : setting
      )
    )
  }

  const handleDelete = () => {
    if (!selectedSetting) return
    setSettings((prev) => prev.filter((setting) => setting.id !== selectedSetting.id))
  }

  const tableRows = paginatedSettings.map((setting) => ({
    id: setting.id,
    redemptionTitle: setting.redemptionTitle,
    customerType: setting.customerType,
    windowStartDate: setting.windowStartDate,
    windowEndDate: setting.windowEndDate,
    minimumBlockPoint: setting.minimumBlockPoint,
    maxRedeemPercent: `${setting.maxRedeemPercent}%`,
    pointConversion: setting.pointConversion,
    calculationStartDate: setting.calculationStartDate,
    calculationEndDate: setting.calculationEndDate,
    status: setting.status,
    raw: setting,
  }))

  const totalPages = Math.max(1, Math.ceil(settings.length / ITEMS_PER_PAGE))

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      <Header
        title="Redemption Setting"
        subtitle="Manage redemption settings, customer types, and point conversion rules"
        addLabel="Add Redemption Setting"
        onAdd={() => openModal('add')}
        dropdownOptions={[
          { label: 'Import from Excel' },
          { label: 'Export to Excel' },
          { label: 'Download Format' },
        ]}
      />

      <CommonTable
        data={tableRows}
        emptyMessage="No redemption settings found."
        minWidth="2400px"
        stickyColumns={true}
        actionColumnWidth="150px"
        columns={[
          { key: 'id', label: 'ID', width: '120px' },
          { key: 'redemptionTitle', label: 'Redemption Title', width: '220px' },
          { key: 'customerType', label: 'Customer Type', width: '160px' },
          { key: 'windowStartDate', label: 'Window Start Date', width: '160px' },
          { key: 'windowEndDate', label: 'Window End Date', width: '160px' },
          { key: 'minimumBlockPoint', label: 'Minimum Block Point', width: '180px' },
          { key: 'maxRedeemPercent', label: 'Max Redeem Percent', width: '180px' },
          { key: 'pointConversion', label: 'Point Conversion', width: '160px' },
          { key: 'calculationStartDate', label: 'Calculation Start Date', width: '200px' },
          { key: 'calculationEndDate', label: 'Calculation End Date', width: '190px' },
          { key: 'status', label: 'Status', width: '120px' },
        ]}
        renderActions={(row) => (
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

      {/* Add Redemption Setting Alert */}
      <Alert open={activeModal === 'add'} onClose={closeModal} size="2xl">
        <AlertTitle>Add Redemption Setting</AlertTitle>
        <AlertDescription>Fill in the redemption setting details below</AlertDescription>

        <AlertBody>
          <div className="max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Redemption Title */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Redemption Title
                </label>
                <Input
                  type="text"
                  value={form.redemptionTitle}
                  onChange={(e) => setForm({ ...form, redemptionTitle: e.target.value })}
                  placeholder="Enter redemption title..."
                />
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
                >
                  <option value="">Select Customer Type</option>
                  {customerTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Window Start Date */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Window Start Date
                </label>
                <Input
                  type="date"
                  value={form.windowStartDate}
                  onChange={(e) => setForm({ ...form, windowStartDate: e.target.value })}
                />
              </div>

              {/* Window End Date */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Window End Date
                </label>
                <Input
                  type="date"
                  value={form.windowEndDate}
                  onChange={(e) => setForm({ ...form, windowEndDate: e.target.value })}
                />
              </div>

              {/* Minimum Block Point */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Minimum Block Point
                </label>
                <Input
                  type="number"
                  value={form.minimumBlockPoint}
                  onChange={(e) => setForm({ ...form, minimumBlockPoint: e.target.value })}
                  placeholder="Enter minimum block point..."
                  min="0"
                />
              </div>

              {/* Max Redeem Percent */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Max Redeem Percent
                </label>
                <Input
                  type="number"
                  value={form.maxRedeemPercent}
                  onChange={(e) => setForm({ ...form, maxRedeemPercent: e.target.value })}
                  placeholder="Enter max redeem percent..."
                  min="0"
                  max="100"
                />
              </div>

              {/* Point Conversion */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Point Conversion
                </label>
                <Input
                  type="number"
                  value={form.pointConversion}
                  onChange={(e) => setForm({ ...form, pointConversion: e.target.value })}
                  placeholder="Enter point conversion..."
                  min="0"
                />
              </div>

              {/* Reward Type */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Reward Type
                </label>
                <Input
                  type="text"
                  value={form.rewardType}
                  onChange={(e) => setForm({ ...form, rewardType: e.target.value })}
                  placeholder="Enter reward type..."
                />
              </div>

              {/* Calculation Start Date */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Calculation Start Date
                </label>
                <Input
                  type="date"
                  value={form.calculationStartDate}
                  onChange={(e) => setForm({ ...form, calculationStartDate: e.target.value })}
                />
              </div>

              {/* Calculation End Date */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Calculation End Date
                </label>
                <Input
                  type="date"
                  value={form.calculationEndDate}
                  onChange={(e) => setForm({ ...form, calculationEndDate: e.target.value })}
                />
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
            onClick={handleAddSetting}
            disabled={
              !form.redemptionTitle ||
              !form.customerTypeId ||
              !form.windowStartDate ||
              !form.windowEndDate ||
              !form.minimumBlockPoint ||
              !form.maxRedeemPercent ||
              !form.pointConversion ||
              !form.calculationStartDate ||
              !form.calculationEndDate ||
              !form.statusId
            }
          >
            Add Redemption Setting
          </Button>
        </AlertActions>
      </Alert>

      {selectedSetting && (
        <>
          <ViewAlert
            isOpen={activeModal === 'view'}
            onClose={closeModal}
            title="Redemption Setting Details"
            message="View the details of the selected redemption setting"
            fields={{
              ID: selectedSetting.id,
              'Redemption Title': selectedSetting.redemptionTitle,
              'Customer Type': selectedSetting.customerType,
              'Window Start Date': selectedSetting.windowStartDate,
              'Window End Date': selectedSetting.windowEndDate,
              'Minimum Block Point': selectedSetting.minimumBlockPoint,
              'Max Redeem Percent': `${selectedSetting.maxRedeemPercent}%`,
              'Point Conversion': selectedSetting.pointConversion,
              'Calculation Start Date': selectedSetting.calculationStartDate,
              'Calculation End Date': selectedSetting.calculationEndDate,
              Status: selectedSetting.status,
            }}
          />

          <EditAlert
            isOpen={activeModal === 'edit'}
            onClose={closeModal}
            title="Edit Redemption Setting"
            message="Update the redemption setting details"
            fields={{
              redemptionTitle: selectedSetting.redemptionTitle,
              minimumBlockPoint: selectedSetting.minimumBlockPoint,
              maxRedeemPercent: selectedSetting.maxRedeemPercent,
            }}
            onSave={handleSaveEdit}
          />

          <DeleteAlert
            isOpen={activeModal === 'delete'}
            onClose={closeModal}
            title="Delete Redemption Setting?"
            message={`Do you really want to delete the redemption setting "${selectedSetting.redemptionTitle}"?`}
            onConfirm={handleDelete}
          />
        </>
      )}
    </div>
  )
}
