import React, { Component } from 'react';
import Layout from './layouts';
import { BrowserRouter } from 'react-router-dom';


class AppContainer extends Component {
	render() {
		return (
			<BrowserRouter>
				<Layout />
			</BrowserRouter>
		);
	}
}

export default AppContainer;
