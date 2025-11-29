import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/layout'
import { DataTable } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Eye, Plus, Edit2, Trash2, Users, CheckCircle, XCircle } from 'lucide-react'

// ============================================================
// TODO: Replace mock data imports with API calls
// ============================================================
import { 
  mockEvents, 
  getMockPaginatedData,
  simulateApiDelay,
  PAGINATION_DEFAULTS 
} from '@/mock'

const EventsManagementPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [filters, setFilters] = useState({
    published: '',
    dateRange: '',
    capacity: ''
  })

  useEffect(() => {
    loadEvents()
  }, [currentPage, filters])

  // ============================================================
  // TODO: Replace with actual API call
  // Example:
  //   const response = await eventAPI.getAll({
  //     page: currentPage,
  //     limit: PAGINATION_DEFAULTS.itemsPerPage,
  //     published: filters.published,
  //     ...filters
  //   })
  // ============================================================
  const loadEvents = async () => {
    setLoading(true)
    try {
      await simulateApiDelay(300) // Remove this when using real API
      
      // TODO: Replace with actual API call
      const { data, pagination } = getMockPaginatedData(
        mockEvents, 
        currentPage, 
        PAGINATION_DEFAULTS.itemsPerPage
      )
      
      setEvents(data)
      setTotalPages(pagination.totalPages)
      setTotalItems(pagination.totalItems)
    } catch (error) {
      console.error('Failed to load events:', error)
    } finally {
      setLoading(false)
    }
  }

  // ============================================================
  // TODO: Implement delete event API call
  // Example:
  //   await eventAPI.delete(eventId)
  //   loadEvents() // Reload after delete
  // ============================================================
  const handleDelete = async (eventId) => {
    if (!confirm('Are you sure you want to delete this event?')) return
    console.log('TODO: Delete event:', eventId)
    // TODO: Call API and reload
  }

  const columns = [
    {
      key: 'name',
      label: 'Event Name',
      render: (value) => (
        <span className="font-medium text-gray-900">{value}</span>
      )
    },
    {
      key: 'location',
      label: 'Location',
    },
    {
      key: 'startTime',
      label: 'Date',
      render: (value) => new Date(value).toLocaleDateString()
    },
    {
      key: 'attendance',
      label: 'Attendance',
      render: (_, row) => (
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4 text-gray-400" />
          <span>
            {row.numGuests}{row.capacity ? ` / ${row.capacity}` : ''}
          </span>
        </div>
      )
    },
    {
      key: 'published',
      label: 'Status',
      render: (value) => (
        value ? (
          <span className="flex items-center gap-1 text-green-600">
            <CheckCircle className="h-4 w-4" /> Published
          </span>
        ) : (
          <span className="flex items-center gap-1 text-gray-400">
            <XCircle className="h-4 w-4" /> Draft
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
          <Link to={`/manager/events/${row.id}`}>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Link to={`/manager/events/${row.id}/edit`}>
            <Button variant="ghost" size="sm">
              <Edit2 className="h-4 w-4" />
            </Button>
          </Link>
          <Link to={`/manager/events/${row.id}/attendees`}>
            <Button variant="ghost" size="sm">
              <Users className="h-4 w-4" />
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

  const filterPanel = (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select 
          value={filters.published}
          onChange={(e) => setFilters({ ...filters, published: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="">All</option>
          <option value="true">Published</option>
          <option value="false">Draft</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
        <select 
          value={filters.dateRange}
          onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="">All Time</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
        <select 
          value={filters.capacity}
          onChange={(e) => setFilters({ ...filters, capacity: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="">Any</option>
          <option value="available">Has Availability</option>
          <option value="full">Full</option>
        </select>
      </div>
      <div className="flex items-end">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => setFilters({ published: '', dateRange: '', capacity: '' })}
        >
          Clear
        </Button>
      </div>
    </div>
  )

  return (
    <div>
      <PageHeader 
        title="Manage Events" 
        subtitle="Create and manage events"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Manager' },
          { label: 'Events' }
        ]}
        actions={
          <Link to="/manager/events/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Event
            </Button>
          </Link>
        }
      />

      <DataTable
        columns={columns}
        data={events}
        loading={loading}
        searchable={true}
        searchPlaceholder="Search events..."
        pagination={true}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={PAGINATION_DEFAULTS.itemsPerPage}
        onPageChange={setCurrentPage}
        filters={filterPanel}
        emptyMessage="No events found"
      />
    </div>
  )
}

export default EventsManagementPage
