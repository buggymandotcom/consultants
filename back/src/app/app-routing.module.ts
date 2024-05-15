import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CanActivateClientGuard} from "./core/auth/guards/client.guard";
import {CanActivateAdminGuard} from "./core/auth/guards/admin.guard";

const appRoutes: Routes = [
  {
    path      : 'auth',
    loadChildren: './core/auth/auth.module#AuthModule'
  },
  {
    path      : 'client',
    loadChildren: './main/pages/client/client.module#ClientPagesModule',
    canActivate : [CanActivateClientGuard],
  },
  {
    path      : 'admin',
    loadChildren: './main/pages/admin/admin.module#AdminPagesModule',
    canActivate : [CanActivateAdminGuard],
  },
    //todo revisar cuando se entra a ''
  {
    path      : '',
    redirectTo: 'client/services',
    canActivate : [CanActivateClientGuard],
    pathMatch : 'full',
  },
  /*{
    path      : '**',

  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [
    CanActivateClientGuard,
    CanActivateAdminGuard

  ]
})
export class RoutingModule { }