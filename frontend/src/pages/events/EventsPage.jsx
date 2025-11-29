import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Pagination, EmptyState } from '@/components/shared'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Users, Clock, ArrowRight, Coins } from 'lucide-react'

// ============================================================
// TODO: Replace mock data imports with API calls
// ============================================================
import { 
  mockEvents, 
  getMockPaginatedData,
  simulateApiDelay 
} from '@/mock'

const EventsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    loadEvents()
  }, [currentPage])

  // ============================================================
  // TODO: Replace with actual API call
  // Example:
  //   const response = await eventAPI.getPublished({
  //     page: currentPage,
  //     limit: 4
  //   })
  // ============================================================
  const loadEvents = async () => {
    setLoading(true)
    try {
      await simulateApiDelay(300) // Remove this when using real API
      
      // TODO: Replace with actual API call (filter for published only)
      const publishedEvents = mockEvents.filter(e => e.published)
      const { data, pagination } = getMockPaginatedData(
        publishedEvents, 
        currentPage, 
        4
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
  // TODO: Implement RSVP API call
  // Example:
  //   await eventAPI.rsvp(eventId)
  // ============================================================
  const handleRsvp = async (eventId) => {
    console.log('TODO: Implement RSVP for event:', eventId)
    // TODO: Call eventAPI.rsvp(eventId)
  }

  const isUpcoming = (event) => {
    return new Date(event.startTime) > new Date()
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-rewardly-blue border-t-transparent" />
      </div>
    )
  }

  return (
    <div>
      <PageHeader 
        title="Events" 
        subtitle="Browse and RSVP to upcoming events"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Events' }
        ]}
      />

      {events.length === 0 ? (
        <Card>
          <CardContent>
            <EmptyState
              icon={Calendar}
              title="No Events Available"
              description="There are no published events at the moment. Check back later!"
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {events.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className={`h-2 ${isUpcoming(event) ? 'bg-rewardly-blue' : 'bg-gray-300'}`} />
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{event.name}</CardTitle>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      isUpcoming(event) 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {isUpcoming(event) ? 'Upcoming' : 'Past'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span>{formatDate(event.startTime)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-500">
                      <Users className="h-4 w-4 flex-shrink-0" />
                      <span>
                        {event.numGuests} attending
                        {event.capacity && ` / ${event.capacity} capacity`}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 font-medium text-rewardly-blue">
                      <Coins className="h-4 w-4 flex-shrink-0" />
                      <span>Earn up to {event.pointsAwarded} points</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <Link to={`/events/${event.id}`}>
                      <Button variant="ghost" size="sm" className="gap-1 p-0">
                        View Details <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    
                    {isUpcoming(event) && (
                      <Button size="sm" onClick={() => handleRsvp(event.id)}>
                        RSVP
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={4}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  )
}

export default EventsPage
