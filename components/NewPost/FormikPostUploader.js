import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, Button } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import Devider from "../Devider";
import validUrl from "valid-url";
import { firebase, db } from "../../firebase";

const PLACEHOLDER_IMG =
  "https://www.brownweinraub.com/wp-content/uploads/2017/09/placeholder.jpg";

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A Url is required"),
  caption: Yup.string().max(2200, "Captiom has reached the character limit."),
});

const FormikPostUploader = ({ navigation }) => {
  const [thumbmailUrl, setThumbmailUrl] = useState(PLACEHOLDER_IMG);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

  const getUsername = () => {
    const user = firebase.auth().currentUser;
    const unsubscribe = db
      .collection("users")
      .where("awner_uid", "==", user.uid)
      .limit(1)
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          setCurrentLoggedInUser({
            username: doc.data().username,
            profilePicture: doc.data().profile_picture,
          });
        })
      );
    return unsubscribe;
  };

  const uploadPopstToFirebase = (imageUrl, caption) => {
    const unsubscribe = db
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .collection("posts")
      .add({
        imageUrl: imageUrl,
        user: currentLoggedInUser.username,
        profile_picture: currentLoggedInUser.profilePicture,
        owner_uid: firebase.auth().currentUser.uid,
        owner_email: firebase.auth().currentUser.email,
        caption: caption,
        createAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes_by_users: [],
        comments: [],
      })
      .then(() => navigation.goBack());
    return unsubscribe;
  };

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(value) => {
        uploadPopstToFirebase(value.imageUrl, value.caption);
      }}
      validationSchema={uploadPostSchema}
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
          <View
            style={{
              margin: 20,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Image
              source={{
                uri: validUrl.isUri(thumbmailUrl)
                  ? thumbmailUrl
                  : PLACEHOLDER_IMG,
              }}
              style={{
                width: 100,
                height: 100,
                marginTop: 5,
                borderRadius: 10,
              }}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <TextInput
                placeholder="Write a caption..."
                placeholderTextColor="white"
                multiline={true}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
                style={{ color: "#fff", fontSize: 20 }}
              />
            </View>
          </View>
          <Devider />
          <TextInput
            onChange={(e) => setThumbmailUrl(e.nativeEvent.text)}
            placeholder="Enter Image Url"
            placeholderTextColor="white"
            onChangeText={handleChange("imageUrl")}
            onBlur={handleBlur("imageUrl")}
            value={values.imageUrl}
            style={{ color: "#fff", fontSize: 18 }}
          />
          {errors.imageUrl && (
            <Text style={{ fontSize: 10, color: "red" }}>
              {errors.imageUrl}
            </Text>
          )}
          <Button onPress={handleSubmit} title="Share" disabled={!isValid} />
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;
