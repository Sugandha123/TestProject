import React from 'react';
import { Provider } from 'react-redux';
import { indexStore } from './store/indexStore';
// import AutoCompleteDropDown  from './component/autoCompleteDropDown';
import PageWrapper from './component/PageWrapper';

function App() {
    const store = indexStore();
    return (
        <Provider store={store}>
            <React.StrictMode>
<PageWrapper></PageWrapper>
            </React.StrictMode>
            {/* <AutoCompleteDropDown></AutoCompleteDropDown> */}
        </Provider>
    )
}

export default App;