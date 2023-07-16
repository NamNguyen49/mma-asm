import {ScrollView, TextInput, TouchableOpacity, View, ActivityIndicator} from "react-native";
import {Formik} from "formik";
import {useContext, useEffect, useState} from "react";
import * as Yup from "yup";
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from '@react-native-firebase/auth';

import AppText from "../../components/AppText";
import User from "../../../assets/icons/solid/user.svg";
import colors from "../../../config/colors";
import styles from "../LoginScreen/styles";
import {AppContext} from "../../../App";
import {getProfileByEmail, updateProfile} from "../../clients/profile";

const validationSchema = Yup.object({
    firstName: Yup.string().required('Trường này là bắt buộc'),
    lastName: Yup.string().required('Trường này là bắt buộc'),
    phone: Yup.string().test('Digits only', 'Số điện thoại không hợp lệ', (value) => /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)),
});

const ProfileScreen = ({contextChanges, navigation}) => {
    const {userInfo} = useContext(AppContext);
    const [model, setModel] = useState(null);
    const [open, setOpen] = useState(false);
    const [gender, setGender] = useState(null);
    const [genderList, setGenderList] = useState([
        {label: 'Nam', value: 'male'},
        {label: 'Nữ', value: 'female'},
        {label: 'Khác', value: 'other'}
    ]);

    useEffect(() => {
        setModel(userInfo ?? null);
        setGender(userInfo?.gender);
    }, [userInfo]);

    const onUpdateProfile = async (values, {setSubmitting}) => {
        setSubmitting(true);
        updateProfile(model.id, {...values, gender})
            .catch((error) => {
                console.log(error);
                Toast.show({
                    type: 'error',
                    text1: 'Cập nhật thông tin thất bại',
                });
            });

        setTimeout(() => {
            getProfileByEmail(model.email).then(async (updatedProfile) => {
                if (updatedProfile) {
                    Toast.show({
                        type: 'success',
                        text1: 'Cập nhật thông tin thành công',
                    });
                    await AsyncStorage.setItem('userInfo', JSON.stringify(updatedProfile));
                    contextChanges();
                }
            }).finally(() => setSubmitting(false));
        }, 300);
    }

    const logout = () => {
        auth().signOut().then(async () => {
            Toast.show({
                type: 'success',
                text1: 'Đăng xuất thành công',
            });
            await AsyncStorage.clear()
            contextChanges();
            navigation.navigate('Home');
        }).catch((error) => {
            console.log(error);
            Toast.show({
                type: 'error',
                text1: 'Hệ thống đang gặp lỗi',
            });
        });
    }

    return <ScrollView style={{paddingVertical: 30, paddingHorizontal: 15}}>
        <View style={{alignItems: 'center', paddingBottom: 30}}>
            <View style={{
                borderWidth: 5,
                borderColor: colors.secondary,
                width: 120,
                height: 120,
                borderRadius: 60,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <User width={70} height={70} fill={colors.secondary}/>
            </View>
        </View>
        {!!model && <Formik
            initialValues={model}
            validationSchema={validationSchema}
            onSubmit={onUpdateProfile}
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
                        onChangeText={handleChange('firstName')}
                        onBlur={handleBlur('firstName')}
                        value={values.firstName}
                        placeholder="Tên"
                    />
                    {errors.firstName && touched.firstName &&
                        <AppText style={styles.textInputError}>{errors.firstName}</AppText>}
                    <TextInput
                        style={styles.textInput}
                        onChangeText={handleChange('lastName')}
                        onBlur={handleBlur('lastName')}
                        value={values.lastName}
                        placeholder="Họ"
                    />
                    {errors.lastName && touched.lastName &&
                        <AppText style={styles.textInputError}>{errors.lastName}</AppText>}
                    <TextInput
                        style={styles.textInput}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        placeholder="Email"
                        editable={false}
                    />
                    {errors.email && touched.email &&
                        <AppText style={styles.textInputError}>{errors.email}</AppText>}
                    <DropDownPicker
                        open={open}
                        value={gender}
                        items={genderList}
                        setOpen={setOpen}
                        setValue={setGender}
                        setItems={setGenderList}
                        style={styles.textInput}
                        textStyle={{fontFamily: 'WorkSans-Regular', color: colors.secondary}}
                        placeholder="Chọn giới tính"
                        zIndex={10}
                    />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        value={values.phone}
                        placeholder="Số điện thoại"
                    />
                    {errors.phone && touched.phone &&
                        <AppText style={styles.textInputError}>{errors.phone}</AppText>}
                    <TextInput
                        style={styles.textInput}
                        onChangeText={handleChange('address')}
                        onBlur={handleBlur('address')}
                        value={values.address}
                        placeholder="Địa chỉ"
                    />
                    {errors.address && touched.address &&
                        <AppText style={styles.textInputError}>{errors.address}</AppText>}
                    <TouchableOpacity style={styles.loginBtn} onPress={() => {
                        if (isValid) {
                            handleSubmit();
                        }
                    }} disabled={isSubmitting}>
                        {isSubmitting ? <ActivityIndicator/> : <AppText style={styles.loginBtnText}>Lưu</AppText>}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.loginBtn, {backgroundColor: colors.secondary}]} onPress={logout}>
                        <AppText style={styles.loginBtnText}>Đăng xuất</AppText>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>}
    </ScrollView>;
}

export default ProfileScreen;
