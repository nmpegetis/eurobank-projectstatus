import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function ComponentsView(props) {
	return <div className={props.root}>{"Components Component"}</div>;
}

export default withStyles(styles)(ComponentsView);
