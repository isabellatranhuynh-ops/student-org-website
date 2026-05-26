// Admin Dashboard Logic

// Check authentication
function checkAuth() {
    const user = Storage.getSession();
    if (!user) {
        document.getElementById('loginPage').style.display = 'flex';
        document.getElementById('adminPanel').style.display = 'none';
        return false;
    }
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'flex';
    return true;
}

// Login handler
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (Storage.checkAuth(username, password)) {
                Storage.setSession(username);
                checkAuth();
                loadAdminDashboard();
                loginForm.reset();
            } else {
                const messageEl = document.getElementById('loginMessage');
                messageEl.classList.add('show', 'error');
                messageEl.textContent = 'Invalid username or password';
                setTimeout(() => messageEl.classList.remove('show'), 3000);
            }
        });
    }
    
    // Logout handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            Storage.clearSession();
            checkAuth();
            document.getElementById('loginForm').reset();
        });
    }
    
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
            
            // Add active class
            btn.classList.add('active');
            const tabName = btn.getAttribute('data-tab');
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });
    
    // Survey type change
    const surveyType = document.getElementById('surveyType');
    if (surveyType) {
        surveyType.addEventListener('change', () => {
            const optionsGroup = document.getElementById('optionsGroup');
            if (surveyType.value === 'multiple') {
                optionsGroup.style.display = 'block';
            } else {
                optionsGroup.style.display = 'none';
            }
        });
    }
    
    loadAdminDashboard();
});

function loadAdminDashboard() {
    loadHeroContentForm();
    loadAboutContentForms();
    loadTeamMembersAdmin();
    loadAnnouncementsAdmin();
    loadSurveyAdmin();
    loadResourcesAdmin();
    loadApplicationsAdmin();
    loadImagesAdmin();
}

// HERO CONTENT
function loadHeroContentForm() {
    const content = Storage.getHeroContent();
    document.getElementById('heroTitle').value = content.title;
    document.getElementById('heroDescription').value = content.description;
}

window.saveHeroContent = function() {
    const title = document.getElementById('heroTitle').value;
    const description = document.getElementById('heroDescription').value;
    Storage.saveHeroContent(title, description);
    showMessage('Hero content saved!', 'success');
};

// ABOUT CONTENT
function loadAboutContentForms() {
    const content = Storage.getAboutContent();
    document.getElementById('aboutContentEdit').value = content.about;
    document.getElementById('missionContentEdit').value = content.mission;
    document.getElementById('valuesContentEdit').value = content.values;
}

window.saveAboutContent = function(type) {
    const content = document.getElementById(`${type}ContentEdit`).value;
    Storage.saveAboutContent(type, content);
    showMessage(`${type} content saved!`, 'success');
};

