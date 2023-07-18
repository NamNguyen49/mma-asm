
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, Pressable, TextInput, ScrollView } from 'react-native';
import { addDocumentToCollection, readDataFromCollection, updateDocumentInCollection, deleteDocumentFromCollection } from './FirebaseApi';
import colors from '../../config/colors';
import HeartSolid from '../../assets/icons/solid/heart.svg';
import HeartRegular from '../../assets/icons/regular/heart.svg';
import AppText from '../components/AppText';
import Modal from 'react-native-modal';
import ConfirmationPopup from './components/ConfirmationPopup'; // Import component ConfirmationPopup

const HomeAdmin = () => {



    const [orchids, setOrchids] = useState([]);
    const [isAddingNewOrchid, setIsAddingNewOrchid] = useState(false);
    const [isEditingOrchid, setIsEditingOrchid] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newOrchidData, setNewOrchidData] = useState({
        name: '',
        imageUrl: '',
        description: '',
        quantity: '',
    });




    const [editedOrchidData, setEditedOrchidData] = useState({
        id: '',
        name: '',
        imageUrl: '',
        description: '',
        quantity: '',
    });

    const handleAddNewOrchid = () => {
        setIsAddingNewOrchid(true);
        setIsEditingOrchid(false);
        setIsModalVisible(true);
        setNewOrchidData({ name: '', imageUrl: '', description: '', quantity: '' });
        setEditedOrchidData({ id: '', name: '', imageUrl: '', description: '', quantity: '' });
    };


    const handleSaveNewOrchid = () => {
        addNewOrchid(newOrchidData);
        setIsAddingNewOrchid(false);
        setIsModalVisible(false);
        setNewOrchidData({ name: '', imageUrl: '', description: '', quantity: '' });
    };

    const handleEditOrchid = (orchid) => {
        setEditedOrchidData({
            id: orchid.id,
            name: orchid.name,
            imageUrl: orchid.imageUrl,
            description: orchid.description,
            quantity: orchid.quantity,
        });
        setIsAddingNewOrchid(false);
        setIsEditingOrchid(true);
        setIsModalVisible(true);
    };


    const handleSaveEditedOrchid = () => {
        updateOrchid(editedOrchidData.id, {
            name: editedOrchidData.name,
            imageUrl: editedOrchidData.imageUrl,
            description: editedOrchidData.description,
            quantity: editedOrchidData.quantity,

        });
        setIsEditingOrchid(false);

        setIsModalVisible(false);
        setEditedOrchidData({ id: '', name: '', imageUrl: '', description: '', quantity: '' });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await readDataFromCollection('orchids');
            setOrchids(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const addNewOrchid = () => {
        const newOrchid = {
            name: newOrchidData.name,
            imageUrl: newOrchidData.imageUrl,

            description: newOrchidData.description,
            quantity: newOrchidData.quantity,
        };
        addDocumentToCollection('orchids', newOrchid);
        fetchData();
    };

    const updateOrchid = (documentId, data) => {
        updateDocumentInCollection('orchids', documentId, data);
        fetchData();
    };

    // const deleteOrchid = (documentId) => {
    //     deleteDocumentFromCollection('orchids', documentId);
    //     fetchData();

    // };
    const [showConfirmation, setShowConfirmation] = useState(false);
    const handleConfirmDelete = (documentId) => {
        deleteDocumentFromCollection('orchids', documentId);
        fetchData();
        setShowConfirmation(false); // Đóng popup sau khi xác nhận delete
    };

    const deleteOrchid = (documentId) => {
        // Hiển thị popup xác nhận khi người dùng nhấn delete
        setShowConfirmation(true);
        // Xử lý delete khi người dùng xác nhận trong popup
        handleConfirmDelete(documentId); // Pass documentId to handleConfirmDelete
    };


    const renderOrchidItem = ({ item }) => (
        <View style={styles.listItemContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.listItemDescriptionContainer}>
                <View style={styles.listItemFavourite}>
                    <Pressable onPress={() => updateOrchid(item.id, { isFavourite: !item.isFavourite })}>
                        {item.isFavourite ? (
                            <HeartSolid width={25} height={25} fill={colors.primary} />
                        ) : (
                            <HeartRegular width={25} height={25} fill={colors.primary} />
                        )}
                    </Pressable>
                </View>
                <AppText style={styles.listItemName}>{item.name}</AppText>
                <AppText> SL: {item.quantity}</AppText>
                <AppText>{item.description}</AppText>


                <TouchableOpacity style={styles.listItemEditBtn} onPress={() => handleEditOrchid(item)}>
                    <AppText>Edit</AppText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItemDeleteBtn} onPress={() => deleteOrchid(item.id)}>
                    <AppText>Delete</AppText>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <AppText style={styles.welcomeText}>Welcome Admin</AppText>
                {/* Thay bằng phần hiển thị avatar admin */}
                <Image
                    source={require('../../assets/images/google-icon.png')}
                    style={styles.avatar}
                />
            </View>



            <ScrollView>
                <TouchableOpacity style={styles.addButton} onPress={handleAddNewOrchid}>
                    <AppText>Add New Orchid</AppText>
                </TouchableOpacity>

                {isModalVisible ? (
                    <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
                        <View style={styles.modalContainer}>
                            <TextInput
                                placeholder="Name"
                                style={styles.input}
                                value={isEditingOrchid ? editedOrchidData.name : newOrchidData.name}
                                onChangeText={(text) =>
                                    isEditingOrchid
                                        ? setEditedOrchidData({ ...editedOrchidData, name: text })
                                        : setNewOrchidData({ ...newOrchidData, name: text })
                                }
                            />
                            <TextInput
                                placeholder="Image URL"
                                style={styles.input}
                                value={isEditingOrchid ? editedOrchidData.imageUrl : newOrchidData.imageUrl}
                                onChangeText={(text) =>
                                    isEditingOrchid
                                        ? setEditedOrchidData({ ...editedOrchidData, imageUrl: text })
                                        : setNewOrchidData({ ...newOrchidData, imageUrl: text })
                                }
                            />
                            <TextInput
                                placeholder="Description"
                                style={[styles.input, styles.descriptionInput]}
                                value={isEditingOrchid ? editedOrchidData.description : newOrchidData.description}
                                onChangeText={(text) =>
                                    isEditingOrchid
                                        ? setEditedOrchidData({ ...editedOrchidData, description: text })
                                        : setNewOrchidData({ ...newOrchidData, description: text })
                                }
                                multiline={true} // Cho phép nhập nhiều dòng
                                numberOfLines={4} // Số dòng tối đa hiển thị trên TextInput (tùy chỉnh theo nhu cầu)
                            />
                            <TextInput
                                placeholder="Quantity"
                                style={styles.input}
                                value={isEditingOrchid ? editedOrchidData.quantity : newOrchidData.quantity}
                                onChangeText={(text) =>
                                    isEditingOrchid
                                        ? setEditedOrchidData({ ...editedOrchidData, quantity: text })
                                        : setNewOrchidData({ ...newOrchidData, quantity: text })
                                }
                            />


                            {isAddingNewOrchid && (
                                <TouchableOpacity style={styles.saveButton} onPress={handleSaveNewOrchid}>
                                    <AppText>Save New Orchid</AppText>
                                </TouchableOpacity>
                            )}
                            {isEditingOrchid && (
                                <TouchableOpacity style={styles.saveButton} onPress={handleSaveEditedOrchid}>
                                    <AppText>Save Edited Orchid</AppText>
                                </TouchableOpacity>
                            )}
                        </View>
                    </Modal>
                ) : (
                    <FlatList
                        data={orchids}
                        renderItem={renderOrchidItem}
                        keyExtractor={(item) => item.id}
                    />

                )}


            </ScrollView>
            {/* Component ConfirmationPopup */}
            <ConfirmationPopup
                isVisible={showConfirmation}
                message="Are you sure you want to delete this orchid?"
                onCancel={() => setShowConfirmation(false)} // Đóng popup khi người dùng cancel
                onConfirm={handleConfirmDelete} // Xác nhận delete
            />

        </View>
    );
};

export default HomeAdmin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    listItemContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 15,
        alignItems: 'center',
    },
    listItemName: {
        fontSize: 17,
        paddingBottom: 5,
    },
    listItemDescriptionContainer: {
        padding: 10,
        flex: 1,
    },
    listItemFavourite: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
    image: {
        height: 130,
        width: 130,
        borderRadius: 15,
    },
    listItemDeleteBtn: {
        marginTop: 10,
        backgroundColor: colors.danger,
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    listItemEditBtn: {
        marginTop: 10,
        backgroundColor: colors.medium,
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: colors.primary,
        padding: 10,
        alignItems: 'center',
        margin: 10,
        borderRadius: 5,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    input: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    saveButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    descriptionInput: {
        height: 100, // Chiều cao ban đầu
        textAlignVertical: 'top', // Hiển thị văn bản từ phía trên
    },
});

