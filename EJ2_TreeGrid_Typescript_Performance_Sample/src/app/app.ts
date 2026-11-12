import { virtualData, dataSource } from '../data';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import {
    TreeGrid,
    DomVirtualization,
    Filter,
    Page,
    Sort,
    Toolbar,
    VirtualScroll
} from '@syncfusion/ej2-treegrid';

interface EmployeeRecord {
    [field: string]: string | number | boolean | Date | null;
}

if (virtualData.length === 0) {
    dataSource();
}

declare global {
    interface Window {
        getTradeData(dataCount: number): EmployeeRecord[];
    }
}

// 1 Lakh Records


TreeGrid.Inject(
    Sort,
    Toolbar,
    Page,
    Filter,
    VirtualScroll,
    DomVirtualization
);

const renderButton = document.getElementById('render') as HTMLButtonElement;
const destroyButton = document.getElementById('destroy') as HTMLButtonElement;
const treeGridElement = document.getElementById('TreeGrid') as HTMLDivElement;
const performanceElement = document.getElementById('performanceTime') as HTMLParagraphElement;

let treeGrid: TreeGrid | null = null;
let selectedPageSize = 100;
let startTime = 0;

const pageSizeDropdown: DropDownList = new DropDownList({
    dataSource: [
        { value: 100, text: '100 Rows' },
        { value: 1000, text: '1000 Rows' },
        { value: 2000, text: '2000 Rows' }
    ],
    fields: {
        text: 'text',
        value: 'value'
    },
    width: 200,
    value: selectedPageSize,
    placeholder: 'Select a pageSize',
    popupHeight: '200px',

    change: (e: ChangeEventArgs) => {
        const pageSize = Number(e.value);

        if (!Number.isFinite(pageSize) || pageSize <= 0) {
            return;
        }

        selectedPageSize = pageSize;

        if (treeGrid) {
            treeGrid.setProperties({
                pageSettings: { pageSize }
            });
        }
    }
});

pageSizeDropdown.appendTo('#ddl');

const updatePerformanceTime = (requestType: string): void => {
    window.setTimeout(() => {
        const elapsed = (performance.now() - startTime).toFixed(0);

        const action =
            requestType.charAt(0).toUpperCase() +
            requestType.slice(1);

        performanceElement.innerHTML =
            `Time Taken for ${action}: <b>${elapsed}ms</b>`;
    }, 0);
};

renderButton.addEventListener('click', () => {

    if (treeGrid) {
        return;
    }

    startTime = performance.now();
    performanceElement.textContent = '';

    treeGrid = new TreeGrid({

        dataSource: virtualData,
        treeColumnIndex: 1,
        childMapping: 'Crew',
        allowSorting: true,
        allowFiltering: true,
        // allowPaging: true,

        filterSettings: {
            type: 'CheckBox'
        },

        pageSettings: {
            pageSize: selectedPageSize,
            pageSizes: [100, 1000, 2000]
        },

        enableDomVirtualization: true,

        height: 350,

        columns: [
            {
                field: 'TaskID',
                headerText: 'Player Jersey',
                width: 140,
                textAlign: 'Right'
            },
            { field: 'FIELD1', headerText: 'Player Name', width: 140 },
            { field: 'FIELD2', headerText: 'Year', width: 120, textAlign: 'Right' },
            { field: 'FIELD3', headerText: 'Stint', width: 120, textAlign: 'Right' },
            { field: 'FIELD4', headerText: 'TMID', width: 120, textAlign: 'Right' },
            { field: 'FIELD5', headerText: 'LGID', width: 120, textAlign: 'Right' },
            { field: 'FIELD6', headerText: 'GP', width: 120, textAlign: 'Right' },
            { field: 'FIELD7', headerText: 'GS', width: 120, textAlign: 'Right' },
            { field: 'FIELD8', headerText: 'Minutes', width: 120, textAlign: 'Right' },
            { field: 'FIELD9', headerText: 'Points', width: 120, textAlign: 'Right' },
            { field: 'FIELD10', headerText: 'oRebounds', width: 120, textAlign: 'Right' },
            { field: 'FIELD11', headerText: 'dRebounds', width: 120, textAlign: 'Right' },
            { field: 'FIELD12', headerText: 'Rebounds', width: 120, textAlign: 'Right' },
            { field: 'FIELD13', headerText: 'Assists', width: 120, textAlign: 'Right' },
            { field: 'FIELD14', headerText: 'Steals', width: 120, textAlign: 'Right' },
            { field: 'FIELD15', headerText: 'Blocks', width: 120, textAlign: 'Right' },
            { field: 'FIELD16', headerText: 'Turnovers', width: 120, textAlign: 'Right' },
            { field: 'FIELD17', headerText: 'PF', width: 120, textAlign: 'Right' },
            { field: 'FIELD18', headerText: 'fgAttempted', width: 120, textAlign: 'Right' },
            { field: 'FIELD19', headerText: 'ftAttempted', width: 120, textAlign: 'Right' },
            { field: 'FIELD20', headerText: 'ThreeAttempted', width: 120, textAlign: 'Right' }
        ],

        actionBegin: () => {
            startTime = performance.now();
        },

        actionComplete: (args) => {
            updatePerformanceTime(args.requestType || 'action');
        },

        created: () => {
            updatePerformanceTime('initialLoad');
        },

        expanding: () => {
            startTime = performance.now();
        },

        expanded: () => {
            updatePerformanceTime('expand');
        },

        collapsing: () => {
            startTime = performance.now();
        },

        collapsed: () => {
            updatePerformanceTime('collapse');
        }
    });

    treeGrid.appendTo(treeGridElement);
});

destroyButton.addEventListener('click', () => {

    if (treeGrid) {
        treeGrid.destroy();
        treeGrid = null;
    }

    treeGridElement.innerHTML = '';
    performanceElement.textContent = '';
});