let checkboxes = document.querySelectorAll("input[type=checkbox][name=tag-filters]");

function OnChange(event) {
    ReadSettings();
    enabledSettings = [...new Set(enabledSettings)];
    if (!event.target.checked) {
        let idx = enabledSettings.indexOf(event.target.value);
        if (idx !== -1) {
            enabledSettings.splice(idx, 1);
        }
    }
    UpdateFilters();
    UpdateCheckboxes();
}

function UpdateCheckboxes() {
    enabledSettings.forEach(function(value) {
        let checkboxes = document.querySelectorAll(`input[type=checkbox][value="${value}"]`);
        checkboxes.forEach(function (e) {
            e.checked = true;
            let id = `${e.id}-badge`;
            let badge = document.querySelector(`span[id=${id}]`);
            badge.classList.remove("badge-light");
            badge.classList.add("badge-dark");
        });
        //let badges = document.querySelectorAll(`span[id*=${id}]`);
    });
}

function UpdateFilters() {
    let projects = document.getElementById("projects");
    projects.innerHTML="";
    projects_list.forEach(InsertProjects);
    // we modified the page, so we're gonna re-hook the checkboxes
    HookCheckboxes();
}

function HookCheckboxes() {
    checkboxes = document.querySelectorAll("input[type=checkbox][name=tag-filters]");
    checkboxes.forEach(function(checkbox) {
        checkbox.removeEventListener('change', OnChange);
        checkbox.addEventListener('change', OnChange);
    });
}

function ReadSettings() {
    console.log(`checkboxes array length: ${checkboxes.length}`)
    enabledSettings = Array
        .from(checkboxes)
        .filter(i => i.checked)
        .map(i => i.value);
}

function Initialize() {
    ReadSettings();

    UpdateFilters();
}

Initialize();