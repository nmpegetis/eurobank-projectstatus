import BoardView from './BoardView';
import { columnsGenerator } from './utils';
import { connect } from 'react-redux';
import { getData } from '../../actions';

const mapStateToProps = state => ({
  data: state
});

const mapDispatchToProps = (getData());

export { columnsGenerator };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardView);