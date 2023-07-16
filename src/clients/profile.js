import {omit} from "lodash";
import firestore from '@react-native-firebase/firestore';

const profileCollection = firestore().collection('profiles');

export const getProfileByEmail = async (email) => {
    const querySnapshot = await profileCollection.where("email", "==", email).get();

    if (!querySnapshot.size) {
        return null;
    }

    const doc = querySnapshot.docs[0];
    return {
        id: doc.id,
        ...doc.data(),
    };
}

export const createProfile = (params) => {
    return profileCollection.add({
        ...params,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
    });
}

export const updateProfile = async (id, params) => {
    await profileCollection.doc(id).update({
        ...omit(params, ['id']),
        updatedAt: firestore.FieldValue.serverTimestamp(),
    });
}

// export const getProfileById = async (id) => {
//     const docRef = doc(profileCollection, id);
//     const docSnap = await getDoc(docRef);
//
//     return {
//         ...docSnap.data(),
//         id: docSnap.id,
//     };
// }
