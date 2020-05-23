export function reducer(state, action){
    switch(action.type){
        case 'MASK_USERNAME':
            return {
                ...state, maskUsername: action.payload
            }
        
        default: return state;    
    }
}