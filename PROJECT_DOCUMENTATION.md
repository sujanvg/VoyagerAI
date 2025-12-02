# VoyagerAI - Project Documentation
## Frontend & Integration Focus

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Frontend Architecture](#frontend-architecture)
3. [Tech Stack](#tech-stack)
4. [Key Features & Components](#key-features--components)
5. [Backend Integration](#backend-integration)
6. [Authentication System](#authentication-system)
7. [State Management](#state-management)
8. [API Client Architecture](#api-client-architecture)
9. [UI/UX Design](#uiux-design)
10. [Key Technical Decisions](#key-technical-decisions)
11. [Challenges & Solutions](#challenges--solutions)
12. [Interview Talking Points](#interview-talking-points)

---

## 🎯 Project Overview

**VoyagerAI** is a comprehensive travel and event discovery platform that aggregates events from multiple sources (Ticketmaster, Eventbrite, CSV files) and provides AI-powered recommendations, itinerary planning, hotel search, and collaborative travel planning features.

### Core Functionality
- **Event Discovery**: Search and filter events from multiple providers
- **Hotel Search**: Find and book hotels by city
- **AI-Powered Chat**: Interactive assistant for travel recommendations
- **Itinerary Planning**: Create and manage travel plans with events, hotels, and activities
- **User Authentication**: Secure JWT-based authentication system
- **Social Features**: Event reviews, favorites, sharing, and collaborative planning

---

## 🏗️ Frontend Architecture

### Architecture Pattern
- **Framework**: Next.js 15.5.4 (App Router)
- **Pattern**: Component-based architecture with client-side rendering
- **Routing**: File-based routing using Next.js App Router
- **Styling**: Tailwind CSS 4.1.13 with CSS Modules for component-specific styles

### Project Structure
```
frontend/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page (main event discovery)
│   ├── layout.tsx          # Root layout with AuthProvider
│   ├── login/              # Authentication pages
│   ├── signup/
│   ├── travel-plans/       # Itinerary management
│   ├── hotels/             # Hotel search page
│   └── profile/            # User profile
├── components/             # Reusable React components
│   ├── ui/                 # Base UI components
│   ├── EventCard.tsx       # Event display component
│   ├── AIChat.tsx          # AI assistant chat interface
│   ├── AdvancedFilters.tsx # Event filtering system
│   ├── HotelsPlanner.tsx  # Hotel search component
│   └── GroupItinerary.tsx  # Collaborative planning
├── contexts/               # React Context providers
│   └── AuthContext.tsx     # Authentication state management
├── lib/                    # Utility functions and API clients
│   ├── api.ts              # API function definitions
│   ├── apiClient.ts        # Centralized API client
│   └── apiConfig.ts        # API configuration
└── globals.css             # Global styles
```

---

## 🛠️ Tech Stack

### Core Technologies
- **Next.js 15.5.4**: React framework with App Router
- **React 18.3.1**: UI library
- **TypeScript 5.6.3**: Type safety
- **Tailwind CSS 4.1.13**: Utility-first CSS framework

### Key Libraries
- **@heroicons/react**: Icon library
- **react-big-calendar**: Calendar view for events
- **moment/date-fns**: Date manipulation
- **node-vibrant**: Image color extraction

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Turbopack**: Fast bundler (Next.js dev mode)

---

## 🎨 Key Features & Components

### 1. Event Discovery System (`app/page.tsx`)

**Main Features:**
- Real-time event search from multiple sources (Ticketmaster, Eventbrite, CSV)
- Geolocation-based city detection
- Dual view modes: List and Calendar
- Category-based quick filters (Concerts, Sports, Theater, Festivals)
- Advanced filtering (city, category, date range, price)

**Key Implementation Details:**
```typescript
// State management for multiple event sources
const [ticketmasterEvents, setTicketmasterEvents] = useState<any[]>([]);
const [eventbriteEvents, setEventbriteEvents] = useState<any[]>([]);
const [csvEvents, setCsvEvents] = useState<any[]>([]);

// Unified event loading with error handling
const loadEvents = async (search, city, filters, searchMode) => {
  // Handles both events and hotels search
  // Supports multiple data source formats
  // Implements fallback mechanisms
}
```

**Integration Points:**
- `/api/events` - Main events endpoint
- Handles merged arrays and individual source arrays
- Real-time filter application with debouncing

### 2. Advanced Filtering System (`components/AdvancedFilters.tsx`)

**Features:**
- Dynamic filter options from backend
- City, category, date range filtering
- Active filter badges with removal
- Collapsible advanced options
- Real-time filter application

**Technical Highlights:**
- Fetches filter options from `/api/events/filters`
- Maintains filter state separately from search query
- Optimized re-renders using React hooks

### 3. AI Chat Assistant (`components/AIChat.tsx`)

**Features:**
- Floating chat interface
- Conversation history management
- Quick question suggestions
- Integration with OpenAI API via backend
- Personalized recommendations based on user email

**Implementation:**
```typescript
// Conversation history management
const history = messages.map((msg) => ({
  role: msg.role,
  content: msg.content,
}));

// API integration
const data = await apiClient.post('/api/llm/chat', {
  message: text,
  email: user?.email || null,
  history: history,
});
```

**User Experience:**
- Auto-scroll to latest message
- Typing indicators
- Error handling with user-friendly messages
- Quick action buttons for common queries

### 4. Travel Plans/Itinerary Management (`app/travel-plans/page.tsx`)

**Features:**
- Create, read, update, delete itineraries
- Add events, hotels, flights to itineraries
- Event selection from saved favorites
- Status tracking (draft, active, completed, cancelled)
- Budget management
- Date range planning

**Key Functionality:**
```typescript
// Creating itinerary with selected events
const handleCreateItinerary = async (e) => {
  // Create itinerary
  const data = await apiClient.post('/api/itineraries', {
    user_id: user.id,
    title, destination, start_date, end_date, budget
  });
  
  // Add selected events to itinerary
  for (const event of selectedEvents) {
    await addEventToTravelPlan(newItineraryId, event);
  }
}
```

**Integration:**
- `/api/itineraries` - CRUD operations
- `/api/itineraries/:id/items` - Add items to itinerary
- `/api/favorites` - Fetch saved events for selection

### 5. Event Card Component (`components/EventCard.tsx`)

**Features:**
- Responsive card layout
- Event metadata display (date, time, venue, price)
- Quick actions (View, Add to Itinerary)
- Integrated reviews component
- Source provider indication

**Design:**
- CSS Modules for scoped styling
- Conditional rendering for optional fields
- Accessibility considerations

### 6. Calendar View (`components/EventsCalendarView.tsx`)

**Features:**
- Full calendar visualization using react-big-calendar
- Event grouping by date
- Click to view event details
- Dynamic loading to avoid SSR issues

**Implementation:**
```typescript
// Dynamic import to avoid SSR issues
const EventsCalendarView = dynamic(
  () => import("@/components/EventsCalendarView"),
  { ssr: false, loading: () => <LoadingSpinner /> }
);
```

### 7. Hotel Search (`components/HotelsPlanner.tsx`)

**Features:**
- City-based hotel search
- Rating and price filtering
- Hotel card display with booking links
- Integration with itinerary system

---

## 🔌 Backend Integration

### API Client Architecture (`lib/apiClient.ts`)

**Centralized API Client:**
```typescript
class ApiClient {
  private baseUrl: string;
  
  // Automatic auth header injection
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('voyagerai_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }
  
  // Unified request method with error handling
  async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    // Handles errors, network issues, response parsing
  }
}
```

**Benefits:**
- Single source of truth for API calls
- Automatic authentication token injection
- Consistent error handling
- Type-safe responses

### API Endpoints Integration

**Events API:**
- `GET /api/events` - Search events with filters
- `GET /api/events/filters` - Get filter options
- `POST /api/favorites` - Save favorite events
- `GET /api/favorites` - Get user favorites

**Hotels API:**
- `GET /api/hotels/search` - Search hotels by city
- `GET /api/hotels` - List hotels with pagination
- `GET /api/hotels/cities` - Get available cities

**Itinerary API:**
- `GET /api/itineraries` - Get user itineraries
- `POST /api/itineraries` - Create itinerary
- `POST /api/itineraries/:id/items` - Add items
- `PUT /api/itineraries/:id` - Update itinerary
- `DELETE /api/itineraries/:id` - Delete itinerary

**AI/LLM API:**
- `POST /api/llm/chat` - Chat with AI assistant
- `POST /api/llm/itinerary/generate` - Generate AI itinerary

### Error Handling Strategy

**Frontend Error Handling:**
```typescript
try {
  const data = await apiClient.get('/api/events');
  // Handle success
} catch (error) {
  // User-friendly error messages
  setError(error.message || 'Failed to fetch events');
  // Fallback UI states
}
```

**Backend Error Responses:**
- Consistent error format: `{ success: false, error: "message" }`
- HTTP status codes for different error types
- Rate limiting (60/minute for most endpoints)

---

## 🔐 Authentication System

### AuthContext Implementation (`contexts/AuthContext.tsx`)

**Features:**
- JWT token management
- Automatic token verification on mount
- Persistent authentication state (localStorage)
- Protected route handling

**Implementation:**
```typescript
export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  
  // Token verification on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('voyagerai_token');
    if (storedToken) {
      verifyStoredToken(storedToken);
    }
  }, []);
  
  // Login handler
  const handleLogin = async (email, password) => {
    const response = await login(email, password);
    if (response.token && response.user) {
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('voyagerai_token', response.token);
    }
  };
}
```

### Authentication Flow

1. **Login/Signup**: User submits credentials
2. **Backend Validation**: Backend validates and returns JWT token
3. **Token Storage**: Token stored in localStorage
4. **Context Update**: AuthContext updates with user data
5. **Auto-verification**: Token verified on subsequent visits
6. **API Calls**: Token automatically included in API headers

### Protected Routes

**Implementation:**
```typescript
// In travel-plans page
if (!isAuthenticated) {
  return <RedirectToLogin />;
}
```

---

## 📊 State Management

### React Hooks Pattern

**Local State:**
- `useState` for component-level state
- `useEffect` for side effects and data fetching
- Custom hooks for reusable logic

**Global State:**
- `AuthContext` for authentication state
- No Redux/Zustand (kept simple for project scope)

### State Management Examples

**Event Search State:**
```typescript
const [ticketmasterEvents, setTicketmasterEvents] = useState<any[]>([]);
const [eventbriteEvents, setEventbriteEvents] = useState<any[]>([]);
const [csvEvents, setCsvEvents] = useState<any[]>([]);
const [filters, setFilters] = useState<any>({});
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

**Effect Dependencies:**
```typescript
// Separate effects for different concerns
useEffect(() => {
  fetchUserCity(); // Geolocation
}, []);

useEffect(() => {
  loadEvents(query, city, filters, searchType);
}, [city, searchType, query]);

useEffect(() => {
  if (filters && Object.keys(filters).length > 0) {
    loadEvents(query, cityToUse, filters, searchType);
  }
}, [JSON.stringify(filters)]);
```

---

## 🎨 UI/UX Design

### Design System

**Color Scheme:**
- Dark theme (gray-900, blue-900, black gradients)
- Accent colors: Blue-600, Purple-600 for CTAs
- Glass morphism effects (backdrop-blur)

**Typography:**
- Font: System fonts (Geist via Next.js)
- Headings: Bold, large sizes
- Body: Medium weight, readable sizes

**Components:**
- Glass-dark/glass-light utility classes
- Consistent border radius (rounded-lg, rounded-xl)
- Hover states and transitions
- Loading skeletons

### Responsive Design

**Breakpoints:**
- Mobile-first approach
- `md:` breakpoint for tablets
- `lg:` breakpoint for desktops

**Examples:**
```typescript
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>

// Responsive navigation
<nav className="hidden md:flex items-center space-x-6">
  {/* Links */}
</nav>
```

### User Experience Enhancements

1. **Loading States**: Skeleton loaders, spinners
2. **Error States**: User-friendly error messages
3. **Empty States**: Helpful messages when no data
4. **Optimistic Updates**: Immediate UI feedback
5. **Keyboard Navigation**: Enter to search, Escape to close modals

---

## 🔧 Key Technical Decisions

### 1. Next.js App Router
**Decision**: Use Next.js 15 with App Router instead of Pages Router
**Reason**: 
- Better React Server Components support
- Improved file-based routing
- Better performance with streaming

### 2. TypeScript
**Decision**: Full TypeScript implementation
**Reason**:
- Type safety for API responses
- Better IDE support
- Reduced runtime errors

### 3. Centralized API Client
**Decision**: Single `apiClient` class instead of scattered fetch calls
**Reason**:
- Consistent error handling
- Automatic auth token injection
- Easier to maintain and update

### 4. CSS Modules + Tailwind
**Decision**: Hybrid approach
**Reason**:
- Tailwind for utility classes
- CSS Modules for component-specific complex styles
- Best of both worlds

### 5. Context API for Auth
**Decision**: React Context instead of Redux
**Reason**:
- Simpler for authentication state
- Less boilerplate
- Sufficient for project scope

### 6. Dynamic Imports
**Decision**: Dynamic import for Calendar component
**Reason**:
- Avoid SSR issues with react-big-calendar
- Better code splitting
- Improved initial load time

---

## 🚀 Challenges & Solutions

### Challenge 1: Multiple Event Source Formats
**Problem**: Backend returns events in different formats (merged array vs. individual arrays)
**Solution**: 
```typescript
const hasIndividualArrays = data.ticketmaster !== undefined || 
                             data.eventbrite !== undefined;
if (hasIndividualArrays) {
  extractIndividualArrays(data);
} else if (data.merged) {
  handleMergedArray(data);
}
```

### Challenge 2: Geolocation Permission
**Problem**: Browser geolocation requires user consent
**Solution**: 
- Graceful fallback to manual city input
- Clear user messaging about location usage
- Optional feature, not required

### Challenge 3: Authentication State Persistence
**Problem**: Token verification on page refresh
**Solution**:
- Token stored in localStorage
- Automatic verification on AuthContext mount
- Fallback to login if token invalid

### Challenge 4: Real-time Filter Updates
**Problem**: Multiple filter changes causing excessive API calls
**Solution**:
- Separate useEffect for filters with JSON.stringify dependency
- Debouncing consideration (could be added)
- Smart dependency arrays

### Challenge 5: Calendar Component SSR
**Problem**: react-big-calendar doesn't work with SSR
**Solution**:
- Dynamic import with `ssr: false`
- Loading state during import
- Client-side only rendering

---

## 💡 Interview Talking Points

### Frontend Responsibilities

1. **Component Architecture**
   - "I designed a modular component structure with reusable UI components"
   - "Separated concerns: UI components, business logic, API integration"
   - "Used composition pattern for complex features like filters"

2. **State Management**
   - "Implemented React Context for global auth state"
   - "Used local state with hooks for component-specific data"
   - "Optimized re-renders with proper dependency arrays"

3. **API Integration**
   - "Created centralized API client for consistent error handling"
   - "Automatic JWT token injection for authenticated requests"
   - "Type-safe API responses with TypeScript interfaces"

4. **User Experience**
   - "Implemented loading states, error handling, and empty states"
   - "Responsive design with mobile-first approach"
   - "Accessibility considerations in form inputs and navigation"

5. **Performance Optimizations**
   - "Dynamic imports for heavy components (Calendar)"
   - "Optimized re-renders with React hooks best practices"
   - "Efficient state updates to minimize unnecessary API calls"

6. **Integration Challenges**
   - "Handled multiple event source formats from backend"
   - "Implemented fallback mechanisms for API failures"
   - "Coordinated frontend state with backend data structures"

### Technical Skills Demonstrated

- **React/Next.js**: Advanced hooks, context, dynamic imports
- **TypeScript**: Type safety, interfaces, type inference
- **API Integration**: RESTful APIs, error handling, authentication
- **State Management**: Context API, local state, effect management
- **UI/UX**: Responsive design, loading states, error handling
- **Problem Solving**: Multiple data formats, SSR issues, auth persistence

### Project Highlights

1. **Scalable Architecture**: Easy to add new features/components
2. **Type Safety**: Full TypeScript implementation
3. **User Experience**: Polished UI with proper loading/error states
4. **Integration**: Seamless backend integration with error handling
5. **Code Quality**: Clean, maintainable, well-organized code

### Areas for Improvement (Future Work)

1. **State Management**: Could add Zustand/Redux for complex state
2. **Testing**: Add unit tests for components and hooks
3. **Performance**: Implement virtual scrolling for large event lists
4. **Caching**: Add React Query for API response caching
5. **Accessibility**: Enhanced ARIA labels and keyboard navigation

---

## 📝 Code Examples

### Example 1: API Integration Pattern
```typescript
// lib/api.ts
export async function getEvents(): Promise<EventResponse> {
  const response = await fetch(`${API_BASE_URL}/api/events`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
}

// Usage in component
const loadEvents = async () => {
  setLoading(true);
  try {
    const data = await getEvents();
    setEvents(data.events);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

### Example 2: Authentication Flow
```typescript
// Login handler
const handleLogin = async (email: string, password: string) => {
  try {
    const response = await login(email, password);
    if (response.token && response.user) {
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('voyagerai_token', response.token);
      return { success: true };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};
```

### Example 3: Filter Management
```typescript
// Advanced filter component
const handleFilterChange = (key: string, value: string) => {
  const newFilters = { ...filters, [key]: value };
  setFilters(newFilters);
  onFiltersChange(newFilters); // Triggers parent update
};

// Parent component effect
useEffect(() => {
  if (filters && Object.keys(filters).length > 0) {
    loadEvents(query, city, filters, searchType);
  }
}, [JSON.stringify(filters)]);
```

---

## 🎓 Summary

This project demonstrates:
- **Full-stack integration** between Next.js frontend and Flask backend
- **Modern React patterns** with hooks, context, and TypeScript
- **User experience focus** with loading states, error handling, and responsive design
- **Scalable architecture** with reusable components and centralized API client
- **Problem-solving skills** in handling multiple data formats, SSR issues, and authentication

The frontend serves as the user interface layer, seamlessly integrating with backend APIs to provide a complete travel and event discovery experience with AI-powered features and collaborative planning capabilities.

