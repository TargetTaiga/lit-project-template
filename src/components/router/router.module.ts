import { RouterComponent } from './router.component';
import { defineReducer } from '../../store/store';
import { routerReducer } from './router.store';

customElements.define('x-router', RouterComponent);
defineReducer('router', routerReducer);