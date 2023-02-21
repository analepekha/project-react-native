import React, { useState } from "react";
import * as Font from "expo-font";
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
  Button,
  TouchableWithoutFeedback,
} from "react-native";

// import { KeyboardAvoidingWrapper } from "../componets/KeyboardAvodingWrapper";

const bg_image = require("../assets/images/bg-image.png");

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
    console.log(state);
  };

  return (
    // <KeyboardAvoidingWrapper
    //   behavior={Platform.OS == "ios" ? "padding" : "height"}
    // >
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground source={bg_image} style={styles.image}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.containerForm,
                paddingBottom: isShowKeyboard ? 10 : 66,
              }}
            >
              {/* <View style={styles.avatar}>
              <Image
                source={require("../assets/images/add.png")}
                style={styles.add_image}
              ></Image>
            </View> */}
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? 32 : 43,
                }}
              >
                <Text style={styles.mainText}>Регистрация</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Логин"
                  value={state.login}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Адрес электронной почты"
                  value={state.email}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
                <View style={{ position: "relative" }}>
                  <TextInput
                    style={{ ...styles.input, marginBottom: 0 }}
                    secureTextEntry={true}
                    placeholder="Пароль"
                    value={state.password}
                    onFocus={() => setIsShowKeyboard(true)}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  <TouchableOpacity
                    style={styles.showButton}
                    // onPress={() => {
                    //   setSecureText((prevState) => !prevState);
                    // }}
                  >
                    <Text>Показать</Text>
                    {/* {secureText ? (
                    <Text style={styles.passwordInput}>Show</Text>
                  ) : (
                    <Text style={styles.passwordInput}>Hide</Text>
                  )} */}
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <TouchableOpacity style={styles.button} onPress={keyboardHide}>
                  <Text style={styles.btnText}>Зарегистрироваться</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    ...styles.link,
                    // marginBottom: isShowKeyboard ? 66 : 10,
                  }}
                >
                  <Button
                    // onPress={() => navigation.navigate("Login")}
                    title="Уже есть аккаунт? Войти"
                    style={styles.txtLink}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
    // {/* </KeyboardAvoidingWrapper> */}
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    // justifyContent: "flex-start",
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  containerForm: {
    // flex: 2,
    position: "relative",
    marginTop: "auto",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // marginLeft: 16,
    // marginRight: 16,
    paddingLeft: 16,
    paddingRight: 16,
    // marginBottom: 50,
  },
  form: {
    marginBottom: 0,
  },
  avatar: {
    position: "absolute",
    top: -60,
    left: "50%",
    // transform: [{ translateY: 50 }],
    transform: [{ translateX: -50 }],
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    marginLeft: "auto",
    marginRight: "auto",
  },
  add_image: {
    width: 25,
    position: "absolute",
    bottom: 14,
    right: "-50%",
    transform: [{ translateX: -50 }],
  },
  mainText: {
    // fontFamily: "Roboto-Regular",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginTop: 92,
    marginBottom: 33,
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginBottom: 16,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 16,
    background: "#F6F6F6",
  },
  showButton: {
    position: "absolute",
    top: 15,
    right: 16,
  },
  // txtPassword: {
  //   textAlign: "right",
  // },
  button: {
    backgroundColor: "#FF6C00",
    fontWeight: 400,
    fontSize: 16,
    borderRadius: 100,
    padding: 16,
    marginBottom: 16,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  link: {
    alignItems: "center",
    // marginBottom: 66,
  },
  txtLink: {
    color: "#1B4371",
    fontWeight: 400,
    fontSize: 16,
  },
});