// TEAM MEMBERS
function loadTeamMembersAdmin() {
    const members = Storage.getTeamMembers();
    const listEl = document.getElementById('teamMembersList');
    
    listEl.innerHTML = members.map(member => `
        <div class="member-item">
            <div class="member-item-content">
                <h5>${member.name}</h5>
                <p><strong>Role:</strong> ${member.role}</p>
                <p><strong>Rank:</strong> ${member.rank}</p>
                <p><strong>Bio:</strong> ${member.bio}</p>
                ${member.image ? `<p><strong>Image:</strong> ${member.image}</p>` : ''}
            </div>
            <div class="member-item-actions">
                <button class="btn btn-danger" onclick="deleteTeamMemberAdmin(${member.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

window.addTeamMember = function() {
    const name = document.getElementById('teamName').value.trim();
    const role = document.getElementById('teamRole').value.trim();
    const bio = document.getElementById('teamBio').value.trim();
    const image = document.getElementById('teamImage').value.trim();
    const rank = document.getElementById('teamRank').value;
    
    if (!name || !role || !bio) {
        showMessage('Please fill all required fields', 'error');
        return;
    }
    
    Storage.addTeamMember({ name, role, bio, image, rank });
    loadTeamMembersAdmin();
    document.getElementById('teamName').value = '';
    document.getElementById('teamRole').value = '';
    document.getElementById('teamBio').value = '';
    document.getElementById('teamImage').value = '';
    showMessage('Team member added!', 'success');
};

window.deleteTeamMemberAdmin = function(id) {
    if (confirm('Delete this team member?')) {
        Storage.deleteTeamMember(id);
        loadTeamMembersAdmin();
        showMessage('Team member deleted!', 'success');
    }
};

// ANNOUNCEMENTS
function loadAnnouncementsAdmin() {
    const announcements = Storage.getAnnouncements();
    const listEl = document.getElementById('announcementsList');
    
    listEl.innerHTML = announcements.map(ann => `
        <div class="announcement-item">
            <div class="announcement-item-content">
                <h5>${ann.title}</h5>
                <p>${ann.content}</p>
                <small>${new Date(ann.date).toLocaleString()}</small>
            </div>
            <div class="announcement-item-actions">
                <button class="btn btn-danger" onclick="deleteAnnouncementAdmin(${ann.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

window.addAnnouncement = function() {
    const title = document.getElementById('announcementTitle').value.trim();
    const content = document.getElementById('announcementContent').value.trim();
    
    if (!title || !content) {
        showMessage('Please fill all fields', 'error');
        return;
    }
    
    Storage.addAnnouncement({ title, content });
    loadAnnouncementsAdmin();
    document.getElementById('announcementTitle').value = '';
    document.getElementById('announcementContent').value = '';
    showMessage('Announcement posted!', 'success');
};

window.deleteAnnouncementAdmin = function(id) {
    if (confirm('Delete this announcement?')) {
        Storage.deleteAnnouncement(id);
        loadAnnouncementsAdmin();
        showMessage('Announcement deleted!', 'success');
    }
};

// SURVEY
function loadSurveyAdmin() {
    const questions = Storage.getSurveyQuestions();
    const listEl = document.getElementById('surveyQuestionsList');
    
    listEl.innerHTML = questions.map(q => `
        <div class="survey-item">
            <div class="survey-item-content">
                <h5>${q.question}</h5>
                <p><strong>Type:</strong> ${q.type}</p>
                ${q.options ? `<p><strong>Options:</strong> ${q.options.join(', ')}</p>` : ''}
            </div>
            <div class="survey-item-actions">
                <button class="btn btn-danger" onclick="deleteSurveyQuestionAdmin(${q.id})">Delete</button>
            </div>
        </div>
    `).join('');
    
    loadSurveyResponses();
}

window.addSurveyQuestion = function() {
    const question = document.getElementById('surveyQuestion').value.trim();
    const type = document.getElementById('surveyType').value;
    const optionsInput = document.getElementById('surveyOptions').value.trim();
    
    if (!question) {
        showMessage('Please enter a question', 'error');
        return;
    }
    
    const options = type === 'multiple' ? optionsInput.split(',').map(o => o.trim()) : null;
    
    Storage.addSurveyQuestion({ question, type, options });
    loadSurveyAdmin();
    document.getElementById('surveyQuestion').value = '';
    document.getElementById('surveyOptions').value = '';
    showMessage('Survey question added!', 'success');
};

window.deleteSurveyQuestionAdmin = function(id) {
    if (confirm('Delete this question?')) {
        Storage.deleteSurveyQuestion(id);
        loadSurveyAdmin();
        showMessage('Question deleted!', 'success');
    }
};

function loadSurveyResponses() {
    const responses = Storage.getSurveyResponses();
    const listEl = document.getElementById('surveyResponses');
    
    if (responses.length === 0) {
        listEl.innerHTML = '<p>No responses yet.</p>';
        return;
    }
    
    listEl.innerHTML = `
        <p><strong>Total Responses:</strong> ${responses.length}</p>
        <button class="btn btn-primary" onclick="exportSurveyResponses()">Export Responses</button>
    `;
}

window.exportSurveyResponses = function() {
    const responses = Storage.getSurveyResponses();
    const csv = 'data:text/csv;charset=utf-8,' + encodeURIComponent(
        'Date,' + Object.keys(responses[0] || {}).join(',') + '\n' +
        responses.map(r => Object.values(r).join(',')).join('\n')
    );
    const link = document.createElement('a');
    link.setAttribute('href', csv);
    link.setAttribute('download', 'survey_responses.csv');
    link.click();
};

// RESOURCES
function loadResourcesAdmin() {
    const resources = Storage.getResources();
    const listEl = document.getElementById('resourcesList');
    
    listEl.innerHTML = resources.map(res => `
        <div class="resource-item">
            <div class="resource-item-content">
                <h5>${res.title}</h5>
                <p>${res.description}</p>
                <p><strong>Link:</strong> <a href="${res.link}" target="_blank">${res.link}</a></p>
            </div>
            <div class="resource-item-actions">
                <button class="btn btn-danger" onclick="deleteResourceAdmin(${res.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

window.addResource = function() {
    const title = document.getElementById('resourceTitle').value.trim();
    const description = document.getElementById('resourceDescription').value.trim();
    const link = document.getElementById('resourceLink').value.trim();
    
    if (!title || !description || !link) {
        showMessage('Please fill all fields', 'error');
        return;
    }
    
    Storage.addResource({ title, description, link });
    loadResourcesAdmin();
    document.getElementById('resourceTitle').value = '';
    document.getElementById('resourceDescription').value = '';
    document.getElementById('resourceLink').value = '';
    showMessage('Resource added!', 'success');
};

window.deleteResourceAdmin = function(id) {
    if (confirm('Delete this resource?')) {
        Storage.deleteResource(id);
        loadResourcesAdmin();
        showMessage('Resource deleted!', 'success');
    }
};

// APPLICATIONS
function loadApplicationsAdmin() {
    const applications = Storage.getApplications();
    const listEl = document.getElementById('applicationsList');
    
    if (applications.length === 0) {
        listEl.innerHTML = '<p>No applications yet.</p>';
        return;
    }
    
    listEl.innerHTML = applications.map(app => `
        <div class="application-item">
            <div class="application-item-content">
                <h5>${app.name}</h5>
                <p><strong>Email:</strong> ${app.email}</p>
                <p><strong>Role Applied:</strong> ${app.role}</p>
                <p><strong>Member Duration:</strong> ${app.duration}</p>
                <p><strong>Contributions:</strong> ${app.contributions}</p>
                <p><strong>Why Leadership:</strong> ${app.whyLeadership}</p>
                <p><strong>Leadership Style:</strong> ${app.leadershipStyle}</p>
                <p><strong>Status:</strong> <span style="color: ${app.status === 'approved' ? 'green' : app.status === 'rejected' ? 'red' : 'orange'};">${app.status}</span></p>
                <small>${new Date(app.date).toLocaleString()}</small>
            </div>
            <div class="application-item-actions">
                <button class="btn btn-primary" onclick="updateApplicationStatus(${app.id}, 'approved')">Approve</button>
                <button class="btn btn-secondary" onclick="updateApplicationStatus(${app.id}, 'rejected')">Reject</button>
            </div>
        </div>
    `).join('');
}

window.updateApplicationStatus = function(id, status) {
    Storage.updateApplicationStatus(id, status);
    loadApplicationsAdmin();
    showMessage(`Application ${status}!`, 'success');
};

// IMAGES
function loadImagesAdmin() {
    const images = Storage.getImages();
    const gridEl = document.getElementById('imagesList');
    
    if (images.length === 0) {
        gridEl.innerHTML = '<p>No images uploaded yet.</p>';
        return;
    }
    
    gridEl.innerHTML = images.map(img => `
        <div class="image-card">
            <img src="${img.data}" alt="${img.name}">
            <div class="image-card-info">
                <input type="text" value="${img.url}" readonly>
                <div class="image-card-actions">
                    <button class="btn btn-primary" onclick="copyImageUrl('${img.url}')">Copy</button>
                    <button class="btn btn-danger" onclick="deleteImageAdmin(${img.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

window.uploadImage = function() {
    const fileInput = document.getElementById('imageFile');
    const nameInput = document.getElementById('imageName');
    const messageEl = document.getElementById('uploadMessage');
    
    if (!fileInput.files[0]) {
        messageEl.classList.add('show', 'error');
        messageEl.textContent = 'Please select an image';
        setTimeout(() => messageEl.classList.remove('show'), 3000);
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const imageName = nameInput.value.trim() || 'image_' + Date.now();
        const imageUrl = `images/${imageName}`;
        
        Storage.addImage({
            name: imageName,
            url: imageUrl,
            data: e.target.result
        });
        
        loadImagesAdmin();
        fileInput.value = '';
        nameInput.value = '';
        messageEl.classList.add('show', 'success');
        messageEl.textContent = 'Image uploaded successfully!';
        setTimeout(() => messageEl.classList.remove('show'), 3000);
    };
    reader.readAsDataURL(fileInput.files[0]);
};

window.deleteImageAdmin = function(id) {
    if (confirm('Delete this image?')) {
        Storage.deleteImage(id);
        loadImagesAdmin();
        showMessage('Image deleted!', 'success');
    }
};

window.copyImageUrl = function(url) {
    navigator.clipboard.writeText(url).then(() => {
        showMessage('URL copied to clipboard!', 'success');
    });
};

// UTILITY
function showMessage(text, type) {
    // Show message in admin panel if available
    const messages = document.querySelectorAll('.message');
    messages.forEach(msg => {
        if (msg.offsetParent !== null) { // Check if visible
            msg.classList.add('show', type);
            msg.textContent = text;
            setTimeout(() => msg.classList.remove('show', type), 3000);
        }
    });
}
