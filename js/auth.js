import { defaultUser } from './mock-data.js';

export const AUTH_KEY = 'lf_user';

export const auth = {
    login: (email, password, role) => {
        // Mock authentication - any password works for testing
        // Standard user: student@test.com
        if (email === 'student@test.com' || role === 'student') {
            const user = { ...defaultUser, email, role: 'student' };
            localStorage.setItem(AUTH_KEY, JSON.stringify(user));
            return true;
        }
        if (email === 'company@test.com' || role === 'company') {
            const user = { ...defaultUser, email, role: 'company', name: 'Company HR' };
            localStorage.setItem(AUTH_KEY, JSON.stringify(user));
            return true;
        }
        
        // Fallback for demo
        const user = { ...defaultUser, email, role: role || 'student' };
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        return true;
    },
    logout: () => {
        localStorage.removeItem(AUTH_KEY);
        window.location.href = 'login.html';
    },
    getUser: () => {
        const userStr = localStorage.getItem(AUTH_KEY);
        return userStr ? JSON.parse(userStr) : null;
    },
    isAuthenticated: () => {
        return !!localStorage.getItem(AUTH_KEY);
    },
    updateUser: (updates) => {
        const user = auth.getUser();
        if (user) {
            const updatedUser = { ...user, ...updates };
            localStorage.setItem(AUTH_KEY, JSON.stringify(updatedUser));
            return updatedUser;
        }
        return null;
    }
};

