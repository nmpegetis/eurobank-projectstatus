import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

function ButtonView(props) {
	const { color,disabled, onClick,text } = props;
	return (
		<div>
				<Button
					disabled={disabled}
					variant="contained"
					color={color}
					onClick={onClick}
				>
					{text}
				</Button>
		</div>
	);
}

ButtonView.propTypes = {
	color: PropTypes.oneOf(['primary', 'secondary']),
	disabled: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
};

export default ButtonView;
