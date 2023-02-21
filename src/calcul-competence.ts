import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import '@ui5/webcomponents/dist/Button.js';
import { txCompetence } from './data.js';

@customElement('calcul-competence')
export class CalculCompetence extends LitElement {
  static styles = css`
    :host {
    }
  `;

  @property({ type: String }) todo = 'My app';

  render() {
    return html` <div>
      <span class="label">Montant Compétence</span>
      <ui5-select id="joueurCritsArme">
        ${txCompetence.map(item => html` <ui5-option>${item}%</ui5-option> `)}
      </ui5-select>
    </div>`;
  }
}
