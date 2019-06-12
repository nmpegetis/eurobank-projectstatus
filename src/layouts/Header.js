import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { mainMenuEntries } from './menu';
import styles from './styles';

/**
 * @param {object} classes
 * @param {boolean} open
 * @param {function} onDrawerOpen
 * @param {object} history
 * @returns {Component} {Header}
 */
const Header = withStyles(styles)(({ classes, open, onDrawerOpen, history }) => (
	<AppBar position="absolute" className={classNames(classes.appBar, open && classes.appBarShift)}>
		<Toolbar disableGutters={!open} className={classes.toolbar}>
			<IconButton
				color="inherit"
				aria-label="Open drawer"
				onClick={onDrawerOpen}
				className={classNames(classes.menuButton, open && classes.menuButtonHidden)}
			>
				<MenuIcon />
			</IconButton>
			<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
				{history.location.pathname.split('/').length === 2 ? (
					Object.keys({ ...mainMenuEntries }).filter(
						(entry) =>
							(({ ...mainMenuEntries }[entry].link === history.location.pathname)[0])
					)
				) : (
					Object.keys({ ...mainMenuEntries }).filter(
						(entry) =>
							(({ ...mainMenuEntries }[entry].link ===
								'/' + history.location.pathname.split('/')[1])[0])
					)
				)}
			</Typography>
		</Toolbar>
	</AppBar>
));

export default Header;
