import React from 'react'
import { View, StyleSheet, Button, Alert } from 'react-native'

import { CustomTextInput, DateInput } from './components'

export default class ManageTask extends React.Component {
    
    handleSubmit = (addTask) => {
        if (this.refs.taskName.state.inputValue === '') {
            this.refs.taskName.setState({error: true})
        } else {
            addTask(
                this.refs.taskName.state.inputValue,
                this.refs.taskDue.state.selectedValue,
                this.props.navigation.getParam('goalId')
            )
            Alert.alert(
                'Success!',
                'Your Task Has been added',
                [
                    {text: 'Ok', onPress: () => this.props.navigation.pop() }
                ],
                { cancelable: false }
            )
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <CustomTextInput ref= 'taskName' label='Task Name' />
                <DateInput ref='taskDue' label='Due' />
                <View style={styles.submitButton}>
                    <Button title='Submit' onPress={this.handleSubmit.bind(this, this.props.addTask)} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        margin: 20,
        marginTop: 40,
    },
    submitButton: {
        marginTop: 15
    }
})