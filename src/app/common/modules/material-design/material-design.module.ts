import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatFormField, MatFormFieldModule, MatIconModule, MatInputModule, MatAutocompleteModule, MatSliderModule} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatCheckboxModule,
  ],
  exports: [
    MatButtonModule, 
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatCheckboxModule,
  ]
})
export class MaterialDesignModule { }
