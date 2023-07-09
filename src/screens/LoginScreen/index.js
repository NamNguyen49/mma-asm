import {Image, Pressable, TextInput, TouchableOpacity, View} from "react-native";
import {Formik} from 'formik';
import * as Yup from 'yup';

import AppText from "../../components/AppText";
import styles from "./styles";
import colors from "../../../config/colors";

const validationSchema = Yup.object({
    username: Yup.string().required('Trường này là bắt buộc'),
    password: Yup.string().required('Trường này là bắt buộc'),
});

const LoginScreen = () => {
    const handleFormSubmit = (values) => {
        console.log(values);
    };

    return <View style={styles.container}>
        <View style={styles.emptyView}></View>
        <View style={styles.loginContainer}>
            <AppText style={styles.loginText}>Đăng nhập</AppText>
            <AppText style={styles.greetingText}>Chào mừng bạn đã đến với</AppText>
            <AppText style={styles.brandName}>Orchid Garden</AppText>
            <Formik
                initialValues={{username: '', password: ''}}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
            >
                {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                    <View>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                            placeholder="Tên đăng nhập"
                        />
                        {errors.username && touched.username && <AppText style={styles.textInputError}>{errors.username}</AppText>}
                        <TextInput
                            style={styles.textInput}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            placeholder="Mật khẩu"
                            secureTextEntry
                        />
                        {errors.password && touched.password && <AppText style={styles.textInputError}>{errors.password}</AppText>}
                        <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
                            <AppText style={styles.loginBtnText}>Đăng nhập</AppText>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <AppText style={{color: colors.medium, paddingTop: 15, fontSize: 14}}>
                    Bạn chưa có tài khoản?
                </AppText>
                <TouchableOpacity>
                    <AppText style={{color: colors.primary, fontSize: 14}}> Đăng ký</AppText>
                </TouchableOpacity>
            </View>
            <AppText style={{color: colors.medium, textAlign: 'center', paddingTop: 30, paddingBottom: 15, fontSize: 14}}>Hoặc</AppText>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 25}}>
                    <Image source={require('../../../assets/images/google-icon.png')} style={{height: 50, width: 50}}/>
                </TouchableOpacity>
            </View>
        </View>
    </View>;
}

export default LoginScreen;