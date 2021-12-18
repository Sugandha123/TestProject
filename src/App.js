import React from 'react';
import { Provider } from 'react-redux';
import { indexStore } from './store/indexStore';
import AutoCompleteDropDown  from './component/autoCompleteDropDown';


function App() {
    const store = indexStore();
    return (
        <Provider store={store}>
            <AutoCompleteDropDown></AutoCompleteDropDown>
        </Provider>
    )
}

export default App;