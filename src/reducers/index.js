export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_ROW':
      return [
        ...state,
        action.payload,
      ]
    default:
      return state
  }
}