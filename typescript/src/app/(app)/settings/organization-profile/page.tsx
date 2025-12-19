'use client'

import { useState } from 'react'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Badge } from '@/components/badge'
import Actions from '../../basic-master/address-master/common/components/Actions.jsx'
import CommonPagination from '../../basic-master/address-master/common/components/Pagination.jsx'

// ============================================================================
// INITIAL DATA
// ============================================================================
const ITEMS_PER_PAGE = 10

type Organization = {
  id: number
  name: string
  gstin: string
  state: string
  code: string
  status: 'Active' | 'Inactive'
  contactName: string
  contactPhone: string
  contactEmail: string
  billingAddress: string
  billingAddress2: string
  billingCity: string
  billingState: string
  pan: string
  bankDetail: string
  username: string
  email: string
  activatedOn: string
}

const initialOrganizations: Organization[] = [
  {
    id: 1,
    name: 'S.R & COMPANY',
    gstin: '08AHSPL0930D2ZE',
    state: 'Rajasthan',
    code: 'CUST000768',
    status: 'Active',
    contactName: 'Naresh Jain',
    contactPhone: '9855051698',
    contactEmail: 'nareshjain2003@gmail.com',
    billingAddress: 'Club chownk, malerkotla',
    billingAddress2: 'Near multani dhaba sangrur',
    billingCity: 'Sangrur',
    billingState: 'Punjab',
    pan: 'AAXFS9730L',
    bankDetail: 'HDFC Bank, A/C: 50200012345678',
    username: '9855051698',
    email: 'nareshjain2003@gmail.com',
    activatedOn: '2025-11-13 15:28:55',
  },
  {
    id: 2,
    name: 'India Lube',
    gstin: '10AGBPK2990C1Z0',
    state: 'Bihar',
    code: 'CUST000766',
    status: 'Active',
    contactName: 'Rajesh Kumar',
    contactPhone: '9876543210',
    contactEmail: 'rajesh@indialube.com',
    billingAddress: 'Industrial Area, Phase 2',
    billingAddress2: 'Near Railway Station',
    billingCity: 'Patna',
    billingState: 'Bihar',
    pan: 'AGBPK2990C',
    bankDetail: 'SBI Bank, A/C: 30200098765432',
    username: '9876543210',
    email: 'rajesh@indialube.com',
    activatedOn: '2025-10-20 10:15:30',
  },
  {
    id: 3,
    name: 'Goel Sons',
    gstin: '36AAPPG4447A1ZW',
    state: 'Telangana',
    code: 'CUST000765',
    status: 'Active',
    contactName: 'Amit Goel',
    contactPhone: '9123456789',
    contactEmail: 'amit@goelsons.com',
    billingAddress: 'MG Road, Sector 5',
    billingAddress2: 'Opposite City Mall',
    billingCity: 'Hyderabad',
    billingState: 'Telangana',
    pan: 'AAPPG4447A',
    bankDetail: 'ICICI Bank, A/C: 40300087654321',
    username: '9123456789',
    email: 'amit@goelsons.com',
    activatedOn: '2025-09-15 14:22:18',
  },
  {
    id: 4,
    name: 'SHYAM AUTOMOBILES',
    gstin: '21AATPA4114E1ZD',
    state: 'Orissa',
    code: 'CUST000764',
    status: 'Active',
    contactName: 'Shyam Prasad',
    contactPhone: '9988776655',
    contactEmail: 'shyam@automobiles.com',
    billingAddress: 'NH-16, Industrial Estate',
    billingAddress2: 'Near Transport Nagar',
    billingCity: 'Bhubaneswar',
    billingState: 'Orissa',
    pan: 'AATPA4114E',
    bankDetail: 'Axis Bank, A/C: 91200067890123',
    username: '9988776655',
    email: 'shyam@automobiles.com',
    activatedOn: '2025-08-05 09:45:12',
  },
  {
    id: 5,
    name: 'Super Auto Sales',
    gstin: '07AAMPK7118B1ZW',
    state: 'Delhi',
    code: 'CUST000763',
    status: 'Active',
    contactName: 'Manish Kapoor',
    contactPhone: '9811223344',
    contactEmail: 'manish@superauto.com',
    billingAddress: 'Connaught Place, Block A',
    billingAddress2: 'Near Metro Station',
    billingCity: 'New Delhi',
    billingState: 'Delhi',
    pan: 'AAMPK7118B',
    bankDetail: 'Punjab National Bank, A/C: 20100056789012',
    username: '9811223344',
    email: 'manish@superauto.com',
    activatedOn: '2025-07-18 11:30:45',
  },
  {
    id: 6,
    name: 'VAISHNAVI AUTO MOBILE',
    gstin: '09CJGPP9393G2ZG',
    state: 'Uttar Pradesh',
    code: 'CUST000761',
    status: 'Active',
    contactName: 'Vishal Sharma',
    contactPhone: '9876512345',
    contactEmail: 'vishal@vaishnavi.com',
    billingAddress: 'Gomti Nagar Extension',
    billingAddress2: 'Near Phoenix Mall',
    billingCity: 'Lucknow',
    billingState: 'Uttar Pradesh',
    pan: 'CJGPP9393G',
    bankDetail: 'Bank of Baroda, A/C: 70200045678901',
    username: '9876512345',
    email: 'vishal@vaishnavi.com',
    activatedOn: '2025-06-10 16:18:33',
  },
]

