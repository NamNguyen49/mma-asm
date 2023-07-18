import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import colors from '../../../config/colors';

const ConfirmationPopup = ({ isVisible, message, onCancel, onConfirm }) => {
    return (
        <Modal visible={isVisible} transparent={true} animationType="fade">
            <View style={styles.popupContainer}>
                <View style={styles.popupContent}>
                    <Text style={styles.messageText}>{message}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    popupContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popupContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    messageText: {
        fontSize: 16,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        backgroundColor: colors.danger,
        padding: 10,
        borderRadius: 5,
        width: 100,
        alignItems: 'center',
    },
    confirmButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        width: 100,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ConfirmationPopup;
