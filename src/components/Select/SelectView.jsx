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
