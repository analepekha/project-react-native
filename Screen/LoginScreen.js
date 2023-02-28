import React, { useState, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

SplashScreen.preventAutoHideAsync();

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const onFocusEmail = () => {
    setIsFocusedEmail(true);
    setIsShowKeyboard(true);
  };
  const onBlurEmail = () => {
    setIsFocusedEmail(false);
    setIsShowKeyboard(false);
  };

  const onFocusPassword = () => {
    setIsFocusedPassword(true);
    setIsShowKeyboard(true);
  };
  const onBlurEPassword = () => {
    setIsFocusedPassword(false);
    setIsShowKeyboard(false);
  };

  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
    console.log(state);
  };

  const handleSubmit = () => {
    console.log({ state });
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          source={require("../assets/images/bg-image.png")}
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.containerForm,
                paddingBottom: isShowKeyboard ? 10 : 132,
              }}
            >
              <Text style={styles.mainText}>Войти</Text>
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? 32 : 43,
                }}
              >
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isFocusedEmail ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isFocusedEmail ? "#fff" : "#F6F6F6",
                  }}
                  placeholder="Адрес электронной почты"
                  value={state.email}
                  onFocus={onFocusEmail}
                  onBlur={onBlurEmail}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
                <View style={{ position: "relative" }}>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: isFocusedPassword ? "#FF6C00" : "#E8E8E8",
                      backgroundColor: isFocusedPassword ? "#fff" : "#F6F6F6",
                    }}
                    secureTextEntry={isSecureEntry}
                    placeholder="Пароль"
                    value={state.password}
                    onFocus={onFocusPassword}
                    onBlur={onBlurEPassword}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  <TouchableOpacity
                    style={styles.showButton}
                    activeOpacity={0.8}
                    onPress={() => {
                      setIsSecureEntry((prevState) => !prevState);
                    }}
                  >
                    <Text style={styles.txtShowBtn}>
                      {isSecureEntry ? "Показать" : "Скрыть"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.8}
                  onPress={handleSubmit}
                >
                  <Text style={styles.btnText}>Войти</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    ...styles.link,
                    // marginBottom: isShowKeyboard ? 10 : 66,
                  }}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("RegistrationScreen")}
                >
                  <Text style={styles.txtLink}>
                    Нет аккаунта? Зарегистрироваться
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  containerForm: {
    position: "relative",
    marginTop: "auto",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
  },
  form: {
    marginBottom: 0,
  },
  mainText: {
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginTop: 32,
    marginBottom: 33,
  },
  input: {
    fontFamily: "Roboto-Regular",
    height: 50,
    borderWidth: 1,
    marginBottom: 16,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#F6F6F6",
  },
  showButton: {
    position: "absolute",
    top: 15,
    right: 16,
  },
  txtShowBtn: {
    color: "#1B4371",
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    padding: 16,
    marginBottom: 16,
  },
  btnText: {
    fontFamily: "Roboto-Regular",
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  link: {
    alignItems: "center",
    // marginBottom: 66,
  },
  txtLink: {
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    fontSize: 16,
  },
});
