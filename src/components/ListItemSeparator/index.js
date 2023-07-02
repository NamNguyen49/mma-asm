import {View, StyleSheet} from "react-native";

const ListItemSeparator = (props) => {
    return <View style={styles.separator} />;
}

export default ListItemSeparator;

const styles = StyleSheet.create({
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#e1e1e1',
    },
});