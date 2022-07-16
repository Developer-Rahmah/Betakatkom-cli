import Icon from 'Cards/assets/images/gold-logo.png';
import { Colors } from 'Cards/assets/styles/Colors';
import General from 'Cards/assets/styles/General';
import ImageStyles from 'Cards/assets/styles/ImageStyles';
import Button from 'Cards/src/components/Button';
import ErrorMsg from 'Cards/src/components/ErrorMsg';
import IconImage from 'Cards/src/components/IconImage';
import Input from 'Cards/src/components/Input';
import Title from 'Cards/src/components/Title';
import { POST } from 'Cards/src/services/config/api';
import { Client } from 'Cards/src/services/config/clients';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'Cards/src/services/helper/Constant';
import LocalStorage from 'Cards/src/services/helper/LocalStorage';
import { validateEmail, validatePassword } from 'Cards/src/services/helper/validation';
import { setAuthTokenAction, setUserIdAction } from 'Cards/src/services/redux/actions';
import { useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function LoginScreen() {
  const [inputValue, setInputValue] = useState(0);
  const [disableBtn, setDisableBtn] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });
  const dispatch = useDispatch();
  const toast = useToast()

  const onSubmit = (data: any) => {
    setDisableBtn(true);

    console.log("data", data);
    Client.post(POST.LOGIN, {
      "data": {
        "username": data.ID,
        "password": data.password
      }
    }, {
      headers: {
        Authorization: "Bearer U2FsdGVkX19L/TXxBCYW+LjgfgVj2h7OMFhbJGkln1DWPRw6cVHRpn5yaK+X1io95q5l+6DsCAGOJlvVyIS5Basg9o5YLTFPEjevjXLL6txm3RKB8FCcMLHt0th9fmvEg3bAVcqyP2JlHHS6BONauz5tXchnBgcUwuB/p6nyTayKUh90pLjhcVf3lvjwvF7/OhRa+CiAD5zFhIRUuSWvZxl/nrXAiD/ozNI3VlGMz6SWlIteEOiUxDDy/3s1NN9wffyfHnScNtlnX6exY8+N9HnV0if0kksDTnRVtyRAYnwhDjx1ZKDWqMDVHjR2IuHLvRzBAntaEIPLUFC+ohVGtJXRxSfocMhV5T1THB7pRqJO3KOEfkPZ+6pW1PVUlgzbevHRd+7Qq0iYJDN3bAw8FArB2wI7XWh6AZuoUcvN9koBAPNn2YkgfkJ3I8d7Y2LH5lwZXvznOJ6bjQgGqYs/3mTefvmzveBzirFNbhqdjJiFtndO8OvF3zBPOPqU2dUtBtcWJUneBkYWouFAhtijWRS5OIk3QHKKsO2dAy3hhS8mcnAZfxoF14KzhIxgDkH1SqGBf7q8Z2Rk/7jC9mFsQtynbAZtlXe/XHeuRp96A4Y="
      }
    }

    )
      .then((res) => {
        // if (res.status == 200) {
        console.log("data", res)
        dispatch(setUserIdAction(data.ID));
        LocalStorage.set('userId', (data.ID + ''));
        dispatch(setAuthTokenAction(res.data.data.id + ''));
        LocalStorage.set('authToken', res.data.data.id + '');
        setDisableBtn(false);
        //}
      })
      .catch(function (error) {
        toast.show({
          title: "error",
          status: "error",
          description: error.message,
          width: SCREEN_WIDTH,
        })
        setDisableBtn(false);
      });
    // dispatch(setUserIdAction(data.ID));
    // LocalStorage.set('userId', data.ID );
    // dispatch(setAuthTokenAction('ffff'));
    // LocalStorage.set('authToken', 'fffff');
  };

  useEffect(() => {

  }, [inputValue])

  return (
    <View style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={General.flex}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={styles.header}>
              <ImageBackground
                source={require("../../../assets/images/header.png")}
                style={styles.imageBackground}
              >


                <IconImage source={Icon} style={[{ marginVertical: 5, width: '100%', height: '50%' }]} />
                <Title title='يتبع لمركز دوار الشهيد - سحاب' color={Colors.WHITE} />

              </ImageBackground>

            </TouchableWithoutFeedback >

            <View style={styles.footer}>


              <Controller

                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input
                    maxLength={10}
                    keyboardType="number-pad"
                    placeholder='ID'
                    onChangeText={(value: string) => { onChange(value), setInputValue(parseInt(value)) }}
                    value={value}
                  />
                )}
                name="ID"
                rules={{
                  required: true,
                  minLength: {
                    value: 10,
                    message: "min length is 5"
                  },

                  maxLength: {
                    value: 10,
                    message: "max length is 5"
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
                rules={{
                  required: true, pattern: {
                    value: validatePassword,
                    message:
                      'Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long',
                  },
                }}
              />
              {errors.password && <ErrorMsg errorMsg='Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long' />}

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Button
                  backgroundColor={Colors.PURPLE}
                  locked={!isValid || disableBtn}
                  onClick={handleSubmit(onSubmit)}
                  title="Login"
                  txtColor={Colors.WHITE}
                />



              </View>




            </View>


          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.paddingBottom}>
        <Title numberOfLines={0} title={`All Copyright reserved for Betakatom.com ${new Date().getFullYear()} | Developed by Stack Soft SSS`} />
      </View>
    </View>
  );
}

const width = Dimensions.get("screen").width;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 1,
    padding: 40
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: '100%'
  },
  paddingBottom: {
    paddingBottom: 30, paddingHorizontal: 10
  },
  firstTxt: {
    marginBottom: 5,
    fontSize: SCREEN_HEIGHT / 40,

  }

});
