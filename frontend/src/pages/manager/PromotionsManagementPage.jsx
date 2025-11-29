import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/layout'
import { DataTable } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Eye, Plus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react'

// ============================================================
// TODO: Replace mock data imports with API calls
// ============================================================
import { 
  mockPromotions, 
  getMockPaginatedData,
  simulateApiDelay,
  PAGINATION_DEFAULTS 
} from '@/mock'

const PromotionsManagementPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [promotions, setPromotions] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    loadPromotions()
  }, [currentPage])

  // ============================================================
  // TODO: Replace with actual API call
  // Example:
  //   const response = await promotionAPI.getAll({
  //     page: currentPage,
  //     limit: PAGINATION_DEFAULTS.itemsPerPage
  //   })
  // ============================================================
  const loadPromotions = async () => {
    setLoading(true)
    try {
      await simulateApiDelay(300) // Remove this when using real API
      
      // TODO: Replace with actual API call
      const { data, pagination } = getMockPaginatedData(
        mockPromotions, 
        currentPage, 
        PAGINATION_DEFAULTS.itemsPerPage
      )
      
      setPromotions(data)
      setTotalPages(pagination.totalPages)
      setTotalItems(pagination.totalItems)
    } catch (error) {
      console.error('Failed to load promotions:', error)
    } finally {
      setLoading(false)
    }
  }

  // ============================================================
  // TODO: Implement delete promotion API call
  // Example:
  //   await promotionAPI.delete(promotionId)
  //   loadPromotions() // Reload after delete
  // ============================================================
  const handleDelete = async (promotionId) => {
    if (!confirm('Are you sure you want to delete this promotion?')) return
    console.log('TODO: Delete promotion:', promotionId)
    // TODO: Call API and reload
  }

  const isActive = (promo) => {
    const now = new Date()
    const start = new Date(promo.startDate)
    const end = promo.endDate ? new Date(promo.endDate) : null
    return now >= start && (!end || now <= end)
  }

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (value) => (
        <span className="font-medium text-gray-900">{value}</span>
      )
    },
    {
      key: 'type',
      label: 'Type',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
          value === 'automatic' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'reward',
      label: 'Reward',
      render: (_, row) => (
        <span className="font-medium text-rewardly-blue">
          {row.rate ? `${row.rate}x multiplier` : `+${row.points} pts`}
        </span>
      )
    },
    {
      key: 'startDate',
      label: 'Start Date',
      render: (value) => new Date(value).toLocaleDateString()
    },
    {
      key: 'endDate',
      label: 'End Date',
      render: (value) => value ? new Date(value).toLocaleDateString() : 'No end date'
    },
    {
      key: 'active',
      label: 'Status',
      render: (_, row) => (
        isActive(row) ? (
          <span className="flex items-center gap-1 text-green-600">
            <CheckCircle className="h-4 w-4" /> Active
          </span>
        ) : (
          <span className="flex items-center gap-1 text-gray-400">
            <XCircle className="h-4 w-4" /> Inactive
          </span>
        )
      )
    },
    {
      key: 'actions',
      label: '',
      sortable: false,
      render: (_, row) => (
        <div className="flex gap-1">
          <Link to={`/manager/promotions/${row.id}`}>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Link to={`/manager/promotions/${row.id}/edit`}>
            <Button variant="ghost" size="sm">
              <Edit2 className="h-4 w-4" />
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDelete(row.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ]

  return (
    <div>
      <PageHeader 
        title="Manage Promotions" 
        subtitle="Create and manage promotional campaigns"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Manager' },
          { label: 'Promotions' }
        ]}
        actions={
          <Link to="/manager/promotions/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Promotion
            </Button>
          </Link>
        }
      />

      <DataTable
        columns={columns}
        data={promotions}
        loading={loading}
        searchable={true}
        searchPlaceholder="Search promotions..."
        pagination={true}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={PAGINATION_DEFAULTS.itemsPerPage}
        onPageChange={setCurrentPage}
        emptyMessage="No promotions found"
      />
    </div>
  )
}

export default PromotionsManagementPage
