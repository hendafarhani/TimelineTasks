import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { CardDialogComponent } from './components/card-dialog/card-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CardsTableComponent } from './components/cards-table/cards-table.component';
import { TimelineHeaderComponent } from './components/timeline-header/timeline-header.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { filterDataReducer } from './store/filter/filter-data.reducer';
import { timelineTasksReducer } from './store/timelineTasks/timeline-tasks-reducer';
import { weekDataReducer } from './store/week/week-data-reducer';
import { TimelineTasksEffectsService } from './store/timelineTasks/timeline-tasks-effects.service';
import { FilterDataEffectsService } from './store/filter/filter-data-effects.service';
import { CardsComponent } from './components/cards/cards.component';
import { ErrorDialogComponent } from './shared/components/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    CardDialogComponent,
    CardsTableComponent,
    TimelineHeaderComponent,
    ErrorDialogComponent,
    CardsComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatTableModule,
    MatCardModule,
    HttpClientModule,
    MatToolbarModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TextFieldModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forRoot({ timelineTasks: timelineTasksReducer, weekData: weekDataReducer, filterData: filterDataReducer }),
    EffectsModule.forRoot([TimelineTasksEffectsService, FilterDataEffectsService]),
    MatIconModule,
    MatNativeDateModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
