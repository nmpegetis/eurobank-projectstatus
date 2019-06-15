export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_ROW':
      return [
        ...state,
        action.payload,
      ]
    case 'GET_ROWS':
    default:
      return state
  }
}