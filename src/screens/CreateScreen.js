import React, {useContext} from 'react';
import { StyleSheet} from 'react-native';
import { Context } from '../context/BlogContext'
import BlogPostForm from '../components/BlogPostForm';
/**
 * This function is to render the screen to add a blogPost
 * @param {*} navigation === this destructured variable is used to navigate from one screen and to other one
 * @returns 
 */
const CreateScreen = ({ navigation }) => {
    const { addBlogPost } = useContext(Context); //get the action from the Context ----> BlogContext
    return(
        <BlogPostForm onSubmit={(title, content) => {
            addBlogPost(title, content, () => { //calll the action(title, context, callback function after state was updated)
                return navigation.navigate('Index'); //you can also use navigate.pop() to get back to previous screen
            })
        }} />
    );
    
};
//variables to style components
const styles = StyleSheet.create({
    
});

export default CreateScreen;