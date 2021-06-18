import {AppStateType} from "./store";
import {CurrentCoordinates, Geoname} from "../types/types";

export const selectCurrentLocation = (state: AppStateType): CurrentCoordinates | null => {
    return state.mapPage.currentLocation;
}
export const selectCurrentAddress = (state: AppStateType): string => {
    return state.mapPage.currentAddress;
}
export const selectShowRoute = (state: AppStateType): boolean => {
    return state.mapPage.showRoute;
}
export const selectGeoDirection = (state: AppStateType): GeoJSON.LineString | null => {
    return state.mapPage.geoDirection;
}
export const selectGeoNames = (state: AppStateType): Array<Geoname> => {
    return state.mapPage.geoNames;
}
export const selectShowMap = (state: AppStateType): boolean => {
    return state.mapPage.showMap;
}
export const selectShowGeoNamesList = (state: AppStateType): boolean => {
    return state.mapPage.showGeoNamesList;
}
export const selectDirectionDistance = (state: AppStateType): number => {
    return state.mapPage.directionDistance;
}
export const selectDirectionDuration = (state: AppStateType): number => {
    return state.mapPage.directionDuration;
}
export const selectOriginCoordinates = (state: AppStateType): string => {
    return state.mapPage.originCoordinates;
}
export const selectDestinationCoordinates = (state: AppStateType): string => {
    return state.mapPage.destinationCoordinates;
}
export const selectSelectedGeoNames = (state: AppStateType): Array<Geoname> => {
    return state.mapPage.selectedGeoNames;
}

