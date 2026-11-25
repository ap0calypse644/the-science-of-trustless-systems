import { battlefieldStills } from './battlefield';
import './staging.css';

const protocolLayout = {
  id: '08-protocol-layout',
  notes: 'Static mock of the presenter UI proposed in issue #14. Presets choose reproducible histories. Advanced setup edits are available at a clean start. The visual stage uses the common presenter clock for rounds. OM(0) has a direct-send round; OM(1) adds forwarding; OM(2) adds one recursive forwarding level. Each report records its path and identifies the immediate sender. Local views list only messages addressed to that person for the current round; Compare becomes available after the last forwarding round, or after direct delivery for OM(0). Missing messages default to Retreat once the round closes; ties default to Retreat. Distinguish configured tolerance m from actual faulty count f. Full interactive behavior follows owner approval.',
  composition: `<div class="talk-sheet byz-sheet protocol-mock">
    <h1>There's a traitor among us</h1>
    <p class="byz-subtitle">Presenter controls · Layout proposal</p>
    <div class="protocol-columns">
      <fieldset disabled class="protocol-card">
        <legend>Scenario settings</legend>
        <label>Preset
          <select><option>Faulty commander · 4 generals</option></select>
        </label>
        <div class="protocol-numbers">
          <label>Participants <input type="number" min="3" max="7" value="4"></label>
          <label>OM depth <input type="number" min="0" max="2" value="1"></label>
        </div>
        <label>Faulty participant <select><option>Mallory · Commander</option></select></label>
        <label>Fault strategy <select><option>Different orders by recipient</option></select></label>
        <p class="protocol-muted">Setup changes apply at the start of a run.</p>
      </fieldset>
      <fieldset disabled class="protocol-card">
        <legend>Round and evidence</legend>
        <div class="protocol-navigation">
          <button type="button">Previous</button><button type="button">Next round</button><button type="button">Reset</button>
        </div>
        <p class="protocol-progress">Direct order → Forwarding → Decision</p>
        <label>Local view <select><option>Alice</option></select></label>
        <label><input type="checkbox"> Compare loyal decisions</label>
        <p class="protocol-muted">Compare opens after the final message round.</p>
        <p class="byz-bound">4 generals · OM(1) · 1 actual fault · Within guarantee</p>
      </fieldset>
    </div>
    <p class="protocol-assumptions">Synchronous rounds · Known immediate sender · Detectable omissions</p>
  </div>`,
};

export const stills = [...battlefieldStills, protocolLayout];
