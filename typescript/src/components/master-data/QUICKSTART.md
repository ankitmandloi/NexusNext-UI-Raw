# Quick Start Guide - Creating Master Data Pages in 3 Minutes

## Step 1: Copy the Template (30 seconds)

```bash
# Copy TEMPLATE.tsx to your new page location
cp src/components/master-data/TEMPLATE.tsx src/app/(app)/basic-master/address-master/district/page.tsx
```

## Step 2: Find & Replace (1 minute)

Open the copied file and replace:
- `Entity` → `District` (9 occurrences)
- `Entities` → `Districts` (3 occurrences)  
- `entity` → `district` (in comments if needed)
- `entities` → `districts` (in comments if needed)

## Step 3: Update Initial Data (30 seconds)

Replace the initial data with your entity data:

```typescript
const initialDistricts: District[] = [
  { id: 1, name: 'Indore' },
  { id: 2, name: 'Bhopal' },
  { id: 3, name: 'Gwalior' },
]
```

## Step 4: Done! ✨

Your page is ready. Test it by:
1. Adding a new district
2. Viewing district details
3. Editing a district
4. Deleting a district

## Optional: Add More Fields

If your entity has additional fields beyond ID and Name:

```typescript
// 1. Update interface
interface City extends BaseMasterEntity {
  id: number
  name: string
  districtId: number      // ← New field
  population?: number     // ← New field
}

// 2. Add to ViewAlert
<ViewAlert
  fields={[
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'City Name' },
    { key: 'districtId', label: 'District ID' },
    { key: 'population', label: 'Population' },
  ]}
/>

// 3. Add input fields to Add/Edit modals
const additionalFields = (
  <>
    <div className="space-y-2">
      <label className="block text-sm font-medium">District ID</label>
      <Input type="number" value={districtId} onChange={(e) => setDistrictId(+e.target.value)} />
    </div>
    <div className="space-y-2">
      <label className="block text-sm font-medium">Population</label>
      <Input type="number" value={population} onChange={(e) => setPopulation(+e.target.value)} />
    </div>
  </>
)

<AddAlert additionalFields={additionalFields} />
<EditAlert additionalFields={additionalFields} />
```

## Optional: API Integration

When ready to connect to backend:

```typescript
// Replace the simple handlers with API calls
const handleAdd = async (name: string) => {
  const response = await fetch('/api/districts', {
    method: 'POST',
    body: JSON.stringify({ name }),
  })
  const newDistrict = await response.json()
  addEntity(name, newDistrict)
}

// Use in modal
<AddAlert onAdd={handleAdd} />
```

## That's It!

You now have a fully functional master data page with:
- ✅ Add, View, Edit, Delete operations
- ✅ Import/Export dropdown (ready for implementation)
- ✅ Beautiful UI with dark mode
- ✅ Loading states and form validation
- ✅ Consistent design across all pages
- ✅ TypeScript type safety
- ✅ Mobile responsive

Create as many pages as you need - State, District, City, Pincode, etc.
Each one takes only 3 minutes!

