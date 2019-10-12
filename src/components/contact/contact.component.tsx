import { LitElement, html } from 'lit-element';

export class ContactComponent extends LitElement {
    name: string;

    static get properties() {
        return {
            name: { type: String }
        }
    }

    handleInput(event) {
        this.name = event.target.value;
    }

    render() {
        return html(
            <div>
                <h3>Hey! I'm Contact page</h3>
                Type your name:
                <input a-input={this.handleInput}/>
                <div>
                    {this.name ?
                        html(<div>We will contact you, {this.name}</div>) : ''}
                </div>
            </div>
        );
    }
}
