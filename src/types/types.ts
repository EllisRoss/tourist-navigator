export type CurrentCoordinates = {
    accuracy: number,
    altitude: number,
    heading: number,
    latitude: number,
    longitude: number,
    speed: number,
}
export type VenueCategories = {
    id: string;
    name: string;
    pluralName: string;
    shortName: string;
    icon: {
        prefix: string;
        suffix: string;
    },
    primary: boolean;
}
export type Venue =  {
    id: string;
    name: string;
    location: {
        lat: number;
        lng: number;
        labeledLatLngs: [
            {
                label: string;
                lat: number;
                lng: number;
            }
        ],
        postalCode: string;
        cc: string;
        city: string;
        state: string;
        country: string;
        formattedAddress: Array<string>;
    },
    categories: Array<VenueCategories>;
    referralId: string;
    hasPerk: boolean;
};
export type Geoname = {
    summary: string;
    elevation: number;
    geoNameId: number;
    lng: number;
    distance: string;
    thumbnailImg: string;
    title: string;
    wikipediaUrl: string;
    feature: string;
    countryCode: string;
    rank: number;
    lang: string;
    lat: number;
};
