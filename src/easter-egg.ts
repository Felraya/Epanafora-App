import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@ui5/webcomponents/dist/Button.js';

@customElement('easter-egg')
export class EasterEgg extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      row-gap: 16px;
    }
    span.title {
      font-size: 32px;
      font-weight: bold;
      color: #d50a0a;
    }
  `;

  firstUpdated() {
    const audio: HTMLAudioElement = this.shadowRoot!.getElementById(
      'audio'
    )! as HTMLAudioElement;
    audio.volume = 0.05;
  }

  render() {
    return html` <span class="title">Charilor > Fika</span>
      <audio
        id="audio"
        controls
        src="https://www.cjoint.com/doc/16_09/FIsxS52QXY7_Rick-Astley---Never-Gonna-Give-You-Up.mp3"
      ></audio>`;
  }
}
