import React from 'react'
import { Tag } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

export const columnsGenerator = (data) => Object.keys(data).map((key) => ({
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
				}));