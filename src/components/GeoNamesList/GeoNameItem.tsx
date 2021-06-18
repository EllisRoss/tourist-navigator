import React, {useCallback} from 'react';
import {View, Text, Button, StyleSheet, Alert, Linking, NativeSyntheticEvent, NativeTouchEvent} from 'react-native';
import {Geoname} from "../../types/types";

type PropsType = {
    geoName: Geoname
    addInProgress: Array<string>
    selectedGeoNames: Array<Geoname>,
    addGeoName: (geoName: Geoname) => void,
    deleteGeoName: (lat: number, lng: number) => void,
}

export const GeoNameItem: React.FC<PropsType> = (
    {geoName, deleteGeoName, addGeoName, addInProgress}) => {

    const onClickAddButton = (ev: NativeSyntheticEvent<NativeTouchEvent>) => {
        let newGeoName: Geoname = {...geoName};
        addGeoName(newGeoName);
    }

    const onClickDeleteButton = (ev: NativeSyntheticEvent<NativeTouchEvent>) => {
        deleteGeoName(geoName.lat, geoName.lng);
    }

    const id = String(geoName.lat) + String(geoName.lng);

    return (
        <View style={styles.item}>
            <Text style={styles.title}>
                {geoName.title}
            </Text>
            <Text style={styles.summary}>
                {geoName.summary}
            </Text>
            <View style={styles.openUrlButton}>
                <OpenURLButton url={'https://' + geoName.wikipediaUrl}>wiki</OpenURLButton>
            </View>
            {
                !addInProgress.some(el => el === id) &&
                <View style={styles.addButton}>
                    <Button color={'#363237'} title={'Add'} onPress={onClickAddButton}/>
                </View>
            }
            {
                addInProgress.some(el => el === id) &&
                <View style={styles.addButton}>
                    <Button color={'#2d4262'} title={'Delete'} onPress={onClickDeleteButton}/>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#d09683',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    summary: {
        color: 'black',
    },
    title: {
        fontSize: 32,
    },
    openUrlButton: {
        width: 100,
        padding: 10,
    },
    addButton: {
        padding: 10,
    }
});

type OpenURLButtonProps = {
    url: string
    children: string
}

const OpenURLButton: React.FC<OpenURLButtonProps> = ({url, children}) => {
    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);
    return <Button color={'#363237'} title={children} onPress={handlePress}/>;
};
