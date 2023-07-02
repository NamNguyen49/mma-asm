import { SafeAreaView, View } from 'react-native';
import styles from './styles';

const AppScreen = ({ children, style }) => {
    return (
        <SafeAreaView style={[styles.screen, style]}>
            <View style={[styles.view, style]}>{children}</View>
        </SafeAreaView>
    );
}

export default AppScreen;
