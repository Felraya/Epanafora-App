import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('epanafora-calculateur')
export class EpanaforaCalculateur extends LitElement {
  static styles = css`
    :host {
    }
    .form {
      display: flex;
      flex-direction: column;
      width: fit-content;
    }
  `;

  @property({ type: String }) header = 'My app';

  render() {
    return html`
      <div class="form">
        <span>Physique (dés) - combobox</span>
        <span>Sans pouvoir / Arme / Pouvoir / Arme + Pouvoir - select</span>
        <span>Tier du sort - select</span>
        <span>Np de l'arme</span>
        <span>Saisir votre physique</span>
        <button>Valider</button>
      </div>
    `;
  }
}
