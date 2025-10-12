# Design Guidelines: Comprehensive Billing Software

## Design Approach: Enterprise Design System

**Selected System**: Material Design with Ant Design influences for business applications
**Justification**: This billing software requires robust data handling, complex forms, and professional aesthetics. Material Design provides excellent component patterns for data-dense applications while maintaining visual clarity.

**Key Design Principles**:
- Clarity over decoration - every element serves a functional purpose
- Scannable data presentation with consistent visual hierarchy
- Trustworthy, professional aesthetic appropriate for financial software
- Efficient workflows that minimize clicks and cognitive load

## Core Design Elements

### A. Color Palette

**Light Mode (Default for business software)**:
- Primary: 216 100% 50% (Professional blue - trust and reliability)
- Secondary: 216 20% 20% (Dark slate for text and headers)
- Success: 142 71% 45% (Green for completed transactions)
- Warning: 38 92% 50% (Amber for pending/credit items)
- Error: 0 84% 60% (Red for overdue/alerts)
- Background: 0 0% 98% (Light neutral)
- Surface: 0 0% 100% (White cards and panels)
- Border: 220 13% 91% (Subtle dividers)

**Dark Mode**:
- Primary: 216 100% 60%
- Background: 220 13% 12%
- Surface: 220 13% 16%
- Border: 220 13% 25%
- Text Primary: 0 0% 95%
- Text Secondary: 0 0% 70%

### B. Typography

**Font Stack**: 'Inter' for UI, 'JetBrains Mono' for numerical data and codes
- Display/Headers: 600 weight, sizes 2xl to 4xl
- Body Text: 400 weight, base to lg
- Data Tables: 500 weight, sm to base (tabular numbers enabled)
- Form Labels: 500 weight, sm
- Invoice Numbers/IDs: Mono font, 500 weight

### C. Layout System

**Spacing Primitives**: Tailwind units of 1, 2, 4, 6, 8, 12, 16
- Micro spacing (form elements): p-1, p-2, gap-2
- Component spacing: p-4, p-6, gap-4
- Section spacing: p-8, p-12, gap-8
- Page margins: p-16 on desktop, p-4 on mobile

**Grid System**:
- Dashboard: 12-column responsive grid
- Forms: 2-column layout on desktop, single column on mobile
- Data tables: Full-width with horizontal scroll on mobile

### D. Component Library

**Navigation**:
- Sidebar navigation (collapsible on mobile) with icon + label
- Top bar with user profile, notifications, and quick actions
- Breadcrumb navigation for deep hierarchies
- Module switcher dropdown for quick access

**Forms**:
- Grouped form sections with clear headings
- Inline validation with real-time feedback
- Smart autocomplete for customer/vendor selection
- Date pickers with keyboard shortcuts
- Number inputs with increment/decrement controls
- Multi-step forms for complex transactions

**Data Displays**:
- Sortable, filterable data tables with pagination
- Status badges (Paid, Pending, Overdue, Completed)
- Invoice/Bill cards with key information preview
- KPI cards with trending indicators
- Stock level bars with color-coded thresholds

**Dashboards**:
- 4-column metric cards on desktop (Total Sales, Pending Payments, Stock Alerts, Recent Activity)
- Line charts for sales trends with comparison periods
- Bar charts for top customers/products
- Quick action buttons for common tasks

**Overlays**:
- Modal dialogs for confirmations and quick edits
- Slide-out panels for detailed transaction views
- Dropdown menus with search for long lists
- Toast notifications for success/error feedback

### E. Animation

**Minimal & Purposeful**:
- Table row highlights on hover (100ms transition)
- Smooth dropdown animations (150ms ease-out)
- Status badge color transitions (200ms)
- NO page transitions or elaborate effects

## Specific Module Designs

**Sales Entry Module**: Clean form layout with customer autocomplete, dynamic line items table, automatic total calculation, and invoice preview panel

**Purchase Entry Module**: Similar to sales with vendor-specific fields, purchase order tracking, and delivery status indicators

**Production Module**: Split view with raw material input table on left, production output on right, automatic cost calculation, and byproduct tracking section below

**Credit Management**: Dedicated tabs for credit sales and purchases, payment schedule timeline, aging reports with color-coded overdue periods

**Inventory Dashboard**: Grid of material cards with stock levels, visual indicators (red for low stock, green for adequate), reorder point alerts

## Accessibility & Cross-Platform

- Touch-friendly button sizes (min 44px height)
- Keyboard shortcuts for power users (Ctrl+S to save, Ctrl+N for new entry)
- Consistent dark mode across all forms and inputs
- Responsive breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)
- Progressive web app capabilities for offline invoice viewing

## Data Presentation Standards

- Currency formatting with proper locale support
- Date formats: DD/MM/YYYY for entry, relative dates for lists ("2 days ago")
- Tabular numbers for perfect column alignment
- Visual separators between form sections (subtle borders, not heavy dividers)
- Print-optimized invoice templates with company branding area

**Critical UX Patterns**:
- Auto-save drafts every 30 seconds
- Confirmation dialogs for destructive actions
- Bulk action capabilities with multi-select
- Export functionality (PDF, Excel) prominently placed
- Recent items quick access in each module