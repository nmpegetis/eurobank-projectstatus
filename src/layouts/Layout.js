import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import styles from './styles';
import Header from './Header';
import Drawer from './Drawer';
import Board from '../routes/Board';
import Components from '../routes/Components';
import Form from '../routes/Form';
import { mainMenuEntries } from './menu';
import { Tag } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

class Layout extends React.Component {
	state = {
		open: false,
		activeEntry: '',
		data: [],
		columns: []
	};

	componentDidUpdate(prevProps, prevState){
		const { data: prevData } = prevState;
		const { data } = this.state;

		if (!prevData.length && data.length){
			console.log('I should only get in here once!')
			this.setState(() => ({ 
				columns: Object.keys(data[0]).map((key) => ({
					title: key.toUpperCase(),
					dataIndex: key,
					key: key,
					render: (inputElement) =>
						key === 'unit' ? (
							<a href="javascript:;">{inputElement}</a>
						) : key === 'team' ? (
							<span>
								{inputElement.map((tag) => {
									return <Tag key={tag}>{tag.toUpperCase()}</Tag>;
								})}
							</span>
						) : key === 'status' ? (
							<span>
								<Tag
									color={
										inputElement === 'Started' ? 'green' : inputElement === 'On going' ? 'geekblue' : 'volcano'
									}
									key={inputElement}
								>
									{inputElement.toUpperCase()}
								</Tag>
							</span>
						) : (
							inputElement
						),
				}))
		}))
	}
	}

	handleChange = (data) => {
		this.setState((state)=>({data: [...state.data, data]}))
	}

	routeComponentsMap = {
		Board: () => <Board columns={this.state.columns} data={this.state.data}/>,	
		Components, 
		Form: () => <Form onChange={this.handleChange}/>
	};

	handleActiveMenuEntry = (value) => {
		this.setState({ activeEntry: value });
	};

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	renderRoutes = () =>
		Object.keys({ ...mainMenuEntries }).map((entry) => (
			<Route
				exact
				path={{ ...mainMenuEntries }[entry].link}
				component={this.routeComponentsMap[entry]}
			/>
		));

	render() {
		const { classes, history } = this.props;

		return (
			<div className={classes.root}>
				<CssBaseline />
				<Header open={this.state.open} onDrawerOpen={this.handleDrawerOpen} history={history} />
				<Drawer open={this.state.open} onDrawerClose={this.handleDrawerClose} />
				<main className={classes.content}>
					<div className={classes.appBarSpacer} />
					<Switch>{this.renderRoutes()}</Switch>
				</main>
			</div>
		);
	}
}

Layout.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Layout));
