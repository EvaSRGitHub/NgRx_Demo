import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
//Product module is lazy loaded so its state need to be included in interface, which extends global state, not in the global state itself.
export interface Sate extends fromRoot.State{
    products: ProductState;
}

export interface ProductState{
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
}

const initialState: ProductState = {
    showProductCode: true,
    currentProduct:null,
    products:[]
}

const getFeatureSelector = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(getFeatureSelector, state => state.showProductCode);

export const getCurrentProduct = createSelector(getFeatureSelector, state => state.currentProduct);

export const getProducts = createSelector(getFeatureSelector, state => state.products);

export function reducer(state = initialState, action): ProductState{
    switch(action.type){
        case 'TOGGLE_PRODUCT':
            return {
                ...state, showProductCode: action.payload
            };
        
        default: return state;
    }
}