'use client'

import { useState, useEffect } from 'react'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/dropdown'
import {
  Pagination,
  PaginationList,
} from '@/components/pagination'
import { PlusIcon, EyeIcon, PencilSquareIcon, ChevronDownIcon } from '@heroicons/react/16/solid'

// ============================================================================
// INITIAL DATA
// ============================================================================

const ITEMS_PER_PAGE = 10

const initialCustomerTypes = [
  { id: 1, name: 'Retailer' },
  { id: 2, name: 'Wholesaler' },
  { id: 3, name: 'Distributor' },
  { id: 4, name: 'End Customer' },
]

const initialCustomers = [
  { id: 1, customerName: 'ABC Retail Store', customerCode: 'CUST001', customerTypeId: 1, customerTypeName: 'Retailer', mobile: '9876543210', email: 'abc@retail.com', address: 'Mumbai, Maharashtra', status: 'Active' },
  { id: 2, customerName: 'XYZ Wholesale', customerCode: 'CUST002', customerTypeId: 2, customerTypeName: 'Wholesaler', mobile: '9876543211', email: 'xyz@wholesale.com', address: 'Delhi, NCR', status: 'Active' },
  { id: 3, customerName: 'Global Distributors', customerCode: 'CUST003', customerTypeId: 3, customerTypeName: 'Distributor', mobile: '9876543212', email: 'global@dist.com', address: 'Bangalore, Karnataka', status: 'Active' },
  { id: 4, customerName: 'Rahul Kumar', customerCode: 'CUST004', customerTypeId: 4, customerTypeName: 'End Customer', mobile: '9876543213', email: 'rahul@email.com', address: 'Pune, Maharashtra', status: 'Active' },
  { id: 5, customerName: 'Sharma Electronics', customerCode: 'CUST005', customerTypeId: 1, customerTypeName: 'Retailer', mobile: '9876543214', email: 'sharma@electronics.com', address: 'Indore, MP', status: 'Inactive' },
  { id: 6, customerName: 'Metro Wholesale', customerCode: 'CUST006', customerTypeId: 2, customerTypeName: 'Wholesaler', mobile: '9876543215', email: 'metro@wholesale.com', address: 'Chennai, TN', status: 'Active' },
  { id: 7, customerName: 'City Distributors', customerCode: 'CUST007', customerTypeId: 3, customerTypeName: 'Distributor', mobile: '9876543216', email: 'city@dist.com', address: 'Hyderabad, Telangana', status: 'Active' },
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
// ACTION BUTTON COMPONENT
// ============================================================================

function ActionButton({ children, variant, title, onClick }) {
  const variantStyles = {
    view: 'hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/10',
    edit: 'hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50 dark:hover:text-amber-400 dark:hover:border-amber-500/50 dark:hover:bg-amber-500/10',
    delete: 'hover:text-red-600 hover:border-red-300 hover:bg-red-50 dark:hover:text-red-400 dark:hover:border-red-500/50 dark:hover:bg-red-500/10',
  }

  return (
    <button type="button" title={title} onClick={onClick}
      className={`inline-flex items-center justify-center w-8 h-8 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-all duration-150 ease-in-out hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 ${variantStyles[variant]}`}
    >
      {children}
    </button>
  )
}

// ============================================================================
// MODAL COMPONENTS
// ============================================================================

function ViewCustomerAlert({ isOpen, onClose, customer }) {
  if (!customer) return null
  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Customer Details</AlertTitle>
      <AlertDescription>View the details of the selected customer below.</AlertDescription>
      <AlertBody>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex gap-2"><span className="font-medium text-zinc-700 dark:text-zinc-300">ID:</span><span className="text-zinc-600 dark:text-zinc-400">{customer.id}</span></div>
            <div className="flex gap-2"><span className="font-medium text-zinc-700 dark:text-zinc-300">Code:</span><span className="text-zinc-600 dark:text-zinc-400">{customer.customerCode}</span></div>
            <div className="flex gap-2"><span className="font-medium text-zinc-700 dark:text-zinc-300">Name:</span><span className="text-zinc-600 dark:text-zinc-400">{customer.customerName}</span></div>
            <div className="flex gap-2"><span className="font-medium text-zinc-700 dark:text-zinc-300">Type:</span><span className="text-zinc-600 dark:text-zinc-400">{customer.customerTypeName}</span></div>
            <div className="flex gap-2"><span className="font-medium text-zinc-700 dark:text-zinc-300">Mobile:</span><span className="text-zinc-600 dark:text-zinc-400">{customer.mobile}</span></div>
            <div className="flex gap-2"><span className="font-medium text-zinc-700 dark:text-zinc-300">Email:</span><span className="text-zinc-600 dark:text-zinc-400">{customer.email}</span></div>
            <div className="flex gap-2"><span className="font-medium text-zinc-700 dark:text-zinc-300">Address:</span><span className="text-zinc-600 dark:text-zinc-400">{customer.address}</span></div>
            <div className="flex gap-2"><span className="font-medium text-zinc-700 dark:text-zinc-300">Status:</span><span className={customer.status === 'Active' ? 'text-green-600' : 'text-red-600'}>{customer.status}</span></div>
          </div>
        </div>
      </AlertBody>
      <AlertActions><Button color="dark/zinc" onClick={onClose}>Close</Button></AlertActions>
    </Alert>
  )
}

