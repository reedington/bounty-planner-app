import React, { useEffect, useState } from 'react';

export default function MyCustomWidget() {
    const [location, setLocation] = useState(null);
    const [batteryInfo, setBatteryInfo] = useState(null);

    useEffect(() => {
        // Fetch user's location
        const fetchLocation = async () => {
            try {
                const locationResponse = await fetch('https://ipapi.co/json/');
                const locationData = await locationResponse.json();
                setLocation(locationData);
            } catch (error) {
                console.error('Error fetching location:', error);
            }
        };

        fetchLocation();
    }, []);

    useEffect(() => {
        // Fetch battery information
        const fetchBatteryInfo = async () => {
            try {
                const battery = await navigator.getBattery();
                setBatteryInfo(battery);
            } catch (error) {
                console.error('Error fetching battery information:', error);
            }
        };

        fetchBatteryInfo();
    }, []);

    return (
        <div>
            <h2>Location Widget</h2>
            {location ? (
                <div>
                    <p>Country: {location.country_name}</p>
                    <p>City: {location.city}</p>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </div>
            ) : (
                <p>Loading location...</p>
            )}

            <h2>Battery Life Widget</h2>
            {batteryInfo ? (
                <div>
                    <p>Percentage: {(batteryInfo.level * 100).toFixed(2)}%</p>
                    <p>Charging: {batteryInfo.charging ? 'Yes' : 'No'}</p>
                    <p>Charging Time Left: {batteryInfo.chargingTime === Infinity ? 'Unknown' : `${batteryInfo.chargingTime} seconds`}</p>
                </div>
            ) : (
                <p>Loading battery information...</p>
            )}
        </div>
    );
}
