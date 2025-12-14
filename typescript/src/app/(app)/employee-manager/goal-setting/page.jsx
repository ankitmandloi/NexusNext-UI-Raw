'use client'

import { useState } from 'react'
import { Input } from '@/components/input'
import { Alert, AlertActions, AlertDescription, AlertTitle, AlertBody } from '@/components/alert'
import { Button } from '@/components/button'
import Actions from '../../basic-master/address-master/common/components/Actions.jsx'
import Header from '../../basic-master/address-master/common/components/Header.jsx'
import CommonTable from '../../basic-master/address-master/common/components/Table.jsx'
import CommonPagination from '../../basic-master/address-master/common/components/Pagination.jsx'

// ============================================================================
// CONSTANTS
// ============================================================================

const ITEMS_PER_PAGE = 10

// ============================================================================
// INITIAL DATA
// ============================================================================

// Sample employee data for dropdown
const initialEmployees = [
  { id: 1, name: 'John Smith', code: 'EMP001' },
  { id: 2, name: 'Sarah Johnson', code: 'EMP002' },
  { id: 3, name: 'Michael Brown', code: 'EMP003' },
  { id: 4, name: 'Emily Davis', code: 'EMP004' },
  { id: 5, name: 'David Wilson', code: 'EMP005' },
  { id: 6, name: 'Lisa Anderson', code: 'EMP006' },
  { id: 7, name: 'Robert Martinez', code: 'EMP007' },
  { id: 8, name: 'Jennifer Taylor', code: 'EMP008' },
]

