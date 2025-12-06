/**
 * Master Data Component Types
 * 
 * Generic types and interfaces for master data CRUD operations
 * Used across all master data pages (State, District, City, Pincode, etc.)
 */

// ============================================================================
// BASE ENTITY INTERFACE
// ============================================================================

/**
 * Base interface for all master data entities
 * Extend this for specific entities
 */
export interface BaseMasterEntity {
  id: number
  name: string
  [key: string]: any // Allow additional properties
}

// ============================================================================
// MODAL TYPES
// ============================================================================

/**
 * Modal types for CRUD operations
 */
export type ModalType = 'view' | 'edit' | 'delete' | 'add' | null

// ============================================================================
// CRUD OPERATION CALLBACKS
// ============================================================================

/**
 * Callback types for CRUD operations
 */
export interface CrudCallbacks<T extends BaseMasterEntity> {
  onAdd?: (name: string, additionalData?: Partial<T>) => void | Promise<void>
  onEdit?: (id: number, name: string, additionalData?: Partial<T>) => void | Promise<void>
  onDelete?: (id: number) => void | Promise<void>
  onView?: (entity: T) => void
}

// ============================================================================
// TABLE COLUMN CONFIGURATION
// ============================================================================

/**
 * Configuration for table columns
 */
export interface ColumnConfig {
  key: string
  label: string
  width: string // Tailwind width class (e.g., 'w-[15%]')
  align?: 'left' | 'center' | 'right'
  render?: (value: any, entity: BaseMasterEntity) => React.ReactNode
}

// ============================================================================
// MASTER DATA PAGE CONFIG
// ============================================================================

/**
 * Configuration for a master data page
 */
export interface MasterDataConfig<T extends BaseMasterEntity> {
  entityName: string // e.g., "State", "District", "City"
  entityNamePlural: string // e.g., "States", "Districts", "Cities"
  columns: ColumnConfig[]
  apiEndpoints?: {
    list?: string
    create?: string
    update?: string
    delete?: string
    import?: string
    export?: string
    template?: string
  }
}

