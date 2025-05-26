import { images, icons } from '@/constants';
import {
  Text,
  ScrollView,
  View,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import OAuth from '@/components/OAuth';
import { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReactNativeModal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/lib/supabase';

const SignUp = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [verificationState, setVerificationState] = useState<
    'default' | 'pending' | 'success' | 'failed'
  >('default');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onSignUpPress = async () => {
    if (!form.email || !form.password || !form.name) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { name: form.name },
        emailRedirectTo: 'https://your-site.com/welcome', // можно убрать
      },
    });

    if (data?.user) {
      console.log('Регистрация прошла успешно, user id:', data.user.id);
    }

    if (error) {
      Alert.alert('Ошибка', error.message);
      return;
    }

    setVerificationState('pending');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={20}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
          <View className="flex-1 bg-white">
            <View className="relative h-[250px] w-full">
              <Image source={images.signUpCar} className="z-0 h-[250px] w-full" />
            </View>
            <Text className="mt-2 px-5 font-JakartaSemiBold text-2xl text-black">
              {t('signup.title')}
            </Text>

            <View className="p-5">
              <InputField
                label={t('signup.name.label')}
                placeholder={t('signup.name.placeholder')}
                icon={icons.person}
                value={form.name}
                onChangeText={(value) => setForm({ ...form, name: value })}
              />
              <InputField
                label={t('signup.email.label')}
                placeholder={t('signup.email.placeholder')}
                icon={icons.email}
                value={form.email}
                onChangeText={(value) => setForm({ ...form, email: value })}
              />
              <InputField
                label={t('signup.password.label')}
                placeholder={t('signup.password.placeholder')}
                icon={icons.lock}
                secureTextEntry={true}
                value={form.password}
                onChangeText={(value) => setForm({ ...form, password: value })}
              />

              <CustomButton title={t('signup.button')} onPress={onSignUpPress} className="mt-6" />

              <OAuth />

              <Link href="/sign-in" className="mt-10 text-center text-lg text-general-200">
                <Text>{t('signup.footer.question')} </Text>
                <Text className="text-primary-500">{t('signup.footer.link')}</Text>
              </Link>
            </View>
          </View>

          {/* Модалка - Подтвердите email */}
          <ReactNativeModal
            isVisible={verificationState === 'pending'}
            onBackdropPress={() => setVerificationState('default')}>
            <View className="min-h-[300px] rounded-2xl bg-white px-7 py-9">
              <Text className="mb-2 font-JakartaExtraBold text-2xl">
                {t('signup.verification.title')}
              </Text>
              <Text className="mb-5 font-Jakarta">
                {t('signup.verification.subtitle', { email: form.email })}
              </Text>
              <CustomButton
                title="ОК"
                onPress={() => {
                  setVerificationState('success');
                  setShowSuccessModal(true);
                }}
              />
            </View>
          </ReactNativeModal>

          {/* Модалка - Успешно */}
          <ReactNativeModal
            isVisible={showSuccessModal}
            style={{ margin: 0 }}
            backdropOpacity={0.6}
            backdropColor="#000"
            useNativeDriver>
            <View
              style={{ height: Dimensions.get('window').height }}
              className="items-center justify-center">
              <View className="w-4/5 max-w-[320px] rounded-2xl bg-white px-7 py-9">
                <Image source={images.check} className="mx-auto my-5 h-[110px] w-[110px]" />
                <Text className="text-center font-JakartaBold text-3xl">
                  {t('signup.success.title')}
                </Text>
                <Text className="mt-2 text-center font-Jakarta text-base text-gray-400">
                  {t('signup.success.subtitle')}
                </Text>

                <CustomButton
                  title={t('signup.success.button')}
                  onPress={() => {
                    setShowSuccessModal(false);
                    router.push('/(auth)/sign-in');
                  }}
                  className="mt-5"
                />
              </View>
            </View>
          </ReactNativeModal>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
