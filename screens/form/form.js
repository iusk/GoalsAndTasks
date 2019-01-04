import React from 'react'
import { connect } from 'react-redux'

import { addProject, addGoal, addTask } from '../../data/action'
import ManageProject from './project'
import ManageGoal from './goal'
import ManageTask from './task'

class FormScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('formType', 'Form'),
        };
    };

    render() {
        navigation = this.props.navigation
        switch (this.props.navigation.getParam('formType')) {
            case 'Add Project':  
                return <ManageProject addProject={this.props.addProject} navigation={this.props.navigation} />
            case 'Add Goal':
                return <ManageGoal addGoal={this.props.addGoal} navigation={this.props.navigation} />
            case 'Add Task':
                return <ManageTask addTask={this.props.addTask} navigation={this.props.navigation} />
            default:
                return null
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    addProject: (name, color) => dispatch(addProject(name, color)),
    addGoal: (name, due, projectId) => dispatch(addGoal(name, due, projectId)),
    addTask: (name, due, goalId) => dispatch(addTask(name, due, goalId))
})

export default connect(null,mapDispatchToProps)(FormScreen)