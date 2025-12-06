/**
 * Master Data Dropdown Component
 * 
 * "Your Data" dropdown for Import/Export operations
 * Reusable across all master data pages
 */

'use client'

import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/dropdown'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

interface DataDropdownProps {
  onImport?: () => void
  onExport?: () => void
  onDownloadTemplate?: () => void
}

export function DataDropdown({
  onImport,
  onExport,
  onDownloadTemplate,
}: DataDropdownProps) {
  const handleImport = () => {
    if (onImport) {
      onImport()
    } else {
      console.log('Import from Excel clicked')
      // TODO: Implement file upload logic
    }
  }

  const handleExport = () => {
    if (onExport) {
      onExport()
    } else {
      console.log('Export to Excel clicked')
      // TODO: Implement export logic
    }
  }

  const handleDownloadTemplate = () => {
    if (onDownloadTemplate) {
      onDownloadTemplate()
    } else {
      console.log('Download Format clicked')
      // TODO: Implement template download logic
    }
  }

  return (
    <Dropdown>
      <DropdownButton outline>
        Your Data
        <ChevronDownIcon />
      </DropdownButton>
      <DropdownMenu>
        <DropdownItem onClick={handleImport}>
          Import from Excel
        </DropdownItem>
        <DropdownItem onClick={handleExport}>
          Export to Excel
        </DropdownItem>
        <DropdownItem onClick={handleDownloadTemplate}>
          Download Format
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

