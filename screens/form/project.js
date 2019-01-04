import React from 'react'
import { View, StyleSheet, Button, Alert } from 'react-native'

import { CustomTextInput, DropDownInput } from './components'

export default class ManageProject extends React.Component {

    handleSubmit = (addProject) => {
        if (this.refs.projectName.state.inputValue === '') {
            this.refs.projectName.setState({error: true})
        } else {
            addProject(
                this.refs.projectName.state.inputValue,
                this.refs.color.state.selectedValue
            )
            Alert.alert(
                'Success!',
                'Your Project Has been added',
                [
                    {text: 'Ok', onPress: () => navigation.pop() }
                ],
                { cancelable: false }
            )
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <CustomTextInput ref= 'projectName' label='Project Name' />
                <DropDownInput
                    ref='color'
                    label='Color'
                    values={[
                        {label: 'Default', value: '#ABABEF'}, 
                        {label: 'Red', value: '#E74C3C'}, 
                        {label: 'Green', value: '#52BE80'}] } 
                />
                <View style={styles.submitButton}>
                    <Button title='Submit' onPress={this.handleSubmit.bind(this, this.props.addProject)} />    
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