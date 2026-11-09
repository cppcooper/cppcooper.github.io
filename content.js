const resume_profiles = typeof module !== 'undefined' && module.exports
    ? require('./profiles.js') : ResumeProfiles;

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
            ? `<a href="${EscapeHTML(this.url)}">${EscapeHTML(this.name)}</a>`
            : EscapeHTML(this.name);
        const status = this.release || activity_labels[this.activity];
        const releases = (this.releases || []).map(release =>
            `<a href="${EscapeHTML(release.url)}">${EscapeHTML(release.platform)}</a>`).join(', ');
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
            ${releases ? `<p class="project-release">Release: ${releases}</p>` : ''}
            <fieldset class="project-tags">
                <legend class="sr-only">Filter projects by skills used in ${EscapeHTML(this.name)}</legend>
                ${tags}
            </fieldset>
        </article>`;
    }
}

let enabledSettings = [];
let selectedProfile = 'professional';

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

// Selected principal contributions; later minor maintenance/experiments are omitted.
const dfhack_contribution_period = '2017–2023';

const projects_list = [
    new ProjectEntry({
        "id": "cheryl-engine",
        "name": "Cheryl Engine 4",
        "url": "https://cppcooper.com/project/cheryl-engine-4/",
        "portfolioKey": "cheryl-engine-modern",
        "period": "2026–present",
        "minimumProfile": "hobby",
        "source": "Open source",
        "context": "Independent engine development",
        "activity": "active",
        "category": "personal",
        "tags": [
            "C++",
            "CMake",
            "Software Architecture",
            "Concurrency",
            "OpenGL",
            "Unit Testing"
        ],
        "highlights": [
            "Developing a C++ engine with explicit runtime ownership, sequential and concurrent execution, and retained rendering and resource lifetimes.",
            "Integrating optional subsystems, Unicode text layout and an installed SDK used by four separate game applications."
        ],
        "currentFocus": true
    }),
    new ProjectEntry({
        "id": "space-invaders-cheryl4-port",
        "name": "Space Invaders: Cheryl Engine 4 Port",
        "url": "https://cppcooper.com/project/space-invaders-cheryl-4/",
        "portfolioKey": "space-invaders-cheryl4-port",
        "period": "2026",
        "minimumProfile": "hobby",
        "source": "Portfolio case study",
        "context": "Independent port of earlier coursework",
        "activity": "completed",
        "category": "personal",
        "tags": [
            "C++",
            "CMake",
            "Gameplay Systems",
            "UI",
            "Audio"
        ],
        "highlights": [
            "Rebuilt the arcade game around Cheryl Engine 4 with coordinated waves, player state, menus, adaptive audio and persistent scores."
        ]
    }),
    new ProjectEntry({
        "id": "hypermaze-cheryl4-port",
        "name": "Hypermaze: Cheryl Engine 4 Port",
        "url": "https://cppcooper.com/project/hypermaze-cheryl-4/",
        "portfolioKey": "hypermaze-cheryl4-port",
        "period": "2026",
        "minimumProfile": "hobby",
        "source": "Portfolio case study",
        "context": "Independent port of earlier coursework",
        "activity": "completed",
        "category": "personal",
        "tags": [
            "C++",
            "CMake",
            "Procedural Generation",
            "Graphs",
            "Rendering"
        ],
        "highlights": [
            "Integrated graph-connected terrain, sight-ray traversal, overlapping placements and retained explored tiles with the engine runtime."
        ]
    }),
    new ProjectEntry({
        "id": "rover-cheryl4-port",
        "name": "Rover: Cheryl Engine 4 Port",
        "url": "https://cppcooper.com/project/rover-cheryl-4/",
        "portfolioKey": "rover-cheryl4-port",
        "period": "2026",
        "minimumProfile": "hobby",
        "source": "Portfolio case study",
        "context": "Independent port of earlier coursework",
        "activity": "completed",
        "category": "personal",
        "tags": [
            "C++",
            "CMake",
            "Algorithms",
            "Data Structures",
            "UI"
        ],
        "highlights": [
            "Built an observable pathfinder with explicit search frames, bounded simulation steps, a map editor and legacy packed-map compatibility."
        ]
    }),
    new ProjectEntry({
        "id": "word-search-cheryl4-port",
        "name": "Word Search: Cheryl Engine 4 Port",
        "url": "https://cppcooper.com/project/word-search-cheryl-4/",
        "portfolioKey": "word-search-cheryl4-port",
        "period": "2026",
        "minimumProfile": "hobby",
        "source": "Portfolio case study",
        "context": "Independent port of earlier coursework",
        "activity": "completed",
        "category": "personal",
        "tags": [
            "C++",
            "CMake",
            "Algorithms",
            "Data Structures",
            "UI"
        ],
        "highlights": [
            "Implemented sequential trie search, explicit occurrence rules, legacy and text puzzle loading, and match selection and reveal controls."
        ]
    }),
    new ProjectEntry({
        "id": "bccf-data-pipeline",
        "name": "DICOM Tag Filter for Orthanc",
        "url": "https://cppcooper.com/project/orthanc-filter/",
        "portfolioKey": "dicom-tag-filter",
        "period": "2021–2022",
        "minimumProfile": "academic",
        "source": "Open source",
        "context": "University capstone · British Columbia Cancer Foundation",
        "activity": "completed",
        "category": "academic",
        "tags": [
            "C++",
            "CMake",
            "PostgreSQL",
            "DICOM",
            "Orthanc",
            "Docker",
            "Unit Testing",
            "CI"
        ],
        "highlights": [
            "Provided the primary C++ implementation, CMake setup and documentation for a team capstone project.",
            "Implemented configurable DICOM tag filtering across ingestion, custom storage, duplicate tracking and database crosswalk updates."
        ]
    }),
    new ProjectEntry({
        "id": "dfhack",
        "name": "DFHack Contributions",
        "url": "https://cppcooper.com/project/dfhack-contributions/",
        "portfolioKey": "dfhack",
        "period": dfhack_contribution_period,
        "minimumProfile": "hobby",
        "source": "Open source",
        "context": "Community contributions",
        "activity": "paused",
        "category": "personal",
        "tags": [
            "C++",
            "CMake",
            "Lua",
            "RNG",
            "Software Architecture",
            "Unit Testing"
        ],
        "highlights": [
            "Contributed C++ gameplay plugins and Lua interfaces, including cxxrandom and Spectate, within the DFHack community project.",
            "Worked on event handling, unit helpers, builds, tests and CI."
        ]
    }),
    new ProjectEntry({
        "id": "dfhack-scripts",
        "name": "DFHack Lua Scripts",
        "url": "https://cppcooper.com/project/dfhack-scripts/",
        "portfolioKey": "dfhack-scripts",
        "period": dfhack_contribution_period,
        "minimumProfile": "hobby",
        "source": "Portfolio case study",
        "context": "Community contributions",
        "activity": "paused",
        "category": "personal",
        "tags": [
            "Lua",
            "Data Structures",
            "Debugging",
            "Unit Testing"
        ],
        "highlights": [
            "Built tools for searching recursive data structures and configuring dwarf allocation, alongside animal and migration helpers in the community script collection."
        ]
    }),
    new ProjectEntry({
        "id": "heavy-gear-assault",
        "name": "Heavy Gear Assault",
        "url": "https://store.steampowered.com/app/416020/Heavy_Gear_Assault/",
        "period": "2017",
        "source": "Closed source",
        "context": "Professional work · Stompy Bot Corp.",
        "activity": "completed",
        "category": "commercial",
        "release": "Shipped",
        "tags": [
            "UE4",
            "C++",
            "AI",
            "Linear Algebra",
            "Perforce",
            "Scrum"
        ],
        "highlights": [
            "Worked on bot AI for a shipped multiplayer mech shooter in a modified Unreal Engine 4 codebase.",
            "Used Gaussian distributions to vary bot reaction times and other behaviour parameters."
        ],
        "minimumProfile": "professional"
    }),
    new ProjectEntry({
        "id": "fame-and-fortune",
        "name": "Fame and Fortune: Hidden Objects",
        "url": "https://apps.apple.com/ca/app/fame-and-fortune-hidden-objects/id980580810",
        "period": "2015",
        "source": "Closed source",
        "context": "Professional work · Gogii Games",
        "activity": "completed",
        "category": "commercial",
        "release": "Shipped · iOS & Android",
        "tags": [
            "C#",
            "Unity",
            "UI",
            "Debugging",
            "Software Architecture",
            "Scrum"
        ],
        "highlights": [
            "Implemented casino mini-game functionality for a shipped Unity mobile game.",
            "Fixed event-system and gameplay bugs during pre-release development."
        ],
        "minimumProfile": "professional"
    }),
    new ProjectEntry({
        "id": "sabotage",
        "name": "Sabotage",
        "url": "https://www.globenewswire.com/news-release/2016/06/07/1036866/0/en/Stompy-Bot-Receives-CMF-Funding-and-Announces-Sabotage.html",
        "period": "2016",
        "source": "Closed source",
        "context": "Professional work · Stompy Bot Corp.",
        "activity": "completed",
        "category": "commercial",
        "release": "Unreleased",
        "tags": [
            "UE4",
            "C++",
            "Blueprints",
            "UI",
            "Perforce",
            "Scrum"
        ],
        "highlights": [
            "Developed the player pawn controller for a side-scrolling stealth shooter based on Matt Cook’s novel Sabotage.",
            "Implemented UMG interface widgets, including a 2D radar HUD."
        ],
        "minimumProfile": "professional"
    }),
    new ProjectEntry({
        "id": "indras-net",
        "name": "Indra's Net",
        "url": "https://gabora-psych.ok.ubc.ca/IN.html",
        "period": "2018–2020",
        "source": "Closed source",
        "context": "Research employment · UBC Okanagan",
        "activity": "completed",
        "category": "research",
        "tags": [
            "UE4",
            "C++",
            "Blueprints",
            "Physics",
            "Linear Algebra",
            "Software Architecture"
        ],
        "highlights": [
            "Implemented procedural mesh generation, laser physics, and shaders for a psychology visualization project led by Dr. Liane Gabora.",
            "Developed and documented systems across two summers alongside university coursework."
        ],
        "minimumProfile": "professional"
    }),
    new ProjectEntry({
        "id": "amazons-ai",
        "name": "Game of the Amazons AI",
        "url": "https://cppcooper.com/project/game-of-the-amazons-ai/",
        "portfolioKey": "game-of-the-amazons-ai",
        "period": "2021",
        "minimumProfile": "academic",
        "source": "Open source",
        "context": "University project · AI implementation",
        "activity": "paused",
        "category": "academic",
        "tags": [
            "Java",
            "AI",
            "Parallel Computing",
            "Data Structures",
            "Software Architecture"
        ],
        "highlights": [
            "Implemented piece-and-arrow move generation, territory and mobility evaluation, pooled move objects and separate search workers.",
            "Built the agent against the separately supplied course client and libraries; a later refactor remains unfinished."
        ]
    }),
    new ProjectEntry({
        "id": "cosc320-flightpathfinding",
        "name": "Flight Itinerary Search",
        "url": "https://cppcooper.com/project/flight-itinerary-search/",
        "portfolioKey": "cosc320-flightpathfinding",
        "period": "2021",
        "minimumProfile": "academic",
        "source": "Portfolio case study",
        "context": "University team project",
        "activity": "completed",
        "category": "academic",
        "tags": [
            "Java",
            "Algorithms",
            "Graphs",
            "Data Structures"
        ],
        "highlights": [
            "Contributed the entry point, search-node representation, debugging and refactoring to a team project exploring scheduled-flight searches."
        ]
    }),
    new ProjectEntry({
        "id": "hypermaze",
        "name": "Hypermaze Prototype",
        "url": "https://cppcooper.com/project/hypermaze/",
        "portfolioKey": "hypermaze",
        "period": "2016",
        "minimumProfile": "academic",
        "source": "Portfolio case study",
        "context": "Earlier algorithm and game work",
        "activity": "completed",
        "category": "personal",
        "tags": [
            "C++",
            "Procedural Generation",
            "Graphs",
            "Linear Algebra"
        ],
        "highlights": [
            "Implemented probabilistic room-and-corridor graph generation, terrain traversal and translations between world and tile-map coordinates."
        ]
    }),
    new ProjectEntry({
        "id": "word-search-with-threads",
        "name": "Word Search with Threads",
        "url": "https://cppcooper.com/project/word-search-with-threads/",
        "portfolioKey": "word-search-with-threads",
        "period": "2015",
        "minimumProfile": "academic",
        "source": "Portfolio case study",
        "context": "Earlier algorithm and game work",
        "activity": "completed",
        "category": "personal",
        "tags": [
            "C++",
            "Concurrency",
            "Algorithms",
            "Data Structures"
        ],
        "highlights": [
            "Built a solver that extracts directional strings, groups comparisons by word length and collects thread results through promises and futures."
        ]
    }),
    new ProjectEntry({
        "id": "space-invaders-bullet-hell",
        "name": "Space Invaders",
        "url": "https://cppcooper.com/project/space-invaders/",
        "portfolioKey": "space-invaders-bullet-hell",
        "period": "2014",
        "minimumProfile": "academic",
        "source": "Portfolio case study",
        "context": "Earlier algorithm and game work",
        "activity": "completed",
        "category": "personal",
        "tags": [
            "C++",
            "Gameplay Systems",
            "Algorithms"
        ],
        "highlights": [
            "Implemented formation control, weighted enemy volleys, fixed-step updates, collision handling and scorekeeping for a coursework arcade game."
        ]
    }),
    new ProjectEntry({
        "id": "rover",
        "name": "Rover Recursive Pathfinding",
        "url": "https://cppcooper.com/project/rover/",
        "portfolioKey": "rover",
        "period": "2014",
        "minimumProfile": "academic",
        "source": "Portfolio case study",
        "context": "Earlier algorithm and game work",
        "activity": "completed",
        "category": "personal",
        "tags": [
            "C++",
            "Algorithms",
            "Data Structures"
        ],
        "highlights": [
            "Explored direction-ordered recursive traversal, saved continuation state and a packed representation storing sixteen tile values in 32 bits."
        ]
    }),
    new ProjectEntry({
        "id": "a-star",
        "name": "A* Pathfinding",
        "url": "https://cppcooper.com/project/a-star/",
        "portfolioKey": "a-star",
        "period": "2013",
        "minimumProfile": "academic",
        "source": "Portfolio case study",
        "context": "Earlier algorithm and game work",
        "activity": "completed",
        "category": "personal",
        "tags": [
            "C++",
            "Algorithms",
            "Data Structures"
        ],
        "highlights": [
            "Implemented orthogonal A* pathfinding with alternative open and closed containers and a seeded maze driver for comparison experiments."
        ]
    }),
    new ProjectEntry({
        "id": "magickareserve",
        "name": "Reserved Magicka NG",
        "url": "https://cppcooper.com/project/magicka-reserve/",
        "portfolioKey": "magickareserve",
        "period": "2023",
        "minimumProfile": "published",
        "source": "Portfolio case study",
        "context": "Independent Skyrim mod",
        "activity": "paused",
        "category": "personal",
        "tags": [
            "C++",
            "Papyrus",
            "SKSE",
            "CommonLibSSE",
            "Gameplay Systems"
        ],
        "highlights": [
            "Released a Skyrim mod whose native equipment-event calculations reserve magicka for worn enchantments and reconstruct the total after loading a save.",
            "Integrated the custom mechanic with Papyrus and game data using inherited CommonLibSSE plugin scaffolding."
        ],
        "release": "Released · Nexus Mods",
        "releases": [
            {
                "platform": "Nexus Mods",
                "url": "https://www.nexusmods.com/skyrimspecialedition/mods/91384",
                "year": 2023
            }
        ]
    }),
    new ProjectEntry({
        "id": "skyrim-modding",
        "name": "Skyrim Modding",
        "url": "https://www.nexusmods.com/skyrimspecialedition/users/235189?tab=user+files",
        "period": "Started 2023",
        "source": "Open source",
        "context": "Independent projects",
        "activity": "paused",
        "category": "personal",
        "tags": [
            "C++",
            "Papyrus",
            "Creation Kit",
            "SKSE",
            "CommonLibSSE"
        ],
        "highlights": [
            "Developed standalone mods and fixes using Papyrus and C++ SKSE plugins.",
            "Released mods with hundreds to thousands of unique downloads."
        ],
        "minimumProfile": "published",
        "releases": [
            {
                "platform": "Nexus Mods",
                "url": "https://www.nexusmods.com/skyrimspecialedition/users/235189?tab=user+files"
            }
        ]
    }),
    new ProjectEntry({
        "id": "cheryl-engine-historical",
        "name": "Cheryl Engine",
        "url": "https://cppcooper.com/project/cheryl-engine/",
        "portfolioKey": "cheryl-engine",
        "period": "2014",
        "minimumProfile": "hobby",
        "source": "Portfolio case study",
        "context": "Independent engine development · historical",
        "activity": "completed",
        "category": "personal",
        "tags": [
            "C++",
            "Software Architecture",
            "OpenGL",
            "Data Structures"
        ],
        "highlights": [
            "Built the earlier engine’s asset factories, loaders, management layers, pools and input contexts before the current v4 architecture."
        ]
    }),
    new ProjectEntry({
        "id": "wp-portfolio-template",
        "name": "Rebuilding the Portfolio",
        "url": "https://cppcooper.com/project/portfolio-reconstruction/",
        "portfolioKey": "wp-portfolio-template",
        "period": "2026",
        "minimumProfile": "hobby",
        "source": "Portfolio case study",
        "context": "Independent website and migration tooling",
        "activity": "active",
        "category": "personal",
        "tags": [
            "PHP",
            "WordPress",
            "JavaScript",
            "Docker",
            "Git"
        ],
        "highlights": [
            "Reconstructed WordPress locally while preserving content IDs, repeated metadata, media paths and project-to-article relationships.",
            "Built repeatable offline setup and verification tooling and a shared presentation for projects, writing and archives."
        ]
    }),
    new ProjectEntry({
        "id": "nxm",
        "name": "NXM: Collecting Mod Dependencies",
        "url": "https://cppcooper.com/project/nxm-mod-dependencies/",
        "portfolioKey": "nxm",
        "period": "2021–2022",
        "minimumProfile": "hobby",
        "source": "Portfolio case study",
        "context": "Independent command-line prototype",
        "activity": "paused",
        "category": "personal",
        "tags": [
            "C++",
            "HTTP",
            "JSON",
            "Graphs",
            "CLI"
        ],
        "highlights": [
            "Built API-backed command-line listings and recursive requirement discovery for Nexus mods; bulk downloads remain unfinished."
        ]
    }),
    new ProjectEntry({
        "id": "time-tracker",
        "name": "A Terminal Time Tracker",
        "url": "https://cppcooper.com/project/terminal-time-tracker/",
        "portfolioKey": "time-tracker",
        "period": "2022",
        "minimumProfile": "hobby",
        "source": "Portfolio case study",
        "context": "Independent terminal utility",
        "activity": "paused",
        "category": "personal",
        "tags": [
            "C++",
            "CMake",
            "Linux",
            "CLI"
        ],
        "highlights": [
            "Built a terminal time tracker with persisted clock pairs and session resumption, with multi-day rollover work still unfinished."
        ]
    }),
    new ProjectEntry({
        "id": "shirly",
        "name": "Shirly",
        "url": "https://cppcooper.com/project/shirly/",
        "portfolioKey": "shirly",
        "period": "2006",
        "minimumProfile": "hobby",
        "source": "Portfolio case study",
        "context": "Early collaborative game · game logic",
        "activity": "completed",
        "category": "personal",
        "tags": [
            "Visual Basic 6",
            "Gameplay Systems",
            "Data Structures"
        ],
        "highlights": [
            "Implemented collision-driven board changes, generated levels, controls and saved state for an early grid game; Ben handled the renderer."
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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {projects_list, experience, ProjectEntry, EscapeHTML};
}
