import BoardView from './BoardView';
import { columnsGenerator } from './utils';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  data: state
});

export { columnsGenerator };

export default connect(
  mapStateToProps,
)(BoardView);