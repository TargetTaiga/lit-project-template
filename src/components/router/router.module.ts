import { RouterComponent } from './router.component';
import { defineReducer } from '../../store/store';
import { routerReducer } from './router.store';

customElements.define('router-outlet', RouterComponent);
defineReducer('router', routerReducer);