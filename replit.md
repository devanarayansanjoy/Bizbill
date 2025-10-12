# BillMaster - Comprehensive Billing Software

## Overview

BillMaster is a full-stack billing and inventory management application designed for businesses to track sales, purchases, production, and raw materials. The system provides comprehensive credit management, byproduct sales tracking, and real-time inventory monitoring. Built as a progressive web application, it's accessible from any device (Windows, Mac, iOS, Android) with a professional, data-dense interface suitable for financial operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript in SPA mode using Wouter for client-side routing

**UI Component System**: Shadcn/ui (Radix UI primitives) with Tailwind CSS
- Design philosophy: Material Design with Ant Design influences for business applications
- Theme system: Light/dark mode support with HSL-based color tokens
- Typography: Inter for UI, JetBrains Mono for numerical data and codes
- Component library includes 40+ pre-built components (buttons, forms, tables, dialogs, etc.)

**State Management**:
- TanStack Query (React Query) for server state with aggressive caching (staleTime: Infinity)
- React Hook Form with Zod resolvers for form validation
- Local state with React hooks

**Key Design Decisions**:
- Type-safe form handling using Zod schemas shared between client and server
- Optimistic UI updates with manual query invalidation
- Toast notifications for user feedback
- Responsive design with mobile-first breakpoint at 768px

### Backend Architecture

**Runtime**: Node.js with Express.js server

**API Pattern**: RESTful endpoints with conventional CRUD operations
- Route handlers in `server/routes.ts`
- Storage abstraction layer in `server/storage.ts` (currently in-memory, designed for database integration)
- Zod schema validation on all incoming requests

**Build System**:
- Vite for frontend bundling with HMR in development
- esbuild for backend compilation to ESM
- Development: tsx for TypeScript execution
- Production: Compiled JavaScript served from dist/

**Key Architectural Patterns**:
- Middleware-based request logging with response interception
- Separate development/production server setup
- API versioning prefix (/api/*)
- Centralized error handling middleware

### Data Schema

**ORM**: Drizzle ORM with PostgreSQL dialect
- Schema definition: `shared/schema.ts` with Zod integration
- Migration management via drizzle-kit
- Type-safe queries with full TypeScript inference

**Core Entities**:
1. **Customers** - Customer contact information
2. **Vendors** - Supplier contact information  
3. **Raw Materials** - Inventory items with stock levels and reorder points
4. **Sales** - Invoice records with line items, payment tracking, and credit status
5. **Purchases** - Bill records with line items, payment tracking, and credit status
6. **Production** - Manufacturing records linking raw materials to finished goods and byproducts
7. **Byproduct Sales** - Secondary product sales invoices

**Schema Design Patterns**:
- UUID primary keys with database-generated defaults
- Decimal types for monetary values (precision: 10, scale: 2)
- Embedded line items as JSON/text fields (not normalized)
- Payment status tracking (paid/partial/pending/overdue)
- Credit/cash sale flags with partial payment support

### Application Modules

1. **Dashboard** - Aggregated statistics and recent transaction views
2. **Sales Entry** - Multi-line invoice creation with credit/cash options
3. **Purchase Entry** - Multi-line bill recording with credit/cash options
4. **Production Tracking** - Raw material consumption and byproduct generation
5. **Raw Materials** - Inventory monitoring with low-stock alerts
6. **Credit Management** - Accounts receivable/payable tracking
7. **Byproduct Sales** - Secondary product invoice generation

## External Dependencies

### Database
- **Neon Database** (@neondatabase/serverless): Serverless PostgreSQL with connection pooling
- Connection managed via DATABASE_URL environment variable
- Session storage: connect-pg-simple for PostgreSQL-backed sessions

### UI Libraries
- **Radix UI**: Headless component primitives (40+ packages for dialogs, dropdowns, navigation, etc.)
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **Lucide React**: Icon library
- **Embla Carousel**: Touch-friendly carousels
- **cmdk**: Command palette component

### Form & Validation
- **React Hook Form**: Form state management with validation
- **Zod**: Schema validation shared between client/server
- **@hookform/resolvers**: Zod integration for React Hook Form
- **drizzle-zod**: Automatic Zod schema generation from Drizzle tables

### Development Tools
- **Vite**: Frontend build tool with HMR
- **tsx**: TypeScript execution for development
- **esbuild**: Production backend bundling
- **Replit plugins**: Runtime error overlay, cartographer, dev banner (development only)

### Utilities
- **date-fns**: Date formatting and manipulation
- **class-variance-authority**: Type-safe component variants
- **clsx + tailwind-merge**: Conditional CSS class composition
- **nanoid**: Unique ID generation (likely for client-side temporary IDs)