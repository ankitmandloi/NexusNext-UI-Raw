// Sample data for Activity Types
export type ActivityType = {
  id: string
  activityType: string
  status: 'Active' | 'Inactive'
}

// Initial sample activity types
export const initialActivityTypes: ActivityType[] = [
  {
    id: 'AT001',
    activityType: 'Phone Call',
    status: 'Active',
  },
  {
    id: 'AT002',
    activityType: 'Site Visit',
    status: 'Active',
  },
  {
    id: 'AT003',
    activityType: 'Email Follow-up',
    status: 'Active',
  },
  {
    id: 'AT004',
    activityType: 'Meeting',
    status: 'Active',
  },
  {
    id: 'AT005',
    activityType: 'Presentation',
    status: 'Inactive',
  },
]
