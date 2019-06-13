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
