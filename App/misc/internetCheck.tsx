import React, { PureComponent } from 'react';
import { View, Text, Dimensions, StyleSheet, Alert } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
const { width } = Dimensions.get('window');

function MiniOfflineSign() {
    return (
        <View style={styles.offlineContainer}>
            <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
    );
}

class OfflineNotice extends PureComponent {
    state = {
        isConnected: true
    };

    componentDidMount() {
        // Subscribe
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (state.isConnected == false) {
                Alert.alert("No Internet Connection");
                this.setState({
                    isConnected: false
                })
            }
        });

        // Unsubscribe
        unsubscribe();
    }

    componentWillUnmount() {
        // NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
        this.setState({ isConnected });
    };

    render() {
        if (!this.state.isConnected) {
            return <MiniOfflineSign />;
        }
        return null;
    }
}

const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: '#b52424',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        position: 'absolute',
        top: 30
    },
    offlineText: { color: '#fff' }
});

export default OfflineNotice;