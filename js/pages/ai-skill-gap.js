import { ui } from '../main.js';
import { auth } from '../auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const user = auth.getUser();
    if (!user) return;

    const analyzeBtn = document.getElementById('analyze-btn');
    const resultSection = document.getElementById('analysis-result-section');

    if (analyzeBtn && resultSection) {
        analyzeBtn.addEventListener('click', () => {
            const originalText = analyzeBtn.innerHTML;
            analyzeBtn.innerHTML = `<span class="material-symbols-outlined animate-spin text-sm mr-2">progress_activity</span> Analyzing Profile...`;
            analyzeBtn.disabled = true;

            setTimeout(() => {
                analyzeBtn.innerHTML = originalText;
                analyzeBtn.disabled = false;
                resultSection.classList.remove('hidden');
                
                resultSection.scrollIntoView({ behavior: 'smooth' });
                
                ui.showToast('Analysis complete. Review your insights below.', 'success');
            }, 1500);
        });
    }
});

