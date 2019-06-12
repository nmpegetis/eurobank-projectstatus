import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

function DatePickerView({ classes, label, initialDate, pickerType = 'date' }) {
	const [ selectedDate, setSelectedDate ] = useState(initialDate);

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Grid container className={classes.grid}>
				{pickerType === 'date' ? (
					<KeyboardDatePicker
						autoOk
						variant="inline"
						label={label || 'Date picker'}
						format="dd/MM/yyyy"
						value={selectedDate}
						InputAdornmentProps={{ position: 'end' }}
						onChange={setSelectedDate}
						style={{ marginRight: -5 }}
					/>
				) : (
					<KeyboardTimePicker
						autoOk
						variant="inline"
						margin="normal"
						label={label || 'Time picker'}
						value={selectedDate}
						InputAdornmentProps={{ position: 'end' }}
						onChange={setSelectedDate}
					/>
				)}
			</Grid>
		</MuiPickersUtilsProvider>
	);
}

export default withStyles(styles)(DatePickerView);
