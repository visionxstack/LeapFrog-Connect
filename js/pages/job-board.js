import { ui } from '../main.js';
import { jobs } from '../mock-data.js';
import { auth } from '../auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const jobGrid = document.getElementById('job-grid');
    const searchInput = document.getElementById('search-input');
    const locationSelect = document.getElementById('location-select');
    const typeFilters = document.querySelectorAll('.job-type-filter');
    const experienceSelect = document.getElementById('experience-select');
    const resetBtn = document.getElementById('reset-filters');
    const resultsCount = document.getElementById('results-count');
    const searchBtn = document.getElementById('search-btn');

    const renderJobs = () => {
        if (!jobGrid) return;
        
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const locFilter = locationSelect ? locationSelect.value : '';
        const expFilter = experienceSelect ? experienceSelect.value : '';
        
        const activeTypes = Array.from(typeFilters)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        const filtered = jobs.filter(job => {
            const matchSearch = job.title.toLowerCase().includes(searchTerm) || 
                              job.company.toLowerCase().includes(searchTerm) ||
                              job.tags.some(t => t.toLowerCase().includes(searchTerm));
            
            const matchLoc = locFilter === '' || job.location.includes(locFilter);
            const matchExp = expFilter === '' || job.level === expFilter;
            const matchType = activeTypes.length === 0 || activeTypes.includes(job.type);

            return matchSearch && matchLoc && matchExp && matchType;
        });

        if (resultsCount) {
            resultsCount.textContent = `Showing ${filtered.length} Available Position${filtered.length !== 1 ? 's' : ''}`;
        }

        if (filtered.length === 0) {
            jobGrid.innerHTML = `
                <div class="py-12 text-center text-on-surface-variant bg-white rounded-xl border border-slate-100">
                    <span class="material-symbols-outlined text-4xl mb-4 opacity-50">search_off</span>
                    <p class="text-lg font-medium">No jobs found matching your criteria.</p>
                </div>
            `;
        } else {
            jobGrid.innerHTML = filtered.map(job => `
                <div class="bg-white border border-slate-100 p-6 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.07)] hover:shadow-lg transition-all group">
                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="w-16 h-16 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">
                            <img class="w-10 h-10 object-contain transition-all" src="${job.logo}" alt="${job.company}" loading="lazy"/>
                        </div>
                        <div class="flex-grow">
                            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                                <h3 class="text-xl font-bold text-[#1A1A2E] group-hover:text-[#E63946] transition-colors">${job.title}</h3>
                                <span class="text-sm font-bold text-slate-900">${job.salary}</span>
                            </div>
                            <div class="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-on-surface-variant mb-4">
                                <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-base">domain</span>${job.company}</span>
                                <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-base">location_on</span>${job.location}</span>
                                <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-base">schedule</span>${job.postedAt}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex gap-2 flex-wrap">
                                    <span class="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-bold rounded-full border border-slate-200">${job.type}</span>
                                    ${job.tags.slice(0, 3).map(tag => `<span class="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-bold rounded-full border border-slate-200">${tag}</span>`).join('')}
                                </div>
                                <button data-job-id="${job.id}" class="apply-btn text-[#1A1A2E] font-bold text-sm hover:underline flex items-center gap-1">
                                    Apply Now <span class="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');

            document.querySelectorAll('.apply-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const jobId = parseInt(e.currentTarget.dataset.jobId);
                    openApplyModal(jobId);
                });
            });
        }
    };

    const openApplyModal = (jobId) => {
        if (!auth.isAuthenticated()) {
            if (ui && ui.showToast) ui.showToast('Please log in to apply for jobs.', 'error');
            setTimeout(() => window.location.href = 'login.html?redirect=job-board.html', 1500);
            return;
        }

        const user = auth.getUser();
        if (user.role !== 'student') {
            if (ui && ui.showToast) ui.showToast('Only students can apply for jobs.', 'error');
            return;
        }

        const job = jobs.find(j => j.id === jobId);
        if (!job) return;

        const modalHtml = `
            <div class="p-6">
                <div class="flex items-center gap-4 mb-6">
                    <img src="${job.logo}" class="w-12 h-12 rounded object-contain bg-slate-50 p-1" />
                    <div>
                        <h2 class="text-2xl font-bold text-slate-900 leading-tight">${job.title}</h2>
                        <p class="text-slate-500">${job.company} • ${job.location}</p>
                    </div>
                </div>
                
                <form id="apply-form" class="space-y-4">
                    <div>
                        <label class="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                        <input type="text" required value="${user.name}" class="w-full rounded-lg border-slate-300 bg-slate-50" disabled/>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-slate-700 mb-1">Email</label>
                        <input type="email" required value="${user.email}" class="w-full rounded-lg border-slate-300 bg-slate-50" disabled/>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-slate-700 mb-1">Portfolio or LinkedIn URL</label>
                        <input type="url" required placeholder="https://..." class="w-full rounded-lg border-slate-300 focus:ring-primary focus:border-primary"/>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-slate-700 mb-1">Cover Letter (Optional)</label>
                        <textarea rows="4" class="w-full rounded-lg border-slate-300 focus:ring-primary focus:border-primary" placeholder="Why are you a great fit?"></textarea>
                    </div>
                    <div class="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <button type="button" class="modal-close-btn px-4 py-2 text-slate-500 hover:text-slate-800 font-medium transition-colors">Cancel</button>
                        <button type="submit" class="px-6 py-2 bg-[#1A1A2E] text-white rounded-lg font-bold hover:opacity-90 transition-opacity">Submit Application</button>
                    </div>
                </form>
            </div>
        `;

        const modalEl = ui.showModal(modalHtml);
        
        const form = modalEl.querySelector('#apply-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="material-symbols-outlined animate-spin text-sm align-middle mr-1">progress_activity</span> Submitting...`;

            setTimeout(() => {
                let user = auth.getUser();
                if (user) {
                    user.appliedJobs = user.appliedJobs || [];
                    if (!user.appliedJobs.includes(job.id)) {
                        user.appliedJobs.push(job.id);
                        auth.updateUser(user);
                    }
                }
                const closeBtn = modalEl.querySelector('.modal-close-btn');
                if(closeBtn) closeBtn.click();
                
                if (ui && ui.showToast) ui.showToast(`Application submitted successfully to ${job.company}!`, 'success');
            }, 1000);
        });
    };

    if (searchBtn) searchBtn.addEventListener('click', renderJobs);
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') renderJobs();
        });
    }
    
    if (locationSelect) locationSelect.addEventListener('change', renderJobs);
    if (experienceSelect) experienceSelect.addEventListener('change', renderJobs);
    typeFilters.forEach(cb => cb.addEventListener('change', renderJobs));
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if(searchInput) searchInput.value = '';
            if(locationSelect) locationSelect.value = '';
            if(experienceSelect) experienceSelect.value = '';
            typeFilters.forEach(cb => cb.checked = false);
            renderJobs();
        });
    }

    renderJobs();
});

