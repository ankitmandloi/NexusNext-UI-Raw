// @ts-nocheck
'use client'

import { useState } from 'react'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Badge } from '@/components/badge'
import { Select } from '@/components/select'
import { Input } from '@/components/input'
import { Textarea } from '@/components/textarea'
import { Combobox, ComboboxOption } from '@/components/combobox'
import CommonPagination from '@/app/(app)/basic-master/address-master/common/components/Pagination.jsx'
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/dropdown'
import { ChevronDownIcon, PlusIcon, TrashIcon } from '@heroicons/react/16/solid'
import {
  Lead,
  LeadContact,
  initialLeads,
  leadSourceOptions,
  leadScopeOptions,
  leadTypeOptions,
  leadPriorityOptions,
  leadStatusOptions,
  contactTypeOptions,
  availablePartners,
  availableEmployees,
} from './data'

const ITEMS_PER_PAGE = 10

export default function LeadManagerPage() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Add Lead Form State
  const [addForm, setAddForm] = useState({
    leadDate: '',
    leadSource: '',
    leadScope: '',
    leadType: '1',
    leadPriority: '1',
    leadTitle: '',
    leadDescription: '',
    leadAddress: '',
    leadEstimate: '',
    estimatedDeliveryDate: '',
    nextFollowupDate: '',
    leadPartnerAssigned: [],
    contacts: [],
    attachment: null,
  })

  // Add Contact Form State
  const [contactForm, setContactForm] = useState({
    personName: '',
    mobileNumber: '',
    emailAddress: '',
    designation: '',
    contactType: '',
  })

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(leads.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentLeads = leads.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleAddLeadClick = () => {
    setActiveModal('add')
    setAddForm({
      leadDate: '',
      leadSource: '',
      leadScope: '',
      leadType: '1',
      leadPriority: '1',
      leadTitle: '',
      leadDescription: '',
      leadAddress: '',
      leadEstimate: '',
      estimatedDeliveryDate: '',
      nextFollowupDate: '',
      leadPartnerAssigned: [],
      contacts: [],
      attachment: null,
    })
  }

  const handleAddContactClick = () => {
    setActiveModal('addContact')
    setContactForm({
      personName: '',
      mobileNumber: '',
      emailAddress: '',
      designation: '',
      contactType: '',
    })
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedLead(null)
  }

  const handleStatusChange = (leadId: string, newStatusId: string) => {
    const newStatus = leadStatusOptions.find((s) => s.id === newStatusId)
    if (!newStatus) return

    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, leadStatus: newStatus.name } : lead))
    )
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'sky'
      case 'contacted':
        return 'zinc'
      case 'qualified':
        return 'lime'
      case 'negotiation':
        return 'amber'
      case 'won':
        return 'lime'
      case 'lost':
        return 'red'
      default:
        return 'zinc'
    }
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

  // Handle partner selection (multiselect)
  const handlePartnerToggle = (partnerId: string) => {
    const partner = availablePartners.find((p) => p.id === partnerId)
    if (!partner) return

    setAddForm((prev) => {
      const isSelected = prev.leadPartnerAssigned.includes(partner.name)
      return {
        ...prev,
        leadPartnerAssigned: isSelected
          ? prev.leadPartnerAssigned.filter((p) => p !== partner.name)
          : [...prev.leadPartnerAssigned, partner.name],
      }
    })
  }

  // Add contact to lead
  const handleAddContactToLead = () => {
    if (!contactForm.personName || !contactForm.mobileNumber) {
      alert('Please fill all required fields')
      return
    }

    const newContact: LeadContact = {
      id: Date.now().toString(),
      personName: contactForm.personName,
      mobileNumber: contactForm.mobileNumber,
      emailAddress: contactForm.emailAddress,
      designation: contactForm.designation,
      contactType: contactTypeOptions.find((ct) => ct.id === contactForm.contactType)?.name || '',
    }

    setAddForm({
      ...addForm,
      contacts: [...addForm.contacts, newContact],
    })

    setActiveModal('add')
  }

  // Remove contact
  const handleRemoveContact = (id: string) => {
    setAddForm({
      ...addForm,
      contacts: addForm.contacts.filter((contact) => contact.id !== id),
    })
  }

  // Handle Add Lead Submit
  const handleAddLeadSubmit = () => {
    if (!addForm.leadTitle || !addForm.leadDate || !addForm.leadSource) {
      alert('Please fill all required fields')
      return
    }

    const sourceOption = leadSourceOptions.find((s) => s.id === addForm.leadSource)
    const scopeOption = leadScopeOptions.find((s) => s.id === addForm.leadScope)
    const typeOption = leadTypeOptions.find((t) => t.id === addForm.leadType)
    const priorityOption = leadPriorityOptions.find((p) => p.id === addForm.leadPriority)

    const newLead: Lead = {
      id: `L${Date.now()}`,
      leadTitle: addForm.leadTitle,
      leadID: `LEAD-${new Date().getFullYear()}-${String(leads.length + 1).padStart(3, '0')}`,
      leadDate: addForm.leadDate,
      leadDescription: addForm.leadDescription,
      leadType: typeOption?.name || '',
      leadPriority: priorityOption?.name || '',
      leadSource: sourceOption?.name || '',
      leadStatus: 'New',
      leadScope: scopeOption?.name || '',
      leadEstimate: Number(addForm.leadEstimate) || 0,
      leadAddress: addForm.leadAddress,
      estimatedDeliveryDate: addForm.estimatedDeliveryDate,
      attachment: addForm.attachment?.name || null,
      leadPartnerAssigned: addForm.leadPartnerAssigned,
      nextFollowupDate: addForm.nextFollowupDate,
      contacts: addForm.contacts,
    }

    setLeads([newLead, ...leads])
    closeModal()
  }

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead)
    setActiveModal('view')
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header - Sticky */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Lead Manager</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage all leads in the system
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
            <Button color="dark/zinc" onClick={handleAddLeadClick}>
              <PlusIcon />
              Add Lead Management
            </Button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Table Container with synchronized scroll */}
        <div
          className="flex-1 overflow-auto
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar]:h-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-zinc-300
          [&::-webkit-scrollbar-thumb]:rounded-full
          dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600"
        >
          <div className="min-w-[2000px]">
            {/* Table Header - Sticky */}
            <div className="sticky top-0 z-10 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
              <div className="w-[5%] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</div>
              <div className="w-[8%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Lead Title</div>
              <div className="w-[8%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Lead ID</div>
              <div className="w-[7%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Lead Date</div>
              <div className="w-[9%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Description</div>
              <div className="w-[7%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Type</div>
              <div className="w-[7%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Priority</div>
              <div className="w-[6%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Source</div>
              <div className="w-[7%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Status</div>
              <div className="w-[6%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Scope</div>
              <div className="w-[7%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Estimate</div>
              <div className="w-[8%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Delivery</div>
              <div className="w-[7%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Followup</div>
              <div className="w-[9%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Change Status</div>
              <div className="w-[6%] text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Action</div>
            </div>

            {/* Table Body */}
            <div>
              {leads.length === 0 ? (
                <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
                  No leads found.
                </div>
              ) : (
                currentLeads.map((lead, index) => (
                  <div
                    key={lead.id}
                    className={`flex items-center py-[1.1rem] border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                      index === currentLeads.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <div className="w-[5%] pl-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">
                      {lead.id}
                    </div>
                    <div className="w-[8%] text-sm font-medium text-zinc-950 dark:text-white truncate pr-2">
                      {lead.leadTitle}
                    </div>
                    <div className="w-[8%] text-sm text-zinc-600 dark:text-zinc-400">{lead.leadID}</div>
                    <div className="w-[7%] text-sm text-zinc-600 dark:text-zinc-400">{lead.leadDate}</div>
                    <div className="w-[9%] text-sm text-zinc-600 dark:text-zinc-400 truncate pr-2">
                      {lead.leadDescription}
                    </div>
                    <div className="w-[7%] text-sm text-zinc-600 dark:text-zinc-400">{lead.leadType}</div>
                    <div className="w-[7%] text-sm text-zinc-600 dark:text-zinc-400">{lead.leadPriority}</div>
                    <div className="w-[6%] text-sm text-zinc-600 dark:text-zinc-400">{lead.leadSource}</div>
                    <div className="w-[7%] pr-2">
                      <Badge color={getStatusColor(lead.leadStatus)}>{lead.leadStatus}</Badge>
                    </div>
                    <div className="w-[6%] text-sm text-zinc-600 dark:text-zinc-400">{lead.leadScope}</div>
                    <div className="w-[7%] text-sm text-zinc-600 dark:text-zinc-400">
                      ₹{lead.leadEstimate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </div>
                    <div className="w-[8%] text-sm text-zinc-600 dark:text-zinc-400">
                      {lead.estimatedDeliveryDate}
                    </div>
                    <div className="w-[7%] text-sm text-zinc-600 dark:text-zinc-400">
                      {lead.nextFollowupDate}
                    </div>
                    <div className="w-[9%] pr-2">
                      <Select
                        value={leadStatusOptions.find((s) => s.name === lead.leadStatus)?.id || ''}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className="text-xs"
                      >
                        <option value="">Change...</option>
                        {leadStatusOptions.map((status) => (
                          <option key={status.id} value={status.id}>
                            {status.name}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="w-[6%] px-2 flex items-center justify-center">
                      <Button color="dark/zinc" onClick={() => handleViewLead(lead)} className="text-xs">
                        View Lead
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Pagination Footer */}
        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Add Lead Modal */}
      {activeModal === 'add' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-zinc-950/10 dark:border-white/10">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                Create Lead Management
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Lead Date, Source, Scope */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Lead Date*
                  </label>
                  <Input
                    type="date"
                    value={addForm.leadDate}
                    onChange={(e) => setAddForm({ ...addForm, leadDate: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Lead Source*
                  </label>
                  <Select
                    value={addForm.leadSource}
                    onChange={(e) => setAddForm({ ...addForm, leadSource: e.target.value })}
                  >
                    <option value="">Please select</option>
                    {leadSourceOptions.map((source) => (
                      <option key={source.id} value={source.id}>
                        {source.name}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Lead Scope*
                  </label>
                  <Select
                    value={addForm.leadScope}
                    onChange={(e) => setAddForm({ ...addForm, leadScope: e.target.value })}
                  >
                    <option value="">Please select</option>
                    {leadScopeOptions.map((scope) => (
                      <option key={scope.id} value={scope.id}>
                        {scope.name}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Lead Type and Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Lead Type*
                  </label>
                  <Select
                    value={addForm.leadType}
                    onChange={(e) => setAddForm({ ...addForm, leadType: e.target.value })}
                  >
                    {leadTypeOptions.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Lead Priority*
                  </label>
                  <Select
                    value={addForm.leadPriority}
                    onChange={(e) => setAddForm({ ...addForm, leadPriority: e.target.value })}
                  >
                    {leadPriorityOptions.map((priority) => (
                      <option key={priority.id} value={priority.id}>
                        {priority.name}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Lead Title */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Lead Title*
                </label>
                <Input
                  type="text"
                  value={addForm.leadTitle}
                  onChange={(e) => setAddForm({ ...addForm, leadTitle: e.target.value })}
                  placeholder="Enter lead title"
                />
              </div>

              {/* Lead Description */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Lead Description
                </label>
                <Textarea
                  value={addForm.leadDescription}
                  onChange={(e) => setAddForm({ ...addForm, leadDescription: e.target.value })}
                  placeholder="Enter lead description"
                  rows={3}
                />
              </div>

              {/* Lead Address */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Lead Address
                </label>
                <Textarea
                  value={addForm.leadAddress}
                  onChange={(e) => setAddForm({ ...addForm, leadAddress: e.target.value })}
                  placeholder="Enter lead address"
                  rows={2}
                />
              </div>

              {/* Lead Estimate, Delivery Date, Followup Date */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Lead Estimate (in Rs.)
                  </label>
                  <Input
                    type="number"
                    value={addForm.leadEstimate}
                    onChange={(e) => setAddForm({ ...addForm, leadEstimate: e.target.value })}
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Estimated Delivery Date
                  </label>
                  <Input
                    type="date"
                    value={addForm.estimatedDeliveryDate}
                    onChange={(e) =>
                      setAddForm({ ...addForm, estimatedDeliveryDate: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Next Followup Date
                  </label>
                  <Input
                    type="date"
                    value={addForm.nextFollowupDate}
                    onChange={(e) => setAddForm({ ...addForm, nextFollowupDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Lead Contacts */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Lead Contact
                  </label>
                  <Button color="dark/zinc" onClick={handleAddContactClick}>
                    <PlusIcon />
                    Add lead contact
                  </Button>
                </div>

                <div className="border border-zinc-950/10 dark:border-white/10 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700">
                    <thead className="bg-zinc-50 dark:bg-zinc-900">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Person Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Mobile
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Designation
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Contact Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-700">
                      {addForm.contacts.length === 0 ? (
                        <tr>
                          <td
                            colSpan={6}
                            className="px-4 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400"
                          >
                            No contacts added. Click "Add lead contact" to add contacts.
                          </td>
                        </tr>
                      ) : (
                        addForm.contacts.map((contact) => (
                          <tr key={contact.id}>
                            <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                              {contact.personName}
                            </td>
                            <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                              {contact.mobileNumber}
                            </td>
                            <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                              {contact.emailAddress}
                            </td>
                            <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                              {contact.designation}
                            </td>
                            <td className="px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100">
                              {contact.contactType}
                            </td>
                            <td className="px-4 py-3">
                              <Button
                                plain
                                onClick={() => handleRemoveContact(contact.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Lead Partner Assigned (Multiselect) */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Lead Partner Assigned
                </label>
                <div className="border border-zinc-950/10 dark:border-white/10 rounded-lg p-4 space-y-2">
                  {availablePartners.map((partner) => (
                    <label key={partner.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addForm.leadPartnerAssigned.includes(partner.name)}
                        onChange={() => handlePartnerToggle(partner.id)}
                        className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500"
                      />
                      <span className="text-sm text-zinc-900 dark:text-zinc-100">
                        {partner.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Attachment */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Attachment
                </label>
                <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-8 text-center">
                  <Input
                    type="file"
                    onChange={(e) => setAddForm({ ...addForm, attachment: e.target.files[0] })}
                    className="hidden"
                    id="lead-file-upload"
                  />
                  <label
                    htmlFor="lead-file-upload"
                    className="cursor-pointer text-sm text-zinc-600 dark:text-zinc-400"
                  >
                    Drop files here to upload
                  </label>
                  {addForm.attachment && (
                    <p className="mt-2 text-sm text-zinc-900 dark:text-zinc-100">
                      {addForm.attachment.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-zinc-950/10 dark:border-white/10 flex justify-end gap-3">
              <Button plain onClick={closeModal}>
                Cancel
              </Button>
              <Button color="dark/zinc" onClick={handleAddLeadSubmit}>
                Create Lead
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Contact Modal */}
      {activeModal === 'addContact' && (
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
                    value={contactForm.personName}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, personName: e.target.value })
                    }
                    placeholder="Enter person name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Mobile Number*
                  </label>
                  <Input
                    type="tel"
                    value={contactForm.mobileNumber}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, mobileNumber: e.target.value })
                    }
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
                    value={contactForm.emailAddress}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, emailAddress: e.target.value })
                    }
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Designation
                  </label>
                  <Input
                    type="text"
                    value={contactForm.designation}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, designation: e.target.value })
                    }
                    placeholder="Enter designation"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Contact Type*
                </label>
                <Select
                  value={contactForm.contactType}
                  onChange={(e) => setContactForm({ ...contactForm, contactType: e.target.value })}
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
              <Button plain onClick={() => setActiveModal('add')}>
                Cancel
              </Button>
              <Button color="dark/zinc" onClick={handleAddContactToLead}>
                Add Contact
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Lead Modal */}
      {activeModal === 'view' && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 backdrop-blur-sm overflow-hidden">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-zinc-950/10 dark:border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  Lead Details
                </h2>
                <div className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
                  {selectedLead.leadTitle}
                </div>
              </div>
              <Badge color={getStatusColor(selectedLead.leadStatus)} className="text-base px-4 py-2">
                {selectedLead.leadStatus}
              </Badge>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Lead Information */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                <div>
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Lead ID
                  </div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {selectedLead.leadID}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Lead Date
                  </div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {selectedLead.leadDate}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Lead Type
                  </div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {selectedLead.leadType}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Lead Priority
                  </div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {selectedLead.leadPriority}
                  </div>
                </div>
              </div>

              {/* Lead Details */}
              <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  Lead Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="font-medium text-zinc-600 dark:text-zinc-400">Source:</span>
                    <span className="text-zinc-900 dark:text-zinc-100">
                      {selectedLead.leadSource}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-zinc-600 dark:text-zinc-400">Scope:</span>
                    <span className="text-zinc-900 dark:text-zinc-100">
                      {selectedLead.leadScope}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-zinc-600 dark:text-zinc-400">
                      Description:
                    </span>
                    <span className="text-zinc-900 dark:text-zinc-100">
                      {selectedLead.leadDescription}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-zinc-600 dark:text-zinc-400">Address:</span>
                    <span className="text-zinc-900 dark:text-zinc-100">
                      {selectedLead.leadAddress}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-zinc-600 dark:text-zinc-400">
                      Estimate:
                    </span>
                    <span className="text-zinc-900 dark:text-zinc-100">
                      ₹{selectedLead.leadEstimate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-zinc-600 dark:text-zinc-400">
                      Estimated Delivery:
                    </span>
                    <span className="text-zinc-900 dark:text-zinc-100">
                      {selectedLead.estimatedDeliveryDate}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-zinc-600 dark:text-zinc-400">
                      Next Followup:
                    </span>
                    <span className="text-zinc-900 dark:text-zinc-100">
                      {selectedLead.nextFollowupDate}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-zinc-600 dark:text-zinc-400">
                      Partners Assigned:
                    </span>
                    <span className="text-zinc-900 dark:text-zinc-100">
                      {selectedLead.leadPartnerAssigned.join(', ') || 'None'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contacts */}
              <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  Lead Contacts
                </h3>
                {selectedLead.contacts.length === 0 ? (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">No contacts available</p>
                ) : (
                  <div className="space-y-3">
                    {selectedLead.contacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg space-y-1"
                      >
                        <div className="font-medium text-zinc-900 dark:text-zinc-100">
                          {contact.personName}
                        </div>
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                          {contact.mobileNumber} • {contact.emailAddress}
                        </div>
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                          {contact.designation} • {contact.contactType}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Attachment */}
              {selectedLead.attachment && (
                <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                    Attachment
                  </h3>
                  <div className="text-sm text-zinc-900 dark:text-zinc-100">
                    {selectedLead.attachment}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-zinc-950/10 dark:border-white/10 flex justify-end gap-3">
              <Button color="dark/zinc" onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
