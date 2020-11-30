const technical_skills = [
    'C++',
    'Java',
    'git',
    'Linux',
    'Windows',
    'UE4',
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
];
const soft_skills = ['Teamwork', 'Empathy', 'Detail-Oriented', 'Creativity', 'Leadership', 'Adaptability'];
const interests = ['scripting', 'devops', 'game dev', 'memory hacking', 'team games', 'machine learning', 'data science', 'blockchain', 'd&d world building'];
technical_skills.forEach(InsertTechnicalSkills);
soft_skills.forEach(InsertSoftSkills);
interests.forEach(InsertInterests);

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