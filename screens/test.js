import React from 'react';
import {
  AppRegistry, StyleSheet, View
 
} from 'react-native';
 
export default class TestScreen extends React.Component {
 
  render() {
 
    return (
 
      <View style = {styles.MainContainer}>
 
        
      </View>
    );
  }
}
 
const styles = StyleSheet.create(
{
 
MainContainer: 
{
 
flex: 1,
 
// Set content's vertical alignment.
justifyContent: 'center',
 
// Set content's horizontal alignment.
alignItems: 'center',
 
// Set hex color code here.
backgroundColor: '#FFEB3B',
 
}
 
});