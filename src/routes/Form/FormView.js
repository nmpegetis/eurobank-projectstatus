import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Button, TextField, Select, DatePicker } from '../../components';
import Grid from '@material-ui/core/Grid';
import { addRow } from '../../actions'

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
	handleChange = (name, value) => {
		console.log('name', name, 'value', value)
		this.setState(()=>({ [name]: value }))
	};

	units = [ { key: 'Centralized Services & Digital Branches', value: 'Centralized Services & Digital Branches' } ];
	supervisors = [ { key: 'Super1', value: 'Super1' }, { key: 'Super2', value: 'Super2' }, { key: 'Super3', value: 'Super3' } ];
	members = [ { key: [ 'Member1', 'Member2', 'Member3' ], value: 'Member1, Member2, Member3' }, { key: [ 'Member4', 'Member5', 'Member6', 'Member7' ], value: 'Member4, Member5, Member6, Member7' }];
	status = [ { key: 'Started', value: 'Started' }, { key: 'On going', value: 'On going' }, { key: 'Finishing', value: 'Finishing' } ];

	render() { 
		const {
			unit,
			pem,
			title,
			desc,
			supervisor,
			team,
			startingDate,
			endingDate,
			comments,
			mandays,
			lastUpdate,
			status,
		} = this.state;

		return (
			<Grid container>
				<Grid item xs={2}>
						<Select
							title="Unit"
							data={this.units}
							disabled={false}
							isEmptyDisabled={false}
							onChange={this.handleChange}
							name="unit"
							value={unit}
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
						<TextField
							label={'Title'}
							disabled={false}
							value=""
							onChange={this.handleChange}
							name={'title'}
							margin="normal"
							style={{
								width: '180px'
							}}
						/>
				</Grid>
				<Grid item xs={2}>
						<TextField
							label={'Desc'}
							disabled={false}
							value=""
							onChange={this.handleChange}
							name={'desc'}
							margin="normal"
							style={{
								width: '180px'
							}}
						/>
				</Grid>
				<Grid item xs={2}>
						<Select
							title="Supervisor"
							data={this.supervisors}
							disabled={false}
							isEmptyDisabled={false}
							onChange={this.handleChange}
							name="supervisor"
							value={supervisor}
					/>
				</Grid>
				<Grid item xs={2}>
						<Select
							title="Team"
							data={this.members}
							disabled={false}
							isEmptyDisabled={false}
							onChange={this.handleChange}
							name="team"
							value={team}
					/>
				</Grid>
				<Grid item xs={2}>
					<DatePicker label="Starting Date" name='startingDate' initialDate={new Date()} onChange={this.handleChange}/>
				</Grid>
				<Grid item xs={2}>
					<DatePicker label="Ending Date" name='endingDate' initialDate={new Date()} onChange={this.handleChange}/>
				</Grid>
				<Grid item xs={2}>
						<TextField
							label={'Comments'}
							disabled={false}
							value=""
							onChange={this.handleChange}
							name={'comments'}
							margin="normal"
							style={{
								width: '180px'
							}}
						/>
				</Grid>
				<Grid item xs={2}>
						<TextField
							label={'Mandays'}
							disabled={false}
							value=""
							onChange={this.handleChange}
							name={'mandays'}
							margin="normal"
							style={{
								width: '180px'
							}}
						/>
				</Grid>
				<Grid item xs={2}>
					<DatePicker label="Last Update" name='lastUpdate' initialDate={new Date()} onChange={this.handleChange}/>
				</Grid>
				<Grid item xs={2}>
						<Select
							title="Status"
							data={this.status}
							disabled={false}
							isEmptyDisabled={false}
							onChange={this.handleChange}
							name="status"
							value={status}
					/>
				</Grid>
				<Grid item xs={12}>
						<Button 
							text="Click me!" 
							color="primary" 
							disabled={!(
								unit &&
								pem &&
								title &&
								desc &&
								supervisor &&
								team &&
								startingDate &&
								endingDate &&
								comments &&
								mandays &&
								lastUpdate &&
								status 
							)} 
							onClick={this.handleClick}
						/>
				</Grid>
			</Grid>
	)};
}

export default withStyles(styles)(FormView);
