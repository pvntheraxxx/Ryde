import { useOAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { Alert, Image, Text, View } from 'react-native';

import CustomButton from '@/components/CustomButton';
import { icons } from '@/constants';
import { googleOAuth } from '@/lib/auth';
import { useTranslation } from 'react-i18next';

const OAuth = () => {
  const { t } = useTranslation();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const handleGoogleSignIn = async () => {
    const result = await googleOAuth(startOAuthFlow);

    if (result.code === 'session_exists') {
      Alert.alert(t('oauth.success'), t('oauth.session_redirect'));
      router.replace('/(root)/(tabs)/home');
      return;
    }

    Alert.alert(result.success ? t('oauth.success') : t('oauth.error'), result.message);
  };

  return (
    <View>
      <View className="mt-4 flex flex-row items-center justify-center gap-x-3">
        <View className="h-[1px] flex-1 bg-general-100" />
        <Text className="text-lg">{t('oauth.or')}</Text>
        <View className="h-[1px] flex-1 bg-general-100" />
      </View>

      <CustomButton
        title={t('oauth.google')}
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image source={icons.google} resizeMode="contain" className="mx-2 h-5 w-5" />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