function EditCustomerAlert({ isOpen, onClose, customer, customerTypes, onSave }) {
  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (customer && isOpen) {
      setFormData({ ...customer })
    }
  }, [customer, isOpen])

  const handleSave = () => {
    if (!customer || !formData.customerName?.trim()) return
    setIsSubmitting(true)
    const customerTypeName = customerTypes.find(t => t.id === formData.customerTypeId)?.name || ''
    setTimeout(() => { 
      onSave({ ...customer, ...formData, customerTypeName })
      setIsSubmitting(false)
      onClose() 
    }, 300)
  }

  const handleCancel = () => { setFormData({}); onClose() }
  if (!customer) return null

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Edit Customer</AlertTitle>
      <AlertDescription>Update the customer details below.</AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Customer Name</label>
              <Input value={formData.customerName || ''} onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))} placeholder="Enter name" autoFocus />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Customer Code</label>
              <Input value={formData.customerCode || ''} onChange={(e) => setFormData(prev => ({ ...prev, customerCode: e.target.value }))} placeholder="Enter code" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Customer Type</label>
              <select value={formData.customerTypeId || 0} onChange={(e) => setFormData(prev => ({ ...prev, customerTypeId: parseInt(e.target.value) }))} className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value={0}>Select type</option>
                {customerTypes.map((t) => (<option key={t.id} value={t.id}>{t.name}</option>))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Mobile</label>
              <Input value={formData.mobile || ''} onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))} placeholder="Enter mobile" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
              <Input value={formData.email || ''} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} placeholder="Enter email" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Status</label>
              <select value={formData.status || 'Active'} onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))} className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Address</label>
            <Input value={formData.address || ''} onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))} placeholder="Enter address" />
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>Cancel</Button>
        <Button color="dark/zinc" onClick={handleSave} disabled={!formData.customerName?.trim() || isSubmitting}>{isSubmitting ? 'Saving...' : 'Save'}</Button>
      </AlertActions>
    </Alert>
  )
}

