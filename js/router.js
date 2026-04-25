import { auth } from './auth.js';

// Define public and protected routes
const PUBLIC_ROUTES = [
    'landing-page.html', 
    'login.html', 
    'register.html', 
    'course-catalog.html', 
    'job-board.html', 
    'course-details.html',
    'index.html', // alias for landing
    '' // root
];

// Determine current page
const currentPath = window.location.pathname;
const currentPage = currentPath.split('/').pop() || 'landing-page.html';

// Remove query params if any for exact match checks
const pageNameOnly = currentPage.split('?')[0];

// Initialize routing
export const initRouter = () => {
    const isAuth = auth.isAuthenticated();
    const isPublicRoute = PUBLIC_ROUTES.includes(pageNameOnly);

    if (!isAuth && !isPublicRoute) {
        // Redirect unauthenticated users from protected pages
        window.location.href = 'login.html';
    } else if (isAuth && (pageNameOnly === 'login.html' || pageNameOnly === 'register.html')) {
        // Redirect authenticated users from login/register to dashboard
        window.location.href = 'student-dashboard.html';
    }
};

// Execute routing rules on load
initRouter();

