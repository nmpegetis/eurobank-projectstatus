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

const chooseDaysBefore = (days) =>
	((d) => new Date(d.setDate(d.getDate() - days)))(new Date()).toLocaleDateString();
const chooseDaysAfter = (days) => ((d) => new Date(d.setDate(d.getDate() + days)))(new Date()).toLocaleDateString();

const unit = [ 'Centralized Services & Digital Branches' ];
const pem = [ '10000', '10001', '10010', '10011' ];
const title = [ 'Lifemoments', 'PricingTool', 'LendingTool', 'WizardTool' ];
const desc = [ 'test', 'test2', 'test3' ];
const supervisor = [ 'Super1', 'Super2', 'Super3' ];
const team = [
	[ 'Member1', 'Member2', 'Member3' ],
	[ 'Member4', 'Member5', 'Member6', 'Member7' ],
	[ 'Member8', 'Member9' ],
	[ 'Member10' ],
];
const startingDate = [ chooseDaysBefore(10), chooseDaysBefore(32), chooseDaysBefore(15), chooseDaysBefore(45) ];
const endingDate = [ chooseDaysAfter(40), chooseDaysAfter(60), chooseDaysAfter(50), chooseDaysAfter(4) ];
const comments = [
	'nothing to mention',
	'low team capacity due to holiday season',
	'many experienced developers in team',
];
const mandays = [ 100, 140, 150 ];
const lastUpdate = [ chooseDaysBefore(3), chooseDaysBefore(1), chooseDaysBefore(0), chooseDaysBefore(6) ];
const status = [ 'Started', 'On going', 'Finishing' ];

const projectStatusData = () => ({
	unit: unit[Math.floor(Math.random() * unit.length)],
	pem: pem[Math.floor(Math.random() * pem.length)],
	title: title[Math.floor(Math.random() * title.length)],
	desc: desc[Math.floor(Math.random() * desc.length)],
	supervisor: supervisor[Math.floor(Math.random() * supervisor.length)],
	team: team[Math.floor(Math.random() * team.length)],
	startingDate: startingDate[Math.floor(Math.random() * startingDate.length)],
	endingDate: endingDate[Math.floor(Math.random() * endingDate.length)],
	comments: comments[Math.floor(Math.random() * comments.length)],
	mandays: mandays[Math.floor(Math.random() * mandays.length)],
	lastUpdate: lastUpdate[Math.floor(Math.random() * lastUpdate.length)],
	status: status[Math.floor(Math.random() * status.length)],
});

const data = [ ...Array(1).keys() ].map(() => projectStatusData());

const columns = Object.keys(projectStatusData()).map((key) => ({
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
}));

class Layout extends React.Component {
	state = {
		open: false,
		activeEntry: '',
	};

	routeComponentsMap = {
		Board: () => <Board columns={columns} data={data}/>,	
		Components, 
		Form
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