function AddCustomerAlert({ isOpen, onClose, customerTypes, onAdd }) {
  const [formData, setFormData] = useState({ status: 'Active' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => { if (!isOpen) { setFormData({ status: 'Active' }) } }, [isOpen])

  const handleAdd = () => {
    if (!formData.customerName?.trim() || !formData.customerTypeId) return
    setIsSubmitting(true)
    const customerTypeName = customerTypes.find(t => t.id === formData.customerTypeId)?.name || ''
    setTimeout(() => { 
      onAdd({ 
        customerName: formData.customerName || '', 
        customerCode: formData.customerCode || '', 
        customerTypeId: formData.customerTypeId || 0, 
        customerTypeName, 
        mobile: formData.mobile || '', 
        email: formData.email || '', 
        address: formData.address || '', 
        status: formData.status || 'Active' 
      })
      setIsSubmitting(false)
      setFormData({ status: 'Active' })
      onClose() 
    }, 300)
  }

  const handleCancel = () => { setFormData({ status: 'Active' }); onClose() }

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Add New Customer</AlertTitle>
      <AlertDescription>Enter the details of the new customer below.</AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Customer Name *</label>
              <Input value={formData.customerName || ''} onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))} placeholder="Enter name" autoFocus />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Customer Code</label>
              <Input value={formData.customerCode || ''} onChange={(e) => setFormData(prev => ({ ...prev, customerCode: e.target.value }))} placeholder="Enter code" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Customer Type *</label>
              <select value={formData.customerTypeId || 0} onChange={(e) => setFormData(prev => ({ ...prev, customerTypeId: parseInt(e.target.value) }))} className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value={0}>Select type</option>
                {customerTypes.map((t) => (<option key={t.id} value={t.id}>{t.name}</option>))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Mobile</label>
              <Input value={formData.mobile || ''} onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))} placeholder="Enter mobile" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
              <Input value={formData.email || ''} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} placeholder="Enter email" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Status</label>
              <select value={formData.status || 'Active'} onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))} className="w-full px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Address</label>
            <Input value={formData.address || ''} onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))} placeholder="Enter address" />
          </div>
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>Cancel</Button>
        <Button color="dark/zinc" onClick={handleAdd} disabled={!formData.customerName?.trim() || !formData.customerTypeId || isSubmitting}>{isSubmitting ? 'Adding...' : 'Add'}</Button>
      </AlertActions>
    </Alert>
  )
}

