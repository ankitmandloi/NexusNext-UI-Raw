// @ts-nocheck
'use client'

import { useEffect, useMemo, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import CommonTable from '@/app/(app)/basic-master/address-master/common/components/Table.jsx'
import CommonPagination from '@/app/(app)/basic-master/address-master/common/components/Pagination.jsx'
import Actions from '@/app/(app)/basic-master/address-master/common/components/Actions.jsx'
import {
  DeleteAlert,
  EditAlert,
  ViewAlert,
} from '@/app/(app)/basic-master/address-master/common/components/Alert.jsx'
import { Button } from '@/components/button'
import { GeneratedCoupon, initialGeneratedCoupons } from './data'

const ITEMS_PER_PAGE = 10

function GenerateCouponContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const profileId = searchParams.get('profileId')
  const profileName = searchParams.get('profileName') || 'Unknown Profile'

  const [coupons, setCoupons] = useState<GeneratedCoupon[]>(
    initialGeneratedCoupons.filter((c) => c.profile === decodeURIComponent(profileName))
  )
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [selectedCoupon, setSelectedCoupon] = useState<GeneratedCoupon | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(coupons.length / ITEMS_PER_PAGE))
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [coupons, currentPage])

  const paginatedCoupons = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return coupons.slice(start, start + ITEMS_PER_PAGE)
  }, [coupons, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const openModal = (type: string, payload?: GeneratedCoupon) => {
    setActiveModal(type)
    setSelectedCoupon(payload ?? null)
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedCoupon(null)
  }

  const handleSaveEdit = (editForm: any) => {
    if (!selectedCoupon) return

    setCoupons((prev) =>
      prev.map((coupon) =>
        coupon.id === selectedCoupon.id
          ? {
              ...coupon,
              quantity: editForm.quantity ? Number(editForm.quantity) : coupon.quantity,
            }
          : coupon
      )
    )
  }

  const handleDelete = () => {
    if (!selectedCoupon) return
    setCoupons((prev) => prev.filter((coupon) => coupon.id !== selectedCoupon.id))
  }

  const handleBack = () => {
    router.push('/schema/coupon-schema')
  }

  const tableRows = paginatedCoupons.map((coupon) => ({
    id: coupon.id,
    profile: coupon.profile,
    productType: coupon.productType,
    product: coupon.product,
    category: coupon.category,
    quantity: coupon.quantity,
    raw: coupon,
  }))

  const totalPages = Math.max(1, Math.ceil(coupons.length / ITEMS_PER_PAGE))

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 110px)' }}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-950/10 px-4 py-4 dark:border-white/10">
        <div className="flex items-center gap-4">
          <Button plain onClick={handleBack}>
            ← Back
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-zinc-950 dark:text-white">Generate Coupon</h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Profile: {decodeURIComponent(profileName)} (ID: {profileId})
            </p>
          </div>
        </div>
      </div>

      {/* @ts-ignore - CommonTable is a JSX component */}
      <CommonTable
        data={tableRows}
        emptyMessage="No generated coupons found for this profile."
        minWidth="1200px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '100px' },
          { key: 'profile', label: 'Profile', width: '180px' },
          { key: 'productType', label: 'Product Type', width: '150px' },
          { key: 'product', label: 'Product', width: '150px' },
          { key: 'category', label: 'Category', width: '130px' },
          { key: 'quantity', label: 'Quantity', width: '110px' },
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

      {selectedCoupon && (
        <>
          <ViewAlert
            isOpen={activeModal === 'view'}
            onClose={closeModal}
            title="Generated Coupon Details"
            message="View the details of the generated coupon"
            fields={{
              ID: selectedCoupon.id,
              Profile: selectedCoupon.profile,
              'Product Type': selectedCoupon.productType,
              Product: selectedCoupon.product,
              Category: selectedCoupon.category,
              Quantity: selectedCoupon.quantity,
            }}
          />

          <EditAlert
            isOpen={activeModal === 'edit'}
            onClose={closeModal}
            title="Edit Generated Coupon"
            message="Update the coupon quantity"
            fields={{
              quantity: selectedCoupon.quantity,
            }}
            onSave={handleSaveEdit}
          />

          <DeleteAlert
            isOpen={activeModal === 'delete'}
            onClose={closeModal}
            title="Delete Generated Coupon?"
            message={`Do you really want to delete the generated coupon ${selectedCoupon.id}?`}
            onConfirm={handleDelete}
          />
        </>
      )}
    </div>
  )
}

export default function GenerateCouponPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <GenerateCouponContent />
    </Suspense>
  )
}
