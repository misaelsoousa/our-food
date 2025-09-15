import { View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabBar from 'components/TabBar';
import Header from 'components/Header';
import ListProducts from 'components/list-products';
import { SearchIcon } from 'assets/icons';

export default function Search() {
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View style={{ flex: 1 }}>
                <View className='px-10'>
                    <View className='rounded-full px-4 py-1 mb-4 flex-row items-center bg-white'>
                        <SearchIcon />
                        <TextInput
                            placeholder="O que vai pedir hoje?"
                            placeholderTextColor="#9CA3AF"
                            className='flex-1 ml-3 text-gray-700'
                        />
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} className='rounded-xl'>
                    <ListProducts />
                </View>
                <TabBar />
            </View>
        </SafeAreaView>
    );
}