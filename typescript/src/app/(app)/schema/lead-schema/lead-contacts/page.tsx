// @ts-nocheck
'use client'

import { useState } from 'react'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import CommonPagination from '@/app/(app)/basic-master/address-master/common/components/Pagination.jsx'
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/dropdown'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/16/solid'
import { LeadContact, initialContacts, contactTypeOptions } from './data'

const ITEMS_PER_PAGE = 10

export default function LeadContactsPage() {
  const [contacts, setContacts] = useState<LeadContact[]>(initialContacts)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Add Contact Form State
  const [addForm, setAddForm] = useState({
    personName: '',
    mobileNumber: '',
    emailAddress: '',
    designation: '',
    contactType: '',
  })

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(contacts.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentContacts = contacts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleAddContactClick = () => {
    setActiveModal('add')
    setAddForm({
      personName: '',
      mobileNumber: '',
      emailAddress: '',
      designation: '',
      contactType: '',
    })
  }

  const closeModal = () => {
    setActiveModal(null)
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

  // Handle Add Contact Submit
  const handleAddContactSubmit = () => {
    if (!addForm.personName || !addForm.mobileNumber || !addForm.contactType) {
      alert('Please fill all required fields')
      return
    }

    const contactTypeOption = contactTypeOptions.find((ct) => ct.id === addForm.contactType)

    const newContact: LeadContact = {
      id: `LC${Date.now()}`,
      personName: addForm.personName,
      mobileNumber: addForm.mobileNumber,
      emailAddress: addForm.emailAddress,
      designation: addForm.designation,
      contactType: contactTypeOption?.name || '',
    }

    setContacts([newContact, ...contacts])
    closeModal()
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header - Sticky */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Lead Contacts</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage all lead contacts in the system
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
            <Button color="dark/zinc" onClick={handleAddContactClick}>
              <PlusIcon />
              Add Lead Contact
            </Button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Table Header - Fixed */}
        <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
          <div className="w-[10%] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</div>
          <div className="w-[20%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Person Name</div>
          <div className="w-[18%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Mobile Number</div>
          <div className="w-[22%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Email Address</div>
          <div className="w-[15%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Designation</div>
          <div className="w-[15%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Contact Type</div>
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
          {contacts.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
              No contacts found.
            </div>
          ) : (
            currentContacts.map((contact, index) => (
              <div
                key={contact.id}
                className={`flex items-center py-[1.1rem] border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                  index === currentContacts.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <div className="w-[10%] pl-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">
                  {contact.id}
                </div>
                <div className="w-[20%] text-sm font-medium text-zinc-950 dark:text-white">
                  {contact.personName}
                </div>
                <div className="w-[18%] text-sm text-zinc-600 dark:text-zinc-400">
                  {contact.mobileNumber}
                </div>
                <div className="w-[22%] text-sm text-zinc-600 dark:text-zinc-400">
                  {contact.emailAddress}
                </div>
                <div className="w-[15%] text-sm text-zinc-600 dark:text-zinc-400">
                  {contact.designation}
                </div>
                <div className="w-[15%] text-sm text-zinc-600 dark:text-zinc-400">
                  {contact.contactType}
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

      {/* Add Contact Modal */}
      {activeModal === 'add' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-3xl">
            <div className="p-6 border-b border-zinc-950/10 dark:border-white/10">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                Create Lead Contact
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Person Name*
                  </label>
                  <Input
                    type="text"
                    value={addForm.personName}
                    onChange={(e) => setAddForm({ ...addForm, personName: e.target.value })}
                    placeholder="Enter person name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Mobile Number*
                  </label>
                  <Input
                    type="tel"
                    value={addForm.mobileNumber}
                    onChange={(e) => setAddForm({ ...addForm, mobileNumber: e.target.value })}
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={addForm.emailAddress}
                    onChange={(e) => setAddForm({ ...addForm, emailAddress: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Designation
                  </label>
                  <Input
                    type="text"
                    value={addForm.designation}
                    onChange={(e) => setAddForm({ ...addForm, designation: e.target.value })}
                    placeholder="Enter designation"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Contact Type*
                </label>
                <Select
                  value={addForm.contactType}
                  onChange={(e) => setAddForm({ ...addForm, contactType: e.target.value })}
                >
                  <option value="">Please select</option>
                  {contactTypeOptions.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="p-6 border-t border-zinc-950/10 dark:border-white/10 flex justify-end gap-3">
              <Button plain onClick={closeModal}>
                Cancel
              </Button>
              <Button color="dark/zinc" onClick={handleAddContactSubmit}>
                Add Contact
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
