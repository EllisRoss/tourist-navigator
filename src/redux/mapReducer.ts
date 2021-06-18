import {CurrentCoordinates, Geoname, Venue} from "../types/types";
import {AppStateType, InferActionTypes} from "./store";
import {ThunkAction} from "redux-thunk";
import {mapBoxAPI} from "../api/mapAPI";
import {AddressFormValues} from "../components/AddressForm";
import Geolocation, {GeolocationResponse} from "@react-native-community/geolocation";
import {foursquareAPI} from "../api/foursquareAPI";
import {geoNamesAPI} from "../api/geonamesAPI";
import * as turf from "@turf/turf";

const SET_CURRENT_LOCATION = 'touristNavigator/mapReducer/SET_CURRENT_LOCATION';
const SET_CURRENT_ADDRESS = 'touristNavigator/mapReducer/SET_CURRENT_ADDRESS';
const SET_ORIGIN_COORDINATES = 'touristNavigator/mapReducer/SET_ORIGIN_COORDINATES';
const SET_DESTINATION_COORDINATES = 'touristNavigator/mapReducer/SET_DESTINATION_COORDINATES';
const TOGGLE_SHOW_ROUTE = 'touristNavigator/mapReducer/TOGGLE_SHOW_ROUTE';
const SET_GEO_DIRECTION = 'touristNavigator/mapReducer/SET_GEO_DIRECTION';
const SET_DIRECTION_DISTANCE = 'touristNavigator/mapReducer/SET_DIRECTION_DISTANCE';
const SET_DIRECTION_DURATION = 'touristNavigator/mapReducer/SET_DIRECTION_DURATION';
const SET_GEO_NAMES = 'touristNavigator/mapReducer/SET_GEO_NAMES';
const TOGGLE_SHOW_GEO_NAMES_LIST = 'touristNavigator/mapReducer/TOGGLE_SHOW_GEO_NAMES_LIST';
const TOGGLE_SHOW_MAP = 'touristNavigator/mapReducer/TOGGLE_SHOW_MAP';
const SET_SELECTED_GEO_NAMES = 'touristNavigator/mapReducer/SET_SELECTED_GEO_NAMES';

let initialState = {
    currentLocation: null as null | CurrentCoordinates,
    currentAddress: '',
    originCoordinates: '',
    destinationCoordinates: '',
    geoDirection: null as null | GeoJSON.LineString,
    rawGeoData: null as null | GeoJSON.LineString,
    directionDuration: 0,
    directionDistance: 0,
    showRoute: false,
    showGeoNamesList: false,
    showMap: true,
    selectedGeoNames: [] as Array<Geoname>,
    geoNames: [] as Array<Geoname>,
};

type ActionTypes = InferActionTypes<typeof mapActions>;
type InitialStateType = typeof initialState;

const mapReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_CURRENT_LOCATION:
            return setCurrentLocation(state, action.location);
        case SET_GEO_NAMES:
            return setGeoNames(state, action.geoNames);
        case SET_SELECTED_GEO_NAMES:
            return setSelectedGeoNames(state, action.geoNames);
        case SET_CURRENT_ADDRESS:
            return setCurrentAddress(state, action.address);
        case SET_ORIGIN_COORDINATES:
            return setOriginCoordinates(state, action.coordinates);
        case SET_DESTINATION_COORDINATES:
            return setDestinationCoordinates(state, action.coordinates);
        case SET_GEO_DIRECTION:
            return setGeoDirection(state, action.geoData);
        case TOGGLE_SHOW_ROUTE:
            return toggleShowRoute(state, action.toggleVal);
        case SET_DIRECTION_DISTANCE:
            return setDirectionDistance(state, action.distance);
        case SET_DIRECTION_DURATION:
            return setDirectionDuration(state, action.duration);

        case TOGGLE_SHOW_GEO_NAMES_LIST:
            return toggleShowGeoNamesList(state, action.toggleVal);
        case TOGGLE_SHOW_MAP:
            return toggleShowMap(state, action.toggleVal);
        default:
            return state;
    }
}

