import React from 'react';
import { AppRegistry } from "react-native";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import { BackHandler } from 'react-native';
const AccessLocation = () => {
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: "<h2 style='color: #0af13e'>Enable Location ?</h2><br/>Use GPS location<br/><br/><h2 style='color: #0af13e'>Please restart the App</h2><br/><br/> No Location will exit App.",
        ok: "YES",
        cancel: "NO",
        enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
        showDialog: true, // false => Opens the Location access page directly
        openLocationServices: true, // false => Directly catch method is called if location services are turned off
        preventOutSideTouch: true, // true => To prevent the location services window from closing when it is clicked outside
        preventBackClick: true, // true => To prevent the location services popup from closing when it is clicked back button
        providerListener: true // true ==> Trigger locationProviderStatusChange listener when the location state changes
    }).then(function (success) {
        // console.log(success); // success => {alreadyEnabled: false, enabled: true, status: "enabled"}
    }).catch((error) => {
        // BackHandler.exitApp();
        // console.log(error.message); // error.message => "disabled"
    });


    try {
        DeviceEventEmitter.addListener('locationProviderStatusChange', function (status) { // only trigger when "providerListener" is enabled
            console.log(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
        });
    } catch (error) {

    }

    return (<></>)
}
AppRegistry.registerComponent('App', () => AccessLocation);
export default AccessLocation;