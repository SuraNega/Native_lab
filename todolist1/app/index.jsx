import { useRouter } from "expo-router";

import {StyleSheet, View, FlatList, TouchableOpacity, Text } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from "../components/Button";



function Index() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const storedTasks = await AsyncStorage.getItem('tasks');
    setTasks(storedTasks ? JSON.parse(storedTasks) : []);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Tasks</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/task-detail?id=${item.id}`)} style={styles.taskItem}>
            <Text style={styles.taskText}>{item.task}</Text>
          </TouchableOpacity>
        )}
        style={styles.list}
      />

      <CustomButton
        title="+"
        onPress={() => router.push("/create-task")}
        style={styles.fab}
        textStyle={styles.fabPlus}
      />
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7faff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  taskText: {
    fontSize: 18,
    color: '#000',
  },
  fab: {
    position: "absolute",
    right: 32,
    bottom: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2563eb",
    shadowColor: "#2563eb",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  fabPlus: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "bold",
    marginTop: -12,
    marginLeft: -3,
  },
});
