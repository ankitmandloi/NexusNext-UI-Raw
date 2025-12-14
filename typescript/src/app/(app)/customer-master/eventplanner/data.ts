export type EventPlanner = {
  id: string
  eventType: string
  eventRemark: string
  expectedInvitees: number
  budgetPerInvitee: number
  budgetaryAttachment: string
  eventDate: string
  status: string
  sharedOrCompanyPaid: string
  companyRatio: number
  partnerAssociation: string
  actualExpense: number
  billAttachment: string
  eventByEmployee: string
}

export type EventType = {
  id: number
  name: string
}

export type EventStatus = {
  id: number
  name: string
}

export type Employee = {
  id: number
  name: string
}

export type Partner = {
  id: number
  name: string
}

export const eventTypes: EventType[] = [
  { id: 1, name: 'Product Launch' },
  { id: 2, name: 'Annual Conference' },
  { id: 3, name: 'Team Building' },
  { id: 4, name: 'Client Appreciation' },
  { id: 5, name: 'Trade Show' },
  { id: 6, name: 'Networking Event' },
  { id: 7, name: 'Awards Ceremony' },
  { id: 8, name: 'Seminar' },
  { id: 9, name: 'Workshop' },
  { id: 10, name: 'Corporate Dinner' },
]

export const eventStatuses: EventStatus[] = [
  { id: 1, name: 'Planning' },
  { id: 2, name: 'Approved' },
  { id: 3, name: 'In Progress' },
  { id: 4, name: 'Completed' },
  { id: 5, name: 'Cancelled' },
  { id: 6, name: 'Postponed' },
]

export const employees: Employee[] = [
  { id: 1, name: 'John Smith' },
  { id: 2, name: 'Sarah Johnson' },
  { id: 3, name: 'Michael Brown' },
  { id: 4, name: 'Emily Davis' },
  { id: 5, name: 'David Wilson' },
  { id: 6, name: 'Jennifer Martinez' },
  { id: 7, name: 'Robert Anderson' },
  { id: 8, name: 'Lisa Taylor' },
  { id: 9, name: 'James Thomas' },
  { id: 10, name: 'Mary Jackson' },
]

export const partners: Partner[] = [
  { id: 1, name: 'Global Tech Solutions' },
  { id: 2, name: 'Innovation Partners LLC' },
  { id: 3, name: 'Premier Events Co.' },
  { id: 4, name: 'Strategic Alliance Group' },
  { id: 5, name: 'Corporate Partners Inc.' },
  { id: 6, name: 'Business Associates Ltd.' },
  { id: 7, name: 'Enterprise Collaborators' },
  { id: 8, name: 'Industry Leaders Network' },
]

