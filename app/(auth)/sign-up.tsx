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
import { useSignUp } from '@clerk/clerk-expo';
import ReactNativeModal from 'react-native-modal';
import { fetchAPI } from '@/lib/fetch';
import { useTranslation } from 'react-i18next';

const SignUp = () => {
  const { t } = useTranslation();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: '',
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setVerification({ ...verification, state: 'pending' });
    } catch (err: any) {
      Alert.alert('Error', err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === 'complete') {
        await fetchAPI('/(api)/user', {
          method: 'POST',
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });

        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: 'success' });
      } else {
        setVerification({
          ...verification,
          error: 'Verification failed.',
          state: 'failed',
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: 'failed',
      });
    }
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
                onChangeText={(value) =>
                  setForm({
                    ...form,
                    name: value,
                  })
                }
              />
              <InputField
                label={t('signup.email.label')}
                placeholder={t('signup.email.placeholder')}
                icon={icons.email}
                value={form.email}
                onChangeText={(value) =>
                  setForm({
                    ...form,
                    email: value,
                  })
                }
              />
              <InputField
                label={t('signup.password.label')}
                placeholder={t('signup.password.placeholder')}
                icon={icons.lock}
                secureTextEntry={true}
                value={form.password}
                onChangeText={(value) =>
                  setForm({
                    ...form,
                    password: value,
                  })
                }
              />

              <CustomButton title={t('signup.button')} onPress={onSignUpPress} className="mt-6" />

              <OAuth />

              <Link href="/sign-in" className="mt-10 text-center text-lg text-general-200">
                <Text>{t('signup.footer.question')} </Text>
                <Text className="text-primary-500">{t('signup.footer.link')}</Text>
              </Link>
            </View>
          </View>

          <ReactNativeModal
            isVisible={verification.state === 'pending'}
            onModalHide={() => {
              if (verification.state === 'success') setShowSuccessModal(true);
            }}>
            <View className="min-h-[300px] rounded-2xl bg-white px-7 py-9">
              <Text className="mb-2 font-JakartaExtraBold text-2xl">
                {t('signup.verification.title')}
              </Text>
              <Text className="mb-5 font-Jakarta">
                {t('signup.verification.subtitle', { email: form.email })}
              </Text>
              <InputField
                label={t('signup.verification.code.label')}
                icon={icons.lock}
                placeholder={t('signup.verification.code.placeholder')}
                value={verification.code}
                keyboardType="numeric"
                onChangeText={(code) => setVerification({ ...verification, code })}
              />
              {verification.error && (
                <Text className="mt-1 text-sm text-red-500">{verification.error}</Text>
              )}

              <CustomButton
                title={t('signup.verification.button')}
                onPress={onPressVerify}
                className="mt-5 bg-success-500"
              />
            </View>
          </ReactNativeModal>

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
                    router.push('/(root)/(tabs)/home');
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
