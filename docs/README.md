# Eurobank Training - React Application

> #### In this repository we are going step-by-step to create a react application for the bank's projects' status
> * [<strong>Guidelines:</strong> How to proceed in this training tutorial](#0)
> * [Step 1: Create a fresh react app](#1)
> * [Step 2: Use a react application layout for the project suggested by the author](#2)
> * [Step 3: Create widget components that we are going to use in this application (*you can also check this repository: `eurobank-training-widgets-playground` to find out how to use components in isolation when creating them*) and present them in a `/widgets` route](#3)
> * [Step 4: Create a Form component based on widget components and present it in a `/form` route](#4) 
> * [Step 5: Enrich form component with state and props](#5)
> * [Step 6: Create a Board component based on widget components and present it in a `/` route](#6)
> * [Step 7: Transfer the logic of Board component some levels above and forward table's `data` and `columns` via props](#7)
> * [Step 8: Interconnect `Form` components submission to be tranferred and fill `Board` table's rows and columns](#8)
> 	* [Step 8.1: Interconnect `Form` and `Board` by transferring data with event handlers to  parental components and through props to children](#8_1)
> 	* [Step 8.2: `Connect` `Form` and `Board` to a `Redux` store which provides them with the pieces of the data they needs from the store, and the functions they can use to dispatch actions to the store](#8_2)

<a name="0"></a>
> <strong>Guidelines:</strong> How to proceed in this training tutorial
> 
> *There are 2 ways you can follow step-by-step this training tutorial:*
> 1. *Create a fresh `create-react-app` as described below, in a seperate `git` repository of your own and follow the changes you can find in this repository's `branches` by comparing them in the `history change log`*
> 2. *If you would like to avoid creating a new repository of your own you may `clone` this repository and `checkout` each steps checkpoint*
> 		* *<strong>Recommendation:</strong> To avoid using `npm install` or `yarn` once in a while as the tutorial proceeds, it is recommended that you start by installing all packages from the **`master branch`** and then just overpass the installation sections inside the tutorial*
> 		* `git clone https://github.com/nmpegetis/eurobank-training.git`
> 		* `git checkout master`
> 		* `npm i` or `yarn`
> 		* `git checkout cra-init`

<a name="1"></a>
### Step 1: Create a fresh react app

Our 1<sup>st</sup> task is to create a fresh react app with [create-react-app](https://facebook.github.io/create-react-app/) and discuss the structure of the created application  

> <strong>Useful links:</strong>
> * https://reactjs.org/docs/hello-world.html 
> * https://www.npmjs.com/what-is-npm
> * https://docs.npmjs.com/about-npm/
> * https://facebook.github.io/create-react-app/
> * https://facebook.github.io/create-react-app/docs/getting-started

> <strong>Note:</strong> before using this repository please visit the [eurobank-training-widgets-playgound](https://github.com/nmpegetis/eurobank-training-widgets-playground.git) repository where you can find the widgets that we are going to using here in a [storybook](https://storybook.js.org/) playground

```sh
# terminal commands with npm or yarn (but it is recommended to be consistent in which of the 2 use use)
npx create-react-app projectstatus
cd projectstatus 
npm i # or use: yarn
npm start # or use: yarn start
```

> **To be discussed in class:** check all dependencies in `terminal` and in `package.json` file

In order to checkout the checkpoint branch `cra-init` you may:

`git checkout cra-init`

---
<a name="2"></a>
#### Step 2: Use a react application layout for the project suggested by the author

Our 2<sup>nd</sup> task is to start changes to create a menu with two pages and router

A recommended initial project structure: 
```
projectstatus/
│
├── public/
│   ├── favico.ico
│   ├── index.html
│   └── manifest.json
│
├── src/
│   ├── layouts/
│   │   ├── Drawer.js
│   │   ├── Header.js
│   │   ├── index.js
│   │   ├── Layout.js
│   │   ├── menu.js
│   │   └── styles.js
│   │
│   ├── routes/
│   │   ├── Board/
│   │   │   ├── BoardView.js
│   │   │   ├── styles.js
│   │   │   └── index.js
│   │   │
│   │   ├── Widgets/
│   │   │   ├── ComponentsView.js
│   │   │   ├── styles.js
│   │   |   └── index.js
│   │   │
│   │   └── Form/
│   │       ├── FormView.js
│   │       ├── styles.js
│   │       └── index.js
│   │    
│   ├── components/
│   │    
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   └── serviceWorker.js
│
├── node_modules/
│
├── .gitignore
├── package.json
├── README.md
└── yarn.lock
```

> <strong>Discussion:</strong>
> * changes in package.json
> * project structure, browse files and folders
> * [react dev tools](https://github.com/facebook/react-devtools)
> * [react router](https://reacttraining.com/react-router/web/guides/quick-start)

##### Significant coding checkpoints to mention:

`src/index.js`
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

`src/App.js`
```javascript
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
```

`src/layouts/menu.js`
```javascript
...

export const mainMenuEntries = {
	Board: { link: '/', renderIcon: () => <CalendarTodayIcon /> },
	Form: { link: '/form', renderIcon: () => <LibraryBooksIcon /> },
	Widgets: { link: '/widgets', renderIcon: () => <BuildIcon /> },
};

export const mainListItems = [
	Object.keys(mainMenuEntries).map((entry) => (
		<Link to={mainMenuEntries[entry].link} style={{ textDecoration: 'none' }}>
			<ListItem button>
				<ListItemIcon>{mainMenuEntries[entry].renderIcon()}</ListItemIcon>
				<ListItemText primary={entry} />
			</ListItem>
		</Link>
	)),
];
```
`src/layouts/Layout.js`
```javascript
...

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
...
import Board from '../routes/Board';
import Widgets from '../routes/Widgets';
import Form from '../routes/Form';
import { mainMenuEntries } from './menu';

...

const routeComponentsMap = {
	Board, Widgets, Form
};

...

renderRoutes = () =>
	Object.keys({ ...mainMenuEntries }).map((entry) => (
		<Route
			exact
			path={{ ...mainMenuEntries }}[entry].link}
			component={routeComponentsMap[entry]}
		/>
	));

...


Layout.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Layout));
```
`src/layouts/Drawer.js`
```javascript
...

const SideDrawer = withStyles(styles)(({ classes, open, onDrawerClose }) => (

...
```
`src/layouts/Header.js`
```javascript
...

import classNames from 'classnames';

...

<IconButton
	color="inherit"
	aria-label="Open drawer"
	onClick={onDrawerOpen}
	className={classNames(classes.menuButton, open ? classes.menuButtonHidden : undefined)}
>

...

<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
	{history.location.pathname.split('/').length === 2 ? (
		Object.keys({ ...mainMenuEntries }).filter(
			(entry) =>
				(({ ...mainMenuEntries }[entry].link === history.location.pathname)[0])
		)
	) : (
		Object.keys({ ...mainMenuEntries }).filter(
			(entry) =>
				(({ ...mainMenuEntries }[entry].link ===
					'/' + history.location.pathname.split('/')[1])[0])
		)
	)}
</Typography>

...
```
In order to checkout the checkpoint branch `projectstatus-init` you may:

`git checkout projectstatus-init`

---
<a name="3"></a>
#### Step 3: Create widget components that we are going to use in this application (*you can also check this repository:[eurobank-training-widgets-playground](https://github.com/nmpegetis/eurobank-training-widgets-playground.git) to find out how to use components in isolation when creating them*) and present them in a `/widgets` route

Our 3<sup>rd</sup> task is create the widget components (i.e. *Button, TextField, Select, DatePicker, Table*) that we are going to use in this application, and display them in Widgets route.
 
To start with we should first install all packages that we will need:
```sh
# terminal commands with npm or yarn (but it is recommended to be consistent in which of the 2 use use)
npm i @date-io/date-fns @material-ui/core @material-ui/icons @material-ui/pickers antd # or use: yarn add @date-io/date-fns @material-ui/core @material-ui/icons @material-ui/pickers antd
npm start # or use: yarn start
``` 
 > <strong>Discussion:</strong>
> * [class and fuction components differences](https://reactjs.org/docs/components-and-props.html)
> * [state, props, and introduction to lifecycles](https://reactjs.org/docs/state-and-lifecycle.html)
> * [reference to react hooks](https://reactjs.org/docs/hooks-intro.html) 


> `It's time for a hands on session to create the button widget component`

###### Button
`src/components/Button/ButtonView.js`

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

function ButtonView(props) {
	const { color,disabled, onClick,text } = props;
	return (
		<div>
				<Button
					disabled={disabled}
					variant="contained"
					color={color}
					onClick={onClick}
				>
					{text}
				</Button>
		</div>
	);
}

ButtonView.propTypes = {
	color: PropTypes.oneOf(['primary', 'secondary']),
	disabled: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
};

export default ButtonView;
```
> <strong>Useful links:</strong>
> * https://reactjs.org/docs/typechecking-with-proptypes.html


The creation of the rest of the widget components is similar to Button, and you can find it out when you checkout the next branch.

But in order to introduce also `hooks` in React you can take a look at Select widget component in `src/components/Select/SelectView.js` 

###### Select
`src/components/Select/SelectView.js`

```javascript
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import styles from './styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

function SelectView(props) {
	const { classes } = props;
	const [ labelWidth, setLabelWidth ] = useState(null);
	const [ InputLabelRef, setInputLabelRef ] = useState(null);

	// Similar to componentDidMount and componentDidUpdate:
	useEffect(() => {
		// Update the document title using the browser API
		InputLabelRef && setLabelWidth(ReactDOM.findDOMNode(InputLabelRef).offsetWidth);
	});

	const { data = [], disabled, name, onChange, title, value } = props;

	const isEmptyDisabled = !!props.isEmptyDisabled;
	const renderMenuItems = (array) => array.map((item) => <MenuItem value={item.key}>{item.value}</MenuItem>);

	return (
		<div>
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel ref={(ref) => setInputLabelRef(ref)} htmlFor="outlined-age-simple">
					{!value && title}
				</InputLabel>
				<Select
					disabled={disabled}
					value={value}
					onChange={({ target: { name, value } }) => onChange(name, value)}
					name={name}
				>
					{!isEmptyDisabled && (
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
					)}
					{renderMenuItems(data)}
				</Select>
			</FormControl>
		</div>
	);
}

export default withStyles(styles)(SelectView);
```
In order to checkout the checkpoint branch `projectstatus-components` you may:

`git checkout projectstatus-components`

In the above branch you can preview the widget components all together in the Widgets route `/widgets` while also take a look at its code.

###### Widgets
`src/routes/Widgets/WidgetsView.js`
```javascript
...

import { Button, TextField, Select, DatePicker, Table } from '../../components';
import { Tag } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function WidgetsView(props) {

...

	const data = ...
	const columns = ...

	const newProjectData = {
		...
	};

	return (
		<Fragment>
				<Button text="Click me!" color="primary" disabled={false} onClick={handleClick}/>
				<TextField
					label={'Label'}
					disabled={false}
					value=""
					onChange={handleChange}
					name={'field'}
					margin="normal"
					style={{
						width: '180px'
					}}
				/>
				<Select
					title="Age"
					data={items}
					disabled={false}
					isEmptyDisabled={false}
					onChange={handleSelectChange}
					name="select"
					value={null}
			/>,
			<DatePicker label="Expire Date" name='expiredate' initialDate={new Date('2020-01-01T00:00:00.000Z')} onChange={handleChange} />,
			<Table columns={columns} data={[ ...data, newProjectData ]}/>
		</Fragment>
	);
```

---
<a name="4"></a>

#### Step 4: Create a Form component based on widget components and present it in a `/form` route

Our 4<sup>th</sup> task is to create a form based on our widget components

> <strong>Discussion:</strong>
> * introduce grid for responsive layout
> * introduce `this` in class components
> * discuss about handler functions passed to widget components through props

###### Form
`src/routes/Form/FormView.js`

```javascript
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Button, TextField, Select, DatePicker } from '../../components';
import Grid from '@material-ui/core/Grid';

class FormView extends Component {

	handleChange = (e) => console.log('e', e);
	handleClick = (e) => alert('clicked');
	handleSelectChange = (name, value) => {
		console.log('name', name, 'value', value)
	};
	units = [ { key: 'Centralized Services & Digital Branches', value: 'Centralized Services & Digital Branches' } ];
	supervisors = [ { key: 'Super1', value: 'Super1' }, { key: 'Super2', value: 'Super2' }, { key: 'Super3', value: 'Super3' } ];
	members = [ { key: 'Member1, Member2, Member3', value: [ 'Member1', 'Member2', 'Member3' ] }, { key: 'Member4, Member5, Member6, Member7', value: [ 'Member4', 'Member5', 'Member6', 'Member7' ] }];
	status = [ { key: 'Started', value: 'Started' }, { key: 'On going', value: 'On going' }, { key: 'Finishing', value: 'Finishing' } ];

	render() { return (
		<Grid container>
			<Grid item xs={2}>
					<Select
						title="Unit"
						data={this.units}
						disabled={false}
						isEmptyDisabled={false}
						onChange={this.handleSelectChange}
						name="unit"
						value={null}
				/>
			</Grid>
			<Grid item xs={2}>
					<TextField
						label={'Pem'}
						disabled={false}
						value=""
						onChange={this.handleChange}
						name={'pem'}
						margin="normal"
						style={{
							width: '180px'
						}}
					/>
			</Grid>
			<Grid item xs={2}>
				<DatePicker label="Starting Date" name='startingdate' initialDate={new Date()} onChange={this.handleChange}/>
			</Grid>

...
```
In order to checkout the checkpoint branch `projectstatus-form-class` you may:

`git checkout projectstatus-form-class`

In the above branch you can preview the Form component in the Form route `/form` while also take a look at its code.

---
<a name="5"></a>

#### Step 5: Enrich form component with state and props 

Our 5<sup>th</sup> task is to use state and props to Form component and discuss about react lifecycles


> <strong>Discussion:</strong>
> * [react lifecycles](
https://reactjs.org/docs/react-component.html)
> * use [react dev tools](https://github.com/facebook/react-devtools) to preview state and props changes


###### Form
`src/routes/Form/FormView.js`

```javascript
...

class FormView extends Component {
	constructor(props){
		super(props);
		this.state = {
			unit: null,
			pem: null,
			title: null,
			desc: null,
			supervisor: null,
			team: null,
			startingDate: null,
			endingDate: null,
			comments: null,
			mandays: null,
			lastUpdate: null,
			status: null,
		}
	}

...

handleChange = (name, value) => {
	console.log('name', name, 'value', value)
	this.setState(()=>({ [name]: value }))
};
...

```
In order to checkout the checkpoint branch `projectstatus-form-state` you may:

`git checkout projectstatus-form-state`

In the above branch you can preview the Form component in the Form route `/form` while also take a look at its code.

---
<a name="6"></a>

#### Step 6: Create a Board component based on widget components and present it in a `/` route

Our 6<sup>th</sup> task is to create a table based on our widget components


> <strong>Discussion:</strong>
> * we are going to use stateless component as we won't need to manipulate state

###### Board
`src/routes/Board/BoardView.js`

```javascript
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Table } from '../../components';
import { Tag } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function BoardView(props) {
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

	return (
			<Table columns={columns} data={data}/>
	);
}

export default withStyles(styles)(BoardView);
```

Now you can checkout the checkpoint branch `projectstatus-board-init` where you can preview the Board component in the Board route `/` while also take a look at its code. To do so, you may:
`git checkout projectstatus-board-init`

---
<a name="7"></a>

#### Step 7: Transfer the logic of Board component some levels above and forward table's `data` and `columns` via props

Our 7<sup>th</sup> task is to move Board component's data and columns in another parental component

> <strong>Discussion:</strong>
> * Why is this needed ? What are we trying to accomplish ?
> * Why did we select that `Layout` component is a good place to move `Board`'s `columns` and `data` ? 
> * ***Also note an improvement of this.** It would be even better if we had this data generator for `columns` and `data` in a seperate file which we would `import` easily where it would be needed. Specifically in this case, we would remove it from `Board` and import it from `Layout`*


###### Layout
`src/layouts/Layout.js`
```javascript
// in the suggested improvement we would just have to import the below line
// import { Board, columns, data } from '../routes/Board'

...

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
		Widgets, 
		Form
	};

...
``` 
###### Board
`src/routes/Board/BoardView.js`
```javascript
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Table } from '../../components';

function BoardView(props) {
	return (
			<Table columns={props.columns} data={props.data}/>
	);
}

export default withStyles(styles)(BoardView);

```
In order to checkout the checkpoint branch `projectstatus-board-props` you may:

`git checkout projectstatus-board-props`

In the above branch you can preview the Board component in the Board route `/` while also take a look at its code.

---
<a name="8"></a>

#### Step 8: Interconnect `Form` components submission to be tranferred and fill `Board` table's rows and columns   
Our 8<sup>th</sup> task is to handle data transferring through components. We can do so in a sufficient amount of different ways. In this training we are going to discuss 2 of them

1. with event handlers and props
2. using [Redux](https://redux.js.org/) for [React](https://react-redux.js.org/)

<a name="8_1"></a>
##### Step 8.1: Interconnect `Form` and `Board` by transferring data with event handlers to  parental components and through props to children

In this 1<sup>st</sup> approach, our task is to transfer via event handlers the `Form` component's data to a ***common*** parental component with Board component. Then, create and forward table's `data` and `columns` via props

> <strong>Discussion:</strong>
> * Why is it recommended to transfer data to a common ancestor ?
> * Widgets is a sibling component to Form and Board ? Does it also needs the same props ? 
> * Do we need to pass handleChange method to Board too, and equivalently data and columns to Form ? If yes, would it be possible, not to have handleChange at all and pass data and columns via props to `Form` component and change them instanlty there ? <sup>1</sup> 


###### Form
`src/routes/Form/FormView.js`
```javascript
class FormView extends Component {
	constructor(props){
    super(props);
		this.state = {
			unit: null,
			pem: null,
			title: null,
			desc: null,
			supervisor: null,
			team: null,
			startingDate: null,
			endingDate: null,
			comments: null,
			mandays: null,
			lastUpdate: null,
			status: null,
		}
	}

	handleClick = (e) => this.props.onChange(this.state);
	handleChange = (name, value) => {
		console.log('name', name, 'value', value)
		this.setState(()=>({ [name]: value }))
	};
...
```

###### Layout
`src/layouts/Layout.js`
```javascript
...

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

		// if (!prevData.length && data.length){
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
		// }
	}

	handleChange = (data) => {
		this.setState((state)=>({data: [...state.data, data]}))
	}

	routeComponentsMap = {
		Board: () => <Board columns={this.state.columns} data={this.state.data}/>,	
		Widgets, 
		Form: () => <Form onChange={this.handleChange}/>
	};

...
```
> <strong>Discussion:</strong>
> * Explain what is the usage of component lifecycle method `componentDidUpdate`. Is this lifecycle our best option ? What would happen if we didn't use the if statement inside ? Could we use another [lifecycle](https://reactjs.org/docs/react-component.html) for this case ? <sup>2</sup> 

Now you can checkout the checkpoint branch `projectstatus-form-board-connection` where you can  take a look at its code and try from `/form` route to send `Form` component's `state` data to fill `Board` component's `props` when visiting route `/`. To do so, you may:
`git checkout projectstatus-form-board-connection`


> <sup>1</sup> The answer to this question is **no**. The reason is that props are **`immutable`**. They can't be changed by any component that is using them. And this is the reason that we pass a callback function on the event handler. [Read more...](https://reactjs.org/docs/faq-functions.html)
>
> <sup>2</sup> In the given image below and having read the component [lifecycles](https://reactjs.org/docs/react-component.html) we find out that this is the recommended way to update `state` with new data. But **note** that we should also have the `setState` inside a condition, elsewise we will fall in an infinite loop [![React Lifecycles Image](./react16_8_lifecycles.png)](./react16_8_lifecycles.png)[Image Source](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)


---

1. with event handlers and props
2. using [Redux](https://redux.js.org/) for [React](https://react-redux.js.org/)

<a name="8_2"></a>
##### Step 8.2: [Connect](https://react-redux.js.org/api/connect) `Form` and `Board` to a [Redux](https://redux.js.org/) store which provides them with the pieces of the data they needs from the store, and the functions they can use to dispatch actions to the store

In this 2<sup>nd</sup> approach, our task is to transfer `Form` component's `data` to Board component with the use of [`react-redux`](https://react-redux.js.org/). Finally, the `Board` component with be responsible for the `columns` creation. 

To achieve so, we are going to use `actions` and `reducers`. [Actions](https://redux.js.org/basics/actions) are payloads of information that send data from the application to its Redux store. **Note** that they are the only source of information for the store, and they only describe what happened. [Reducers](https://redux.js.org/basics/reducers) specify how the application's state changes in response to actions sent to the store. 

> <strong>Discussion:</strong>
> * Do we still need to transfer data with an event handler's callbank function to a parental component?  
> * use [redux dev tools](https://github.com/reduxjs/redux-devtools)



To start with, we should install redux packages that our app is going to need
```sh
# terminal commands with npm or yarn (but it is recommended to be consistent in which of the 2 use use)
npm i redux react-redux # or use: yarn add redux react-redux
npm i -D redux-devtools # or use: yarn add --dev redux-devtools
```


###### App
`src/App.js`
```javascript
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
```

###### Action Creators
`src/actions/index.js`

```javascript
export const addRow = data => ({
  type: 'ADD_ROW',
  payload: data
})

export const getData = () => ({
  type: 'GET_ROWS'
})
```

###### Reducers
`src/reducers/index.js`
```javascript
export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_ROW':
      return [
        ...state,
        action.payload,
      ]
    default:
      return state
  }
}
```

###### Layout
`src/layouts/Layout.js`
```javascript
// removed data and columns from state and handleChange
...

class Layout extends React.Component {
	state = {
		open: false,
		activeEntry: '',
	};

	routeComponentsMap = {
		Board,	
		Widgets, 
		Form
	};

...

}

...
```

###### Board Container
`src/routes/Board/index.js`
```javascript
// index.js is the container component that connects BoardView to redux store

import BoardView from './BoardView';
import { connect } from 'react-redux'
import { getData } from '../../actions'

const mapStateToProps = state => ({
  data: state
})

const mapDispatchToProps = (getData())

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardView);
```

###### Board View Component
`src/routes/Board/BoardView.js`
```javascript
// gets data from redux store and creates columns BoardView

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Table } from '../../components';
import { Tag } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function BoardView(props) {
	const columns = Array.isArray(props.data) && props.data.length ? Object.keys(props.data[0]).map((key) => ({
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
				})) : [] 
	return (
			<Table columns={columns} data={props.data}/>
	);
}

export default withStyles(styles)(BoardView);

```

###### Form Container
`src/routes/Form/index.js`
```javascript
// index.js is the container component that connects FormView to redux store
import FormView from './FormView';
import { connect } from 'react-redux'

export default connect()(FormView);
```

###### Form View Component
`src/routes/Form/FormView.js`
```javascript
...
// has a dispatch props that was provided to this View after connecting to Resux store
import Grid from '@material-ui/core/Grid';

class FormView extends Component {
	constructor(props){
    super(props);
		this.state = {
			unit: null,
			pem: null,
			title: null,
			desc: null,
			supervisor: null,
			team: null,
			startingDate: null,
			endingDate: null,
			comments: null,
			mandays: null,
			lastUpdate: null,
			status: null,
		}
	}

	handleClick = (e) => this.props.dispatch(addRow(this.state))

...

}
```

> <strong>Discussion:</strong>
> * Is [actions and action creators](https://redux.js.org/basics/actions) the same thing ?
> * What is [mapStateToProps](https://react-redux.js.org/using-react-redux/connect-mapstate) ?
> * What is [mapDispatchToProps](https://react-redux.js.org/using-react-redux/connect-mapdispatch) ?
> * Is using react-redux better or worse than event handers ?
> * [When do we use each case](https://www.google.gr/search?q=when+to+use+redux+and+when+not+to) ?


Now you can checkout the checkpoint branch `projectstatus-form-board-redux` where you can  take a look at its code and try from `/form` route to `dispatch` `Form` component's `state` data to fill `Redux store` and them to getData from `store` using mapStateToProps to map the `store`'s `state` to `Board` component's `props` when visiting route `/`. To do so, you may:
`git checkout projectstatus-form-board-redux`

 Use also [Redux devtools](https://github.com/reduxjs/redux-devtools) to preview live the changes

---

# 🎉 *That's it! You did it!* 🎊 


Let's make some small fixes workshop. checkout master


You may now checkout the `master` branch where you can  find some small improvements on the above code. To do so, you may:
`git checkout master`

#### *Ooh, and don't forget to continuously learning* 😉


*<div style="text-align: right; padding-top: 100px">©️ Nikolas Begetis, 15 June 2019</div>*