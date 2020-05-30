import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import { ProductActionsTypes, LoadSuccess, LoadFail, ProductActions, Update, UpdateSuccess, UpdateFail } from './product.action';
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
}