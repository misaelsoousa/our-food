import { Home, Order, SearchIcon, User } from 'assets/icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
type TabBarProps = {
    className?: string;
};

export default function TabBar({ className }: TabBarProps) {
    return (
        <View className={`w-full bg-white fixed bottom-0 left-0 ${className ?? ''}`}>
            <View className='flex flex-row px-10 py-5 justify-between'>
                <Link href={'/'} asChild>
                    <TouchableOpacity>
                        <View className='flex flex-col items-center'>
                            <Home />
                            <Text>Início</Text>
                        </View>
                    </TouchableOpacity>
                </Link>

                <Link href={'/search'} asChild>
                    <TouchableOpacity>
                        <View className='flex flex-col items-center'>
                            <SearchIcon />
                            <Text>Busca</Text>
                        </View>
                    </TouchableOpacity>
                </Link>
                <Link href={'/login/cadastro'} asChild>
                    <TouchableOpacity>
                        <View className='flex flex-col items-center'>
                            <Order />
                            <Text>Pedidos</Text>
                        </View>
                    </TouchableOpacity>
                </Link>

                <Link href={'/user'} asChild>
                    <TouchableOpacity>
                        <View className='flex flex-col items-center'>
                            <User />
                            <Text>Perfil</Text>
                        </View>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
}