# Design Guidelines: PwC-Themed Secure Data Management Wizard

## Design Approach
**Corporate Design System Approach** - Following PwC's official brand standards with structured, professional layouts focused on clarity and trust.

## Color Palette (Official PwC Colors)
- **Primary**: #FF5F05 (PwC Orange) - primary buttons, wizard progress, key CTAs
- **Accent**: #D9391C (PwC Red) - alerts, warnings, critical actions
- **Warm Grey**: #D4CFC9 - dividers, subtle backgrounds, borders
- **Dark Grey**: #2D2D2D - primary text, headers
- **Light Grey**: #F0F0F0 - page backgrounds, card backgrounds
- **White**: #FFFFFF - card surfaces, button text

## Typography
- **Primary Font**: Helvetica Neue
- **Fallback**: Arial, Sans-serif
- **Hierarchy**:
  - Page Headers: 32px, bold, Dark Grey
  - Section Headers: 24px, bold, Dark Grey
  - Card Titles: 18px, semi-bold
  - Body Text: 14px, regular
  - Helper Text: 12px, regular, Warm Grey

## Layout System
- **Spacing Units**: Use consistent 8px grid (Tailwind: 2, 4, 6, 8, 12, 16, 20)
- **Container**: max-w-6xl, centered with px-6
- **Card Padding**: p-6 to p-8
- **Section Spacing**: py-8 between major sections

## Component Library

### Wizard Progress Bar
- Horizontal step indicator at top of page
- Active step: PwC Orange circle with white number
- Completed steps: PwC Orange with checkmark
- Upcoming steps: Light Grey circle with Dark Grey number
- Connecting lines in Warm Grey

### Buttons
- **Primary**: PwC Orange background (#FF5F05), white text, rounded-md, px-6 py-3, medium weight, sharp edges
- **Secondary**: White background, PwC Orange border (2px), PwC Orange text, same padding
- **Hover**: Slightly darker shade, no complex animations

### Input Fields
- Minimalistic rounded corners (rounded-md)
- Light Grey border in default state
- PwC Orange border on focus
- Dark Grey text
- Helper text in Warm Grey below field
- Generous padding (px-4 py-3)

### Cards
- Sharp-edged containers (rounded-lg)
- Soft shadow: shadow-md
- White background
- Warm Grey border (1px) for subtle definition
- Consistent internal padding (p-6)

### Tables
- Clean header with Dark Grey background, white text
- Alternating row colors: White and Light Grey (#F0F0F0)
- Warm Grey borders between columns
- Adequate cell padding (px-4 py-3)
- Dropdown actions styled with PwC colors

### Header
- Left-aligned PwC logo placeholder (80px height)
- Dark Grey background or white with subtle shadow
- Full-width, fixed or static positioning
- Consistent padding

## Page-Specific Layouts

### Step 1 - Data Input
- Three distinct card sections: File Upload, Text Paste, Database Connection
- Each card with icon, title, and form controls
- Checkbox group for options (Auto-detect schema, ML-based PII detection)
- Large, prominent "RUN SCAN" button in PwC Orange, centered below cards

### Step 2 - PII Detection Results
- Summary cards at top: Total Columns, PII Types Found (use grid-cols-3)
- Data table with columns: Column Name, PII Type, Category, Action Dropdown
- Action dropdown styled with PwC colors
- Footer with BACK (secondary) and NEXT (primary) buttons, right-aligned

### Step 3 - Sanitization Preview
- Side-by-side comparison table: Original | Sanitized
- Masked values shown with asterisks in Warm Grey
- Statistics card above table showing sanitization summary
- Action buttons: BACK, DOWNLOAD CLEAN FILE, SUBMIT TO GENAI TOOL (primary orange)

## Visual Patterns
- Consistent card elevation throughout
- Clean, ample whitespace between sections
- Professional, corporate aesthetic
- No decorative animations - focus on clarity
- Icons from Heroicons (outline style) in Dark Grey

## Images
No hero images required. This is a data management tool focused on functionality. Use icons and structured layouts instead.

## Responsive Behavior
- Desktop-first approach (primary use case)
- Cards stack vertically on smaller screens
- Tables remain scrollable horizontally if needed
- Maintain generous spacing across all viewpoints