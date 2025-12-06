/**
 * Master Data Edit Alert Component
 * 
 * Generic edit dialog for updating entity details
 * Reusable across all master data pages
 */

'use client'

import { useState, useEffect } from 'react'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { BaseMasterEntity } from './types'

interface EditAlertProps<T extends BaseMasterEntity> {
  isOpen: boolean
  onClose: () => void
  entity: T | null
  entityName: string
  onSave: (id: number, name: string, additionalData?: Partial<T>) => void | Promise<void>
  additionalFields?: React.ReactNode // For custom fields beyond name
}

export function EditAlert<T extends BaseMasterEntity>({
  isOpen,
  onClose,
  entity,
  entityName,
  onSave,
  additionalFields,
}: EditAlertProps<T>) {
  const [editedName, setEditedName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Populate form when entity changes
  useEffect(() => {
    if (entity && isOpen) {
      setEditedName(entity.name)
    }
  }, [entity, isOpen])

  // Handle save action
  const handleSave = async () => {
    if (!entity || !editedName.trim()) return

    setIsSubmitting(true)
    
    try {
      await onSave(entity.id, editedName.trim())
      onClose()
    } catch (error) {
      console.error(`Failed to update ${entityName.toLowerCase()}:`, error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle cancel
  const handleCancel = () => {
    setEditedName('')
    onClose()
  }

  if (!entity) return null

  return (
    <Alert open={isOpen} onClose={handleCancel}>
      <AlertTitle>Edit {entityName}</AlertTitle>
      <AlertDescription>
        Update the {entityName.toLowerCase()} information below.
      </AlertDescription>
      <AlertBody>
        <div className="space-y-4">
          <div className="space-y-2">
            <label 
              htmlFor="editEntityName" 
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              {entityName} Name
            </label>
            <Input
              id="editEntityName"
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
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
        <Button color="dark/zinc" onClick={handleSave} disabled={!editedName.trim() || isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </AlertActions>
    </Alert>
  )
}