const setSelectedGeoNames = (state: InitialStateType, geoNames: Array<Geoname>) => {
    return {
        ...state,
        selectedGeoNames: [...geoNames],
    }
}
const setGeoNames = (state: InitialStateType, geoNames: Array<Geoname>) => {
    return {
        ...state,
        geoNames: [...geoNames],
    }
}
const setDirectionDistance = (state: InitialStateType, distance: number) => {
    return {
        ...state,
        directionDistance: distance,
    }
}
const setDirectionDuration = (state: InitialStateType, duration: number) => {
    return {
        ...state,
        directionDuration: duration,
    }
}
const setDestinationCoordinates = (state: InitialStateType, coordinates: string) => {
    return {
        ...state,
        destinationCoordinates: coordinates,
    }
}
const setOriginCoordinates = (state: InitialStateType, coordinates: string) => {
    return {
        ...state,
        originCoordinates: coordinates,
    }
}
const setCurrentAddress = (state: InitialStateType, address: string) => {
    return {
        ...state,
        currentAddress: address,
    }
}
const setCurrentLocation = (state: InitialStateType, location: CurrentCoordinates) => {
    return {
        ...state,
        currentLocation: location,
    }
}
const setGeoDirection = (state: InitialStateType, geoData: GeoJSON.LineString) => {
    return {
        ...state,
        geoDirection: geoData,
    }
}
const toggleShowRoute = (state: InitialStateType, toggleVal: boolean) => {
    return {
        ...state,
        showRoute: toggleVal,
    }
}
const toggleShowMap = (state: InitialStateType, toggleVal: boolean) => {
    return {
        ...state,
        showMap: toggleVal,
        showGeoNamesList: !toggleVal,
    }
}
const toggleShowGeoNamesList = (state: InitialStateType, toggleVal: boolean) => {
    return {
        ...state,
        showGeoNamesList: toggleVal,
        showMap: !toggleVal,
    }
}

