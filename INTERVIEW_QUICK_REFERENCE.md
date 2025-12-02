# VoyagerAI - Interview Quick Reference Guide

## 🎯 Project in 30 Seconds
**VoyagerAI** is a travel and event discovery platform I built. I was responsible for the **frontend and integration** work. It aggregates events from Ticketmaster, Eventbrite, and CSV sources, provides AI-powered recommendations, and allows users to create collaborative travel itineraries with hotels and events.

---

## 🛠️ Tech Stack (Quick Answer)
- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **State**: React Context API + Hooks
- **Backend**: Flask (Python) - RESTful APIs
- **Auth**: JWT tokens stored in localStorage
- **AI**: OpenAI integration via backend

---

## 💼 My Responsibilities

### Frontend Development
1. Built all React components and pages
2. Implemented authentication system with JWT
3. Created API client for backend integration
4. Designed responsive UI with Tailwind CSS
5. Implemented state management with Context API

### Integration Work
1. Integrated multiple event sources (Ticketmaster, Eventbrite, CSV)
2. Connected frontend to Flask backend APIs
3. Implemented real-time search and filtering
4. Integrated AI chat assistant
5. Connected itinerary system with events and hotels

---

## 🎨 Key Features I Built

### 1. Event Discovery System
- **What**: Search and filter events from multiple sources
- **How**: Unified state management for 3 event sources, real-time filtering
- **Tech**: React hooks, useEffect for data fetching, dynamic rendering

### 2. AI Chat Assistant
- **What**: Interactive chat for travel recommendations
- **How**: Conversation history management, API integration with backend LLM service
- **Tech**: React state, async API calls, error handling

### 3. Travel Itinerary Planner
- **What**: Create and manage travel plans with events/hotels
- **How**: CRUD operations, event selection from favorites, status tracking
- **Tech**: Form handling, API integration, state management

### 4. Advanced Filtering
- **What**: Dynamic filters (city, category, date range)
- **How**: Backend-driven filter options, real-time application
- **Tech**: Controlled components, useEffect for filter changes

### 5. Authentication System
- **What**: JWT-based login/signup with persistent sessions
- **How**: Context API for global state, localStorage for token persistence
- **Tech**: React Context, token verification, protected routes

---

## 🔧 Technical Challenges & Solutions

### Challenge 1: Multiple Event Source Formats
**Problem**: Backend returns events in different formats (merged vs. individual arrays)
**Solution**: Created handler functions to normalize data format before state update
```typescript
const hasIndividualArrays = data.ticketmaster !== undefined;
if (hasIndividualArrays) {
  extractIndividualArrays(data);
} else if (data.merged) {
  handleMergedArray(data);
}
```

### Challenge 2: Authentication Persistence
**Problem**: Token verification on page refresh
**Solution**: Automatic token verification in AuthContext on mount, fallback to login
```typescript
useEffect(() => {
  const token = localStorage.getItem('voyagerai_token');
  if (token) verifyStoredToken(token);
}, []);
```

### Challenge 3: Calendar Component SSR
**Problem**: react-big-calendar doesn't work with Next.js SSR
**Solution**: Dynamic import with `ssr: false` flag
```typescript
const EventsCalendarView = dynamic(
  () => import("@/components/EventsCalendarView"),
  { ssr: false }
);
```

### Challenge 4: Real-time Filter Updates
**Problem**: Multiple filter changes causing excessive API calls
**Solution**: Separate useEffect with JSON.stringify dependency, smart state updates

---

## 📊 Architecture Decisions

### Why Next.js App Router?
- Better React Server Components support
- Improved file-based routing
- Better performance with streaming

### Why Centralized API Client?
- Consistent error handling across all API calls
- Automatic JWT token injection
- Single place to update API configuration
- Type-safe responses

### Why Context API instead of Redux?
- Simpler for authentication state
- Less boilerplate code
- Sufficient for project scope
- Easier to maintain

### Why TypeScript?
- Type safety for API responses
- Better IDE autocomplete
- Reduced runtime errors
- Self-documenting code

---

## 🎯 Key Components I Built

### 1. `app/page.tsx` - Main Event Discovery
- Handles 3 event sources (Ticketmaster, Eventbrite, CSV)
- Geolocation-based city detection
- Dual view modes (List/Calendar)
- Real-time search and filtering

### 2. `components/AIChat.tsx` - AI Assistant
- Conversation history management
- Quick question suggestions
- Error handling and loading states
- Integration with backend LLM service

### 3. `contexts/AuthContext.tsx` - Authentication
- JWT token management
- Automatic token verification
- Persistent login state
- Protected route handling

### 4. `lib/apiClient.ts` - API Client
- Centralized API calls
- Automatic auth header injection
- Consistent error handling
- Type-safe responses

### 5. `app/travel-plans/page.tsx` - Itinerary Management
- CRUD operations for itineraries
- Event selection from favorites
- Status tracking and budget management
- Integration with events and hotels

