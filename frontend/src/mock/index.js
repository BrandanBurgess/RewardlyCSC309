/**
 * ============================================================
 * MOCK DATA - REPLACE WITH API CALLS
 * ============================================================
 * 
 * This file contains all mock/hardcoded data used across the app.
 * Each export should be replaced with actual API calls.
 * 
 * HOW TO REPLACE:
 * 1. Find the mock data export you want to replace
 * 2. Create the corresponding API function in /api/api.js
 * 3. Import and use the API function in the component
 * 4. Remove the mock data import
 * 
 * EXAMPLE:
 * Before: import { mockTransactions } from '@/mock'
 * After:  const { data: transactions } = await transactionAPI.getAll()
 * ============================================================
 */

// ============================================================
// USER DATA
// ============================================================
export const mockUsers = [
  { id: 1, utorid: 'john_doe', name: 'John Doe', email: 'john@example.com', role: 'regular', verified: true, activated: true, suspicious: false, points: 1250, createdAt: '2025-10-15', lastLogin: '2025-11-28T14:30:00Z' },
  { id: 2, utorid: 'jane_smith', name: 'Jane Smith', email: 'jane@example.com', role: 'cashier', verified: true, activated: true, suspicious: false, points: 850, createdAt: '2025-10-20', lastLogin: '2025-11-27T10:00:00Z' },
  { id: 3, utorid: 'bob_wilson', name: 'Bob Wilson', email: 'bob@example.com', role: 'regular', verified: false, activated: false, suspicious: false, points: 0, createdAt: '2025-11-01', lastLogin: null },
  { id: 4, utorid: 'alice_johnson', name: 'Alice Johnson', email: 'alice@example.com', role: 'manager', verified: true, activated: true, suspicious: false, points: 2500, createdAt: '2025-09-01', lastLogin: '2025-11-28T09:15:00Z' },
  { id: 5, utorid: 'charlie_brown', name: 'Charlie Brown', email: 'charlie@example.com', role: 'regular', verified: true, activated: true, suspicious: false, points: 500, createdAt: '2025-11-10', lastLogin: '2025-11-25T16:45:00Z' },
]

// ============================================================
// TRANSACTION DATA
// ============================================================
export const mockTransactions = [
  { id: 1, type: 'purchase', amount: 150, spent: 15.00, userId: 'john_doe', createdBy: 'cashier1', relatedId: 'user123', promotionIds: [1, 2], remark: 'Coffee purchase', suspicious: false, createdAt: '2025-11-28T10:30:00Z' },
  { id: 2, type: 'transfer', amount: -50, spent: null, userId: 'jane_smith', createdBy: 'john_doe', relatedId: 'jane_smith', promotionIds: [], remark: 'Sent to friend', suspicious: false, createdAt: '2025-11-27T15:45:00Z' },
  { id: 3, type: 'redemption', amount: -500, spent: null, userId: 'bob_wilson', createdBy: 'bob_wilson', relatedId: null, promotionIds: [], remark: 'Redemption request', suspicious: true, createdAt: '2025-11-26T09:00:00Z' },
  { id: 4, type: 'event', amount: 200, spent: null, userId: 'alice_johnson', createdBy: 'manager1', relatedId: 'event_42', promotionIds: [], remark: 'Workshop attendance', suspicious: false, createdAt: '2025-11-25T14:00:00Z' },
  { id: 5, type: 'adjustment', amount: 100, spent: null, userId: 'charlie_brown', createdBy: 'admin', relatedId: 'tx_99', promotionIds: [], remark: 'Correction for previous error', suspicious: false, createdAt: '2025-11-24T11:30:00Z' },
]

// ============================================================
// PROMOTION DATA
// ============================================================
export const mockPromotions = [
  { id: 1, name: 'Double Points Monday', description: 'Earn 2x points on all purchases every Monday!', type: 'automatic', startDate: '2025-11-01T00:00:00Z', endDate: '2025-12-31T23:59:59Z', minSpending: 10, rate: 2, points: null, usageCount: 156 },
  { id: 2, name: 'Welcome Bonus', description: 'Get 500 bonus points when you make your first purchase!', type: 'one-time', startDate: '2025-01-01T00:00:00Z', endDate: '2025-12-31T23:59:59Z', minSpending: 5, rate: null, points: 500, usageCount: 89 },
  { id: 3, name: 'Holiday Special', description: 'Celebrate the season with 3x points on purchases over $50!', type: 'automatic', startDate: '2025-12-01T00:00:00Z', endDate: '2025-12-25T23:59:59Z', minSpending: 50, rate: 3, points: null, usageCount: 0 },
  { id: 4, name: 'Referral Reward', description: 'Both you and your friend get 200 points when they sign up!', type: 'one-time', startDate: '2025-11-01T00:00:00Z', endDate: null, minSpending: null, rate: null, points: 200, usageCount: 45 },
]

