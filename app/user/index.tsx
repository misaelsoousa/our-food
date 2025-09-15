import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import './../../global.css';
import { Chevron, Location, Notify, Settings, Talk } from 'assets/icons';

const OptionItem = ({ icon, label, notificationCount = 0 }: any) => (
    <View className='flex-row justify-between items-center py-4 px-6'>
        <View className='flex-row items-center gap-4'>
            <View className='p-1'>
                {icon}
            </View>
            <Text className='text-base text-gray-700'>{label}</Text>
        </View>
        <View className='flex-row items-center gap-2'>
            {notificationCount > 0 && (
                <View className='w-5 h-5 rounded-full bg-red-500 justify-center items-center'>
                    <Text className='text-white text-xs'>{notificationCount}</Text>
                </View>
            )}
            <Text className='text-gray-400 text-lg'><Chevron /></Text>
        </View>
    </View>
);

export default function User() {
    const router = useRouter();
    return (
        <View className='flex-1 bg-white'>
            <SafeAreaView className='flex-1'>
                <TouchableOpacity onPress={() => router.back()}>
                    <View className='px-6 flex flex-row items-center'>
                        <View className='transform rotate-180'>
                            <Chevron />
                        </View>
                        <Text className='text-xl'>Voltar</Text>
                    </View>
                </TouchableOpacity>
                <View className='flex-row items-center p-6'>
                    <View className='w-16 h-16 rounded-full bg-black justify-center items-center'>

                    </View>
                    <View className='ml-4'>
                        <Text className='text-xl font-bold'>Misa Soousa</Text>
                    </View>
                </View>
                <View className='flex-1 flex flex-col gap-5'>
                    <OptionItem icon={<Talk />} label='Conversas' notificationCount={2} />
                    <OptionItem icon={<Notify />} label='Notificações' notificationCount={3} />
                    <OptionItem icon={<Location />} label='Endereços' />
                    <OptionItem icon={<View className='p-1'><Settings /></View>} label='Configurações' />
                </View>
            </SafeAreaView>
        </View>
    );
}