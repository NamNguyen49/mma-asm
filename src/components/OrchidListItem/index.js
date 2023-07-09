import {Image, Pressable, StyleSheet, TouchableOpacity, View} from "react-native";

import colors from "../../../config/colors";
import HeartSolid from "../../../assets/icons/solid/heart.svg";
import HeartRegular from "../../../assets/icons/regular/heart.svg";
import AppText from "../AppText";

const OrchidListItem = ({item, toggleFavourite, navigation}) => {
    return <TouchableOpacity style={styles.listItemContainer} onPress={() => navigation.navigate('OrchidDetail', {item})}>
        <Image source={{uri: item.imageUrl}}
               style={styles.image}
        />
        <View style={styles.listItemDescriptionContainer}>
            <View style={styles.listItemFavourite}>
                {!!toggleFavourite && <Pressable onPress={() => toggleFavourite(item)}>
                    {
                        item.isFavourite
                            ? <HeartSolid width={25} height={25} fill={colors.primary}/>
                            : <HeartRegular width={25} height={25} fill={colors.primary}/>
                    }
                </Pressable>}
            </View>
            <AppText style={styles.listItemName}>{item.name}</AppText>
            <AppText>{item.description}</AppText>
        </View>
    </TouchableOpacity>;
}

export default OrchidListItem;

const styles = StyleSheet.create({
    listItemContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 15,
    },
    listItemName: {
        fontSize: 17,
        paddingBottom: 5,
    },
    listItemDescriptionContainer: {
        padding: 10,
        flex: 1,
    },
    listItemViewDetailBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    listItemFavourite: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
    image: {
        height: 130,
        width: 130,
        borderRadius: 15
    }
});