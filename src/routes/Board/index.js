import BoardView from './BoardView';
import { connect } from 'react-redux'
import { getData } from '../../actions'

const mapStateToProps = state => ({
  data: state
})

const mapDispatchToProps = (getData())

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardView);