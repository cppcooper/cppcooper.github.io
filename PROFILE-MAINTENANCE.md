# Resume profiles

The resume is a static HTML page. Open it through a local web server; no build or
package installation is needed:

```sh
python3 -m http.server 8098 --bind 127.0.0.1
node tests/profiles.test.js
```

The native profile selector is cumulative. Each project in `content.js` has a
`minimumProfile`; `profiles.js` defines the order and descriptions. “Professional”
means projects for which income was earned. The current Professional entries are
four paid employment projects; independent engine work, ports, community
contributions and the university capstone appear only in broader profiles.
Employment, education, contact information and the existing footer are shared
across profiles.

| Profile | Adds | Total projects |
| --- | --- | ---: |
| Professional | Four paid employment projects | 4 |
| Academic | Original algorithm/game work, university projects and the Orthanc capstone | 12 |
| Published | Independently released Nexus Mods work | 14 |
| Hobby | Independent engine and port work, community contributions and other personal projects; full CV | 26 |

Public repository visibility and writing publication are not software releases.
The Published additions currently have `releases` arrays naming Nexus Mods and
their public distribution URLs. A future release can add another platform (for
example Steam) to that array and use `minimumProfile: 'published'`. Existing paid
commercial projects remain visible in Professional, including the released games.

The complete CV includes all 21 published portfolio project pages plus five
existing resume-only entries: Heavy Gear Assault, Fame and Fortune: Hidden
Objects, Sabotage, Indra's Net, and the broader Skyrim Modding overview. The
overview is retained alongside the specific Reserved Magicka NG case study; these
overlap and must not be added together as a count of separate releases.

## Updating entries

1. Update the entry in `content.js`. Keep the role/context, contribution dates,
   activity and minimum profile distinct. Keep third-party and team boundaries
   in the summary. An active upstream repository does not extend personal dates.
2. Link a portfolio-backed entry to `https://cppcooper.com/project/SLUG/` and
   retain its stable `portfolioKey`. The public project page carries the longer
   evidence and source references. Do not put private repository URLs here.
3. For independent released software, add a `releases` array with objects shaped
   as `{platform: 'Nexus Mods', url: 'https://…', year: 2023}`. The year is optional
   when only a broader release index is known. This metadata does not by itself
   reclassify a project; explicitly select its minimum profile.
4. `dfhack_contribution_period` is the shared date field for the selected principal
   native and Lua contributions (2017–2023). This does not claim the last-ever
   authored change: later minor maintenance and unfinished fork experiments are
   outside the selected story. Change dates only with evidence for that scope.
5. Run `node tests/profiles.test.js`, then inspect desktop/mobile layout and the
   print-friendly view. Verify the selected project list in Print / Save PDF.
   Adjust the expected public inventory and cumulative counts deliberately if
   projects are added or classifications change.

Native project tags apply an OR skill filter *within* the selected profile. The
clear button clears skills while retaining the profile. URLs such as
`?profile=published&skill=Papyrus` preserve that selection for sharing. Unknown
profile values fall back to Professional; unknown skills are ignored. Browser
Back and Forward restore profile and skills together. Printing uses the current
selection and never expands to the full CV automatically.

## Project classifications and evidence

These short entries use the reviewed public portfolio copy from November 2026
(`content-research/rewrites/2026-11-projects` in the portfolio repository), rather
than claims inferred from repository size, blog activity or the broader upstream
project. The portfolio's exclusion of Modeling Mutual Compatibility is respected.
The proposed Vikunja code-farm page is still unpublished and is not in this CV.

| Minimum profile | Projects |
| --- | --- |
| Professional | Heavy Gear Assault; Fame and Fortune; Sabotage; Indra's Net |
| Academic | DICOM Tag Filter for Orthanc; Game of the Amazons AI; Flight Itinerary Search; Hypermaze Prototype; Word Search with Threads; original Space Invaders; Rover Recursive Pathfinding; A* Pathfinding |
| Published | Reserved Magicka NG; existing Skyrim Modding overview |
| Hobby | Cheryl Engine 4; its Space Invaders, Hypermaze, Rover and Word Search ports; DFHack Contributions; DFHack Lua Scripts; historical Cheryl Engine; Rebuilding the Portfolio; NXM; Terminal Time Tracker; Shirly |

The existing employment project descriptions remain owner-authored resume facts.
Orthanc now describes the primary implementation within a team capstone; it makes
no verified deployment, clinical or privacy assurance. Amazons describes the AI
implementation and supplied course-client boundary, without repeating a placement
claim absent from the reviewed portfolio evidence. Modern engine and port work
remains in development. Shirly credits Ben for rendering.

The automated checks cover inclusion, cumulative boundaries, releases, role labels,
skill/profile intersection, URL round trips and malformed values, browser controller
transitions, and preservation of the selection during print events. Their small
document fixture does not replace final browser layout or PDF inspection.
