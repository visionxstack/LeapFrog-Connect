import { auth } from '../auth.js';
import { courses } from '../mock-data.js';

document.addEventListener('DOMContentLoaded', () => {
    const user = auth.getUser();
    if (!user || user.role !== 'student') return;

    // Update Welcome Text
    const welcomeText = document.getElementById('welcome-text');
    if (welcomeText) {
        welcomeText.innerHTML = `Good morning, ${user.name.split(' ')[0]} 👋`;
    }

    const enrolledCourseIds = user.enrolledCourses || [];
    const statCourses = document.getElementById('stat-courses');
    if (statCourses) {
        statCourses.textContent = enrolledCourseIds.length;
    }

    const continueGrid = document.getElementById('continue-learning-grid');
    if (continueGrid) {
        if (enrolledCourseIds.length === 0) {
            continueGrid.innerHTML = `
                <div class="col-span-1 md:col-span-2 py-10 text-center text-on-surface-variant bg-white rounded-xl border border-slate-100">
                    <span class="material-symbols-outlined text-4xl mb-4 opacity-50 block">school</span>
                    <p class="text-lg font-medium mb-4">You are not enrolled in any courses yet.</p>
                    <a href="course-catalog.html" class="inline-block px-6 py-2 bg-primary-container text-white rounded-lg font-bold hover:opacity-90 transition-all">Browse Courses</a>
                </div>
            `;
        } else {
            const enrolledData = enrolledCourseIds.map(id => courses.find(c => c.id === id)).filter(Boolean);
            
            continueGrid.innerHTML = enrolledData.map(course => {
                const progress = Math.floor(Math.random() * 100); // Random progress for demo
                return `
                    <div class="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-all">
                        <div class="h-40 relative">
                            <img alt="${course.title}" class="w-full h-full object-cover" src="${course.image}" />
                            <div class="absolute inset-0 bg-gradient-to-t from-primary-container/80 to-transparent"></div>
                            <span class="absolute bottom-4 left-4 bg-error text-white text-[10px] font-black px-2 py-1 rounded uppercase">In Progress</span>
                        </div>
                        <div class="p-5">
                            <h4 class="text-lg font-serif font-bold text-primary-container mb-4 whitespace-nowrap overflow-hidden text-ellipsis">${course.title}</h4>
                            <div class="flex items-center justify-between text-sm mb-2">
                                <span class="text-secondary font-medium">Progress</span>
                                <span class="text-primary font-bold">${progress}%</span>
                            </div>
                            <div class="w-full h-1.5 bg-slate-100 rounded-full mb-4">
                                <div class="h-full bg-primary-container rounded-full" style="width: ${progress}%"></div>
                            </div>
                            <a href="course-detail.html?id=${course.id}" class="w-full py-2 bg-slate-50 hover:bg-slate-100 text-primary-container font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2">
                                Resume Lesson <span class="material-symbols-outlined text-[16px]">play_circle</span>
                            </a>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
});

