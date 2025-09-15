import { Image, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Login() {
    return (
        <SafeAreaView>
            <Image
                source={require('./../../assets/img/delivery.jpg')}
                className='w-full h-full'
            />
            <View className='bg-white absolute bottom-0 left-0 h-[300px] w-full rounded-tr-[2.5rem] rounded-tl-[2.5rem] px-5 py-10'>
                <View className='flex flex-col  gap-5'>
                    <View className='bg-[#de0b2e] flex justify-center items-center py-5 rounded-xl'><Text className='text-white text-xl font-semibold'>Já tenho uma conta</Text></View>
                    <View className='border-[#de0b2e] border-2 flex justify-center items-center py-5 rounded-xl'><Text className='text-[#de0b2e] text-xl font-semibold'>Criar nova conta</Text></View>
                </View>
            </View>
        </SafeAreaView>
    );
}