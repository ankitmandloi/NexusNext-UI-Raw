// @ts-nocheck
'use client'

import { useState } from 'react'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Alert, AlertActions, AlertDescription, AlertTitle } from '@/components/alert'
import CommonPagination from '@/app/(app)/basic-master/address-master/common/components/Pagination.jsx'
import Actions from '@/app/(app)/basic-master/address-master/common/components/Actions.jsx'
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/dropdown'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/16/solid'
import { ActivityType, initialActivityTypes } from './data'

const ITEMS_PER_PAGE = 10

export default function ActivityTypePage() {
  const [activityTypes, setActivityTypes] = useState<ActivityType[]>(initialActivityTypes)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Form state
  const [formData, setFormData] = useState({
    activityType: '',
    status: 'Active',
  })

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(activityTypes.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentActivityTypes = activityTypes.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleView = (activity: ActivityType) => {
    setSelectedActivity(activity)
    setActiveModal('view')
  }

  const handleEdit = (activity: ActivityType) => {
    setSelectedActivity(activity)
    setFormData({
      activityType: activity.activityType,
      status: activity.status,
    })
    setActiveModal('edit')
  }

  const handleDelete = (activity: ActivityType) => {
    setSelectedActivity(activity)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setFormData({
      activityType: '',
      status: 'Active',
    })
    setActiveModal('add')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedActivity(null)
    setFormData({
      activityType: '',
      status: 'Active',
    })
  }

  const handleImportExcel = () => {
    console.log('Import from Excel clicked')
  }

  const handleExportExcel = () => {
    console.log('Export to Excel clicked')
  }

  const handleDownloadFormat = () => {
    console.log('Download Format clicked')
  }

  // Handle Add Activity
  const handleAddActivity = () => {
    if (!formData.activityType.trim()) {
      alert('Please enter activity type')
      return
    }

    const newActivity: ActivityType = {
      id: `AT${Date.now()}`,
      activityType: formData.activityType,
      status: formData.status as 'Active' | 'Inactive',
    }

    setActivityTypes([newActivity, ...activityTypes])
    closeModal()
  }

  // Handle Save Edit
  const handleSaveEdit = () => {
    if (!formData.activityType.trim()) {
      alert('Please enter activity type')
      return
    }

    setActivityTypes((prev) =>
      prev.map((activity) =>
        activity.id === selectedActivity?.id
          ? {
              ...activity,
              activityType: formData.activityType,
              status: formData.status as 'Active' | 'Inactive',
            }
          : activity
      )
    )
    closeModal()
  }

  // Handle Confirm Delete
  const handleConfirmDelete = () => {
    setActivityTypes((prev) => prev.filter((activity) => activity.id !== selectedActivity?.id))
    closeModal()
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header - Sticky */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Activity Type</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage all activity types in the system
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Dropdown>
              <DropdownButton outline>
                Your Data
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu>
                <DropdownItem onClick={handleImportExcel}>Import from Excel</DropdownItem>
                <DropdownItem onClick={handleExportExcel}>Export to Excel</DropdownItem>
                <DropdownItem onClick={handleDownloadFormat}>Download Format</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button color="dark/zinc" onClick={handleAddClick}>
              <PlusIcon />
              Add Activity Type
            </Button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Table Header - Fixed */}
        <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
          <div className="w-[15%] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</div>
          <div className="w-[50%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Activity Type</div>
          <div className="w-[15%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Status</div>
          <div className="w-[20%] text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">
            Actions
          </div>
        </div>

        {/* Scrollable Table Body */}
        <div
          className="flex-1 overflow-y-auto
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar]:h-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-zinc-300
          [&::-webkit-scrollbar-thumb]:rounded-full
          dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
        >
          {activityTypes.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
              No activity types found.
            </div>
          ) : (
            currentActivityTypes.map((activity, index) => (
              <div
                key={activity.id}
                className={`flex items-center py-[1.1rem] border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                  index === currentActivityTypes.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <div className="w-[15%] pl-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">
                  {activity.id}
                </div>
                <div className="w-[50%] text-sm font-medium text-zinc-950 dark:text-white">
                  {activity.activityType}
                </div>
                <div className="w-[15%] text-sm">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                      activity.status === 'Active'
                        ? 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                        : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>
                <div className="w-[160px] px-4 flex items-center justify-center">
                  <Actions
                    onView={() => handleView(activity)}
                    onEdit={() => handleEdit(activity)}
                    onDelete={() => handleDelete(activity)}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Footer */}
        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Add Activity Type Modal */}
      <Alert open={activeModal === 'add'} onClose={closeModal}>
        <AlertTitle>Add Activity Type</AlertTitle>
        <AlertDescription>Create a new activity type for lead management</AlertDescription>

        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Activity Type*
            </label>
            <Input
              type="text"
              value={formData.activityType}
              onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}
              placeholder="Enter activity type"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Status*
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="Active"
                  checked={formData.status === 'Active'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-4 h-4 text-zinc-900 border-zinc-300 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-zinc-600"
                />
                <span className="text-sm text-zinc-900 dark:text-zinc-100">Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="Inactive"
                  checked={formData.status === 'Inactive'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-4 h-4 text-zinc-900 border-zinc-300 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-zinc-600"
                />
                <span className="text-sm text-zinc-900 dark:text-zinc-100">Inactive</span>
              </label>
            </div>
          </div>
        </div>

        <AlertActions>
          <Button plain onClick={closeModal}>
            Cancel
          </Button>
          <Button color="dark/zinc" onClick={handleAddActivity}>
            Add Activity Type
          </Button>
        </AlertActions>
      </Alert>

      {/* View Activity Type Modal */}
      <Alert open={activeModal === 'view'} onClose={closeModal}>
        <AlertTitle>View Activity Type</AlertTitle>
        <AlertDescription>Activity type details</AlertDescription>

        {selectedActivity && (
          <div className="mt-4 space-y-3">
            <div>
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">ID</div>
              <div className="text-sm text-zinc-900 dark:text-zinc-100">{selectedActivity.id}</div>
            </div>
            <div>
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                Activity Type
              </div>
              <div className="text-sm text-zinc-900 dark:text-zinc-100">
                {selectedActivity.activityType}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Status</div>
              <span
                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                  selectedActivity.status === 'Active'
                    ? 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400'
                    : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                }`}
              >
                {selectedActivity.status}
              </span>
            </div>
          </div>
        )}

        <AlertActions>
          <Button color="dark/zinc" onClick={closeModal}>
            Close
          </Button>
        </AlertActions>
      </Alert>

      {/* Edit Activity Type Modal */}
      <Alert open={activeModal === 'edit'} onClose={closeModal}>
        <AlertTitle>Edit Activity Type</AlertTitle>
        <AlertDescription>
          Update the details for {selectedActivity?.activityType}
        </AlertDescription>

        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Activity Type*
            </label>
            <Input
              type="text"
              value={formData.activityType}
              onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}
              placeholder="Enter activity type"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Status*
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="Active"
                  checked={formData.status === 'Active'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-4 h-4 text-zinc-900 border-zinc-300 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-zinc-600"
                />
                <span className="text-sm text-zinc-900 dark:text-zinc-100">Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="Inactive"
                  checked={formData.status === 'Inactive'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-4 h-4 text-zinc-900 border-zinc-300 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:ring-zinc-600"
                />
                <span className="text-sm text-zinc-900 dark:text-zinc-100">Inactive</span>
              </label>
            </div>
          </div>
        </div>

        <AlertActions>
          <Button plain onClick={closeModal}>
            Cancel
          </Button>
          <Button color="dark/zinc" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </AlertActions>
      </Alert>

      {/* Delete Activity Type Modal */}
      <Alert open={activeModal === 'delete'} onClose={closeModal}>
        <AlertTitle>Delete Activity Type</AlertTitle>
        <AlertDescription>
          Are you sure you want to delete{' '}
          <strong className="text-zinc-900 dark:text-white">
            {selectedActivity?.activityType}
          </strong>
          ? This action cannot be undone.
        </AlertDescription>

        <AlertActions>
          <Button plain onClick={closeModal}>
            Cancel
          </Button>
          <Button color="red" onClick={handleConfirmDelete}>
            Yes, Delete
          </Button>
        </AlertActions>
      </Alert>
    </div>
  )
}
