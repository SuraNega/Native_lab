import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useState } from 'react';



function Index() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [tasks] = useState([
    { id: 1, title: 'Complete project proposal', category: 'Work', time: '2 hours ago' },
    { id: 2, title: 'Buy groceries', category: 'Personal', time: '5 hours ago' },
    { id: 3, title: 'Call dentist', category: 'Personal', time: '1 day ago' },
    { id: 4, title: 'Review budget', category: 'Work', time: '3 hours ago' },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.iconCircle}>
            <Ionicons name="notifications" size={22} color="#2563eb" />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.iconCircle}>
            <Ionicons name="person" size={22} color="#2563eb" />
          </TouchableOpacity> */}
        </View>
        <Text style={[styles.greeting, { color: '#fff', fontSize: 24, fontWeight: 'bold' }]}> Hello, Abebe!</Text>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#6b7280" />
          <TextInput
            style={styles.searchText}
            placeholder="Search tasks..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>
      <View style={styles.progrescard2}>
        <View style={styles.taskHeaderRow}>
          <Text style={styles.taskHeader}>My Tasks</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar} contentContainerStyle={{ paddingHorizontal: 24 }}>
          {['All', 'Work', 'Personal', 'Shopping'].map(filter => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterChip, selectedFilter === filter && styles.filterChipSelected]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[styles.filterChipText, selectedFilter === filter && styles.filterChipTextSelected]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView> */}
        {/* <ScrollView style={styles.taskList} showsVerticalScrollIndicator={false}>
          {tasks.filter(task => selectedFilter === 'All' || task.category === selectedFilter).map(task => (
            <TouchableOpacity key={task.id} style={styles.taskCard} onPress={() => router.push('/task-detail')}>
              <View style={styles.taskTitleRow}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskCategory}>{task.category}</Text>
              </View>
              <Text style={styles.taskTime}>{task.time}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView> */}
      </View>
      <TouchableOpacity style={styles.fab} onPress={() => router.push("/create-task")}>
        <Text style={styles.fabPlus}>  +</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7faff",
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  topSection: {
    backgroundColor: "#2563eb",
    paddingTop: 20,
    paddingBottom: 32,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",

    marginBottom: 18,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },

  greeting: {
    marginBottom: 18,
    textAlign: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    paddingHorizontal: 18,
    height: 48,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
    gap: 10,
    marginTop: -10,
    marginBottom: 20,
  },
  searchText: {
    color: "#6b7280",
    fontSize: 16,
    flex: 1,
    paddingVertical: 0,
    paddingLeft: 0,
  },
  progrescard2: {
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    marginTop: -40,
    backgroundColor: "#f7faff",
    paddingTop: 24,
  },
  taskHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  taskHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  seeAll: {
    color: "#2563eb",
    fontWeight: "500",
    fontSize: 14,
  },
  filterBar: {
    flexDirection: "row",
    marginBottom: 8,
    marginTop: 2,
  },
  filterChip: {
    backgroundColor: "#f5f5f5ff",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 2,
  },
  filterChipSelected: {
    backgroundColor: "#2563eb",
  },
  filterChipText: {
    color: "#2563eb",
    fontSize: 15,
    fontWeight: "500",
  },
  filterChipTextSelected: {
    color: "#fff",
    fontWeight: "700",
  },
  taskList: {
    flex: 1,
    minHeight: 400,
    maxHeight: 750,
  },
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginHorizontal: 24,
    backgroundColor: "#fff",
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
    minHeight: 90,
  },
  taskTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 60,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  taskCategory: {
    color: "#2563eb",
    fontSize: 13,
    marginLeft: 10,
    fontWeight: "500",
    marginTop: 2,
  },
  taskTime: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
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

export default Index;