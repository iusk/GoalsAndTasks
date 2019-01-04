import React from 'react'
import { ScrollView, Dimensions } from 'react-native'
import { Header } from 'react-navigation'

const height = Dimensions.get('window').height - Header.HEIGHT

export default class CustomScrollView extends React.Component {

    state={ screenHeight: 0 }

    onContentSizeChange = (contentWidth, contentHeight) => {
        console.log('changing height to ' + contentHeight)
        this.setState({ screenHeight: contentHeight })
    }

    render() {
        const scrollEnabled = this.state.screenHeight > height
        return(
            <ScrollView
                style={{ flex: 1 }}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
            >
                {this.props.content}
            </ScrollView>
        )
    }
}