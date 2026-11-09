const project_groups = [
    {id: 'active', title: 'Active Projects'},
    {id: 'maintained', title: 'Maintained Projects'},
    {id: 'commercial', title: 'Shipped & Commercial Work'},
    {id: 'completed', title: 'Completed Work'},
    {id: 'paused', title: 'Paused Projects'}
];

function VisibleProjects() {
    return resume_profiles.visibleProjects(projects_list, selectedProfile, enabledSettings);
}

function RenderProjects() {
    const visible = VisibleProjects();
    const container = document.getElementById('projects');
    container.innerHTML = visible.length ? project_groups.map(group => {
        const entries = visible.filter(project => project.get_group() === group.id);
        if (entries.length === 0) return '';
        return `<section class="project-group py-3" aria-labelledby="project-group-${group.id}">
            <h3 id="project-group-${group.id}" class="text-uppercase resume-section-heading mb-4">${EscapeHTML(group.title)}</h3>
            ${entries.map(project => project.make_item()).join('')}
        </section>`;
    }).join('') : '<p class="project-empty">No projects in this profile match the selected skills. Clear the skill filter or choose a broader profile.</p>';
}

function RenderCurrentFocus() {
    const element = document.getElementById('current-project-focus');
    if (!element) return;
    const active = VisibleProjects().filter(project => project.activity === 'active' && project.currentFocus);
    element.hidden = active.length === 0;
    element.innerHTML = active.length
        ? `Current project focus: ${active.map(project => `<a href="#project-${project.id}">${EscapeHTML(project.name)}</a>`).join(', ')}.`
        : '';
}

function UpdateProjectFilterSummary() {
    document.getElementById('clear-project-filters').hidden = enabledSettings.length === 0;
    const total = resume_profiles.visibleProjects(projects_list, selectedProfile).length;
    const count = VisibleProjects().length;
    document.getElementById('project-filter-summary').textContent = enabledSettings.length
        ? `${count} of ${total} projects in this profile use ${enabledSettings.join(' or ')}.`
        : `${total} projects in this profile. Select a skill below to filter.`;
    const profile = resume_profiles.profiles.find(entry => entry.id === selectedProfile);
    document.getElementById('resume-profile').value = selectedProfile;
    document.getElementById('resume-profile-summary').textContent = `${profile.label} · ${profile.description}`;
    document.getElementById('resume-document').dataset.profile = selectedProfile;
    document.title = `Joshua Cooper :: ${profile.label} ${selectedProfile === 'hobby' ? 'CV' : 'Resume'}`;
}

function SaveResumeState() {
    const url = resume_profiles.stateURL(window.location.href, {profile: selectedProfile, skills: enabledSettings});
    if (url.href !== window.location.href) window.history.pushState(null, '', url);
}

function RefreshResume() {
    RenderProjects();
    RenderCurrentFocus();
    UpdateProjectFilterSummary();
}

function ClearProjectFilters() {
    enabledSettings = [];
    RefreshResume();
    SaveResumeState();
}

function InitializeResume() {
    const state = resume_profiles.parseState(window.location.search, projects_list);
    selectedProfile = state.profile;
    enabledSettings = state.skills;
    document.getElementById('tech-skills').innerHTML = technical_skill_groups.map(group => `
        <div class="technical-skill-group">
            <h4>${EscapeHTML(group.name)}</h4>
            <ul class="list-inline mb-0">${group.skills.map(skill => MakeListEntry(skill, 'list-inline-item', 'badge badge-tech')).join('')}</ul>
        </div>`).join('');
    document.getElementById('soft-skills').innerHTML = soft_skills
        .map(skill => MakeListEntry(skill, 'list-inline-item', 'badge badge-soft')).join('');
    document.getElementById('interests').innerHTML = interests
        .map(interest => MakeListEntry(interest, 'list-inline-item', 'badge badge-hobbies')).join('');
    document.getElementById('experience').insertAdjacentHTML('beforeend', experience.map(entry => entry.make_item()).join(''));
    RefreshResume();
    document.getElementById('resume-profile-controls').hidden = false;

    document.getElementById('resume-profile').addEventListener('change', event => {
        selectedProfile = resume_profiles.normalizeProfile(event.target.value);
        RefreshResume();
        SaveResumeState();
    });

    const projectContainer = document.getElementById('projects');
    const clearFiltersButton = document.getElementById('clear-project-filters');
    projectContainer.addEventListener('change', event => {
        const checkbox = event.target;
        if (!checkbox.matches('input[name="tag-filters"]')) return;
        if (checkbox.checked) {
            enabledSettings = [...new Set([...enabledSettings, checkbox.value])];
        } else {
            enabledSettings = enabledSettings.filter(tag => tag !== checkbox.value);
        }
        const focusId = checkbox.id;
        RefreshResume();
        SaveResumeState();
        const replacement = document.getElementById(focusId);
        if (replacement) replacement.focus({preventScroll: true});
        else clearFiltersButton.focus({preventScroll: true});
    });

    clearFiltersButton.addEventListener('click', () => {
        ClearProjectFilters();
        projectContainer.querySelector('input[name="tag-filters"]')?.focus({preventScroll: true});
    });

    window.addEventListener('popstate', () => {
        const restored = resume_profiles.parseState(window.location.search, projects_list);
        selectedProfile = restored.profile;
        enabledSettings = restored.skills;
        RefreshResume();
    });
}

if (typeof document !== 'undefined') InitializeResume();
