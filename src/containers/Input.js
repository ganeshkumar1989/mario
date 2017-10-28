import { connect } from 'react-redux';
import * as inputActions from '../actions/inputActions';
import Input from '../components/Input';
import { withRouter } from 'react-router'

const mapStateToProps = (state) => {
  return {
    mappedInputState:state.inputState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    mappedSubmit: () => dispatch(inputActions.submit()),
    mappedChangeInput: (name, value) => dispatch(inputActions.changeInput(name, value)),
    mappedLoadGame: (rows, columns) => dispatch(inputActions.loadGame(rows, columns))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Input));