import { View, Text, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabBar from 'components/TabBar';
import Header from 'components/Header';
import ListProducts from 'components/list-products';
import { useCategories } from '../contexts/CategoryContext';

const CategoryItem = ({ name, image }: any) => (
    <View  className='w-[23%] flex-col items-center h-auto bg-gray/50 rounded-lg p-3 my-2 justify-center gap-3 overflow-hidden mx-1'>
        {image && (
            <Image
                source={typeof image === 'string' ? { uri: image } : image}
                className='w-16 h-10'
            />
        )}
        <Text className='text-black font-bold text-sm whitespace-nowrap'>{name}</Text>
    </View>
);

export default function HomePage() {
    const { categories, loading, error } = useCategories();
    return (
        <SafeAreaView style={{ flex: 1 }} className='bg-white'>
            <View style={{ flex: 1 }}>
                <Header />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <FlatList
                        data={categories}
                        keyExtractor={(item) => item.name}
                        numColumns={4}
                        showsVerticalScrollIndicator={false}
                        className='w-full px-5'
                        renderItem={({ item }) => (
                            <CategoryItem
                                name={item.name}
                                color={item.cor_hex}
                                image={item.imagem}
                            />
                        )}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                    />
                </View>
                <TabBar />
            </View>
        </SafeAreaView>
    );
}