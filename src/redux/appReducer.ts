import {AppStateType, InferActionTypes} from "./store";
import {ThunkAction} from "redux-thunk";
import {
    getCurrentLocationThunkCreator
} from "./mapReducer";

const INITIALIZED_SUCCESS = 'social-network/app/INITIALIZED_SUCCESS';

let initialState = {
    initialized: false
};

type ActionTypes = InferActionTypes<typeof appActions>;
type InitialStateType = typeof initialState;

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return setInitialized(state);
        default:
            return state;
    }
}

const setInitialized = (state: InitialStateType) => {
    return {
        ...state,
        initialized: true,
    }
}

export const appActions = {
    setInitialized: () => ({type: INITIALIZED_SUCCESS} as const),
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const setInitializedThunkCreator = (): ThunkType =>
    async (dispatch) => {
        await dispatch(getCurrentLocationThunkCreator());
        dispatch(appActions.setInitialized());
    }
export default appReducer;
