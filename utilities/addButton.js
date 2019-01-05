import React from 'react'
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native'

export default class AddButton extends React.Component {
    render() {
        let size = []
        switch (this.props.size){
            case 'small':
                size = [styles.addContainerSmall, styles.addButtonSmall, styles.addImageSmall]
                break
            case 'small-noTask':
                size = [styles.addContainerSmallNoTask, styles.addButtonSmall, styles.addImageSmall]
                break
            default:
                size = [styles.addContainerDefault, styles.addButtonDefault, styles.addImageDefault]
                break
        }
        return(
            <View style={size[0]}>
                <TouchableOpacity style={size[1]} onPress={this.props.onPress}>
                    <Image style={size[2]} source={require('../assets/images/plus.png')} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    addContainerDefault: {
        position: 'absolute',
        right: 10,
        bottom: 10
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
    addImageDefault: {
        height: 40,
        width:40
    },
    addContainerSmall: {
        position: 'absolute',
        right: 5,
        bottom: 10
    },
    addButtonSmall: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        borderWidth: 1,
        borderColor: '#ABABEF',
        borderRadius: 50,
        backgroundColor: '#ABABEF'
    },
    addImageSmall: {
        height: 25,
        width: 25
    },
    addContainerSmallNoTask: {
        position: 'absolute',
        right: 5,
        bottom: 3
    },
});