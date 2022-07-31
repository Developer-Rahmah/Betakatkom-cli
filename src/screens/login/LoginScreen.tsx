import Icon from 'Cards/assets/images/alwafeer-logo-with-background.jpeg';
import { Colors } from 'Cards/assets/styles/Colors';
import ErrorMsg from 'Cards/src/components/ErrorMsg';
import IconImage from 'Cards/src/components/IconImage';
import Input from 'Cards/src/components/Input';
import Title from 'Cards/src/components/Title';
import LocalStorage from 'Cards/src/services/helper/LocalStorage';
import { useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { I18nManager, Linking, ScrollView, Switch, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setAuthTokenAction, setLanguageAction } from 'Cards/src/services/redux/actions';
import Whatsapp from 'Cards/assets/icons/whatsapp.png'
import Call from 'Cards/assets/icons/telephone.png'
import RNRestart from 'react-native-restart';
import Button from 'Cards/src/components/Button';
import styles from './styles';

export default function LoginScreen() {
  const [lang, setLang] = useState('');
  const getLang = async () => {
    const language = await LocalStorage.get('lang');
    setLang(language);
    setIsEN(language === 'ar');
  };
  useEffect(() => {
    getLang();
  }, []);
  const [inputValue, setInputValue] = useState(0);
  const [disableBtn, setDisableBtn] = useState(false);
  const [isEN, setIsEN] = useState(lang === 'en');
  const toast = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });
  const dispatch = useDispatch();

  const onSubmit = (data: any) => {
    // setDisableBtn(true);
    dispatch(setAuthTokenAction('authToken'));
    LocalStorage.set('authToken', 'authToken');
  };

  useEffect(() => {
  }, [inputValue])

  const toggleSwitchLang = async () => {
    setIsEN((previousState) => !previousState);
    dispatch(setLanguageAction(lang === 'ar' ? 'en' : 'ar'));
    LocalStorage.set('lang', lang === 'ar' ? 'en' : 'ar');
    I18nManager.forceRTL(lang === 'en');
    RNRestart.Restart();
  };
  return (

    <View style={styles.screenContainer}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <IconImage source={Icon} style={styles.logo} />
        </View>
        <View
          style={styles.switchLangContainer}>
          <Title color={Colors.WHITE} title="EN" />
          <Switch
            style={styles.switch}
            trackColor={{
              false: Colors.LIGHT_GRAY,
              true: Colors.LIGHT_GRAY,
            }}
            thumbColor={Colors.secondaryColor}
            ios_backgroundColor={Colors.LIGHT_GRAY}
            onValueChange={toggleSwitchLang}
            value={isEN}
          />
          <Title color={Colors.WHITE} title="AR" />
        </View>
        <View style={styles.formContainer}>
          <Controller

            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                isPassword={false}
                maxLength={10}
                keyboardType="number-pad"
                placeholder='Phone number'
                onChangeText={(value: string) => { onChange(value), setInputValue(parseInt(value)) }}
                value={value}
              />
            )}
            name="ID"
            rules={{
              required: true,
              minLength: {
                value: 10,
                message: "min length is 10"
              },

              maxLength: {
                value: 10,
                message: "max length is 10"
              }
            }}
          />
          {(errors.ID || isNaN(inputValue)) && <ErrorMsg errorMsg="Invalid ID." />}

          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <Input
                isPassword
                placeholder={'Password'}
                onChangeText={(value: string) => onChange(value)}
                value={value}
              />
            )}
            name="password"
            rules={{ required: true }}
          />
          {errors.password && <ErrorMsg errorMsg="This is required." />}
          <View style={styles.loginBtnContainer}>
            <Button
              locked={!isValid || disableBtn}
              onClick={handleSubmit(onSubmit)}
              title="Login"
              style={styles.loginBtn}
              txtColor={Colors.WHITE}
            />

          </View>
          <Title numberOfLines={0} title={`Contact us`} style={styles.contactUs} />

          <View style={styles.phoneContainer}>

            <TouchableOpacity onPress={() => Linking.openURL(`tel:${':+962792898145'}`)}>

              <IconImage
                style={styles.icon} source={Call} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL(
                'whatsapp://send?text=' +
                'enter your message' +
                `&phone=962792898145`,
              )}
            >
              <IconImage
                style={styles.whatsappIcon} source={Whatsapp} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.copyrightContainer}>
          <Title color={Colors.WHITE} numberOfLines={0} title={`All Copyright reserved for `} />
          <Title color={Colors.WHITE} numberOfLines={0} title={`AlWafeer.net ${new Date().getFullYear()}`} />
        </View>
      </ScrollView>

    </View>

  );
}

