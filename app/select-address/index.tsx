import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Chevron, Location, Clock, SearchIcon } from 'assets/icons';
import * as ExpoLocation from 'expo-location'; 


const initialAddresses = [
    {
        id: 1,
        street: 'R. Acaris, 112',
        neighborhood: 'Vila Tupi, Praia Grande - SP',
        complement: 'apto 73',
        isSelected: false 
    },
    {
        id: 2,
        street: 'R. Tiradentes, 255',
        neighborhood: 'Canto do Forte, Praia Grande - SP',
        complement: 'apto 45B',
        isSelected: false
    }
];

export default function SelectAddress() {
    const router = useRouter();
    const [addresses, setAddresses] = useState(initialAddresses);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);

    const selectAddress = (id : number) => {
        setAddresses(prevAddresses =>
            prevAddresses.map(addr => ({
                ...addr,
                isSelected: addr.id === id
            }))
        );
    };

    const fetchCurrentLocation = async () => {
        setLoadingLocation(true);
        setLocationError(null);

        try {
            let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocationError('Permissão para acessar a localização foi negada.');
                Alert.alert(
                    "Permissão Negada",
                    "Precisamos da sua permissão para obter a localização. Por favor, habilite nas configurações do seu dispositivo."
                );
                return;
            }

            let currentLocation = await ExpoLocation.getCurrentPositionAsync({ accuracy: ExpoLocation.Accuracy.High });
            const { latitude, longitude } = currentLocation.coords;

            let geocode = await ExpoLocation.reverseGeocodeAsync({ latitude, longitude });
            
            let newAddress = {
                id: addresses.length + 1,
                street: geocode[0]?.street ? `${geocode[0].street}, ${geocode[0].streetNumber || 'S/N'}` : `Latitude: ${latitude.toFixed(4)}`,
                neighborhood: geocode[0]?.subregion && geocode[0]?.city ? `${geocode[0].subregion}, ${geocode[0].city} - ${geocode[0].region}` : `Longitude: ${longitude.toFixed(4)}`,
                complement: geocode[0]?.name || 'Localização atual',
                isSelected: true
            };

            setAddresses(prevAddresses => {
                const updatedAddresses = prevAddresses.map(addr => ({ ...addr, isSelected: false }));
                return [...updatedAddresses, newAddress];
            });

        } catch (err) {
            console.error("Erro ao obter localização:", err);
            setLocationError('Não foi possível obter a localização. Verifique se o GPS está ativado.');
            Alert.alert(
                "Erro de Localização",
                "Não foi possível obter sua localização. Verifique se o GPS está ativado e tente novamente."
            );
        } finally {
            setLoadingLocation(false);
        }
    };

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='bg-white px-4 py-4 flex-row items-center justify-between'>
                <TouchableOpacity onPress={() => router.back()}>
                    <View className='transform rotate-180'>
                        <Chevron />
                    </View>
                </TouchableOpacity>
                <Text className='text-xl font-bold text-gray-800 text-center'>ENDEREÇO DE ENTREGA</Text>
                <View className='w-[32px]'></View>
            </View>

            <ScrollView className='flex-1 px-4'>

                <View className='bg-gray-100 rounded-lg px-4 py-3 mb-4 flex-row items-center'>
                    <SearchIcon />
                    <TextInput
                        placeholder="Endereço e número"
                        placeholderTextColor="#9CA3AF"
                        className='flex-1 ml-3 text-gray-700'
                    />
                </View>

                <TouchableOpacity className='mb-6' onPress={fetchCurrentLocation} disabled={loadingLocation}>
                    <View className='flex-row items-center'>
                        <Location />
                        <View className='ml-3'>
                            <Text className='text-lg font-medium text-gray-800'>
                                {loadingLocation ? 'Obtendo localização...' : 'Usar localização atual'}
                            </Text>
                            {locationError ? (
                                <Text className='text-sm text-red-500'>{locationError}</Text>
                            ) : (
                                <Text className='text-sm text-gray-500'>Ativar localização</Text>
                            )}
                        </View>
                        {loadingLocation && (
                            <ActivityIndicator size="small" color="#0000ff" style={{ marginLeft: 10 }} />
                        )}
                    </View>
                </TouchableOpacity>

                <View className='flex flex-col gap-5'>
                    {addresses.map((address) => (
                        <TouchableOpacity
                            key={address.id}
                            onPress={() => selectAddress(address.id)} 
                            className={`p-4 rounded-lg border-[1px] ${address.isSelected
                                ? 'border-pink-300 bg-pink-50'
                                : 'border-gray-200 bg-white'
                                }`}
                        >
                            <View className='flex-row items-start justify-between'>
                                <View className='flex-row items-start flex-1'>
                                    <View className='mr-3 mt-1'>
                                        <Clock />
                                    </View>

                                    <View className='flex-1'>
                                        <Text className='text-lg font-bold text-gray-800 mb-1'>
                                            {address.street}
                                        </Text>
                                        <Text className='text-sm text-gray-600 mb-1'>
                                            {address.neighborhood}
                                        </Text>
                                        <Text className='text-sm text-gray-500'>
                                            {address.complement}
                                        </Text>
                                    </View>
                                </View>

                                <View className='flex-row items-center ml-2'>
                                    {address.isSelected && (
                                        <View className='w-6 h-6 bg-red-500 rounded-full items-center justify-center mr-2'>
                                            <Text className='text-white text-xs font-bold'>✓</Text>
                                        </View>
                                    )}
                                    <View className='flex-col'>
                                        <Text className='text-gray-400 text-lg'>...</Text> 
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}