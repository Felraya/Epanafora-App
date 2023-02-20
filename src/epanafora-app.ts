import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './calcul-combat.js';
import './calcul-competence.js';
import './easter-egg.js';
import '@ui5/webcomponents/dist/Button.js';
import '@ui5/webcomponents/dist/TabContainer.js';
import '@ui5/webcomponents/dist/Tab.js';

@customElement('epanafora-app')
export class EpanaforaApp extends LitElement {
  static styles = css`
    :host {
    }
    ui5-tabcontainer {
      --_ui5_tc_headeritem_text_font_weight: bold;
      height: 100vh;
      --sapFontSize: 16px;
    }
    ui5-tabcontainer::part(content) {
      background-image: url('https://cdna.artstation.com/p/assets/images/images/001/206/348/4k/david-edwards-kenden-001.jpg?1442195813');
      background-repeat: no-repeat;
      background-size: cover;
      height: 100%;
      --_ui5_tc_content_border_bottom: 0;
    }
  `;

  @state() PASSCODE: string = 'epanafora';

  @state() current: number = 0;

  firstUpdated() {
    this.easterEggOpen = this.easterEggOpen.bind(this);
    window.addEventListener('keydown', this.easterEggOpen);
  }

  // eslint-disable-next-line class-methods-use-this
  easterEggOpen(event: KeyboardEvent) {
    const char = event.key;
    if (char === this.PASSCODE.charAt(this.current)) {
      this.current += 1;
      if (this.current >= this.PASSCODE.length) {
        this.current = 0;
        // open ester egg page
        const easterTab: any = this.shadowRoot!.getElementById('easterEgg');
        const allTabs: any = this.shadowRoot!.querySelectorAll('ui5-tab');
        allTabs.forEach((tab: { selected: boolean }) => {
          // eslint-disable-next-line no-param-reassign
          tab.selected = false;
        });
        easterTab.selected = true;
      }
    } else {
      this.current = 0;
    }
  }

  render() {
    return html`
      <ui5-tabcontainer class="full-width" fixed="true">
        <ui5-tab text="Combat">
          <calcul-combat></calcul-combat>
        </ui5-tab>
        <ui5-tab text="Compétence">
          <calcul-competence></calcul-competence>
        </ui5-tab>
        <ui5-tab disabled id="easterEgg" text="Easter egg">
          <easter-egg></easter-egg>
        </ui5-tab>
      </ui5-tabcontainer>
    `;
  }
}
