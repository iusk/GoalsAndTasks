import React from 'react'
import { ScrollView } from 'react-native'

export default class CustomScrollView extends React.Component {

    state={ screenHeight: 0 }

    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ screenHeight: contentHeight })
    }

    render() {
        const scrollEnabled = this.state.screenHeight > this.props.maxHeight
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