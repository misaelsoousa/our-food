import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useCategories } from '../contexts/CategoryContext';

const CategoryItem = ({ name, color, image }: any) => (
    <View style={{ backgroundColor: color }} className='w-[48%] h-[100px] rounded-lg p-3 my-2 justify-between overflow-hidden'>
        <Text className='text-white font-bold text-lg'>{name}</Text>
        {image && (
            <Image
                source={typeof image === 'string' ? { uri: image } : image}
                className='w-36 h-24 absolute bottom-[-10px] right-[-20px] object-cover'
            />
        )}
    </View>
);

export default function ListProducts() {
    const { categories, loading, error } = useCategories();

    if (loading) return <Text>Carregando...</Text>;
    if (error) return <Text>Erro ao carregar categorias</Text>;

    return (
        <View className='flex-1 bg-white w-full p-3 rounded-t-[2em] pt-8'>
            <Text className='text-2xl font-bold mb-4'>Categorias</Text>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.name}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                className='w-full'
                renderItem={({ item }) => (
                    <CategoryItem
                        name={item.name}
                        color={item.cor_hex}
                        image={item.imagem}
                    />
                )}
                columnWrapperStyle={{ justifyContent: 'space-between', gap: 10 }}
            />
        </View>
    );
}
