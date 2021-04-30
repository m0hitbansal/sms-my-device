import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'set-password', loadChildren: './set-password/set-password.module#SetPasswordPageModule' },
  { path: 'set-commands', loadChildren: './set-commands/set-commands.module#SetCommandsPageModule' },
  { path: 'show-commands', loadChildren: './show-commands/show-commands.module#ShowCommandsPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
