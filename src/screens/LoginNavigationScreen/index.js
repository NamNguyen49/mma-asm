import {TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

import styles from "./styles";
import colors from "../../../config/colors";
import AppText from "../../components/AppText";
import Plug from '../../../assets/icons/solid/plug.svg';


const LoginNavigationScreen = () => {
    const navigation = useNavigation();

    return <View style={styles.container}>
        <Plug width={70} height={70} fill={colors.medium}/>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
            <AppText style={styles.text}>Đăng nhập để tiếp tục</AppText>
        </TouchableOpacity>
    </View>;
}

export default LoginNavigationScreen;