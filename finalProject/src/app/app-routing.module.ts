import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HomeTextComponent } from './home-text/home-text.component';

const routes: Routes = [
  { path: '', component: HomeTextComponent},
  { path: 'home', component: HomeTextComponent},
  { path: 'visualizer', component: FileUploadComponent},
  { path: "**", component: HomeTextComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeTextComponent, FileUploadComponent]
