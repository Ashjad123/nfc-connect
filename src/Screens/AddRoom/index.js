import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Button, Card, Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Persistent storage
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function AddRoomScreen() {
  const [roomName, setRoomName] = useState('');
  const [accessType, setAccessType] = useState('Students'); // Default selection
  const [rooms, setRooms] = useState([]); // Stores added rooms
  const [showForm, setShowForm] = useState(false); // Toggle for form visibility

  // Load stored rooms when the component mounts
  useEffect(() => {
    const loadRooms = async () => {
      const storedRooms = await AsyncStorage.getItem('rooms');
      if (storedRooms) {
        setRooms(JSON.parse(storedRooms));
      }
    };
    loadRooms();
  }, []);

  // Function to store rooms persistently
  const saveRooms = async (updatedRooms) => {
    await AsyncStorage.setItem('rooms', JSON.stringify(updatedRooms));
  };

  // Function to add a room
  const handleAddRoom = () => {
    if (!roomName.trim()) {
      Alert.alert('Error', 'Room name cannot be empty!');
      return;
    }

    const newRoom = {
      id: Date.now().toString(),
      name: roomName,
      access: accessType,
      enabled: true, // Default switch state
    };

    const updatedRooms = [...rooms, newRoom];
    setRooms(updatedRooms);
    saveRooms(updatedRooms); // Store data persistently

    setRoomName('');
    setAccessType('Students');
    setShowForm(false); // Hide form after adding
  };

  // Toggle switch state for room access
  const toggleRoomStatus = async (roomId) => {
    const updatedRooms = rooms.map((room) =>
      room.id === roomId ? { ...room, enabled: !room.enabled } : room
    );

    setRooms(updatedRooms);
    saveRooms(updatedRooms); // Update AsyncStorage
  };

  return (
    <View style={styles.container}>
      {/* Header Title */}
      <Text style={styles.headerTitle}>Manage Room Access</Text>

      {/* Room List Display */}
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.roomCard}>
            <View style={styles.roomDetails}>
              <View>
                <Text style={styles.roomName}>{item.name}</Text>
                <Text style={styles.roomAccess}>Access: {item.access}</Text>
              </View>
            </View>
            <Switch
              value={item.enabled}
              onValueChange={() => toggleRoomStatus(item.id)}
              color="#007AFF"
              style={styles.switchStyle}
            />
          </Card>
        )}
        ListEmptyComponent={
          <Text style={styles.noRoomsText}>No rooms added yet.</Text>
        }
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowForm(!showForm)}>
        <Icon name={showForm ? 'close' : 'plus'} size={28} color="white" />
      </TouchableOpacity>

      {/* Add Room Form (Visible only when showForm is true) */}
      {showForm && (
        <View style={styles.addRoomForm}>
          <Text style={styles.formTitle}>Add New Room</Text>
          <TextInput
            placeholder="Enter Room Name"
            value={roomName}
            onChangeText={setRoomName}
            style={styles.input}
          />

          <View style={styles.accessTypeContainer}>
            {['Students', 'Teachers', 'All'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.accessButton,
                  accessType === type && styles.accessButtonSelected,
                ]}
                onPress={() => setAccessType(type)}>
                <Text
                  style={[
                    styles.accessButtonText,
                    accessType === type && styles.accessButtonTextSelected,
                  ]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Button
            mode="contained"
            onPress={handleAddRoom}
            style={styles.submitButton}>
            Add Room
          </Button>
        </View>
      )}
    </View>
  );
}

// Styles (Light Mode, Smooth UI)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  noRoomsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  roomCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 3, // Subtle shadow effect
  },
  roomDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  roomAccess: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  switchStyle: {
    marginRight: 10, // Ensure proper right alignment
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  addRoomForm: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#ccc',
    fontSize: 16,
    marginBottom: 15,
    paddingVertical: 8,
  },
  accessTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  accessButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#007AFF',
  },
  accessButtonSelected: {
    backgroundColor: '#007AFF',
  },
  accessButtonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  accessButtonTextSelected: {
    color: 'white',
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 10,
  },
});

export default AddRoomScreen;
