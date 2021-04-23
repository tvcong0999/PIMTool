import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectListComponent } from './components';
import { ProjectCreateComponent } from './components/project-create/project-create.component';

const routes: Routes = [
    { path: 'list', component: ProjectListComponent},
    { path: 'new', component: ProjectCreateComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectRoutingModule {
}
