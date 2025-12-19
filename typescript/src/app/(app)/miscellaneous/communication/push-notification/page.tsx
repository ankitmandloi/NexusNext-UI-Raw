'use client'

import { useState, useEffect } from 'react'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Textarea } from '@/components/textarea'
import Actions from '../../../basic-master/address-master/common/components/Actions.jsx'
import CommonPagination from '../../../basic-master/address-master/common/components/Pagination.jsx'
import { PlusIcon } from '@heroicons/react/16/solid'

// ============================================================================
// INITIAL DATA
// ============================================================================
const ITEMS_PER_PAGE = 10

type PushNotification = {
  id: number
  type: string
  pageType: string
  title: string
  description: string
  image: string
  dateTime: string
  url: string
  userType: string
  customerType: string
  status: string
}

const initialPushNotifications: PushNotification[] = [
  {
    id: 1,
    type: 'All',
    pageType: '1',
    title: 'Test1',
    description: 'sdvsvs',
    image: '',
    dateTime: '2023-07-13 22:44:25',
    url: '',
    userType: 'Customer',
    customerType: 'Mechanic',
    status: 'Delivered',
  },
  {
    id: 2,
    type: 'All',
    pageType: '1',
    title: 'test',
    description: 'test1',
    image: '',
    dateTime: '2023-07-14 16:12:43',
    url: '',
    userType: 'Customer',
    customerType: 'Mechanic',
    status: 'Send Instant',
  },
  {
    id: 3,
    type: 'All',
    pageType: '1',
    title: 'test',
    description: 'test1',
    image: '',
    dateTime: '2023-07-14 16:12:43',
    url: '',
    userType: 'Customer',
    customerType: 'Mechanic',
    status: 'Delivered',
  },
]

const userTypeOptions = ['Customer', 'Employee']
const notificationModeOptions = ['Send Instant', 'Send Later']
const backlinkAppPageOptions = ['Home', 'Scan', 'Rewards', 'Profile', 'Redemption', 'Catalogue']
const notificationFilterOptions = [
  'All Active User',
  'All Not Active User',
  'All General KYC Received',
  'All General KYC Not Received',
  'All',
]
const customerTypeOptions = ['Retailer', 'Distributor', 'Mechanic', 'Plant', 'Prospect Distributor', 'Fleet owner']
const zoneOptions = ['North', 'East', 'West', 'South', 'Madhya Pradesh']
const regionOptions = [
  'Indore',
  'Agar Malwa',
  'Panna',
  'Alirajpur',
  'Ratlam-1',
  'Satna',
  'Chhindwara',
  'Morena',
  'Betul',
  'Barwani',
  'Anuppur',
  'Guna',
  'Ashok Nagar',
  'Sehore',
  'Bhind',
  'Hoshangabad',
  'Chhatarpur',
  'Shivpuri',
  'Raisen',
  'Ujjain',
  'Dhar',
  'Katni',
  'Dewas',
  'Balaghat',
  'Tikamgarh',
  'Sagar',
  'Umriya',
  'Seoni',
  'Sheopur',
  'Khargone',
  'Damoh',
  'Shahdol',
  'Bhopal',
  'Datia',
  'Mandsaur-1',
  'Gwalior',
  'Rajgarh',
  'Mandla',
  'Burhanpur',
  'Singrauli',
  'Sidhi',
  'Harda',
  'Dindori',
  'Narsimhapur',
  'Vidisha',
  'Shajapur',
  'Rewa',
  'Khandwa',
  'Jabalpur',
  'Neemuch',
  'Jhabua',
  'Mandsaur-2',
  'Ratlam-2',
]
const statusOptions = ['Send Instant', 'Send Later', 'Delivered', 'Failed']

// ============================================================================
// VIEW ALERT COMPONENT
// ============================================================================

