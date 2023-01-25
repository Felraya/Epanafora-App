import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import './calcul-combat.js';
import './ordre-tour.js';
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
      --sapFontSize: 16px;
    }
    ui5-tabcontainer::part(content) {
      background-color: white;
      height: 100%;
      --_ui5_tc_content_border_bottom: 0;
    }
  `;

  @property({ type: String }) header = 'My app';

  render() {
    return html`
      <ui5-tabcontainer class="full-width" fixed="true">
        <ui5-tab text="Combat">
          <calcul-combat></calcul-combat>
        </ui5-tab>
        <ui5-tab text="Tirage ordre tour"> <ordre-tour></ordre-tour> </ui5-tab>
      </ui5-tabcontainer>
    `;
  }
}
