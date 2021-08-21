import React, { useState, useEffect } from 'react';
import './index.scss';

interface PaginationProps {
  currentPage: number,
  pageSize: number,
  totalItems: number,
  onPageChange: (page: number) => void,
  pageNeighbours: number,
}

const Pagination = (props: PaginationProps) => {
  const { totalItems, pageSize, currentPage, onPageChange, pageNeighbours } = props;
  const [pageGroup, setPageGroup] = useState<any[]>();
  const [totalPages, setTotalPages] = useState<number>(0);

  const THREE_DOTS = 'THREE_DOTS';

  useEffect(() => {
    const totalPage = Math.ceil(totalItems / pageSize);
    setTotalPages(totalPage)
    getPageNumbers(totalPage);

  }, [totalItems, pageSize, currentPage]);


  const onChangePage = (page: number) => {
    if (page > totalPages || page < 1) return;
    onPageChange(page);
  }

  const range = (from: number, to: number, step = 1) => {
    let index = from;
    const range = [];

    while (index <= to) {
      range.push(index);
      index += step;
    }

    return range;
  }

  const getPageNumbers = (totalPages: number) => {
    let pageRange: any[] = [];

    const totalPageNumbers = (pageNeighbours * 2) + 3;
    const totalBlocks = totalPageNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages, currentPage + pageNeighbours);
      let pages: any[] = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalPageNumbers - pages.length - 2;

      switch (true) {
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [THREE_DOTS, ...extraPages, ...pages];
          break;
        }

        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, THREE_DOTS];
          break;
        }

        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [THREE_DOTS, ...pages, THREE_DOTS];
          break;
        }
      }

      pageRange = pages[pages.length - 1] === totalPages ? [1, ...pages] : [1, ...pages, totalPages];
      setPageGroup(pageRange);
      return;
    }

    pageRange = range(1, totalPages);
    setPageGroup(pageRange);
    return;
  }

  const goToPage = (page: number) => {
    onPageChange(page);
  }

  const onGoPreviousPage = (event: any) => {
    event.preventDefault();
    if (currentPage === 1) return;
    goToPage(currentPage - 1);
  }

  const onGoNextPage = (event: any) => {
    event.preventDefault();
    if (currentPage === totalPages) return;
    goToPage(currentPage + 1);
  }

  return (
    <div className="pagination">
      {pageGroup && pageGroup.length ?
        <ul unselectable="off">
          <li className={`btn-previous ${currentPage === 1 ? 'disabled' : ''}`} onClick={onGoPreviousPage}>Previous</li>

          {pageGroup.map((item, index) => {
            if (item === THREE_DOTS) return (
              <li key={index} className="page-item">
                <span aria-hidden="true">...</span>
              </li>
            );

            return (
              <li
                key={index}
                onClick={() => onChangePage(item)}
                className={`pagination-item ${currentPage === item ? 'active' : ''}`}
              >
                <span>{item}</span>
              </li>
            )
          })}

          <li className={`btn-next ${currentPage === totalPages ? 'disabled' : ''}`} onClick={onGoNextPage}>Next</li>
        </ul>
        : null}
    </div>
  )
}



export default Pagination;
