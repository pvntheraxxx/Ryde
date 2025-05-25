import { images, icons } from '@/constants';
import { Text, ScrollView, View, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import OAuth from '@/components/OAuth';
import { useCallback, useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSignIn } from '@clerk/clerk-expo';
import { useTranslation } from 'react-i18next';

const SignIn = () => {
  const { t } = useTranslation();
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/(root)/(tabs)/home');
      } else {
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert(t('signin.error'), t('signin.failed'));
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert(t('signin.error'), err.errors[0].longMessage);
    }
  }, [isLoaded, form]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={20}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="flex-1 bg-white">
            <View className="relative h-[250px] w-full">
              <Image source={images.signUpCar} className="z-0 h-[250px] w-full" />
            </View>

            <Text className="mt-2 px-5 font-JakartaSemiBold text-2xl text-black">
              {t('signin.title')}
            </Text>

            <View className="p-5">
              <InputField
                label={t('signin.email.label')}
                placeholder={t('signin.email.placeholder')}
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
                label={t('signin.password.label')}
                placeholder={t('signin.password.placeholder')}
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

              <CustomButton title={t('signin.button')} onPress={onSignInPress} className="mt-6" />

              <OAuth />

              <Link href="/sign-up" className="mt-10 text-center text-lg text-general-200">
                <Text>{t('signin.footer.question')} </Text>
                <Text className="text-primary-500">{t('signin.footer.link')}</Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
