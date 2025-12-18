'use client'

import { useState, useEffect } from 'react'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Badge } from '@/components/badge'
import Actions from '../../basic-master/address-master/common/components/Actions.jsx'
import CommonPagination from '../../basic-master/address-master/common/components/Pagination.jsx'
import { PlusIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/dropdown'

// ============================================================================
// INITIAL DATA
// ============================================================================

const ITEMS_PER_PAGE = 10

const initialOrganizations = [
  {
    id: 1,
    name: 'S.R & COMPANY',
    code: 'CUST000768',
    gstin: '08AHSPL0930D2ZE',
    state: 'Rajasthan',
    status: 'Active',
    contactPerson: 'Rajesh Sharma',
    mobile: '9855051698',
    email: 'sr.company@example.com',
    billingAddress: 'Near Bus Stand, Jaipur',
    billingAddress2: 'Malviya Nagar',
    cityState: 'Jaipur, Rajasthan',
    pan: 'AHSPL0930D',
    bankDetails: 'HDFC Bank - 12345678901234',
    username: '9855051698',
    activatedOn: '2025-11-13 15:28:55',
  },
  {
    id: 2,
    name: 'India Lube',
    code: 'CUST000766',
    gstin: '10AGBPK2990C1Z0',
    state: 'Bihar',
    status: 'Active',
    contactPerson: 'Amit Kumar',
    mobile: '9876543210',
    email: 'indialube@example.com',
    billingAddress: 'Main Road, Patna',
    billingAddress2: 'Near Railway Station',
    cityState: 'Patna, Bihar',
    pan: 'AGBPK2990C',
    bankDetails: 'SBI - 98765432109876',
    username: '9876543210',
    activatedOn: '2025-10-15 10:20:30',
  },
  {
    id: 3,
    name: 'Goel Sons',
    code: 'CUST000765',
    gstin: '36AAPPG4447A1ZW',
    state: 'Telangana',
    status: 'Active',
    contactPerson: 'Rakesh Goel',
    mobile: '9123456789',
    email: 'goelsons@example.com',
    billingAddress: 'Banjara Hills, Hyderabad',
    billingAddress2: 'Road No 12',
    cityState: 'Hyderabad, Telangana',
    pan: 'AAPPG4447A',
    bankDetails: 'ICICI Bank - 11223344556677',
    username: '9123456789',
    activatedOn: '2025-09-20 14:45:22',
  },
  {
    id: 4,
    name: 'SHYAM AUTOMOBILES',
    code: 'CUST000764',
    gstin: '21AATPA4114E1ZD',
    state: 'Orissa',
    status: 'Active',
    contactPerson: 'Shyam Prasad',
    mobile: '9234567890',
    email: 'shyamauto@example.com',
    billingAddress: 'Cuttack Road, Bhubaneswar',
    billingAddress2: 'Sector 5',
    cityState: 'Bhubaneswar, Orissa',
    pan: 'AATPA4114E',
    bankDetails: 'PNB - 55667788990011',
    username: '9234567890',
    activatedOn: '2025-08-10 09:15:40',
  },
  {
    id: 5,
    name: 'Super Auto Sales',
    code: 'CUST000763',
    gstin: '07AAMPK7118B1ZW',
    state: 'Delhi',
    status: 'Active',
    contactPerson: 'Vijay Malhotra',
    mobile: '9345678901',
    email: 'superauto@example.com',
    billingAddress: 'Connaught Place',
    billingAddress2: 'Block B',
    cityState: 'New Delhi, Delhi',
    pan: 'AAMPK7118B',
    bankDetails: 'Axis Bank - 22334455667788',
    username: '9345678901',
    activatedOn: '2025-07-05 11:30:15',
  },
  {
    id: 6,
    name: 'VAISHNAVI AUTO MOBILE',
    code: 'CUST000761',
    gstin: '09CJGPP9393G2ZG',
    state: 'Uttar Pradesh',
    status: 'Active',
    contactPerson: 'Priya Sharma',
    mobile: '9456789012',
    email: 'vaishnaviauto@example.com',
    billingAddress: 'Gomti Nagar, Lucknow',
    billingAddress2: 'Extension Area',
    cityState: 'Lucknow, Uttar Pradesh',
    pan: 'CJGPP9393G',
    bankDetails: 'Kotak Bank - 99887766554433',
    username: '9456789012',
    activatedOn: '2025-06-25 16:50:05',
  },
]

// ============================================================================
// CUSTOM ICONS
// ============================================================================

function DeleteIcon({ className }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <polyline points="3,6 5,6 21,6"></polyline>
      <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"></path>
    </svg>
  )
}

// ============================================================================
// VIEW ORGANIZATION MODAL
// ============================================================================

