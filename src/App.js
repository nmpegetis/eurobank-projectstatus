import React, { Component } from 'react';
import Layout from './layouts';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'

const store = createStore(rootReducer)
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
