import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import '@ui5/webcomponents/dist/Button.js';

@customElement('epanafora-app')
export class EpanaforaApp extends LitElement {
  static styles = css`
    :host {
    }
    .form {
      display: flex;
      flex-direction: column;
      width: min-content;
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

        <ui5-button design="Default">Default</ui5-button>
        <ui5-button disabled>Disabled</ui5-button>
        <ui5-button design="Transparent">Cancel</ui5-button>
        <ui5-button design="Positive">Approve</ui5-button>
        <ui5-button design="Negative">Decline</ui5-button>
        <ui5-button design="Attention">Warning</ui5-button>
        <ui5-button design="Emphasized">Subscribe</ui5-button>
      </div>
    `;
  }
}
