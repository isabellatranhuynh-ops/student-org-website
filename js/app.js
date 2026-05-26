// Main Application Logic

// Load hero content on homepage
function loadHeroContent() {
    const content = Storage.getHeroContent();
    const titleEl = document.getElementById('heroTitle');
    const descEl = document.getElementById('heroDescription');
    
    if (titleEl) titleEl.textContent = content.title;
    if (descEl) descEl.textContent = content.description;
}

// Load about content
function loadAboutContent() {
    const content = Storage.getAboutContent();
    const aboutEl = document.getElementById('aboutContent');
    const missionEl = document.getElementById('missionContent');
    const valuesEl = document.getElementById('valuesContent');
    
    if (aboutEl) aboutEl.innerHTML = `<p>${content.about}</p>`;
    if (missionEl) missionEl.innerHTML = `<p>${content.mission}</p>`;
    if (valuesEl) valuesEl.innerHTML = `<p>${content.values}</p>`;
}

// Load team members
function loadTeamMembers() {
    const teamEl = document.getElementById('teamMembers');
    if (!teamEl) return;
    
    const members = Storage.getTeamMembers();
    
    if (members.length === 0) {
        teamEl.innerHTML = '<p>No team members yet.</p>';
        return;
    }
    
    teamEl.innerHTML = members.map(member => `
        <div class="team-member">
            <div class="team-member-image">
                ${member.image ? `<img src="${member.image}" alt="${member.name}">` : '<p style="color: #ccc;">No image</p>'}
            </div>
            <div class="team-member-info">
                <h3>${member.name}</h3>
                <div class="team-member-role">${member.role}</div>
                <span class="team-member-rank">${member.rank}</span>
                <p class="team-member-bio">${member.bio}</p>
            </div>
        </div>
    `).join('');
}

// Load announcements
function loadAnnouncements() {
    const announcementsEl = document.getElementById('announcementsList');
    if (!announcementsEl) return;
    
    const announcements = Storage.getAnnouncements();
    
    if (announcements.length === 0) {
        announcementsEl.innerHTML = '<p>No announcements yet.</p>';
        return;
    }
    
    announcementsEl.innerHTML = announcements.map(announcement => `
        <div class="announcement">
            <h3>${announcement.title}</h3>
            <div class="announcement-date">${new Date(announcement.date).toLocaleDateString()}</div>
            <p>${announcement.content}</p>
        </div>
    `).join('');
}

// Load survey
function loadSurvey() {
    const surveyEl = document.getElementById('surveyContainer');
    if (!surveyEl) return;
    
    const questions = Storage.getSurveyQuestions();
    
    if (questions.length === 0) {
        surveyEl.innerHTML = '<p>No survey questions yet.</p>';
        return;
    }
    
    const form = `
        <form id="surveyForm" class="form">
            ${questions.map(q => `
                <div class="form-group">
                    <label>${q.question}</label>
                    ${generateSurveyInput(q)}
                </div>
            `).join('')}
            <button type="submit" class="btn btn-primary">Submit Survey</button>
        </form>
        <div id="surveyMessage" class="message"></div>
    `;
    
    surveyEl.innerHTML = form;
    document.getElementById('surveyForm').addEventListener('submit', submitSurvey);
}

function generateSurveyInput(question) {
    switch (question.type) {
        case 'text':
            return `<textarea name="q${question.id}" rows="3" required></textarea>`;
        case 'multiple':
            const options = question.options || [];
            return `
                <div>
                    ${options.map((opt, i) => `
                        <label style="display: block; margin: 0.5rem 0;">
                            <input type="radio" name="q${question.id}" value="${opt}" required> ${opt}
                        </label>
                    `).join('')}
                </div>
            `;
        case 'rating':
            return `
                <div style="display: flex; gap: 0.5rem;">
                    ${[1, 2, 3, 4, 5].map(i => `
                        <label style="cursor: pointer;">
                            <input type="radio" name="q${question.id}" value="${i}" required> ${i}
                        </label>
                    `).join('')}
                </div>
            `;
        default:
            return `<input type="text" name="q${question.id}" required>`;
    }
}

function submitSurvey(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const responses = {};
    
    for (let [key, value] of formData) {
        responses[key] = value;
    }
    
    Storage.addSurveyResponse(responses);
    
    const messageEl = document.getElementById('surveyMessage');
    messageEl.classList.add('show', 'success');
    messageEl.textContent = 'Thank you for completing the survey!';
    form.reset();
    
    setTimeout(() => {
        messageEl.classList.remove('show', 'success');
    }, 3000);
}

// Load resources
function loadResources() {
    const resourcesEl = document.getElementById('resourcesList');
    if (!resourcesEl) return;
    
    const resources = Storage.getResources();
    
    if (resources.length === 0) {
        resourcesEl.innerHTML = '<p>No resources yet.</p>';
        return;
    }
    
    resourcesEl.innerHTML = resources.map(resource => `
        <div class="resource">
            <h3>${resource.title}</h3>
            <p>${resource.description}</p>
            <a href="${resource.link}" target="_blank">View Resource →</a>
        </div>
    `).join('');
}

// Handle application form submission
function initApplicationForm() {
    const form = document.getElementById('leadershipForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const application = {
            name: formData.get('name'),
            email: formData.get('email'),
            duration: formData.get('duration'),
            contributions: formData.get('contributions'),
            whyLeadership: formData.get('whyLeadership'),
            leadershipStyle: formData.get('leadershipStyle'),
            role: formData.get('role')
        };
        
        Storage.addApplication(application);
        
        const messageEl = document.getElementById('applicationMessage');
        messageEl.classList.add('show', 'success');
        messageEl.textContent = 'Application submitted successfully! We will review your application soon.';
        form.reset();
        
        setTimeout(() => {
            messageEl.classList.remove('show', 'success');
        }, 3000);
    });
}

// Initialize page on load
function initPage() {
    loadHeroContent();
    loadAboutContent();
    loadTeamMembers();
    loadAnnouncements();
    loadSurvey();
    loadResources();
    initApplicationForm();
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}
