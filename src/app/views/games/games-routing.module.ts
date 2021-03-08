import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GamesListComponent} from './games-list/games-list.component';
import {GamesEditComponent} from './games-edit/games-edit.component';
import {CommonModule} from '@angular/common';
import {GamesComponent} from './games/games.component';
import {GamesCreateComponent} from './games-create/games-create.component';

const routes: Routes = [
  {
    path: 'games',
    component: GamesComponent,
    children: [
      {
        path: '',
        component: GamesListComponent
      },
      {
        path: 'new',
        component: GamesCreateComponent
      },
      {
        path: ':id',
        component: GamesEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
