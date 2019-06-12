import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from './menu';
import styles from './styles';

/**
 * @param {object} classes
 * @param {boolean} open
 * @param {function} onDrawerClose
 * @returns {Component} {Drawer}
 */
const SideDrawer = withStyles(styles)(({ classes, open, onDrawerClose }) => (
	<Drawer
		variant="permanent"
		classes={{
			paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
		}}
		open={open}
	>
		<div className={classes.toolbarIcon}>
			<IconButton onClick={onDrawerClose}>
				<ChevronLeftIcon />
			</IconButton>
		</div>
		<Divider />
		<List>{mainListItems}</List>
	</Drawer>
));

export default SideDrawer;
