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
import { DatePicker } from '@/components/datepicker'
import {
  initialShopAudits,
  customers,
  employees,
  auditTypes,
  auditImages,
} from './data'

const ITEMS_PER_PAGE = 10

export default function ShopAuditPage() {
  const [audits, setAudits] = useState(initialShopAudits)
  const [activeModal, setActiveModal] = useState(null)
  const [selectedAudit, setSelectedAudit] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Add form state
  const [form, setForm] = useState({
    customerId: '',
    employeeId: '',
    auditTypeId: '',
    auditRemark: '',
    auditImageId: '',
    visitDate: '',
  })

  // Combobox states
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [auditImageFile, setAuditImageFile] = useState(null)

  // Edit form states
  const [editSelectedCustomer, setEditSelectedCustomer] = useState(null)
  const [editSelectedEmployee, setEditSelectedEmployee] = useState(null)
  const [editAuditImageFile, setEditAuditImageFile] = useState(null)
  const [editForm, setEditForm] = useState({
    auditTypeId: '',
    auditRemark: '',
    visitDate: '',
  })

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(audits.length / ITEMS_PER_PAGE))
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [audits, currentPage])

  const paginatedAudits = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return audits.slice(start, start + ITEMS_PER_PAGE)
  }, [audits, currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const openModal = (type, payload) => {
    setActiveModal(type)
    setSelectedAudit(payload ?? null)
    if (type === 'add') {
      setForm({
        customerId: '',
        employeeId: '',
        auditTypeId: '',
        auditRemark: '',
        auditImageId: '',
        visitDate: '',
      })
      setSelectedCustomer(null)
      setSelectedEmployee(null)
      setAuditImageFile(null)
    } else if (type === 'edit' && payload) {
      // Initialize edit form with selected audit data
      const customer = customers.find((c) => c.name === payload.customer)
      const employee = employees.find((e) => e.name === payload.employee)
      const auditType = auditTypes.find((a) => a.name === payload.auditType)
      
      setEditSelectedCustomer(customer || null)
      setEditSelectedEmployee(employee || null)
      setEditForm({
        auditTypeId: auditType?.id.toString() || '',
        auditRemark: payload.auditRemark,
        visitDate: payload.visit,
      })
      setEditAuditImageFile(null)
    }
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedAudit(null)
    setSelectedCustomer(null)
    setSelectedEmployee(null)
    setAuditImageFile(null)
    setEditSelectedCustomer(null)
    setEditSelectedEmployee(null)
    setEditAuditImageFile(null)
  }

  const handleAddAudit = () => {
    const auditType = auditTypes.find((a) => a.id === Number(form.auditTypeId))

    if (!selectedCustomer || !selectedEmployee || !auditType || !auditImageFile || !form.visitDate) {
      return
    }

    const newAudit = {
      id: `SA-${String(audits.length + 1).padStart(3, '0')}`,
      customer: selectedCustomer.name,
      auditType: auditType.name,
      auditRemark: form.auditRemark || 'No remarks provided',
      auditImage: auditImageFile.name,
      employee: selectedEmployee.name,
      visit: form.visitDate,
    }

    setAudits((prev) => [...prev, newAudit])
    closeModal()
  }

  const handleSaveEdit = () => {
    if (!selectedAudit) return

    const auditType = auditTypes.find((a) => a.id === Number(editForm.auditTypeId))

    setAudits((prev) =>
      prev.map((audit) =>
        audit.id === selectedAudit.id
          ? {
              ...audit,
              customer: editSelectedCustomer?.name || audit.customer,
              employee: editSelectedEmployee?.name || audit.employee,
              auditType: auditType?.name || audit.auditType,
              auditRemark: editForm.auditRemark || audit.auditRemark,
              auditImage: editAuditImageFile?.name || audit.auditImage,
              visit: editForm.visitDate || audit.visit,
            }
          : audit
      )
    )
    closeModal()
  }

  const handleDelete = () => {
    if (!selectedAudit) return
    setAudits((prev) => prev.filter((audit) => audit.id !== selectedAudit.id))
  }

  const tableRows = paginatedAudits.map((audit) => ({
    id: audit.id,
    customer: audit.customer,
    auditType: audit.auditType,
    auditRemark: audit.auditRemark,
    auditImage: audit.auditImage,
    employee: audit.employee,
    visit: audit.visit,
    raw: audit,
  }))

  const totalPages = Math.max(1, Math.ceil(audits.length / ITEMS_PER_PAGE))

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      <Header
        title="Shop Audit"
        subtitle="Manage shop audits, inspections, and compliance reports"
        addLabel="Add Shop Audit"
        onAdd={() => openModal('add')}
        dropdownOptions={[
          { label: 'Import from Excel' },
          { label: 'Export to Excel' },
          { label: 'Download Format' },
        ]}
      />

      <CommonTable
        data={tableRows}
        emptyMessage="No shop audits found."
        minWidth="1400px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '100px' },
          { key: 'customer', label: 'Customer', width: '180px' },
          { key: 'auditType', label: 'Audit Type', width: '160px' },
          { key: 'auditRemark', label: 'Audit Remark', width: '280px' },
          { key: 'auditImage', label: 'Audit Image', width: '160px' },
          { key: 'employee', label: 'Employee', width: '160px' },
          { key: 'visit', label: 'Visit', width: '120px' },
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

      {/* Add Shop Audit Alert */}
      <Alert open={activeModal === 'add'} onClose={closeModal}>
        <AlertTitle>Add Shop Audit</AlertTitle>
        <AlertDescription>Fill in the shop audit details below</AlertDescription>

        <AlertBody>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {/* Customer Combobox */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Customer
              </label>
              <Combobox
                value={selectedCustomer}
                onChange={setSelectedCustomer}
                options={customers}
                displayValue={(customer) => customer?.name ?? ''}
                placeholder="Search and select customer..."
              >
                {(customer) => (
                  <ComboboxOption value={customer}>
                    {customer.name}
                  </ComboboxOption>
                )}
              </Combobox>
            </div>

            {/* Employee Combobox */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Employee
              </label>
              <Combobox
                value={selectedEmployee}
                onChange={setSelectedEmployee}
                options={employees}
                displayValue={(employee) => employee?.name ?? ''}
                placeholder="Search and select employee..."
              >
                {(employee) => (
                  <ComboboxOption value={employee}>
                    {employee.name}
                  </ComboboxOption>
                )}
              </Combobox>
            </div>

            {/* Audit Type Dropdown */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Audit Type
              </label>
              <select
                value={form.auditTypeId}
                onChange={(e) => setForm({ ...form, auditTypeId: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800"
              >
                <option value="">Select Audit Type</option>
                {auditTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Audit Remark */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Audit Remark
              </label>
              <textarea
                value={form.auditRemark}
                onChange={(e) => setForm({ ...form, auditRemark: e.target.value })}
                placeholder="Enter audit remarks..."
                rows={3}
                className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800"
              />
            </div>

            {/* Audit Image Upload */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Audit Image
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setAuditImageFile(e.target.files?.[0] || null)}
              />
              {auditImageFile && (
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  Selected: {auditImageFile.name}
                </p>
              )}
            </div>

            {/* Visit Date Calendar */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Visit Date
              </label>
              <DatePicker
                value={form.visitDate}
                onChange={(date) => setForm({ ...form, visitDate: date })}
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
            onClick={handleAddAudit}
            disabled={
              !selectedCustomer ||
              !selectedEmployee ||
              !form.auditTypeId ||
              !auditImageFile ||
              !form.visitDate
            }
          >
            Add Shop Audit
          </Button>
        </AlertActions>
      </Alert>

      {selectedAudit && (
        <>
          <ViewAlert
            isOpen={activeModal === 'view'}
            onClose={closeModal}
            title="Shop Audit Details"
            message="View the details of the selected shop audit"
            fields={{
              ID: selectedAudit.id,
              Customer: selectedAudit.customer,
              'Audit Type': selectedAudit.auditType,
              'Audit Remark': selectedAudit.auditRemark,
              'Audit Image': selectedAudit.auditImage,
              Employee: selectedAudit.employee,
              'Visit Date': selectedAudit.visit,
            }}
          />

          <EditAlert
            isOpen={activeModal === 'edit'}
            onClose={closeModal}
            title="Edit Shop Audit"
            message="Update the shop audit details"
            fields={{
              auditRemark: selectedAudit.auditRemark,
            }}
            onSave={handleSaveEdit}
          />

          {/* Custom Edit Alert */}
          <Alert open={activeModal === 'edit'} onClose={closeModal}>
            <AlertTitle>Edit Shop Audit</AlertTitle>
            <AlertDescription>Update the shop audit details</AlertDescription>

            <AlertBody>
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {/* Customer Combobox */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Customer
                  </label>
                  <Combobox
                    value={editSelectedCustomer}
                    onChange={setEditSelectedCustomer}
                    options={customers}
                    displayValue={(customer) => customer?.name ?? ''}
                    placeholder="Search and select customer..."
                  >
                    {(customer) => (
                      <ComboboxOption value={customer}>
                        {customer.name}
                      </ComboboxOption>
                    )}
                  </Combobox>
                </div>

                {/* Employee Combobox */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Employee
                  </label>
                  <Combobox
                    value={editSelectedEmployee}
                    onChange={setEditSelectedEmployee}
                    options={employees}
                    displayValue={(employee) => employee?.name ?? ''}
                    placeholder="Search and select employee..."
                  >
                    {(employee) => (
                      <ComboboxOption value={employee}>
                        {employee.name}
                      </ComboboxOption>
                    )}
                  </Combobox>
                </div>

                {/* Audit Type Dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Audit Type
                  </label>
                  <select
                    value={editForm.auditTypeId}
                    onChange={(e) => setEditForm({ ...editForm, auditTypeId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800"
                  >
                    <option value="">Select Audit Type</option>
                    {auditTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Audit Remark */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Audit Remark
                  </label>
                  <textarea
                    value={editForm.auditRemark}
                    onChange={(e) => setEditForm({ ...editForm, auditRemark: e.target.value })}
                    placeholder="Enter audit remarks..."
                    rows={3}
                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-zinc-800"
                  />
                </div>

                {/* Audit Image Upload */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Audit Image
                  </label>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                    Current: {selectedAudit.auditImage}
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditAuditImageFile(e.target.files?.[0] || null)}
                  />
                  {editAuditImageFile && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                      New: {editAuditImageFile.name}
                    </p>
                  )}
                </div>

                {/* Visit Date Calendar */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Visit Date
                  </label>
                  <DatePicker
                    value={editForm.visitDate}
                    onChange={(date) => setEditForm({ ...editForm, visitDate: date })}
                  />
                </div>
              </div>
            </AlertBody>

            <AlertActions>
              <Button plain onClick={closeModal}>
                Cancel
              </Button>
              <Button color="dark/zinc" onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </AlertActions>
          </Alert>

          <DeleteAlert
            isOpen={activeModal === 'delete'}
            onClose={closeModal}
            title="Delete Shop Audit?"
            message={`Do you really want to delete the audit for ${selectedAudit.customer}?`}
            onConfirm={handleDelete}
          />
        </>
      )}
    </div>
  )
}
