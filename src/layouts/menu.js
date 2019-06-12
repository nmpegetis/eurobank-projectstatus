import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import BuildIcon from '@material-ui/icons/Build';
import { Link } from 'react-router-dom';

export const mainMenuEntries = {
	Board: { link: '/', renderIcon: () => <CalendarTodayIcon /> },
	Form: { link: '/form', renderIcon: () => <LibraryBooksIcon /> },
	Components: { link: '/widgets', renderIcon: () => <BuildIcon /> },
};

export const mainListItems = [
	Object.keys(mainMenuEntries).map((entry) => (
		<Link to={mainMenuEntries[entry].link} style={{ textDecoration: 'none' }}>
			<ListItem button>
				<ListItemIcon>{mainMenuEntries[entry].renderIcon()}</ListItemIcon>
				<ListItemText primary={entry} />
			</ListItem>
		</Link>
	)),
];