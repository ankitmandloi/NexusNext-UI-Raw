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

type Ticket = {
  id: number
  ticketId: string
  subject: string
  description: string
  status: string
  tag: string
  assignedTo: string
  createdDate: string
  customerName?: string
  contactNumber?: string
}

const initialTickets: Ticket[] = [
  {
    id: 1,
    ticketId: 'TKT-001',
    subject: 'Points not credited',
    description: 'Customer purchased products worth 5000 but points not reflected in account',
    status: 'Open',
    tag: 'Redemption Query / Points Query',
    assignedTo: 'Naresh Vilas Chaudhari',
    createdDate: '2024-12-15',
    customerName: 'Rajesh Kumar',
    contactNumber: '+91 9876543210',
  },
  {
    id: 2,
    ticketId: 'TKT-002',
    subject: 'QR Code not scanning',
    description: 'QR code on product package is damaged and not scanning properly',
    status: 'In progress',
    tag: 'QR Code Query',
    assignedTo: 'Naresh Vilas Chaudhari',
    createdDate: '2024-12-14',
    customerName: 'Amit Sharma',
    contactNumber: '+91 9876543211',
  },
  {
    id: 3,
    ticketId: 'TKT-003',
    subject: 'Product defect complaint',
    description: 'Received defective product, requesting replacement',
    status: 'Open',
    tag: 'Product Quality/Technical',
    assignedTo: 'Shivam Pandey',
    createdDate: '2024-12-13',
    customerName: 'Priya Singh',
    contactNumber: '+91 9876543212',
  },
]

const ticketStatuses = ['Open', 'In progress', 'Closed']
const ticketTags = [
  'Redemption Query / Points Query',
  'QR Code Query',
  'Product Quality/Technical',
  'Gift Receiving Issue',
  'Deliver/ Availability',
  'Invoice / Price Related Query',
  'Employee Incentives / Salary',
  'KYC Related Query',
  'Visit Query',
  'Other Query',
]
const assignees = ['Naresh Vilas Chaudhari', 'Shivam Pandey', 'Sankit Singh']

// ============================================================================
// VIEW TICKET ALERT COMPONENT
// ============================================================================

