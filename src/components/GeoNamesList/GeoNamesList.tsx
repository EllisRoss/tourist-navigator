import React, {useState} from 'react';
import {
    View,
    Button,
    FlatList,
    ListRenderItem,
    SafeAreaView,
    StyleSheet,
    StatusBar
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {selectGeoNames} from "../../redux/mapSelectors";
import {GeoNameItem} from "./GeoNameItem";
import {Geoname} from "../../types/types";
import {getDirectionsThroughVenuesThunkCreator, mapActions} from "../../redux/mapReducer";


export const GeoNamesList: React.FC = () => {

    const geoNames = useSelector(selectGeoNames);
    const dispatch = useDispatch();
    const [selectedGeoNames, setSelectedGeoNames] = useState([] as Array<Geoname>);
    const [addInProgress, setAddInProgress] = useState([] as Array<string>);

    const toggleAddProgress = (toggleVal: boolean, id: string) => {
        const newArr = toggleVal
            ? [...addInProgress, id] : addInProgress.filter(el => el !== id)
        setAddInProgress(newArr);
    }

    const addGeoName = (geoName: Geoname) => {
        let compare = (element: Geoname) => {
            const elementId = String(element.lat) + String(element.lng);
            const geoNameId = String(geoName.lat) + String(geoName.lng);
            return elementId === geoNameId;
        }
        if (!selectedGeoNames.some(compare)) {
            const geoNameId = String(geoName.lat) + String(geoName.lng);
            toggleAddProgress(true, geoNameId);
            setSelectedGeoNames([...selectedGeoNames, geoName]);
        }
    }
    const deleteGeoName = (lat: number, lng: number) => {
        if (selectedGeoNames.length > 0) {
            const filteredGeoNames = selectedGeoNames.filter(geoName => {
                const id = String(lat) + String(lng);
                const geoNameId = String(geoName.lat) + String(geoName.lng);
                return id !== geoNameId;
            })
            const id = String(lat) + String(lng);
            toggleAddProgress(false, id);
            setSelectedGeoNames(filteredGeoNames);
        }
    }

    const onSubmit = () => {
        dispatch(mapActions.setSelectedGeoNames(selectedGeoNames));
        dispatch(getDirectionsThroughVenuesThunkCreator())
    }
    const renderItem: ListRenderItem<Geoname> = ({item}) => (
        <GeoNameItem geoName={item}
                     selectedGeoNames={selectedGeoNames}
                     addGeoName={addGeoName}
                     deleteGeoName={deleteGeoName}
                     addInProgress={addInProgress}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.submitButton}>
                <Button color={'#d09683'} title={'Submit'} onPress={onSubmit}/>
            </View>
            <FlatList data={geoNames}
                      renderItem={renderItem}
                      keyExtractor={item => String(Math.random() * item.lat)}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    submitButton: {
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
});
