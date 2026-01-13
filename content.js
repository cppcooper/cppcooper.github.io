class ExperienceEntry {
    constructor(title,org,date_range,writeup){
        this.title = title;
        this.org = org;
        this.date_range = date_range;
        this.writeup = writeup;
    }
    make_item(){
        let item;
        item =
            '<div class="item mb-3">' +
                '<div class="item-heading row align-items-center mb-2">' +
                    '<h4 class="item-title col-12 col-md-6 col-lg-6 mb-2 mb-md-0">';
        item +=         this.title;
        item +=     '</h4>';
        item +=     '<div class="item-meta col-12 col-md-6 col-lg-6 text-muted text-left text-md-right">';
        item +=         this.org + ' | ' + this.date_range;
        item +=     '</div>' + 
                '</div>';
        item += '<div class="item-content">';
        item +=     '<p>' + this.writeup + '</p>';
        item += '</div>' +
            '</div>';
        return item;
    }
}
class ProjectEntry {
    constructor(name,source,date_range,tags,org_details,writeup){
        this.name = name;
        this.source = source;
        this.date_range = date_range;
        this.tags = tags;
        this.org_details = org_details;
        this.writeup = writeup;
    }
    add_tag_input_badges(){
        let badges;
        let base_id = this.name.replace(/\W+/g, '_').toLowerCase();
        badges = '<fieldset>';
        for (var i = 0; i < this.tags.length; i++) {
            badges += MakeFieldEntry(base_id,this.tags[i]);
        }
        badges += "</fieldset>"
        return badges;
    }
    add_tag_badges(){
        let badges;
        badges = '<ul id="' + this.name.replace(/\s+/g, '-').toLowerCase() + '-tag-badges" class="list-unstyled list-inline">';
        //todo: make clickable?
        for (var i = 0; i < this.tags.length; i++) {
            badges += MakeListEntry(this.tags[i], "list-inline-item", "badge badge-light");
        }
        badges += "</ul>"
        //todo: display selected badges with badge-dark
        //todo: save all tags into a master list
        return badges;
    }
    get_tags(){
        let tags;
        tags = " ";
        for (var i = 0; i < this.tags.length; i++) {
            tags += 'tag-' + this.tags[i].replace(/\s+/g, '-').toLowerCase() + " ";
        }
        return tags;
    }
    make_item(){
        let item;
        item =
            '<div class="item mb-3 ' + this.get_tags() + '">' +
                '<div class="item-heading row align-items-center mb-0">' +
                    '<h4 class="item-title col-12 col-md-6 col-lg-4 mb-md-0">';
        item +=         this.name;
        item +=     '</h4>';
        item +=     '<div class="item-meta col-12 col-md-6 col-lg-8 text-muted text-left text-md-right">';
        item +=         this.source + ' | ' + this.date_range;
        item +=     '</div>';
        //item +=     '<div class="item-meta col-12 col-md-6 col-lg-9 text-muted text-left" style="height: 48px">';
        //item +=     '</div>'
        item +=     '<div class="row mt-1 ml-0 mb-0" style="flex: 0 0 100.5%; max-width: 100.5%">';
        item +=       '<div class="col-9">' + this.add_tag_input_badges() + '</div>';
        item +=       '<div class="item-meta col-3 text-muted text-left text-md-right">' + this.org_details + "</div>";
        item +=     '</div>' +
                '</div>';
        item += '<div class="item-content">';
        item +=     '<p>' + this.writeup + '</p>';
        item += '</div>' +
            '</div>';
        return item;
    }
}

function InsertListEntry(id,entryHTML){
    document.getElementById(id).innerHTML += entryHTML;
}
function MakeListEntry(item,list_attributes,span_attributes,span_extra_styles){
    return `<li class="${list_attributes}"><span class="${span_attributes}" style="${span_extra_styles}">${item}</span></li>`;
}
function MakeFieldEntry(base_id, item){
    id = `${base_id}-${item.replace(/\W/g, '_').toLowerCase()}`;
    id = id.replace()
    html = `<div class="list-inline-item">`;
    html += `<input class="badge hvr-fade" type="checkbox" id="${id}-checkbox" name="tag-filters" value="${item}" />`;
    html += `<span id="${id}-checkbox-badge" class="badge badge-light" style="outline: #0a0a0a;outline-style: solid; outline-width: 1.9px">`;
    html += `<label class="mb-0" for=${id}-checkbox>${item}</label>`;
    html += "</span></div>";
    return html;
}
function InsertTechnicalSkills(item){
     let new_entry = MakeListEntry(item,
         "list-inline-item",
         "badge badge-tech");
     InsertListEntry("tech-skills",new_entry);
}

function InsertSoftSkills(item){
    let new_entry = MakeListEntry(item,
        "list-inline-item",
        "badge badge-soft");
    InsertListEntry("soft-skills",new_entry);
}

