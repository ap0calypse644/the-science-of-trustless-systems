import { svgText } from '../../illustration/svg';
import './staging.css';

export function sheet(subtitle: string, body: string): string {
  return `<div class="talk-sheet byz-sheet">
    <h1>There's a traitor among us</h1>
    <p class="byz-subtitle">${svgText(subtitle)}</p>
    ${body}
  </div>`;
}
