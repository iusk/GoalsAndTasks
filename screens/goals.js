import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Moment from 'moment'
import { Header } from 'react-navigation'

import CustomScrollView from '../utilities/scroll'
import AddButton from '../utilities/addButton';

class GoalRow extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.updateExpandedState}>
                <View style={styles.goalRow}>
                    <View style={styles.goalRowLayout}>
                        <View style={{ flex: 1.5, height: 30 }}>
                            <Text style={styles.goalHeading} numberOfLines={1}>
                                {this.props.name}
                            </Text>
                        </View>
                        {(this.props.due !== '') ?
                            <View style={{ flex: 1, height: 30 }}>
                                <Text style={styles.goalDue}>
                                    Due: {this.props.due}
                                </Text>
                            </View> 
                            : null 
                        }
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

class GoalRowExpanded extends React.Component {

    buildCustomHeight = () => {
        let height = 75
        if (this.props.due !== '') {
            height += 15
        }
        if (this.props.tasks.length > 0) {
            height += 210
        }
        return height
    }

    showDue = this.props.due !== ''
    showTasks = this.props.tasks.length > 0

    render() {
        return (
            <View style={goalRowExpanded(this.buildCustomHeight())}>
                <View style={styles.goalRowLayoutExpanded}>
                    <TouchableOpacity onPress={this.props.updateExpandedState}>
                        <Text style={styles.goalHeadingExpanded} numberOfLines={2}>
                            {this.props.name}
                        </Text>
                    </TouchableOpacity>
                    {(this.showDue) ?
                    <Text style={styles.goalDueExpanded}>
                        Due: {this.props.due}
                    </Text> : null}
                    {(this.showTasks) ?
                    <View style={styles.taskWrapper}>
                        <Text style={{ fontSize: 18, color: '#757575'}}>
                            Tasks:
                        </Text>
                        <View style={styles.taskRow}>
                            <View style={styles.taskRowLayout}>
                            <CustomScrollView
                                content={this.props.tasks.map(task =>
                                        <Task key={task.Id} taskName={task.name} taskDue={this.props.formatDate(task.due)} />
                                )}
                                maxHeight={165}
                            />
                            </View>
                        </View>
                        <AddButton
                            onPress={() => this.props.navigation.navigate('Form', {
                                formType: 'Add Task',
                                goalId: this.props.goalId
                            })}
                            size='small'
                        />
                    </View>: 
                    <AddButton
                        onPress={() => this.props.navigation.navigate('Form', {
                            formType: 'Add Task',
                            goalId: this.props.goalId
                        })}
                        size='small-noTask'
                    />}
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
                    {(this.props.taskDue !== '') ?
                        <View style={{ flex: 1, height: 50, justifyContent: 'center' }} numberOfLines={2}>
                            <Text style={styles.taskDue}>
                                Due: {this.props.taskDue}
                            </Text>
                        </View> : null
                    }
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

    formatDate(date) {
        if (date === '') {
            return ''
        } else {
            return Moment(date).format('DD-MM-YYYY')
        }
    }

    render() {
        const goals = this.props.goals.filter(goal => goal.projectId === this.props.navigation.getParam('projectId'))
        return(
            <View style={styles.body}>
                <CustomScrollView
                    content={goals.map(goal => (
                                (this.state.isExpanded[goal.Id]) ?
                                <GoalRowExpanded key={goal.Id} goalId={goal.Id} name={goal.name} due={this.formatDate(goal.due)} 
                                tasks={this.props.tasks.filter(task => task.goalId === goal.Id)} updateExpandedState={this.updateExpandedState.bind(this, goal.Id, false)} 
                                navigation={this.props.navigation} formatDate={this.formatDate} /> :
                                <GoalRow key={goal.Id} name={goal.name} due={this.formatDate(goal.due)} updateExpandedState={this.updateExpandedState.bind(this, goal.Id, true)} />
                            ))}
                    maxHeight={Dimensions.get('window').height - Header.HEIGHT}
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

const goalRowExpanded = (height) => {
    return {
        height: height,
        borderBottomWidth: 1,
        borderColor: '#9a9a9a',
    }
}