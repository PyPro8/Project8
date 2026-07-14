# Project 8 — Online Learning Platform (Frontend)

A fully static, frontend-only online learning platform built with **HTML5, CSS3, and Vanilla JavaScript**. No frameworks, no build step, no backend — just open `index.html` in a browser, or drop the folder onto any static host / Flask `static` + `templates` setup later.

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

## Notes

- All data (courses, instructors, assignments, stats) is realistic dummy data, either hard-coded in HTML or rendered client-side via small inline scripts.
- Every form (login, register, create course, edit profile) is validated and gives feedback via toast notifications — no requests are sent anywhere.
- Theme preference persists across page loads via `localStorage`.
- Fully responsive down to small phones (see `responsive.css`).
- To wire up a real backend (e.g. Flask): replace the inline dummy-data scripts with `fetch()` calls to your API endpoints, and swap `data-redirect` targets on forms with real POST actions.
