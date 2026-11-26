# M5i · Integrated Part I review

Reviewed all 32 production slides from `origin/main` at `6eb811a3ec92be942a69fd2854c7882050bc41b1` for [issue #30](https://github.com/ap0calypse644/the-science-of-trustless-systems/issues/30). The browser, narrative, and print checks support owner visual and motion review. Slide 5 has an open redistribution decision. Projector, audience-distance, and dual-display rehearsal remain pending. This draft changes review documentation only.

## Verification

| Check | Method and result |
| --- | --- |
| Build and typecheck | A fresh `git archive origin/main` extraction passed `npm ci --offline`, `npm run typecheck`, and `npm run build`. From the clean tracked review branch, `npm run typecheck` and `PLAYWRIGHT_PORT=4186 npm test -- --workers=4` passed. The latter runs `npm run build` before Playwright. Node 24.22.2, npm 11.19.1, Vite 8.3.8, Playwright 1.65.1. |
| Full browser suite | 290/290 passed, 145 each in Playwright Firefox 159.0 and Chromium 159.0.8154.6. Zero test failures or reruns. The previously reported intermittent Firefox speaker preview did not reproduce. |
| Installed desktop Firefox | Firefox 154.0 via geckodriver. Walked 32 production slides in order, playing every interval between scripted checkpoints at 2×. Captured 32 openings, 119 subsequent holds/endpoints, and 25 intermediate motion samples. Checked J/K and reset on animated slides. Separate run passed keyboard play/pause, stable paused clock, slider seek, reset, direct URL, forward/back and rapid navigation, focus isolation, outgoing scene cleanup, speaker notes and opening-state preview, and resize. The first controls attempt and exit retest are recorded below. |
| Network isolation and preserved entries | Firefox walkthrough used a loopback-only proxy configuration. Chromium admitted only the local production server and checked production, print, and 13 preserved entries: `/`, `/review/`, `/library/`, `/engine/`, `/talk/staging/`, and `/talk/m5a/` through `/talk/m5h/`. Observed 71 distinct local request paths, zero off-origin attempts, failed requests, HTTP errors, uncaught page errors, or WebSockets. |
| Print and notes | `/talk/?print` rendered 32 ordered sheets with local images loaded. Chromium PDF export and `pdfinfo -f 1 -l 32` confirmed 32 pages of 1152 × 648 pt each. Rasterized all pages with `pdftoppm -r 60 -png` and inspected them in order. No blank page, missing content, or visible clipping of teaching content. All 32 production slides have nonempty speaker notes. |
| Committed diff | `git diff --check origin/main...HEAD` passed. |

Local evidence is under `test-results/visual-review/m5i-part-i/`. The `desktop/1868x1011/` captures cover every opening, scripted hold, and a motion sample for each animated slide. `desktop/1228x673/` has ten representative openings. `part-i.pdf`, `pdf-pages/`, `native-notes.json`, and `print-route-audit.json` record the print and notes checks. `logs/` contains the local browser and test logs. The screenshots and PDF contain the slide 5 image and are local review evidence.

## Slide-by-slide review

Each row reflects the production walkthrough, notes check, and print inspection. Slide 5 carries the separate rights finding below.

| # | Scene | Result |
| ---: | --- | --- |
| 1 | Title | Opening contraption and prompts frame agreement and disclosure. |
| 2 | Single point of failure | The shared power strip explains the correlated outage. Charlie's wall outlet remains independent. |
| 3 | Why distribute? | Independent power, replication, and a configured reroute explain the surviving service. |
| 4 | Deployment and governance | Same multi-server topology supports the distinction between central control and independent operators. |
| 5 | CAP theorem | All three labels and the local meme render. Notes frame the theorem and avoid the “pick any two” shorthand. Rights decision open. |
| 6 | Bank partition | A completes a 1,000-unit withdrawal before B reads. The stale 1,000-unit reply and the waiting counterfactual start from the same partitioned state. The waiting read finishes at 0 after reconnection. |
| 7 | Two Generals | Loss, retry, acknowledgment, and paired endings support the final-message argument under arbitrary loss. |
| 8 | Byzantine Generals | The three-general run ties. Bob gets two Attack values and Charlie gets three in the four-general run. Notes distinguish the illustrative executions from the oral-message guarantee. |
| 9 | Shared ledger | Receipt confusion resolves into two café IOUs, separate from the payment balances that follow. |
| 10 | Unauthorized transactions | Rejecting the unsigned 20 leaves balances intact. Bob's authorized 10 moves balances from 0/30/5 to 10/20/5. Notes cover signer binding and replay. |
| 11 | Infinite money glitch | Charlie's signed 500-unit payment fails the 5-unit balance check. |
| 12 | Ledger control | Losing access, proposed fee, and copies distinguish access from transaction ordering. |
| 13 | Double spend | Reset to Charlie's 20 units. Two distinct signed 20-unit payments each fit initially. Opposite receipt orders yield different locally valid histories and the battlefield callback. |
| 14 | Data fingerprint | Greeting, ledger and library all use a 256-bit result. Exact copied bytes match. Notes identify authored prefixes and explain the limit of a prefix comparison. |
| 15 | One-bit edit | The final UTF-8 digit changes from `00110000` to `00110001`. The authored grids report 132 of 256 flips and the notes require a trusted saved digest. |
| 16 | Proof of work | The signed amount edit fails authorization. The four-zero toy target applies after undo. Authored nonces 0–6 miss and 7 passes. |
| 17 | Easy verification | One candidate hash and target check reuses slide 16's result. The 16, 256, 65,536 and 16,777,216 expectations follow from the stated ideal model. |
| 18 | Growing ledger | Transactions append in order. Notes explain the opening-state dependency for replay. |
| 19 | Pages to blocks | Ordered page contents carry into four unlinked blocks without balance summaries. |
| 20 | Changing history | Hash pointers expose edits. Repairing the next link shifts the mismatch forward. The name blockchain follows the linking demonstration. |
| 21 | Conflicting histories | The common prefix and signed competing candidates explain why hashing alone cannot settle the fork. |
| 22 | Expensive history | Successors are mined in order with updated predecessor digests. Matching links and successful work still leave Charlie's unauthorized edit invalid. |
| 23 | Fork choice and confirmations | Valid greatest cumulative work, equal work per block for this race, a tie, and a 9–4 finish. Six counts from the inclusion block and remains probabilistic. |
| 24 | Mining workload | The pile buries Alice before the white flag and question. The pile is a visual metaphor for repeated work. |
| 25 | Miner reward | The candidate commits to the 10-unit subsidy before mining. Acceptance follows independent validation. Notes distinguish issuance, transferred fees and maturity. |
| 26 | Bitcoin reveal | First Bitcoin reveal in the invention arc. The logo and text settle separately. Notes qualify the classroom account model against Bitcoin's actual data model. |
| 27 | Electricity bill | Stacked server racks, exact `$ 4972` and caption-free local Village Global photo-head cameo. “More RAM?” and the bill are disclosed as fictional. |
| 28 | Bonded stake | Separate bonded amounts yield 35%, 35% and 30% in this toy model. Notes distinguish bonding, proposal selection and consensus. |
| 29 | Stake-weighted voting | Proposal, prevote, precommit, commit. Alice and Bob each observe 70% of total voting power. The threshold is strictly `> 2/3`; Charlie's silent 30% remains in the denominator. |
| 30 | Beyond cryptocurrency | Charlie, boat, Bitcoin mark and four submerged labels precede the parallel Internet/blockchain comparison. Reveal paths give approximately 9.94% above and 90.06% below by silhouette area. Print uses the parallel comparison. |
| 31 | Application and design judgment | Alice supplies the signed credential. The employer verifies issuer recognition, signature and status. The registry example stores issuer and status information. The shared registry check is conditional. |
| 32 | Privacy bridge | The café copies contain exactly “Bob spent $2 on donuts” and “Alice spent $345 on coffee.” Only Charlie's copy highlights Alice's entry. The glass house closes the slide without a slogan or privacy mechanism reveal. |

## Notes, primary sources, and assets

- CAP's partition model, the arbitrary-loss premise in Two Generals, and the synchronous oral-message assumptions in Byzantine Generals remain distinct. The slide 8 four-person example matches the one-fault threshold in that model. [Gilbert and Lynch](https://doi.org/10.1145/564585.564601), [Halpern and Moses §3](https://arxiv.org/abs/cs/0006009), [Lamport, Shostak and Pease](https://lamport.azurewebsites.net/pubs/byz.pdf).
- The café and mining sequences distinguish authorization, independently checked validity, ordering, and chain selection. Notes prompt the presenter to identify authored digest/nonce data and disclose toy assumptions. Bitcoin compares a header hash to a numeric target and selects by work among valid branches. The classroom rule counts leading zero bits and uses equal work per block. A single hash check covers the puzzle, while block validation checks additional rules. [NIST FIPS 186-5](https://csrc.nist.gov/pubs/fips/186-5/final), [NIST FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final), [Bitcoin whitepaper §§2–6, 11](https://bitcoin.org/bitcoin.pdf), [Bitcoin Core validation](https://github.com/bitcoin/bitcoin/blob/v29.0/src/validation.cpp), [coinbase maturity](https://github.com/bitcoin/bitcoin/blob/v29.0/src/consensus/tx_verify.cpp).
- The proof-of-stake example uses a fixed validator set and one successful CometBFT-style round. Notes specify matched votes by block, type, height and round, own vote once, strict quorum against total power, less than one-third Byzantine power for safety, and timing assumptions for progress. [CometBFT consensus](https://github.com/cometbft/cometbft/blob/main/spec/consensus/consensus.md), [signing rules](https://github.com/cometbft/cometbft/blob/main/spec/consensus/signing.md).
- The application sequence uses authored scenarios. A handoff record cannot attest physical provenance by itself. A trusted timestamp can support existence by a given time. The credential example retains issuer trust and limits the registry's purpose. The glass house illustrates disclosure and the final question stays verbal. [RFC 3161](https://www.rfc-editor.org/rfc/rfc3161.html), [W3C Verifiable Credentials Data Model 2.0](https://www.w3.org/TR/vc-data-model-2.0/), [privacy considerations](https://www.w3.org/TR/vc-data-model-2.0/#privacy-considerations).
- Fonts are bundled locally. Kalam, Patrick Hand, and Balsamiq Sans regular/bold carry SIL OFL 1.1 credits and notices. The Bitcoin vector on slides 26 and 30 is the same local copy from the Commons public-domain mark. Its provenance records bitboy, Grayliptrot and Darkness3560. [Font inventory and notices](../public/review-font-licenses/SOURCES.md), [Bitcoin asset record](../src/talk/m5f/REVIEW.md), [Commons file](https://commons.wikimedia.org/wiki/File:Bitcoin.svg).
- Slide 27 uses the SVG-clipped head from the Village Global photo, CC BY 2.0. Speaker notes name the creator and identify the adaptation and joke. The visual cameo carries no name caption. Preserve that attribution with any separately shared materials using the photograph. [Local photo provenance](../src/talk/m5g/REVIEW.md), [creator's post](https://www.flickr.com/photos/villageglobal/52530764101/), [license verification](https://commons.wikimedia.org/wiki/File:Sam_Altman_November_2022.jpg), [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/).
- The presenter supplies the audience prompts verbally. Runtime controls affect playback and navigation, and the teaching examples are fixed scripts.

## Findings and proposed remedies

| Severity | Reproduction and impact | Proposed resolution for owner decision |
| --- | --- | --- |
| High for redistribution · slide 5 | Load `/talk/#/05-cap-theorem` or PDF page 5. The bundled three-character Imgflip composite loads offline, but the README records unverified rights for the composite and underlying cartoon. The staging route `/talk/m5a/` provides a labeled placeholder and a local-only picker. Production and print have no corresponding rights-cleared fallback. | Confirm permission covering both elements before redistributing the deck or exported PDF, or separately authorize an original or rights-cleared visual for production and print. See [provenance and fallback](../README.md#slide-5-asset-provenance). |
| Low · native harness timeout after full walk | The initial controls probe after slide 32 reset sent a synthetic key value of `Space` instead of a literal space. Playback did not start in that probe. Its teardown also logged a Firefox script timeout in timeline cleanup and a geckodriver 404. A subsequent exit-check setup on another port returned WebDriver HTTP 500 at initial navigation. The corrected controls run passed. Six focused slide 32 reset → slide 24 jump and play/pause retries passed without reproducing the cleanup timeout. | If the cleanup timeout occurs in a live rehearsal, capture the Firefox console and exact navigation history for a scoped investigation. |
| Pending physical rehearsal | At projector distance, check dense text on the report tables, hash grids, fork annotations, BFT labels, application labels and transcript. Smaller desktop renders and 1024×768 automation verify fit, while room conditions and dual displays remain untested. | Run the room checklist below. Record the slide, checkpoint, display mode and viewing distance for any issue that needs owner authorization to change. |

## Presenter rehearsal

- Serve the built deck with `npm run preview` and open `http://127.0.0.1:4173/talk/` in desktop Firefox. Bookmark deep links for the bank, Byzantine table, fork race and privacy bridge. With external networking disconnected, repeat from a fresh tab with the local server running.
- Left/Right navigate. Space plays to the next hold or pauses mid-motion. J/K step back/forward through checkpoints. R resets. Use the seek slider for a particular moment. H hides or shows controls, F toggles fullscreen, S opens notes, and Escape opens overview outside fullscreen. Return focus to the presentation after using a slider, button, or speaker window.
- At the actual projector, confirm fullscreen and aspect ratio, white and pale fills, motion and back-row legibility. Check that the audience display shows the deck and the presenter display shows notes. Practise recovery after accidental navigation, keyboard focus on the wrong display, and a browser reload. Review a local print copy as a rehearsal backup under the slide 5 asset decision.
- Use 45 minutes as a flexible Part I target in a nominal two-hour lecture, alongside the storyboard's provisional 45-minute and 30-minute slots. Suggested Part I split is 11 minutes for slides 1–6, 8 for 7–8, 9 for 9–17, 10 for 18–26, and 7 for 27–32. Treat it as a rehearsal target. Keep the bank prediction, generals perspectives, fork tie, stake denominator, and final privacy question even if discussion elsewhere needs to shorten. Run through at 1× with actual narration and time for audience replies. The accelerated desktop pass checked the deck and does not measure those times.
