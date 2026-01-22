import React from "react";
import * as Progress from "react-native-progress";
import { StyleSheet, View, Text } from "react-native";

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.container}>
      <Progress.Bar
        progress={progress}
        width={null}
        height={10}
        color="#6366F1"
        unfilledColor="#E5E7EB"
        borderWidth={0}
      />
      <Text style={styles.text}>
        {(progress * 100).toFixed(0)}% completed
      </Text>
    </View>
  );
};

export default React.memo(ProgressBar);

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  text: {
    marginTop: 6,
    fontSize: 14,
    color: "#6B7280",
  },
});
