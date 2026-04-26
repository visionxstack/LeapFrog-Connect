
import { courses } from '../mock-data.js';

document.addEventListener('DOMContentLoaded', () => {
    const courseGrid = document.getElementById('course-grid');
    const searchInput = document.getElementById('search-input');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const levelFilters = document.querySelectorAll('.level-filter');
    const resetBtn = document.getElementById('reset-filters');

    const createCourseCard = (course) => {
        const isFree = course.price === 0;
        const priceText = isFree ? 'FREE' : `Rs. ${course.price.toLocaleString()}`;
        const priceClass = isFree ? 'text-sm font-bold text-white bg-green-600 px-3 py-1 rounded-full uppercase tracking-tighter' : 'text-xl font-black text-primary-container';
        
        let tagColor = 'bg-primary-container';
        if(course.category === 'Business') tagColor = 'bg-tertiary';
        if(course.category === 'Language') tagColor = 'bg-slate-400';

        return `
            <div class="bg-white rounded-xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.07)] overflow-hidden flex flex-col group hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-pointer" onclick="window.location.href='course-detail.html?id=${course.id}'">
                <div class="aspect-video relative overflow-hidden bg-slate-100">
                    <img class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" src="${course.image}" alt="${course.title}" loading="lazy" />
                    <div class="absolute top-4 right-4 ${tagColor} text-white text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded">
                        ${course.category}
                    </div>
                </div>
                <div class="p-6 flex flex-col flex-grow">
                    <div class="flex items-center gap-1 mb-2">
                        <span class="material-symbols-outlined text-tertiary text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
                        <span class="text-xs font-bold text-on-surface">${course.rating.toFixed(1)}</span>
                        <span class="text-xs text-on-surface-variant ml-1">(${course.enrolled.toLocaleString()} enrolled)</span>
                    </div>
                    <h3 class="text-lg font-bold text-primary-container mb-2 leading-snug group-hover:text-[#E63946] transition-colors line-clamp-2">
                        ${course.title}
                    </h3>
                    <p class="text-sm text-on-surface-variant mb-6 flex items-center gap-2">
                        <span class="material-symbols-outlined text-sm">person</span> ${course.instructor}
                    </p>
                    <div class="mt-auto flex justify-between items-center pt-4 border-t border-slate-50">
                        <span class="${priceClass}">${priceText}</span>
                        <button class="bg-[#1A1A2E] text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider hover:opacity-90">
                            ${isFree ? 'Access Course' : 'Enrol Now'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    };

    const renderCourses = () => {
        if (!courseGrid) return;
        
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        
        const activeCategories = Array.from(categoryFilters)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
            
        const activeLevelFilter = Array.from(levelFilters).find(rb => rb.checked);
        const activeLevel = activeLevelFilter ? activeLevelFilter.value : null;

        const filtered = courses.filter(course => {
            const matchSearch = course.title.toLowerCase().includes(searchTerm) || 
                              course.instructor.toLowerCase().includes(searchTerm) ||
                              course.tags.some(t => t.toLowerCase().includes(searchTerm));
            
            const matchCategory = activeCategories.length === 0 || activeCategories.includes(course.category);
            
            const matchLevel = !activeLevel || course.level === activeLevel;

            return matchSearch && matchCategory && matchLevel;
        });

        if (filtered.length === 0) {
            courseGrid.innerHTML = `
                <div class="col-span-full py-12 text-center text-on-surface-variant bg-white rounded-xl border border-slate-100 shadow-sm">
                    <span class="material-symbols-outlined text-4xl mb-4 opacity-50">search_off</span>
                    <p class="text-lg font-medium">No courses found matching your criteria.</p>
                    <button class="mt-4 text-primary font-bold hover:underline" onclick="document.getElementById('reset-filters')?.click()">Clear Filters</button>
                </div>
            `;
        } else {
            courseGrid.innerHTML = filtered.map(createCourseCard).join('');
        }
    };

    if (searchInput) searchInput.addEventListener('input', renderCourses);
    categoryFilters.forEach(cb => cb.addEventListener('change', renderCourses));
    levelFilters.forEach(rb => rb.addEventListener('change', renderCourses));
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if(searchInput) searchInput.value = '';
            categoryFilters.forEach(cb => cb.checked = false);
            levelFilters.forEach(rb => rb.checked = false);
            renderCourses();
        });
    }

    renderCourses();
});