// ============================================================================
// VIEW ALERT COMPONENT
// ============================================================================

function ViewOrganizationAlert({ isOpen, onClose, organization }: any) {
  if (!organization) return null

  return (
    <Alert open={isOpen} onClose={onClose} size="4xl">
      <AlertTitle>{organization.name}</AlertTitle>
      <AlertDescription>{organization.contactName}</AlertDescription>
      <AlertBody>
        <div className="space-y-6">
          {/* Basic Info Section */}
          <div className="grid grid-cols-3 gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-700">
            <div>
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 block mb-1">Name</span>
              <span className="text-sm text-zinc-900 dark:text-zinc-100">{organization.name}</span>
            </div>
            <div>
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 block mb-1">Code</span>
              <span className="text-sm text-zinc-900 dark:text-zinc-100">{organization.code}</span>
            </div>
            <div>
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 block mb-1">Contact</span>
              <div className="text-sm text-zinc-900 dark:text-zinc-100">
                <div>{organization.contactName}</div>
                <div className="text-zinc-600 dark:text-zinc-400">{organization.contactPhone}</div>
                <div className="text-zinc-600 dark:text-zinc-400">{organization.contactEmail}</div>
              </div>
            </div>
          </div>

          {/* Address & Details Section */}
          <div className="grid grid-cols-2 gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-700">
            <div>
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 block mb-2">Billing Address</span>
              <div className="text-sm text-zinc-900 dark:text-zinc-100 space-y-1">
                <div>{organization.billingAddress}</div>
                <div>{organization.billingAddress2}</div>
                <div>{organization.billingCity}, {organization.billingState}</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 block mb-1">GSTIN</span>
                <span className="text-sm text-zinc-900 dark:text-zinc-100">{organization.gstin}</span>
              </div>
              <div>
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 block mb-1">PAN</span>
                <span className="text-sm text-zinc-900 dark:text-zinc-100">{organization.pan}</span>
              </div>
              <div>
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 block mb-1">Bank Detail</span>
                <span className="text-sm text-zinc-900 dark:text-zinc-100">{organization.bankDetail}</span>
              </div>
            </div>
          </div>

          {/* User Information Section */}
          <div>
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block mb-3">User Information</span>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <th className="text-left py-2 px-3 font-medium text-zinc-700 dark:text-zinc-300">Username</th>
                    <th className="text-left py-2 px-3 font-medium text-zinc-700 dark:text-zinc-300">Email</th>
                    <th className="text-left py-2 px-3 font-medium text-zinc-700 dark:text-zinc-300">Activated On</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="py-2 px-3 text-zinc-900 dark:text-zinc-100">{organization.username}</td>
                    <td className="py-2 px-3 text-zinc-900 dark:text-zinc-100">{organization.email}</td>
                    <td className="py-2 px-3 text-zinc-900 dark:text-zinc-100">{organization.activatedOn}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
// DELETE ALERT COMPONENT
// ============================================================================

function DeleteOrganizationAlert({ isOpen, onClose, onConfirm }: any) {
  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Deactivate Organization</AlertTitle>
      <AlertDescription>
        Are you sure you want to deactivate this organization? This will mark the organization as inactive.
      </AlertDescription>
      <AlertActions>
        <Button plain onClick={onClose}>
          Cancel
        </Button>
        <Button color="red" onClick={onConfirm}>
          Deactivate
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function OrganizationProfilePage() {
  const [organizations, setOrganizations] = useState(initialOrganizations)
  const [currentPage, setCurrentPage] = useState(1)

  // View Alert
  const [isViewAlertOpen, setIsViewAlertOpen] = useState(false)
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null)

  // Delete Alert
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)
  const [organizationToDelete, setOrganizationToDelete] = useState<Organization | null>(null)

  const totalPages = Math.max(1, Math.ceil(organizations.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentOrganizations = organizations.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleView = (organization: Organization) => {
    setSelectedOrganization(organization)
    setIsViewAlertOpen(true)
  }

  const handleDeleteClick = (organization: Organization) => {
    setOrganizationToDelete(organization)
    setIsDeleteAlertOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (organizationToDelete) {
      setOrganizations((prev) =>
        prev.map((org) =>
          org.id === organizationToDelete.id ? { ...org, status: 'Inactive' as const } : org
        )
      )
      setIsDeleteAlertOpen(false)
      setOrganizationToDelete(null)
    }
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Organisation List</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage your organizations and view details
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Table Header - Fixed */}
        <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
          <div className="w-[80px] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">S.No</div>
          <div className="flex-1 min-w-[200px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Name</div>
          <div className="w-[180px] text-sm font-medium text-zinc-500 dark:text-zinc-400">GSTIN</div>
          <div className="w-[150px] text-sm font-medium text-zinc-500 dark:text-zinc-400">State</div>
          <div className="w-[150px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Code</div>
          <div className="w-[120px] text-sm font-medium text-zinc-500 dark:text-zinc-400">Status</div>
          <div className="w-[100px] pr-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">Actions</div>
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
              No organizations found.
            </div>
          ) : (
            currentOrganizations.map((organization, index) => (
              <div
                key={organization.id}
                className="flex items-center border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 h-14"
              >
                <div className="w-[80px] pl-6 text-sm text-zinc-600 dark:text-zinc-400">
                  {startIndex + index + 1}
                </div>
                <div className="flex-1 min-w-[200px] text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {organization.name}
                </div>
                <div className="w-[180px] text-sm text-zinc-600 dark:text-zinc-400">
                  {organization.gstin}
                </div>
                <div className="w-[150px] text-sm text-zinc-600 dark:text-zinc-400">
                  {organization.state}
                </div>
                <div className="w-[150px] text-sm text-zinc-600 dark:text-zinc-400">
                  {organization.code}
                </div>
                <div className="w-[120px] text-sm">
                  <Badge color={organization.status === 'Active' ? 'green' : 'red'}>
                    {organization.status}
                  </Badge>
                </div>
                <div className="w-[100px] pr-6">
                  <Actions
                    onView={() => handleView(organization)}
                    onDelete={() => handleDeleteClick(organization)}
                    hideEdit={true}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Footer */}
        <CommonPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

      {/* View Alert */}
      <ViewOrganizationAlert
        isOpen={isViewAlertOpen}
        onClose={() => setIsViewAlertOpen(false)}
        organization={selectedOrganization}
      />

      {/* Delete Alert */}
      <DeleteOrganizationAlert
        isOpen={isDeleteAlertOpen}
        onClose={() => setIsDeleteAlertOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
