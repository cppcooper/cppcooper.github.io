const technical_skills = [
    'C++',
    'Java',
    'Git',
    'UE4',
    'Bash',
    'SQL',
    'PHP',
    'JavaScript',
    'R',
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