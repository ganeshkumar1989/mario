export const initialize = (tiles, foodTiles) => {
  return {
    type: 'INITIALIZE',
    tiles,
    foodTiles
  }
}

export const startGame = () => {
  return {
    type: 'START_GAME'
  }
}

export const keyPressed = (key) => {
  return {
    type: 'KEY_PRESSED',
    key
  }
}

export const nextMove = (rows, columns) => {
  return {
    type: 'NEXT_MOVE',
    rows, 
    columns
  }
}

export const endGame = () => {
  return {
    type: 'END_GAME'
  }
}