import {ScrollView, TextInput, TouchableOpacity, View, ActivityIndicator} from "react-native";
import auth from '@react-native-firebase/auth';
import Toast from "react-native-toast-message";
import {Formik} from "formik";
import * as Yup from "yup";

import {createProfile, getProfileByEmail} from "../../clients/profile";
import {FirebaseErrorCode} from "../../constants/firebase-error-code";
import AppText from "../../components/AppText";
import colors from "../../../config/colors";
import styles from "./styles";
import {useState} from "react";

const validationSchema = Yup.object({
    email: Yup.string().email('Email không hợp lệ').required('Trường này là bắt buộc'),
    password: Yup.string().required('Trường này là bắt buộc'),
    repeatPassword: Yup.string().required('Trường này là bắt buộc'),
    firstName: Yup.string().required('Trường này là bắt buộc'),
    lastName: Yup.string().required('Trường này là bắt buộc'),
});

const SignUpScreen = ({navigation}) => {
    const [model, setModel] = useState({email: '', password: '', repeatPassword: '', firstName: '', lastName: ''});

    const createAccountWithEmailAndPassword = (values, {setSubmitting}) => {
        const {email, password, lastName, firstName, repeatPassword} = values;

        if (repeatPassword !== password) {
            return Toast.show({
                type: 'error',
                text1: 'Nhắc lại mật khẩu không trùng khớp',
            });
        }

        let isError;

        setSubmitting(true);
        auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                return createProfile({email, lastName, firstName, provider: "email"});
            })
            .catch((error) => {
                isError = true;
                if (error.code === FirebaseErrorCode.EMAIL_EXIST) {
                    Toast.show({
                        type: 'error',
                        text1: 'Email này đã được sử dụng',
                    });
                } else {
                    console.log(error);
                    Toast.show({
                        type: 'error',
                        text1: 'Hệ thống đang gặp lỗi',
                    });
                }

                setSubmitting(false);
            });

        setTimeout(() => {
            if (!isError) {
                getProfileByEmail(email).then((res) => {
                    if (res) {
                        Toast.show({
                            type: 'success',
                            text1: 'Đăng ký tài khoản thành công',
                        });
                        navigation.navigate('Login');
                    } else {
                        Toast.show({
                            type: 'error',
                            text1: 'Tạo tài khoản không thành công',
                        });
                    }
                }).catch(e => {
                    console.log(e);
                    Toast.show({
                        type: 'error',
                        text1: 'Hệ thống đang gặp lỗi',
                    });
                }).finally(() => {
                    setSubmitting(false);
                });
            }
        }, 1500);
    }

    return <ScrollView style={styles.container}>
        <View style={styles.emptyView}></View>
        <View style={styles.loginContainer}>
            <AppText style={styles.loginText}>Đăng ký</AppText>
            <AppText style={styles.greetingText}>Cùng "rinh" lan về vườn với</AppText>
            <AppText style={styles.brandName}>Orchid Garden</AppText>
            <Formik
                initialValues={model}
                validationSchema={validationSchema}
                onSubmit={createAccountWithEmailAndPassword}
            >
                {({
                      handleChange,
                      handleBlur,
                      handleSubmit, values,
                      errors,
                      touched,
                      isValid,
                      isSubmitting,
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
                        <TextInput
                            style={styles.textInput}
                            onChangeText={handleChange('repeatPassword')}
                            onBlur={handleBlur('repeatPassword')}
                            value={values.repeatPassword}
                            placeholder="Nhập lại mật khẩu"
                            secureTextEntry
                        />
                        {errors.repeatPassword && touched.repeatPassword && <AppText style={styles.textInputError}>{errors.repeatPassword}</AppText>}
                        <TextInput
                            style={styles.textInput}
                            onChangeText={handleChange('lastName')}
                            onBlur={handleBlur('lastName')}
                            value={values.lastName}
                            placeholder="Họ"
                        />
                        {errors.lastName && touched.lastName && <AppText style={styles.textInputError}>{errors.lastName}</AppText>}
                        <TextInput
                            style={styles.textInput}
                            onChangeText={handleChange('firstName')}
                            onBlur={handleBlur('firstName')}
                            value={values.firstName}
                            placeholder="Tên"
                        />
                        {errors.firstName && touched.firstName && <AppText style={styles.textInputError}>{errors.firstName}</AppText>}
                        <TouchableOpacity style={styles.loginBtn} onPress={() => {
                            if (isValid) {
                                handleSubmit();
                            }
                        }} disabled={isSubmitting}>
                            {isSubmitting ? <ActivityIndicator/> : <AppText style={styles.loginBtnText}>Tạo tài khoản</AppText>}
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <AppText style={{color: colors.medium, paddingTop: 15, fontSize: 14}}>
                    Đã có tài khoản?
                </AppText>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <AppText style={{color: colors.primary, fontSize: 14}}> Đăng nhập</AppText>
                </TouchableOpacity>
            </View>
        </View>
    </ScrollView>;
}

export default SignUpScreen;
