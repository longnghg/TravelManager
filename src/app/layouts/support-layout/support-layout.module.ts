import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupportLayoutRoutes } from './support-layout.routing';

import { PipesModule } from "../../pipes/pipes.module";
import { ChatComponent } from '../../pages/chat/chat.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SupportLayoutRoutes),
    FormsModule,
    PipesModule,
  ],
  declarations: [
    ChatComponent
  ],
  providers: [NavbarComponent]

})
export class SupportLayoutModule { }
