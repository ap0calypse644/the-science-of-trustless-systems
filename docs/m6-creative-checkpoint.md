# M6 creative checkpoint - 28 November 2026

Owner-approved concepts: slides 33–48 only. Part I (1–32) is locked at e1f49f5e13d844a3ebc5b8da70f4a3b22c2a02aa. Owner rejected proposed slide 49 (Shamir finite-field walkthrough) and explicitly ended the MPC section at slide 48. No dedicated field theory, modular arithmetic, Shamir reconstruction or further MPC slide. Future FHE, ZKP and combined-application acts remain provisional; resume creative planning at 49 only after this production tranche, not during it. No fixed final slide count. This document supersedes all conflicting prior Part II numbering and concepts. The owner authorized starting production of the designed slides through separate visual staging and motion review gates, not blanket approval of finished work.

## Common rules

Original editable HTML/CSS/SVG, M2 expressive minimalism D, white #FFFFFF, established Alice/Bob/Charlie; introduce Eve as eavesdropper with recognizable consistent silhouette, no Mallory scene on 43. Existing local fonts and palette. The concept sketches were rough references, not source assets or technical verification. Static or presenter-paced deterministic scripted animation; no live input, branching, runtime cryptography, web dependencies. Use notes for caveats, disclosures, sources and verbal prediction prompts; essential toy-model limits on-screen. Preserve playback, seeking, reset, notes, print compositions, diagnostic and earlier staging routes. Stage editable stills and review in installed Firefox before motion; then production draft PR, owner motion approval and ChatGPT technical review before merge. Codex reports local tests, screenshot paths and limitations in issues/PRs, not pasted transcripts. No unauthorized later batch. No change to Part I or M8 pending rights/rehearsal.

## Act I - The cost of transparency

### 33 - Nothing to Hide? (static)

