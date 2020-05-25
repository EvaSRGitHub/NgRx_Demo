import { Action } from '@ngrx/store';
import { Product } from '../product';

export enum ProductActionsTypes{
    ToggleProductCode = '[Products] Toggle Product Code',
    SetCurrentProduct = '[Products] Set Current Product',
    ClearCurrentProduct = '[Products] Clear Current Product',
    InitializeCurrentProduct = '[Products] Initialize Current Product',
    Load = '[Products] Load',
    LoadSuccess = '[Products] Load Success',
    LoadFail = '[Products] Load Fail'
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

export class Load implements Action{
    readonly type = ProductActionsTypes.Load;
}

export class LoadSuccess implements Action{
    readonly type = ProductActionsTypes.LoadSuccess;

    constructor(public payload: Product[]){}
}

export class LoadFail implements Action{
    readonly type = ProductActionsTypes.LoadFail;

    constructor(public payload: string){}
}

export type ProductActions = ToggleProductCode | ClearCurrentProduct | SetCurrentProduct | InitializeCurrentProduct | Load | LoadSuccess | LoadFail;