import React, { Component } from 'react';
import Layout from './layouts';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import rootReducer from './reducers';

const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);
	
const store = createStore(rootReducer, [], enhancers)
class AppContainer extends Component {
	render() {
		return (
		  <Provider store={store}>
				<BrowserRouter>
					<Layout />
				</BrowserRouter>
			</Provider>
		);
	}
}

export default AppContainer;
