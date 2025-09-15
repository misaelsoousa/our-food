import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Chevron } from '../../../assets/icons';

export default function CadastroEmail() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [emailLocked, setEmailLocked] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isValidEmail = useMemo(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        return emailRegex.test(email.trim());
    }, [email]);

    const isValidPasswords = useMemo(() => {
        const minLenOk = password.length >= 6;
        const match = password === confirmPassword;
        return minLenOk && match;
    }, [password, confirmPassword]);

    const canSubmit = emailLocked ? isValidPasswords : isValidEmail;

    const handleContinue = () => {
        if (!emailLocked) {
            if (!isValidEmail) return;
            setEmailLocked(true);
            return;
        }
        if (!isValidPasswords) return;
        router.back();
    };

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className='flex-1'>
                <View className='px-4 pt-2'>
                    <TouchableOpacity onPress={() => router.back()} accessibilityRole='button' accessibilityLabel='Voltar'>
                        <Chevron className='rotate-180' />
                    </TouchableOpacity>
                </View>

                <View className='px-4 mt-4'>
                    <Text className='text-xl font-semibold'>Qual o seu e-mail?</Text>
                </View>

                <View className='px-4 mt-5'>
                    <Text className='text-xs text-gray-700 mb-2'>E-mail</Text>
                    <View className={`rounded-md ${emailLocked ? 'border border-gray-300 bg-gray-100' : 'border border-gray-800'}`}>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            inputMode='email'
                            autoCapitalize='none'
                            autoCorrect={false}
                            placeholder='E-mail'
                            editable={!emailLocked}
                            className={`px-3 py-3 text-base ${emailLocked ? 'text-gray-500' : ''}`}
                        />
                    </View>
                </View>

                {emailLocked && (
                    <>
                        <View className='px-4 mt-5'>
                            <Text className='text-xs text-gray-700 mb-2'>Senha</Text>
                            <View className='border border-gray-800 rounded-md'>
                                <TextInput
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    autoCapitalize='none'
                                    placeholder='Senha'
                                    className='px-3 py-3 text-base'
                                />
                            </View>
                        </View>
                        <View className='px-4 mt-4'>
                            <Text className='text-xs text-gray-700 mb-2'>Confirmar senha</Text>
                            <View className='border border-gray-800 rounded-md'>
                                <TextInput
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry
                                    autoCapitalize='none'
                                    placeholder='Confirmar senha'
                                    className='px-3 py-3 text-base'
                                />
                            </View>
                        </View>
                        <View className='px-4 mt-2'>
                            {!!password && !!confirmPassword && password !== confirmPassword && (
                                <Text className='text-red-500 text-xs'>As senhas não coincidem.</Text>
                            )}
                        </View>
                    </>
                )}

                <View className='px-4 mt-auto mb-24'>
                    <Text className='text-[12px] text-gray-500'>
                        O ourFood poderá enviar comunicações neste e-mail, pra cancelar a inscrição acesse ‘Configurações’.
                    </Text>
                </View>

                <View className='absolute bottom-0 left-0 right-0'>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={handleContinue}
                        disabled={!canSubmit}
                        className={`mx-0 h-14 items-center justify-center ${canSubmit ? 'bg-[#de0b2e]' : 'bg-gray-200'} `}
                    >
                        <Text className={`text-base font-semibold ${canSubmit ? 'text-white' : 'text-gray-500'}`}>{emailLocked ? 'Cadastrar' : 'Continuar'}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

