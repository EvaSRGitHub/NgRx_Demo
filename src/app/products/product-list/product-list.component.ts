import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.action';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;
  displayCode: boolean;
  products: Product[];
  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  componentActive: boolean = true;
  errorMessage$: Observable<string>;
 
  
  constructor(private productService: ProductService, 
    private store: Store<fromProduct.State>){ }

  ngOnInit(): void {

    this.store.pipe(
      select(fromProduct.getProducts),
      takeWhile(() => this.componentActive))
      .subscribe((products:Product[]) => this.products = products);

      // Do NOT subscribe here because it used an async pipe
      this.errorMessage$ = this.store.pipe(select(fromProduct.getError));

      this.store.dispatch(new productActions.Load());

   this.store.pipe(
     select(fromProduct.getCurrentProduct),
     takeWhile(() => this.componentActive)) 
     .subscribe(cp => this.selectedProduct = cp);

    
    this.store.pipe(
      select(fromProduct.getShowProductCode),
      takeWhile(() => this.componentActive)
    ).subscribe(result => {
        this.displayCode = result;
    });
  }

  ngOnDestroy(): void {
  this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
}
  
  newProduct(): void {
   this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
  this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

}
