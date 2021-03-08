import {NgModule} from '@angular/core';
import {GamesListComponent} from './games-list/games-list.component';
import {GamesEditComponent} from './games-edit/games-edit.component';
import {GamesCreateComponent} from './games-create/games-create.component';
import {GamesRoutingModule} from './games-routing.module';
import {CommonModule} from '@angular/common';
import {GamesComponent} from './games/games.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    GamesListComponent,
    GamesEditComponent,
    GamesCreateComponent,
    GamesComponent
  ],
  imports: [
    BrowserAnimationsModule,
    GamesRoutingModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: []
})
export class GamesModule { }
