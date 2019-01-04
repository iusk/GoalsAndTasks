import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import Moment from 'moment'

import CustomScrollView from '../utilities/scroll'
import AddButton from '../utilities/addButton';

class GoalRow extends React.Component {
    render() {
        return (
            <View style={styles.goalRow}>
                <View style={styles.goalRowLayout}>
                    <View style={{ flex: 1.5, height: 30 }}>
                        <Text style={styles.goalHeading} numberOfLines={1}>
                            {this.props.name}
                        </Text>
                    </View>
                    <View style={{ flex: 1, height: 30 }}>
                        <Text style={styles.goalDue}>
                            Due: {this.props.due}
                        </Text>
                    </View>
                </View>
                <View style={styles.downView}>
                    <TouchableOpacity onPress={this.props.updateExpandedState}>
                        <Image style={styles.arrow} source={require('../assets/images/down.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

class GoalRowExpanded extends React.Component {
    render() {
        return (
            <View style={styles.goalRowExpanded}>
                <View style={styles.goalRowLayoutExpanded}>
                    <Text style={styles.goalHeadingExpanded} numberOfLines={2}>
                        {this.props.name}
                    </Text>
                    <Text style={styles.goalDueExpanded}>
                        Due: {this.props.due}
                    </Text>
                    <View style={styles.taskWrapper}>
                        <Text style={{ fontSize: 18, color: '#757575'}}>
                            Tasks:
                        </Text>
                        <View style={styles.taskRow}>
                            <View style={styles.taskRowLayout}>
                                {this.props.tasks.map(task =>
                                        <Task key={task.Id} taskName={task.name} taskDue={Moment(task.due).format('DD-MM-YYYY')} />
                                )}
                            </View>
                        </View>
                        <AddButton
                            onPress={() => this.props.navigation.navigate('Form', {
                                formType: 'Add Task',
                                goalId: this.props.goalId
                            })}
                            size='small'
                        />
                    </View>
                </View>
                <View style={styles.downView}>
                    <TouchableOpacity onPress={this.props.updateExpandedState}>
                        <Image style={styles.arrow} source={require('../assets/images/up.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

class Task extends React.Component {
    render() {
        return (
            <View style={styles.task}>
                <View style={styles.taskLayout}>
                    <View style={{ flex: 1.5, height: 50, justifyContent: 'center' }}>
                        <Text style={styles.taskHeading} numberOfLines={2}>
                            {this.props.taskName}
                        </Text>
                    </View>
                    <View style={{ flex: 1, height: 50, justifyContent: 'center' }} numberOfLines={2}>
                        <Text style={styles.taskDue}>
                            Due: {this.props.taskDue}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

class ProjectScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('projectName', 'Project'),
        };
    };

    state = { isExpanded: {} };

    updateExpandedState = (goalId, value=true) => {
        console.log('updating expanded state')
        let newArray = this.state.isExpanded
        if (goalId in newArray) {
            newArray[goalId] = value
            this.setState({
                isExpanded: newArray
            })
        } else {
            newArray = {...newArray, [goalId]: value}
            this.setState({
                isExpanded: newArray
            })
        }
    }

    render() {
        const goals = this.props.goals.filter(goal => goal.projectId === this.props.navigation.getParam('projectId'))
        return(
            <View style={styles.body}>
                <CustomScrollView
                    content={goals.map(goal => (
                                (this.state.isExpanded[goal.Id]) ?
                                <GoalRowExpanded key={goal.Id} goalId={goal.Id} name={goal.name} due={Moment(goal.due).format('DD-MM-YYYY')} 
                                tasks={this.props.tasks.filter(task => task.goalId === goal.Id)} updateExpandedState={this.updateExpandedState.bind(this, goal.Id, false)} 
                                navigation={this.props.navigation} /> :
                                <GoalRow key={goal.Id} name={goal.name} due={Moment(goal.due).format('DD-MM-YYYY')} updateExpandedState={this.updateExpandedState.bind(this, goal.Id, true)} />
                            ))}
                />
                <AddButton
                    onPress={() => this.props.navigation.navigate('Form', {
                        formType: 'Add Goal',
                        projectId: this.props.navigation.getParam('projectId')
                    })}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    goals: state.goals,
    tasks: state.tasks
})

export default connect(mapStateToProps)(ProjectScreen)

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#FFEB3B',
    },
    goalRow: {
        height: 75,
        borderBottomWidth: 1,
        borderColor: '#9a9a9a',
    },
    goalRowLayout: {
        flex: 1,
        paddingLeft: 30,
        paddingRight: 10,
        paddingTop: 20,
        paddingBottom: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    goalHeading: {
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 'bold',
        height: 25,
    },
    goalDue: {
        textAlign: 'right',
        color: '#757575',
    },
    downView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    arrow: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: '#c0c0c0',
        height: 15,
        width: 30,
    },
    goalRowExpanded: {
        height: 300,
        borderBottomWidth: 1,
        borderColor: '#9a9a9a',
    },
    goalRowLayoutExpanded: {
        paddingLeft: 30,
        paddingRight: 10,
        paddingTop: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flex: 1,
    },
    goalHeadingExpanded: {
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 'bold',
        height: 'auto',
    },
    goalDueExpanded: {
        marginTop: 10,
        color: '#757575',
    },
    taskWrapper: {
        marginTop: 10,
        height: 200,
        flex: 1,
        borderWidth: 1,
    },
    taskRow: {
        marginTop: 10,
        height: 165,
    },
    taskRowLayout: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    task: {
        height: 50,
        marginLeft: 10,
        paddingLeft: 10,
        borderLeftWidth: 1,
        borderColor: '#9a9a9a',
    },
    taskLayout: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    taskHeading: {
        textAlign: 'left',
        fontSize: 15,
    },
    taskDue: {
        fontSize: 15,
        textAlign: 'right',
        color: '#757575',
    },
});