export const mapActions = {
    setCurrentLocation: (location: CurrentCoordinates) => ({type: SET_CURRENT_LOCATION, location} as const),
    setCurrentAddress: (address: string) => ({type: SET_CURRENT_ADDRESS, address} as const),
    setOriginCoordinates: (coordinates: string) => ({type: SET_ORIGIN_COORDINATES, coordinates} as const),
    setDestinationCoordinates: (coordinates: string) => ({type: SET_DESTINATION_COORDINATES, coordinates} as const),
    setDirectionDistance: (distance: number) => ({type: SET_DIRECTION_DISTANCE, distance} as const),
    setDirectionDuration: (duration: number) => ({type: SET_DIRECTION_DURATION, duration} as const),
    setGeoDirection: (geoData: GeoJSON.LineString) => ({type: SET_GEO_DIRECTION, geoData} as const),
    toggleShowRoute: (toggleVal: boolean) => ({type: TOGGLE_SHOW_ROUTE, toggleVal} as const),
    setGeoNames: (geoNames: Array<Geoname>) => ({type: SET_GEO_NAMES, geoNames} as const),
    toggleShowMap: (toggleVal: boolean) => ({type: TOGGLE_SHOW_MAP, toggleVal} as const),
    toggleShowGeoNamesList: (toggleVal: boolean) => ({type: TOGGLE_SHOW_GEO_NAMES_LIST, toggleVal} as const),
    setSelectedGeoNames: (geoNames: Array<Geoname>) => ({type: SET_SELECTED_GEO_NAMES, geoNames} as const),
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const getCurrentLocationThunkCreator = (): ThunkType =>
    async (dispatch) => {
        Geolocation.getCurrentPosition((info: GeolocationResponse) => {
            console.log('Geolocation work');
            dispatch(mapActions.setCurrentLocation(info.coords as CurrentCoordinates));
            let coords = info.coords.longitude + ',' + info.coords.latitude;
            dispatch(getCurrentAddressThunkCreator(coords));
        });
        Geolocation.stopObserving();
    }
export const getCurrentAddressThunkCreator = (coords: string): ThunkType =>
    async (dispatch) => {
        console.log('getCurrentAddressThunkCreator/currentLocation = ', coords)

        let payload = await mapBoxAPI.getAddress(coords);
        dispatch(mapActions.setCurrentAddress(payload.features[0].place_name));
        console.log('getCurrentAddressThunkCreator/currentAddress = ', payload.features[0].place_name)
    }
export const getOriginAddressThunkCreator = (query: string): ThunkType =>
    async (dispatch) => {
        let payload = await mapBoxAPI.getAddress(query);
        const coordinates = `${payload.features[0].center[0]},${payload.features[0].center[1]}`;
        dispatch(mapActions.setOriginCoordinates(coordinates));
    }
export const getDestinationAddressThunkCreator = (query: string): ThunkType =>
    async (dispatch) => {
        let payload = await mapBoxAPI.getAddress(query);
        const coordinates = `${payload.features[0].center[0]},${payload.features[0].center[1]}`;
        dispatch(mapActions.setDestinationCoordinates(coordinates));
    }

export const searchUsefullVenuesThunkCreator = (originCoordinates: string, destinationCoordinates: string,
                                                radius: number): ThunkType =>
    async (dispatch) => {
        let payloadOriginVenues = await foursquareAPI.getVenues(originCoordinates, radius);
        let payloadDestinationVenues = await foursquareAPI.getVenues(destinationCoordinates, radius);

        if (payloadOriginVenues.meta.code === 200
            && payloadOriginVenues.meta.code === 200) {
            const originVenues = [...payloadOriginVenues.response.venues];
            const destinationVenues = [...payloadDestinationVenues.response.venues];

            let sameVenues = getSameVenues(originVenues, destinationVenues);
            let geoNames: Array<Geoname> = [];

            await Promise.all(sameVenues.map(async (venue, index) => {
                let wikiArticle = await geoNamesAPI.getWikiArticle(venue.name, venue.location.lat, venue.location.lng)
                if (wikiArticle.geonames?.length > 0) {
                    geoNames = [...geoNames, ...wikiArticle.geonames];
                }
            }));

            dispatch(mapActions.setGeoNames(geoNames));
        }
    }

export const getDirectionsThunkCreator = (formValues: AddressFormValues): ThunkType =>
    async (dispatch, getState) => {
        dispatch(mapActions.toggleShowRoute(false));
        await dispatch(getOriginAddressThunkCreator(formValues.origin))
        await dispatch(getDestinationAddressThunkCreator(formValues.destination));

        const originCoordinates = getState().mapPage.originCoordinates;
        const destinationCoordinates = getState().mapPage.destinationCoordinates;

        const query = `${originCoordinates};${destinationCoordinates}`

        let payload = await mapBoxAPI.getDirections(query);
        if (payload.code === "Ok") {
            const duration: number = payload.routes[0].duration;
            const distance: number = payload.routes[0].distance;


            const radius: number = getRadius(originCoordinates, destinationCoordinates);

            console.log('distance: ', distance);
            console.log('radius: ', radius);

            dispatch(mapActions.setDirectionDistance(distance));
            dispatch(mapActions.setDirectionDuration(duration));
            await dispatch(searchUsefullVenuesThunkCreator(originCoordinates, destinationCoordinates, radius));
            dispatch(mapActions.toggleShowGeoNamesList(true));
        }
    }

export const getDirectionsThroughVenuesThunkCreator = (): ThunkType =>
    async (dispatch, getState) => {
        dispatch(mapActions.toggleShowRoute(false));

        let origin = getState().mapPage.originCoordinates;
        let destinationCoordinates = getState().mapPage.destinationCoordinates;
        let selectedGeoNames = getState().mapPage.selectedGeoNames;

        let selectedGeoNamesCoordsString = origin + ';';

        for (const geoName of selectedGeoNames) {
            let lng = geoName.lng;
            let lat = geoName.lat;
            let coords = lng + ',' + lat + ';';
            selectedGeoNamesCoordsString += coords;
        }

        selectedGeoNamesCoordsString = selectedGeoNamesCoordsString + destinationCoordinates;

        let payload = await mapBoxAPI.getDirections(selectedGeoNamesCoordsString);

        if (payload.code === "Ok") {
            const newGeoData: GeoJSON.LineString = {
                type: "LineString",
                coordinates: [...payload.routes[0].geometry.coordinates],
            }

            const duration: number = payload.routes[0].duration;
            const distance: number = payload.routes[0].distance;

            dispatch(mapActions.setDirectionDistance(distance));
            dispatch(mapActions.setDirectionDuration(duration));

            dispatch(mapActions.setGeoDirection(newGeoData))
            dispatch(mapActions.toggleShowMap(true));
            dispatch(mapActions.toggleShowRoute(true));
        }
    }

const getSameVenues = (venues1: Array<Venue>, venues2: Array<Venue>): Array<Venue> => {
    const newVenues: Array<Venue> = [];
    if (venues1.length > 0 && venues2.length > 0) {
        for (let i = 0; i < venues1.length; i++) {
            for (let j = 0; j < venues2.length; j++) {
                if (venues1[i].location.lng === venues2[j].location.lng
                    && venues1[i].location.lat === venues2[j].location.lat) {
                    newVenues.push(venues1[i]);
                }
            }
        }
    }
    return newVenues;
}

const getRadius = (fromCoordinates: string, toCoordinates: string): number => {
    const fromArray = fromCoordinates.split(',');
    const toArray = toCoordinates.split(',');

    const from = turf.point([Number(fromArray[0])
        , Number(fromArray[1])]);
    const to = turf.point([Number(toArray[0])
        , Number(toArray[1])]);

    const distance: number = turf.distance(from, to) * 1000;

    return Number(distance.toFixed(2));
}
export default mapReducer;