function InsertInterests(item){
    let new_entry = MakeListEntry(item,
        "list-inline-item",
        "badge badge-hobbies");
    InsertListEntry("interests",new_entry);
}

function InsertProjects(item) {
    if (enabledSettings.length == 0) {
        InsertListEntry("projects", item.make_item());
    } else if (item.tags.some(r => enabledSettings.includes(r))) {
        InsertListEntry("projects", item.make_item());
    }
}

function InsertExperience(item){
    InsertListEntry("experience", item.make_item());
}

let enabledSettings=[];


const technical_skills = [
    'C++',
    'Java',
    'Git',
    "UML",
    'UE4',
    'CMake',
    'Bash',
    'Lua',
    'SQL',
    'PHP',
    'JavaScript',
    'R',
    'Julia',
    'C#',
    'OpenGL',
    'CUDA',
    'Windows',
    'Linux',
];
const soft_skills = [
    'Teamwork',
    'Empathy',
    'Detail-Oriented',
    'Creativity',
    'Leadership',
    'Adaptability'
];
const interests = [
    'Hiking',
    'D&D',
    'Storytelling',
    'Bicycles',
    'Team Games',
    'Game Dev',
    'Scripting',
    'DevOps',
    'Memory Hacking',
    'Modding',
    'Data Science',
    'Machine Learning',
    'Blockchain',
];

const projects_list = [
    new ProjectEntry(
        "BCCF Data Pipeline",
        "Open Source",
        "2021 - 2022",
        [
            "C++",
            "CMake",
            "PostgreSQL",
            "Software Architecture",
            "DICOM Parsing",
            "Unit Testing",
            "Orthanc",
            "Docker",
            "CI"
        ],
        "(Capstone Project)",
        "This <a href=\"https://github.com/cppcooper/Orthanc-filter\">Orthanc filter plugin</a> is a tool developed for the <a href='https://bccancerfoundation.com/about-us/'>British Columbia Cancer Foundation</a>. " +
        "The medical imaging machines used to diagnose cancer create what are known as DICOM images, which are sent to the BCCF for research among other purposes. The <a href='https://dicom.nema.org/medical/dicom/current/output/chtml/part10/chapter_7.html'>DICOM format</a>" +
        " allows for the encapsulation of many forms of data in addIf you could review my resume before we go any furtherition to the binary image data. Some of this information exposes patient identities and needs to be scrubbed from the images before they can be used in research. " +
        "The plugin, which I wrote for performance and customization, scrubs or redacts any information desired so a Doctor will no longer need to manually scrub each individual file."
    ),
    new ProjectEntry(
        "Heavy Gear Assault",
        "Closed Source",
        "2017",
        [
            "UE4",
            "C++",
            "AI",
            "Linear Algebra",
            "Perforce",
            "Agile:Scrum"
        ],
        "(Stompy Bot Corp.)",
        "<a href=\"https://store.steampowered.com/app/416020/Heavy_Gear_Assault/\">Heavy Gear Assault</a> is an online competitive first-person shooter with mechanized infantry for players to 'pilot'. " +
        "I was tasked with improving the bot AI. To do this I generated reaction times and a few other stats using gaussian distributions to provide the bots more natural behaviours. Though due to the game engine having been" +
        " heavily modified I had trouble synchronizing the interpolation of the bots' targeting system."
    ),
    new ProjectEntry(
        "Sabotage",
        "Closed Source",
        "2016",
        [
            "UE4",
            "C++",
            "Blueprints",
            "UI",
            "DevOps",
            "Perforce",
            "Agile:Scrum"
        ],
        "(Stompy Bot Corp.)",
        "Sabotage was a side scrolling stealth shooter based on the book by the same name. I developed several core systems, such as the player's pawn controller, and various UMG widgets such as a 2D radar on the HUD. " +
        "After about two months I was transferred to help with the development of a larger project."
    ),
    new ProjectEntry(
        "Indra's Net",
        "Closed Source",
        "2018 - 2020",
        [
            "UE4",
            "C++",
            "Blueprints",
            "UI",
            "Physics",
            "Linear Algebra",
            "Software Architecture"
        ],
        "(UBCO - Psych. Dept.)",
        "<a href=\"https://gabora-psych.ok.ubc.ca/IN.html\">Indra's Net</a> is a project envisioned and led by Dr. Liane Gabora. The project will be a tool for visualizing psychology and is intended for patient use. " +
        "My role was in the development of procedurally generated meshes, a laser system along with the corresponding physics, some very time consuming shader work, and of course some documentation. My contributions to" +
        " development took place primarily over two consecutive summers with some of the work having been parallel to my university course work."
    ),
    new ProjectEntry(
        "Skyrim Modding",
        "Open Source",
        "2023 - Present",
        [
            "C++",
            "Papyrus",
            "Creation Kit",
            "SKSE",
            "CommonLibSSE"
        ],
        "(Solo Project, Personal)",
        "From fixes to other mods, to a few standalone mods using either Payprus or SKSE plugins. Each with a few hundred unique downloads, and some with a couple thousand. " +
        "My next release will be to add equippable bags linked to chests which I've decided to call Bags of Holding since it is largely inspired by Dungeons & Dragons' Bags of Holding and Devouring. " +
        "All of my mods can be found on NexusMods <a href=\"https://www.nexusmods.com/skyrimspecialedition/users/235189?tab=user+files\">here</a>"
    ),
    new ProjectEntry(
        "DFHack",
        "Open Source",
        "2017 - Present",
        [
            "C++",
            "CMake",
            "CI",
            "Lua",
            "RNG",
            "Procedural Programming",
            "Software Architecture"
        ],
        "(Github Community)",
        "<a href=\"https://github.com/DFHack/dfhack#readme\">DFHack</a> is an API and reverse engineering effort for <a href=\"https://www.bay12games.com/dwarves/\">Dwarf Fortress</a>, ie. a world simulator & story generator. " +
        "I have contributed several robust <a href=\"https://github.com/cppcooper/dfhack-scripts\">scripts</a> for modifying and managing citizens & livestock, a development script for intelligently searching recursive data structures. " +
        "There are even a few very useful plugins I've provided <a href=\"https://github.com/cppcooper/dfhack\">plugins</a> (cxxrandom, channel-safely, spectate), and a few contributions to the core systems."
    ),

    new ProjectEntry(
        "Amazons-AI",
        "Open Source",
        "2021",
        [
            "Java",
            "AI",
            "Parallel",
            "Client/Server",
            "Software Architecture"
        ],
        "(Group Project, School)",
        "<a href=\"https://github.com/cppcooper/game-of-the-amazons-ai\">This AI project</a> was a class competition and intended as a serious challenge due to the game's branching factor. " +
        "The first player in the initial position has 2176 possible moves, which decreases rapidly as moves are played. Our AI ran on an old AMD FX-9590 during the competition, with inadequate cooling, " +
        "which led to several of our matches being lost due to CPU overheating [system crashes]. Despite these challenges I was able to ensure my team placed 5th in the rankings out of about 25 teams."
    ),
    
    new ProjectEntry(
        "Fame and Fortune: Hidden Objects",
        "Closed Source",
        "2015",
        [
            "C#",
            "UI",
            "Unity",
            "Procedural Programming",
            "Debugging",
            "Software Architecture",
            "Agile: Scrum"
        ],
        "(Gogii Games)",
        "Worked eight months on a hidden object game released on android and iphone. I implemented mini games for a monetized in-game casino, and " +
        "chipped away at the bug tracker. A lot of the bugs were just results of architectural consequences, nothing too major. Most problems were where " +
        "refactoring a core system would be the most elegant solution to a major bug, but unfeasible based on stage of development."
    ),
    
    new ProjectEntry(
        "Cheryl-Engine",
        "Open Source",
        "2013 - Present",
        [
            "C++",
            "OpenGL",
            "Software Architecture"
        ],
        "(Solo Project, Personal)",
        "Cheryl Engine is an OpenGL game engine forked from <a href=\"https://github.com/Gibgezr/blit3d\">Blit3D</a>. " +
        "I've used this project as a place to passionately practice and learn about OpenGL, meta-programming, and software architecture. " +
        "There have been a few years I've neglected this project, but I always come back to improve upon the codebase."
    )
];

