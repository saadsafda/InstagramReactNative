import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Devider from "../Devider";

export const bottomTabIcons = [
  {
    name: "Home",
    active: "https://img.icons8.com/fluency-systems-filled/144/000000/home.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/48/000000/home.png",
  },
  {
    name: "Search",
    active: "https://img.icons8.com/ios-filled/500/000000/search--v1.png",
    inactive: "https://img.icons8.com/ios/500/000000/search--v1.png",
  },
  {
    name: "Reels",
    active: "https://img.icons8.com/ios-filled/50/000000/instagram-reel.png",
    inactive: "https://img.icons8.com/ios/500/000000/instagram-reel.png",
  },
  {
    name: "Shop",
    active:
      "https://img.icons8.com/fluency-systems-filled/48/000000/shopping-bag-full.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/48/000000/shopping-bag-full.png",
  },
  {
    name: "Profile",
    active: "https://avatars.githubusercontent.com/u/72243425?s=120&v=4",
    inactive: "https://avatars.githubusercontent.com/u/72243425?s=120&v=4",
  },
];

const BottomTabs = ({ icons }) => {
  const [activeTab, setActiveTab] = useState("Home");

  const Icon = ({ icon }) => (
    <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
      <Image
        source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }}
        style={[
          styles.icon,
          icon.name === "Profile" ? styles.profilePic() : null,
          activeTab === "Profile" && icon.name === activeTab
            ? styles.profilePic(activeTab)
            : null,
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <View>
      <Devider />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          height: 50,
          paddingTop: 10,
        }}
      >
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
  profilePic: (activeTab = "") => ({
    borderRadius: 50,
    borderWidth: activeTab === "Profile" ? 2 : 0,
    borderColor: "#000",
  }),
});

export default BottomTabs;
