import FormView from './FormView';
import { connect } from 'react-redux'
import { addRow } from '../../actions'

const mapDispatchToProps = {
  addRow
}
export default connect(null,mapDispatchToProps)(FormView);