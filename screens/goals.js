import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, Button } from 'react-native'
import { connect } from 'react-redux'
import Moment from 'moment'

class GoalRowManager extends React.Component {

    state = { isExpanded: {} }

    updateExpandedState = (goalId, value) => {
        this.setState({
            isExpanded: { [goalId]: value }
        })
    }

    createNewState = (goalId) => {
        newState = {...this.state.isExpanded, [goalId]: false}
        this.setState({
            isExpanded: newState
        })
    }

    render() {
        try {
            if (this.state.isExpanded[this.props.goalId]) {
                return <GoalRowExpanded key={this.props.goalId} goalId={this.props.goalId} goalName={this.props.name} goalDue={this.props.due}
                tasks={this.props.tasks} updateExpandedState={this.updateExpandedState.bind(this, this.props.goalId, false)} 
                navigation={this.props.navigation} />
            } else {
                return <GoalRow key={this.props.goalId} goalName={this.props.name} goalDue={this.props.due}
                updateExpandedState={this.updateExpandedState.bind(this, this.props.goalId, true)} />
            }
        } catch(TypeError) {
            this.createNewState.bind(this, this.props.goalId)
            return <GoalRow key={this.props.goalId} goalName={this.props.name} goalDue={this.props.due}
                updateExpandedState={this.updateExpandedState.bind(this, this.props.goalId, true)} />
        }
            
    }
}

class GoalRow extends React.Component {
    render() {
        return (
            <View style={styles.goalRow}>
                <View style={styles.goalRowLayout}>
                    <View style={{ flex: 1.5, height: 30 }}>
                        <Text style={styles.goalHeading} numberOfLines={1}>
                            {this.props.goalName}
                        </Text>
                    </View>
                    <View style={{ flex: 1, height: 30 }}>
                        <Text style={styles.goalDue}>
                            Due: {this.props.goalDue}
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
                        {this.props.goalName}
                    </Text>
                    <Text style={styles.goalDueExpanded}>
                        Due: {this.props.goalDue}
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
                        <View style={styles.addTask}>
                            <TouchableOpacity style={styles.addTaskButton} onPress={() => this.props.navigation.navigate('Form', {
                                formType: 'Add Task',
                                goalId: this.props.goalId
                            })}>
                                <Image style={{ height: 25, width: 25 }} source={require('../assets/images/plus.png')} />
                            </TouchableOpacity>
                        </View>
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

    render() {
        const goals = this.props.goals.filter(goal => goal.projectId === this.props.navigation.getParam('projectId')) // needs to be updated to .find()

        return(
            <ScrollView>
                <View style={styles.body}>                  
                    {goals.map(goal => (
                        <GoalRowManager key={goal.Id} goalId={goal.Id} name={goal.name} due={Moment(goal.due).format('DD-MM-YYYY')} 
                        tasks={this.props.tasks.filter(task => task.goalId === goal.Id)} updateExpandedState={this.updateExpandedState} 
                        navigation={this.props.navigation} />
                    ))}
                </View>
                <View style={styles.addGoal}>
                    <TouchableOpacity style={styles.addGoalButton} onPress={() => this.props.navigation.navigate('Form', {
                        formType: 'Add Goal',
                        projectId: this.props.navigation.getParam('projectId')
                    })}>
                        <Image style={{ height: 40, width: 40 }} source={require('../assets/images/plus.png')} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => ({
    goals: state.goals,
    tasks: state.tasks
})

export default connect(mapStateToProps)(ProjectScreen)

const styles = StyleSheet.create({
    body: {
        height: Dimensions.get('window').height,
        backgroundColor: '#f1f1f1',
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
    addGoal: {
        position: 'absolute',
        left: 290,
        top: 490
    },
    addGoalButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        borderWidth: 1,
        borderColor: '#ABCDEF',
        borderRadius: 50,
        backgroundColor: '#ABCDEF'
    },
    addTask: {
        position: 'absolute',
        left: 285,
        top: 165
    },
    addTaskButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        borderWidth: 1,
        borderColor: '#ABCDEF',
        borderRadius: 50,
        backgroundColor: '#ABCDEF'
    }
});