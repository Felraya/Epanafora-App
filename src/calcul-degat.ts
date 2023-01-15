import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import '@ui5/webcomponents/dist/Button.js';
import '@ui5/webcomponents/dist/Input.js';
import '@ui5/webcomponents/dist/ComboBox.js';
import '@ui5/webcomponents/dist/Select.js';
import '@ui5/webcomponents/dist/Title.js';
// import { Dice } from './Dice.js';
import { diceListe, degatArme, txCritArme } from './data.js';

@customElement('calcul-degat')
export class CalculDegat extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      row-gap: 64px;
    }
    .body {
      display: flex;
      justify-content: space-between;
    }
    .player,
    .ennemi {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 20px;
    }
    .form {
      display: grid;
      align-items: center;
      grid-template-columns: min-content min-content;
      grid-gap: 8px 16px;
    }
    .valid {
      display: flex;
      flex-direction: column;
      row-gap: 8px;
      justify-content: center;
      align-items: center;
    }
    .result {
      display: flex;
      flex-direction: column;
      row-gap: 8px;
      justify-content: center;
    }
  `;

  @property({ type: String }) header = 'My app';

  isArme(): boolean {
    console.log('is arme');
    const typeSelect: any = this.shadowRoot?.querySelector('#typeSelect');
    if (!typeSelect) {
      return true;
    }
    const type = (typeSelect.selectedOption as any).innerHTML;
    if (type === 'Arme' || type === 'Symbiose') {
      return false;
    }
    return true;
  }

  isPouvoir() {
    const typeSelect: any = this.shadowRoot?.querySelector('#typeSelect');
    if (!typeSelect) {
      return true;
    }
    const type = (typeSelect.selectedOption as any).innerHTML;
    if (type === 'Pouvoir' || type === 'Symbiose') {
      return false;
    }
    return true;
  }

  render() {
    return html`
      <div class="body">
        <div class="player">
          <ui5-title level="H2">Joueur</ui5-title>
          <div class="form">
            <ui5-label>Dé Physique</ui5-label>
            <ui5-combobox placeholder="2D4">
              ${diceListe.map(
                item => html` <ui5-cb-item text=${item.dice}></ui5-cb-item> `
              )}
            </ui5-combobox>

            <ui5-label>Dé Instinct</ui5-label>
            <ui5-combobox placeholder="2D4">
              ${diceListe.map(
                item => html` <ui5-cb-item text=${item.dice}></ui5-cb-item> `
              )}
            </ui5-combobox>

            <ui5-label>Dé Energie</ui5-label>
            <ui5-combobox placeholder="2D4">
              ${diceListe.map(
                item => html` <ui5-cb-item text=${item.dice}></ui5-cb-item> `
              )}
            </ui5-combobox>
            <ui5-label>Type d'attaque</ui5-label>
            <ui5-select id="typeSelect" @change=${() => this.requestUpdate()}>
              <ui5-option>Sans arme</ui5-option>
              <ui5-option>Arme</ui5-option>
              <ui5-option>Pouvoir</ui5-option>
              <ui5-option>Symbiose</ui5-option>
            </ui5-select>

            <ui5-label>Tier du sort</ui5-label>
            <ui5-select ?disabled=${this.isPouvoir()}>
              <ui5-option icon="iphone">Phone</ui5-option>
              <ui5-option icon="ipad">Tablet</ui5-option>
              <ui5-option icon="laptop" selected>Desktop</ui5-option>
            </ui5-select>

            <ui5-label>Degats de l'arme</ui5-label>
            <ui5-select ?disabled=${this.isArme()}>
              ${degatArme.map(
                item => html` <ui5-option>${item}%</ui5-option> `
              )}
            </ui5-select>

            <ui5-label>Taux critique arme</ui5-label>
            <ui5-select ?disabled=${this.isArme()}>
              ${txCritArme.map(
                item => html` <ui5-option>${item}%</ui5-option> `
              )}
            </ui5-select>
          </div>
        </div>

        <div class="ennemi">
          <ui5-title level="H2">Ennemi</ui5-title>
          <div class="form">
            <ui5-label>Dé Physique</ui5-label>
            <ui5-combobox placeholder="2D4">
              ${diceListe.map(
                item => html` <ui5-cb-item text=${item.dice}></ui5-cb-item> `
              )}
            </ui5-combobox>

            <ui5-label>Dé Instinct</ui5-label>
            <ui5-combobox placeholder="2D4">
              ${diceListe.map(
                item => html` <ui5-cb-item text=${item.dice}></ui5-cb-item> `
              )}
            </ui5-combobox>
          </div>
        </div>
      </div>

      <div class="body">
        <div class="form"></div>
        <ui5-button>toto</ui5-button>
      </div>
    `;
  }
}
