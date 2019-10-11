import { installRouter } from 'pwa-helpers';
import { store } from '../store/store';

export const ACTION_NAVIGATION = 'ACTION_NAVIGATION';

export const startNavigation = () => installRouter((location, event) => {
    store.dispatch({ type: ACTION_NAVIGATION, payload: { location, event } });
});