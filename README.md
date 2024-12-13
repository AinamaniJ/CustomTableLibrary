# CustomTable Library

## Overview

CustomTable is a powerful JavaScript library for creating interactive HTML tables with advanced features including sorting, searching, pagination, and export capabilities. It provides a seamless way to enhance data presentation and user interaction in web applications.

## Features

- **Dynamic Column Sorting**
  - Click on column headers to sort data in ascending or descending order
  - Supports sorting for different data types (text, numeric, date)
  - Visual indicators for current sorting state

- **Global Search Functionality**
  - Instant table content filtering using a search input
  - Search across all columns simultaneously

- **Flexible Pagination**
  - Configurable rows per page (5, 10, 20)
  - Easy navigation with first, last, next, and previous page buttons
  - Dynamic page information display

- **Export Capabilities**
  - Export table data to PDF (using jsPDF)
  - Export table data to CSV
  - Customizable export formatting

- **Status Badges**
  - Customizable status indicators with color-coded styling
  - Easy to use with built-in template support

## Installation

### Prerequisites

- Modern browser with JavaScript support
- Optional: jsPDF library for PDF export functionality

### Setup

1. Include the CustomTable CSS:
```html
<link rel="stylesheet" href="path/to/table_styles.css">
```

2. Include the CustomTable JavaScript:
```html
<script src="path/to/custom-table.js"></script>
```

3. Optional: Include PDF export dependencies:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>
```

## HTML Structure

```html
<div class="table-container">
  <div class="table-header">
    <h1 class="table-title">Your Table Title</h1>
    <div class="search-container">
      <input type="text" id="searchInput" placeholder="Search...">
      <select id="rowsPerPage">
        <option value="5">5 rows</option>
        <option value="10">10 rows</option>
        <option value="20">20 rows</option>
      </select>
    </div>
    <div class="table-actions">
      <button id="exportPDF">Export PDF</button>
      <button id="exportCSV">Export CSV</button>
    </div>
  </div>

  <table class="custom-table" id="dataTable">
    <thead>
      <tr>
        <th data-sort="column1">Column 1</th>
        <th data-sort="column2">Column 2</th>
        <!-- Add more columns as needed -->
      </tr>
    </thead>
    <tbody id="tableBody"></tbody>
  </table>

  <div class="table-footer">
    <div class="table-info">
      Showing <span id="startIndex">1</span> to 
      <span id="endIndex">5</span> of 
      <span id="totalEntries">0</span> entries
    </div>
    <div class="pagination" id="pagination"></div>
  </div>
</div>

<!-- Optional Templates -->
<template id="statusBadgeTemplate">
  <span class="status-badge"></span>
</template>

<template id="actionButtonsTemplate">
  <div class="action-buttons">
    <button class="btn-edit">Edit</button>
    <button class="btn-delete">Delete</button>
  </div>
</template>
```

## Initialization

```javascript
const myTable = new CustomTable({
  tableId: 'dataTable',
  perPageSelect: 'rowsPerPage',
  searchInput: 'searchInput',
  paginationContainer: 'pagination'
});

myTable.setData([
  { 
    id: 1, 
    customer: 'John Doe', 
    product: 'Product A', 
    price: 4000, 
    status: 'Approved', 
    date: '2024-01-15' 
  },
  // More data...
]);
```

## Methods

- `setData(data)`: Load data into the table
- `handleSort(column)`: Programmatically sort by a specific column
- `handleSearch(searchTerm)`: Programmatically search/filter table
- `exportToPDF()`: Export table data to PDF
- `exportToCSV()`: Export table data to CSV

## Customization

The library supports extensive CSS customization through CSS variables and classes. Modify `table_styles.css` to match your design requirements.

## Browser Compatibility

- Chrome
- Firefox
- Safari
- Edge
- Modern browsers with ES6+ support

## Dependencies

- Optional: jsPDF for PDF export
- Optional: jspdf-autotable for enhanced PDF formatting

## License

MIT License

Copyright (c) 2024 Ainamani Joackim

## Git Repository

https://github.com/AinamaniJ/CustomTableLibrary

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support

For issues and feature requests, please open a GitHub issue.
