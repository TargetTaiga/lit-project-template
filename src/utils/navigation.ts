import { installRouter } from 'pwa-helpers';
import { store } from '../store/store';

export const ACTION_NAVIGATION = 'ACTION_NAVIGATION';

export const startNavigation = () => installRouter((location: Location, event: Event) => {
    if (!location.hash) {
        window.history.pushState({}, '', '#/');
    }
    store.dispatch({ type: ACTION_NAVIGATION, payload: { location, event } });
});