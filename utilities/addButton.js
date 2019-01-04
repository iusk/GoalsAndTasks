import React from 'react'
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native'

export default class AddButton extends React.Component {
    render() {
        const size = (this.props.size === 'small') ? 
            [styles.addContainerSmall, styles.addButtonDefault] : [styles.addContainerDefault, styles.addButtonDefault]
        console.log(size)
        return(
            <View style={size[0]}>
                <TouchableOpacity style={size[1]} onPress={this.props.onPress}>
                    <Image style={{ height: 40, width: 40 }} source={require('../assets/images/plus.png')} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    addContainerDefault: {
        position: 'absolute',
        left: 290,
        top: 490
    },
    addButtonDefault: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        borderWidth: 1,
        borderColor: '#ABABEF',
        borderRadius: 50,
        backgroundColor: '#ABABEF'
    },
    addContainerSmall: {
        position: 'absolute',
        left: 285,
        top: 165
    },
    addButtonSmall: {
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