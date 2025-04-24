import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export function useTheme(
) {
  const userTheme = useColorScheme() ?? 'light';
  // console.log('User Theme:', userTheme);
  
  const colorFromProps = Colors[userTheme];
  return colorFromProps;  
}
