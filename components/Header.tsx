import { ArrowSelect, Notify } from 'assets/icons';
import { Text, View, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function Header() {
    return (
        <View className='w-full bg-white fixed top-0 left-0'>
            <View className='flex justify-between items-center px-4 py-4 flex-row'>
                <Link href='/select-address' asChild>
                    <TouchableOpacity>
                        <View className='flex flex-row items-center gap-2'>
                            <Text className='text-sm font-semibold'>R. Acaris, 112</Text>
                            <ArrowSelect />
                        </View>
                    </TouchableOpacity>
                </Link>
                <View className='p-2 bg-gray/30 rounded-full'>
                    <Notify />
                </View>
            </View>
        </View>
    );
}