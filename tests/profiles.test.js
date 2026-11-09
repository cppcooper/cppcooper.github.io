const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const profiles = require('../profiles.js');
const {projects_list: projects, experience, ProjectEntry} = require('../content.js');
const root = path.resolve(__dirname, '..');
let checks = 0;
function check(name, callback) {
    callback();
    checks++;
    console.log(`ok ${checks} - ${name}`);
}

check('all four cumulative profiles include their predecessors', () => {
    let previous = [];
    for (const profile of profiles.profiles) {
        const current = profiles.visibleProjects(projects, profile.id).map(project => project.id);
        previous.forEach(id => assert(current.includes(id), `${id} missing from ${profile.id}`));
        previous = current;
    }
    assert.deepEqual(profiles.profiles.map(profile => profiles.visibleProjects(projects, profile.id).length), [4, 12, 14, 26]);
});

check('the complete CV has all 21 public project pages exactly once', () => {
    const keys = [
        'rover', 'rover-cheryl4-port', 'word-search-with-threads', 'word-search-cheryl4-port',
        'space-invaders-bullet-hell', 'space-invaders-cheryl4-port', 'hypermaze', 'hypermaze-cheryl4-port',
        'a-star', 'shirly', 'cosc320-flightpathfinding', 'game-of-the-amazons-ai', 'cheryl-engine',
        'cheryl-engine-modern', 'wp-portfolio-template', 'nxm', 'time-tracker', 'dfhack', 'dfhack-scripts',
        'magickareserve', 'dicom-tag-filter'
    ];
    const entries = profiles.visibleProjects(projects, 'hobby').filter(project => project.portfolioKey);
    assert.deepEqual(entries.map(project => project.portfolioKey).sort(), keys.sort());
    assert.equal(new Set(projects.map(project => project.id)).size, projects.length);
    entries.forEach(project => assert.match(project.url, /^https:\/\/cppcooper\.com\/project\/[a-z0-9-]+\/$/));
    assert(!entries.some(project => /modeling|vikunja/i.test(project.name)));
});

check('Professional includes exactly the four paid employment projects', () => {
    const selected = profiles.visibleProjects(projects, 'professional');
    assert.deepEqual(selected.map(project => project.id).sort(), [
        'fame-and-fortune', 'heavy-gear-assault', 'indras-net', 'sabotage'
    ]);
    selected.forEach(project => assert.match(project.context, /^(Professional work|Research employment)/));
    projects.filter(project => project.portfolioKey).forEach(project => {
        assert(!profiles.includesProject('professional', project), `${project.id} is unpaid project work`);
    });
});

check('Academic adds the capstone and earlier academic work while Hobby adds unpaid independent work', () => {
    const academic = profiles.visibleProjects(projects, 'academic');
    assert(academic.find(project => project.portfolioKey === 'dicom-tag-filter').context.includes('University capstone'));
    const hobby = profiles.visibleProjects(projects, 'hobby');
    ['cheryl-engine-modern', 'dfhack', 'dfhack-scripts', 'hypermaze-cheryl4-port', 'rover-cheryl4-port',
        'word-search-cheryl4-port', 'space-invaders-cheryl4-port'].forEach(key => {
        const project = hobby.find(entry => entry.portfolioKey === key);
        assert.equal(project.minimumProfile, 'hobby');
        assert(!profiles.includesProject('published', project));
    });
    assert.equal(hobby.find(project => project.portfolioKey === 'cheryl-engine-modern').activity, 'active');
});

check('the four completed college ports remain distinct from the active engine', () => {
    ['space-invaders-cheryl4-port', 'hypermaze-cheryl4-port', 'rover-cheryl4-port',
        'word-search-cheryl4-port'].forEach(key => {
        const project = projects.find(entry => entry.portfolioKey === key);
        assert.equal(project.activity, 'completed');
        assert.equal(project.period, '2026');
        assert.equal(project.get_group(), 'completed');
        assert.equal(project.minimumProfile, 'hobby');
        assert(!/^(Rebuilding|Integrating|Building|Implementing)\b/.test(project.highlights[0]));
    });
    const engine = projects.find(entry => entry.portfolioKey === 'cheryl-engine-modern');
    assert.equal(engine.activity, 'active');
    assert.equal(engine.period, '2026–present');
    assert.equal(engine.get_group(), 'active');
});