---

## 🔌 Backend Integration Points

### Events API
- `GET /api/events` - Search with filters
- `GET /api/events/filters` - Get filter options
- `POST /api/favorites` - Save favorites

### Hotels API
- `GET /api/hotels/search` - Search by city
- `GET /api/hotels` - List with pagination

### Itinerary API
- `GET /api/itineraries` - Get user itineraries
- `POST /api/itineraries` - Create itinerary
- `POST /api/itineraries/:id/items` - Add items

### AI/LLM API
- `POST /api/llm/chat` - Chat with AI
- `POST /api/llm/itinerary/generate` - Generate itinerary

---

## 💡 Interview Answers Template

### "Tell me about your project"
"I built VoyagerAI, a travel and event discovery platform. I was responsible for the frontend and integration work. The platform aggregates events from multiple sources like Ticketmaster and Eventbrite, provides AI-powered recommendations, and allows users to create collaborative travel itineraries. I built it using Next.js, React, and TypeScript, with a focus on user experience and seamless backend integration."

### "What was your biggest challenge?"
"Handling multiple event source formats from the backend. The API could return events as merged arrays or individual source arrays. I solved this by creating normalization functions that handle both formats, ensuring the frontend always receives data in a consistent structure."

### "How did you handle authentication?"
"I implemented a JWT-based authentication system using React Context API. The token is stored in localStorage and automatically verified on page load. I created a centralized API client that injects the token into all authenticated requests, ensuring seamless authentication across the app."

### "How did you optimize performance?"
"I used dynamic imports for heavy components like the calendar view to avoid SSR issues. I optimized React re-renders with proper dependency arrays in useEffect hooks. I also implemented loading states and error boundaries to provide better user experience."

### "What would you improve?"
"I would add React Query for API response caching and better loading states. I'd implement unit tests for components and hooks. I'd also add virtual scrolling for large event lists to improve performance. Enhanced accessibility with better ARIA labels would also be a priority."

---

## 🎓 Skills Demonstrated

### Technical Skills
- ✅ React/Next.js (Hooks, Context, Dynamic Imports)
- ✅ TypeScript (Type Safety, Interfaces)
- ✅ API Integration (RESTful APIs, Error Handling)
- ✅ State Management (Context API, Local State)
- ✅ UI/UX (Responsive Design, Loading States)
- ✅ Problem Solving (Multiple Data Formats, SSR Issues)

### Soft Skills
- ✅ Integration with backend team
- ✅ Handling multiple data source formats
- ✅ User experience focus
- ✅ Code organization and maintainability

---

## 📝 Quick Code Snippets

### API Client Pattern
```typescript
// Centralized API client with auto auth
const data = await apiClient.post('/api/llm/chat', {
  message: text,
  email: user?.email,
  history: messages
});
```

### State Management Pattern
```typescript
// Multiple event sources
const [ticketmasterEvents, setTicketmasterEvents] = useState([]);
const [eventbriteEvents, setEventbriteEvents] = useState([]);
const [csvEvents, setCsvEvents] = useState([]);
```

### Authentication Pattern
```typescript
// Context-based auth
const { user, isAuthenticated, login } = useAuth();
if (!isAuthenticated) return <LoginPrompt />;
```

---

## 🚀 Project Highlights

1. **Scalable Architecture**: Easy to add new features
2. **Type Safety**: Full TypeScript implementation
3. **User Experience**: Polished UI with proper states
4. **Integration**: Seamless backend integration
5. **Code Quality**: Clean, maintainable code

---

## ❓ Common Interview Questions

### Q: Why did you choose Next.js?
**A**: "I chose Next.js for its App Router which provides better React Server Components support, improved file-based routing, and better performance with streaming. It also handles SSR automatically which was important for SEO."

### Q: How did you handle errors?
**A**: "I implemented a centralized error handling system in the API client. All API calls go through a single request method that catches errors, parses error responses, and throws user-friendly error messages. Components then display these errors in a user-friendly way."

### Q: How did you test your code?
**A**: "I tested manually by checking different scenarios - empty states, error states, loading states. For future improvements, I would add unit tests using Jest and React Testing Library, and integration tests for API calls."

### Q: What was your development process?
**A**: "I started by understanding the backend API structure, then designed the frontend components. I built the authentication system first, then the main event discovery page, followed by additional features like AI chat and itinerary planning. I iterated based on user feedback and backend changes."

---

## 🎯 Key Takeaways

1. **I built the entire frontend** - All components, pages, and integration
2. **I handled complex integrations** - Multiple data sources, AI, authentication
3. **I focused on UX** - Loading states, error handling, responsive design
4. **I wrote maintainable code** - TypeScript, centralized API client, organized structure
5. **I solved real problems** - Multiple data formats, SSR issues, auth persistence

---

**Remember**: Be confident, explain your thought process, and show enthusiasm for the technical challenges you solved!

