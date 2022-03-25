import createDataContext from './createDataContext';
/**
 * This component is a Context to save global VARIABLES for all child components to share and avoid passing props over and over.
 */

/**
 * 
 * @param {*} state === holds the object state that contains list of blogPosts
 * @param {*} action === this will hold 'type' of actions we want to check to do something
 * @returns === returns the updated state
 */
const blogReducer = (state, action) => {
  switch(action.type){
    case 'add':
        return [...state, { id: (Math.floor(Math.random() * 99999)), title:action.payload.title , content:action.payload.content}];
    case 'delete':
        return state.filter((blogPost) => {
          return blogPost.id !== action.payload
        });
    case 'edit':
        return state.map((blogPost) => {
          //if id === id return the pay load, //this can be done in turner expression
          if(blogPost.id === action.payload.id){
            return action.payload; //return new blog post in payload, payload is new
          }
          else{
            return blogPost;//else return the current blogpost
          }
        });
    default: return state;
  }
};

/**
 * This function is to create a blog post and added to the list of blogPosts
 * @param {*} dispatch === this variable tells what we want to do with the dispatch
 * @returns === this will return a function to call dispatch (run reducer function)
 */
const addBlogPost = (dispatch) => {
  //'title' === titleString we want to update,     'content' === contentString we want to add to blogpost
  return (title, content, callback) => {
    dispatch({type: 'add', payload: {title: title,content: content}}); //this can be condensed to (title: title, content: content) ====> (title, content)
    if(callback){//if there is a callback argument entered we can run it, check first to avoid callback not being initialized
      callback(); //run callback function to do something after updating state
    }
  };
};
/**
 * This function is to delete a blog post that was already created given an id
 * @param {*} dispatch === dispatch is variable that runs reducer and returns a call back function to run reducer
 * @returns === will return a callback function to run reducer with (actionType)
 */
const deleteBlogPost = (dispatch) => {
  return (id) => {
    dispatch({type: 'delete', payload: id}); //run reducer with(action, blogPost.id)
  }
};
/**
 * This function is to edit an existing blogPost from the statelist given an id and updated title, content, and callback function (to be able to run after state has been updated)
 * @param {*} dispatch === dispatch is variable that runs reducer and returns a call back function to run reducer
 * @returns === will return a callback function to run reducer with ({actionType, blogPostObject}) given 'id', 'title', 'content', 'callback' callback function
 */
const editBlogPost = (dispatch) => {
  return (id, title, content, callback) => {
    dispatch({
      type: 'edit',
      payload: { id, title,content }
    });
    if(callback){ //if callback argument was introduced, check first to avoid callback not being an argument passed
      callback();//if callback does exists then run the callback function
    }
  };
};

/**
 * exports constants as 'Context' and 'Provider' using DataContext (custom) component for Context
 * accepts the reducer we want to work with, the actions we will be doing, and the Objects we want to safe for
 */
export const {Context , Provider} = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost },
  [{id: (Math.floor(Math.random() * 99999)), title:'test' , content:'test content by default'}]
);
