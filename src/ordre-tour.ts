import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import '@ui5/webcomponents/dist/Button.js';

@customElement('ordre-tour')
export class OrdreTour extends LitElement {
  static styles = css`
    :host {
    }
  `;

  @property({ type: String }) header = 'My app';

  render() {
    return html` TODO`;
  }
}
