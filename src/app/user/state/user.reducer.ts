import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../user';

export interface UserState{
    maskUsername: boolean;
    currentUser: User;
}

const initialState: UserState = {
    maskUsername: true,
    currentUser: null
}

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUsername = createSelector(getUserFeatureState, state => state.maskUsername);

export const getCurrentUser = createSelector(getUserFeatureState, state => state.currentUser);


export function reducer(state = initialState, action): UserState{
    switch(action.type){
        case 'MASK_USERNAME':
            return {
                ...state, maskUsername: action.payload
            }
        
        default: return state;    
    }
}