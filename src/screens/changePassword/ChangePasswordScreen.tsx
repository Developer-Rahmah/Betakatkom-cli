import React, { useState } from 'react';
import Header from 'Cards/src/components/Header';
import IconImage from 'Cards/src/components/IconImage';
import ChangePassword from 'Cards/assets/icons/purple-padlock.png';
import Lock from 'Cards/assets/icons/lock.png';
import ImageStyles from 'Cards/assets/styles/ImageStyles';
import { Colors } from 'Cards/assets/styles/Colors';
import { ContainerView, ImageAndTextContainer, ImageContainer } from './styled';
import General from 'Cards/assets/styles/General';
import Button from 'Cards/src/components/Button';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import Elements from 'Cards/assets/styles/Elements';
import { useForm, Controller } from 'react-hook-form';
import Input from 'Cards/src/components/Input';
//@ts-ignore
import { Toast, useToast } from 'native-base';
import ErrorMsg from 'Cards/src/components/ErrorMsg';
import { useTranslation } from 'Cards/src/services/hooks';
import Layout from 'Cards/assets/styles/Layout';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'Cards/src/services/helper/Constant';
import { Client } from 'Cards/src/services/config/clients';
import { PUT } from 'Cards/src/services/config/api';
import { useSelector } from 'react-redux';

export default function ChangePasswordScreen() {
  const [image, setImage] = useState(null);
  const [disableBtn, setDisableBtn] = useState(false);
  const [data, setData] = useState({})
  const navigation = useNavigation();
  const t = useTranslation();
  const toast = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });
  interface RootState {
    authToken: string;
  }
  const token = (state: RootState) => state.authToken;
  const useToken = useSelector(token);

  const onSubmit = (data: any) => {
    setData(data);
    if (data.password != data.confirmPassword) {

      toast.show({
        title: "error",
        status: "error",
        description: t('The password and confirmation password do not match.'),
        width: SCREEN_WIDTH,
      })

    } else {
      setDisableBtn(true);

      console.log("data", data);
      Client.put(
        PUT.CHANGE_PASSWORD,
        {
          data: {
            "oldPassword": data.currentPassword,
            "newPassword": data.confirmPassword
          }

        },
        {
          headers: {
            "Authorization": useToken,

          }
        }

      )
        .then((res) => {
          if (res.status == 200) {
            console.log("data", res.data.data.token)
            setDisableBtn(false);
            toast.show({
              title: "success",
              status: "success",
              description: t('Your password has been updated successfully'),
              width: SCREEN_WIDTH,
            })
            navigation.goBack()
          }
        })
        .catch((error) => {
          toast.show({
            title: "error",
            status: "error",
            description: error.message,
            width: SCREEN_WIDTH,
          })
          setDisableBtn(false);
        });
    }
  };

  return (
    <>
      <Header />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[General.flex, { backgroundColor: Colors.WHITE }]}>
        <ScrollView>
          <View style={[Layout.flexCenter, { paddingTop: 20 }]}>
            <ContainerView style={General.whiteBackgroundColor}>
              <ImageAndTextContainer>
                <ImageContainer style={General.smallPadding}>
                  <IconImage
                    source={ChangePassword}
                    style={[ImageStyles.teaserImage]}
                  />
                </ImageContainer>
              </ImageAndTextContainer>
              <View style={Elements.loginFieldsContainer}>
                <Controller
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      isPassword
                      // leftIcon={Lock}
                      placeholder={t('Current Password')}
                      onChangeText={(value: string) => onChange(value)}
                      value={value}
                    />
                  )}
                  name="currentPassword"
                  rules={{ required: true }}
                />
                {errors.currentPassword && (
                  <ErrorMsg errorMsg="This is required." />
                )}

                <Controller
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      isPassword
                      // leftIcon={Lock}
                      placeholder={t('New Password')}
                      onChangeText={(value: string) => onChange(value)}
                      value={value}
                    />
                  )}
                  name="password"
                  rules={{ required: true }}
                />
                {errors.password && <ErrorMsg errorMsg="This is required." />}
                <Controller
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      isPassword
                      // leftIcon={Lock}
                      placeholder={t('Confirm New Password')}
                      onChangeText={(value: string) => onChange(value)}
                      value={value}
                    />
                  )}
                  name="confirmPassword"
                  rules={{ required: true }}
                />
                {errors.confirmPassword && (

                  <ErrorMsg errorMsg="This is required." />
                )}
                {data.password != data.confirmPassword && (

                  <ErrorMsg errorMsg="The password and confirmation password do not match." />
                )}
              </View>
              <View style={Elements.btnContainer} />
              <Button
                locked={!isValid || disableBtn}
                onClick={handleSubmit(onSubmit)}
                title="Confirm"
                txtColor={Colors.WHITE}
              />
            </ContainerView>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
