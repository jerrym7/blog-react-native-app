import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

/**
 * This function creates the screen to list all blogposts and delete some given blog post given an id
 * @param {*} navigation === used to go from one screen to another one and add params for the other screen to receive
 * @returns ===Returns the list of all blogPosts
 */
const IndexScreen = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPosts } = React.useContext(Context); //extract action =='delete' and 'state' === blogPost List, from global variable (Context ----> BlogContext objects)
  
  //this use effect is used to run it only once at the beginning of the app therefore we added a empty array as second argument
  useEffect(() => {
    getBlogPosts(); //does it only one time before rendering components
    //IMPORTANT: to update after the state has been rerender we need to do as below
    //everytime we update the screen do another fetch
    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
    });

    //to avoid memory leak we always have to let it know when to stop listening
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.title}
        renderItem={({item}) => {
          return(
            <TouchableOpacity onPress={() => navigation.navigate('Show', {id: item.id})}>
              <View style={styles.rowStyle}>
                <Text style={styles.titleStyle}>{item.title} - {item.id}</Text>
                <TouchableOpacity onPress={() => {
                  deleteBlogPost(item.id); //calls the action function and send the id which you want to delete
                }}>
                  <Feather name="trash" style={styles.iconStyle} color="black" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

/**
 * This function is to add an icon on the right side of the header of the application
 * @param {*} navigation === this is used due to add params and send to next screen and adding a parameter (communicate from one screen to another one)
 * @returns returns the icon with onpress function
 */
IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
}

/**
 * styles the components
 */
const styles = StyleSheet.create({
  rowStyle:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: 'gray'
  },
  titleStyle: {
    fontSize: 18
  },
  iconStyle:{
    fontSize: 24
  }
});

export default IndexScreen;
