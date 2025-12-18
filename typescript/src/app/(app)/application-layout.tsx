'use client'

import { Avatar } from '@/components/avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/dropdown'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from '@/components/sidebar'
import { SidebarLayout } from '@/components/sidebar-layout'
import { Transition } from '@headlessui/react'
import {
  ArrowRightStartOnRectangleIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid'
import { ChevronRightIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

type SidebarMenuItem = {
  label: string
  children?: SidebarMenuItem[]
}

const sidebarMenu: SidebarMenuItem[] = [
  {
    label: 'Basic Master',
    children: [
      {
        label: 'Address Master',
        children: [
          { label: 'State' },
          { label: 'District' },
          { label: 'City' },
          { label: 'Pin Code' },
          { label: 'Territory / Zones / Regions' },
          { label: 'Region Assignment' },
        ],
      },
      { label: 'Product & Categories' },
      { label: 'Customer Type' },
      { label: 'Group' },
      { label: 'Group Tag' },
    ],
  },
  {
    label: 'Employee Manager',
    children: [
      {
        label: 'Employees',
        children: [{ label: 'Employee Master' }, { label: 'Employee Designation' }],
      },
      {
        label: 'HRMS',
        children: [{ label: 'Attendance' }, { label: 'Leave' }, { label: 'Visit Details' }, { label: 'Claims' }],
      },
      { label: 'Visit Miscellaneous' },
      { label: 'Area Master' },
      { label: 'Planned Beat' },
      { label: 'Goal Setting' },
      { label: 'Feeds' },
    ],
  },
  {
    label: 'Expense & Tour',
    children: [{ label: 'Local / Outstation Expense' }],
  },
  {
    label: 'Expense Policy',
    children: [{ label: 'Expense Type' }, { label: 'Expense Policy' }, { label: 'Expense Cities' }],
  },
  {
    label: 'Customer Master',
    children: [
      { label: 'Customer' },
      { label: 'Customer Assignment' },
      { label: 'Shop Audit' },
      { label: 'Eventplanner' },
    ],
  },
  {
    label: 'Schema',
    children: [
      {
        label: 'Coupon Schema',
        children: [
          { label: 'Coupon Profile' },
          { label: 'Coupon' },
          { label: 'Dispatch' },
          { label: 'Scheme' },
          { label: 'Transactions - Coupon' },
          { label: 'Check Allocation' },
        ],
      },
      {
        label: 'Invoice Schema',
        children: [
          { label: 'Scheme' },
          { label: 'Invoice' },
          { label: 'Order' },
        ],
      },
      {
        label: 'Lead Schema',
        children: [
          { label: 'Lead Manager' },
          { label: 'Lead Contacts' },
          { label: 'Activity Type' },
          { label: 'Lead Scheme' },
        ],
      },
      {
        label: 'Ledger & Credit',
        children: [
          { label: 'Point Ledger' },
          { label: 'CreditNote' },
        ],
      },
    ],
  },
  {
    label: 'Redemption',
    children: [
      { label: 'Redemption Setting' },
      { label: 'Redemption Details' },
      { label: 'Single / Bulk Payout' },
      { label: 'Extra Reward' },
      {
        label: 'Procure And Dispatch',
        children: [
          { label: 'Voucher Inventory' },
          { label: 'Gift Dispatch Details' },
        ],
      },
    ],
  },
  {
    label: 'Reward Manager',
    children: [
      {
        label: 'Rewards',
        children: [
          { label: 'Primary Category' },
          { label: 'Base Category' },
          { label: 'Products' },
        ],
      },
    ],
  },
  {
    label: 'Miscellaneous',
    children: [
      {
        label: 'Ticket Management',
        children: [
          { label: 'Ticket Status' },
          { label: 'Ticket Tags' },
          { label: 'Ticket' },
        ],
      },
      {
        label: 'Communication',
        children: [
          { label: 'Banner Info' },
          { label: 'Terms And Conditions' },
          { label: 'Push Notification' },
          { label: 'Testimonial' },
        ],
      },
      {
        label: 'User Management',
        children: [
          { label: 'Roles' },
          { label: 'Users' },
        ],
      },
    ],
  },
  {
    label: 'Integrations',
    children: [
      {
        label: 'DMS Integration',
        children: [
          { label: 'Distributor' },
          { label: 'Retailer' },
          { label: 'Invoice Transaction' },
        ],
      },
    ],
  },
  {
    label: 'Settings',
    children: [{ label: 'Branding' }, { label: 'Organization Profile' }, { label: 'KYC' }],
  },
]

const INDENTATION_CLASSES = ['pl-0', 'pl-4', 'pl-8', 'pl-12', 'pl-16', 'pl-20'] as const

function slugify(label: string): string {
  return label
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

function deriveOpenGroups(pathname: string): Set<string> {
  let segments = pathname.split('/').filter(Boolean)
  let keys = new Set<string>()
  let accumulator: string[] = []

  for (let segment of segments) {
    accumulator.push(segment)
    keys.add(`/${accumulator.join('/')}`)
  }

  return keys
}

type MenuListProps = {
  items?: SidebarMenuItem[]
  depth?: number
  parentSegments?: string[]
  pathname: string
  openGroups: Set<string>
  onToggle: (key: string) => void
  selectedPath: string
}

function MenuList({
  items = [],
  depth = 0,
  parentSegments = [],
  pathname,
  openGroups,
  onToggle,
  selectedPath,
}: MenuListProps) {
  if (!items.length) return null

  let indentClass = INDENTATION_CLASSES[Math.min(depth, INDENTATION_CLASSES.length - 1)]

  return (
    <div className="flex flex-col">
      {items.map((item) => {
        let segments = [...parentSegments, slugify(item.label)]
        let href = `/${segments.join('/')}`
        let hasChildren = Boolean(item.children?.length)
        let isOpen = hasChildren ? openGroups.has(href) : false
        let isSelected = selectedPath === href
        let isChildSelected = hasChildren && selectedPath?.startsWith(href + '/')
        let isCurrent = isSelected || (hasChildren && (isOpen || isChildSelected))

        return (
          <div key={href} className="flex flex-col">
            <div className={indentClass}>
              <SidebarItem
                href={hasChildren ? undefined : href}
                onClick={hasChildren ? () => onToggle(href) : undefined}
                current={isCurrent}
              >
                <SidebarLabel>{item.label}</SidebarLabel>
                {hasChildren && (
                  <ChevronRightIcon
                    className={clsx(
                      'ml-auto size-4 shrink-0 text-zinc-400 transition-transform duration-200 ease-out dark:text-zinc-500',
                      isOpen && 'rotate-90 text-zinc-600 dark:text-zinc-300'
                    )}
                  />
                )}
              </SidebarItem>
            </div>
            {hasChildren && (
              <Transition
                as={Fragment}
                show={isOpen}
                enter="transition-all duration-200 ease-out origin-top"
                enterFrom="opacity-0 scale-y-95 max-h-0"
                enterTo="opacity-100 scale-y-100 max-h-[1000px]"
                leave="transition-all duration-150 ease-in origin-top"
                leaveFrom="opacity-100 scale-y-100 max-h-[1000px]"
                leaveTo="opacity-0 scale-y-95 max-h-0"
              >
                <div className="overflow-hidden">
                  <MenuList
                    items={item.children}
                    depth={depth + 1}
                    parentSegments={segments}
                    pathname={pathname}
                    openGroups={openGroups}
                    onToggle={onToggle}
                    selectedPath={selectedPath}
                  />
                </div>
              </Transition>
            )}
          </div>
        )
      })}
    </div>
  )
}

function AccountDropdownMenu({ anchor }: { anchor: 'top start' | 'bottom end' }) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="#">
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ShieldCheckIcon />
        <DropdownLabel>Privacy policy</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <LightBulbIcon />
        <DropdownLabel>Share feedback</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/login">
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}

export function ApplicationLayout({ children }: { children: React.ReactNode }) {
  let pathname = usePathname()
  let [selectedPath, setSelectedPath] = useState(pathname)
  let [openGroups, setOpenGroups] = useState<Set<string>>(() => deriveOpenGroups(pathname))

  useEffect(() => {
    setSelectedPath(pathname)
    setOpenGroups((prev) => {
      let next = new Set(prev)
      for (let key of deriveOpenGroups(pathname)) {
        next.add(key)
      }
      return next
    })
  }, [pathname])

  let toggleGroup = useCallback((key: string) => {
    setOpenGroups((prev) => {
      let next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }, [])

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src="/users/erica.jpg" square />
              </DropdownButton>
              <AccountDropdownMenu anchor="bottom end" />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-900 dark:bg-white">
                <span className="text-sm font-bold text-white dark:text-zinc-900">N</span>
              </div>
              <span className="text-base font-semibold tracking-tight text-zinc-900 dark:text-white">
                Nexus Next
              </span>
            </div>
          </SidebarHeader>
          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/home" current={selectedPath === '/home' || selectedPath === '/'}>
                <SidebarLabel>Home</SidebarLabel>
              </SidebarItem>
              {sidebarMenu.map((section, index) => {
                let baseSegments = [slugify(section.label)]

                return (
                  <div key={section.label} className={index === 0 ? 'mt-4' : 'mt-6'}>
                    <SidebarHeading>{section.label}</SidebarHeading>
                    <MenuList
                      items={section.children}
                      parentSegments={baseSegments}
                      pathname={pathname}
                      openGroups={openGroups}
                      onToggle={toggleGroup}
                      selectedPath={selectedPath}
                    />
                  </div>
                )
              })}
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}
