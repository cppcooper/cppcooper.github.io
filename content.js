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
        "DFHack",
        "Open Source",
        "2017 - Present",
        [
            "C++",
            "CMake",
            "CI",
            "Lua",
            "RNG",
            "Procedural Programming"
        ],
        "(Github Community)",
        "<a href=\"https://github.com/DFHack/dfhack#readme\">DFHack</a> is an API and reverse engineering effort for <a href=\"https://www.bay12games.com/dwarves/\">Dwarf Fortress</a>, ie. a world simulator & story generator. " +
        "I've contributed several robust <a href=\"https://github.com/cppcooper/dfhack-scripts\">scripts</a> for modifying citizens/livestock and even a development script for searching data structures. Additionally, there are a few <a href=\"https://github.com/cppcooper/dfhack\">plugins</a> (cxxrandom, channel-safely, spectate), and recently a refactor to the core event system."
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
        "I was responsible for designing and implementing a more robust AI for the game's bots to use. I used a relatively simple model which made use of some heuristic stats based on human reaction times in order to give the bots a skill level and a natural appearance."
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
        "Sabotage was a side scrolling stealth shooter based on the book by the same name. A UE4 project destined for consoles and PCs implemented primarily using blueprints. I was primarily responsible for building UMG widgets as well as writing and updating the controllers and pawns."
    ),
    new ProjectEntry(
        "BCCF Data Pipeline",
        "Open Source",
        "2021 - 2022",
        [
            "C++",
            "CMake",
            "Architecture Design",
            "DICOM Parsing",
            "Unit Testing",
            "Orthanc",
            "Docker",
            "CI"
        ],
        "(Capstone Project)",
        "This <a href=\"https://github.com/cppcooper/data-anonymizer\">data pipeline</a> is a tool developed for the <a href='https://bccancerfoundation.com/about-us/'>British Columbia Cancer Foundation</a> as a way of anonymizing patient images before use in research. These images utilize the DICOM standard which specifies how to read and write such files. " +
        "Aside from image data, <a href='https://dicom.nema.org/medical/dicom/current/output/chtml/part10/chapter_7.html'>DICOM files</a> contain <a href='https://www.dicomlibrary.com/dicom/dicom-tags/'>loads of other information</a> such as patient name, age, etc. This data needs to be scrubbed out of the file before it can be used for deep learning or other research."
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
            "Architecture Design"
        ],
        "(<s>Group</s> Project, School)",
        "The aptly named <a href=\"https://github.com/cppcooper/game-of-the-amazons-ai\">Game Of The Amazons AI</a> was an AI project for a university class competition where teams competed for bragging rights." +
        " While intended as a group project for 3-5 people, I wrote the entire codebase for my team and still managed to place in the rankings even with hardware issues causing matches to be lost. " +
        "The only real sticky point of development was understanding papers written about evaluating game positions." +
        "After the class was over I refactored the project from a client with a server to just a regular offline application."
    ),
    new ProjectEntry(
        "Indra's Net",
        "Closed Source",
        "2018 - 2020",
        [
            "UE4",
            "C++",
            "Blueprints",
            "Physics",
            "Linear Algebra",
            "Architecture Design"
        ],
        "(UBCO - Psych. Dept.)",
        "<a href=\"https://gabora-psych.ok.ubc.ca/IN.html\">Indra's Net</a> is the brain child of Dr. Liane Gabora. " +
        "It is a tool for visualizing psychology and is intended for patient use. I took on all development challenges from drafting technical specifications up to testing and debugging."
    ),
    new ProjectEntry(
        "Chat Bot",
        "Open Source",
        "2019",
        [
            "Java",
            "C++",
            "NLP",
            "Machine Learning",
            "Architecture Design",
            "DevOps",
            "Agile:Scrum/XP"
        ],
        "(Group Project, School)",
        "<a href=\"https://bitbucket.org/walking-fire-monkeys/unicorn-burrito/src/master/\">Unicorn Burrito</a> was a chatbot project for a university class. " +
        "As a group project about project management and team coordination we decided to overreach for the development aspects and attempted an open domain conversational chat bot using neural networks. We named it in homage to <a href=\"https://timecube.2enp.com/\">time cube theory</a>."
    ),
    new ProjectEntry(
        "Cheryl-Engine",
        "Open Source",
        "2013 - 2015",
        [
            "C++",
            "OpenGL",
            "Architecture Design"
        ],
        "(Solo Project, Personal)",
        "Cheryl Engine was an OpenGL game engine forked from <a href=\"https://github.com/Gibgezr/blit3d\">Blit3D</a>. " +
        "I learned many lessons about OpenGL and systems architecture by working on the, now abandoned, engine. " +
        "Development halted mid-upgrade during improvements to the logging in which I set out to support multi-platform stacktracing as this was the only portion unable to support multi-platform builds. " +
        "By modifying some assembly code in the <a href=\"https://github.com/cppcooper/stackwalker-multi-plat\">StackWalker</a> library I was able to support most builds, but I couldn't backtrace the stack on x86 gcc windows builds."
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

