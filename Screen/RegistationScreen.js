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
  login: "",
  email: "",
  password: "",
  avatar: null,
};

SplashScreen.preventAutoHideAsync();

export default function RegistationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

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

  const addAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setState((prevState) => ({ ...prevState, avatar: result.assets[0].uri }));
    }
  };

  const removeAvatar = () => {
    setState((prevState) => ({ ...prevState, avatar: null }));
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
                paddingBottom: isShowKeyboard ? 10 : 66,
              }}
            >
              <View style={styles.avatar}>
                {state.avatar && (
                  <Image
                    source={{ uri: state.avatar }}
                    style={{ width: 120, height: 120, borderRadius: 16 }}
                  />
                )}
                {state.avatar ? (
                  <TouchableOpacity
                    style={styles.avatarBtn}
                    onPress={removeAvatar}
                    activeOpacity={0.5}
                  >
                    <AntDesign name="closecircleo" size={24} color="#E8E8E8" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.avatarBtn}
                    onPress={addAvatar}
                    activeOpacity={0.5}
                  >
                    <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                  </TouchableOpacity>
                )}
              </View>

              <Text style={styles.mainText}>Регистрация</Text>
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? 32 : 43,
                }}
              >
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
                  <TouchableOpacity style={styles.showButton}>
                    <Text>Показать</Text>
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
                    // marginBottom: isShowKeyboard ? 10 : 66,
                  }}
                >
                  <Text style={styles.txtLink}>Уже есть аккаунт? Войти</Text>
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
  avatar: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    marginLeft: "auto",
    marginRight: "auto",
  },
  avatarBtn: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
    position: "absolute",
    bottom: 14,
    right: "-50%",
    transform: [{ translateX: -50 }],
    borderRadius: "50%",
    backgroundColor: "#fff",
  },
  mainText: {
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginTop: 92,
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
  // txtPassword: {
  //   textAlign: "right",
  // },
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

// const [dimensions, setDimensions] = useState(
//   Dimensions.get("window").width - 16 * 2
// );

// useEffect(() => {
//   const onChange = () => {
//     const width = Dimensions.get("window").width - 16 * 2;
//     setDimensions(width);
//   };
//   const subscription = Dimensions.addEventListener("change", onChange);
//   return () => subscription?.remove();
// }, []);

//  {
//    secureText ? (
//      <Text style={styles.passwordInput}>Show</Text>
//    ) : (
//      <Text style={styles.passwordInput}>Hide</Text>
//    );
//  }
