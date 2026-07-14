# Project 8 — Online Learning Platform 
## Structure

```
Project-8/
├── index.html                 Landing page
├── login.html                 Login
├── register.html              Register (student/instructor role toggle)
├── student-dashboard.html     Student dashboard
├── instructor-dashboard.html  Instructor dashboard
├── courses.html                Course catalogue with filters
├── course-details.html        Single course page (tabs, curriculum, reviews)
├── assignments.html           Assignment tracker
├── progress.html              Progress, certificates, achievements
├── profile.html                User profile + edit modal
├── 404.html                    Not found page
│
├── css/
│   ├── style.css        Design tokens, navbar, footer, buttons, cards
│   ├── dashboard.css    Sidebar layouts, overview cards, activity feed
│   ├── auth.css         Login/register split-screen layout
│   ├── course.css       Course listing/details, assignments, progress, profile, modal, 404
│   └── responsive.css   All breakpoints (loaded last)
│
├── js/
│   ├── theme.js         Light/dark theme toggle (persisted in localStorage)
│   ├── main.js          Nav, tabs, accordions, carousel, toasts, scroll reveal
│   ├── dashboard.js     Dashboard-only form/UI handlers
│   └── validation.js    Login/register client-side validation
│
├── images/               (empty — all imagery currently loaded from Unsplash/Pravatar URLs)
└── assets/
    ├── icons/
    └── illustrations/
```