export const initialEventPlanners: EventPlanner[] = [
  {
    id: 'EP-001',
    eventType: 'Product Launch',
    eventRemark: 'Launch of new product line with key stakeholders and media coverage',
    expectedInvitees: 150,
    budgetPerInvitee: 250,
    budgetaryAttachment: 'budget_product_launch.pdf',
    eventDate: '2025-02-15',
    status: 'Planning',
    sharedOrCompanyPaid: 'Company Paid',
    companyRatio: 100,
    partnerAssociation: 'Global Tech Solutions',
    actualExpense: 0,
    billAttachment: '',
    eventByEmployee: 'John Smith',
  },
  {
    id: 'EP-002',
    eventType: 'Annual Conference',
    eventRemark: 'Yearly conference for all regional managers and department heads',
    expectedInvitees: 200,
    budgetPerInvitee: 350,
    budgetaryAttachment: 'budget_annual_conf.pdf',
    eventDate: '2025-03-20',
    status: 'Approved',
    sharedOrCompanyPaid: 'Shared',
    companyRatio: 70,
    partnerAssociation: 'Innovation Partners LLC',
    actualExpense: 0,
    billAttachment: '',
    eventByEmployee: 'Sarah Johnson',
  },
  {
    id: 'EP-003',
    eventType: 'Team Building',
    eventRemark: 'Quarterly team building activity for sales department',
    expectedInvitees: 50,
    budgetPerInvitee: 150,
    budgetaryAttachment: 'budget_team_building.pdf',
    eventDate: '2025-01-28',
    status: 'In Progress',
    sharedOrCompanyPaid: 'Company Paid',
    companyRatio: 100,
    partnerAssociation: 'Premier Events Co.',
    actualExpense: 6500,
    billAttachment: 'bill_team_building.pdf',
    eventByEmployee: 'Michael Brown',
  },
  {
    id: 'EP-004',
    eventType: 'Client Appreciation',
    eventRemark: 'Thank you event for top 50 clients of the year',
    expectedInvitees: 75,
    budgetPerInvitee: 400,
    budgetaryAttachment: 'budget_client_appreciation.pdf',
    eventDate: '2025-04-10',
    status: 'Planning',
    sharedOrCompanyPaid: 'Shared',
    companyRatio: 60,
    partnerAssociation: 'Strategic Alliance Group',
    actualExpense: 0,
    billAttachment: '',
    eventByEmployee: 'Emily Davis',
  },
  {
    id: 'EP-005',
    eventType: 'Trade Show',
    eventRemark: 'International trade show booth and networking event',
    expectedInvitees: 300,
    budgetPerInvitee: 200,
    budgetaryAttachment: 'budget_trade_show.pdf',
    eventDate: '2025-05-15',
    status: 'Approved',
    sharedOrCompanyPaid: 'Shared',
    companyRatio: 80,
    partnerAssociation: 'Corporate Partners Inc.',
    actualExpense: 0,
    billAttachment: '',
    eventByEmployee: 'David Wilson',
  },
  {
    id: 'EP-006',
    eventType: 'Networking Event',
    eventRemark: 'Business networking mixer with industry professionals',
    expectedInvitees: 100,
    budgetPerInvitee: 180,
    budgetaryAttachment: 'budget_networking.pdf',
    eventDate: '2025-02-05',
    status: 'Completed',
    sharedOrCompanyPaid: 'Company Paid',
    companyRatio: 100,
    partnerAssociation: 'Business Associates Ltd.',
    actualExpense: 17800,
    billAttachment: 'bill_networking.pdf',
    eventByEmployee: 'Jennifer Martinez',
  },
  {
    id: 'EP-007',
    eventType: 'Awards Ceremony',
    eventRemark: 'Annual employee recognition and awards ceremony',
    expectedInvitees: 250,
    budgetPerInvitee: 300,
    budgetaryAttachment: 'budget_awards.pdf',
    eventDate: '2025-06-20',
    status: 'Planning',
    sharedOrCompanyPaid: 'Company Paid',
    companyRatio: 100,
    partnerAssociation: 'Enterprise Collaborators',
    actualExpense: 0,
    billAttachment: '',
    eventByEmployee: 'Robert Anderson',
  },
  {
    id: 'EP-008',
    eventType: 'Seminar',
    eventRemark: 'Industry insights seminar with guest speakers',
    expectedInvitees: 120,
    budgetPerInvitee: 220,
    budgetaryAttachment: 'budget_seminar.pdf',
    eventDate: '2025-03-08',
    status: 'Approved',
    sharedOrCompanyPaid: 'Shared',
    companyRatio: 75,
    partnerAssociation: 'Industry Leaders Network',
    actualExpense: 0,
    billAttachment: '',
    eventByEmployee: 'Lisa Taylor',
  },
  {
    id: 'EP-009',
    eventType: 'Workshop',
    eventRemark: 'Skill development workshop for technical team',
    expectedInvitees: 60,
    budgetPerInvitee: 280,
    budgetaryAttachment: 'budget_workshop.pdf',
    eventDate: '2025-02-25',
    status: 'In Progress',
    sharedOrCompanyPaid: 'Company Paid',
    companyRatio: 100,
    partnerAssociation: 'Global Tech Solutions',
    actualExpense: 15200,
    billAttachment: 'bill_workshop.pdf',
    eventByEmployee: 'James Thomas',
  },
  {
    id: 'EP-010',
    eventType: 'Corporate Dinner',
    eventRemark: 'Executive leadership dinner with board members',
    expectedInvitees: 40,
    budgetPerInvitee: 500,
    budgetaryAttachment: 'budget_dinner.pdf',
    eventDate: '2025-04-30',
    status: 'Planning',
    sharedOrCompanyPaid: 'Company Paid',
    companyRatio: 100,
    partnerAssociation: 'Strategic Alliance Group',
    actualExpense: 0,
    billAttachment: '',
    eventByEmployee: 'Mary Jackson',
  },
]
