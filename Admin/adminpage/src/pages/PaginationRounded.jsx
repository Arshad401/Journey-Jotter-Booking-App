// PaginationRounded.js
import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationRounded = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <Stack spacing={100}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onPageChange}
        shape="rounded"
        size="large" // Set the size to "large"
        siblingCount={3} // Show more page items
      />
    </Stack>
  );
};

export default PaginationRounded;
