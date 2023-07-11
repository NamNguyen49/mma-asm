import {Image, TextInput, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {Formik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import {useRoute} from "@react-navigation/native";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppText from "../../components/AppText";
import styles from "./styles";
import colors from "../../../config/colors";
import {createProfile, getProfileByEmail} from "../../clients/profile";
import {FirebaseErrorCode} from "../../constants/firebase-error-code";

const validationSchema = Yup.object({
    email: Yup.string().email('Email không hợp lệ').required('Trường này là bắt buộc'),
    password: Yup.string().required('Trường này là bắt buộc'),
});

const LoginScreen = ({contextChanges, navigation}) => {
    const route = useRoute();
    const [model, setModel] = useState({email: '', password: ''});

    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            const { idToken, user } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);

            const {email, familyName, givenName} = user;
            const userProfile = await getProfileByEmail(email);

            if (!userProfile) {
                await createProfile({email, lastName: familyName, firstName: givenName, provider: "google"});
                await handleUserProfile(email, idToken);
                return;
            }

            if (userProfile.provider !== "google") {
                Toast.show({
                   type: 'error',
                   text1: 'Email này đã được sử dụng',
                });
                const user = auth().currentUser;
                await user.delete();
                return;
            }

            Toast.show({
                type: 'success',
                text1: 'Đăng nhập thành công',
            });

            await AsyncStorage.setItem("accessToken", idToken);
            await AsyncStorage.setItem("userInfo", JSON.stringify(userProfile));
            contextChanges();

            navigation.navigate(route.params.returnUrl ?? 'Home');
        } catch (error) {
            console.log(error)
        }
    }

    const loginWithEmailAndPassword = async (values, {setSubmitting}) => {
        const {email, password} = values;

        setSubmitting(true);
        const user = await auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => userCredential.user)
            .catch((error) => {
                let errorMessage;
                switch (error.code) {
                    case FirebaseErrorCode.USER_NOT_FOUND:
                        errorMessage = 'Tài khoản không tồn tại';
                        break;
                    case FirebaseErrorCode.INVALID_PASSWORD:
                        errorMessage = 'Email hoặc mật khẩu không hợp lệ';
                        break;
                    default:
                        console.log(error);
                        errorMessage = 'Hệ thống đang gặp lỗi';
                }

                Toast.show({
                    type: 'error',
                    text1: errorMessage,
                });
            })
            .finally(() => {
                setSubmitting(false);
            });

        if (user) {
            await handleUserProfile(email, user.accessToken);
        }
    }

    const handleUserProfile = async (email, accessToken) => {
        const userProfile = await getProfileByEmail(email);
        if (!userProfile) {
            Toast.show({
                type: 'error',
                text1: 'Đăng nhập thất bại',
            });
        }

        Toast.show({
            type: 'success',
            text1: 'Đăng nhập thành công',
        });

        await AsyncStorage.setItem("accessToken", idToken);
        await AsyncStorage.setItem("userInfo", JSON.stringify(userProfile));
        contextChanges();

        navigation.navigate(route.params.returnUrl ?? 'Home');
    }

    return <View style={styles.container}>
        <View style={styles.emptyView}></View>
        <View style={styles.loginContainer}>
            <AppText style={styles.loginText}>Đăng nhập</AppText>
            <AppText style={styles.greetingText}>Chào mừng bạn đã đến với</AppText>
            <AppText style={styles.brandName}>Orchid Garden</AppText>
            <Formik
                initialValues={model}
                validationSchema={validationSchema}
                onSubmit={loginWithEmailAndPassword}
            >
                {({
                      handleChange,
                      handleBlur,
                      handleSubmit, values,
                      errors,
                      touched,
                      isValid,
                  }) => (
                    <View>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            placeholder="Email"
                        />
                        {errors.email && touched.email &&
                            <AppText style={styles.textInputError}>{errors.email}</AppText>}
                        <TextInput
                            style={styles.textInput}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            placeholder="Mật khẩu"
                            secureTextEntry
                        />
                        {errors.password && touched.password && <AppText style={styles.textInputError}>{errors.password}</AppText>}
                        <TouchableOpacity style={styles.loginBtn} onPress={() => {
                            if (isValid) {
                                handleSubmit();
                            }
                        }}>
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
            <AppText
                style={{color: colors.medium, textAlign: 'center', paddingTop: 30, paddingBottom: 15, fontSize: 14}}>Hoặc
                đăng nhập với</AppText>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 25}} onPress={signInWithGoogle}>
                    <Image source={require('../../../assets/images/google-icon.png')} style={{height: 50, width: 50}}/>
                </TouchableOpacity>
            </View>
        </View>
    </View>;
}

export default LoginScreen;
