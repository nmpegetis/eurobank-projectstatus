import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Table } from '../../components';
import { Tag } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function BoardView(props) {
	const columns = Array.isArray(props.data) && props.data.length ? Object.keys(props.data[0]).map((key) => ({
					title: key.toUpperCase(),
					dataIndex: key,
					key: key,
					render: (inputElement) =>
						key === 'unit' ? (
							<a href="javascript:;">{inputElement}</a>
						) : key === 'team' ? (
							<span>
								{inputElement.map((tag) => {
									return <Tag key={tag}>{tag.toUpperCase()}</Tag>;
								})}
							</span>
						) : key === 'status' ? (
							<span>
								<Tag
									color={
										inputElement === 'Started' ? 'green' : inputElement === 'On going' ? 'geekblue' : 'volcano'
									}
									key={inputElement}
								>
									{inputElement.toUpperCase()}
								</Tag>
							</span>
						) : (
							inputElement
						),
				})) : [] 
	return (
			<Table columns={columns} data={props.data}/>
	);
}

export default withStyles(styles)(BoardView);
