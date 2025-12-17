// Sample data for Lead Manager
export type LeadContact = {
  id: string
  personName: string
  mobileNumber: string
  emailAddress: string
  designation: string
  contactType: string
}

export type Lead = {
  id: string
  leadTitle: string
  leadID: string
  leadDate: string
  leadDescription: string
  leadType: string
  leadPriority: string
  leadSource: string
  leadStatus: string
  leadScope: string
  leadEstimate: number
  leadAddress: string
  estimatedDeliveryDate: string
  attachment: string | null
  leadPartnerAssigned: string[]
  nextFollowupDate: string
  contacts: LeadContact[]
}

// Lead Source Options
export const leadSourceOptions = [
  { id: '1', name: 'Website' },
  { id: '2', name: 'Referral' },
  { id: '3', name: 'Direct Call' },
  { id: '4', name: 'Email Campaign' },
  { id: '5', name: 'Social Media' },
  { id: '6', name: 'Trade Show' },
]

// Lead Scope Options
export const leadScopeOptions = [
  { id: '1', name: 'Small' },
  { id: '2', name: 'Medium' },
  { id: '3', name: 'Large' },
  { id: '4', name: 'Enterprise' },
]

// Lead Type Options
export const leadTypeOptions = [
  { id: '1', name: 'Residential' },
  { id: '2', name: 'Commercial' },
  { id: '3', name: 'Other' },
]

// Lead Priority Options
export const leadPriorityOptions = [
  { id: '1', name: 'Bricking' },
  { id: '2', name: 'Plastering' },
  { id: '3', name: 'Wiring' },
  { id: '4', name: 'Installing' },
]

// Lead Status Options
export const leadStatusOptions = [
  { id: '1', name: 'New' },
  { id: '2', name: 'Contacted' },
  { id: '3', name: 'Qualified' },
  { id: '4', name: 'Negotiation' },
  { id: '5', name: 'Won' },
  { id: '6', name: 'Lost' },
]

// Contact Type Options
export const contactTypeOptions = [
  { id: '1', name: 'Retailer' },
  { id: '2', name: 'Distributor' },
  { id: '3', name: 'Mechanic' },
  { id: '4', name: 'Plant' },
  { id: '5', name: 'Fleet Owner' },
  { id: '6', name: 'Other' },
]

// Available Partners for multiselect
export const availablePartners = [
  { id: 'P001', name: 'Partner A' },
  { id: 'P002', name: 'Partner B' },
  { id: 'P003', name: 'Partner C' },
  { id: 'P004', name: 'Partner D' },
  { id: 'P005', name: 'Partner E' },
]

// Available Employees for multiselect
export const availableEmployees = [
  { id: 'E001', name: 'John Doe' },
  { id: 'E002', name: 'Jane Smith' },
  { id: 'E003', name: 'Robert Johnson' },
  { id: 'E004', name: 'Emily Davis' },
  { id: 'E005', name: 'Michael Brown' },
]

// Initial sample leads
export const initialLeads: Lead[] = [
  {
    id: 'L001',
    leadTitle: 'New Residential Construction',
    leadID: 'LEAD-2024-001',
    leadDate: '15/12/2024',
    leadDescription: 'Construction of 3 bedroom residential apartment',
    leadType: 'Residential',
    leadPriority: 'Bricking',
    leadSource: 'Website',
    leadStatus: 'New',
    leadScope: 'Medium',
    leadEstimate: 250000,
    leadAddress: '123 Main Street, Mumbai, Maharashtra',
    estimatedDeliveryDate: '15/03/2025',
    attachment: null,
    leadPartnerAssigned: ['Partner A', 'Partner B'],
    nextFollowupDate: '20/12/2024',
    contacts: [
      {
        id: 'C001',
        personName: 'Rajesh Kumar',
        mobileNumber: '+91 9876543210',
        emailAddress: 'rajesh@example.com',
        designation: 'Owner',
        contactType: 'Retailer',
      },
    ],
  },
  {
    id: 'L002',
    leadTitle: 'Commercial Building Wiring',
    leadID: 'LEAD-2024-002',
    leadDate: '14/12/2024',
    leadDescription: 'Complete electrical wiring for commercial plaza',
    leadType: 'Commercial',
    leadPriority: 'Wiring',
    leadSource: 'Referral',
    leadStatus: 'Contacted',
    leadScope: 'Large',
    leadEstimate: 500000,
    leadAddress: '456 Business Park, Delhi, Delhi',
    estimatedDeliveryDate: '30/04/2025',
    attachment: null,
    leadPartnerAssigned: ['Partner C'],
    nextFollowupDate: '18/12/2024',
    contacts: [
      {
        id: 'C002',
        personName: 'Amit Sharma',
        mobileNumber: '+91 9876543211',
        emailAddress: 'amit@example.com',
        designation: 'Project Manager',
        contactType: 'Distributor',
      },
    ],
  },
  {
    id: 'L003',
    leadTitle: 'Home Renovation Plastering',
    leadID: 'LEAD-2024-003',
    leadDate: '13/12/2024',
    leadDescription: 'Interior and exterior plastering work',
    leadType: 'Residential',
    leadPriority: 'Plastering',
    leadSource: 'Direct Call',
    leadStatus: 'Qualified',
    leadScope: 'Small',
    leadEstimate: 75000,
    leadAddress: '789 Park Avenue, Bangalore, Karnataka',
    estimatedDeliveryDate: '15/02/2025',
    attachment: null,
    leadPartnerAssigned: ['Partner D'],
    nextFollowupDate: '17/12/2024',
    contacts: [
      {
        id: 'C003',
        personName: 'Priya Singh',
        mobileNumber: '+91 9876543212',
        emailAddress: 'priya@example.com',
        designation: 'Owner',
        contactType: 'Retailer',
      },
    ],
  },
]
