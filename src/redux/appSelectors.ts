import {AppStateType} from "./store";

export const selectInitialized = (state: AppStateType): boolean => {
    return state.app.initialized;
}

