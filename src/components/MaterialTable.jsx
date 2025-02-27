import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TablePagination,
  TextField,
  IconButton,
  InputAdornment
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Delete, Edit } from "@mui/icons-material";

const MaterialTable = ({ columns = [], initialData = [], onUpdate, onDelete }) => {
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState(initialData);
console.log(data)
  // Handle Sorting
  const handleSort = (column) => {
    console.log(columns)
    const isAsc = orderBy === column && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  // Update data when initialData changes
  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);



  // Filter & Sort Data
  const filteredData = data
    .filter((row) => {
      if (!search) return true;
      return columns.some((col) => {
        const value = row[col.field];
        return value?.toString().toLowerCase().includes(search.toLowerCase());
      });
    })
    .sort((a, b) => {
      if (!orderBy) return 0;
      const aValue = a[orderBy];
      const bValue = b[orderBy];
      
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      if (order === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Handle Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setData(initialData)
  },[initialData])

  
  return (
    <Paper sx={{ 
      padding: 2,
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* Search Input */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
        <TextField
          placeholder="Search"
          variant="outlined"
          size="small"
          sx={{ width: '300px' }}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e9ecef' }}>
              {columns.map((col) => (
                <TableCell 
                  key={col.field}
                  sx={{ 
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: '#495057',
                    fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif'
                  }}>
                  <TableSortLabel
                    active={orderBy === col.field}
                    direction={orderBy === col.field ? order : "asc"}
                    onClick={() => handleSort(col.field)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow 
                  key={rowIndex}
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor: '#ffffff',
                    },
                    '&:nth-of-type(even)': {
                      backgroundColor: '#f8f9fa',
                    },
                    '&:hover': {
                      backgroundColor: '#e9ecef',
                    },
                  }}>
                  {columns.map((col) => (
                    <TableCell 
                      key={col.field}
                      sx={{ 
                        fontSize: '0.875rem',
                        color: '#212529',
                        fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif'
                      }}
                    >
                      {row[col.field]}
                    </TableCell>
                  ))}
                  {/* Action Buttons */}
                  <TableCell>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <IconButton 
                        color="primary" 
                        onClick={() => onUpdate && onUpdate(rowIndex)}
                        size="small"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        color="error" 
                        onClick={() => onDelete && onDelete(rowIndex)}
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default MaterialTable;
