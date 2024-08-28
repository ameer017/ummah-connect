import React from 'react';
import { Button } from "@/components/ui/button";

export const Pagination = ({ currentPage, totalPages, onPageChange, className }) => {
  return (
    <div className={`flex justify-center items-center space-x-2 ${className}`}>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span className="mx-2">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};