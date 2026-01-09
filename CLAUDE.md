# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SH-90 Limits is a Progressive Web App (PWA) displaying helicopter flight manual reference data for the SH-90 helicopter. The app provides operational limits for engines, hydraulics, transmission, speed/VNE, wind conditions, checklists, and operational notes. Built as a single-page React application optimized for mobile devices with offline capabilities.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (starts on port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Setup

Create a `.env.local` file with:
```
GEMINI_API_KEY=your_api_key_here
```

Note: The Gemini API key is configured in vite.config.ts but doesn't appear to be actively used in the current codebase.

## Architecture

### Core Structure

- **[App.tsx](APP90/App.tsx)**: Main application component with state management and navigation logic
- **[constants.tsx](APP90/constants.tsx)**: All flight manual data organized by category and subcategory
- **[types.ts](APP90/types.ts)**: TypeScript type definitions for limits, categories, and state
- **[index.tsx](APP90/index.tsx)**: Entry point with Service Worker registration
- **[sw.js](APP90/sw.js)**: Service Worker for offline caching and PWA functionality

### State Management

The app uses React useState with a single `TorqueState` object containing:
- `category`: Top-level selection (Engines, Speed, Hydraulics, etc.)
- `subCategory`: Specific system parameter within a category
- `mode`: Flight mode (AEO, OEI Training, OEI Real)
- `powerMode`: Power state (ON/OFF) - affects NR limits
- `speed`: Speed condition (Vi < 40, Vi > 80) - affects AEO torque limits

### Navigation Pattern

Three-level hierarchy:
1. **Home**: Category selection (7 categories)
2. **SubMenu**: System parameter selection within a category
3. **Limits Display**: Shows the relevant operational limits with mode/speed/power toggles

Navigation uses `goBack()` to move up one level and `goHome()` to return to the root.

### Data Organization

All operational limits are defined in [constants.tsx](APP90/constants.tsx) as arrays of `LimitValue` objects. Data is organized by:

- **Flight mode dependent**: `TORQUE_DATA`, `NG_DATA`, `IEBD_DATA` (keyed by `FlightMode`)
- **Power mode dependent**: `NR_DATA` (keyed by `PowerMode`)
- **Speed dependent**: Torque limits in AEO mode use `SpeedCondition` keys
- **Static**: Most other limits (oil temp/press, hydraulics, wind, speed/VNE, etc.)

The `useMemo` hook in [App.tsx](APP90/App.tsx:33-86) computes `activeLimits` based on current state, selecting the appropriate data from constants.

### Styling

- Uses **TailwindCSS** via CDN (loaded in [index.html](APP90/index.html))
- Custom CSS in [index.html](APP90/index.html:21-52) for safe area insets (iOS notch support), scrollbar hiding, and active states
- Font: Inter (UI) + JetBrains Mono (monospace for numbers)
- Dark theme with glassmorphic design (backdrop-blur, gradients, shadows)

### PWA Features

- **Service Worker** ([sw.js](APP90/sw.js)): Caches all assets for offline use
- **Manifest** (manifest.json): Defines app metadata for installation
- **Auto-update**: Service Worker checks for updates and prompts user to reload
- Cache versioning: `CACHE_NAME = 'sh90-v15'` - increment when deploying changes

### Deployment

The app is deployed to Cloudflare Pages with automatic Git integration:

**Automatic Deployment (Recommended)**:
- Push commits to the Git repository
- Cloudflare Pages automatically builds and deploys
- Build command: `npm run build`
- Build output directory: `dist`
- The project is configured as `sh-90-limits` on Cloudflare Pages

**Manual Deployment** (requires API token with Pages permissions):
1. Build the project: `npm run build`
2. Deploy: `npx wrangler pages deploy dist`

**Configuration**:
- [wrangler.jsonc](APP90/wrangler.jsonc) defines the Pages project name and build output directory

## Key Implementation Details

### Limit Display Logic

The `renderLimits()` function ([App.tsx](APP90/App.tsx:144-236)) handles three distinct UI patterns:
- **Checklist mode**: Displays step-by-step procedures (e.g., Engine Rinse)
- **Notes mode**: Displays warning notes with custom icons and styling
- **Limits mode**: Displays numeric limits with color-coded values, durations, and notes

### Mode-Dependent Controls

Some subcategories show mode/speed/power toggle buttons:
- `isModeDependent`: TQ, NG, IEBD show Flight Mode selector (AEO/OEI Training/OEI Real)
- TQ in AEO mode additionally shows Speed selector (Vi < 40 / Vi > 80)
- `isPowerDependent`: NR shows Power Mode selector (ON/OFF)

### Color Coding

Limits use text color classes to indicate severity:
- `text-emerald-400`: Normal operating range
- `text-cyan-400/500/600`: Operational limits (e.g., door speeds)
- `text-amber-400/500`: Caution range
- `text-red-400/500/600`: Maximum limits or forbidden ranges
- `text-blue-400`: Minimum values (e.g., cold start temp)

## Special Notes

- **Path alias**: `@/` resolves to project root (configured in [tsconfig.json](APP90/tsconfig.json:21-25) and [vite.config.ts](APP90/vite.config.ts:17-21))
- **TypeScript**: Uses React 19 with JSX transform, no emit (Vite handles compilation)
- **Italian comments**: Some comments and console logs are in Italian
- **Mobile-first**: Designed for iOS/Android with touch interactions, no scrollbars, safe area support
- **No routing library**: Navigation is state-based, no URL changes
