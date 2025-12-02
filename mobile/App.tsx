import React from "react";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import { WebView } from "react-native-webview";

// TODO: Change this to your deployed VoyagerAI URL,
// e.g. "https://voyagerai.my-domain.com"
// For local development, use your machine IP, e.g. "http://192.168.0.10:3000"
const VOYAGER_URL = "http://localhost:3000";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Platform.OS === "android" ? "#000" : "transparent"}
        translucent={Platform.OS === "android"}
      />
      <WebView
        source={{ uri: VOYAGER_URL }}
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
      />
    </SafeAreaView>
  );
}


