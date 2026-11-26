# M5g visual staging review

Run the local preview on port 4173 before opening a still link. The nine stills follow the presenter’s reading order.

| Still | What to inspect |
| --- | --- |
| [27-electricity-bill](http://127.0.0.1:4173/talk/m5g/#/27-electricity-bill) | The oversized $ 4972 bill is the main gag, with stacked server racks behind the original foreground. Bob checks his calculator, Charlie mines at a hot computer, and the surrender flag lies nearby. The fictional cameo stays in the background. |
| [28-coins](http://127.0.0.1:4173/talk/m5g/#/28-coins) | Alice, Bob and Charlie each have their own pile, with 35, 35 and 30 coins. |
| [28-bonded](http://127.0.0.1:4173/talk/m5g/#/28-bonded) | Each owner keeps a separate transparent box. Charlie looks uneasy once his stake is bonded. |
| [28-voting-power](http://127.0.0.1:4173/talk/m5g/#/28-voting-power) | The example weights are 35%, 35% and 30%. |
| [28-reveal](http://127.0.0.1:4173/talk/m5g/#/28-reveal) | The Proof of Stake name appears after the weights. |
| [29-propose](http://127.0.0.1:4173/talk/m5g/#/29-propose) | Alice sends proposal B to Bob and Charlie. Each node has its own ledger. |
| [29-prevote](http://127.0.0.1:4173/talk/m5g/#/29-prevote) | Alice and Bob independently check B and send signed prevotes to both peers. Charlie withholds. |
| [29-precommit](http://127.0.0.1:4173/talk/m5g/#/29-precommit) | Each honest node sees matching prevotes of 70% of all power, locks on B for this round and sends signed precommits. |
| [29-commit](http://127.0.0.1:4173/talk/m5g/#/29-commit) | Each honest node sees 70% in precommits, beyond the strict two-thirds threshold, and independently adds B to its ledger. |

## Intended pacing and print

- **27.** Keep the server-rack scene static. Hold for the bill gag, then ask aloud whether computation is the only resource that can make an attack costly. Print the same scene.
- **28.** Hold on the separate piles and ask the audience to predict how much voting power each person could have. In a later production pass, move the coins into each box and close its lock, then pause on the weights before revealing the name. Print the final reveal.
- **29.** Keep each ledger anchored to its validator. In a later production pass, send the proposal down the two links and pause. After independent checking, send the signed prevotes along the marked routes and let each honest node count its own and the other's vote. Pause before locking and sending the signed precommits. Pause on the 70% observation, then append B to each honest ledger. Print the final commit view with both local tallies and the threshold.

## Speaker notes and references

Disclose the authored bill and stake amounts. The lockboxes are a metaphor for protocol bonding, and this example weights the votes by bonded stake. Proposer selection and consensus are separate parts of the protocol. The vote example depicts one successful round at height 13, round 0. Silence does not remove Charlie's 30% from the denominator or count as a signed nil vote. Each honest node counts its own signature once. Progress depends on adequate network delivery, while the safety assumption is less than one-third Byzantine voting power. Actual locking rules span rounds, and timeouts or nil votes can lead to another round. [CometBFT consensus specification](https://github.com/cometbft/cometbft/blob/main/spec/consensus/consensus.md) · [CometBFT signing specification](https://github.com/cometbft/cometbft/blob/main/spec/consensus/signing.md)

## Artwork and provenance

The foreground table, cast, signature marks and gold coins reuse original repository vector artwork. The server racks are original editable SVG. The mining screen and discarded flag follow the slide 24–25 motifs. The small cameo combines the original stick body with an SVG-clipped head from “Sam Altman” by Village Global, photographed on November 17, 2022 at The Grove. Village Global published the photo under CC BY 2.0. The bundled file is Flickr’s 333 × 500 rendition, with the head cropped by the slide SVG. The “More RAM?” line is fictional satire. [Creator’s Flickr post](https://www.flickr.com/photos/villageglobal/52530764101/) · [Downloaded rendition](https://live.staticflickr.com/65535/52530764101_bd08192e30.jpg) · [Wikimedia license verification](https://commons.wikimedia.org/wiki/File:Sam_Altman_November_2022.jpg) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). Original concept image files were unavailable in the checkout, so the written approved briefs and prior checked-in art guided the compositions. [Local font sources and licenses](../../../public/review-font-licenses/SOURCES.md)
