import {Dimensions, Image, Pressable, StyleSheet, View} from "react-native";
import {useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../../../config/colors";
import AppText from "../../components/AppText";
import HeartSolid from "../../../assets/icons/solid/heart.svg";
import HeartRegular from "../../../assets/icons/regular/heart.svg";
import Arrow from "../../../assets/icons/regular/long-arrow-left.svg";
import {AppContext} from "../../../App";

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 4 / 3);
const imageWidth = dimensions.width;

const OrchidDetailScreen = ({route, navigation}) => {
    const {userInfo} = useContext(AppContext);
    const {item} = route.params;
    const [isFavourite, setIsFavourite] = useState(item.isFavourite);
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        syncData();
    }, [data]);

    useEffect(() => {
        if (data.length) {
            setData(data.map(o => {
                if (o.id === item.id) {
                    o.isFavourite = isFavourite;
                }
                return o;
            }));
        }
    }, [isFavourite]);

    const syncData = async () => {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('orchids', jsonValue);
    }

    const getData = async () => {
        const jsonValue = await AsyncStorage.getItem('orchids');
        if (jsonValue) {
            setData(JSON.parse(jsonValue));
        }
    };

    const toggleFavourite = () => {
        setIsFavourite(!isFavourite);
    }

    const back = () => {
        navigation.navigate('Home', {item});
    }

    return <View style={styles.container}>
        <Image source={{uri: item.imageUrl}} style={styles.image}/>
        <View style={styles.detail}>
            <Pressable style={styles.backIcon} onPress={back}>
                <Arrow width={30} height={30} fill={colors.primary}/>
            </Pressable>
            {!!userInfo && <Pressable onPress={toggleFavourite} style={styles.favouriteIcon}>
                {
                    isFavourite
                        ? <HeartSolid width={40} height={40} fill={colors.primary}/>
                        : <HeartRegular width={40} height={40} fill={colors.primary}/>
                }
            </Pressable>}
            <AppText style={styles.name}>{item.name}</AppText>
            <AppText style={styles.description}>{item.description}</AppText>
        </View>
    </View>;
}

export default OrchidDetailScreen;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    image: {
        width: imageWidth,
        height: imageHeight,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    detail: {
        padding: 15,
    },
    name: {
        fontSize: 25,
        paddingBottom: 15,
        textAlign: 'center'
    },
    favouriteIcon: {
        position: 'absolute',
        top: 10,
        right: 15,
        zIndex: 10,
    },
    description: {
        fontSize: 18,
        fontFamily: 'WorkSans-Thin',
    },
    backIcon: {
        position: 'absolute',
        top: 15,
        left: 15,
        zIndex: 10,
    }
});
