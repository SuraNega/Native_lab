import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomInputText from '../components/InputText'
import CustomButton from '../components/Button'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const Create_task = () => {
  const router = useRouter();
  const [task, setTask] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [description, setDescription] = useState('');

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <View style={styles.container}>
     
    <Text style={styles.label}>Task Name</Text>
      <CustomInputText
        placeholder="Task Name"
        value={task}
        onChangeText={setTask}
      />
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoryLabel}>Category</Text>
        <View style={styles.categoriesRow}>
          {['Personal', 'Work', 'Shopping'].map(category => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryButton, selectedCategories.includes(category) && styles.categoryButtonSelected]}
              onPress={() => toggleCategory(category)}
            >
              <Text style={[styles.categoryText, selectedCategories.includes(category) && styles.categoryTextSelected]}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
          <Text style={styles.dateText}>{selectedDate.toDateString()}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.timeContainer}>
        <View style={styles.timeSubContainer}>
          <Text style={styles.timeLabel}>Start Time</Text>
          <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={styles.timeButton}>
            <Text style={styles.timeText}>{startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true})}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timeSubContainer}>
          <Text style={styles.timeLabel}>End Time</Text>
          <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={styles.timeButton}>
            <Text style={styles.timeText}>{endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true})}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.label}>Description</Text>
      <CustomInputText
        placeholder="Enter detailed description..."
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
        style={{ height: 100, textAlignVertical: 'top' }}
      />

      
      <CustomButton title="Create Task" onPress={async () => {
          const title = "Task submitted";
    const message = `Task: ${task}\nCategory: ${selectedCategories.join(', ')}\nDate: ${selectedDate.toDateString()} \nStart Time: ${startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true})}\nEnd Time: ${endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true})}\nDescription: ${description}`;
    Alert.alert(title, message, [
      {text:"cancel", style:"cancel"},
      {text:"OK",
        onPress: async () => {
          const newTask = {
            id: Date.now(),
            task,
            categories: selectedCategories,
            date: selectedDate,
            startTime,
            endTime,
            description
          };
          const storedTasks = await AsyncStorage.getItem('tasks');
          const tasks = storedTasks ? JSON.parse(storedTasks) : [];
          tasks.push(newTask);
          await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
          setTask('');
          setSelectedCategories([]);
          setSelectedDate(new Date());
          setStartTime(new Date());
          setEndTime(new Date());
          setDescription('');
          router.push('/');
        },
      },
    ]);
      }} />
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={(date) => {
          setSelectedDate(date);
          setShowDatePicker(false);
        }}
        onCancel={() => setShowDatePicker(false)}
      />
      <DateTimePickerModal
        isVisible={showStartTimePicker}
        mode="time"
        onConfirm={(time) => {
          setStartTime(time);
          setShowStartTimePicker(false);
        }}
        onCancel={() => setShowStartTimePicker(false)}
      />
      <DateTimePickerModal
        isVisible={showEndTimePicker}
        mode="time"
        onConfirm={(time) => {
          setEndTime(time);
          setShowEndTimePicker(false);
        }}
        onCancel={() => setShowEndTimePicker(false)}
      />
    </View>
  )
}
//  const handleSubmit = () => {
//   const title = "Task submitted";
//   const message = 'Task: ${taskName}\nCategory: ${categopry}\nDate: ${date} \nStart Time: ${startTime}\nEnd Time: ${endTime}\nDescription: ${description}';
//   Alert.alert(title, message, [
//     {text:"cancel", style:"cancel"},
//     {text:"OK",
//       onPress: () => {
//         setTaskName('');
//         setCategory('');
//         setDate('');
//         setStartTime('');
//         setEndTime('');
//         setDescription('');
//       },
//     },
//   ]);
// }
export default Create_task

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7faff",
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 18,
    color: '#2563eb',
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
  },
  categoriesContainer: {
    marginTop: 20,
  },
  categoryLabel: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryButtonSelected: {
    backgroundColor: '#2563eb',
  },
  categoryText: {
    fontSize: 16,
    color: '#000',
  },
  categoryTextSelected: {
    color: '#fff',
  },
  dateContainer: {
    marginTop: 20,
  },
  dateLabel: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
  },
  dateButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  timeSubContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  timeLabel: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
  },
  timeButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  timeText: {
    fontSize: 16,
    color: '#000',
  },
})