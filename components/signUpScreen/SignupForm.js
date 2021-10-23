import { Formik } from "formik";
import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Yup from "yup";
import Validator from "email-validator";
import { firebase, db } from "../../firebase";

const SignupForm = ({ navigation }) => {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    username: Yup.string()
      .required()
      .min(2, "Your UserName has to have at least 2 characters"),
    password: Yup.string()
      .required()
      .min(6, "Your Password has to have at least 6 characters"),
  });

  const getRendomProfilePicture = async () => {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();
    return data.results[0].picture.large;
  };

  const onSignup = async (email, password, username) => {
    try {
      const authUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log("firebaes Signup sucssesfully", email, password);

      db.collection("users")
        .doc(authUser.user.email)
        .set({
          awner_uid: authUser.user.uid,
          username: username,
          email: authUser.user.email,
          profile_picture: await getRendomProfilePicture(),
        });
    } catch (error) {
      Alert.alert("Oops...!", error.message);
    }
  };

  return (
    <View>
      <Formik
        initialValues={{ email: "", password: "", username: "" }}
        onSubmit={(values) => {
          onSignup(values.email, values.password, values.username);
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            {errors.username && (
              <Text style={{ fontSize: 10, color: "red" }}>
                {errors.username}
              </Text>
            )}
            <View
              style={[
                styles.inputFeilds,

                {
                  borderColor:
                    1 > values.username.length || values.username.length >= 2
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholder="Username"
                placeholderTextColor="#444"
                autoCapitalize="none"
                autoCorrect={true}
                textContentType="username"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                autoFocus={true}
              />
            </View>
            {errors.email && (
              <Text style={{ fontSize: 10, color: "red" }}>{errors.email}</Text>
            )}
            <View
              style={[
                styles.inputFeilds,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholder="Email"
                placeholderTextColor="#444"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>

            {errors.password && (
              <Text style={{ fontSize: 10, color: "red" }}>
                {errors.password}
              </Text>
            )}
            <View
              style={[
                styles.inputFeilds,

                {
                  borderColor:
                    1 > values.password.length || values.password.length >= 6
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholder="Password"
                placeholderTextColor="#444"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Sign Up</Text>
            </Pressable>
            <View style={styles.signUpContainer}>
              <Text>Already have an accout?</Text>
              <TouchableOpacity onPress={() => navigation.push("LoginScreen")}>
                <Text style={{ color: "#0096f6" }}> Log In</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  inputFeilds: {
    backgroundColor: "#fafafa",
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  button: (isValid) => ({
    backgroundColor: isValid ? "#0096f6" : "#9acaf2",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
  }),
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
});

export default SignupForm;
