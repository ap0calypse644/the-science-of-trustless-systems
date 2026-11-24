# Repository agent instructions

## Scope and review gates

- Implement and test the work explicitly approved by the project owner. Creative direction, architecture approval, technical review, and milestone planning are coordinated separately by the owner.
- Read the README, roadmap, and relevant design, architecture, and storyboard sections before editing. The roadmap defines approval boundaries. Treat architectural proposals and storyboard choices as provisional until reviewed.
- Complete and verify the authorized scope, report the files changed, tests or checks run, assumptions, unresolved decisions, and Git status, then stop for explicit review. Approval of one milestone does not authorize implementation of the next.
- M0.1 is the approved documentation baseline. M0.2 authorizes framework initialization and diagnostic slides. Lecture slides, the visual identity, illustrations, and playback implementation require their respective approved milestones.
- Commit, push, and create remote branches only when explicitly authorized. Keep employer information, secrets, and private credentials out of code, docs, assets, examples, and tool output.

## Implementation standards

- Use readable TypeScript with explicit types at module boundaries and keep changes scoped. Reuse existing scene, rendering, and control APIs where they fit. Keep educational model state independent of Reveal.js and rendering details.
- Keep rendering repeatable using stable seeds and inputs. Keep scene initialization and cleanup predictable, including under rapid navigation, revisits, restart, and backward seeking. Release scene-owned timelines, listeners, and other resources on exit.
- Keep slide navigation separate from animation and interaction. Preserve keyboard navigation and presenter affordances. Review any binding against the installed Reveal.js version, browser behavior, and focus in interactive controls.
- Bundle production dependencies, fonts, and media locally. Keep runtime operation independent of internet access, remote APIs, and CDNs. Use synthetic classroom data and visibly label toy cryptography.
- Verify teaching claims against appropriate primary references. State relevant assumptions and limits in speaker notes. Use original illustrations and record font and asset licenses.
- Run the checks relevant to the approved work. Use deterministic tests for state transitions. Develop and rehearse in desktop Firefox. Run the shared Playwright suite with Firefox as the primary automation target and Chromium for compatibility. Report manual checks, unverified behavior, and failures explicitly.
