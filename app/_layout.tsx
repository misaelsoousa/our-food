import { Stack } from 'expo-router';
import '../global.css';
import { CategoryProvider } from '../contexts/CategoryContext';

export default function RootLayout() {
    return (
        <CategoryProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="select-address/index" options={{ title: 'Selecione o Endereço' }} />
                <Stack.Screen name="user/index" options={{ title: 'Meu Perfil' }} />
            </Stack>
        </CategoryProvider>
    );
}