# Implementation Plan - Premium Company Profile Page

Create a premium, highly responsive Company Profile page (`CompanyProfile.jsx`) and its modular subcomponents. This page will display when navigating to `/company/:id`. It will maintain visual consistency with the CareerConnect design system, using the same dark navigation styling, pastel elements, card border-radii, and typography hierarchical levels.

## User Review Required

> [!IMPORTANT]
> - The route `/company/:id` will be mapped to `CompanyProfile` instead of `CompanyDetails`. The old empty `CompanyDetails` directory will be cleaned up.
> - A mock database of companies will be created and matched by the route `:id`. If not found, the component will load the first company as a fallback default.
> - The tabs navigation (Overview, Activities, Jobs, Employees, Reviews, Gallery, Contact) will be fully interactive, switching the rendered content in the main section.

## Open Questions

None. The user requirements specify all cards, headers, metadata parameters, stats, and sidebar sections.

## Proposed Changes

### Page Component

#### [NEW] [CompanyProfile.jsx](file:///d:/STUDY/project/career%20connect/client/career%20connect/src/pages/CompanyProfile/CompanyProfile.jsx)
Main page controller that houses the routing params (`id`), mock companies data, interactive active tab state, and standard layout grid (70% main, 30% sidebar). Renders `Navbar`, `CompanyHeader`, tabs sections, dynamic panel views, `CompanySidebar`, and `Footer`.

#### [DELETE] [CompanyDetails/](file:///d:/STUDY/project/career%20connect/client/career%20connect/src/pages/CompanyDetails)
Remove the empty placeholder directory.

---

### UI Components

#### [NEW] [CompanyHeader.jsx](file:///d:/STUDY/project/career%20connect/client/career%20connect/src/components/CompanyHeader/CompanyHeader.jsx)
Renders company name, verification badge, rating, logo, metadata (Size, Founded, Website, Followers), and actions (Favorite, Share, Follow, Visit Website).

#### [NEW] [CompanyTabs.jsx](file:///d:/STUDY/project/career%20connect/client/career%20connect/src/components/CompanyTabs/CompanyTabs.jsx)
Pill-based tab navbar displaying tab categories, updating active tab selection using the primary blue styling for active states.

#### [NEW] [CompanyOverview.jsx](file:///d:/STUDY/project/career%20connect/client/career%20connect/src/components/CompanyOverview/CompanyOverview.jsx)
Renders:
- "About Company" text section.
- "Why Join This Company" (Benefits) checklist grid.
- "Life at Company" responsive office photo gallery.
- "Company Technology Stack" tag collection.

#### [NEW] [CompanyActivity.jsx](file:///d:/STUDY/project/career%20connect/client/career%20connect/src/components/CompanyActivity/CompanyActivity.jsx)
Timeline view of corporate milestones (hiring trends, event scheduling, promotions).

#### [NEW] [CompanyJobs.jsx](file:///d:/STUDY/project/career%20connect/client/career%20connect/src/components/CompanyJobs/CompanyJobs.jsx)
Renders a grid list of open job card items at the company.

#### [NEW] [CompanySidebar.jsx](file:///d:/STUDY/project/career%20connect/client/career%20connect/src/components/CompanySidebar/CompanySidebar.jsx)
Acts as the sidebar wrapper, compiling:
- Company Statistics (Active jobs count, employees count, hiring rates, average salary, etc.)
- Quick Actions (Apply, Share, Visit website, Follow, Report)
- Hiring Team (Recruiter details with messaging actions)
- Contact Info Card

#### [NEW] [ContactCard.jsx](file:///d:/STUDY/project/career%20connect/client/career%20connect/src/components/ContactCard/ContactCard.jsx)
Renders company addresses, email contacts, LinkedIn channels, and a styled map location button.

---

### Routes Config

#### [MODIFY] [AppRoutes.jsx](file:///d:/STUDY/project/career%20connect/client/career%20connect/src/routes/AppRoutes.jsx)
Update imports and map the route `/company/:id` to `CompanyProfile`.

## Verification Plan

### Automated Verification
Vite compiler build validation command:
```bash
cmd /c npm run build
```

### Manual Verification
Ensure clicking the company logo or company name in `JobCard` correctly routes to `/company/:id` and loads the Company Profile page.
