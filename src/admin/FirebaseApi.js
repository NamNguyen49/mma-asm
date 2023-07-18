
import firestore from '@react-native-firebase/firestore';

export const addDocumentToCollection = async (collectionName, data) => {
    try {
        await firestore().collection(collectionName).add(data);
        console.log('Document added successfully.');
    } catch (error) {
        console.error('Error adding document:', error);
    }
};

export const readDataFromCollection = async (collectionName) => {
    try {
        const snapshot = await firestore().collection(collectionName).get();
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return data;
    } catch (error) {
        console.error('Error reading collection:', error);
        return [];
    }
};

export const updateDocumentInCollection = async (collectionName, documentId, data) => {
    try {
        await firestore().collection(collectionName).doc(documentId).update(data);
        console.log('Document updated successfully.');
    } catch (error) {
        console.error('Error updating document:', error);
    }
};

export const deleteDocumentFromCollection = async (collectionName, documentId) => {
    try {
        await firestore().collection(collectionName).doc(documentId).delete();
        console.log('Document deleted successfully.');
    } catch (error) {
        console.error('Error deleting document:', error);
    }
};
