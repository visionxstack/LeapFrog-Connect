import { ui } from '../main.js';
import { auth } from '../auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const user = auth.getUser();
    if (!user) return; 

    const mockCertificates = [
        {
            id: 'LF-REACT-901',
            title: 'Advanced React Patterns',
            description: 'Mastering hooks, performance optimization, and custom state management.',
            issueDate: 'Aug 12, 2023',
            icon: 'terminal',
            category: 'Tech Stack'
        },
        {
            id: 'LF-PM-4421',
            title: 'Project Management Core',
            description: 'Agile methodologies, sprint planning, and team orchestration fundamentals.',
            issueDate: 'Jun 04, 2023',
            icon: 'account_tree',
            category: 'Management'
        },
        {
            id: 'LF-SEC-1105',
            title: 'Cybersecurity Fundamentals',
            description: 'Digital asset protection, threat modeling, and secure coding practices.',
            issueDate: 'Mar 22, 2023',
            icon: 'security',
            category: 'Security'
        }
    ];

    const certGrid = document.getElementById('certificates-grid');
    const emptyState = document.getElementById('empty-state');
    const certCount = document.getElementById('cert-count');

    if (certGrid && emptyState && certCount) {
        if (mockCertificates.length === 0) {
            certGrid.style.display = 'none';
            emptyState.classList.remove('hidden');
            certCount.textContent = '0 Certificates Total';
        } else {
            certGrid.style.display = 'grid';
            emptyState.classList.add('hidden');
            certCount.textContent = `${mockCertificates.length} Certificates Total`;

            certGrid.innerHTML = mockCertificates.map(cert => `
                <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-[0_2px_8px_rgba(0,0,0,0.07)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-shadow group">
                    <div class="flex justify-between items-start mb-6">
                        <div class="h-12 w-12 bg-slate-50 rounded-lg flex items-center justify-center text-[#1A1A2E] group-hover:bg-[#1A1A2E] group-hover:text-white transition-colors">
                            <span class="material-symbols-outlined" data-icon="${cert.icon}">${cert.icon}</span>
                        </div>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${cert.category}</span>
                    </div>
                    <h5 class="text-lg font-bold text-[#1A1A2E] mb-1">${cert.title}</h5>
                    <p class="text-xs text-slate-500 mb-6">${cert.description}</p>
                    <div class="space-y-2 mb-6">
                        <div class="flex justify-between text-xs">
                            <span class="text-slate-400">Issued</span>
                            <span class="text-slate-700 font-medium">${cert.issueDate}</span>
                        </div>
                        <div class="flex justify-between text-xs">
                            <span class="text-slate-400">ID</span>
                            <span class="text-slate-700 font-mono uppercase">${cert.id}</span>
                        </div>
                    </div>
                    <div class="flex gap-2 pt-4 border-t border-gray-100">
                        <button class="flex-1 bg-slate-50 text-[#1A1A2E] py-2 rounded font-bold text-xs hover:bg-slate-100 transition-colors">View</button>
                        <button class="p-2 text-slate-400 hover:text-[#E63946] transition-colors" onclick="alert('Share link copied to clipboard!')">
                            <span class="material-symbols-outlined text-lg" data-icon="share">share</span>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
});

