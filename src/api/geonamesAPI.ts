import axios from "axios";

const instance = axios.create({
    baseURL: 'http://api.geonames.org/findNearbyWikipediaJSON?username=noumager&lang=ru&feature=landmark',
});
export const geoNamesAPI = {
    getWikiArticle(title: string, lat: number, lng: number) {
        return instance.get(`title=${title}&lat=${lat}&lng=${lng}`)
            .then(response => response.data);
    },
}
