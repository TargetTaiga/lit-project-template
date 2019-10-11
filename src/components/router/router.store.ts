import { ACTION_NAVIGATION } from '../../utils/navigation';

export function routerReducer(state = {}, action) {
    switch (action.type) {
        case ACTION_NAVIGATION: {
            return {
                ...state,
                hash: action.payload.location.hash,
            }
        }
        default:
            return state;
    }
}