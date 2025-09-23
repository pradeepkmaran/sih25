import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';

export default function HomeScreen() {
  if (Platform.OS === 'web') {
    return <iframe src="https://sih25-taupe.vercel.app" style={{ flex: 1, width: '100%', height: '100%', border: 'none' }} />;
  }
  return <WebView source={{ uri: "https://sih25-taupe.vercel.app" }} />;
}
