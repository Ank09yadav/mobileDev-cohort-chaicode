import { KeyboardAvoidingView, StyleSheet, View ,Text , Platform, Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={[{flex:1},styles.container]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height" }>
    <View>
        <Image source={require('@/assets/images/icon.png')} style={{height:200, width:300}} />

      <Text style={styles.textStyle} >Hello this is Text </Text>
    </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color:"black",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle:{
    color:"black",
    marginTop:30,
    fontSize:20
     
  }
});
