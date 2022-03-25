import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button } from 'react-native';

/**
 * 
 * @param {*} param0 'onSubmit' === is the props function once user pressed the submit button. 'initialValues' === the initial blog object with initial value of title: '', content: ''
 * @returns return the form view we want to display
 */
const BlogPostForm = ({onSubmit, initialValues}) => {
    const [title, setTitle] = useState(initialValues.title); //to set the state title and initialize title
    const [content, setContent] = useState(initialValues.content); //to set the state content and initialize content

    return(
        <View>
            <Text style={styles.labelStyle}> Enter title: {title}</Text>
            <TextInput style={styles.inputStyle} value={title} onChangeText={(text) => {
                return setTitle(text);
            }}/>
            <Text style={styles.labelStyle}>Enter content: {content}</Text>
            <TextInput style={styles.inputStyle} value={content} onChangeText={(text) => setContent(text)}/>
            <Button title='Save Blog Post' onPress={() => onSubmit(title, content)}/>
        </View>
    );
};
/**
 * This will be called first if there is no 'intialValues' or if it is never passed as a prop
 */
BlogPostForm.defaultProps = {
    initialValues: {
        title: '',
        content: ''
    }
};
/**
 * function to style components/elements
 */
const styles = StyleSheet.create({
    inputStyle: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 15,
        padding: 5,
        margin: 5
    },
    labelStyle: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
    }
});

export default BlogPostForm;