// ============================================================
// EVENT DATA
// ============================================================
export const mockEvents = [
  { id: 1, name: 'Tech Workshop: React Basics', description: 'Learn the fundamentals of React.js in this hands-on workshop. We will cover components, state management, hooks, and best practices.', location: 'Room BA1234', startTime: '2025-12-01T14:00:00Z', endTime: '2025-12-01T17:00:00Z', capacity: 50, numGuests: 35, pointsRemain: 5000, pointsAwarded: 100, published: true, organizers: [{ id: 1, name: 'Jane Smith', utorid: 'smithj1' }] },
  { id: 2, name: 'Holiday Party', description: 'Celebrate the holiday season with fellow students! Food, games, and prizes.', location: 'Great Hall', startTime: '2025-12-15T18:00:00Z', endTime: '2025-12-15T22:00:00Z', capacity: 200, numGuests: 150, pointsRemain: 10000, pointsAwarded: 50, published: true, organizers: [{ id: 2, name: 'John Doe', utorid: 'doej2' }] },
  { id: 3, name: 'Career Fair', description: 'Meet top employers and explore career opportunities.', location: 'Student Center', startTime: '2025-12-10T10:00:00Z', endTime: '2025-12-10T16:00:00Z', capacity: null, numGuests: 89, pointsRemain: 8000, pointsAwarded: 75, published: true, organizers: [] },
  { id: 4, name: 'Study Group: Finals Prep', description: 'Group study session for final exams. All subjects welcome.', location: 'Library Room 202', startTime: '2025-12-05T13:00:00Z', endTime: '2025-12-05T18:00:00Z', capacity: 30, numGuests: 12, pointsRemain: 1500, pointsAwarded: 30, published: true, organizers: [{ id: 1, name: 'Jane Smith', utorid: 'smithj1' }] },
  { id: 5, name: 'Draft Event', description: 'This is an unpublished draft event.', location: 'TBD', startTime: '2025-12-20T12:00:00Z', endTime: '2025-12-20T14:00:00Z', capacity: 30, numGuests: 0, pointsRemain: 3000, pointsAwarded: 100, published: false, organizers: [] },
]

// ============================================================
// REDEMPTION DATA
// ============================================================
export const mockRedemptions = [
  { id: 'RDM-001', amount: 500, userId: 'john_doe', userName: 'John Doe', status: 'pending', createdAt: '2025-11-28T10:30:00Z' },
  { id: 'RDM-002', amount: 200, userId: 'jane_smith', userName: 'Jane Smith', status: 'processed', createdAt: '2025-11-27T09:00:00Z', processedAt: '2025-11-27T14:00:00Z' },
]

// ============================================================
// DASHBOARD STATS
// ============================================================
export const mockDashboardStats = {
  points: 1250,
  pendingRedemptions: 2,
  transactionsThisMonth: 15,
  upcomingEvents: 3,
}

// ============================================================
// RECENT ACTIVITY FOR DASHBOARD
// ============================================================
export const mockRecentTransactions = [
  { id: 1, type: 'purchase', amount: 150, date: '2025-11-28', description: 'Coffee purchase' },
  { id: 2, type: 'transfer', amount: -50, date: '2025-11-27', description: 'Transfer to john_doe' },
  { id: 3, type: 'event', amount: 200, date: '2025-11-26', description: 'Workshop attendance' },
]

export const mockUpcomingEvents = [
  { id: 1, name: 'Tech Workshop', date: '2025-12-01', points: 100 },
  { id: 2, name: 'Holiday Party', date: '2025-12-15', points: 50 },
]

// ============================================================
// PAGINATION DEFAULTS
// ============================================================
export const PAGINATION_DEFAULTS = {
  itemsPerPage: 10,
  defaultPage: 1,
}

// ============================================================
// HELPER: Simulate API delay
// ============================================================
export const simulateApiDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

// ============================================================
// HELPER: Get mock data with pagination
// ============================================================
export const getMockPaginatedData = (data, page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedData = data.slice(startIndex, endIndex)
  
  return {
    data: paginatedData,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(data.length / limit),
      totalItems: data.length,
      itemsPerPage: limit,
    }
  }
}

