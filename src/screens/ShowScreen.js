import React, {useContext} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import {EvilIcons} from '@expo/vector-icons'; //this gets a icon already in the expo library
/**
 * 
 * This functions return screen for displaying an existing blog post given an id passed by IndexScreen
 * @param {*} navigation === this is to work with going from a screen and to get information given by parent screen
 * @returns === returns the components from EditScreen
 */
const ShowScreen = ({navigation}) => {
    const {state} = useContext(Context); //get state === blogPost List from the global variables
    const blogPost = state.find((blogPost) => { //get the blodPost given an id from IndexScreen
        return blogPost.id === navigation.getParam('id'); //find the blogPost given from an id passed by IndexScreen
    });

    //returns the elements to show on the screen
    return(
        <View>
            <Text>{blogPost.title}</Text>
            <Text>Content: {blogPost.content}</Text>
        </View>
    );
};

/**
 * This function is to add an icon on the right side of the header tab in the application
 * @param {*} navigation === this is used due to add params and send to next screen and adding a parameter (communicate from one screen to another one)
 * @returns returns the icon with onpress function
 */
ShowScreen.navigationOptions = ({navigation}) => {
  //displays a icon and on press it does an instruction
    return {
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Edit', {id: navigation.getParam('id')})}>
            <EvilIcons name="pencil" size={35} />
          </TouchableOpacity>
        ),
      };
};

/**
 * styles the components
 */
const styles = StyleSheet.create({

});
export default ShowScreen;