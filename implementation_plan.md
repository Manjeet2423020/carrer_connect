# Implementation Plan - Premium Job Details Page

Create a premium, responsive Job Details page (`JobDetails.jsx`) and its reusable child components. This page will display when navigating to `/jobs/:id`. It will respect the existing typography, colors, border-radii, and styling patterns from the CareerConnect homepage while using a clean dashboard grid layout.

## User Review Required

> [!IMPORTANT]
> - All components will be placed in the requested modular folder structure under `src/components/` and `src/pages/`.
> - A mock database of jobs will be created. Navigating to `/jobs/:id` will dynamically load the matching job details. If the ID is not found, the component will load the first job as a fallback default.
> - The page layout uses a responsive 2-column grid on desktop (70% main content, 30% sidebar) and stacks vertically on tablet/mobile, with a sticky action bar on mobile.

## Open Questions

None. The user requirements are very detailed and cover all layout areas, preferences, sidebar cards, and header actions.

## Proposed Changes

### Page Component

#### [MODIFY] [JobDetails.jsx](file:///d:/STUDY/project/career%20connect/client/career%20connect/src/pages/JobDetails/JobDetails.jsx)
Implement the main page layout integrating the `Navbar`, the main content grid, and the `Footer`. Include dummy job data with realistic fields mapping to all child components.

---

### UI Components

#### [NEW] [JobHeader.jsx](file:///d:/STUDY/project/career%20connect/client/career%20connect/src/components/JobHeader/JobHeader.jsx)
Renders the top panel with:
- Metadata block: Job ID, employment type, location, open positions, posted date, experience required.
- Action buttons: Previous, Next, Save Job, Share, Favorite, Apply Now, and Edit.
- Navigation tabs: Overview, Information, Activity, Applicants, Company (Overview active with blue bottom border).

#### [NEW] [JobInformation.jsx](file:///d:/STUDY/project/career%20connect/client/career%20connect/src/components/JobInformation/JobInformation.jsx)
Renders key job metadata parameters (Department, Employment Type, Experience, Salary, Education, Location, Work Mode, Industry, Company Size) inside a premium sidebar card.

#### [NEW] [JobPreferences.jsx](file:///d:/STUDY/project/career%20connect/client/career%20connect/src/components/JobPreferences/JobPreferences.jsx)
Renders candidate requirements (Gender, Education, Experience, Nationality, Age, Languages, Employment Type, Work Mode, Salary Type) in modern rounded chip/pill layouts inside a white card.

#### [NEW] [JobDescription.jsx](file:///d:/STUDY/project/career%20connect/client/career%20connect/src/components/JobDescription/JobDescription.jsx)
Renders structured multi-paragraph job text covering responsibilities, requirements, qualifications, preferred skills, and communication skills in a readable format.

#### [NEW] [JobBenefits.jsx](file:///d:/STUDY/project/career%20connect/client/career%20connect/src/components/JobBenefits/JobBenefits.jsx)
Renders the "Benefits & Perks" grid with clean checkmarks.

#### [NEW] [HiringTeam.jsx](file:///d:/STUDY/project/career%20connect/client/career%20connect/src/components/HiringTeam/HiringTeam.jsx)
Renders a card showing recruiter profiles, online statuses, and action buttons (Assign, Message).

#### [NEW] [JobStatistics.jsx](file:///d:/STUDY/project/career%20connect/client/career%20connect/src/components/JobStatistics/JobStatistics.jsx)
Renders an application analytics dashboard widget showing views, applications, saved counts, and a visual match meter.

#### [NEW] [JobSidebar.jsx](file:///d:/STUDY/project/career%20connect/client/career%20connect/src/components/JobSidebar/JobSidebar.jsx)
Serves as the container for the right sidebar cards:
- Card 1: Application Timeline (Dates, Closing date, Days remaining progress bar)
- Card 2: Job Information (renders `JobInformation`)
- Card 3: Recruiter Team (renders `HiringTeam`)
- Card 4: Company Information (Rating, logo, founded year, size, website link, follow button)

#### [NEW] [ActionButtons.jsx](file:///d:/STUDY/project/career%20connect/client/career%20connect/src/components/ActionButtons/ActionButtons.jsx)
Renders the mobile sticky bottom bar with Save, Apply, and Share buttons.

## Verification Plan

### Automated Verification
Build project using Vite to check for compilation errors:
```bash
cmd /c npm run build
```

### Manual Verification
Ensure that routing works by clicking a Job Card "Details" button and verifying the URL updates to `/jobs/:id` and renders the fully detailed page.
