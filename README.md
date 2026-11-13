# Doctor Tracker - Frontend

Administrative dashboard built with Next.js 15, React 19, and Tailwind CSS 3.

## Setup

```bash
cd Doctor-Tracker/frontend
cp .env.example .env.local
# Edit .env.local if needed:
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

npm install           # installs all dependencies
npm run dev           # starts dev server at http://localhost:3000
npm run build         # creates production build in .next/
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000/api` | Base URL of the Express API (includes `/api` prefix) |

## Pages

| Path | Description |
|------|-------------|
| `/` | Redirects to `/login` if not authenticated |
| `/login` | Login page with email/password |
| `/dashboard` | Dashboard with real stats from API |
| `/doctors` | List, search, filter, paginate doctors |
| `/doctors/add` | Add new doctor form |
| `/doctors/:id` | Doctor detail page with patient list |
| `/patients` | List, search, filter, paginate patients |
| `/patients/add` | Add new patient form |
| `/patients/:id` | Patient detail page |

## UI Components

Reusable components in `components/ui/`:
- `Button` - primary/secondary/danger variants
- `Badge` - condition-themed badges
- `LoadingSpinner` - animated spinner
- `EmptyState` - empty list state
- `ErrorState` - error with retry button
- `PageHeader` - page title with optional actions
- `StatCard` - dashboard statistic card
- `ChartCard` - chart container card
- `FormInput` - accessible form input with label/error/hint
- `SelectInput` - accessible select dropdown
- `SearchInput` - search input with icon
- `FilterDropdown` - filter dropdown with "All" option
- `Pagination` - pagination controls
- `DataTable` - reusable data table with loading/empty states
- `Modal` - accessible modal dialog
- `ConfirmationDialog` - delete confirmation dialog
- `ToastProvider` + `useToast` - toast notification system

## Features

- Login / logout with HttpOnly cookie authentication
- Dashboard with real API stats (total doctors, patients, avg per doctor, new this month)
- Doctor CRUD with search, specialization filter, pagination, sorting
- Patient CRUD with doctor/condition filters, search
- Doctor-patient relationship (patients belong to a doctor)
- Delete protection: doctors can't be deleted while patients exist
- Fixed enums: SPECIALIZATIONS and CONDITIONS (sync with backend)
- Toast notifications for all user actions
- Confirmation dialogs for destructive actions
- Responsive design working from mobile to desktop
- Recharts integration for condition distribution and registrations charts

## Build Notes

The frontend uses Next.js 15 App Router. Some pages use `'use client'` directives to enable React hooks. The build may show warnings about component exports and `useSearchParams` suspense boundaries, but the application functions correctly.

## Available Scripts

- `npm run dev` - start development server with hot reload
- `npm run build` - create optimized production build
- `npm run start` - start production server