Keep the evidence board composition from M6a, with Charlie in his detective hat holding the magnifier. “Alice’s records” lists the five authored times and amounts. Red strings connect them to the tentative inferences under “Charlie’s theory”. Keep “A routine inferred from records and context” beneath the board. The board is the only hold and the print composition candidate. In notes, disclose the authored example and distinguish public records from outside context and inferred patterns. Ledger fields vary, and public metadata does not automatically identify a person or disclose their location. Ask aloud what happens if we remove names. The owner approved this scope for restaging in [PR #33](https://github.com/ap0calypse644/the-science-of-trustless-systems/pull/33#issuecomment-7243192279).

### 34 - What's in a Name? (animated; 4 holds)
A: replace names in illustrative ledger with addresses; Alice pleased. B: Charlie highlights reused 0x7F3A… records (coffee $345, transport $12, salary $3000); other entries include Bob's $2 donuts and unrelated address. C: known distinctive coffee purchase from 32 supplies external clue linking address to Alice; D: red strings link highlighted rows to Alice, facepalm, Charlie smiles; “Pseudonymity ≠ Anonymity.” Notes: assumes reuse and sufficiently distinguishing external information; linking an address is not always identifying a person. No separate four-property vocabulary slide (owner deleted it). Transition to hiding message contents. Print final linked-record diagram.

## Act II - Evolution of cryptography

### 35 - A Long Time Ago... (animated; 4 holds)
Return to medieval castles/messenger setting (not a literal historical reenactment of Caesar). A: Alice writes MEET AT DAWN; Charlie carries it to Bob. B: Eve sneaks out from bush while Charlie distracted, copies/reads message and returns it unnoticed; Bob receives original. C: second attempt with transformed PHHW DW GDZQ. D: Eve intercepts and is confused; Bob deciphers and smiles. Heading reveal The Caesar Cipher; ask aloud how it worked. No alphabet mechanics until 36. Print story sequence.

### 36 - The Caesar Cipher (animated; wheel → strips → brute force)
A: full 26-letter cipher wheel initially aligned, inner mapping rotates to +3 (A→D, B→E, C→F), Key = 3. B: transition to aligned alphabet strips, progressively encode MEET AT DAWN → PHHW DW GDZQ; Bob reverses using same key; label plaintext, ciphertext, encryption, decryption. C: Eve tries nonzero inverse shifts 1,2,3 in order; outputs OGGV CV FCYP, NFFU BU EBXO, MEET AT DAWN; success on third. Reveal 25 nontrivial keys (26 including identity), brute force/keyspace. Alice horrified. Verbal transition to arbitrary rearrangement. Correct wraparound; preserve spaces. No runtime wheel controls. Print strips and result.

### 37 - A Better Secret (animated)
A: opening aligned strips from 36, Alice rearranges lower alphabet; exact plaintext ABCDEFGHIJKLMNOPQRSTUVWXYZ maps positionally to QWERTYUIOPASDFGHJKLZXCVBNM. Show accurate mapping (A→Q, B→W, C→E); if animating flying letters, their paths must terminate at correct destination. B: 26×25×…×1, 26! = 403,291,461,126,605,635,584,000,000 possible permutations including identity; compare 25 nontrivial Caesar shifts. C: Alice celebrates “Try brute-forcing that!”; Eve surrounded by discarded attempts, “You've got to be kidding me.” No frequency-analysis reveal yet. Print mapping and keyspace.

### 38 - Patterns Never Lie (animated)
A: Eve picks up intercepted ciphertext from discarded attempts, magnifier, notices repeated letters. B: library research, pile of books, counts letters in normal English. C: compare ordinary-English frequency profile (clearly illustrative or sourced) with actual ciphertext counts from 39; notice pattern, lightbulb, smile. No decoding yet; ask if most common symbol might be E. Verbal brief historical mention Al-Kindi, verify attribution; no claim frequency rank is guaranteed. Print comparison.

### 39 - Frequency Analysis (animated; A–E)
Use the exact 37 mapping for this verified fixed classroom message:
```
THE SECRET MESSAGE IS HIDDEN IN THE LETTER.
MEET ME AT THE EAST GATE AFTER THE SUN SETS.
TAKE THE LETTER TO THE GUARD AT THE GATE.
TELL THE GUARD TO KEEP THE LETTER SAFE.
THEN RETURN TO THE CASTLE BEFORE THE NEXT SUNRISE.
```
Ciphertext:
```
ZIT LTEKTZ DTLLQUT OL IORRTF OF ZIT STZZTK.
DTTZ DT QZ ZIT TQLZ UQZT QYZTK ZIT LXF LTZL.
ZQAT ZIT STZZTK ZG ZIT UXQKR QZ ZIT UQZT.
ZTSS ZIT UXQKR ZG ATTH ZIT STZZTK LQYT.
ZITF KTZXKF ZG ZIT EQLZST WTYGKT ZIT FTBZ LXFKOLT.
```
173 letters, 44 words. Counts T42 Z35 I13 L12 Q12 K11 F7 S6 U5 X5 O4 R4 G4 D3 Y3 E2 A2 H1 W1 B1; C J M N P V zero. A: intercepted message. B: highlight occurrences, count and grow bars; educated guesses T→E, Z→T. C: ZIT becomes T_E; infer I→H from THE, other word patterns progressively fill mapping, pause for verbal prediction. D: reveal full plaintext, Eve “Who needs brute force?”, Alice facepalm. E: same counts under renamed symbols (E42 T35 H13 S12 A12 R11), different letters, same patterns. Never claim guaranteed decoding; authored message chosen to work. Display a few meaningful deductions, ensure all labels, counts and actual revealed letters match. Print readable abbreviated example and frequency comparison.

### 40 - What If the Cipher Keeps Changing? (animated; A–D)
A: lift five E occurrences from plaintext, all become T under previous substitution. B: rotating illustrative mechanism gives varying outputs T X K R B, explicitly not actual Enigma ciphertext; Eve's fixed mapping fails. C: stylized historical transition: wheel becomes metal, extra wheels/wiring/gears, keyboard and casing assemble, Alice medieval costume becomes radio operator; visual metaphor, not claim of direct historical lineage. D: Enigma reveal, original editable hand-drawn machine; brief historical narration includes Polish cryptanalysts and Bletchley Park; not inventor of polyalphabetic ciphers or unbreakable. Zoom to rotor windows for 41. Print before/after or machine.

### 41 - The Enigma Machine (animated; A–E)
A: same machine, lid lifts, identify keyboard, lampboard, rotors, show plugboard. Keypress steps right rotor before signal. B: simplified cutaway traces A through right-to-left three wired rotors, reflector, return through inverse rotor order, B lamp. Include identity plugboard (no cables), signal in/out consistent; simplified contact diagram must not contradict actual path. C: repeated A presses, initial AAA, rotor order I II III (left to right), reflector B, ring settings AAA, no plugboard connections. Expected windows AAB AAC AAD AAE AAF, output B D Z G O. Verify precomputed reference against historical rotor wirings and documented independent example; do not claim live crypto. D: Alice sends BDZGO, Bob resets to identical initial configuration and types ciphertext to recover AAAAA; Eve confused. E: show matching rotor selection/order, initial positions, rings and plugboard settings. Do not digress into turnover/double-stepping or keyspace; notes explain simplification. 26 lamps and keys if detailed machine shown; no duplicate letters. Ask how settings can be shared securely. Print signal path and sequence.

### 42 - The Key Distribution Problem (animated; A–D)
A: modern encryption machines, Alice key, Bob lacks it; encrypted message can't be read. B: Alice sends key insecurely; Eve copies it, Bob decrypts, Eve casually reads conversation with coffee. C: encrypt Key 1 with Key 2; Bob asks for Key 2; recursive Key 3,4… D: Alice buried under key mountain (callback to 24), Bob waiting, Eve relaxed. Toy short key label explicitly illustrative. Notes: symmetric crypto protects after secure shared secret is established; pre-existing trusted channel/in-person setup possible; recursion merely shifts problem. No Diffie-Hellman mathematics. Print recursion and pile.

### 43 - Two Keys Are Better Than One (animated; A–D ONLY)
A: Bob gives Alice open snap-lock padlock but keeps unlocking key. B: distributes identical open padlocks to Alice, Charlie, Eve; public key/private key labels. C: MEET AT DAWN in box; Alice closes Bob's lock, Charlie carries, Eve intercepts and tries to open with another padlock (fails), Bob opens with private key. D: transform to diagram plaintext → ciphertext → plaintext, encrypt with Bob's public key, decrypt with Bob's private key; no pre-shared secret required. Owner explicitly removed E (Mallory/key substitution scene); no fifth checkpoint or third-party attack subplot. Notes may briefly qualify authenticity of public key, distinguish encryption/signatures and mention hybrid encryption verbally; don't imply encrypting with private key is signing. Print flow.

### 44 - From Caesar to Cyberspace (static)
Owner preferred timeline C over modern application grid/toolbox. Panoramic continuous white landscape, four eras with reusable props and recurring figures in era-appropriate clothing: castle/parchment/wheel; shuffled alphabets and frequency charts; Enigma and rotors; modern computers/phones/public/private keys/signatures. No visible panel borders, dates, algorithm inventories or dense paragraphs. Labels Caesar / Substitution / Enigma / Modern cryptography; optional short descriptions. Selected teaching concepts, not exhaustive chronology. Verbal transition “secure communication is only the beginning.” Print same.

## Act III - Computing together

### 45 - How Much Do You Earn? (animated; A→B)
A café meeting; Bob proposes average salary. Audience-visible private thought bubbles: Alice 4000, Bob 5000, Charlie 3000 (same currency/unit throughout). Refuse to share individually; trusted accountant receives all three privately and announces average 4000. They realize accountant knows every salary; Alice asks “Can we calculate the average without anyone knowing our individual salaries?” No solution or terminology yet. Notes: aggregate may leak info. Print problem and intermediary.

### 46 - Splitting a Secret (animated; A–F)
A: Alice splits 4000 into 1250,2400,350. B: Bob 5000→3100,1100,800; Charlie 3000→600,1700,700. Origin colors blue/green/purple, each row recipient order Alice,Bob,Charlie. C: six cards privately travel to other recipients; each keeps own card and receives one per other owner; pause for verbal prediction. D: local sums Alice 1250+3100+600=4950, Bob 2400+1100+1700=5200, Charlie 350+800+700=1850. E: announce only sums, total 12000, average 4000. F: regroup colored shares by origin to illustrate commutativity/associativity; 4000+5000+3000; “Same numbers. Different grouping.” Essential visible caveat: toy positive-number splitting illustrates the idea, not a secure privacy guarantee. Notes: positive shares leak bounds; secure implementations require appropriately randomized shares and private channels; output/collusion/dishonesty can leak information. No field theory or modular arithmetic lesson. Name secure multiparty computation verbally as the goal illustrated, without extra dedicated slide; not a full secure protocol. Print exchange matrix and totals.

### 47 - Secret Sharing (animated; option C)
A: treasure chest with three independently required padlocks, each character holds a distinct key. B: Alice/Bob unlock theirs, Charlie on vacation on beach in sunglasses, “Life is good”; Charlie's lock stays shut, chest cannot open; Alice “Where on earth is Charlie?!” C: compare all 3-of-3 required vs desired any 2-of-3; no single participant sufficient. Introduce threshold secret sharing. Physical access policy is analogy only, not cryptographic construction. Print chest/holiday and threshold contrast. Transition to polynomial intuition.

### 48 - How Many Points Determine a Curve? (animated; exact owner sequence)
No characters, no narrative props, pure whiteboard mathematical composition. Start with one bold true cubic drawn across graph. Select one point; draw about eight dotted distinct cubics through ALL selected points (one). Clear dotted curves; add second point; draw about six distinct dotted cubics through BOTH points. Clear dotted curves; add third point; draw about four distinct dotted cubics through ALL THREE points. Clear dotted curves; add fourth point; no alternatives, unique polynomial of degree at most 3. Add three further points on same main curve (7 total); delete two previously existing points (5 remain), still enough for unique reconstruction. Preserve bold curve throughout. Use distinct x-coordinates, choose smooth well-scaled cubic and alternatives whose exact polynomial evaluations pass through all known points. For m≤3, alternatives can be constructed by adding a nonzero multiple of product(x−x_i) times polynomial of degree ≤3−m; ensure nonzero cubic coefficient and visibly distinct alternatives. Fixed authored paths, no runtime interaction. Captions minimal: 1/2/3 known points many possibilities; 4 uniquely determine; 5 remain above threshold. Final general rule: degree at most d determined by d+1 points with distinct x. Explain threshold intuition verbally, not claim real-number geometry provides cryptographic secrecy; no field theory, no Shamir-specific slide, no extra characters, no forced transition into a deleted slide. Print clear multi-stage summary. 

## Implementation tranche and gates

M6a 33–36 (privacy bridge + Caesar); M6b 37–41 (substitution/frequency/Enigma); M6c 42–44 (key distribution/public-key/history recap); M6d 45–48 (MPC intuition/threshold). Stage each batch separately, owner approves stills before production motion, owner approves rendered result plus technical review before merge, next batch separately authorized. First issue covers M6a staging only. Keep future acts unimplemented. Remaining parts can be renumbered when creative review resumes.

