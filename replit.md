# Secure Sensitive Data Management for GenAI

## Overview

This is a PwC-branded web application for secure sensitive data management designed for GenAI systems. The application provides a three-step wizard interface that allows users to input data, detect personally identifiable information (PII), and preview sanitized data before processing with GenAI systems.

The application is currently UI-only with mock data implementations, designed to demonstrate the complete user flow for data sanitization workflows. It features a corporate design system following PwC's official brand standards with focus on trust, clarity, and professional presentation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework Stack**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for state management and data fetching patterns

**UI Component System**
- shadcn/ui component library (New York style variant) built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom PwC theme configuration
- Design system implements PwC brand colors (Orange #FF5F05, Red #D9391C, Warm Grey #D4CFC9)
- Helvetica Neue typography with structured spacing using 8px grid system

**State Management Pattern**
- React Context API (WizardContext) for centralized wizard state management
- All input fields are controlled directly by the context via updateDataInput helper
- Immediate state synchronization across all pages when navigating between routes
- Mock data services simulate backend responses for PII detection and sanitization

**Form Management**
- React Hook Form with Zod schema validation (@hookform/resolvers)
- Type-safe form definitions using drizzle-zod for schema generation
- Validation schemas defined in shared/schema.ts for consistency

### Backend Architecture

**Server Framework**
- Express.js application with TypeScript
- Dual-mode setup: development (index-dev.ts) and production (index-prod.ts)
- Development mode integrates Vite middleware for SSR and HMR
- Production mode serves static build artifacts

**API Structure**
- RESTful API pattern with /api prefix convention
- Route registration system in server/routes.ts (currently minimal as app is UI-only)
- Storage interface pattern (IStorage) prepared for future database integration

**Build System**
- Vite for frontend bundling with React plugin
- esbuild for backend bundling (ESM format, Node.js platform target)
- Separate build outputs: dist/public for frontend, dist/index.js for backend

### Data Storage Solutions

**Current State**
- In-memory storage implementation (MemStorage class)
- No active database connection as application is UI-only with mock data

**Prepared Database Integration**
- Drizzle ORM configured for PostgreSQL dialect
- Neon serverless PostgreSQL driver (@neondatabase/serverless) included
- Migration system configured (drizzle-kit) with migrations output to ./migrations
- Schema definitions ready in shared/schema.ts using Zod validation

**Schema Design**
The prepared schema includes:
- File metadata tracking (name, size, type)
- Data input configurations (auto-detection flags, ML settings)
- PII column definitions with categories (Direct PII, Indirect PII, Non-PII)
- Action types for data sanitization (mask, tokenize, hash, remove, keep)
- Sanitization preview structures for before/after comparison

### Authentication and Authorization

No authentication or authorization mechanisms are currently implemented. The application is designed as a proof-of-concept wizard interface without user management or session handling.

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Comprehensive suite of accessible, unstyled UI primitives (@radix-ui/react-*)
- **Lucide React**: Icon library for consistent iconography
- **date-fns**: Date manipulation and formatting utilities
- **class-variance-authority & clsx**: Type-safe variant styling and className utilities
- **cmdk**: Command menu component for enhanced UX
- **embla-carousel-react**: Carousel/slider component implementation

### Database & ORM
- **Drizzle ORM**: TypeScript ORM with Zod integration for type-safe database operations
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver for edge deployment
- **connect-pg-simple**: PostgreSQL session store (prepared for future session management)

### Build Tools & Development
- **Vite**: Frontend build tool with plugin ecosystem (@vitejs/plugin-react)
- **Replit Integration**: Development plugins for runtime error overlay, cartographer, and dev banner
- **esbuild**: Fast JavaScript/TypeScript bundler for backend production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

### Type Safety & Validation
- **Zod**: Schema validation library used throughout for type-safe data validation
- **TypeScript**: Strict mode enabled with path mapping for clean imports
- **drizzle-zod**: Bridge between Drizzle schemas and Zod validation

### Routing & State
- **wouter**: Minimalist routing library (2KB alternative to React Router)
- **@tanstack/react-query**: Server state management and caching

### Design System Notes
The application strictly adheres to PwC brand guidelines with custom Tailwind configuration mapping semantic color tokens (primary, destructive, muted, accent) to PwC's official color palette. The component system is built to be corporate-focused with sharp edges, minimal animations, and clear visual hierarchy.

## Recent Changes

### December 1, 2025 - UI Simplification and Folder Upload
- **Sidebar Updates**:
  - Changed "File Upload" to "Folder Upload" with FolderOpen icon
  - Removed "Text Paste" option completely
  - Only two options remain: Folder Upload and Database Connection
- **Step 1 (Data Input) Changes**:
  - Changed from single file upload to folder upload supporting multiple file types (DOC, DOCX, XLSX, CSV, TXT)
  - Removed Detection Options card (auto-detect schema and ML detection checkboxes)
  - Added display of uploaded file count and total size
  - Fixed state persistence when navigating between pages
- **Step 2 (PII Detection) Changes**:
  - Removed Action column from analysis table
  - Table now shows only 3 columns: Column Name, PII Type, PII Category
  - Replaced "Next: Preview" button with "Submit" button
  - Added confirmation modal on Submit: "Are you sure you want to mask these values?" with Yes/No options
- **Step 3 (Sanitization Preview) Changes**:
  - Removed "Total Columns" and "Protection Rate" cards
  - Only "Sanitized Columns" card remains
  - Removed "Column Name" from Before vs After comparison table
  - Table now shows only Original Value and Sanitized Value
- **Cleanup**:
  - Removed TextPaste.tsx page and route
  - App.tsx cleaned up to remove TextPaste import

### November 25, 2025 - Centralized State Management Refactoring
- **Logo Integration**: Replaced "PwC" text with official pwc_logo.jpeg in Header component
- **Sidebar Navigation**: Implemented collapsible left sidebar using shadcn/ui Sidebar component
  - Contains "Data Input Options" menu with Folder Upload and Database Connection links
  - Uses SidebarProvider at app root with proper width configuration
  - Hamburger toggle integrated in Header for collapse/expand functionality
- **State Management Architecture**: Complete refactoring to eliminate local state
  - All input fields (fileMetadata, dbName, tableName, query) controlled by WizardContext
  - Introduced updateDataInput helper for partial state updates with proper merging
  - Navigation between routes preserves all data without loss

### Application Routes
- `/` - Step 1: Folder Upload data input
- `/database-connection` - Database Connection input (sidebar access)
- `/step2` - Step 2: PII Detection Results
- `/step3` - Step 3: Sanitization Preview

### Key Implementation Details
- Folder upload supports multi-file selection with DOC, DOCX, XLSX, CSV, TXT extensions
- Context-driven rendering ensures data consistency across navigation
- Mock data services provide realistic PII detection results for demonstration
- PwC branding maintained consistently throughout all pages and components
- Confirmation modal uses shadcn AlertDialog component for consistent styling