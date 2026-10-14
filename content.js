function EscapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
}

function MakeListEntry(item, list_attributes, span_attributes) {
    return `<li class="${list_attributes}"><span class="${span_attributes}">${EscapeHTML(item)}</span></li>`;
}

function MakeHighlights(items) {
    return `<ul class="resume-bullets">${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
}

class ExperienceEntry {
    constructor(title, org, period, highlights) {
        Object.assign(this, {title, org, period, highlights});
    }

    make_item() {
        return `<div class="item mb-3">
            <div class="resume-item-heading">
                <h4 class="item-title">${EscapeHTML(this.title)}</h4>
                <span class="item-meta text-muted">${EscapeHTML(this.org)} | ${EscapeHTML(this.period)}</span>
            </div>
            ${MakeHighlights(this.highlights)}
        </div>`;
    }
}

// Activity describes my involvement, rather than the upstream project's status.
// Change activity to "paused" or "maintained" when a project stops active development.
// Project groups and the current-focus link then update together.
const activity_labels = {
    active: 'Active development',
    maintained: 'Occasional maintenance',
    paused: 'My work paused',
    completed: 'Completed contribution'
};

class ProjectEntry {
    constructor(details) {
        Object.assign(this, details);
    }

    get_group() {
        if (this.activity === 'active') return 'active';
        if (this.activity === 'maintained') return 'maintained';
        if (this.category === 'commercial') return 'commercial';
        if (this.activity === 'paused') return 'paused';
        return 'completed';
    }

    make_item() {
        const name = this.url
            ? `<a href="${this.url}">${EscapeHTML(this.name)}</a>`
            : EscapeHTML(this.name);
        const status = this.release || activity_labels[this.activity];
        const tags = this.tags.map((tag, index) => {
            const id = `${this.id}-tag-${index}`;
            const checked = enabledSettings.includes(tag) ? ' checked' : '';
            return `<label class="project-tag" for="${id}">
                <input type="checkbox" id="${id}" name="tag-filters" value="${EscapeHTML(tag)}"${checked}>
                <span class="badge badge-light">${EscapeHTML(tag)}</span>
            </label>`;
        }).join('');

        return `<article id="project-${this.id}" class="item mb-3">
            <div class="resume-item-heading">
                <h4 class="item-title">${name}</h4>
                <span class="item-meta text-muted">${EscapeHTML(this.period)}</span>
            </div>
            <div class="project-context">
                <span>${EscapeHTML(this.context)} · ${EscapeHTML(this.source)}</span>
                <span class="project-activity project-activity-${this.activity}">${EscapeHTML(status)}</span>
            </div>
            ${MakeHighlights(this.highlights)}
            <fieldset class="project-tags">
                <legend class="sr-only">Filter projects by skills used in ${EscapeHTML(this.name)}</legend>
                ${tags}
            </fieldset>
        </article>`;
    }
}

let enabledSettings = [];

const technical_skill_groups = [
    {name: 'Most used', skills: ['C++', 'CMake', 'Git']},
    {name: 'Additional languages', skills: ['C#', 'Lua', 'Java', 'JavaScript', 'SQL', 'Bash', 'PHP', 'R', 'Julia']},
    {name: 'Libraries', skills: ['OpenGL', 'CUDA']},
    {name: 'Tools & platforms', skills: ['UML', 'Windows', 'Linux']},
    {name: 'Previous engine experience', skills: ['Unity', 'Unreal Engine 4']}
];

const soft_skills = [
    'Collaboration', 'Adaptability', 'Analytical Problem-Solving', 'Technical Communication'
];

const interests = [
    'Modding', 'Tabletop RPGs (D&D)', 'Mutual Aid & Direct Democracy', 'Hiking', 'Cycling', 'Reverse Engineering'
];

const projects_list = [
    new ProjectEntry({
        id: 'cheryl-engine',
        name: 'Cheryl-Engine',
        url: 'https://github.com/cppcooper/cheryl-engine',
        period: 'Started 2013',
        source: 'Open source',
        context: 'Independent project',
        activity: 'active',
        category: 'personal',
        tags: ['C++', 'CMake', 'Software Architecture', 'Concurrency', 'OpenGL', 'Unit Testing'],
        highlights: [
            'Designing a C++ game engine with interfaces between input, simulation, rendering, and resource management.',
            'Implemented sequential and concurrent runtimes, event dispatch, and worker scheduling.',
            'Built regression coverage for subsystem lifetimes and failure handling, alongside a runnable OpenGL demo.'
        ]
    }),
    new ProjectEntry({
        id: 'heavy-gear-assault',
        name: 'Heavy Gear Assault',
        url: 'https://store.steampowered.com/app/416020/Heavy_Gear_Assault/',
        period: '2017',
        source: 'Closed source',
        context: 'Professional work · Stompy Bot Corp.',
        activity: 'completed',
        category: 'commercial',
        release: 'Shipped',
        tags: ['UE4', 'C++', 'AI', 'Linear Algebra', 'Perforce', 'Scrum'],
        highlights: [
            'Worked on bot AI for a shipped multiplayer mech shooter in a modified Unreal Engine 4 codebase.',
            'Used Gaussian distributions to vary bot reaction times and other behaviour parameters.'
        ]
    }),
    new ProjectEntry({
        id: 'fame-and-fortune',
        name: 'Fame and Fortune: Hidden Objects',
        url: 'https://apps.apple.com/ca/app/fame-and-fortune-hidden-objects/id980580810',
        period: '2015',
        source: 'Closed source',
        context: 'Professional work · Gogii Games',
        activity: 'completed',
        category: 'commercial',
        release: 'Shipped · iOS & Android',
        tags: ['C#', 'Unity', 'UI', 'Debugging', 'Software Architecture', 'Scrum'],
        highlights: [
            'Implemented casino mini-game functionality for a shipped Unity mobile game.',
            'Fixed event-system and gameplay bugs during pre-release development.'
        ]
    }),
    new ProjectEntry({
        id: 'sabotage',
        name: 'Sabotage',
        url: 'https://www.globenewswire.com/news-release/2016/06/07/1036866/0/en/Stompy-Bot-Receives-CMF-Funding-and-Announces-Sabotage.html',
        period: '2016',
        source: 'Closed source',
        context: 'Professional work · Stompy Bot Corp.',
        activity: 'completed',
        category: 'commercial',
        release: 'Unreleased',
        tags: ['UE4', 'C++', 'Blueprints', 'UI', 'Perforce', 'Scrum'],
        highlights: [
            'Developed the player pawn controller for a side-scrolling stealth shooter based on Matt Cook’s novel Sabotage.',
            'Implemented UMG interface widgets, including a 2D radar HUD.'
        ]
    }),
    new ProjectEntry({
        id: 'dfhack',
        name: 'DFHack',
        url: 'https://github.com/DFHack/dfhack',
        period: 'First contributed 2017',
        source: 'Open source',
        context: 'Community contributions',
        activity: 'paused',
        category: 'community',
        tags: ['C++', 'CMake', 'Lua', 'RNG', 'Software Architecture'],
        highlights: [
            'Contributed C++ plugins including cxxrandom, channel-safely, and spectate, plus Lua scripts for Dwarf Fortress.',
            'Built tools for inspecting recursive data structures and managing game entities, and contributed changes to core systems.'
        ]
    }),
    new ProjectEntry({
        id: 'skyrim-modding',
        name: 'Skyrim Modding',
        url: 'https://www.nexusmods.com/skyrimspecialedition/users/235189?tab=user+files',
        period: 'Started 2023',
        source: 'Open source',
        context: 'Independent projects',
        activity: 'paused',
        category: 'personal',
        tags: ['C++', 'Papyrus', 'Creation Kit', 'SKSE', 'CommonLibSSE'],
        highlights: [
            'Developed standalone mods and fixes using Papyrus and C++ SKSE plugins.',
            'Released mods with hundreds to thousands of unique downloads.'
        ]
    }),
    new ProjectEntry({
        id: 'bccf-data-pipeline',
        name: 'BCCF Data Pipeline',
        url: 'https://github.com/cppcooper/Orthanc-filter',
        period: '2021–2022',
        source: 'Open source',
        context: 'University capstone · British Columbia Cancer Foundation',
        activity: 'completed',
        category: 'academic',
        tags: ['C++', 'CMake', 'PostgreSQL', 'DICOM', 'Orthanc', 'Docker', 'Unit Testing', 'CI'],
        highlights: [
            'Built a configurable C++ Orthanc plugin to remove identifying information from DICOM medical images for research.',
            'Automated redaction that would otherwise require processing individual files manually.'
        ]
    }),
    new ProjectEntry({
        id: 'indras-net',
        name: "Indra's Net",
        url: 'https://gabora-psych.ok.ubc.ca/IN.html',
        period: '2018–2020',
        source: 'Closed source',
        context: 'Research employment · UBC Okanagan',
        activity: 'completed',
        category: 'research',
        tags: ['UE4', 'C++', 'Blueprints', 'Physics', 'Linear Algebra', 'Software Architecture'],
        highlights: [
            'Implemented procedural mesh generation, laser physics, and shaders for a psychology visualization project led by Dr. Liane Gabora.',
            'Developed and documented systems across two summers alongside university coursework.'
        ]
    }),
    new ProjectEntry({
        id: 'amazons-ai',
        name: 'Amazons-AI',
        url: 'https://github.com/cppcooper/game-of-the-amazons-ai',
        period: '2021',
        source: 'Open source',
        context: 'University team project',
        activity: 'completed',
        category: 'academic',
        tags: ['Java', 'AI', 'Parallel Computing', 'Client/Server', 'Software Architecture'],
        highlights: [
            'Developed a game-playing AI with a team for a competition with 2,176 legal opening moves.',
            'The team placed fifth out of approximately 25 teams, despite hardware-overheating forfeits.'
        ]
    })
];

const experience = [
    new ExperienceEntry('Associate · IT Support', 'Turtle Bay IT Services', 'Mar–Sep 2022', [
        'Managed remote hosts using ESET and Microsoft 365 to support small businesses.',
        'Diagnosed and repaired Windows and Mac hardware, and helped maintain Linux virtual servers.'
    ]),
    new ExperienceEntry('Software Engineer', 'UBC Okanagan', 'May 2018–May 2020', [
        "Developed Indra's Net, a UE4 psychology visualization project under Dr. Liane Gabora.",
        'Implemented procedural meshes, laser physics, shaders, and system documentation.'
    ]),
    new ExperienceEntry('Game Developer', 'Stompy Bot Corp.', 'Oct 2016–Apr 2017', [
        'Built gameplay systems and UMG interface widgets for Sabotage.',
        'Contributed bot AI work to Heavy Gear Assault, a shipped multiplayer game.'
    ]),
    new ExperienceEntry('Junior Developer', 'Gogii Games', 'Apr–Sep 2015', [
        'Fixed event-system bugs during pre-release development of a Unity mobile game.',
        'Implemented the first casino mini-game for Fame and Fortune: Hidden Objects.'
    ]),
    new ExperienceEntry('Technical Support Specialist', 'Research In Motion', 'Jul 2011–Aug 2012', [
        "Supported thousands of customers in BlackBerry's highest tier of handheld and desktop software support."
    ])
];

const project_groups = [
    {id: 'active', title: 'Active Projects'},
    {id: 'maintained', title: 'Maintained Projects'},
    {id: 'commercial', title: 'Shipped & Commercial Work'},
    {id: 'paused', title: 'Paused Projects'},
    {id: 'completed', title: 'Completed Work'}
];

function RenderProjects() {
    const visible = projects_list.filter(project => enabledSettings.length === 0
        || project.tags.some(tag => enabledSettings.includes(tag)));
    const controls = document.querySelector('.project-filter-controls');
    if (controls) controls.remove();
    const container = document.getElementById('projects');
    container.innerHTML = project_groups.map(group => {
        const entries = visible.filter(project => project.get_group() === group.id);
        if (entries.length === 0) return '';
        return `<section class="project-group py-3" aria-labelledby="project-group-${group.id}">
            <h3 id="project-group-${group.id}" class="text-uppercase resume-section-heading mb-4">${EscapeHTML(group.title)}</h3>
            ${entries.map(project => project.make_item()).join('')}
        </section>`;
    }).join('');
    if (controls) {
        const firstHeading = container.querySelector('.project-group > h3');
        if (firstHeading) firstHeading.after(controls);
        else container.append(controls);
    }
}

function RenderCurrentFocus() {
    const element = document.getElementById('current-project-focus');
    if (!element) return;
    const active = projects_list.filter(project => project.activity === 'active');
    element.hidden = active.length === 0;
    element.innerHTML = active.length
        ? `Current project focus: ${active.map(project => `<a href="#project-${project.id}">${EscapeHTML(project.name)}</a>`).join(', ')}.`
        : '';
}

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
RenderProjects();
RenderCurrentFocus();
