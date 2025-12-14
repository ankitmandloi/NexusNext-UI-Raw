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
import { Combobox, ComboboxOption } from '@/components/combobox'
import { initialEventPlanners, eventTypes, eventStatuses, employees, partners } from './data'

const ITEMS_PER_PAGE = 10

export default function EventPlannerPage() {
  const [events, setEvents] = useState(initialEventPlanners)
  const [activeModal, setActiveModal] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Add form state
  const [form, setForm] = useState({
    eventTypeId: '',
    eventVenue: '',
    eventRemark: '',
    expectedInvitees: '',
    budgetPerInvitee: '',
    statusId: '',
    companyRatio: '',
    employeeId: '',
    eventDate: '',
  })

  // File and combobox states
  const [selectedPartner, setSelectedPartner] = useState(null)
  const [budgetaryFile, setBudgetaryFile] = useState(null)

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(events.length / ITEMS_PER_PAGE))
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [events, currentPage])

  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return events.slice(start, start + ITEMS_PER_PAGE)
  }, [events, currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const openModal = (type, payload) => {
    setActiveModal(type)
    setSelectedEvent(payload ?? null)
    if (type === 'add') {
      setForm({
        eventTypeId: '',
        eventVenue: '',
        eventRemark: '',
        expectedInvitees: '',
        budgetPerInvitee: '',
        statusId: '',
        companyRatio: '',
        employeeId: '',
        eventDate: '',
      })
      setSelectedPartner(null)
      setBudgetaryFile(null)
    }
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedEvent(null)
    setSelectedPartner(null)
    setBudgetaryFile(null)
  }

  const handleAddEvent = () => {
    const eventType = eventTypes.find((e) => e.id === Number(form.eventTypeId))
    const status = eventStatuses.find((s) => s.id === Number(form.statusId))
    const employee = employees.find((e) => e.id === Number(form.employeeId))

    if (
      !eventType ||
      !status ||
      !employee ||
      !form.eventDate ||
      !form.expectedInvitees ||
      !form.budgetPerInvitee ||
      !budgetaryFile
    ) {
      return
    }

    const newEvent = {
      id: `EP-${String(events.length + 1).padStart(3, '0')}`,
      eventType: eventType.name,
      eventRemark: form.eventRemark || 'No remarks provided',
      expectedInvitees: Number(form.expectedInvitees),
      budgetPerInvitee: Number(form.budgetPerInvitee),
      budgetaryAttachment: budgetaryFile.name,
      eventDate: form.eventDate,
      status: status.name,
      sharedOrCompanyPaid: Number(form.companyRatio) === 100 ? 'Company Paid' : 'Shared',
      companyRatio: Number(form.companyRatio) || 100,
      partnerAssociation: selectedPartner?.name || 'N/A',
      actualExpense: 0,
      billAttachment: '',
      eventByEmployee: employee.name,
    }

    setEvents((prev) => [...prev, newEvent])
    closeModal()
  }

  const handleSaveEdit = (editForm) => {
    if (!selectedEvent) return

    setEvents((prev) =>
      prev.map((event) =>
        event.id === selectedEvent.id
          ? {
              ...event,
              eventRemark: editForm.eventRemark || event.eventRemark,
            }
          : event
      )
    )
  }

  const handleDelete = () => {
    if (!selectedEvent) return
    setEvents((prev) => prev.filter((event) => event.id !== selectedEvent.id))
  }

  const tableRows = paginatedEvents.map((event) => ({
    id: event.id,
    eventType: event.eventType,
    eventRemark: event.eventRemark,
    expectedInvitees: event.expectedInvitees,
    budgetPerInvitee: `$${event.budgetPerInvitee}`,
    budgetaryAttachment: event.budgetaryAttachment,
    eventDate: event.eventDate,
    status: event.status,
    sharedOrCompanyPaid: event.sharedOrCompanyPaid,
    companyRatio: `${event.companyRatio}%`,
    partnerAssociation: event.partnerAssociation,
    actualExpense: `$${event.actualExpense}`,
    billAttachment: event.billAttachment || 'N/A',
    eventByEmployee: event.eventByEmployee,
    raw: event,
  }))

  const totalPages = Math.max(1, Math.ceil(events.length / ITEMS_PER_PAGE))

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      <Header
        title="Event Planner"
        subtitle="Manage corporate events, budgets, and event planning activities"
        addLabel="Add Event Planner"
        onAdd={() => openModal('add')}
        dropdownOptions={[
          { label: 'Import from Excel' },
          { label: 'Export to Excel' },
          { label: 'Download Format' },
        ]}
      />

      <CommonTable
        data={tableRows}
        emptyMessage="No events found."
        minWidth="2000px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '90px' },
          { key: 'eventType', label: 'Event Type', width: '140px' },
          { key: 'eventRemark', label: 'Event Remark', width: '200px' },
          { key: 'expectedInvitees', label: 'Expected Invitees', width: '130px' },
          { key: 'budgetPerInvitee', label: 'Budget Per Invitee', width: '140px' },
          { key: 'budgetaryAttachment', label: 'Budgetary Attachment', width: '170px' },
          { key: 'eventDate', label: 'Event Date', width: '120px' },
          { key: 'status', label: 'Status', width: '110px' },
          { key: 'sharedOrCompanyPaid', label: 'Shared or Company Paid', width: '180px' },
          { key: 'companyRatio', label: 'Company Ratio', width: '130px' },
          { key: 'partnerAssociation', label: 'Partner Association', width: '160px' },
          { key: 'actualExpense', label: 'Actual Expense', width: '130px' },
          { key: 'billAttachment', label: 'Bill Attachment', width: '140px' },
          { key: 'eventByEmployee', label: 'Event By Employee', width: '160px' },
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

      {/* Add Event Planner Alert */}
      <Alert open={activeModal === 'add'} onClose={closeModal} size="2xl">
        <AlertTitle>Add Event Planner</AlertTitle>
        <AlertDescription>Fill in the event planning details below</AlertDescription>

        <AlertBody>
          <div className="max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Event Date Input */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Event Date</label>
                <Input
                  type="date"
                  value={form.eventDate}
                  onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                />
              </div>

              {/* Event Type Dropdown */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Event Type</label>
                <select
                  value={form.eventTypeId}
                  onChange={(e) => setForm({ ...form, eventTypeId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800"
                >
                  <option value="">Select Event Type</option>
                  {eventTypes.map((type) => (
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
                  {eventStatuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Event By Employee Dropdown */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Event By Employee
                </label>
                <select
                  value={form.employeeId}
                  onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800"
                >
                  <option value="">Select Employee</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Expected Invitees */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Expected Invitees
                </label>
                <Input
                  type="number"
                  value={form.expectedInvitees}
                  onChange={(e) => setForm({ ...form, expectedInvitees: e.target.value })}
                  placeholder="Enter number of invitees..."
                />
              </div>

              {/* Budget Per Invitee */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Budget Per Invitee
                </label>
                <Input
                  type="number"
                  value={form.budgetPerInvitee}
                  onChange={(e) => setForm({ ...form, budgetPerInvitee: e.target.value })}
                  placeholder="Enter budget per invitee..."
                />
              </div>

              {/* Company Ratio */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Company Ratio (%)
                </label>
                <Input
                  type="number"
                  value={form.companyRatio}
                  onChange={(e) => setForm({ ...form, companyRatio: e.target.value })}
                  placeholder="Enter company ratio (0-100)..."
                  min="0"
                  max="100"
                />
              </div>

              {/* Budgetary Attachment Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Budgetary Attachment
                </label>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  onChange={(e) => setBudgetaryFile(e.target.files?.[0] || null)}
                />
                {budgetaryFile && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Selected: {budgetaryFile.name}</p>
                )}
              </div>
            </div>

            {/* Row 4: Event Venue, Partner Association */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Event Venue */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Event Venue</label>
                <Input
                  type="text"
                  value={form.eventVenue}
                  onChange={(e) => setForm({ ...form, eventVenue: e.target.value })}
                  placeholder="Enter event venue..."
                />
              </div>

              {/* Partner Association Search */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Partner Association
                </label>
                <Combobox
                  value={selectedPartner}
                  onChange={setSelectedPartner}
                  options={partners}
                  displayValue={(partner) => partner?.name ?? ''}
                  placeholder="Search and select partner..."
                >
                  {(partner) => <ComboboxOption value={partner}>{partner.name}</ComboboxOption>}
                </Combobox>
              </div>
            </div>

            {/* Row 5: Event Remark (full width) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Event Remark</label>
              <textarea
                value={form.eventRemark}
                onChange={(e) => setForm({ ...form, eventRemark: e.target.value })}
                placeholder="Enter event remarks..."
                rows={3}
                className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800"
              />
            </div>
          </div>
        </AlertBody>

        <AlertActions>
          <Button plain onClick={closeModal}>
            Cancel
          </Button>
          <Button
            color="dark/zinc"
            onClick={handleAddEvent}
            disabled={
              !form.eventTypeId ||
              !form.statusId ||
              !form.employeeId ||
              !form.eventDate ||
              !form.expectedInvitees ||
              !form.budgetPerInvitee ||
              !budgetaryFile
            }
          >
            Add Event Planner
          </Button>
        </AlertActions>
      </Alert>

      {selectedEvent && (
        <>
          <ViewAlert
            isOpen={activeModal === 'view'}
            onClose={closeModal}
            title="Event Planner Details"
            message="View the details of the selected event"
            fields={{
              ID: selectedEvent.id,
              'Event Type': selectedEvent.eventType,
              'Event Remark': selectedEvent.eventRemark,
              'Expected Invitees': selectedEvent.expectedInvitees,
              'Budget Per Invitee': `$${selectedEvent.budgetPerInvitee}`,
              'Budgetary Attachment': selectedEvent.budgetaryAttachment,
              'Event Date': selectedEvent.eventDate,
              Status: selectedEvent.status,
              'Shared or Company Paid': selectedEvent.sharedOrCompanyPaid,
              'Company Ratio': `${selectedEvent.companyRatio}%`,
              'Partner Association': selectedEvent.partnerAssociation,
              'Actual Expense': `$${selectedEvent.actualExpense}`,
              'Bill Attachment': selectedEvent.billAttachment || 'N/A',
              'Event By Employee': selectedEvent.eventByEmployee,
            }}
          />

          <EditAlert
            isOpen={activeModal === 'edit'}
            onClose={closeModal}
            title="Edit Event Planner"
            message="Update the event remark"
            fields={{
              eventRemark: selectedEvent.eventRemark,
            }}
            onSave={handleSaveEdit}
          />

          <DeleteAlert
            isOpen={activeModal === 'delete'}
            onClose={closeModal}
            title="Delete Event Planner?"
            message={`Do you really want to delete the event ${selectedEvent.eventType}?`}
            onConfirm={handleDelete}
          />
        </>
      )}
    </div>
  )
}
