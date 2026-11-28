# M6a visual review · slides 33–36

Scope is [issue #32](https://github.com/ap0calypse644/the-science-of-trustless-systems/issues/32) and the [canonical M6 creative checkpoint](../../../docs/m6-creative-checkpoint.md). The 16 editable stills use the existing white Expressive Minimalism canvas. Slide 33 is a single static evidence board. Slides 34 and 35 have four holds each. Seven cipher holds separate dial alignment, the shifted endpoint, the open strips, each direction of conversion, and the two stages of Eve’s search.

Run `npm run build` and `npm run preview -- --port 4175 --strictPort`. Open [the deck](http://127.0.0.1:4175/talk/m6a/) in installed Firefox. Left/Right changes holds and S opens speaker notes. Each URL selects the specified still. The table describes the static composition and proposed production checkpoints for review.

| Hold | Composition or intended motion |
| --- | --- |
| [33 · Evidence board](http://127.0.0.1:4175/talk/m6a/#/33-evidence-board) | Hold on Charlie and his board. Each time and amount connects to a tentative inference. Ask what removing names would change. |
| [34A · Names](http://127.0.0.1:4175/talk/m6a/#/34-names) | Start with the named ledger and Alice’s excitement. Replace the name column in place. |
| [34B · Reused address](http://127.0.0.1:4175/talk/m6a/#/34-reused-address) | Land on the address ledger and highlight the three appearances of 0x7F3A…. |
| [34C · Coffee clue](http://127.0.0.1:4175/talk/m6a/#/34-coffee-clue) | Bring in the known purchase from outside the address ledger and connect it to the $345 row. |
| [34D · Linked records](http://127.0.0.1:4175/talk/m6a/#/34-linked-records) | Run the strings to Alice, hold the facepalm and reveal “Pseudonymity ≠ Anonymity.” Ask about hiding the contents of a message. |
| [35A · First message](http://127.0.0.1:4175/talk/m6a/#/35-first-message) | Alice writes MEET AT DAWN. Charlie sets out with the sealed letter. |
| [35B · Eve reads](http://127.0.0.1:4175/talk/m6a/#/35-eve-reads) | Eve slips from cover, reads the letter during Charlie’s distraction, and returns the original. Bob reads it on arrival. The still shows both ends of that beat. |
| [35C · Second message](http://127.0.0.1:4175/talk/m6a/#/35-second-message) | Repeat the send with PHHW DW GDZQ and the same courier. |
| [35D · Caesar reveal](http://127.0.0.1:4175/talk/m6a/#/35-caesar-reveal) | Eve puzzles over the intercepted text, Bob recovers the message and the heading changes. Ask how Bob did it. |
| [36A · Aligned wheel](http://127.0.0.1:4175/talk/m6a/#/36-wheel-aligned) | Start with both 26-letter rings aligned at key zero. Read the outer plaintext letter against the inner ciphertext letter. |
| [36B · Shifted wheel](http://127.0.0.1:4175/talk/m6a/#/36-wheel-shifted) | Turn the inner ring three marks counterclockwise. This places a letter three places later in the alphabet next to each outer letter. Hold on A→D, B→E, C→F and X→A. |
| [36C · Aligned strips](http://127.0.0.1:4175/talk/m6a/#/36-alphabet-strips) | Realign and unroll the rings. Keep the plaintext above the ciphertext. |
| [36D · Encryption](http://127.0.0.1:4175/talk/m6a/#/36-encryption) | Shift the lower strip and step through the authored message letter by letter, keeping the spaces. Land on the full ciphertext. |
| [36E · Decryption](http://127.0.0.1:4175/talk/m6a/#/36-decryption) | Bob reads the same strip mapping bottom to top using the same key. Land on the recovered plaintext. |
| [36F · First guesses](http://127.0.0.1:4175/talk/m6a/#/36-eve-tries) | Reveal the outputs of inverse shifts 1 and 2 in order. Pause before the third trial for a verbal prediction. |
| [36G · Brute force](http://127.0.0.1:4175/talk/m6a/#/36-brute-force) | Shift 3 yields the authored plaintext. Hold Eve’s celebration, Alice’s facepalm and the keyspace count. |

## Print candidates

- **33** · The static investigation board with its records, red strings and tentative inferences.
- **34** · The final linked ledger and Alice, with the $345 clue retained in the composition.
- **35** · A chronological strip showing the first message and Eve’s first interception, then the changed message and Bob’s recovery.
- **36** · The shifted strips, encryption/decryption example and abbreviated brute-force results.

## Teaching notes and sources

- Slide 33 continues the toy ledger from slide 32 with authored board entries and tentative inferences. Slide 34 carries forward the original coffee and donut purchases and uses authored address labels and an external coffee clue. The address labels are schematic. Merchant details in the toy ledger are illustrative. State that real ledgers expose different fields and that turning records into a personal profile depends on assumptions and outside information. [Bitcoin whitepaper, §10](https://bitcoin.org/bitcoin.pdf#page=6)
- Disclose that the castle story is fictional and the 26-letter cipher examples are authored. The toy alphabet shifts by three, wraps at Z and preserves spaces. The inverse trial outputs are `OGGV CV FCYP`, `NFFU BU EBXO`, and `MEET AT DAWN`. Key zero leaves the alphabet unchanged. The remaining 25 distinct shifts are the nontrivial keyspace. The short message was chosen so the correct result is recognizable. [Suetonius, Life of Julius Caesar 56.6](https://penelope.uchicago.edu/thayer/e/roman/texts/suetonius/12caesars/julius%2A.html#56)

## Art and files

The shared M2 cast, envelope, headwear, café room, table, notebook and castle are original repo SVG. The detective props, records, board, parchment, cipher diagram and Eve are original editable SVG in the staging modules. Eve uses the shared stroke weight, facial expressions and stick-figure poses. Her rounded slate-teal hood, off-centre pointed crown and gold triangular clasp give her a stable silhouette and accessory for later review. Use the silhouette across all reactions. Local Kalam and Patrick Hand are distributed under the SIL Open Font License 1.1. [Kalam notice](../../../public/review-font-licenses/kalam.txt) · [Patrick Hand notice](../../../public/review-font-licenses/patrickhand.txt)

| File | Purpose |
| --- | --- |
| `src/talk/m6a/art.ts`, `src/talk/m6a/staging.css` | White staging canvas, shared SVG helpers and scoped styling |
| `src/talk/m6a/privacy.ts` | Café callback, evidence board and address linkage |
| `src/talk/m6a/eve.ts`, `src/talk/m6a/messenger.ts` | Eve’s reusable staging silhouette and castle story |
| `src/talk/m6a/caesar.ts`, `src/talk/m6a/stills.ts` | Fixed wheel, strips, trials and ordered still list |
| `src/talk/m6a/REVIEW.md`, `README.md` | Scope, URLs, sources and review instructions |
| `talk/m6a/index.html`, `src/talk/main.ts`, `vite.config.ts` | Staging HTML, conditional dispatch and build entry |
| `tests/m6a-staging.spec.ts` | Responsive layout, offline requests, navigation, example consistency and preserved routes |
