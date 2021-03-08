import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {ErrorsModule} from './errors/errors.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {GamesModule} from './games/games.module';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
    ErrorsModule,
    GamesModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ViewsModule { }
