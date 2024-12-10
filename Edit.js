import { datasource } from './Data.js';
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { Button, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

const Edit = ({ navigation, route }) => {
    const [taskDescription, setTaskDescription] = useState(route.params.description);
    const [taskStatus, setTaskStatus] = useState(route.params.status);
    const [dueDate, setDueDate] = useState(route.params.dueDate ? new Date(route.params.dueDate) : new Date());


    const [showDatePicker, setShowDatePicker] = useState(false);

    const toggleStatus = (itemValue) => {
        // Update the task status
        setTaskStatus(itemValue === 'Completed'); // Set to true for 'Completed' and false for 'Not Completed'

        // Find the task in the datasource and update its status
        const category = route.params.type;
        const taskIndex = route.params.index;

        // Update the status in the datasource array
        datasource.forEach(section => {
            if (section.title === category) {
                section.data[taskIndex].status = itemValue === 'Completed';
            }
        });
    };

    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(false); // Close the picker after selection
        if (selectedDate) {
            setDueDate(new Date(selectedDate)); // Ensure the selected date is a valid Date object
        }
    };



    return (
        <View>
            <Text>Task Description:</Text>
            <TextInput
                value={taskDescription}
                style={{ borderWidth: 1 }}
                onChangeText={(text) => setTaskDescription(text)}
            />

            <View style={{ margin: 10 }}>
                <TouchableOpacity
                    onPress={() => {
                        const sectionIndex = datasource.findIndex(
                            (section) => section.title === route.params.type
                        );

                        if (sectionIndex !== -1) {
                            // Update the task in the datasource
                            const task = datasource[sectionIndex].data[route.params.index];
                            task.description = taskDescription;
                            task.status = taskStatus;
                            task.dueDate = dueDate; // Save the due date as well

                            navigation.navigate("Home");
                        } else {
                            Alert.alert("Error", "Category not found.");
                        }
                    }}
                    style={{
                        backgroundColor: '#ADD8E6',
                        paddingVertical: 12,
                        paddingHorizontal: 24,
                        borderRadius: 20,
                        width: '70%',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ margin: 10 }}>
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert("Are you sure?", "This task will be deleted.", [
                            {
                                text: "Yes",
                                onPress: () => {
                                    const sectionIndex = datasource.findIndex(
                                        (section) => section.title === route.params.type
                                    );

                                    if (sectionIndex !== -1) {
                                        datasource[sectionIndex].data.splice(route.params.index, 1);
                                        navigation.navigate("Home");
                                    }
                                },
                            },
                            { text: "No" },
                        ]);
                    }}
                    style={{
                        backgroundColor: '#EC8E8E',
                        paddingVertical: 12,
                        paddingHorizontal: 24,
                        borderRadius: 20,
                        width: '70%',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                        Delete
                    </Text>
                </TouchableOpacity>
            </View>

            <Text>Task Status:</Text>
            <RNPickerSelect
                value={taskStatus === true ? 'Completed' : 'Not Completed'}
                onValueChange={(itemValue) => toggleStatus(itemValue)} // Update status when selection changes
                items={[
                    { label: 'Not Completed', value: 'Not Completed' },
                    { label: 'Completed', value: 'Completed' },
                ]}
            />

            <Text>Select Due Date:</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
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


    );
};

export default Edit;

