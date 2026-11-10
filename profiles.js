// Shared by the browser and the dependency-free profile checks.
const ResumeProfiles = (() => {
    const profiles = Object.freeze([
        {id: 'professional', label: 'Professional', description: 'Projects completed through paid employment.'},
        {id: 'academic', label: 'Academic', description: 'Professional profile plus coursework and academic projects.'},
        {id: 'published', label: 'Published', description: 'Academic profile plus independently released software and mods.'},
        {id: 'hobby', label: 'Hobby', description: 'Full CV, including independent experiments and earlier projects.'}
    ].map(profile => Object.freeze(profile)));

    function normalizeProfile(value) {
        return profiles.some(profile => profile.id === value) ? value : 'professional';
    }

    function includesProject(profile, project) {
        const selected = profiles.findIndex(entry => entry.id === normalizeProfile(profile));
        const minimum = profiles.findIndex(entry => entry.id === project.minimumProfile);
        // A missing classification must be reviewed before it appears in a profile.
        return minimum >= 0 && minimum <= selected;
    }

    function visibleProjects(projects, profile, skills = []) {
        return projects.filter(project => includesProject(profile, project)
            && skills.every(skill => project.tags.includes(skill)));
    }

    function parseState(search, projects) {
        const params = new URLSearchParams(search);
        const validSkills = new Set(projects.flatMap(project => project.tags));
        const skills = [...new Set(params.getAll('skill'))].filter(skill => validSkills.has(skill));
        return {profile: normalizeProfile(params.get('profile')), skills};
    }

    function stateURL(href, state) {
        const url = new URL(href);
        url.searchParams.delete('profile');
        url.searchParams.delete('skill');
        const profile = normalizeProfile(state.profile);
        // The compact URL is the default Professional profile.
        if (profile !== 'professional') url.searchParams.set('profile', profile);
        [...new Set(state.skills)].forEach(skill => url.searchParams.append('skill', skill));
        return url;
    }

    return Object.freeze({profiles, normalizeProfile, includesProject, visibleProjects, parseState, stateURL});
})();

if (typeof module !== 'undefined' && module.exports) module.exports = ResumeProfiles;
