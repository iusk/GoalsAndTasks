import React from 'react'
import { StyleSheet, Picker } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment'

export class CustomTextInput extends React.Component {

    state = { inputValue: '', error: false }

    render() {
        return(
            <React.Fragment>
                <FormLabel labelStyle={styles.label}>{this.props.label}</FormLabel>
                <FormInput 
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.inputText}
                    onChangeText={(text) => this.setState({inputValue: text})} />
                {this.state.error ?
                <FormValidationMessage>This field is required</FormValidationMessage> : null}
            </React.Fragment>
        )
    }
}

export class DateInput extends React.Component {
    state = { selectedValue: '', displayValue: '', isDatePickerVisible: false }

    manageDatePickerVisibility = (boolValue) => {
        this.setState({isDatePickerVisible: boolValue})
    }

    handleDatePicked = (date) => {
        this.setState({
            selectedValue: date,
            displayValue: Moment(date).format('DD-MM-YYYY')
        })
        this.manageDatePickerVisibility(false)
    }

    clear = () => {
        this.setState({
            selectedValue: '',
            displayValue: ''
        })
    }

    render() {
        return(
            <React.Fragment>
                <FormLabel labelStyle={styles.label}>{this.props.label}</FormLabel>
                <FormInput
                    ref='dateInput'
                    value={this.state.displayValue}
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.inputText}
                    onTouchStart={this.manageDatePickerVisibility.bind(this, true)}
                    onChangeText={this.clear}
                />
                <DateTimePicker
                    mode='date'
                    isVisible={this.state.isDatePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.manageDatePickerVisibility.bind(this, false)}
                    minimumDate={new Date()}
                />
            </React.Fragment>
        )
    }
}

export class DropDownInput extends React.Component {
    state = { selectedValue: this.props.values[0].value }
    render() {
        return(
            <React.Fragment>
                <FormLabel labelStyle={styles.label}>{this.props.label}</FormLabel>
                <Picker
                    mode='dropdown'
                    style={styles.picker}
                    selectedValue={this.state.selectedValue}
                    onValueChange={(itemValue) => this.setState({selectedValue: itemValue})}
                >
                    {this.props.values.map(value =>
                    <Picker.Item key={value.value} label={value.label} value={value.value} />
                    )}
                </Picker>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    label: {
        fontSize: 18,
    },
    inputContainer: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#9a9a9a',
        marginTop: 5,
        marginBottom: 5,
    },
    inputText: {
        marginVertical: -5,
        marginLeft: 5,
        color: 'black'
    },
    picker: {
        width: 150,
        marginLeft: 10
    }
})