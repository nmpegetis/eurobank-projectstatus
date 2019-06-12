import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

import { Table } from 'antd';

function TableView({ columns, data }) {
	console.log(columns,data)
	return (
			<Table columns={columns} dataSource={data} />
	);
}

export default withStyles(styles)(TableView);