// Sample goal setting data
const initialGoals = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'John Smith',
    goalTitle: 'July Sales Target',
    startDate: '2024-07-01',
    endDate: '2024-07-31',
    goalStatus: 'Active',
    totalScore: 100,
    actualScore: 2.6,
    resultStatus: 'Below Target',
    targets: [
      {
        id: 1,
        title: 'Revenue Target',
        weightage: 50,
        targetType: 'Sales',
        target: 500000,
        achievement: 999.99,
        score: 0.1,
        remarks: 'No Remarks',
      },
      {
        id: 2,
        title: 'Customer Acquisition',
        weightage: 50,
        targetType: 'Count',
        target: 200,
        achievement: 10,
        score: 2.5,
        remarks: 'No Remarks',
      },
    ],
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: 'Sarah Johnson',
    goalTitle: 'Q3 Performance Goals',
    startDate: '2024-07-01',
    endDate: '2024-09-30',
    goalStatus: 'Active',
    totalScore: 100,
    actualScore: 85.5,
    resultStatus: 'On Track',
    targets: [
      {
        id: 1,
        title: 'Project Completion',
        weightage: 40,
        targetType: 'Projects',
        target: 10,
        achievement: 9,
        score: 36,
        remarks: 'Good progress',
      },
      {
        id: 2,
        title: 'Client Satisfaction',
        weightage: 30,
        targetType: 'Rating',
        target: 4.5,
        achievement: 4.7,
        score: 31.3,
        remarks: 'Excellent feedback',
      },
      {
        id: 3,
        title: 'Team Training',
        weightage: 30,
        targetType: 'Hours',
        target: 40,
        achievement: 24,
        score: 18.2,
        remarks: 'Behind schedule',
      },
    ],
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: 'Michael Brown',
    goalTitle: 'August Targets',
    startDate: '2024-08-01',
    endDate: '2024-08-31',
    goalStatus: 'Completed',
    totalScore: 100,
    actualScore: 95.8,
    resultStatus: 'Achieved',
    targets: [
      {
        id: 1,
        title: 'Sales Volume',
        weightage: 60,
        targetType: 'Units',
        target: 1000,
        achievement: 1050,
        score: 63,
        remarks: 'Exceeded target',
      },
      {
        id: 2,
        title: 'Customer Retention',
        weightage: 40,
        targetType: 'Percentage',
        target: 80,
        achievement: 82,
        score: 32.8,
        remarks: 'Good retention',
      },
    ],
  },
  {
    id: 4,
    employeeId: 4,
    employeeName: 'Emily Davis',
    goalTitle: 'Q2 Marketing Goals',
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    goalStatus: 'Completed',
    totalScore: 100,
    actualScore: 72.3,
    resultStatus: 'Partially Achieved',
    targets: [
      {
        id: 1,
        title: 'Campaign Reach',
        weightage: 50,
        targetType: 'Impressions',
        target: 1000000,
        achievement: 850000,
        score: 42.5,
        remarks: 'Good reach',
      },
      {
        id: 2,
        title: 'Lead Generation',
        weightage: 50,
        targetType: 'Leads',
        target: 500,
        achievement: 298,
        score: 29.8,
        remarks: 'Below target',
      },
    ],
  },
  {
    id: 5,
    employeeId: 5,
    employeeName: 'David Wilson',
    goalTitle: 'September Goals',
    startDate: '2024-09-01',
    endDate: '2024-09-30',
    goalStatus: 'Active',
    totalScore: 100,
    actualScore: 45.2,
    resultStatus: 'Below Target',
    targets: [
      {
        id: 1,
        title: 'Product Launch',
        weightage: 70,
        targetType: 'Milestone',
        target: 1,
        achievement: 0,
        score: 0,
        remarks: 'Delayed',
      },
      {
        id: 2,
        title: 'Market Research',
        weightage: 30,
        targetType: 'Reports',
        target: 5,
        achievement: 4,
        score: 24,
        remarks: 'In progress',
      },
    ],
  },
  {
    id: 6,
    employeeId: 6,
    employeeName: 'Lisa Anderson',
    goalTitle: 'Q4 Revenue Targets',
    startDate: '2024-10-01',
    endDate: '2024-12-31',
    goalStatus: 'Active',
    totalScore: 100,
    actualScore: 68.9,
    resultStatus: 'On Track',
    targets: [
      {
        id: 1,
        title: 'Revenue Growth',
        weightage: 60,
        targetType: 'Revenue',
        target: 2000000,
        achievement: 1400000,
        score: 42,
        remarks: 'Good progress',
      },
      {
        id: 2,
        title: 'New Accounts',
        weightage: 40,
        targetType: 'Count',
        target: 50,
        achievement: 34,
        score: 26.9,
        remarks: 'Ongoing',
      },
    ],
  },
  {
    id: 7,
    employeeId: 7,
    employeeName: 'Robert Martinez',
    goalTitle: 'Technical Excellence Goals',
    startDate: '2024-07-01',
    endDate: '2024-12-31',
    goalStatus: 'Active',
    totalScore: 100,
    actualScore: 88.5,
    resultStatus: 'Achieved',
    targets: [
      {
        id: 1,
        title: 'Code Quality',
        weightage: 40,
        targetType: 'Score',
        target: 90,
        achievement: 92,
        score: 36.8,
        remarks: 'Excellent quality',
      },
      {
        id: 2,
        title: 'Bug Resolution',
        weightage: 30,
        targetType: 'Count',
        target: 100,
        achievement: 95,
        score: 28.5,
        remarks: 'Good work',
      },
      {
        id: 3,
        title: 'Deployment Success',
        weightage: 30,
        targetType: 'Percentage',
        target: 95,
        achievement: 97,
        score: 23.2,
        remarks: 'Outstanding',
      },
    ],
  },
  {
    id: 8,
    employeeId: 8,
    employeeName: 'Jennifer Taylor',
    goalTitle: 'Customer Service Excellence',
    startDate: '2024-08-01',
    endDate: '2024-10-31',
    goalStatus: 'Active',
    totalScore: 100,
    actualScore: 92.1,
    resultStatus: 'Achieved',
    targets: [
      {
        id: 1,
        title: 'Response Time',
        weightage: 50,
        targetType: 'Minutes',
        target: 5,
        achievement: 3,
        score: 50,
        remarks: 'Excellent response',
      },
      {
        id: 2,
        title: 'Customer Satisfaction',
        weightage: 50,
        targetType: 'Rating',
        target: 4.5,
        achievement: 4.7,
        score: 42.1,
        remarks: 'Great feedback',
      },
    ],
  },
  {
    id: 9,
    employeeId: 1,
    employeeName: 'John Smith',
    goalTitle: 'Q1 2025 Goals',
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    goalStatus: 'Pending',
    totalScore: 100,
    actualScore: 0,
    resultStatus: 'Not Started',
    targets: [
      {
        id: 1,
        title: 'Market Expansion',
        weightage: 70,
        targetType: 'Regions',
        target: 5,
        achievement: 0,
        score: 0,
        remarks: 'Not started',
      },
      {
        id: 2,
        title: 'Partnership Deals',
        weightage: 30,
        targetType: 'Count',
        target: 3,
        achievement: 0,
        score: 0,
        remarks: 'Not started',
      },
    ],
  },
  {
    id: 10,
    employeeId: 2,
    employeeName: 'Sarah Johnson',
    goalTitle: 'Innovation Goals',
    startDate: '2024-06-01',
    endDate: '2024-12-31',
    goalStatus: 'Active',
    totalScore: 100,
    actualScore: 55.3,
    resultStatus: 'On Track',
    targets: [
      {
        id: 1,
        title: 'New Feature Development',
        weightage: 60,
        targetType: 'Features',
        target: 10,
        achievement: 6,
        score: 36,
        remarks: 'Good progress',
      },
      {
        id: 2,
        title: 'Patent Applications',
        weightage: 40,
        targetType: 'Count',
        target: 2,
        achievement: 1,
        score: 19.3,
        remarks: 'In progress',
      },
    ],
  },
]

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function GoalSettingPage() {
  // State management
  const [goals, setGoals] = useState(initialGoals)
  const [employees] = useState(initialEmployees)

  // Modal state management
  const [activeModal, setActiveModal] = useState(null)
  const [selectedGoal, setSelectedGoal] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(goals.length / ITEMS_PER_PAGE))
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentGoals = goals.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // ========================================================================
  // ACTION HANDLERS
  // ========================================================================

  const handleView = (goal) => {
    setSelectedGoal(goal)
    setActiveModal('view')
  }

  const handleEdit = (goal) => {
    setSelectedGoal(goal)
    setActiveModal('edit')
  }

  const handleDelete = (goal) => {
    setSelectedGoal(goal)
    setActiveModal('delete')
  }

  const handleAddClick = () => {
    setActiveModal('add')
  }

  const handleViewDetails = (goal) => {
    setSelectedGoal(goal)
    setActiveModal('viewDetails')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedGoal(null)
  }

  // ========================================================================
  // CRUD HANDLERS
  // ========================================================================

  const handleAddGoal = (formData) => {
    const newId = goals.length > 0 ? Math.max(...goals.map(g => g.id)) + 1 : 1
    const employeeName = employees.find(e => e.id == formData.get('employeeId'))?.name

    setGoals(prev => [...prev, {
      id: newId,
      employeeId: Number(formData.get('employeeId')),
      employeeName,
      goalTitle: formData.get('goalTitle'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      goalStatus: formData.get('goalStatus'),
      totalScore: 100,
      actualScore: 0,
      resultStatus: 'Not Started',
      targets: [],
    }])
    closeModal()
  }

  const handleSaveEdit = (formData) => {
    const employeeName = employees.find(e => e.id == formData.get('employeeId'))?.name

    setGoals(prev =>
      prev.map(goal =>
        goal.id === selectedGoal.id
          ? {
              ...goal,
              employeeId: Number(formData.get('employeeId')),
              employeeName,
              goalTitle: formData.get('goalTitle'),
              startDate: formData.get('startDate'),
              endDate: formData.get('endDate'),
              goalStatus: formData.get('goalStatus'),
            }
          : goal
      )
    )
    closeModal()
  }

  const handleConfirmDelete = () => {
    setGoals(prev => prev.filter(g => g.id !== selectedGoal.id))
    closeModal()
  }

  // Import/Export handlers
  const handleImportExcel = () => {
    console.log('Import from Excel clicked')
  }

  const handleExportExcel = () => {
    console.log('Export to Excel clicked')
  }

  const handleDownloadFormat = () => {
    console.log('Download Format clicked')
  }

  // Get status badge color
  const getGoalStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'Completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      default:
        return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
    }
  }

  const getResultStatusColor = (status) => {
    switch (status) {
      case 'Achieved':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'On Track':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'Partially Achieved':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'Below Target':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
      case 'Not Started':
        return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
      default:
        return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400'
    }
  }

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 110px)" }}>
      {/* HEADER */}
      <Header
        title="Goal Setting"
        subtitle="Manage employee goals and performance targets"
        addLabel="Add Goal"
        onAdd={handleAddClick}
        dropdownOptions={[
          { label: 'Import from Excel', onClick: handleImportExcel },
          { label: 'Export to Excel', onClick: handleExportExcel },
          { label: 'Download Format', onClick: handleDownloadFormat },
        ]}
      />

      {/* Table using CommonTable component */}
      <CommonTable
        data={currentGoals.map(goal => ({
          id: goal.id,
          employee: goal.employeeName,
          goalTitle: goal.goalTitle,
          startDate: new Date(goal.startDate).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
          }),
          endDate: new Date(goal.endDate).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
          }),
          goalStatus: (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getGoalStatusColor(goal.goalStatus)}`}>
              {goal.goalStatus}
            </span>
          ),
          totalScore: `${goal.totalScore}%`,
          actualScore: `${goal.actualScore.toFixed(1)}%`,
          resultStatus: (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getResultStatusColor(goal.resultStatus)}`}>
              {goal.resultStatus}
            </span>
          ),
          activity: (
            <Button
              onClick={() => handleViewDetails(goal)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 h-8"
            >
              View Details
            </Button>
          ),
          raw: goal,
        }))}
        emptyMessage="No goals found. Click 'Add Goal' to create one."
        minWidth="1600px"
        stickyColumns={true}
        columns={[
          { key: 'id', label: 'ID', width: '80px' },
          { key: 'employee', label: 'Employee', width: '180px' },
          { key: 'goalTitle', label: 'Goal Title', width: '220px' },
          { key: 'startDate', label: 'Start Date', width: '130px' },
          { key: 'endDate', label: 'End Date', width: '130px' },
          { key: 'goalStatus', label: 'Goal Status', width: '130px' },
          { key: 'totalScore', label: 'Total Score', width: '120px' },
          { key: 'actualScore', label: 'Actual Score', width: '130px' },
          { key: 'resultStatus', label: 'Result Status', width: '160px' },
          { key: 'activity', label: 'Activity', width: '150px' },
        ]}
        renderActions={(row) => (
          <Actions
            onView={() => handleView(row.raw)}
            onEdit={() => handleEdit(row.raw)}
            onDelete={() => handleDelete(row.raw)}
          />
        )}
        pagination={
          <CommonPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        }
      />

      {/* ================================================================== */}
      {/* VIEW DETAILS MODAL */}
      {/* ================================================================== */}

      {activeModal === 'viewDetails' && selectedGoal && (
        <Alert open={true} onClose={closeModal} size="5xl" className="sm:my-16">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-white dark:bg-zinc-900 pb-2 border-b border-zinc-200 dark:border-zinc-700">
            <AlertTitle>Goal Details</AlertTitle>
            <AlertDescription>Complete goal information with targets breakdown</AlertDescription>
          </div>

          {/* Scrollable Body */}
          <AlertBody className="overflow-y-auto max-h-[calc(80vh-200px)] py-4">
            <div className="space-y-6">
              {/* Goal Information Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                <div>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Goal Title</p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{selectedGoal.goalTitle}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Start Date</p>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">
                    {new Date(selectedGoal.startDate).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">End Date</p>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">
                    {new Date(selectedGoal.endDate).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Employee</p>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">{selectedGoal.employeeName}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Total Weightage (%)</p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{selectedGoal.totalScore}%</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Actual Score</p>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{selectedGoal.actualScore.toFixed(1)}%</p>
                </div>
              </div>

              {/* Targets Section */}
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Targets</h4>
                <div className="overflow-x-auto rounded-lg border border-zinc-950/10 dark:border-white/10">
                  <table className="w-full text-sm">
                    <thead className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-950/10 dark:border-white/10">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-zinc-700 dark:text-zinc-300">Title</th>
                        <th className="px-4 py-3 text-center font-medium text-zinc-700 dark:text-zinc-300">Weightage (%)</th>
                        <th className="px-4 py-3 text-center font-medium text-zinc-700 dark:text-zinc-300">Target Type</th>
                        <th className="px-4 py-3 text-right font-medium text-zinc-700 dark:text-zinc-300">Target</th>
                        <th className="px-4 py-3 text-right font-medium text-zinc-700 dark:text-zinc-300">Achievement</th>
                        <th className="px-4 py-3 text-right font-medium text-zinc-700 dark:text-zinc-300">Score</th>
                        <th className="px-4 py-3 text-left font-medium text-zinc-700 dark:text-zinc-300">Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-950/5 dark:divide-white/5">
                      {selectedGoal.targets.map((target) => (
                        <tr key={target.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                          <td className="px-4 py-3 text-zinc-900 dark:text-zinc-100">{target.title}</td>
                          <td className="px-4 py-3 text-center text-zinc-900 dark:text-zinc-100">{target.weightage}%</td>
                          <td className="px-4 py-3 text-center text-zinc-600 dark:text-zinc-400">{target.targetType || '-'}</td>
                          <td className="px-4 py-3 text-right text-zinc-900 dark:text-zinc-100">{target.target.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right text-zinc-900 dark:text-zinc-100">{target.achievement.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right font-medium text-blue-600 dark:text-blue-400">{target.score.toFixed(1)}%</td>
                          <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 text-sm">{target.remarks}</td>
                        </tr>
                      ))}
                      <tr className="bg-zinc-50 dark:bg-zinc-800/50 font-semibold">
                        <td className="px-4 py-3 text-zinc-900 dark:text-zinc-100">Total Score</td>
                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3 text-right text-blue-600 dark:text-blue-400">{selectedGoal.actualScore.toFixed(1)}%</td>
                        <td className="px-4 py-3"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </AlertBody>

          {/* Sticky Footer */}
          <AlertActions className="sticky bottom-0 bg-white dark:bg-zinc-900 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <Button plain onClick={closeModal}>
              Close
            </Button>
          </AlertActions>
        </Alert>
      )}

      {/* ================================================================== */}
      {/* VIEW MODAL */}
      {/* ================================================================== */}

      {activeModal === 'view' && selectedGoal && (
        <Alert open={true} onClose={closeModal} size="3xl">
          <AlertTitle>Goal Information</AlertTitle>
          <AlertDescription>View the goal details</AlertDescription>
          <AlertBody>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">ID</p>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">{selectedGoal.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Employee</p>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">{selectedGoal.employeeName}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Goal Title</p>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">{selectedGoal.goalTitle}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Start Date</p>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">
                    {new Date(selectedGoal.startDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">End Date</p>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">
                    {new Date(selectedGoal.endDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Goal Status</p>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getGoalStatusColor(selectedGoal.goalStatus)}`}>
                    {selectedGoal.goalStatus}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Result Status</p>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getResultStatusColor(selectedGoal.resultStatus)}`}>
                    {selectedGoal.resultStatus}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Score</p>
                  <p className="text-sm text-zinc-900 dark:text-zinc-100">{selectedGoal.totalScore}%</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Actual Score</p>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{selectedGoal.actualScore.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </AlertBody>
          <AlertActions>
            <Button plain onClick={closeModal}>
              Close
            </Button>
          </AlertActions>
        </Alert>
      )}

      {/* ================================================================== */}
      {/* ADD MODAL */}
      {/* ================================================================== */}

      {activeModal === 'add' && (
        <Alert open={true} onClose={closeModal} size="3xl" className="sm:my-16">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-white dark:bg-zinc-900 pb-2 border-b border-zinc-200 dark:border-zinc-700">
            <AlertTitle>Add Goal</AlertTitle>
            <AlertDescription>Create a new goal for an employee</AlertDescription>
          </div>

          {/* Scrollable Body */}
          <AlertBody className="overflow-y-auto max-h-[calc(80vh-200px)] py-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleAddGoal(new FormData(e.target))
              }}
              id="addGoalForm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Employee */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Employee <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="employeeId"
                    required
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="">Select Employee</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} ({emp.code})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Goal Title */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Goal Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="goalTitle"
                    placeholder="e.g., Q4 Sales Target"
                    required
                    className="w-full"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    name="startDate"
                    required
                    className="w-full"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    name="endDate"
                    required
                    className="w-full"
                  />
                </div>

                {/* Goal Status */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Goal Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="goalStatus"
                    required
                    defaultValue="Pending"
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </form>
          </AlertBody>

          {/* Sticky Footer */}
          <AlertActions className="sticky bottom-0 bg-white dark:bg-zinc-900 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <Button plain onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" form="addGoalForm">
              Add Goal
            </Button>
          </AlertActions>
        </Alert>
      )}

      {/* ================================================================== */}
      {/* EDIT MODAL */}
      {/* ================================================================== */}

      {activeModal === 'edit' && selectedGoal && (
        <Alert open={true} onClose={closeModal} size="3xl" className="sm:my-16">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-white dark:bg-zinc-900 pb-2 border-b border-zinc-200 dark:border-zinc-700">
            <AlertTitle>Edit Goal</AlertTitle>
            <AlertDescription>Update the goal details</AlertDescription>
          </div>

          {/* Scrollable Body */}
          <AlertBody className="overflow-y-auto max-h-[calc(80vh-200px)] py-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSaveEdit(new FormData(e.target))
              }}
              id="editGoalForm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Employee */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Employee <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="employeeId"
                    defaultValue={selectedGoal.employeeId}
                    required
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="">Select Employee</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} ({emp.code})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Goal Title */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Goal Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="goalTitle"
                    defaultValue={selectedGoal.goalTitle}
                    placeholder="e.g., Q4 Sales Target"
                    required
                    className="w-full"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    name="startDate"
                    defaultValue={selectedGoal.startDate}
                    required
                    className="w-full"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    name="endDate"
                    defaultValue={selectedGoal.endDate}
                    required
                    className="w-full"
                  />
                </div>

                {/* Goal Status */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Goal Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="goalStatus"
                    defaultValue={selectedGoal.goalStatus}
                    required
                    className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </form>
          </AlertBody>

          {/* Sticky Footer */}
          <AlertActions className="sticky bottom-0 bg-white dark:bg-zinc-900 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <Button plain onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" form="editGoalForm">
              Save Changes
            </Button>
          </AlertActions>
        </Alert>
      )}

      {/* ================================================================== */}
      {/* DELETE MODAL */}
      {/* ================================================================== */}

      {activeModal === 'delete' && selectedGoal && (
        <Alert open={true} onClose={closeModal}>
          <AlertTitle>Delete Goal</AlertTitle>
          <AlertDescription>
            Are you sure you want to delete the goal <strong>{selectedGoal.goalTitle}</strong> for{' '}
            <strong>{selectedGoal.employeeName}</strong>? This action cannot be undone.
          </AlertDescription>
          <AlertActions>
            <Button plain onClick={closeModal}>
              Cancel
            </Button>
            <Button color="red" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </AlertActions>
        </Alert>
      )}
    </div>
  )
}
