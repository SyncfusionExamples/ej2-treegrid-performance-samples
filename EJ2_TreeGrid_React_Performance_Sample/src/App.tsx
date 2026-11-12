import React, { useState, useRef } from 'react';
import {
  TreeGridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Sort,
  Filter,
  DomVirtualization,
  type FilterSettingsModel,
} from '@syncfusion/ej2-react-treegrid';
import {
  DropDownListComponent,
} from '@syncfusion/ej2-react-dropdowns';
import type {ChangeEventArgs} from '@syncfusion/ej2-react-dropdowns';

import { virtualData, dataSource } from './employee-data';
import { getGridPerformanceTiming } from './grid-performance';

const App: React.FC = () => {
  const pageSizes = [
    { value: 100, text: '100 Rows' },
    { value: 1000, text: '1000 Rows' },
    { value: 2000, text: '2000 Rows' }
  ];

  const dropdownFields = {
    value: 'value',
    text: 'text'
  };

  const filterSettings: FilterSettingsModel = {
    type: 'CheckBox'
  };

  const [pageSettings, setPageSettings] = useState({
    pageSize: 100,
    pageSizes: [100, 1000, 2000]
  });

  const [data, setData] = useState<any[]>([]);
  const [gridVisible, setGridVisible] = useState(false);
  const [performanceAction, setPerformanceAction] = useState('');
  const [performanceDuration, setPerformanceDuration] = useState('');

  const dataLoaded = useRef(false);
  const actionStartedAt = useRef(0);

  const renderGrid = () => {
    if (!dataLoaded.current) {
      dataSource();
      setData([...virtualData]);
      dataLoaded.current = true;
    }

    actionStartedAt.current = performance.now();
    setPerformanceAction('');
    setPerformanceDuration('');
    setGridVisible(true);
  };

  const destroyGrid = () => {
    setGridVisible(false);
  };

  const onPageSizeChange = (args: ChangeEventArgs) => {
    setPageSettings(prev => ({
      ...prev,
      pageSize: Number(args.value)
    }));
  };

  const onActionBegin = () => {
    actionStartedAt.current = performance.now();
  };

  const onActionComplete = (args: any) => {
    completeAction(
      args.requestType,
      actionStartedAt.current
    );
  };

  const onGridCreated = () => {
    completeAction(
      'initialLoad',
      actionStartedAt.current
    );
  };

  const completeAction = (
    requestType: string,
    startedAt: number
  ) => {
    setTimeout(() => {
      const timing = getGridPerformanceTiming(
        requestType,
        startedAt,
        performance.now()
      );

      setPerformanceDuration(timing.duration);
      setPerformanceAction(timing.action);
    }, 0);
  };

  return (
    <div>
      <button id="render" type="button" onClick={renderGrid}>
        Render Grid
      </button>

      <button id="destroy" type="button" onClick={destroyGrid}>
        Destroy Grid
      </button>

      <DropDownListComponent
        id="ddl"
        dataSource={pageSizes}
        fields={dropdownFields}
        value={pageSettings.pageSize}
        width={200}
        popupHeight="200px"
        change={onPageSizeChange}
      />

      <br />
      <br />

      {gridVisible && (
        <>
          <h4 className="grid-title">
            Combination of all actions
          </h4>

          <p id="performanceTime" aria-live="polite">
            {performanceAction && (
              <>
                Time Taken for {performanceAction}:{' '}
                <b>{performanceDuration}ms</b>
              </>
            )}
          </p>

          <div className="control-section">
            <TreeGridComponent
              dataSource={data}
              allowSorting={true}
              allowFiltering={true}
              filterSettings={filterSettings}
              enableDomVirtualization={true}
              enableVirtualization={true}
              // allowPaging={true}
              pageSettings={pageSettings}
              height={350}
              childMapping="Crew"
              actionBegin={onActionBegin}
              actionComplete={onActionComplete}
              created={onGridCreated}
            >
              <ColumnsDirective>
                <ColumnDirective
                  field="TaskID"
                  headerText="Player Jersey"
                  width="120"
                  textAlign="Right"
                />
                <ColumnDirective
                  field="FIELD1"
                  headerText="Player Name"
                  width="120"
                />
                <ColumnDirective
                  field="FIELD2"
                  headerText="Year"
                  width="100"
                  textAlign="Right"
                />
                <ColumnDirective
                  field="FIELD3"
                  headerText="Stint"
                  width="120"
                  textAlign="Right"
                />
                <ColumnDirective
                  field="FIELD4"
                  headerText="TMID"
                  width="120"
                  textAlign="Right"
                />
                <ColumnDirective
                  field="FIELD5"
                  headerText="LGID"
                  width="120"
                  textAlign="Right"
                />
                <ColumnDirective
                  field="FIELD6"
                  headerText="GP"
                  width="120"
                  textAlign="Right"
                />
                <ColumnDirective
                  field="FIELD7"
                  headerText="GS"
                  width="120"
                  textAlign="Right"
                />
                <ColumnDirective
                  field="FIELD8"
                  headerText="Minutes"
                  width="120"
                  textAlign="Right"
                />
                <ColumnDirective
                  field="FIELD9"
                  headerText="Points"
                  width="120"
                  textAlign="Right"
                />
                <ColumnDirective
                  field="FIELD10"
                  headerText="oRebounds"
                  width="120"
                  textAlign="Right"
                />
                <ColumnDirective
                  field="FIELD11"
                  headerText="dRebounds"
                  width="120"
                  textAlign="Right"
                />
                <ColumnDirective
                  field="FIELD12"
                  headerText="Rebounds"
                  width="120"
                  textAlign="Right"
                />
                <ColumnDirective
                  field="FIELD13"
                  headerText="Assists"
                  width="120"
                  textAlign="Right"
                />
                <ColumnDirective
                  field="FIELD14"
                  headerText="Steals"
                  width="120"
                  textAlign="Right"
                />
                <ColumnDirective
                  field="FIELD15"
                  headerText="Blocks"
                  width="120"
                  textAlign="Right"
                />
                <ColumnDirective
                  field="FIELD16"
                  headerText="Turnovers"
                  width="120"
                  textAlign="Right"
                />
                <ColumnDirective
                  field="FIELD17"
                  headerText="PF"
                  width="120"
                  textAlign="Right"
                />
                <ColumnDirective
                  field="FIELD18"
                  headerText="fgAttempted"
                  width="120"
                  textAlign="Right"
                />
                <ColumnDirective
                  field="FIELD19"
                  headerText="ftAttempted"
                  width="120"
                  textAlign="Right"
                />
                <ColumnDirective
                  field="FIELD20"
                  headerText="ThreeAttempted"
                  width="120"
                  textAlign="Right"
                />
              </ColumnsDirective>

              <Inject services={[Page, Sort, Filter, DomVirtualization]} />
            </TreeGridComponent>
          </div>
        </>
      )}
    </div>
  );
};

export default App;