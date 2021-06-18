import React, {useEffect} from 'react';
import {Map} from './src/components/Map';
import {Provider, useDispatch, useSelector} from "react-redux";
import store from "./src/redux/store";
import {selectInitialized} from './src/redux/appSelectors';
import {setInitializedThunkCreator} from "./src/redux/appReducer";
import {Preloader} from "./src/components/common/Preloader/Preloader";
import {selectCurrentLocation, selectShowGeoNamesList, selectShowMap} from "./src/redux/mapSelectors";
import {GeoNamesList} from "./src/components/GeoNamesList/GeoNamesList";

const App = () => {
    const initialised = useSelector(selectInitialized);
    const currentLocation = useSelector(selectCurrentLocation);
    const showMap = useSelector(selectShowMap);
    const showGeoNamesList = useSelector(selectShowGeoNamesList);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setInitializedThunkCreator());
    }, []);
    if (!initialised) {
        return <Preloader/>
    }
    return (
        <>
            {
                showMap && currentLocation &&
                <>
                    <Map/>
                </>
            }
            {
                showGeoNamesList && <GeoNamesList/>
            }
        </>
    );
};

const TouristNavigator = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
}
export default TouristNavigator;
