# BillMaster - Comprehensive Billing Software

## Overview

BillMaster (BizBillPro) is a full-stack billing and inventory management application designed for businesses to track sales, purchases, production, and raw materials. The system provides comprehensive credit management, byproduct sales tracking, and real-time inventory monitoring. Built as a progressive web application, it's accessible from any device (Windows, Mac, iOS, Android) with a professional, data-dense interface suitable for financial operations.

## Features

- **Sales Entry**: Multi-line invoice creation with credit/cash options.
- **Purchase Entry**: Multi-line bill recording with vendor tracking and POs.
- **Production Tracking**: Raw material consumption and byproduct generation.
- **Inventory Management**: Real-time monitoring of raw materials with low-stock alerts.
- **Credit Management**: Comprehensive Accounts Receivable/Payable tracking.
- **Dashboard**: High-level aggregated statistics and recent transaction views.
- **Responsive UI**: Built with Shadcn/UI and Tailwind CSS for mobile-friendly, desktop-optimized layouts.
- **Dark/Light Mode**: Full theme support out-of-the-box.

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript in SPA mode (Wouter for routing).
- **UI Components**: Shadcn/ui (Radix UI) & Tailwind CSS.
- **State Management**: TanStack Query (React Query) & React Hook Form.
- **Data Validation**: Zod schemas.

### Backend
- **Server**: Node.js with Express.js.
- **Database**: PostgreSQL (Neon Serverless) with Drizzle ORM.
- **Session Management**: express-session & connect-pg-simple.

### Tooling
- **Build**: Vite (frontend) & esbuild (backend).
- **TypeScript**: `tsx` for backend development execution.

## Getting Started

### Prerequisites
- Node.js (v20+)
- PostgreSQL Database (or Neon Database)

### Installation

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables. Create a `.env` file in the root directory based on the expected variables (e.g., `DATABASE_URL`).

3. Push the database schema:
   ```bash
   npm run db:push
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Production Build

To build the application for production:
```bash
npm run build
```

To start the production server:
```bash
npm start
```

## Design Guidelines

BillMaster follows a professional, Material Design-influenced enterprise system:
- **Typography**: `Inter` for UI elements and `JetBrains Mono` for tabular/numeric data.
- **Colors**: Trustworthy blues (Primary), with distinct semantic colors for Success (Green), Warning (Amber), and Error (Red).
- **Interactions**: Minimal animations focused on utility (e.g., hover states, status transitions).
For more details, see the `design_guidelines.md` document.

## License
MIT License
