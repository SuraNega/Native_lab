import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskDetail = () => {
  const { id } = useLocalSearchParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const loadTask = async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];
      const foundTask = tasks.find(t => t.id == id);
      if (foundTask) {
        setTask({
          ...foundTask,
          date: new Date(foundTask.date),
          startTime: new Date(foundTask.startTime),
          endTime: new Date(foundTask.endTime)
        });
      }
    };
    loadTask();
  }, [id]);

  if (!task) return <View style={styles.container}><Text>Loading...</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.task}</Text>
      <Text style={styles.detail}>Categories: {task.categories.join(', ')}</Text>
      <Text style={styles.detail}>Date: {task.date.toDateString()}</Text>
      <Text style={styles.detail}>Start Time: {task.startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true})}</Text>
      <Text style={styles.detail}>End Time: {task.endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true})}</Text>
      <Text style={styles.detail}>Description: {task.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7faff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
});

export default TaskDetail;