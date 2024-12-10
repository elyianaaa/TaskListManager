import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity, Button } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from '@react-native-community/datetimepicker'
import { datasource } from "./Data.js";

const Add = ({ navigation }) => {
    const [taskDescription, setTaskDescription] = useState('');
    const [type, setType] = useState("");
    const [dueDate, setDueDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChangeDate = (event, selectedDate) => {
        if (selectedDate) {
            setDueDate(selectedDate);
            setShowDatePicker(false);
        }

    };

    return (
        <View style={{ padding: 10 }}>
            <View style={{ padding: 10 }}>
                <Text>Task Name:</Text>
                <TextInput
                    style={{ borderWidth: 1 }}
                    placeholder="Enter task description"
                    onChangeText={(text) => setTaskDescription(text)}
                    value={taskDescription}
                />
            </View>

            <View style={{ padding: 10 }}>
                <Text>Select Category:</Text>
                <RNPickerSelect
                    value={type}
                    onValueChange={(value) => setType(value)}
                    items={[
                        { label: "Personal", value: "Personal" },
                        { label: "Work", value: "Work" },
                        { label: "Home", value: "Home" },
                    ]}
                />
            </View>


            <View style={{ padding: 10 }}>
                <Text>Select Due Date:</Text>
                <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    style={{ borderWidth: 1, padding: 10 }}
                >
                    <Text>{dueDate.toDateString()}</Text>
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker
                        value={dueDate}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                    />
                )}
            </View>

            <TouchableOpacity
                onPress={() => {
                    if (!taskDescription || !type) {
                        alert("Please enter a task.");
                        return;
                    }

                    // Find the index of the selected category
                    let categoryIndex = -1;
                    for (let i = 0; i < datasource.length; i++) {
                        if (datasource[i].title === type) {
                            categoryIndex = i;
                            break;
                        }
                    }

                    if (categoryIndex !== -1) {
                        // Add the new task to the selected category
                        const newTask = { description: taskDescription, status: false,  dueDate: dueDate.toISOString()};
                        datasource[categoryIndex].data.push(newTask);
                        navigation.navigate("Home");
                    }
                }}
                style={{
                    backgroundColor: '#ADD8E6',
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    borderRadius: 20,
                    width: '70%',
                }}
            >
                <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
                    Submit Task
                </Text>
            </TouchableOpacity>
        </View>

            );
};

export default Add;
