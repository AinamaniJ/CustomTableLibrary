class CustomTable {
  constructor(options = {}) {
    this.options = {
      tableId: "dataTable",
      perPageSelect: "rowsPerPage",
      searchInput: "searchInput",
      paginationContainer: "pagination",
      ...options,
    };

    this.table = document.getElementById(this.options.tableId);
    this.currentPage = 1;
    this.rowsPerPage = parseInt(
      document.getElementById(this.options.perPageSelect).value
    );
    this.sortColumn = null;
    this.sortDirection = "asc";
    this.originalData = [];
    this.filteredData = [];

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    const headers = this.table.querySelectorAll("th[data-sort]");
    headers.forEach((header) => {
      header.addEventListener("click", () =>
        this.handleSort(header.dataset.sort)
      );
    });

    document
      .getElementById(this.options.searchInput)
      .addEventListener("input", (e) => {
        this.handleSearch(e.target.value);
      });

    document
      .getElementById(this.options.perPageSelect)
      .addEventListener("change", (e) => {
        this.rowsPerPage = parseInt(e.target.value);
        this.currentPage = 1;
        this.renderTable();
      });

    document
      .getElementById("exportPDF")
      .addEventListener("click", () => this.exportToPDF());
    document
      .getElementById("exportCSV")
      .addEventListener("click", () => this.exportToCSV());
  }

  setData(data) {
    this.originalData = JSON.parse(JSON.stringify(data));
    this.filteredData = [...this.originalData];
    this.renderTable();
    this.updateTableInfo();
  }

  handleSort(column) {
    const headers = this.table.querySelectorAll("th[data-sort]");
    headers.forEach((header) => {
      header.classList.remove("sorting-asc", "sorting-desc");
    });

    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortColumn = column;
      this.sortDirection = "asc";
    }

    const header = this.table.querySelector(`th[data-sort="${column}"]`);
    header.classList.add(`sorting-${this.sortDirection}`);

    this.filteredData.sort((a, b) => {
      const valueA = a[column] ?? "";
      const valueB = b[column] ?? "";

      let comparison = 0;
      if (column === "price") {
        const parseNumber = (value) => {
          const numericValue =
            parseFloat(String(value).replace(/[,]/g, "")) || 0;
          return numericValue;
        };

        comparison = parseNumber(valueA) - parseNumber(valueB);
      } else if (column === "date") {
        const dateA = valueA ? new Date(valueA) : new Date(-8640000000000000);
        const dateB = valueB ? new Date(valueB) : new Date(-8640000000000000);
        comparison = dateA - dateB;
      } else {
        if (valueA === "" && valueB === "") return 0;
        if (valueA === "") return this.sortDirection === "asc" ? -1 : 1;
        if (valueB === "") return this.sortDirection === "asc" ? 1 : -1;

        comparison = String(valueA).localeCompare(String(valueB));
      }

      return this.sortDirection === "asc" ? comparison : -comparison;
    });

    this.renderTable();
  }

  handleSearch(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    this.filteredData = this.originalData.filter((item) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm)
      );
    });
    this.currentPage = 1;
    this.renderTable();
    this.updateTableInfo();
  }

  renderTable() {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    const paginatedData = this.filteredData.slice(start, end);

    paginatedData.forEach((row) => {
      const tr = document.createElement("tr");

      Object.keys(row).forEach((key) => {
        const td = document.createElement("td");
        if (key === "status") {
          const badge = document
            .getElementById("statusBadgeTemplate")
            .content.cloneNode(true);
          const span = badge.querySelector(".status-badge");
          span.textContent = row[key];
          span.classList.add(`status-${row[key].toLowerCase()}`);
          td.appendChild(badge);
        } else {
          td.textContent = row[key];
        }
        tr.appendChild(td);
      });

      const actionsTd = document.createElement("td");
      const actionButtons = document
        .getElementById("actionButtonsTemplate")
        .content.cloneNode(true);

      actionButtons.querySelector(".btn-edit").addEventListener("click", () => {
        this.handleEdit(row);
      });
      actionButtons
        .querySelector(".btn-delete")
        .addEventListener("click", () => {
          this.handleDelete(row);
        });

      actionsTd.appendChild(actionButtons);
      tr.appendChild(actionsTd);

      tbody.appendChild(tr);
    });

    this.renderPagination();
  }

  renderPagination() {
    const container = document.getElementById(this.options.paginationContainer);
    container.innerHTML = "";

    const totalPages = Math.ceil(this.filteredData.length / this.rowsPerPage);

    this.addPaginationButton("«", this.currentPage > 1, () => {
      this.currentPage--;
      this.renderTable();
    });

    for (let i = 1; i <= totalPages; i++) {
      this.addPaginationButton(
        i,
        true,
        () => {
          this.currentPage = i;
          this.renderTable();
        },
        i === this.currentPage
      );
    }

    this.addPaginationButton("»", this.currentPage < totalPages, () => {
      this.currentPage++;
      this.renderTable();
    });

    this.updateTableInfo();
  }

  addPaginationButton(text, enabled, onClick, isActive = false) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = `page-btn ${isActive ? "active" : ""}`;
    button.disabled = !enabled;
    button.addEventListener("click", onClick);
    document
      .getElementById(this.options.paginationContainer)
      .appendChild(button);
  }

  updateTableInfo() {
    const start = (this.currentPage - 1) * this.rowsPerPage + 1;
    const end = Math.min(
      start + this.rowsPerPage - 1,
      this.filteredData.length
    );
    const total = this.filteredData.length;

    document.getElementById("startIndex").textContent = total === 0 ? 0 : start;
    document.getElementById("endIndex").textContent = end;
    document.getElementById("totalEntries").textContent = total;
  }

  handleEdit(row) {
    console.log("Edit row:", row);
  }

  handleDelete(row) {
    if (confirm("Are you sure you want to delete this record?")) {
      const index = this.originalData.findIndex((item) => item.id === row.id);
      if (index !== -1) {
        this.originalData.splice(index, 1);
        this.handleSearch(
          document.getElementById(this.options.searchInput).value
        );
      }
    }
  }

  async exportToPDF() {
    try {
      if (typeof window.jspdf === "undefined") {
        throw new Error(
          "jsPDF library is not loaded. Please make sure to include both jspdf and jspdf-autotable scripts."
        );
      }

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      const headers = Array.from(this.table.querySelectorAll("th"))
        .map((th) => th.textContent.trim())
        .slice(0, -1);

      const data = this.filteredData.map((row) =>
        Object.values(row).map((cell) => String(cell))
      );

      doc.setFontSize(16);
      doc.text("Table Export", 14, 15);

      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 25);

      doc.autoTable({
        head: [headers],
        body: data,
        startY: 30,
        styles: { fontSize: 8 },
        headStyles: {
          fillColor: [74, 144, 226],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        margin: { top: 30 },
        theme: "grid",
      });

      doc.save("table-export.pdf");
    } catch (error) {
      console.error("PDF Export Error:", error);
      alert(
        "Failed to export PDF. Please make sure all required libraries are loaded."
      );
    }
  }

  exportToCSV() {
    const headers = Array.from(this.table.querySelectorAll("th"))
      .filter(
        (th, index) => index !== this.table.querySelectorAll("th").length - 1
      )
      .map((th) => th.textContent.trim());

    const data = this.filteredData.map((row) =>
      Object.values(row)
        .slice(0, this.table.querySelectorAll("th").length - 1)
        .map((cell) => {
          if (typeof cell === "number") {
            return cell.toLocaleString();
          } else if (typeof cell === "string" && cell.includes(",")) {
            return cell.replace(/,/g, "");
          } else {
            return String(cell);
          }
        })
    );

    const csvContent = [
      headers.join(","),
      ...data.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "table-export.csv";
    link.click();
  }
}
