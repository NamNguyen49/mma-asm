import {Dimensions, FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppScreen from "../../components/AppScreen";
import OrchidListItem from "../../components/OrchidListItem";
import ListItemSeparator from "../../components/ListItemSeparator";
import Archive from "../../../assets/icons/regular/bars-square.svg";
import colors from "../../../config/colors";
import AppText from "../../components/AppText";
import HeartSolid from "../../../assets/icons/solid/heart.svg";
import HeartRegular from "../../../assets/icons/regular/heart.svg";

const FavouriteOrchidsScreen = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    });

    const getData = async () => {
        const jsonValue = await AsyncStorage.getItem('orchids');
        if (jsonValue) {
            setData(JSON.parse(jsonValue).filter(item => item.isFavourite));
        }
    };

    return <AppScreen>
        {!!data.length ? <FlatList
            data={data}
            renderItem={({item}) => {
                return <View style={styles.listItemContainer}>
                    <Image source={{uri: item.imageUrl}}
                           style={styles.image}
                    />
                    <View style={styles.listItemDescriptionContainer}>
                        <AppText style={styles.listItemName}>{item.name}</AppText>
                        <AppText style={{color: 'white', fontSize: 15, fontFamily: 'WorkSans-Thin'}}>{item.description}</AppText>
                    </View>
                </View>
            }}
        /> : <View style={styles.container}>
            <Archive width={50} height={50} fill={colors.medium}/>
            <AppText style={styles.text}>Không có dữ liệu</AppText>
        </View>}
    </AppScreen>;
}

export default FavouriteOrchidsScreen;


const styles = StyleSheet.create({
   container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
   },
    text: {
       color: colors.medium,
        paddingTop: 5,
    },
    listItemContainer: {
        flexDirection: 'row',
        padding: 15,
    },
    listItemName: {
        fontSize: 20,
        paddingBottom: 5,
        color: 'white'
    },
    listItemDescriptionContainer: {
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 25,
        position: 'absolute',
        bottom: 0,
        zIndex: 10,
        width: Dimensions.get('window').width,
        backgroundColor: 'rgba(158, 150, 138, 0.7)'
    },
    image: {
        height: 500,
        width: 380,
        borderRadius: 15
    }
});