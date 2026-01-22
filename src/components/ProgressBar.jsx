import React from "react";
import * as Progress from "react-native-progress";
import { StyleSheet, View, Text } from "react-native";

const ProgressBar = ({ progress, completed, total }) => {
  const percentage = total === 0 ? 0 : Math.round(progress * 100);

  return (
    <View style={styles.container}>
      <Progress.Bar
        progress={progress}
        width={null}
        height={12}
        color="#6366F1"
        unfilledColor="#E5E7EB"
        borderWidth={0}
        borderRadius={6}
      />
      <Text style={styles.text}>
        {completed} of {total} completed ({percentage}%)
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
