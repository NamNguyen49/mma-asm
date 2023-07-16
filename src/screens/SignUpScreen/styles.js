import {StyleSheet} from "react-native";
import colors from "../../../config/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greetingText: {
        fontSize: 25,
        paddingTop: 10,
        fontFamily: 'WorkSans-SemiBold'
    },
    brandName: {
        color: colors.primary,
        fontSize: 25,
        fontFamily: 'WorkSans-Bold',
        marginBottom: 20,
    },
    emptyView: {
        height: 200,
        backgroundColor: colors.primary,
    },
    loginContainer: {
        marginTop: -50,
        backgroundColor: colors.light,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        flex: 1,
        padding: 15,
        paddingTop: 30,
    },
    loginText: {
        fontSize: 15,
        color: colors.primary,
        textTransform: 'uppercase',
    },
    textInput: {
        borderColor: colors.secondary,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 7,
        fontFamily: 'WorkSans-Regular',
        marginTop: 10,
        backgroundColor: 'white',
        color: colors.secondary,
    },
    textInputError: {
        color: colors.danger,
    },
    loginForm: {
        paddingTop: 20,
    },
    loginBtn: {
        borderRadius: 7,
        backgroundColor: colors.primary,
        padding: 10,
        marginTop: 15,
        paddingVertical: 12,
    },
    loginBtnText: {
        color: colors.light,
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 15,
    }
});

export default styles;