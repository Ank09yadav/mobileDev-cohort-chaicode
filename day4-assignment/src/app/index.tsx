import {
  Text, View, StyleSheet, useColorScheme, KeyboardAvoidingView, Platform, Switch, FlatList, Pressable, StatusBar
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import MOCK_NOTES, { Note } from "./data"
import { useState } from "react";

export default function Index() {
  const insets = useSafeAreaInsets();
  const [isDark, setIsDark] = useState(useColorScheme() === 'dark');
  

  const headerStyle = StyleSheet.flatten([
    styles.header,
    { paddingTop: insets.top + 10 }
  ]);

  const renderNoteCard = ({ item }: { item: Note }) => (
    <Pressable 
      style={({ pressed }) => [
        styles.noteCard,
        { backgroundColor: isDark ? "#1e1e1e" : "#ffffff", opacity: pressed ? 0.9 : 1 }
      ]}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.noteTitle, { color: isDark ? "#fff" : "#000" }]} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>Note</Text>
        </View>
      </View>
      
      <Text style={[styles.noteContent, { color: isDark ? "#ccc" : "#666" }]} numberOfLines={3}>
        {item.content}
      </Text>
      
      <View style={styles.cardFooter}>
        <Text style={styles.noteDate}>
          {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </Text>
        <Text style={styles.readMore}>View Details →</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={[styles.mainContainer, { backgroundColor: isDark ? "#121212" : "#f5f7fa" }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={isDark ? "#121212" : "#f5f7fa"} />
      
      <View style={headerStyle}>
        <View>
          <Text style={[styles.headerTitle, { color: isDark ? "#fff" : "#000" }]}>Your Notes</Text>
          <Text style={styles.headerSubtitle}>Your personal space...</Text>
        </View>
        <Switch 
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDark ? "#f5dd4b" : "#f4f3f4"}
          value={isDark}
          onValueChange={() => setIsDark(previousState => !previousState)}
        />
      </View>

      <FlatList
        data={MOCK_NOTES}
        renderItem={renderNoteCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 20 }
        ]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  noteCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    // Elevation for Android
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
    marginRight: 10,
  },
  categoryBadge: {
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    color: "#007AFF",
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  noteContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0,0,0,0.05)",
    paddingTop: 12,
  },
  noteDate: {
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
  },
  readMore: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "600",
  },
});
