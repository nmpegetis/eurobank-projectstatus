import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function BoardView(props) {
	return <div className={props.root}>{"Board Component"}</div>;
}

export default withStyles(styles)(BoardView);
