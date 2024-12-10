import React, { useState } from 'react';
import { StatusBar, SectionList, StyleSheet, Text, Alert, TouchableOpacity, View, ScrollView } from 'react-native';
import { datasource } from './Data.js';

const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
    },
    opacityStyle: {
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        marginTop: 10,
    },
    textStyle: {
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        flex: 1,
        fontWeight: 'bold',
    },
    statusStyle: {
        fontSize: 18,
        margin: 10,
        color: 'gray',
        textAlign: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        marginVertical: 10,
        paddingBottom: 5,
    },
    buttonStyle: {
        backgroundColor: '#ADD8E6',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 20,
        width: '70%',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
});

const Home = ({ navigation }) => {
    const renderItem = ({ item, index, section }) => {
        return (
            <TouchableOpacity
                style={styles.opacityStyle}
                onPress={() => {
                    navigation.navigate('Edit', {
                        description: item.description,
                        status: item.status,
                        index: index,
                        type: section.title,
                    });
                }}
            >
                <Text style={styles.textStyle}>{item.description}</Text>
                <Text style={styles.statusStyle}>{item.status ? 'Completed' : 'Not Completed'}</Text>
                <Text style={styles.textStyle}>Due: {new Date(item.dueDate).toDateString()}</Text>
            </TouchableOpacity>
        );
    };

    const calculateOverall = () => {
        let totalTasks = 0;
        let completedTasks = 0;

        datasource.forEach(section => {
            section.data.forEach(task => {
                totalTasks++;
                if (task.status) {
                    completedTasks++;
                }
            });
        });

        const incompleteTasks = totalTasks - completedTasks;
        const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        Alert.alert(
            "Task Summary",
            `Total Tasks: ${totalTasks}\nCompleted Tasks: ${completedTasks}\nIncomplete Tasks: ${incompleteTasks}\nCompletion: ${completionPercentage}%`
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />

            {/* Title */}
            <Text style={styles.titleText}>Task List Manager</Text>

            {/* SectionList (this will be scrollable) */}
            <SectionList
                sections={datasource}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title, tColour, bgColour } }) => (
                    <Text style={[styles.headerText, { backgroundColor: bgColour, color: tColour }]}>
                        {title}
                    </Text>
                )}
                keyExtractor={(item, index) => item.description + index}
                style={{ flex: 1, marginBottom: 30 }}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => navigation.navigate('Add')}
                >
                    <Text style={styles.buttonText}>
                        Add Task
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={calculateOverall}
                    style={styles.buttonStyle}
                >
                    <Text style={styles.buttonText}>
                        Overall Status
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Home;








