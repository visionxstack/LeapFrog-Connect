import { ui } from '../main.js';
import { courses } from '../mock-data.js';
import { auth } from '../auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    let courseId = parseInt(urlParams.get('id'));

    // Default to first course if no ID provided for demo purposes
    if (isNaN(courseId)) {
        courseId = courses[0].id;
    }

    const course = courses.find(c => c.id === courseId);

    if (!course) {
        if (ui && ui.showToast) ui.showToast('Course not found.', 'error');
        setTimeout(() => window.location.href = 'course-catalog.html', 1500);
        return;
    }

    // Populate DOM with course data
    const safeSetText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };

    safeSetText('course-title-breadcrumb', course.title);
    safeSetText('course-hero-title', course.title);
    safeSetText('course-category-badge', course.category);
    safeSetText('course-instructor-name', course.instructor);
    safeSetText('course-rating', course.rating.toFixed(1));
    safeSetText('course-enrolled', course.enrolled.toLocaleString());

    const imgEl = document.getElementById('course-hero-img');
    if (imgEl) imgEl.src = course.image;

    const instImg = document.getElementById('course-instructor-img');
    if (instImg) instImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(course.instructor)}&background=random&color=fff`;

    const badge = document.getElementById('course-category-badge');
    if (badge) {
        badge.className = 'text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block text-white';
        if (course.category === 'Business') badge.classList.add('bg-tertiary');
        else if (course.category === 'Language') badge.classList.add('bg-slate-400');
        else badge.classList.add('bg-primary-container');
    }

    const descEl = document.getElementById('course-description');
    if (descEl) {
        descEl.innerHTML = `
            <p>Master the fundamental concepts and advanced techniques in <strong>${course.category}</strong>. This comprehensive program is designed to elevate your professional trajectory and equip you with highly sought-after skills.</p>
            <p>Join ${course.enrolled.toLocaleString()} other students under the guidance of ${course.instructor}. Ensure your competitive edge in today's demanding job market with industry-aligned curriculum.</p>
        `;
    }

    const isFree = course.price === 0;
    safeSetText('course-price', isFree ? 'FREE' : `Rs. ${course.price.toLocaleString()}`);
    safeSetText('course-old-price', isFree ? '' : `Rs. ${(course.price * 1.6).toLocaleString()}`);

    const enrollBtn = document.getElementById('enroll-btn');
    if (enrollBtn) {
        enrollBtn.textContent = isFree ? 'Access Course' : 'Enroll Now';

        enrollBtn.addEventListener('click', () => {
            if (!auth.isAuthenticated()) {
                if (ui && ui.showToast) ui.showToast('Please log in to enroll.', 'error');
                setTimeout(() => {
                    window.location.href = `login.html?redirect=course-detail.html?id=${course.id}`;
                }, 1500);
                return;
            }

            const user = auth.getUser();
            if (user.role !== 'student') {
                if (ui && ui.showToast) ui.showToast('Only student accounts can enroll in courses.', 'error');
                return;
            }

            // Check if already enrolled
            const enrolledCourses = user.enrolledCourses || [];
            if (enrolledCourses.includes(course.id)) {
                if (ui && ui.showToast) ui.showToast('You are already enrolled in this course!', 'info');
                return;
            }

            // Mock Enrollment Process
            enrollBtn.disabled = true;
            enrollBtn.innerHTML = `<span class="material-symbols-outlined animate-spin mr-2" style="font-size: 18px; vertical-align: text-bottom;">progress_activity</span> Processing...`;
            
            setTimeout(() => {
                user.enrolledCourses = [...enrolledCourses, course.id];
                auth.updateUser(user);
                
                if (ui && ui.showToast) ui.showToast('Successfully enrolled! Redirecting to dashboard...', 'success');
                
                setTimeout(() => {
                    window.location.href = 'student-dashboard.html';
                }, 1500);
            }, 1000);
        });
    }
});

