import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TouchableHighlight, Image } from 'react-native'
import { connect } from 'react-redux'

class ProjectBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            pressStatus: false,
        };
    }

    _onShowUnderlay =  () => {
        this.setState({ 
            pressStatus: true,
         });
    }

    _onHideUnderlay = () => {
        this.setState({ 
            pressStatus: false, 
        });
    }

    render() {
        return (
            <View style={styles.outerbox}>
                <View style={innerbox(this.props.projectColor)}>
                    <TouchableOpacity>
                        <Image style={styles.timer} source={require('../assets/images/timer.png')} />
                    </TouchableOpacity>
                </View>
                <TouchableHighlight
                    onPress={() => {
                        this.props.navigation.navigate('Project', {
                            projectId: this.props.projectId,
                            projectName: this.props.projectName
                        });
                    }}
                    underlayColor='#f1f1f1'
                    onShowUnderlay={this._onShowUnderlay}
                    onHideUnderlay={this._onHideUnderlay}
                    style={styles.highlightBox}
                >
                    <Text style={projectText(this.props.projectColor)} numberOfLines={2}>
                        <Text style={this.state.pressStatus ? styles.textPress : styles.text}>
                            {this.props.projectName}
                        </Text>
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };

    render() {
        return (
            <View style={styles.body}>
                <View style={styles.projectLayout}>
                    { this.props.projects.map(project => (
                        <ProjectBox key={project.Id} projectId= {project.Id} projectName={project.name} projectColor={project.color} navigation={this.props.navigation} />
                    ))}
                </View>
                <View style={styles.addProject}>
                    <TouchableOpacity style={styles.addProjectButton} onPress={() => this.props.navigation.navigate('Form', {
                        formType: 'Add Project'
                    })}>
                        <Image style={{ height: 40, width: 40 }} source={require('../assets/images/plus.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    projects: state.projects
})

export default connect(mapStateToProps)(HomeScreen)

const styles = StyleSheet.create({
    body: {
        flex: 1,
        height: Dimensions.get('window').height,
        backgroundColor: '#f1f1f1',
    },
    projectLayout: {
        margin: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    outerbox: {
        width: 140,
        height: 145,
        margin: 10,
        borderWidth: 1,
        borderColor: '#9a9a9a',
        borderRadius: 5,
    },
    timer: {
        height: 60,
        width: 45,
    },
    highlightBox: {
        height: 55,
        width: 140,
        alignItems: 'center',
    },
    text: {
        textDecorationLine: 'none'
    },
    textPress: {
        textDecorationLine: 'underline'
    },
    addProject: {
        position: 'absolute',
        left: 290,
        top: 490
    },
    addProjectButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        borderWidth: 1,
        borderColor: '#ABABEF',
        borderRadius: 50,
        backgroundColor: '#ABABEF'
    }
});

const innerbox = function(color) {
    return {
        width: 140,
        height: 90,
        marginLeft: -1,
        backgroundColor: color,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#9a9a9a'
    }
}

const projectText = function(color) {
    return {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: color,
        fontSize: 20,
        fontWeight: '900',
        height: 50,
        width: 140,
    }
}