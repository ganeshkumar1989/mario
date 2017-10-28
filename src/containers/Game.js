import { connect } from 'react-redux';
import * as gameActions from '../actions/gameActions';
import Game from '../components/Game';

const mapStateToProps = (state,ownProps) => {
  return {
    mappedGameState: state.gameState,
    config: {
        rows: state.inputState.rows,
        columns: state.inputState.columns
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    mappedInitialize: (tiles, foodTiles) => dispatch(gameActions.initialize(tiles, foodTiles)),
    mappedStartGame: () => dispatch(gameActions.startGame()),
    mappedKeyPressed: (key) => dispatch(gameActions.keyPressed(key)),
    mappedNextMove: (rows, columns) => dispatch(gameActions.nextMove(rows, columns)),
    mappedEndGame: () => dispatch(gameActions.endGame())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Game);