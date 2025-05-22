import { images, icons } from '@/constants';
import { Text, ScrollView, View, Image } from 'react-native';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import OAuth from '@/components/OAuth';
import { useState } from 'react';
import { Link } from 'expo-router';

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onSignUpPress = async () => {};

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative h-[250px] w-full">
          <Image source={images.signUpCar} className="z-0 h-[250px] w-full" />
        </View>
        <Text className="font-JakartaSemiBold text-2xl text-black">Create Your Account</Text>
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
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

          <CustomButton title="Sign Up" onPress={onSignUpPress} className="mt-6" />

          <OAuth />

          <Link href="/sign-in" className="mt-10 text-center text-lg text-general-200">
            <Text>Already have an account?{''}</Text>
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>
        {/* Verification Modal */}
      </View>
    </ScrollView>
  );
};

export default SignUp;
