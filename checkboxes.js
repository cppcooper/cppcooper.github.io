const projectContainer = document.getElementById('projects');
const clearFiltersButton = document.getElementById('clear-project-filters');
const filterSummary = document.getElementById('project-filter-summary');

function UpdateProjectFilterSummary() {
    clearFiltersButton.hidden = enabledSettings.length === 0;
    filterSummary.textContent = enabledSettings.length
        ? `Showing projects using ${enabledSettings.join(' or ')}.`
        : 'Select a skill below to filter projects.';
}

projectContainer.addEventListener('change', event => {
    const checkbox = event.target;
    if (!checkbox.matches('input[name="tag-filters"]')) return;
    if (checkbox.checked) {
        enabledSettings = [...new Set([...enabledSettings, checkbox.value])];
    } else {
        enabledSettings = enabledSettings.filter(tag => tag !== checkbox.value);
    }
    const focusId = checkbox.id;
    RenderProjects();
    UpdateProjectFilterSummary();
    const replacement = document.getElementById(focusId);
    if (replacement) replacement.focus({preventScroll: true});
    else clearFiltersButton.focus({preventScroll: true});
});

function ClearProjectFilters() {
    enabledSettings = [];
    RenderProjects();
    UpdateProjectFilterSummary();
}

clearFiltersButton.addEventListener('click', () => {
    ClearProjectFilters();
    projectContainer.querySelector('input[name="tag-filters"]')?.focus({preventScroll: true});
});

document.getElementById('current-project-focus')?.addEventListener('click', event => {
    if (event.target.closest('a[href^="#project-"]')) ClearProjectFilters();
});

UpdateProjectFilterSummary();
