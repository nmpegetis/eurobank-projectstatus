import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Button } from '../../components';

function ComponentsView(props) {
	return (
		<Fragment>
				<Button text="Click me!" color="primary" disabled={false} onClick={()=>alert('clicked')}/>
				<Button text="Click me!" color="secondary" disabled={true} onClick={()=>alert('cannot be clicked')}/>
		</Fragment>
	);
}

export default withStyles(styles)(ComponentsView);
