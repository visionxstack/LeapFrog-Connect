import { auth } from './auth.js';

// Expose auth to window for inline HTML handlers
window.lfAuth = auth;

export const ui = {
    injectNavigation: async () => {
        const isAuth = auth.isAuthenticated();
        const user = auth.getUser();
        
        const navContainer = document.getElementById('navbar-container');
        const sidebarContainer = document.getElementById('sidebar-container');

        // Determine base path
        const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);

        if (navContainer) {
            try {
                const response = await fetch(basePath + 'navbar.html');
                if(response.ok) {
                    const html = await response.text();
                    navContainer.innerHTML = html;
                }
            } catch (err) {
                console.error("Failed to load navbar via fetch. Use a local server.", err);
            }

            // Adjust visibility based on auth state
            if (isAuth) {
                document.getElementById('nav-public-links')?.classList.add('hidden');
                document.getElementById('nav-public-links')?.classList.remove('md:flex');
                document.getElementById('nav-public-actions')?.classList.add('hidden');
                document.getElementById('nav-public-actions')?.classList.remove('flex');
                
                const studentLinks = document.getElementById('nav-student-links');
                if(studentLinks) studentLinks.style.display = '';
                
                const studentActions = document.getElementById('nav-student-actions');
                if(studentActions) {
                    studentActions.style.display = '';
                    studentActions.classList.add('flex');
                }

                // If sidebar exists, adjust main navbar to make room for it on desktop
                if (sidebarContainer) {
                    const mainNav = document.getElementById('main-navbar');
                    if(mainNav) {
                        mainNav.classList.add('md:ml-[240px]', 'md:w-[calc(100%-240px)]');
                    }
                }
            } else {
                document.getElementById('nav-public-links')?.classList.add('md:flex');
                document.getElementById('nav-public-actions')?.classList.add('flex');
            }
        }

        if (isAuth && sidebarContainer) {
            try {
                const response = await fetch(basePath + 'sidebar.html');
                if(response.ok) {
                    const html = await response.text();
                    sidebarContainer.innerHTML = html;
                    
                    if (user && user.name) {
                        const sideNameEl = document.getElementById('sidebar-user-name');
                        if (sideNameEl) sideNameEl.textContent = user.name;
                    }
                }
            } catch (err) {
                console.error("Failed to load sidebar via fetch.", err);
            }
        }

        ui.highlightActiveLinks();
    },

    highlightActiveLinks: () => {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const pageNameOnly = currentPath.split('?')[0];
        
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(pageNameOnly)) {
                // Top nav active state
                if (link.closest('#main-navbar')) {
                    link.classList.add('text-slate-900', 'dark:text-white', 'border-b-2', 'border-slate-900', 'dark:border-white', 'pb-1', 'font-semibold');
                    link.classList.remove('text-slate-500', 'font-medium');
                }
                // Sidebar active state
                if (link.closest('aside')) {
                    link.classList.add('bg-white', 'dark:bg-slate-900', 'border', 'border-slate-200', 'dark:border-slate-800', 'shadow-sm', 'text-slate-900', 'dark:text-white', 'font-bold');
                    link.classList.remove('text-slate-600', 'dark:text-slate-400');
                }
            }
        });
    },

    showToast: (message, type = 'success') => {
        const toastId = 'lf-toast';
        let toast = document.getElementById(toastId);
        
        if (!toast) {
            toast = document.createElement('div');
            toast.id = toastId;
            document.body.appendChild(toast);
        }
        
        const bgColor = type === 'success' ? 'bg-[#1A1A2E]' : (type === 'error' ? 'bg-[#E63946]' : 'bg-slate-800');
        
        toast.className = `fixed bottom-5 right-5 px-6 py-3 rounded-lg text-white font-bold text-sm shadow-lg z-[100] transition-opacity duration-300 opacity-100 flex items-center gap-3 ${bgColor}`;
        
        const icon = type === 'success' ? 'check_circle' : 'error';
        toast.innerHTML = `<span class="material-symbols-outlined text-[20px]">${icon}</span> ${message}`;

        if (toast.hideTimeout) clearTimeout(toast.hideTimeout);
        
        toast.hideTimeout = setTimeout(() => {
            toast.classList.replace('opacity-100', 'opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    showModal: (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    },

    hideModal: (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    },

    showPageLoader: () => {
        let loader = document.getElementById('lf-page-loader');
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'lf-page-loader';
            loader.className = 'fixed inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-[200] flex flex-col items-center justify-center transition-opacity duration-300';
            loader.innerHTML = `
                <div class="w-12 h-12 border-4 border-slate-200 border-t-[#1A1A2E] rounded-full animate-spin mb-4"></div>
                <p class="text-[#1A1A2E] dark:text-white font-bold font-serif tracking-widest uppercase text-sm">Loading</p>
            `;
            document.body.appendChild(loader);
        }
        loader.classList.remove('opacity-0', 'pointer-events-none');
    },

    hidePageLoader: () => {
        const loader = document.getElementById('lf-page-loader');
        if (loader) {
            loader.classList.add('opacity-0', 'pointer-events-none');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ui.injectNavigation();
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop') || e.target.getAttribute('data-close-modal')) {
        const modal = e.target.closest('.fixed.inset-0');
        if (modal) ui.hideModal(modal.id);
    }
});

