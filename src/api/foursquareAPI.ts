import axios from "axios";

const client_id = 'IMRD33PRL2DIXEP4HTNYSK014DYEHZ13AIYFC5EBOEYZCHB1';
const client_secret = 'H0KPI0LXECE0KDJ2QPT5BJA5T0Q5JEQYF3VKVLPHAIHXNJPL';

const instance = axios.create({
    baseURL: 'https://api.foursquare.com/v2/venues/',
});

export const foursquareAPI = {
    getVenues(coords: string, radius: number) {
        const coordsArray = coords.split(',');
        const convertCoords = `${coordsArray[1]},${coordsArray[0]}`;
        const categoryId = '4deefb944765f83613cdba6e';
        const date = '20210525';

        return instance.get(`search?client_id=${client_id}&client_secret=${client_secret}
        &categoryId=${categoryId}&v=${date}&ll=${convertCoords}&radius=${radius}&limit=50`)
            .then(response => response.data);
    },
}
