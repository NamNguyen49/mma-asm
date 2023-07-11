import {View} from "react-native";
import auth from '@react-native-firebase/auth';
import Toast from "react-native-toast-message";

import {createProfile} from "../../clients/profile";
import {FirebaseErrorCode} from "../../constants/firebase-error-code";

const SignUpScreen = ({navigation}) => {
    const createAccountWithEmailAndPassword = (values, {setSubmitting}) => {
        const {email, password, lastName, firstName} = values;

        setSubmitting(true);
        auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return createProfile({email, lastName, firstName, provider: "email"});
            })
            .then(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Đăng ký tài khoản thành công',
                });
                navigation.navigate('Login');
            })
            .catch((error) => {
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
            })
            .finally(() => {
                setSubmitting(false);
            });
    }

    return <View></View>;
}

export default SignUpScreen;
