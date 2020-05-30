import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionsTypes } from './product.action';

//Product module is lazy loaded so its state need to be included in interface, which extends global state, not in the global state itself.
export interface State extends fromRoot.State{
    products: ProductState;
}

export interface ProductState{
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId:null,
    products:[],
    error: ''
}

const getFeatureSelector = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(getFeatureSelector, state => state.showProductCode);

export const getCurrentProductId = createSelector(getFeatureSelector, state => state.currentProductId);

//use the technique compose selectors
export const getCurrentProduct = createSelector(
    getFeatureSelector, 
    getCurrentProductId, 
    (state, id) => {
    if (id === 0){
        return {
            id: 0,
            productCode: 'New',
            productName: '',
            description: '',
            starRating: 0
        }
    }else{
        return id ? state.products.find(p => p.id === state.currentProductId) : null;
    }
}
);

export const getProducts = createSelector(getFeatureSelector, state => state.products);

export const getError = createSelector(getFeatureSelector, state => state.error);

export function reducer(state = initialState, action: ProductActions): ProductState{
    switch(action.type){
        case ProductActionsTypes.ToggleProductCode:
            return {
                ...state, showProductCode: action.payload
            };
        
            case ProductActionsTypes.SetCurrentProduct:
                return {...state, currentProductId: action.payload.id};

            case ProductActionsTypes.ClearCurrentProduct:
                return {...state, currentProductId: null};

            case ProductActionsTypes.InitializeCurrentProduct:
                return {...state, currentProductId: 0}               
            
            case ProductActionsTypes.LoadSuccess:
                return {...state, products: action.payload, error: ''}    
            
            case ProductActionsTypes.LoadFail:
                return {...state, products: [], error: action.payload}

            case ProductActionsTypes.UpdateSuccess:
                const updatedProds = state.products.map(p => p.id === action.payload.id ? action.payload : p);

                return{
                    ...state, products: updatedProds, currentProductId: action.payload.id, error: '' 
                }    

            case ProductActionsTypes.UpdateFail:
                return{...state, error: action.payload}    


        default: return state;
    }
}