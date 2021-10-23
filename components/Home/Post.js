import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Devider from "../Devider";
import { firebase, db } from "../../firebase";

const postFooterIcons = [
  {
    name: "Like",
    imageUrl:
      "https://img.icons8.com/fluency-systems-regular/60/000000/like--v1.png",
    likedImageUrl: "https://img.icons8.com/ios-glyphs/30/fa314a/like--v1.png",
  },
  {
    name: "comment",
    imageUrl:
      "https://img.icons8.com/material-outlined/24/000000/speech-bubble--v1.png",
  },
  {
    name: "Share",
    imageUrl:
      "https://img.icons8.com/fluency-systems-regular/24/000000/sent.png",
  },
  {
    name: "Save",
    imageUrl:
      "https://img.icons8.com/fluency-systems-regular/48/000000/bookmark-ribbon--v2.png",
  },
];

const Post = ({ post }) => {
  const handleLike = (post) => {
    const currentLikeStatus = !post.likes_by_users.includes(
      firebase.auth().currentUser.email
    );
    db.collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.email
            )
          : firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.email
            ),
      })
      .then(() => {
        console.log("sucess");
      })
      .catch((err) => {
        console.error("eroorwe", err);
      });
  };
  return (
    <View style={{ marginBottom: 30 }}>
      <Devider />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginLeft: 15, marginRight: 15, marginTop: 10 }}>
        <PostFooter post={post} handleLike={handleLike} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 5,
        marginTop: -6,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: post.profile_picture }} style={styles.story} />
        <Text style={{ marginLeft: 5, fontWeight: "700" }}>{post.user}</Text>
      </View>
      <Text style={{ fontWeight: "900" }}>...</Text>
    </View>
  );
};

const PostImage = ({ post }) => (
  <View style={{ width: "100%", height: 450 }}>
    <Image
      source={{ uri: post.imageUrl }}
      style={{
        height: "100%",
        resizeMode: "cover",
        borderRadius: 10,
        marginTop: 5,
      }}
    />
  </View>
);

const PostFooter = ({ handleLike, post }) => (
  <View
    style={{
      flexDirection: "row",

      justifyContent: "space-between",
    }}
  >
    <View
      style={{
        flexDirection: "row",
        width: "35%",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={() => handleLike(post)}>
        <Image
          style={styles.footerIcon}
          source={{
            uri: post.likes_by_users.includes(firebase.auth().currentUser.email)
              ? postFooterIcons[0].likedImageUrl
              : postFooterIcons[0].imageUrl,
          }}
        />
      </TouchableOpacity>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
      <Icon
        imgStyle={[styles.footerIcon, styles.shareIcon]}
        imgUrl={postFooterIcons[2].imageUrl}
      />
    </View>
    <View>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
    </View>
  </View>
);

const Icon = ({ imgUrl, imgStyle }) => (
  <TouchableOpacity>
    <Image source={{ uri: imgUrl }} style={imgStyle} />
  </TouchableOpacity>
);

const Likes = ({ post }) => (
  <View style={{ marginTop: 4, flexDirection: "row" }}>
    <Text style={{ fontWeight: "600" }}>
      {post.likes_by_users.length.toLocaleString("en")} Likes
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text>
      <Text style={{ fontWeight: "900" }}>{post.user}: </Text>
      <Text>{post.caption}</Text>
    </Text>
  </View>
);

const CommentSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text style={{ color: "gray" }}>
        View {post.comments.length > 1 ? "all" : ""} {post.comments.length} {""}
        {post.comments.length > 1 ? "comments" : "comment"}
      </Text>
    )}
  </View>
);

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View style={{ marginTop: 5, flexDirection: "row" }} key={index}>
        <Text>
          <Text style={{ fontWeight: "900" }}>{comment.user}: </Text>
          <Text>{comment.comment}</Text>
        </Text>
      </View>
    ))}
  </>
);

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: "#FF4267",
  },
  shareIcon: {
    transform: [{ rotate: "320deg" }],
    marginTop: -3,
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
});

export default Post;
