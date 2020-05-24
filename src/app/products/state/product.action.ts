import { Action } from '@ngrx/store';
import { Product } from '../product';

export enum ProductActionsTypes{
    ToggleProductCode = '[Products] Toggle Product Code',
    SetCurrentProduct = '[Products] Set Current Product',
    ClearCurrentProduct = '[Products] Clear Current Product',
    InitializeCurrentProduct = '[Products] Initialize Current Product'
}

export class ToggleProductCode implements Action{
    readonly type = ProductActionsTypes.ToggleProductCode;

    constructor(public payload: boolean){}
}

export class SetCurrentProduct implements Action{
    readonly type = ProductActionsTypes.SetCurrentProduct;

    constructor(public payload: Product){}
}

export class ClearCurrentProduct implements Action{
    readonly type = ProductActionsTypes.ClearCurrentProduct;
}

export class InitializeCurrentProduct implements Action{
    readonly type = ProductActionsTypes.InitializeCurrentProduct;
}

export type ProductActions = ToggleProductCode | ClearCurrentProduct | SetCurrentProduct | InitializeCurrentProduct;