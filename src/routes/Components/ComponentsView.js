import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Button, TextField, Select, DatePicker, Table } from '../../components';
import { Tag } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function ComponentsView(props) {
	const handleChange = (e) => console.log('e', e);
	const handleClick = (e) => alert('clicked');
	const handleSelectChange = (name, value) => {
		console.log('name', name, 'value', value)
	};
	const items = [ { key: 'Ten', value: 10 }, { key: 'Twenty', value: 20 }, { key: 'Thirty', value: 30 } ];

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

	const data = [ ...Array(4).keys() ].map(() => projectStatusData());

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

	const newProjectData = {
		unit: 'Centralized Services & Digital Branches',
		pem: '10100',
		title: 'Financial Terminal',
		desc: 'test4',
		supervisor: 'Super2',
		team: [ 'Member11', 'Member12', 'Member13' ],
		startingDate: chooseDaysBefore(0),
		endingDate: chooseDaysAfter(400),
		comments: 'fingers crossed',
		mandays: 900,
		lastUpdate: chooseDaysBefore(0),
		status: 'Started',
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
}

export default withStyles(styles)(ComponentsView);
