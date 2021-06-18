import axios from "axios";
export const mapBoxApiToken = 'pk.eyJ1Ijoibm91bWFnZXIiLCJhIjoiY2twMDUxeW5yMHFxeTJwbnhxYmw0cnhueSJ9.GoXxsffFwBuMH2fcEBDJ-g';
export const mapBoxAPI = {
    getAddress(query: string) {
        return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}
            .json?access_token=${mapBoxApiToken}`)
            .then(response => response.data);
    },

    getDirections(coordinates: string) {
        return axios.get(`https://api.mapbox.com/directions/v5/mapbox/walking/${coordinates}
            ?alternatives=true&geometries=geojson&access_token=${mapBoxApiToken}`)
            .then(response => response.data);
    },
}
