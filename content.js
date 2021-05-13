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
    get_tags(){
        let tags;
        tags = "";
        for (var i = 0; i < this.tags.length; i++) {
            if (i != 0){
                tags += ', ';
            }
            tags += this.tags[i];
        }
        return tags;
    }
    make_item(){
        let item;
        item =
            '<div class="item mb-3">' +
                '<div class="item-heading row align-items-center mb-2">' +
                    '<h4 class="item-title col-12 col-md-6 col-lg-4 mb-2 mb-md-0">';
        item +=         this.name;
        item +=     '</h4>';
        item +=     '<div class="item-meta col-12 col-md-6 col-lg-8 text-muted text-left text-md-right">';
        item +=         this.source + ' | ' + this.date_range;
        item +=     '</div>';
        item +=     '<div class="item-meta col-12 col-md-6 col-lg-9 text-muted text-left">';
        item +=         this.get_tags();
        item +=     '</div>'
        item +=     '<div class="item-meta col-12 col-md-6 col-lg-3 text-muted text-left text-md-right">';
        item +=         this.org_details;
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
function MakeListEntry(item,list_attributes,span_attributes){
    return '<li class="' + list_attributes +'"><span class="' + span_attributes + '">' + item + '</span></li>';
}
function InsertTechnicalSkills(item){
     let new_entry = MakeListEntry(item,"list-inline-item","badge badge-dark");
     InsertListEntry("tech-skills",new_entry);
}

function InsertSoftSkills(item){
    let new_entry = MakeListEntry(item,"list-inline-item","badge badge-light");
    InsertListEntry("soft-skills",new_entry);
}

function InsertInterests(item){
    let new_entry = MakeListEntry(item,"list-inline-item","badge badge-light");
    InsertListEntry("interests",new_entry);
}

function InsertProjects(item){
    InsertListEntry("projects", item.make_item());
}

function InsertExperience(item){
    InsertListEntry("experience", item.make_item());
}

const technical_skills = [
    'C++',
    'Java',
    'Git',
    "UML",
    'UE4',
    'SQL',
    'PHP',
    'JavaScript',
    'R',
    'Bash',
    'Lua',
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
    'Team Games',
    'Game Dev',
    'Bicycles',
    'Scripting',
    'Memory Hacking',
    'DevOps',
    'Machine Learning',
    'Blockchain',
    'Data Science',
];

const projects = [
    new ProjectEntry(
        "Amazons-AI",
        "Open Source",
        "2021",
        [
            "Java",
            "AI",
            "Client/Server",
            "Systems Architecture"
        ],
        "(<s>Group</s> Project, School)",
        "The aptly named <a href=\"https://github.com/cppcooper/game-of-the-amazons-ai\">Game Of The Amazons AI</a> was an AI project for a university class competition where team AI competed for bragging rights, I managed to place in the ranking but didn't achieve first. While intended as a group project for 3-5 people, I wrote the entire codebase for my team. The only real sticky point of development was understanding papers written about evaluating game positions. After the class was over I refactored the project from a client with a server to just a regular offline application."
    ),
    new ProjectEntry(
        "DFHack",
        "Open Source",
        "2017 - Present",
        [
            "C++",
            "Lua",
            "RNG",
            "Procedural Programming"
        ],
        "(Github Community)",
        "<a href=\"https://github.com/DFHack/dfhack#readme\">DFHack</a> is an API and reverse engineering effort for <a href=\"https://www.bay12games.com/dwarves/\">Dwarf Fortress</a>, ie. a world simulator & story generator. I contribute <a href=\"https://github.com/cppcooper/dfhack-scripts\">scripts</a> for modifying citizens and livestock, as well as a <a href=\"https://github.com/cppcooper/dfhack\">plugin</a> for exposing the C++11 random library's functionality to lua scripts."
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
            "Systems Architecture"
        ],
        "(UBCO - Psych. Dept.)",
        "<a href=\"https://people.ok.ubc.ca/lgabora/IN.html\">Indra's Net</a> is the brain child of Dr. Liane Gabora. It is a tool for visualizing psychology and is intended for patient use. I took on all development challenges from drafting technical specifications up to testing and debugging."
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
            "Systems Architecture",
            "DevOps",
            "Agile:Scrum/XP"
        ],
        "(Group Project, School)",
        "<a href=\"https://bitbucket.org/walking-fire-monkeys/unicorn-burrito/src/master/\">Unicorn Burrito</a> was a chat bot project for a university class. As a group project about project management and team coordination we decided to overreach for the development aspects and attempted an open domain conversational chat bot using neural networks. We named it in homage to <a href=\"https://timecube.2enp.com/\">time cube theory</a>."
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
        "<a href=\"https://store.steampowered.com/app/416020/Heavy_Gear_Assault/\">Heavy Gear Assault</a> is an online competitive first person shooter with mechanized infantry for players to 'pilot'. I was responsible for designing and implementing a more robust AI for the game's bots to use. I used a relatively simple model which made use of some heuristic stats based on human reaction times in order to give the bots a skill level and a natural appearance."
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
        "Cheryl-Engine",
        "Open Source",
        "2013 - 2015",
        [
            "C++",
            "OpenGL",
            "Systems Architecture"
        ],
        "(Solo Project, Personal)",
        "Cheryl Engine was an OpenGL game engine forked from <a href=\"https://github.com/Gibgezr/blit3d\">Blit3D</a>. I learned many lessons about OpenGL and systems architecture by working on the, now abandoned, engine. Development halted mid-upgrade during improvements to the logging in which I set out to support multi-platform stacktracing as this was the only portion unable to support multi-platform builds. By modifying some assembly code in the <a href=\"https://github.com/cppcooper/stackwalker-multi-plat\">StackWalker</a> library I was able to support most builds, but I couldn't backtrace the stack on x86 gcc windows builds."
    )
];

const experience = [
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
        "Helped hundreds of customers as part of BlackBerry's highest tier of technical support for handhelds and desktop software."
    )
]

technical_skills.forEach(InsertTechnicalSkills);
soft_skills.forEach(InsertSoftSkills);
interests.forEach(InsertInterests);
projects.forEach(InsertProjects);
experience.forEach(InsertExperience);