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
						onChange={this.handleSelectChange}
						name="supervisor"
						value={null}
				/>
			</Grid>
			<Grid item xs={2}>
					<Select
						title="Team"
						data={this.members}
						disabled={false}
						isEmptyDisabled={false}
						onChange={this.handleSelectChange}
						name="team"
						value={null}
				/>
			</Grid>
			<Grid item xs={2}>
				<DatePicker label="Starting Date" name='startingdate' initialDate={new Date('2020-01-01T00:00:00.000Z')} onChange={this.handleChange}/>
			</Grid>
			<Grid item xs={2}>
				<DatePicker label="Ending Date" name='endingdate' initialDate={new Date('2020-01-01T00:00:00.000Z')} onChange={this.handleChange}/>
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
				<DatePicker label="Last Update" name='lastupdate' initialDate={new Date('2020-01-01T00:00:00.000Z')} onChange={this.handleChange}/>
			</Grid>
			<Grid item xs={2}>
					<Select
						title="Status"
						data={this.status}
						disabled={false}
						isEmptyDisabled={false}
						onChange={this.handleSelectChange}
						name="status"
						value={null}
				/>
			</Grid>
			<Grid item xs={12}>
					<Button text="Click me!" color="primary" disabled={false} onClick={this.handleClick}/>
			</Grid>
		</Grid>
	)};
}

export default withStyles(styles)(FormView);
