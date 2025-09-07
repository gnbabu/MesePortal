import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface GridColumn {
  field: string;
  header: string;
  type: 'text' | 'number' | 'date' | 'datetime' | 'select';
  sortable?: boolean;
  filterOptions?: { label: string; value: any }[];
}

@Component({
  selector: 'app-filter-grid',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-grid.component.html',
  styleUrls: ['./filter-grid.component.scss'],
})
export class FilterGridComponent implements OnInit {
  @Input() columns: GridColumn[] = [];
  @Input() data: any[] = [];
  @Input() pagingEnabled = true;
  @Input() pageSize = 5;
  @Input() sortingMode: 'client' | 'server' = 'client';

  currentPage = 1;
  sortField = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Filters
  filterValues: { [key: string]: any } = {};
  filterConditions: { [key: string]: string } = {};
  filterRange: { [key: string]: { from: any; to: any } } = {};
  activeFilterMenu: string | null = null;

  filteredData: any[] = [];

  ngOnInit() {
    this.columns.forEach((col) => {
      this.filterValues[col.field] = '';
      this.filterConditions[col.field] = '';
      this.filterRange[col.field] = { from: '', to: '' };
    });
    this.applyAllFilters();
  }

  get hasFilterableColumns(): boolean {
    return this.columns.some((col) =>
      ['text', 'number', 'date', 'datetime', 'select'].includes(col.type)
    );
  }

  get pagedData() {
    let sorted = this.filteredData;

    if (this.sortField && this.sortingMode === 'client') {
      sorted = [...sorted].sort((a, b) => {
        const valA = a[this.sortField];
        const valB = b[this.sortField];
        const factor = this.sortDirection === 'asc' ? 1 : -1;
        if (valA == null && valB == null) return 0;
        if (valA == null) return -factor;
        if (valB == null) return factor;
        return valA > valB ? factor : valA < valB ? -factor : 0;
      });
    }

    if (!this.pagingEnabled) return sorted;

    const start = (this.currentPage - 1) * this.pageSize;
    return sorted.slice(start, start + this.pageSize);
  }

  changePage(page: number) {
    const total = this.totalPages();
    if (page < 1 || page > total) return;
    this.currentPage = page;
  }

  changePageSize(size: number) {
    this.pageSize = Number(size) || 5;
    this.currentPage = 1;
  }

  changeSort(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }

  toggleFilterMenu(field: string) {
    this.activeFilterMenu = this.activeFilterMenu === field ? null : field;
  }

  getConditions(type: string) {
    if (type === 'text')
      return ['contains', 'equals', 'startsWith', 'endsWith'];
    if (type === 'number' || type === 'date' || type === 'datetime')
      return ['equals', 'lessThan', 'greaterThan', 'between'];
    if (type === 'select') return ['equals'];
    return ['equals'];
  }

  applyFilter(field: string) {
    this.applyAllFilters();
    this.activeFilterMenu = null;
    this.currentPage = 1;
  }

  resetFilter(field: string) {
    this.filterValues[field] = '';
    this.filterConditions[field] = '';
    this.filterRange[field] = { from: '', to: '' };
    this.applyAllFilters();
    this.activeFilterMenu = null;
    this.currentPage = 1;
  }

  applyAllFilters() {
    this.filteredData = this.data.filter((row) => {
      return this.columns.every((col) => {
        const value = row[col.field];
        const filterVal = this.filterValues[col.field];
        const condition = this.filterConditions[col.field];

        if (!filterVal && condition !== 'between') return true;

        switch (col.type) {
          case 'text':
            if (!filterVal) return true;
            const valStr = (value || '').toString().toLowerCase();
            const filterStr = filterVal.toLowerCase();
            switch (condition) {
              case 'equals':
                return valStr === filterStr;
              case 'startsWith':
                return valStr.startsWith(filterStr);
              case 'endsWith':
                return valStr.endsWith(filterStr);
              case 'contains':
              default:
                return valStr.includes(filterStr);
            }
          case 'number':
            const numVal = Number(value);
            const numFilter = Number(filterVal);
            if (condition === 'between') {
              const from = Number(this.filterRange[col.field].from);
              const to = Number(this.filterRange[col.field].to);
              return numVal >= from && numVal <= to;
            }
            switch (condition) {
              case 'equals':
                return numVal === numFilter;
              case 'lessThan':
                return numVal < numFilter;
              case 'greaterThan':
                return numVal > numFilter;
              default:
                return true;
            }
          case 'date':
          case 'datetime':
            if (!value) return false;
            const dateVal = new Date(value).getTime();
            if (condition === 'between') {
              const from = new Date(this.filterRange[col.field].from).getTime();
              const to = new Date(this.filterRange[col.field].to).getTime();
              return dateVal >= from && dateVal <= to;
            }
            const filterDate = new Date(filterVal).getTime();
            switch (condition) {
              case 'equals':
                return dateVal === filterDate;
              case 'lessThan':
                return dateVal < filterDate;
              case 'greaterThan':
                return dateVal > filterDate;
              default:
                return true;
            }
          case 'select':
            if (!filterVal) return true;
            return value === filterVal;
          default:
            return true;
        }
      });
    });
  }

  totalPages(): number {
    const total = this.filteredData.length;
    return Math.max(1, Math.ceil(total / this.pageSize));
  }
}