function ViewOrganizationAlert({ isOpen, onClose, organization, onDelete }) {
  if (!organization) return null

  return (
    <Alert open={isOpen} onClose={onClose} size="5xl">
      <div className="space-y-6">
        {/* Header with name and contact person */}
        <div className="border-b border-zinc-200 dark:border-zinc-700 pb-4">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">{organization.name}</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{organization.contactPerson}</p>
        </div>

        {/* Main Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Basic Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">Organization Details</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Name</p>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">{organization.name}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Code</p>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">{organization.code}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">Contact</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Contact Person</p>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">{organization.contactPerson}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Phone</p>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">{organization.mobile}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Email</p>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white break-all">{organization.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Address & Tax */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">Billing Address</h3>
              <div className="text-sm text-zinc-700 dark:text-zinc-300">
                <p>{organization.billingAddress}</p>
                <p>{organization.billingAddress2}</p>
                <p className="mt-1">{organization.cityState}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">GSTIN</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{organization.gstin}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">PAN</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{organization.pan}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Bank & User Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">Bank Detail</h3>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">{organization.bankDetails}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">User Information</h3>
              <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
                <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                  <thead className="bg-zinc-50 dark:bg-zinc-800">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">Username</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">Email</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">Activated On</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-700">
                    <tr>
                      <td className="px-3 py-2 text-xs text-zinc-900 dark:text-white">{organization.username}</td>
                      <td className="px-3 py-2 text-xs text-zinc-900 dark:text-white break-all">{organization.email}</td>
                      <td className="px-3 py-2 text-xs text-zinc-900 dark:text-white whitespace-nowrap">{organization.activatedOn}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-700 pt-4">
          <Button 
            color="red" 
            onClick={() => {
              if (window.confirm(`Are you sure you want to deactivate ${organization.name}?`)) {
                onDelete(organization.id)
                onClose()
              }
            }}
          >
            Mark as Inactive
          </Button>
          <Button color="dark/zinc" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Alert>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function OrganizationProfilesPage() {
  const [organizations, setOrganizations] = useState(initialOrganizations)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [activeModal, setActiveModal] = useState(null)
  const [selectedOrganization, setSelectedOrganization] = useState(null)

  // Filter organizations based on search
  const filteredOrganizations = organizations.filter((org) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      org.name.toLowerCase().includes(searchLower) ||
      org.code.toLowerCase().includes(searchLower) ||
      org.gstin.toLowerCase().includes(searchLower) ||
      org.state.toLowerCase().includes(searchLower) ||
      org.contactPerson.toLowerCase().includes(searchLower)
    )
  })

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredOrganizations.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentOrganizations = filteredOrganizations.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page) => setCurrentPage(page)

  const handleView = (org) => {
    setSelectedOrganization(org)
    setActiveModal('view')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedOrganization(null)
  }

  const handleDelete = (id) => {
    setOrganizations((prev) => prev.map((org) => (org.id === id ? { ...org, status: 'Inactive' } : org)))
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header - Sticky */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Organisation List</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage all organization profiles in the system
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4 max-w-md">
          <label htmlFor="search" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Search Organisation
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-zinc-400" />
            </div>
            <Input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Search by name, code, GSTIN, or state..."
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Table Header - Fixed */}
        <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
          <div className="w-[30%] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">Organisation Name</div>
          <div className="w-[20%] text-sm font-medium text-zinc-500 dark:text-zinc-400">GSTIN</div>
          <div className="w-[15%] text-sm font-medium text-zinc-500 dark:text-zinc-400">State</div>
          <div className="w-[15%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Code</div>
          <div className="w-[10%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Status</div>
          <div className="w-[10%] text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Actions</div>
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
          {currentOrganizations.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
              {searchTerm ? 'No organizations found matching your search.' : 'No organizations found.'}
            </div>
          ) : (
            currentOrganizations.map((org, index) => (
              <div
                key={org.id}
                className={`flex items-center py-[1.1rem] border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                  index === currentOrganizations.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <div className="w-[30%] pl-6">
                  <div className="text-sm font-medium text-zinc-950 dark:text-white">{org.name}</div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{org.gstin}</div>
                </div>
                <div className="w-[20%] text-sm text-zinc-700 dark:text-zinc-300"></div>
                <div className="w-[15%] text-sm text-zinc-700 dark:text-zinc-300">{org.state}</div>
                <div className="w-[15%] text-sm text-zinc-700 dark:text-zinc-300">{org.code}</div>
                <div className="w-[10%]">
                  <Badge color={org.status === 'Active' ? 'lime' : 'zinc'}>{org.status}</Badge>
                </div>
                <div className="w-[160px] px-4 flex items-center justify-center">
                  <Actions
                    onView={() => handleView(org)}
                    onEdit={() => {}}
                    onDelete={() => {}}
                    hideEdit
                    hideDelete
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Footer */}
        <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

      {/* View Organization Modal */}
      <ViewOrganizationAlert
        isOpen={activeModal === 'view'}
        onClose={closeModal}
        organization={selectedOrganization}
        onDelete={handleDelete}
      />
    </div>
  )
}
