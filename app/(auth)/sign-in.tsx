import { images, icons } from '@/constants';
import { Text, ScrollView, View, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import OAuth from '@/components/OAuth';
import { useCallback, useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSignIn } from '@clerk/clerk-expo';

const SignIn = () => {
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
        Alert.alert('Error', 'Log in failed. Please try again.');
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert('Error', err.errors[0].longMessage);
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
            <Text className="font-JakartaSemiBold text-2xl text-black">Welcome 👋</Text>
            <View className="p-5">
              <InputField
                label="Email"
                placeholder="Enter your email"
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
                label="Password"
                placeholder="Enter your password"
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

              <CustomButton title="Sign In" onPress={onSignInPress} className="mt-6" />

              <OAuth />

              <Link href="/sign-up" className="mt-10 text-center text-lg text-general-200">
                <Text>Do not have an account?</Text>
                <Text className="text-primary-500">Sign Up</Text>
              </Link>
            </View>
            {/* Verification Modal */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
