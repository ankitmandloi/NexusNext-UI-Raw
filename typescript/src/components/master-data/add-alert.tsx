/**
 * Master Data Add Alert Component
 * 
 * Generic add dialog for creating new entities
 * Reusable across all master data pages
 */

'use client'

import { useState, useEffect } from 'react'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { BaseMasterEntity } from './types'

interface AddAlertProps<T extends BaseMasterEntity> {
  isOpen: boolean
  onClose: () => void
  entityName: string
  onAdd: (name: string, additionalData?: Partial<T>) => void | Promise<void>
  additionalFields?: React.ReactNode // For custom fields beyond name
}

export function AddAlert<T extends BaseMasterEntity>({
  isOpen,
  onClose,
  entityName,
  onAdd,
  additionalFields,
}: AddAlertProps<T>) {
  const [newName, setNewName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setNewName('')
    }
  }, [isOpen])

  // Handle add action
  const handleAdd = async () => {
    if (!newName.trim()) return

    setIsSubmitting(true)
    
    try {
      await onAdd(newName.trim())
      setNewName('')
      onClose()
    } catch (error) {
      console.error(`Failed to create ${entityName.toLowerCase()}:`, error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle cancel
  const handleCancel = () => {
    setNewName('')
    onClose()
  }

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Add New {entityName}</AlertTitle>
      <AlertDescription>
        Enter the {entityName.toLowerCase()} information below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label 
              htmlFor="newEntityName" 
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              {entityName} Name
            </label>
            <Input
              id="newEntityName"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={`Enter ${entityName.toLowerCase()} name`}
              autoFocus
            />
          </div>
          {additionalFields}
        </div>
      </AlertBody>
      <AlertActions>
        <Button plain onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button color="dark/zinc" onClick={handleAdd} disabled={!newName.trim() || isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

