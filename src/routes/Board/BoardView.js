import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Table } from '../../components';
import { columnsGenerator } from './utils';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function BoardView(props) {
	const columns = Array.isArray(props.data) && props.data.length ? columnsGenerator(props.data[0]) : [] 
	return (
			<Table columns={columns} data={props.data}/>
	);
}

export default withStyles(styles)(BoardView);
