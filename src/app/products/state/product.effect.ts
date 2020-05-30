import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import { ProductActionsTypes, LoadSuccess, LoadFail, ProductActions, Update, UpdateSuccess, UpdateFail, CreateSuccess, CreateFail, Create, Delete, DeleteSuccess } from './product.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Product } from '../product';


@Injectable()
export class ProcuctEffect{
    constructor(private action$: Actions, 
        private productService: ProductService){}

        @Effect()
        loadProduct = this.action$.pipe(
            ofType(ProductActionsTypes.Load),
            mergeMap(ac => this.productService.getProducts().pipe(
                map(prod => (new LoadSuccess(prod))),
                catchError(err => of(new LoadFail(err)))
            ))
        )

        @Effect()
        updateProduct = this.action$.pipe(
            ofType(ProductActionsTypes.Update),
            map((action: Update) => action.payload),
            mergeMap((prod: Product) =>
                this.productService.updateProduct(prod).pipe(
                    map(updated => (new UpdateSuccess(updated))),
                    catchError(err => of(new UpdateFail(err)))
                )
            )
        );

        @Effect()
        createProduct = this.action$.pipe(
            ofType(ProductActionsTypes.Create),
            map((action: Create) => action.payload),
            mergeMap((prod: Product) =>
                this.productService.createProduct(prod).pipe(
                    map(newProd => (new CreateSuccess(newProd))),
                    catchError(err => of(new CreateFail(err)))
                )
            )
        );

        @Effect()
        deleteProduct = this.action$.pipe(
            ofType(ProductActionsTypes.Delete),
            map((action: Delete) => action.payload),
            mergeMap((id: number) =>
                this.productService.deleteProduct(id).pipe(
                    map(() => (new DeleteSuccess(id))),
                    catchError(err => of(new CreateFail(err)))
                )
            )
        );
}