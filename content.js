class ExperienceEntry {
    constructor(title,org,date_range,writeup){
        this.title = title;
        this.org = org;
        this.date_range = date_range;
        this.writeup = writeup;
    }
    make_item(){
        item = 
            '<div class="item mb-3">' +
                '<div class="item-heading row align-items-center mb-2">' +
                    '<h4 class="item-title col-12 col-md-6 col-lg-6 mb-2 mb-md-0">';
        item +=         this.title;
        item +=     '</h4>';
        item +=     '<div class="item-meta col-12 col-md-6 col-lg-6 text-muted text-left text-md-right">';
        item +=         this.org + ' | ' + date_range;
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