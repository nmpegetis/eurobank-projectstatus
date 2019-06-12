import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function FormView(props) {
	return <div className={props.root}>{"Form Component"}</div>;
}

export default withStyles(styles)(FormView);
