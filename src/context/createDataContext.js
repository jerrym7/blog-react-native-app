import React, {useReducer} from 'react';
/**
 * This is a helper class to avoid redoing a bunch of reducers, there for we can create more variables and Providers that will hold other data that can be used for other child compoenents
 * This works like redux does, but redux has more features. 
 */
export default (reducer, actions, initialState) => { //exports a call back functions (reducer, actions, initialState)
    const Context = React.createContext(); //Creates the context from react
    const Provider = ({ children }) => { //children is used to store any type of components
        const [state, dispatch] = useReducer(reducer, initialState);
        /// actions === { addBlogPost: (dispatch) => { return () => {} }}
        const boundAction = {}; //bound action will be the action we want to work with
        for(let key in actions){//iterate through list of actions
            //key === 'addBlogPost'
            boundAction[key] = actions[key](dispatch); //dispatch the action to the given reducer
        }
        //this will give a global variable state and actions to be able to know what are we going to do with each action
        return <Context.Provider value={{ state, ...boundAction } }>
            {children} {/**this is used to display any compnents */}
        </Context.Provider>
    };
    return { Context, Provider }; //this will return Context and Provider
};

