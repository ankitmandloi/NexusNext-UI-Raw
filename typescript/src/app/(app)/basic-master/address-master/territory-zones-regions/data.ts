export type Region = {
  id: string
  name: string
  slug: string
  code: string
  description: string
  status: string
}

export type Zone = {
  id: string
  name: string
  slug: string
  code: string
  description: string
  regions: Region[]
}

export type Territory = {
  id: string
  name: string
  slug: string
  description: string
  zones: Zone[]
}

export const STATUS_OPTIONS = [
  { id: 'Active', name: 'Active' },
  { id: 'Inactive', name: 'Inactive' },
]

export function slugifyLabel(label: string): string {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// Sample data
export const territoryHierarchy: Territory[] = [
  {
    id: 'TER-001',
    name: 'North Territory',
    slug: 'north-territory',
    description: 'Northern region covering Delhi, Punjab, Haryana',
    zones: [
      {
        id: 'ZN-001',
        name: 'North Zone A',
        slug: 'north-zone-a',
        code: 'NZA-01',
        description: 'Covers Delhi and surrounding areas',
        regions: [
          {
            id: 'RGN-001',
            name: 'Delhi NCR',
            slug: 'delhi-ncr',
            code: 'DNCR-01',
            description: 'National Capital Region',
            status: 'Active',
          },
          {
            id: 'RGN-002',
            name: 'Gurgaon',
            slug: 'gurgaon',
            code: 'GGN-01',
            description: 'Gurgaon and Manesar area',
            status: 'Active',
          },
          {
            id: 'RGN-003',
            name: 'Noida',
            slug: 'noida',
            code: 'NDA-01',
            description: 'Greater Noida region',
            status: 'Active',
          },
        ],
      },
      {
        id: 'ZN-002',
        name: 'North Zone B',
        slug: 'north-zone-b',
        code: 'NZB-01',
        description: 'Covers Punjab and Chandigarh',
        regions: [
          {
            id: 'RGN-004',
            name: 'Chandigarh',
            slug: 'chandigarh',
            code: 'CHD-01',
            description: 'Tricity area',
            status: 'Active',
          },
          {
            id: 'RGN-005',
            name: 'Ludhiana',
            slug: 'ludhiana',
            code: 'LDH-01',
            description: 'Industrial hub of Punjab',
            status: 'Active',
          },
        ],
      },
    ],
  },
  {
    id: 'TER-002',
    name: 'South Territory',
    slug: 'south-territory',
    description: 'Southern region covering Karnataka, Tamil Nadu, Kerala',
    zones: [
      {
        id: 'ZN-003',
        name: 'South Zone A',
        slug: 'south-zone-a',
        code: 'SZA-01',
        description: 'Covers Karnataka state',
        regions: [
          {
            id: 'RGN-006',
            name: 'Bangalore',
            slug: 'bangalore',
            code: 'BLR-01',
            description: 'IT capital of India',
            status: 'Active',
          },
          {
            id: 'RGN-007',
            name: 'Mysore',
            slug: 'mysore',
            code: 'MYS-01',
            description: 'Cultural city of Karnataka',
            status: 'Active',
          },
          {
            id: 'RGN-008',
            name: 'Mangalore',
            slug: 'mangalore',
            code: 'MNG-01',
            description: 'Coastal Karnataka region',
            status: 'Inactive',
          },
        ],
      },
      {
        id: 'ZN-004',
        name: 'South Zone B',
        slug: 'south-zone-b',
        code: 'SZB-01',
        description: 'Covers Tamil Nadu state',
        regions: [
          {
            id: 'RGN-009',
            name: 'Chennai',
            slug: 'chennai',
            code: 'CHN-01',
            description: 'Capital of Tamil Nadu',
            status: 'Active',
          },
          {
            id: 'RGN-010',
            name: 'Coimbatore',
            slug: 'coimbatore',
            code: 'CBE-01',
            description: 'Industrial city',
            status: 'Active',
          },
        ],
      },
    ],
  },
  {
    id: 'TER-003',
    name: 'East Territory',
    slug: 'east-territory',
    description: 'Eastern region covering West Bengal, Odisha, Bihar',
    zones: [
      {
        id: 'ZN-005',
        name: 'East Zone A',
        slug: 'east-zone-a',
        code: 'EZA-01',
        description: 'Covers West Bengal',
        regions: [
          {
            id: 'RGN-011',
            name: 'Kolkata',
            slug: 'kolkata',
            code: 'KOL-01',
            description: 'Capital of West Bengal',
            status: 'Active',
          },
          {
            id: 'RGN-012',
            name: 'Howrah',
            slug: 'howrah',
            code: 'HWH-01',
            description: 'Twin city of Kolkata',
            status: 'Active',
          },
        ],
      },
    ],
  },
  {
    id: 'TER-004',
    name: 'West Territory',
    slug: 'west-territory',
    description: 'Western region covering Maharashtra, Gujarat, Rajasthan',
    zones: [
      {
        id: 'ZN-006',
        name: 'West Zone A',
        slug: 'west-zone-a',
        code: 'WZA-01',
        description: 'Covers Maharashtra',
        regions: [
          {
            id: 'RGN-013',
            name: 'Mumbai',
            slug: 'mumbai',
            code: 'MUM-01',
            description: 'Financial capital of India',
            status: 'Active',
          },
          {
            id: 'RGN-014',
            name: 'Pune',
            slug: 'pune',
            code: 'PUN-01',
            description: 'IT and automotive hub',
            status: 'Active',
          },
          {
            id: 'RGN-015',
            name: 'Nagpur',
            slug: 'nagpur',
            code: 'NGP-01',
            description: 'Central Maharashtra',
            status: 'Active',
          },
        ],
      },
      {
        id: 'ZN-007',
        name: 'West Zone B',
        slug: 'west-zone-b',
        code: 'WZB-01',
        description: 'Covers Gujarat',
        regions: [
          {
            id: 'RGN-016',
            name: 'Ahmedabad',
            slug: 'ahmedabad',
            code: 'AMD-01',
            description: 'Commercial capital of Gujarat',
            status: 'Active',
          },
          {
            id: 'RGN-017',
            name: 'Surat',
            slug: 'surat',
            code: 'SRT-01',
            description: 'Diamond city',
            status: 'Active',
          },
        ],
      },
    ],
  },
]
