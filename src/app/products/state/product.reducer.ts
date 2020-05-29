import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionsTypes } from './product.action';
//Product module is lazy loaded so its state need to be included in interface, which extends global state, not in the global state itself.
export interface Sate extends fromRoot.State{
    products: ProductState;
}

export interface ProductState{
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
    error: string;
}

const initialState: ProductState = {
    showProductCode: true,
    currentProduct:null,
    products:[],
    error: ''
}

const getFeatureSelector = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(getFeatureSelector, state => state.showProductCode);

export const getCurrentProduct = createSelector(getFeatureSelector, state => state.currentProduct);

export const getProducts = createSelector(getFeatureSelector, state => state.products);

export const getError = createSelector(getFeatureSelector, state => state.error);

export function reducer(state = initialState, action: ProductActions): ProductState{
    switch(action.type){
        case ProductActionsTypes.ToggleProductCode:
            return {
                ...state, showProductCode: action.payload
            };
        
            case ProductActionsTypes.SetCurrentProduct:
                //as we are passing a ref to the current product in to the store and if we change a property of tha product in out comonent we may mutate the object in out store. To prevent this we pass a copy of the current product by using the spread operator.
                return {...state, currentProduct:   {...action.payload}};

            case ProductActionsTypes.ClearCurrentProduct:
                return {...state, currentProduct: null};

            case ProductActionsTypes.InitializeCurrentProduct:
                return {...state, currentProduct: {
                    id: 0,
                    productName: '',
                    productCode: 'New',
                    description: '',
                    starRating: 0
                }}               
            
            case ProductActionsTypes.LoadSuccess:
                return {...state, products: action.payload, error: ''}    
            
            case ProductActionsTypes.LoadFail:
                return {...state, products: [], error: action.payload}


        default: return state;
    }
}