check('Published adds verified independent releases, not a public repository or blog', () => {
    const academic = profiles.visibleProjects(projects, 'academic').map(p => p.id);
    const additions = profiles.visibleProjects(projects, 'published').filter(p => !academic.includes(p.id));
    assert.deepEqual(additions.map(p => p.id).sort(), ['magickareserve', 'skyrim-modding']);
    additions.forEach(p => assert(p.releases.some(release => release.platform === 'Nexus Mods'
        && release.url.startsWith('https://www.nexusmods.com/'))));
    assert(!profiles.visibleProjects(projects, 'published').some(p => p.portfolioKey === 'wp-portfolio-template'));
});

check('skill matching intersects with the profile and retains OR semantics for multiple skills', () => {
    const cpp = profiles.visibleProjects(projects, 'professional', ['C++']);
    assert(cpp.length > 0);
    cpp.forEach(p => assert(p.tags.includes('C++') && p.minimumProfile === 'professional'));
    const java = profiles.visibleProjects(projects, 'professional', ['Java']);
    assert.equal(java.length, 0);
    assert.equal(profiles.visibleProjects(projects, 'academic', ['Java']).length, 2);
    const combined = profiles.visibleProjects(projects, 'academic', ['Java', 'Lua']);
    combined.forEach(p => assert(p.tags.includes('Java') || p.tags.includes('Lua')));
    assert.equal(profiles.visibleProjects(projects, 'hobby', ['Visual Basic 6']).length, 1);
});

check('malformed and adversarial URL state falls back safely and ignores unknown skills', () => {
    for (const query of ['', '?profile=missing', '?profile=%3Cimg%20src=x%20onerror=alert(1)%3E', '?profile=%FF']) {
        const parsed = profiles.parseState(query + '&skill=%3Cscript%3E&skill=not-a-skill', projects);
        assert.equal(parsed.profile, 'professional');
        assert.deepEqual(parsed.skills, []);
    }
    assert(!profiles.includesProject('hobby', {minimumProfile: 'unclassified'}));
    const parsed = profiles.parseState('?profile=academic&skill=Java&skill=Java&skill=C%2B%2B', projects);
    assert.deepEqual(parsed, {profile: 'academic', skills: ['Java', 'C++']});
});

check('shareable URLs round-trip profile and skills without losing unrelated parameters or fragments', () => {
    const url = profiles.stateURL('https://cppcooper.github.io/?ref=portfolio&profile=hobby&skill=Lua#project-dfhack', {
        profile: 'published', skills: ['C++', 'Papyrus', 'C++']
    });
    assert.equal(url.searchParams.get('ref'), 'portfolio');
    assert.equal(url.hash, '#project-dfhack');
    assert.deepEqual(profiles.parseState(url.search, projects), {profile: 'published', skills: ['C++', 'Papyrus']});
    assert.equal(profiles.stateURL(url.href, {profile: 'professional', skills: []}).search, '?ref=portfolio');
});

check('project title, context, skills and release metadata are escaped in generated HTML', () => {
    const entry = new ProjectEntry({id: 'escape-check', name: '<img onerror="bad">', url: 'https://example.com/?x="bad"',
        period: '<2026>', context: '<context>', source: '<source>', activity: 'completed', tags: ['<tag>'],
        releases: [{platform: '<platform>', url: 'https://example.com/?x="bad"'}], highlights: ['Trusted editorial copy.']});
    const html = entry.make_item();
    ['<img', '<context>', '<source>', '<tag>', '<platform>'].forEach(value => assert(!html.includes(value)));
    assert(html.includes('&quot;bad&quot;'));
});