function ViewTicketAlert({ isOpen, onClose, ticket }: any) {
  if (!ticket) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Ticket Details - {ticket.ticketId}</AlertTitle>
      <AlertDescription>
        View the complete details of the selected ticket below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Ticket ID:</span>
              <span className="text-zinc-600 dark:text-zinc-400">{ticket.ticketId}</span>
            </div>
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Status:</span>
              <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                ticket.status === 'Open' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                ticket.status === 'In progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
              }`}>
                {ticket.status}
              </span>
            </div>
          </div>
          
          <div>
            <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Subject:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{ticket.subject}</span>
          </div>
          
          <div>
            <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Description:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{ticket.description}</span>
          </div>
          
          <div>
            <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Tag:</span>
            <span className="text-zinc-600 dark:text-zinc-400">{ticket.tag}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Assigned To:</span>
              <span className="text-zinc-600 dark:text-zinc-400">{ticket.assignedTo}</span>
            </div>
            <div>
              <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Created Date:</span>
              <span className="text-zinc-600 dark:text-zinc-400">{ticket.createdDate}</span>
            </div>
          </div>
          
          {ticket.customerName && (
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-zinc-200 dark:border-zinc-700">
              <div>
                <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Customer Name:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{ticket.customerName}</span>
              </div>
              <div>
                <span className="font-medium text-zinc-700 dark:text-zinc-300 block">Contact Number:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{ticket.contactNumber}</span>
              </div>
            </div>
          )}
        </div>
      </AlertBody>
      <AlertActions>
        <Button color="dark/zinc" onClick={onClose}>Close</Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// EDIT TICKET ALERT COMPONENT
// ============================================================================

function EditTicketAlert({ isOpen, onClose, ticket, onSave }: any) {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    status: 'Open',
    tag: ticketTags[0],
    assignedTo: assignees[0],
    customerName: '',
    contactNumber: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (ticket && isOpen) {
      setFormData({
        subject: ticket.subject,
        description: ticket.description,
        status: ticket.status,
        tag: ticket.tag,
        assignedTo: ticket.assignedTo,
        customerName: ticket.customerName || '',
        contactNumber: ticket.contactNumber || '',
      })
    }
  }, [ticket, isOpen])

  const handleSave = async () => {
    if (!ticket || !formData.subject.trim() || !formData.description.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      onSave(ticket.id, formData)
      setIsSubmitting(false)
      onClose()
    }, 300)
  }

  const handleCancel = () => {
    onClose()
  }

  if (!ticket) return null

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Edit Ticket - {ticket.ticketId}</AlertTitle>
      <AlertDescription>
        Update the ticket information below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="editSubject" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Subject
            </label>
            <Input
              id="editSubject"
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Enter ticket subject"
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
              placeholder="Enter ticket description"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="editStatus" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Status
              </label>
              <Select
                id="editStatus"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                {ticketStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="editTag" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Tag
              </label>
              <Select
                id="editTag"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              >
                {ticketTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="editAssignedTo" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Assign To
            </label>
            <Select
              id="editAssignedTo"
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            >
              {assignees.map((assignee) => (
                <option key={assignee} value={assignee}>
                  {assignee}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="editCustomerName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Customer Name
              </label>
              <Input
                id="editCustomerName"
                type="text"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="Enter customer name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="editContactNumber" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Contact Number
              </label>
              <Input
                id="editContactNumber"
                type="text"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                placeholder="Enter contact number"
              />
            </div>
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button color="dark/zinc" onClick={handleSave} disabled={!formData.subject.trim() || !formData.description.trim() || isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// ADD TICKET ALERT COMPONENT
// ============================================================================

function AddTicketAlert({ isOpen, onClose, onAdd }: any) {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    status: 'Open',
    tag: ticketTags[0],
    assignedTo: assignees[0],
    customerName: '',
    contactNumber: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        subject: '',
        description: '',
        status: 'Open',
        tag: ticketTags[0],
        assignedTo: assignees[0],
        customerName: '',
        contactNumber: '',
      })
    }
  }, [isOpen])

  const handleAdd = async () => {
    if (!formData.subject.trim() || !formData.description.trim()) return

    setIsSubmitting(true)
    setTimeout(() => {
      onAdd(formData)
      setIsSubmitting(false)
      onClose()
    }, 300)
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Create New Ticket</AlertTitle>
      <AlertDescription>
        Fill in the details to create a new support ticket.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="newSubject" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Subject
            </label>
            <Input
              id="newSubject"
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Enter ticket subject"
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
              placeholder="Enter ticket description"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="newStatus" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Status
              </label>
              <Select
                id="newStatus"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                {ticketStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="newTag" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Tag
              </label>
              <Select
                id="newTag"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              >
                {ticketTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="newAssignedTo" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Assign To
            </label>
            <Select
              id="newAssignedTo"
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            >
              {assignees.map((assignee) => (
                <option key={assignee} value={assignee}>
                  {assignee}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="newCustomerName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Customer Name
              </label>
              <Input
                id="newCustomerName"
                type="text"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="Enter customer name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="newContactNumber" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Contact Number
              </label>
              <Input
                id="newContactNumber"
                type="text"
                value={formData.contactNumber}
                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                placeholder="Enter contact number"
              />
            </div>
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button color="dark/zinc" onClick={handleAdd} disabled={!formData.subject.trim() || !formData.description.trim() || isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// DELETE ALERT COMPONENT
// ============================================================================

function DeleteTicketAlert({ isOpen, onClose, ticket, onConfirm }: any) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!ticket) return

    setIsDeleting(true)
    setTimeout(() => {
      onConfirm(ticket.id)
      setIsDeleting(false)
      onClose()
    }, 300)
  }

  if (!ticket) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Are you sure you want to delete this ticket?</AlertTitle>
      <AlertDescription>
        You are about to delete ticket <strong className="text-zinc-900 dark:text-white">{ticket.ticketId}</strong> - {ticket.subject}. 
        This action cannot be undone.
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

export default function TicketPage() {
  const [tickets, setTickets] = useState(initialTickets)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(tickets.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentTickets = tickets.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleView = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setActiveModal('view')
  }

  const handleEdit = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setActiveModal('edit')
  }

  const handleDelete = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setActiveModal('add')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedTicket(null)
  }

  const handleAddTicket = (formData: any) => {
    const newId = tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1
    const ticketId = `TKT-${String(newId).padStart(3, '0')}`
    const today = new Date().toISOString().split('T')[0]
    
    const newTicket: Ticket = {
      id: newId,
      ticketId,
      createdDate: today,
      ...formData,
    }
    setTickets((prevTickets) => [...prevTickets, newTicket])
  }

  const handleSaveEdit = (id: number, formData: any) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, ...formData } : ticket
      )
    )
  }

  const handleConfirmDelete = (id: number) => {
    setTickets((prevTickets) => prevTickets.filter((ticket) => ticket.id !== id))
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Tickets</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage all support tickets in the system
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button color="dark/zinc" onClick={handleAddClick}>
              <PlusIcon />
              Create Ticket
            </Button>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        {/* Table Header */}
        <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
          <div className="w-[10%] pl-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">Ticket ID</div>
          <div className="w-[25%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Subject</div>
          <div className="w-[12%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Status</div>
          <div className="w-[18%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Tag</div>
          <div className="w-[15%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Assigned To</div>
          <div className="w-[10%] text-sm font-medium text-zinc-500 dark:text-zinc-400">Created Date</div>
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
          {tickets.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">
              No tickets found. Click "Create Ticket" to create one.
            </div>
          ) : (
            currentTickets.map((ticket, index) => (
              <div
                key={ticket.id}
                className={`flex items-center py-[1.1rem] border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                  index === currentTickets.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <div className="w-[10%] pl-6 text-sm text-zinc-500 dark:text-zinc-400 tabular-nums font-medium">
                  {ticket.ticketId}
                </div>
                <div className="w-[25%] text-sm font-medium text-zinc-950 dark:text-white truncate pr-4">
                  {ticket.subject}
                </div>
                <div className="w-[12%] text-sm">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                    ticket.status === 'Open' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    ticket.status === 'In progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
                  }`}>
                    {ticket.status}
                  </span>
                </div>
                <div className="w-[18%] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                  {ticket.tag}
                </div>
                <div className="w-[15%] text-sm text-zinc-600 dark:text-zinc-300 truncate pr-4">
                  {ticket.assignedTo}
                </div>
                <div className="w-[10%] text-sm text-zinc-500 dark:text-zinc-400 tabular-nums">
                  {ticket.createdDate}
                </div>
                <div className="w-[160px] px-4 flex items-center justify-center">
                  <Actions
                    onView={() => handleView(ticket)}
                    onEdit={() => handleEdit(ticket)}
                    onDelete={() => handleDelete(ticket)}
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

      {/* ALERT MODALS */}
      <AddTicketAlert
        isOpen={activeModal === 'add'}
        onClose={closeModal}
        onAdd={handleAddTicket}
      />

      <ViewTicketAlert
        isOpen={activeModal === 'view'}
        onClose={closeModal}
        ticket={selectedTicket}
      />

      <EditTicketAlert
        isOpen={activeModal === 'edit'}
        onClose={closeModal}
        ticket={selectedTicket}
        onSave={handleSaveEdit}
      />

      <DeleteTicketAlert
        isOpen={activeModal === 'delete'}
        onClose={closeModal}
        ticket={selectedTicket}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}
