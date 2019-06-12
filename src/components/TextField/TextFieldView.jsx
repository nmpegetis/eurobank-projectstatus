import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

function TextFieldView({ classes, label, name, onChange, style, value = '', disabled = false }) {
	return (
		<div>
			<FormControl variant="outlined" className={classes.container} noValidate autoComplete="off">
				<TextField
					className={classes.textField}
					defaultValue={value}
					disabled={disabled}
					label={label}
					name={name}
					onChange={({ target: { name, value } }) => onChange(name, value)}
					style={style}
					margin="normal"
	/>
			</FormControl>
		</div>
	);
}

export default withStyles(styles)(TextFieldView);
