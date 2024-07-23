import React, { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import {
  TablePagination,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@mui/material";

// Import colors from your colors.jsx file
import { AppColors } from "../../lib/helpers/colors";

const Root = styled("div")`
  overflow-x: auto;
  margin-top: 16px;
  max-width: 100%;
  width: 100%;
`;

const TableContainer = styled("div")`
  max-height: 500px;
  max-width: calc(90vw - 100px); /* Adjust the offset as needed */
  overflow-x: auto; /* Added for horizontal scrolling */
  overflow-y: auto;
  border: 1px solid ${AppColors.appGrey}; /* Border color */
  border-radius: 3px; /* Rounded corners */
  margin: 0 auto; /* Center the table container */
`;

const CustomTable = ({
  tableHeaders,
  tableRows,
  rowsPerPageOptions = [10, 15, 25], // Default rowsPerPageOptions
  onRowClick = () => {}, // Default onRowClick as empty function
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Root className="rounded-lg">
      <TableContainer>
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <TableHead className="bg-gray-50 sticky top-0 z-10">
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell
                  key={index}
                  className="px-4 py-2 font-bold text-gray-500 uppercase tracking-wider text-center bg-gray-100"
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? tableRows.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : tableRows
            ).map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                onClick={() => onRowClick(row)} // Add onClick event
              >
                {Object.values(row).map((value, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    className="px-4 py-2 text-gray-900 text-center whitespace-nowrap"
                  >
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </table>
      </TableContainer>
      <TablePagination
        style={{ backgroundColor: AppColors.appLight }}
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={tableRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Root>
  );
};

CustomTable.propTypes = {
  tableHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
  tableRows: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  onRowClick: PropTypes.func,
};

export default CustomTable;
