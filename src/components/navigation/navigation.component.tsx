import { LitElement, html } from 'lit-element';

export class NavigationComponent extends LitElement {
    render() {
        return html(
            <div>
                <a href="#/">
                    Home
                </a>
                <a href="#/about">
                    About
                </a>
            </div>
        );
    }
}