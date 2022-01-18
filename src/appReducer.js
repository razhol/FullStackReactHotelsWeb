
const appReducer = (state = {orders : []}  , action) =>
{
    switch(action.type)
    {
        case "UPDATE" :
            return { ...state, orders: action.payload }
      
        default:
            return state;
    }
}
export default appReducer;