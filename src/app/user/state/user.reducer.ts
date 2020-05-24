import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../user';
import { UserActions, UserActionTypes } from './user.action';

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


export function reducer(state = initialState, action: UserActions): UserState{
    switch(action.type){
        case UserActionTypes.MaskUserName:
            return {
                ...state, maskUsername: action.payload
            }
        
        default: return state;    
    }
}