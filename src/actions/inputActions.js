export const submit = () => {
  return {
    type: 'SUBMIT'
  }
}

export const changeInput = (name, value) => {
  return {
    type: 'INPUT_CHANGED',
    name, 
    value
  }
}

export const loadGame = (rows, columns) => {
  return {
    type: 'LOAD_GAME',
    rows, 
    columns
  }
}