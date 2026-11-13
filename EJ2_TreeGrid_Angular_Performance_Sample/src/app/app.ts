import { Component, signal } from '@angular/core';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import {
  DomVirtualizationService,
  FilterService,
  TreeGridModule, 
  PageService,
  SortService,
} from '@syncfusion/ej2-angular-treegrid';
// import { EmployeeRecord, getTradeData } from './employee-data';
import {  virtualData, dataSource  } from './employee-data';
import { getGridPerformanceTiming } from './grid-performance';

@Component({
  imports: [DropDownListModule, TreeGridModule],
  providers: [
    DomVirtualizationService,
    FilterService,
    PageService,
    SortService,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: 'app.html',
})
export class App {
  readonly pageSizes = [
    { value: 100, text: '100 Rows' },
    { value: 1000, text: '1000 Rows' },
    { value: 2000, text: '2000 Rows' },
  ];
  readonly dropdownFields = { value: 'value', text: 'text' };
  readonly filterSettings = { type: 'CheckBox' };
  pageSettings = { pageSize: 100, pageSizes: [100, 1000, 2000] };
  data: any[] = [];
  gridVisible = false;
  readonly performanceAction = signal('');
  readonly performanceDuration = signal('');

  private dataLoaded = false;
  private actionStartedAt = 0;

  renderGrid(): void {
    if (!this.dataLoaded) {
      dataSource()
      this.data = virtualData;
      this.dataLoaded = true;
    }
    this.actionStartedAt = performance.now();
    this.performanceAction.set('');
    this.performanceDuration.set('');
    this.gridVisible = true;
  }

  destroyGrid(): void {
    this.gridVisible = false;
  }

  onPageSizeChange(event: { value: number | string }): void {
    this.pageSettings = {
      ...this.pageSettings,
      pageSize: Number(event.value),
    };
  }

  onActionBegin(): void {
    this.actionStartedAt = performance.now();
  }

  onActionComplete(event: { requestType: string }): void {
    this.completeAction(event.requestType, this.actionStartedAt);
  }

  onGridCreated(): void {
    this.completeAction('initialLoad', this.actionStartedAt);
  }

  private completeAction(requestType: string, startedAt: number): void {
    setTimeout(() => {
      const timing = getGridPerformanceTiming(
        requestType,
        startedAt,
        performance.now(),
      );
      this.performanceDuration.set(timing.duration);
      this.performanceAction.set(timing.action);
    }, 0);
  }
}
