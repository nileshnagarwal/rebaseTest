import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
import {MatIconModule, MatInputModule, MatAutocompleteModule, MatSliderModule} from '@angular/material';

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
    MatSelectModule,
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
    MatSelectModule,
  ],
})
export class MaterialDesignModule { }
