import {StyleSheet} from "react-native";

import colors from "../../../config/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: colors.secondary,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 7,
        marginTop: 20,
    },
    text: {
        color: colors.light,
        fontSize: 15,
    }
});

export default styles;