// Exercise the real controllers against a minimal document and browser history.
// These checks cover state transitions; final visual/print layout is reviewed in Firefox.
function browserFixture(search = '') {
    const listeners = {};
    const elements = new Map();
    function element(id) {
        if (!elements.has(id)) elements.set(id, {id, innerHTML: '', textContent: '', value: '', hidden: false,
            dataset: {}, listeners: {}, addEventListener(type, fn) { this.listeners[type] = fn; },
            insertAdjacentHTML(position, html) { this.innerHTML += html; },
            setAttribute(name, value) { this[name] = value; },
            querySelector() { return null; }, focus() {}, getBoundingClientRect() { return {top: 0}; }});
        return elements.get(id);
    }
    const main = element('main');
    const aside = element('aside');
    const row = {insertBefore(node) { this.first = node; }, append(node) { this.last = node; }};
    main.parentElement = row;
    const document = {
        title: '', body: {classList: {toggle() {}}}, getElementById: element,
        querySelector(selector) { return selector === '.resume-main' ? main : selector === '.resume-aside' ? aside : element(selector); }
    };
    const location = new URL('https://cppcooper.github.io/' + search);
    const window = {location, history: {pushState(state, title, url) {
        const next = new URL(url);
        location.href = next.href;
    }}, addEventListener(type, fn) { listeners[type] = fn; }, dispatchEvent() {}, scrollBy() {},
        print() { this.printed = true; }};
    const sandbox = {document, window, URL, URLSearchParams, CustomEvent: class {}, console};
    vm.createContext(sandbox);
    vm.runInContext(fs.readFileSync(path.join(root, 'profiles.js'), 'utf8'), sandbox);
    vm.runInContext(fs.readFileSync(path.join(root, 'content.js'), 'utf8'), sandbox);
    vm.runInContext(fs.readFileSync(path.join(root, 'checkboxes.js'), 'utf8'), sandbox);
    vm.runInContext(fs.readFileSync(path.join(root, 'print.js'), 'utf8'), sandbox);
    return {element, listeners, document, window, row, aside};
}

function projectIds(html) {
    return [...html.matchAll(/<article id="project-([^"]+)"/g)].map(match => match[1]);
}

check('the browser defaults to Professional and selects cumulative profiles without changing experience', () => {
    const fixture = browserFixture();
    const initialExperience = fixture.element('experience').innerHTML;
    assert.equal(projectIds(fixture.element('projects').innerHTML).length, 4);
    assert.equal(fixture.element('resume-profile-controls').hidden, false);
    const select = fixture.element('resume-profile');
    select.listeners.change({target: {value: 'hobby'}});
    assert.equal(projectIds(fixture.element('projects').innerHTML).length, 26);
    assert.equal(fixture.element('resume-document').dataset.profile, 'hobby');
    assert.equal(fixture.element('experience').innerHTML, initialExperience);
    assert.match(fixture.window.location.search, /profile=hobby/);
    assert.equal(experience.length, 5);
});

check('a shared filter, empty selection, clear action and browser Back restore the intended state', () => {
    const fixture = browserFixture('?profile=academic&skill=Java');
    assert.equal(projectIds(fixture.element('projects').innerHTML).length, 2);
    fixture.element('resume-profile').listeners.change({target: {value: 'professional'}});
    assert.equal(projectIds(fixture.element('projects').innerHTML).length, 0);
    assert.match(fixture.element('projects').innerHTML, /No projects/);
    assert.equal(fixture.element('clear-project-filters').hidden, false);
    fixture.element('clear-project-filters').listeners.click();
    assert.equal(projectIds(fixture.element('projects').innerHTML).length, 4);
    assert(!fixture.window.location.search.includes('skill='));
    fixture.window.location.search = '?profile=published&skill=Papyrus';
    fixture.listeners.popstate();
    assert.equal(fixture.element('resume-profile').value, 'published');
    assert.equal(projectIds(fixture.element('projects').innerHTML).length, 2);
});

check('printing and print-friendly view keep exactly the selected profile and skills', () => {
    const fixture = browserFixture('?profile=published&skill=Papyrus');
    const selected = fixture.element('projects').innerHTML;
    fixture.element('toggle-print-view').listeners.click();
    assert.equal(fixture.element('resume-print-styles').media, 'all');
    assert.equal(fixture.row.first, fixture.aside);
    assert.equal(fixture.element('projects').innerHTML, selected);
    fixture.element('print-resume').listeners.click();
    assert.equal(fixture.window.printed, true);
    fixture.listeners.beforeprint();
    fixture.listeners.afterprint();
    assert.equal(fixture.element('projects').innerHTML, selected);
    assert.equal(fixture.element('resume-document').dataset.profile, 'published');
    assert.match(fixture.element('resume-profile-summary').textContent, /^Published/);
});

console.log(`${checks} profile checks passed.`);
