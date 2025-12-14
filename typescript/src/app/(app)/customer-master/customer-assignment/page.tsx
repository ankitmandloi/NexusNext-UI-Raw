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
import { CustomerAssignment, initialCustomerAssignments } from './data'

const ITEMS_PER_PAGE = 10

type ModalState = 'view' | 'edit' | 'delete' | null

type CustomerAssignmentForm = {
  customer: string
  parent: string
}

export default function CustomerAssignmentPage() {
  const [assignments, setAssignments] = useState<CustomerAssignment[]>(initialCustomerAssignments)
  const [activeModal, setActiveModal] = useState<ModalState>(null)
  const [selectedAssignment, setSelectedAssignment] = useState<CustomerAssignment | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(assignments.length / ITEMS_PER_PAGE))
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [assignments, currentPage])

  const paginatedAssignments = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return assignments.slice(start, start + ITEMS_PER_PAGE)
  }, [assignments, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const openModal = (type: ModalState, payload?: CustomerAssignment) => {
    setActiveModal(type)
    setSelectedAssignment(payload ?? null)
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedAssignment(null)
  }

  const handleSaveEdit = (form: CustomerAssignmentForm) => {
    if (!selectedAssignment) return

    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === selectedAssignment.id
          ? {
              ...assignment,
              customer: form.customer || assignment.customer,
              parent: form.parent || assignment.parent,
            }
          : assignment
      )
    )
  }

  const handleDelete = () => {
    if (!selectedAssignment) return
    setAssignments((prev) => prev.filter((assignment) => assignment.id !== selectedAssignment.id))
  }

  const tableRows = paginatedAssignments.map((assignment) => ({
    id: assignment.id,
    customer: assignment.customer,
    parent: assignment.parent,
    raw: assignment,
  }))

  const totalPages = Math.max(1, Math.ceil(assignments.length / ITEMS_PER_PAGE))

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* @ts-ignore - Header is a JSX component */}
      <Header
        title="Customer Assignment"
        subtitle="Manage customer-parent relationships and hierarchical assignments"
        dropdownOptions={[
          { label: 'Import from Excel' },
          { label: 'Export to Excel' },
          { label: 'Download Format' },
        ]}
        hideAddButton={true}
      />

      {/* @ts-ignore - CommonTable is a JSX component */}
      <CommonTable
        data={tableRows}
        emptyMessage="No customer assignments found."
        minWidth="900px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '120px' },
          { key: 'customer', label: 'Customer', width: '300px' },
          { key: 'parent', label: 'Parent', width: '300px' },
        ]}
        renderActions={(row: any) => (
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

      {selectedAssignment && (
        <>
          <ViewAlert
            isOpen={activeModal === 'view'}
            onClose={closeModal}
            title="Customer Assignment Details"
            message="View the details of the selected customer assignment"
            fields={{
              ID: selectedAssignment.id,
              Customer: selectedAssignment.customer,
              Parent: selectedAssignment.parent,
            }}
          />

          <EditAlert
            isOpen={activeModal === 'edit'}
            onClose={closeModal}
            title="Edit Customer Assignment"
            message="Update the customer assignment details"
            fields={{
              customer: selectedAssignment.customer,
              parent: selectedAssignment.parent,
            }}
            onSave={handleSaveEdit}
          />

          <DeleteAlert
            isOpen={activeModal === 'delete'}
            onClose={closeModal}
            title="Delete Customer Assignment?"
            message={`Do you really want to delete the assignment for ${selectedAssignment.customer}?`}
            onConfirm={handleDelete}
          />
        </>
      )}
    </div>
  )
}
