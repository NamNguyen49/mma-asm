import {getDocs, query, where, collection, doc, setDoc, serverTimestamp, getDoc} from "firebase/firestore";
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

export const createProfile = async (params) => {
    await profileCollection.doc(profileCollection.doc().id).set({
        ...params,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
}

export const updateProfile = async (id, params) => {
    await profileCollection.doc(id).set({
        ...omit(params, ['id']),
        updatedAt: serverTimestamp(),
    });
}

export const getProfileById = async (id) => {
    const docRef = doc(profileCollection, id);
    const docSnap = await getDoc(docRef);

    return {
        ...docSnap.data(),
        id: docSnap.id,
    };
}
