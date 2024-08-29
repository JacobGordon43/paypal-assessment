import React from 'react';
import {store} from './store';
import { Provider } from 'react-redux';
//Creates a provider that will wrap around the React Nodes, so to provide access to the global variables and reducers.
export function ReduxProvider({children} : {children: React.ReactNode}){
    return <Provider store={store}>{children}</Provider>
}