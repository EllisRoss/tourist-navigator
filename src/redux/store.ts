import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import mapReducer from "./mapReducer";
import appReducer from "./appReducer";

let rootReducer = combineReducers({
    mapPage: mapReducer,
    app: appReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export type InferActionTypes<T> = T extends {
        [key: string]: (...args: any[]) => infer U;
    }
    ? U
    : never;

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
