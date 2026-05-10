// https://dribbble.com/shots/24783022-osler-AI-Telehealth-Telemedicine-App-Sign-In-Sign-Up-UI
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

const PRIMARY_GREEN = "#97D700";
const LIGHT_GREY = "#F5F5F5";
const TEXT_DARK = "#2D2D2D";
const TEXT_LIGHT = "#999999";


export default function Index() {
  const [email, setEmail] = useState("ank09yadav@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(true);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [signin , setSignin] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }} 
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <View style={styles.headerSection}>
            <View style={styles.logoWrapper}>
                <Image
                    source={require('@/assets/images/icon.png')}
                    style={{
                      height:40,
                      width:40 ,
                    }}
                />
            </View>
            <Text style={styles.title}>{signin? "Sign UP": "Sign In" }</Text>
            <Text style={styles.subtitle}>Let's enjoy the learnin with chaicode.</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View
                style={[
                  styles.inputWrapper,
                  isEmailFocused && styles.inputWrapperFocused,
                ]}
              >
                <MaterialCommunityIcons
                  name="email-outline"
                  size={24}
                  color={isEmailFocused ? PRIMARY_GREEN : TEXT_LIGHT}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View
                style={[
                  styles.inputWrapper,
                  isPasswordFocused && styles.inputWrapperFocused,
                ]}
              >
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={24}
                  color={isPasswordFocused ? PRIMARY_GREEN : TEXT_LIGHT}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password..."
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <MaterialCommunityIcons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={24}
                    color={TEXT_LIGHT}
                  />
                </TouchableOpacity>
              </View>
              {signin && (
                <>
                 <Text style={styles.label}>Password</Text>
              <View
                style={[
                  styles.inputWrapper,
                  isPasswordFocused && styles.inputWrapperFocused,
                ]}
              >
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={24}
                  color={isPasswordFocused ? PRIMARY_GREEN : TEXT_LIGHT}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password..."
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <MaterialCommunityIcons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={24}
                    color={TEXT_LIGHT}
                  />
                </TouchableOpacity>
              </View>
              </>
              )}
            </View>

            {/* Sign In Button */}
            <TouchableOpacity style={styles.signInButton} activeOpacity={0.8}>
              <Text style={styles.signInButtonText}>Sign In</Text>
              <MaterialCommunityIcons name="arrow-right" size={20} color="#FFF" style={styles.arrowIcon} />
            </TouchableOpacity>

      

            {/* Footer Links */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Don't have an account?{" "}
                <Text onPress={()=> setSignin(!signin)} style={styles.linkText}>Sign Up.</Text>
              </Text>
              <TouchableOpacity>
                <Text style={styles.linkText}>Forgot your password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: "center",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoWrapper: {
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: TEXT_DARK,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: TEXT_LIGHT,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: TEXT_DARK,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 60,
    borderWidth: 1.5,
    borderColor: "#EAEAEA",
    // Subtle shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  inputWrapperFocused: {
    borderColor: PRIMARY_GREEN,
    borderWidth: 2,
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: TEXT_DARK,
  },
  signInButton: {
    backgroundColor: PRIMARY_GREEN,
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: PRIMARY_GREEN,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  signInButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  arrowIcon: {
    marginLeft: 8,
  },

  footer: {
    alignItems: "center",
    marginTop: 40,
    gap: 12,
  },
  footerText: {
    fontSize: 14,
    color: TEXT_DARK,
  },
  linkText: {
    color: PRIMARY_GREEN,
    fontWeight: "600",
  },
});

