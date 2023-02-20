import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import '@ui5/webcomponents/dist/Button.js';

@customElement('calcul-competence')
export class CalculCompetence extends LitElement {
  static styles = css`
    :host {
    }
  `;

  @property({ type: String }) todo = 'My app';

  render() {
    return html` TODO`;
  }
}
