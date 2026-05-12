import {
  Text, View, StyleSheet, useColorScheme, KeyboardAvoidingView, Platform, Switch, TextInput, FlatList, Pressable, StatusBar, ImageBackground
} from "react-native";

const headerBg = require("../../assets/images/ank-background.png");

import { useSafeAreaInsets } from "react-native-safe-area-context";
import MOCK_NOTES, { Note } from "./data"
import { useState } from "react";

export default function Index() {
  const insets = useSafeAreaInsets();
  const [isDark, setIsDark] = useState(useColorScheme() === 'dark');

  // for edit page 
  const [editpage, setEditPage] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [notes, setNotes] = useState<Note[]>(MOCK_NOTES);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  // Flatten and compose styles
  const dynamicHeaderStyle = StyleSheet.flatten([
    { paddingTop: insets.top + 10 },
    { backgroundColor: "rgba(0,0,0,0.3)" }
  ]);
  const headerStyle = StyleSheet.compose(
    styles.header,
    dynamicHeaderStyle
  );

  const renderNoteCard = ({ item }: { item: Note }) => (
    <Pressable
      style={({ pressed }) => [
        styles.noteCard,
        { backgroundColor: isDark ? "#1e1e1e" : "#ffffff", opacity: pressed ? 0.9 : 1 }
      ]}
      //open edit page
      onPress={() => { 
        setEditPage(true);
        setSelectedNoteId(item.id);
      }}
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

  // Edit Page 
  const handleEditNote = (id: string, text: string) => {
    // Update the real MOCK_NOTES array directly
    const noteIndex = MOCK_NOTES.findIndex(n => n.id === id);
    if (noteIndex !== -1) {
      MOCK_NOTES[noteIndex].content = text;
      MOCK_NOTES[noteIndex].updatedAt = new Date().toISOString();
    }

    // Update state to trigger a re-render
    setNotes([...MOCK_NOTES]);
  };
  const editPageCard = ({ item }: { item: Note }) => (
    <Pressable
      style={{ flex: 1 }}
      onPress={() => setEditMode(true)}
    >
      <View style={styles.editPageHeaderCard}>
        <View style={styles.editPage}>
          <Text style={[styles.noteTitle, { color: isDark ? "#fff" : "#000" }]}>{item.title}</Text>
          <Pressable 
            onPress={() => {
              setEditMode(!editMode);
              setEditPage(!editpage);
            }}
            style={[
              styles.saveButton, 
              { backgroundColor: isDark ? "#fff" : "#000" }
            ]}
          >
            <Text style={[
              styles.saveButtonText, 
              { color: isDark ? "#000" : "#fff" }
            ]}>
              Save
            </Text>
          </Pressable>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.editPageContent}>
          <TextInput
            style={[styles.editPageInput, { color: isDark ? "#ccc" : "#333" }]}
            multiline={true}
            value={item.content}
            onChangeText={(text) => handleEditNote(item.id, text)}
          />
        </View>
      </KeyboardAvoidingView>
    </Pressable>
  );

  return (
    <View style={[styles.mainContainer, { backgroundColor: isDark ? "#121212" : "#f5f7fa" }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={isDark ? "#121212" : "#f5f7fa"} />

      <ImageBackground 
        source={headerBg} 
        style={headerStyle}
        resizeMode="cover"
        blurRadius={10}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={[styles.headerTitle, { color: "#fff" }]}>Your Notes</Text>
            <Text style={[styles.headerSubtitle, { color: "rgba(255,255,255,0.8)" }]}>Your personal space...</Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }} 
            thumbColor={isDark ? "#f5dd4b" : "#f4f3f4"}
            value={isDark}
            onValueChange={() => setIsDark(previousState => !previousState)}
          />
        </View>
      </ImageBackground>




      {editpage && selectedNoteId ? (
        <View style={[{ flex: 1, paddingTop: 10 }, { paddingBottom: insets.bottom + 20 }]}>
          {editPageCard({ item: notes.find(n => n.id === selectedNoteId)! })}
        </View>
      ) : (
        <FlatList
          data={notes}
          renderItem={renderNoteCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + 20 }
          ]}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    width: "100%",
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
  editPageHeaderCard: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(150,150,150,0.2)",
  },
  editPage: {
    flexDirection: "row",
    alignItems: "center",
  },
  editPageContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  editPageInput: {
    flex: 1,
    fontSize: 18,
    lineHeight: 28,
    textAlignVertical: "top",
  },
  headerBackground: {
    width: "100%",
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
