// Storage Management System
const Storage = {
    // Initialize default data
    init() {
        if (!localStorage.getItem('orgData')) {
            localStorage.setItem('orgData', JSON.stringify({
                heroTitle: 'Welcome to Our Organization',
                heroDescription: 'Join us and make a difference!',
                aboutContent: 'Our organization is dedicated to bringing students together to create meaningful experiences and foster a sense of community.',
                missionContent: 'To empower students through collaboration, learning, and mutual support in a welcoming environment.',
                valuesContent: 'We value integrity, inclusivity, innovation, and impact in everything we do.',
                teamMembers: [],
                announcements: [],
                surveyQuestions: [],
                surveyResponses: [],
                resources: [],
                applications: [],
                images: []
            }));
        }
    },

    // Get all data
    getData() {
        return JSON.parse(localStorage.getItem('orgData') || '{}');
    },

    // Save all data
    saveData(data) {
        localStorage.setItem('orgData', JSON.stringify(data));
    },

    // Hero Content
    getHeroContent() {
        const data = this.getData();
        return {
            title: data.heroTitle,
            description: data.heroDescription
        };
    },

    saveHeroContent(title, description) {
        const data = this.getData();
        data.heroTitle = title;
        data.heroDescription = description;
        this.saveData(data);
    },

    // About Content
    getAboutContent() {
        const data = this.getData();
        return {
            about: data.aboutContent,
            mission: data.missionContent,
            values: data.valuesContent
        };
    },

    saveAboutContent(type, content) {
        const data = this.getData();
        if (type === 'about') data.aboutContent = content;
        if (type === 'mission') data.missionContent = content;
        if (type === 'values') data.valuesContent = content;
        this.saveData(data);
    },

    // Team Members
    getTeamMembers() {
        return this.getData().teamMembers || [];
    },

    addTeamMember(member) {
        const data = this.getData();
        member.id = Date.now();
        data.teamMembers.push(member);
        this.saveData(data);
        return member;
    },

    updateTeamMember(id, member) {
        const data = this.getData();
        const index = data.teamMembers.findIndex(m => m.id === id);
        if (index !== -1) {
            data.teamMembers[index] = { ...data.teamMembers[index], ...member };
            this.saveData(data);
        }
    },

    deleteTeamMember(id) {
        const data = this.getData();
        data.teamMembers = data.teamMembers.filter(m => m.id !== id);
        this.saveData(data);
    },

    // Announcements
    getAnnouncements() {
        return this.getData().announcements || [];
    },

    addAnnouncement(announcement) {
        const data = this.getData();
        announcement.id = Date.now();
        announcement.date = new Date().toISOString();
        data.announcements.unshift(announcement);
        this.saveData(data);
        return announcement;
    },

    deleteAnnouncement(id) {
        const data = this.getData();
        data.announcements = data.announcements.filter(a => a.id !== id);
        this.saveData(data);
    },

    // Survey Questions
    getSurveyQuestions() {
        return this.getData().surveyQuestions || [];
    },

    addSurveyQuestion(question) {
        const data = this.getData();
        question.id = Date.now();
        data.surveyQuestions.push(question);
        this.saveData(data);
        return question;
    },

    deleteSurveyQuestion(id) {
        const data = this.getData();
        data.surveyQuestions = data.surveyQuestions.filter(q => q.id !== id);
        this.saveData(data);
    },

    // Survey Responses
    getSurveyResponses() {
        return this.getData().surveyResponses || [];
    },

    addSurveyResponse(response) {
        const data = this.getData();
        response.id = Date.now();
        response.date = new Date().toISOString();
        data.surveyResponses.push(response);
        this.saveData(data);
        return response;
    },

    // Resources
    getResources() {
        return this.getData().resources || [];
    },

    addResource(resource) {
        const data = this.getData();
        resource.id = Date.now();
        data.resources.push(resource);
        this.saveData(data);
        return resource;
    },

    deleteResource(id) {
        const data = this.getData();
        data.resources = data.resources.filter(r => r.id !== id);
        this.saveData(data);
    },

    // Applications
    getApplications() {
        return this.getData().applications || [];
    },

    addApplication(application) {
        const data = this.getData();
        application.id = Date.now();
        application.date = new Date().toISOString();
        application.status = 'pending';
        data.applications.push(application);
        this.saveData(data);
        return application;
    },

    updateApplicationStatus(id, status) {
        const data = this.getData();
        const app = data.applications.find(a => a.id === id);
        if (app) {
            app.status = status;
            this.saveData(data);
        }
    },

    // Images
    getImages() {
        return this.getData().images || [];
    },

    addImage(image) {
        const data = this.getData();
        image.id = Date.now();
        data.images.push(image);
        this.saveData(data);
        return image;
    },

    deleteImage(id) {
        const data = this.getData();
        data.images = data.images.filter(i => i.id !== id);
        this.saveData(data);
    },

    // Authentication
    checkAuth(username, password) {
        // Updated credentials
        return username === 'IsabellaVITAL7' && password === '18lolisabella';
    },

    setSession(username) {
        sessionStorage.setItem('adminUser', username);
    },

    getSession() {
        return sessionStorage.getItem('adminUser');
    },

    clearSession() {
        sessionStorage.removeItem('adminUser');
    }
};

// Initialize storage on load
Storage.init();
