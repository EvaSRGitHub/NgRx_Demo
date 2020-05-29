import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import { ProductActionsTypes, LoadSuccess, LoadFail } from './product.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


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
}