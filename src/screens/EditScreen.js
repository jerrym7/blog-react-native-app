import React, {useContext} from 'react';
import {  StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';
/**
 * This functions return screen for editing an existing blog post given an id passed by ShowScreen
 * @param {*} navigation === this is to work with going from a screen and to get information given by parent screen
 * @returns === returns the components from EditScreen
 */
const EditScreen = ({navigation}) => {
    const id = navigation.getParam('id'); //get the id passed by parent screen
    const { state, editBlogPost } = useContext(Context); //get the state from Context -----> BlogContext component and get the actions we want to work with
    const blogPost = state.find((blogPost) => {
        return blogPost.id === id; //retrevies the blogPost given an id
    });

    return(
        <BlogPostForm
            initialValues= {{title: blogPost.title, content: blogPost.content}}
            onSubmit={(title,content) => {
                editBlogPost(id, title, content, () => {//calll the action(title, context, callback function after state was updated do something)
                    navigation.pop();//go back to previous screen
                });
            }}
        />
    );
};

const styles = StyleSheet.create({});

export default EditScreen;