function ViewNotificationAlert({ isOpen, onClose, notification }: any) {
  if (!notification) return null

  return (
    <Alert open={isOpen} onClose={onClose} size="3xl">
      <AlertTitle>Push Notification Details</AlertTitle>
      <AlertDescription>View the complete details of the selected push notification below.</AlertDescription>
      <AlertBody>
        <div className="space-y-3 max-w-4xl">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">ID</span>
              <span className="text-zinc-600 dark:text-zinc-400">{notification.id}</span>
            </div>
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Type</span>
              <span className="text-zinc-600 dark:text-zinc-400">{notification.type}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Title</span>
              <span className="text-zinc-600 dark:text-zinc-400">{notification.title}</span>
            </div>
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Page Type</span>
              <span className="text-zinc-600 dark:text-zinc-400">{notification.pageType}</span>
            </div>
          </div>

          <div>
            <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Description</span>
            <span className="text-zinc-600 dark:text-zinc-400">{notification.description}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Date Time</span>
              <span className="text-zinc-600 dark:text-zinc-400">{notification.dateTime}</span>
            </div>
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Status</span>
              <span
                className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                  notification.status === 'Delivered'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : notification.status === 'Failed'
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                }`}
              >
                {notification.status}
              </span>
            </div>
          </div>

          {notification.url && (
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">URL</span>
              <a
                href={notification.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {notification.url}
              </a>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">User Type</span>
              <span className="text-zinc-600 dark:text-zinc-400">{notification.userType}</span>
            </div>
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Customer Type</span>
              <span className="text-zinc-600 dark:text-zinc-400">{notification.customerType}</span>
            </div>
          </div>

          {notification.image && (
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Image</span>
              <span className="text-zinc-600 dark:text-zinc-400">{notification.image}</span>
            </div>
          )}
        </div>
      </AlertBody>
      <AlertActions>
        <Button color="dark/zinc" onClick={onClose}>
          Close
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// EDIT ALERT COMPONENT
// ============================================================================

function EditNotificationAlert({ isOpen, onClose, notification, onSave }: any) {
  const [formData, setFormData] = useState({
    userType: 'Customer',
    notificationMode: 'Send Instant',
    backlinkAppPage: 'Home',
    notificationFilter: 'All',
    dateTime: '',
    url: '',
    customerType: 'Mechanic',
    zone: '',
    region: '',
    title: '',
    description: '',
    image: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (notification && isOpen) {
      setFormData({
        userType: notification.userType,
        notificationMode: notification.status,
        backlinkAppPage: 'Home',
        notificationFilter: 'All',
        dateTime: notification.dateTime,
        url: notification.url,
        customerType: notification.customerType,
        zone: '',
        region: '',
        title: notification.title,
        description: notification.description,
        image: notification.image,
      })
    }
  }, [notification, isOpen])

  const handleSave = async () => {
    if (!notification || !formData.title.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      const updatedNotification = {
        type: 'All',
        pageType: '1',
        title: formData.title,
        description: formData.description,
        image: formData.image,
        dateTime: formData.dateTime || new Date().toISOString().slice(0, 19).replace('T', ' '),
        url: formData.url,
        userType: formData.userType,
        customerType: formData.customerType,
        status: formData.notificationMode,
      }
      onSave(notification.id, updatedNotification)
      setIsSubmitting(false)
      onClose()
    }, 300)
  }

  const handleCancel = () => {
    onClose()
  }

  if (!notification) return null

  return (
    <Alert open={isOpen} onClose={handleCancel} size="3xl">
      <AlertTitle>Edit Push Notification</AlertTitle>
      <AlertDescription>Update the push notification information below.</AlertDescription>
      <AlertBody>
        <div className="space-y-4 max-w-4xl max-h-[60vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="editUserType" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                User Type
              </label>
              <Select
                id="editUserType"
                value={formData.userType}
                onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
              >
                {userTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="editNotificationMode"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Notification Mode (Sent)
              </label>
              <Select
                id="editNotificationMode"
                value={formData.notificationMode}
                onChange={(e) => setFormData({ ...formData, notificationMode: e.target.value })}
              >
                {notificationModeOptions.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="editBacklinkAppPage"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Backlink App Page
              </label>
              <Select
                id="editBacklinkAppPage"
                value={formData.backlinkAppPage}
                onChange={(e) => setFormData({ ...formData, backlinkAppPage: e.target.value })}
              >
                {backlinkAppPageOptions.map((page) => (
                  <option key={page} value={page}>
                    {page}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="editNotificationFilter"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Notification Filter
              </label>
              <Select
                id="editNotificationFilter"
                value={formData.notificationFilter}
                onChange={(e) => setFormData({ ...formData, notificationFilter: e.target.value })}
              >
                {notificationFilterOptions.map((filter) => (
                  <option key={filter} value={filter}>
                    {filter}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="editDateTime" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Date Time
            </label>
            <Input
              id="editDateTime"
              type="datetime-local"
              value={formData.dateTime}
              onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="editUrl" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Attached URL
            </label>
            <Input
              id="editUrl"
              type="text"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="Enter URL"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="editCustomerType" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Customer Type
            </label>
            <Select
              id="editCustomerType"
              value={formData.customerType}
              onChange={(e) => setFormData({ ...formData, customerType: e.target.value })}
            >
              {customerTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="editZone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Zone
              </label>
              <Select
                id="editZone"
                value={formData.zone}
                onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
              >
                <option value="">Please select</option>
                {zoneOptions.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="editRegion" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Region
              </label>
              <Select
                id="editRegion"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              >
                <option value="">Please select</option>
                {regionOptions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="editTitle" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Title
            </label>
            <Input
              id="editTitle"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter title"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="editDescription" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Description
            </label>
            <Textarea
              id="editDescription"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter description"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="editImage" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Image
            </label>
            <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-6 text-center">
              <Input
                id="editImage"
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Drop files here to upload"
              />
            </div>
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button color="dark/zinc" onClick={handleSave} disabled={!formData.title.trim() || isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// ADD NOTIFICATION ALERT COMPONENT
// ============================================================================

function AddNotificationAlert({ isOpen, onClose, onAdd }: any) {
  const [formData, setFormData] = useState({
    userType: 'Customer',
    notificationMode: 'Send Instant',
    backlinkAppPage: 'Home',
    notificationFilter: 'All',
    dateTime: '',
    url: '',
    customerType: 'Mechanic',
    zone: '',
    region: '',
    title: '',
    description: '',
    image: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        userType: 'Customer',
        notificationMode: 'Send Instant',
        backlinkAppPage: 'Home',
        notificationFilter: 'All',
        dateTime: '',
        url: '',
        customerType: 'Mechanic',
        zone: '',
        region: '',
        title: '',
        description: '',
        image: '',
      })
    }
  }, [isOpen])

  const handleAdd = async () => {
    if (!formData.title.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      const newNotification = {
        type: 'All',
        pageType: '1',
        title: formData.title,
        description: formData.description,
        image: formData.image,
        dateTime: formData.dateTime || new Date().toISOString().slice(0, 19).replace('T', ' '),
        url: formData.url,
        userType: formData.userType,
        customerType: formData.customerType,
        status: formData.notificationMode,
      }
      onAdd(newNotification)
      setIsSubmitting(false)
      onClose()
    }, 300)
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <Alert open={isOpen} onClose={handleCancel} size="3xl">
      <AlertTitle>Add Push Notification</AlertTitle>
      <AlertDescription>Fill in the details to create a new push notification.</AlertDescription>
      <AlertBody>
        <div className="space-y-4 max-w-4xl max-h-[60vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="newUserType" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                User Type
              </label>
              <Select
                id="newUserType"
                value={formData.userType}
                onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
              >
                {userTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="newNotificationMode"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Notification Mode (Sent)
              </label>
              <Select
                id="newNotificationMode"
                value={formData.notificationMode}
                onChange={(e) => setFormData({ ...formData, notificationMode: e.target.value })}
              >
                <option value="">Please select</option>
                {notificationModeOptions.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="newBacklinkAppPage"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Backlink App Page
              </label>
              <Select
                id="newBacklinkAppPage"
                value={formData.backlinkAppPage}
                onChange={(e) => setFormData({ ...formData, backlinkAppPage: e.target.value })}
              >
                {backlinkAppPageOptions.map((page) => (
                  <option key={page} value={page}>
                    {page}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="newNotificationFilter"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Notification Filter
              </label>
              <Select
                id="newNotificationFilter"
                value={formData.notificationFilter}
                onChange={(e) => setFormData({ ...formData, notificationFilter: e.target.value })}
              >
                {notificationFilterOptions.map((filter) => (
                  <option key={filter} value={filter}>
                    {filter}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="newDateTime" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Date Time
            </label>
            <Input
              id="newDateTime"
              type="datetime-local"
              value={formData.dateTime}
              onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="newUrl" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Attached URL
            </label>
            <Input
              id="newUrl"
              type="text"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="Enter URL"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="newCustomerType" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Customer Type
            </label>
            <Select
              id="newCustomerType"
              value={formData.customerType}
              onChange={(e) => setFormData({ ...formData, customerType: e.target.value })}
            >
              {customerTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="newZone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Zone
              </label>
              <Select
                id="newZone"
                value={formData.zone}
                onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
              >
                <option value="">Please select</option>
                {zoneOptions.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="newRegion" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Region
              </label>
              <Select
                id="newRegion"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              >
                <option value="">Please select</option>
                {regionOptions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="newTitle" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Title
            </label>
            <Input
              id="newTitle"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter title"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="newDescription" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Description
            </label>
            <Textarea
              id="newDescription"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter description"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="newImage" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Image
            </label>
            <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-6 text-center">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">Drop files here to upload</p>
              <Input
                id="newImage"
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Or enter image URL"
              />
            </div>
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button color="dark/zinc" onClick={handleAdd} disabled={!formData.title.trim() || isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// DELETE ALERT COMPONENT
// ============================================================================

function DeleteNotificationAlert({ isOpen, onClose, notification, onConfirm }: any) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!notification) return

    setIsDeleting(true)
    setTimeout(() => {
      onConfirm(notification.id)
      setIsDeleting(false)
      onClose()
    }, 300)
  }

  if (!notification) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Are you sure you want to delete this push notification?</AlertTitle>
      <AlertDescription>
        You are about to delete <strong className="text-zinc-900 dark:text-white">{notification.title}</strong>. This
        action cannot be undone.
      </AlertDescription>
      <AlertActions>
        <Button plain onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button color="red" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Yes, Delete'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function PushNotificationPage() {
  const [notifications, setNotifications] = useState(initialPushNotifications)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [selectedNotification, setSelectedNotification] = useState<PushNotification | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(notifications.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentNotifications = notifications.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleView = (notification: PushNotification) => {
    setSelectedNotification(notification)
    setActiveModal('view')
  }

  const handleEdit = (notification: PushNotification) => {
    setSelectedNotification(notification)
    setActiveModal('edit')
  }

  const handleDelete = (notification: PushNotification) => {
    setSelectedNotification(notification)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setActiveModal('add')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedNotification(null)
  }

  const handleAddNotification = (formData: any) => {
    const newId = notifications.length > 0 ? Math.max(...notifications.map((n) => n.id)) + 1 : 1
    const newNotification: PushNotification = { id: newId, ...formData }
    setNotifications((prevNotifications) => [...prevNotifications, newNotification])
  }

  const handleSaveEdit = (id: number, formData: any) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => (notification.id === id ? { ...notification, ...formData } : notification))
    )
  }

  const handleConfirmDelete = (id: number) => {
    setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id))
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Push Notification</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage all push notifications in the system
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button color="dark/zinc" onClick={handleAddClick}>
              <PlusIcon />
              Add Push Notification
            </Button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Table Header - Fixed */}
        <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
          <div className="w-[60px] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</div>
          <div className="w-[80px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Type</div>
          <div className="w-[100px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Page Type</div>
          <div className="w-[150px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Title</div>
          <div className="w-[200px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Description</div>
          <div className="w-[100px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Image</div>
          <div className="w-[180px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Date Time</div>
          <div className="w-[100px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Url</div>
          <div className="w-[120px] text-sm font-medium text-zinc-500 dark:text-zinc-400">User Type</div>
          <div className="w-[140px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Customer Type</div>
          <div className="w-[130px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Status</div>
          <div className="w-[160px] text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Actions</div>
        </div>

        {/* Scrollable Table Body */}
        <div
          className="flex-1 overflow-y-auto overflow-x-auto
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar]:h-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-zinc-300
          [&::-webkit-scrollbar-thumb]:rounded-full
          dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
        >
          {notifications.length === 0 ? (
                <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
                  No push notifications found. Click "Add Push Notification" to create one.
                </div>
              ) : (
                currentNotifications.map((notification, index) => (
                  <div
                    key={notification.id}
                    className={`flex items-center py-[1.1rem] border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                      index === currentNotifications.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <div className="w-[60px] pl-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">
                      {notification.id}
                    </div>
                    <div className="w-[80px] text-sm text-zinc-600 dark:text-zinc-300">{notification.type}</div>
                    <div className="w-[100px] text-sm text-zinc-600 dark:text-zinc-300">{notification.pageType}</div>
                    <div className="w-[150px] text-sm font-medium text-zinc-950 dark:text-white truncate pr-4">
                      {notification.title}
                    </div>
                    <div className="w-[200px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                      {notification.description}
                    </div>
                    <div className="w-[100px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                      {notification.image || '-'}
                    </div>
                    <div className="w-[180px] text-sm text-zinc-600 dark:text-zinc-300">{notification.dateTime}</div>
                    <div className="w-[100px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                      {notification.url ? (
                        <a
                          href={notification.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Link
                        </a>
                      ) : (
                        '-'
                      )}
                    </div>
                    <div className="w-[120px] text-sm text-zinc-600 dark:text-zinc-300">{notification.userType}</div>
                    <div className="w-[140px] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                      {notification.customerType}
                    </div>
                    <div className="w-[130px] text-sm">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                          notification.status === 'Delivered'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : notification.status === 'Failed'
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}
                      >
                        {notification.status}
                      </span>
                    </div>
                    <div className="w-[160px] px-4 flex items-center justify-center">
                      <Actions
                        onView={() => handleView(notification)}
                        onEdit={() => handleEdit(notification)}
                        onDelete={() => handleDelete(notification)}
                      />
                    </div>
                  </div>
                ))
              )}
        </div>

        {/* Pagination Footer */}
        <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

      {/* ALERT MODALS */}
      <AddNotificationAlert isOpen={activeModal === 'add'} onClose={closeModal} onAdd={handleAddNotification} />

      <ViewNotificationAlert isOpen={activeModal === 'view'} onClose={closeModal} notification={selectedNotification} />

      <EditNotificationAlert
        isOpen={activeModal === 'edit'}
        onClose={closeModal}
        notification={selectedNotification}
        onSave={handleSaveEdit}
      />

      <DeleteNotificationAlert
        isOpen={activeModal === 'delete'}
        onClose={closeModal}
        notification={selectedNotification}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