function DeleteCustomerAlert({ isOpen, onClose, customer, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDelete = () => { if (!customer) return; setIsDeleting(true); setTimeout(() => { onConfirm(customer.id); setIsDeleting(false); onClose() }, 300) }
  if (!customer) return null

  return (
    <Alert open={isOpen} onClose={onClose}>
      <AlertTitle>Are you sure you want to delete this customer?</AlertTitle>
      <AlertDescription>You are about to delete <strong className="text-zinc-900 dark:text-white">{customer.customerName}</strong> ({customer.customerCode}). This action cannot be undone.</AlertDescription>
      <AlertActions>
        <Button plain onClick={onClose} disabled={isDeleting}>Cancel</Button>
        <Button color="red" onClick={handleDelete} disabled={isDeleting}>{isDeleting ? 'Deleting...' : 'Yes, Delete'}</Button>
      </AlertActions>
    </Alert>
  )
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function CustomerPage() {
  const [customers, setCustomers] = useState(initialCustomers)
  const [customerTypes] = useState(initialCustomerTypes)
  const [activeModal, setActiveModal] = useState(null)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(customers.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentCustomers = customers.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page) => setCurrentPage(page)
  const handleView = (c) => { setSelectedCustomer(c); setActiveModal('view') }
  const handleEdit = (c) => { setSelectedCustomer(c); setActiveModal('edit') }
  const handleDelete = (c) => { setSelectedCustomer(c); setActiveModal('delete') }
  const handleAddClick = () => setActiveModal('add')
  const closeModal = () => { setActiveModal(null); setSelectedCustomer(null) }

  const handleImportExcel = () => console.log('Import from Excel clicked')
  const handleExportExcel = () => console.log('Export to Excel clicked')
  const handleDownloadFormat = () => console.log('Download Format clicked')

  const handleAddCustomer = (customer) => {
    const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1
    setCustomers(prev => [...prev, { id: newId, ...customer }])
  }

  const handleSaveEdit = (customer) => {
    setCustomers(prev => prev.map(c => c.id === customer.id ? customer : c))
  }

  const handleConfirmDelete = (id) => {
    setCustomers(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 pb-4 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-sm:w-full sm:flex-1">
            <Heading>Customers</Heading>
            <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Manage all customers in the system</div>
          </div>
          <div className="flex items-center gap-3">
            <Dropdown>
              <DropdownButton outline>Your Data<ChevronDownIcon /></DropdownButton>
              <DropdownMenu>
                <DropdownItem onClick={handleImportExcel}>Import from Excel</DropdownItem>
                <DropdownItem onClick={handleExportExcel}>Export to Excel</DropdownItem>
                <DropdownItem onClick={handleDownloadFormat}>Download Format</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button color="dark/zinc" onClick={handleAddClick}><PlusIcon />Add Customer</Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col rounded-lg border border-zinc-950/10 dark:border-white/10 overflow-hidden min-h-0">
        <div className="flex-1 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
          <div className="min-w-[900px] flex flex-col h-full">
            <div className="shrink-0 border-b border-zinc-950/10 dark:border-white/10 h-11 flex items-center bg-white dark:bg-zinc-900">
              <div className="w-[80px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Code</div>
              <div className="w-[180px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Name</div>
              <div className="w-[120px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Type</div>
              <div className="w-[120px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Mobile</div>
              <div className="flex-1 px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Address</div>
              <div className="w-[90px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Status</div>
              <div className="w-[140px] px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Actions</div>
            </div>

            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600">
              {customers.length === 0 ? (
                <div className="flex items-center justify-center py-12 text-zinc-500 dark:text-zinc-400">No customers found. Click "Add Customer" to create one.</div>
              ) : (
                currentCustomers.map((customer, index) => (
                  <div key={customer.id} className={`flex items-center py-4 border-b border-zinc-950/5 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${index === currentCustomers.length - 1 ? 'border-b-0' : ''}`}>
                    <div className="w-[80px] px-4 text-sm text-zinc-500 dark:text-zinc-400 text-center">{customer.customerCode}</div>
                    <div className="w-[180px] px-4 text-sm font-medium text-zinc-950 dark:text-white text-center truncate">{customer.customerName}</div>
                    <div className="w-[120px] px-4 text-sm text-zinc-600 dark:text-zinc-400 text-center">{customer.customerTypeName}</div>
                    <div className="w-[120px] px-4 text-sm text-zinc-600 dark:text-zinc-400 text-center tabular-nums">{customer.mobile}</div>
                    <div className="flex-1 px-4 text-sm text-zinc-600 dark:text-zinc-400 text-center truncate">{customer.address}</div>
                    <div className="w-[90px] px-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${customer.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>{customer.status}</span>
                    </div>
                    <div className="w-[140px] px-4 flex items-center justify-center gap-3">
                      <ActionButton variant="view" title="View" onClick={() => handleView(customer)}><EyeIcon className="w-4 h-4" /></ActionButton>
                      <ActionButton variant="edit" title="Edit" onClick={() => handleEdit(customer)}><PencilSquareIcon className="w-4 h-4" /></ActionButton>
                      <ActionButton variant="delete" title="Delete" onClick={() => handleDelete(customer)}><DeleteIcon className="w-4 h-4" /></ActionButton>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center border-t border-zinc-950/5 dark:border-white/5 px-4 h-11 shrink-0">
          <Pagination>
            <button onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">← Previous</button>
            <PaginationList>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => handlePageChange(page)} className={`px-3 py-1 mx-1 text-sm rounded ${page === currentPage ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>{page}</button>
              ))}
            </PaginationList>
            <button onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed">Next →</button>
          </Pagination>
        </div>
      </div>

      <AddCustomerAlert isOpen={activeModal === 'add'} onClose={closeModal} customerTypes={customerTypes} onAdd={handleAddCustomer} />
      <ViewCustomerAlert isOpen={activeModal === 'view'} onClose={closeModal} customer={selectedCustomer} />
      <EditCustomerAlert isOpen={activeModal === 'edit'} onClose={closeModal} customer={selectedCustomer} customerTypes={customerTypes} onSave={handleSaveEdit} />
      <DeleteCustomerAlert isOpen={activeModal === 'delete'} onClose={closeModal} customer={selectedCustomer} onConfirm={handleConfirmDelete} />
    </div>
  )
}
