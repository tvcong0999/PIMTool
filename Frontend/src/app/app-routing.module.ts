import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ProjectComponent } from './Project/components/project.component';

const routes: Routes = [
  { path: 'project', component: ProjectComponent, loadChildren: () => import('./Project/project.module').then(m => m.ProjectModule) },
  // { path: 'project', component: ProjectComponent},
  { path: 'page-error', component: ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
