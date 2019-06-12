import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

function DatePickerView({ classes, label, initialDate, name, onChange, pickerType = 'date' }) {
	const [ selectedDate, setSelectedDate ] = useState(initialDate);
	const handleClick = (date) => {
		setSelectedDate(date);
		onChange(date);
	} 
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Grid container className={classes.grid}>
				{pickerType === 'date' ? (
					<KeyboardDatePicker
						autoOk
						variant="inline"
						label={label || 'Date picker'}
						format="dd/MM/yyyy"
						name={name}
						value={selectedDate}
						InputAdornmentProps={{ position: 'end' }}
						onChange={handleClick}
						style={{ marginRight: -5 }}
					/>
				) : (
					<KeyboardTimePicker
						autoOk
						variant="inline"
						margin="normal"
						label={label || 'Time picker'}
						name={name}
						value={selectedDate}
						InputAdornmentProps={{ position: 'end' }}
						onChange={handleClick}
					/>
				)}
			</Grid>
		</MuiPickersUtilsProvider>
	);
}

export default withStyles(styles)(DatePickerView);
