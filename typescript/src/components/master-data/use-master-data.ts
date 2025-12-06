/**
 * Master Data Hook
 * 
 * Custom React hook for managing master data state and operations
 * Provides consistent CRUD functionality across all master data pages
 */

'use client'

import { useState } from 'react'
import { BaseMasterEntity, ModalType } from './types'

export function useMasterData<T extends BaseMasterEntity>(initialData: T[]) {
  // State management
  const [entities, setEntities] = useState<T[]>(initialData)
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [selectedEntity, setSelectedEntity] = useState<T | null>(null)

  // ============================================================================
  // MODAL HANDLERS
  // ============================================================================

  const openViewModal = (entity: T) => {
    setSelectedEntity(entity)
    setActiveModal('view')
  }

  const openEditModal = (entity: T) => {
    setSelectedEntity(entity)
    setActiveModal('edit')
  }

  const openDeleteModal = (entity: T) => {
    setSelectedEntity(entity)
    setActiveModal('delete')
  }

  const openAddModal = () => {
    setActiveModal('add')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedEntity(null)
  }

  // ============================================================================
  // CRUD OPERATIONS
  // ============================================================================

  /**
   * Add a new entity to the list
   * In production, this should call your API and update after success
   */
  const addEntity = (name: string, additionalData?: Partial<T>) => {
    // Generate temporary ID (replace with API response in production)
    const newId = entities.length > 0 ? Math.max(...entities.map(e => e.id)) + 1 : 1
    const newEntity = { id: newId, name, ...additionalData } as T
    setEntities((prev) => [...prev, newEntity])
  }

  /**
   * Update an existing entity in the list
   * In production, this should call your API and update after success
   */
  const updateEntity = (id: number, name: string, additionalData?: Partial<T>) => {
    setEntities((prev) =>
      prev.map((entity) =>
        entity.id === id ? { ...entity, name, ...additionalData } : entity
      )
    )
  }

  /**
   * Delete an entity from the list
   * In production, this should call your API and update after success
   */
  const deleteEntity = (id: number) => {
    setEntities((prev) => prev.filter((entity) => entity.id !== id))
  }

  // ============================================================================
  // RETURN VALUES
  // ============================================================================

  return {
    // State
    entities,
    activeModal,
    selectedEntity,
    
    // Modal controls
    openViewModal,
    openEditModal,
    openDeleteModal,
    openAddModal,
    closeModal,
    
    // CRUD operations
    addEntity,
    updateEntity,
    deleteEntity,
    
    // Direct state setters (for advanced use cases)
    setEntities,
  }
}