const experience = [
    new ExperienceEntry(
        "Associate",
        "Turtle Bay IT Services",
        "2022.03 - 2022.09",
        "Managed remote hosts using ESET, Office 365, and a number of other tools to support small businesses. Performed hardware diagnosis and repairs on Windows and Macs. Helped manage linux virtual servers."
    ),
    new ExperienceEntry(
        "Software Engineer",
        "UBCO",
        "2018.05 - 2020.05",
        "Developed the codebase of Indra's Net, a project under a psychology professor. (listed below)"
    ),
    new ExperienceEntry(
        "Game Developer",
        "Stompy Bot Corp.",
        "2016.10 - 2017.04",
        "Developed parts of two UE4 projects: Sabotage, then Heavy Gear Assault. (both listed below)"
    ),
    new ExperienceEntry(
        "Junior Developer",
        "Gogii Games",
        "2015.04 - 2015.09",
        "Hired for pre-release crunch. Fixed bugs related to the event system architecture. Added the first mini-game for a monetized in-game casino."
    ),
    new ExperienceEntry(
        "Technical Support Specialist",
        "Research In Motion",
        "2011.07 - 2012.08",
        "Helped thousands of customers as part of BlackBerry's highest tier of technical support for handhelds and desktop software."
    )
]

technical_skills.forEach(InsertTechnicalSkills);
soft_skills.forEach(InsertSoftSkills);
interests.forEach(InsertInterests);
projects_list.forEach(InsertProjects);
experience.forEach(InsertExperience);

