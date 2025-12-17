// Sample data for Lead Contacts
export type LeadContact = {
  id: string
  personName: string
  mobileNumber: string
  emailAddress: string
  designation: string
  contactType: string
}

// Contact Type Options
export const contactTypeOptions = [
  { id: '1', name: 'Retailer' },
  { id: '2', name: 'Distributor' },
  { id: '3', name: 'Mechanic' },
  { id: '4', name: 'Plant' },
  { id: '5', name: 'Fleet Owner' },
  { id: '6', name: 'Contractor' },
  { id: '7', name: 'Builder' },
  { id: '8', name: 'Architect' },
  { id: '9', name: 'Other' },
]

// Initial sample contacts
export const initialContacts: LeadContact[] = [
  {
    id: 'LC001',
    personName: 'Rajesh Kumar',
    mobileNumber: '+91 9876543210',
    emailAddress: 'rajesh.kumar@example.com',
    designation: 'Owner',
    contactType: 'Retailer',
  },
  {
    id: 'LC002',
    personName: 'Amit Sharma',
    mobileNumber: '+91 9876543211',
    emailAddress: 'amit.sharma@example.com',
    designation: 'Project Manager',
    contactType: 'Distributor',
  },
  {
    id: 'LC003',
    personName: 'Priya Singh',
    mobileNumber: '+91 9876543212',
    emailAddress: 'priya.singh@example.com',
    designation: 'Site Engineer',
    contactType: 'Contractor',
  },
  {
    id: 'LC004',
    personName: 'Suresh Patel',
    mobileNumber: '+91 9876543213',
    emailAddress: 'suresh.patel@example.com',
    designation: 'Senior Mechanic',
    contactType: 'Mechanic',
  },
  {
    id: 'LC005',
    personName: 'Neha Gupta',
    mobileNumber: '+91 9876543214',
    emailAddress: 'neha.gupta@example.com',
    designation: 'Chief Architect',
    contactType: 'Architect',
  },
]
