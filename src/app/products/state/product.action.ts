import { Action } from '@ngrx/store';
import { Product } from '../product';

export enum ProductActionsTypes{
    ToggleProductCode = '[Products] Toggle Product Code',
    SetCurrentProduct = '[Products] Set Current Product',
    ClearCurrentProduct = '[Products] Clear Current Product',
    InitializeCurrentProduct = '[Products] Initialize Current Product',
    Load = '[Products] Load',
    LoadSuccess = '[Products] Load Success',
    LoadFail = '[Products] Load Fail',
    Update = '[Products] Update',
    UpdateSuccess = '[Products] Update Success',
    UpdateFail = '[Products] Update Fail',
    CreateSuccess = '[Products] Create Success',
    CreateFail = '[Products] Create Fail',
    Create = '[Products] Create',
    Delete = '[Products] Delete',
    DeleteSuccess = '[Products] Delete Success',
    DeleteFail = '[Products] Delete Fail'
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

export class Update implements Action{
    readonly type = ProductActionsTypes.Update;
    
    constructor(public payload: Product){}
}

export class UpdateSuccess implements Action{
    readonly type = ProductActionsTypes.UpdateSuccess;

    constructor(public payload: Product){}
}

export class UpdateFail implements Action{
    readonly type = ProductActionsTypes.UpdateFail;

    constructor(public payload: string){}
}

export class Create implements Action{
    readonly type = ProductActionsTypes.Create;

    constructor(public payload: Product){}
}

export class CreateSuccess implements Action{
    readonly type = ProductActionsTypes.CreateSuccess;

    constructor(public payload: Product){}
}

export class CreateFail implements Action{
    readonly type = ProductActionsTypes.CreateFail;

    constructor(public payload: string){}
}

export class Delete implements Action{
    readonly type = ProductActionsTypes.Delete;

    constructor(public payload: number){}
}

export class DeleteSuccess implements Action{
    readonly type = ProductActionsTypes.DeleteSuccess;

    constructor(public payload: number){}
}

export class DeleteFail implements Action{
    readonly type = ProductActionsTypes.DeleteFail;

    constructor(public payload: string){}
}

export type ProductActions = ToggleProductCode | ClearCurrentProduct | SetCurrentProduct | InitializeCurrentProduct | Load | LoadSuccess | LoadFail | Update | UpdateSuccess | UpdateFail | CreateSuccess | CreateFail | Create | Delete | DeleteSuccess | DeleteFail; 