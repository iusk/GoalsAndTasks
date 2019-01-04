import React from 'react'
import { View, StyleSheet, Button, Alert } from 'react-native'

import { CustomTextInput, DateInput } from './components'

export default class ManageGoal extends React.Component {

    handleSubmit = (addGoal) => {
        if (this.refs.goalName.state.inputValue === '') {
            this.refs.goalName.setState({error: true})
        } else {
            addGoal(
                this.refs.goalName.state.inputValue,
                this.refs.goalDue.state.selectedValue,
                this.props.navigation.getParam('projectId')
            )
            Alert.alert(
                'Success!',
                'Your Goal Has been added',
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
                <CustomTextInput ref= 'goalName' label='Goal Name' />
                <DateInput ref='goalDue' label='Due' />
                <View style={styles.submitButton}>
                    <Button title='Submit' onPress={this.handleSubmit.bind(this, this.props.addGoal)} />
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