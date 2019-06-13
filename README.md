# ProjectStatus 
## create-react-app 
* https://facebook.github.io/create-react-app/
* https://facebook.github.io/create-react-app/docs/getting-started

> <strong>Note:</strong> before using this repository please visit the eurobank-training repository where you can find the widgets in a the storybook that we are going to using here

#### 1. Our first task is to create a fresh react app

```
npx create-react-app projectstatus
cd projectstatus 
yarn (~ npm i)
yarn start (~ npm run start)
```

> check all dependencies in console and in package.json

`branch: cra-init`

---
#### 2. Our 2nd task is to start changes to create a menu with two pages and router

A recommender initial project structure: 
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
│   │   ├── Components/
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

#### 2. Our 2nd task is to start changes to create a menu with two pages and router

* changes in package.json
* reactRouter

# Significant coding checkpoints to mention:

* projectstatus/index.js
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

* App.js
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

* In menu.js
```javascript
export const mainMenuEntries = {
	Board: { link: '/', renderIcon: () => <CalendarTodayIcon /> },
	Form: { link: '/form', renderIcon: () => <LibraryBooksIcon /> },
	Components: { link: '/widgets', renderIcon: () => <BuildIcon /> },
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
* In Layout.js
```javascript
...

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
...
import { mainMenuEntries } from './menu';

...

const routeComponentsMap = {
Board,	Components, Form
};

...

renderRoutes = () =>
	Object.keys({ ...mainMenuEntries }).map((entry) => (
		<Route
			exact
			path={{ ...mainMenuEntries }[entry].link}
			component={routeComponentsMap[entry]}
		/>
	));

...


Layout.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Layout));
```

* In Drawer.js
```javascript
...

const SideDrawer = withStyles(styles)(({ classes, open, onDrawerClose }) => (

...
```

* In Header
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
`branch: projectstatus-init`
---

* use repo : eurobank-training
* Start transfering components from storybook inside components
* Button
* https://reactjs.org/docs/typechecking-with-proptypes.html
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
* The rest of Components are similar to Button.
* Except Select, take a look, it uses React hooks: 
* 
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
`branch: projectstatus-components`
---

* now it's time to create a form based on these components
* this scope in class

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


`branch: projectstatus-form-class`
---

* let's use state, props and explain in class lifecycles
* https://reactjs.org/docs/react-component.html
* https://cdn-images-1.medium.com/max/1600/1*552z6hbX_b648DjpTLHZNg.png
* 
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


`branch: projectstatus-form-state`
---

* now it's time to create a board based using table component
* we are going to use stateless component as we won't need to manipulate state

`branch: projectstatus-board-init `
---

* let's move this data and columns to layout
  * this means that data and columns creation should be moved to parent component Layout
```javascript
// Layout.js
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
		Components, 
		Form
	};

...
``` 
* and now Board component looks like this
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

`branch: projectstatus-board-props`
---

* the next step is fill table with the form's data.
* We are going to show two different ways. One using the parent component(1) and one using redux(2)

* 1
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

...

```

* and FormView has
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

`branch: projectstatus-form-board-connection`
---

* and now 2 using redux
* there is no need to pass the data to layout

* npm i redux react-redux
* npm i -D redux-devtools

*
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

* create actions
```javascript
export const addRow = data => ({
  type: 'ADD_ROW',
  payload: data
})

export const getData = () => ({
  type: 'GET_ROWS'
})
```

* create reducer
```javascript
// ./reducers/index.js
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

* Layout remove data, columns and handleChange
```javascript
...

class Layout extends React.Component {
	state = {
		open: false,
		activeEntry: '',
	};

	routeComponentsMap = {
		Board,	
		Components, 
		Form
	};

...

}
```

* connect to redux the container of Board
```javascript
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

* create columns inside BoardView
```javascript
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

* Form container connect
```javascript
import FormView from './FormView';
import { connect } from 'react-redux'

export default connect()(FormView);
```


* FormView dispatch
```javascript
...

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

`branch: projectstatus-board-props`
---
