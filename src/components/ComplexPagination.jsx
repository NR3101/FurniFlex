import { useLoaderData, useNavigate, useLocation } from "react-router-dom";

const ComplexPagination = () => {
  const { meta } = useLoaderData();
  const { page, pageCount } = meta.pagination;

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const handlePageChange = (pageNum) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNum);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNum, activeClass }) => {
    return (
      <button
        key={pageNum}
        onClick={() => handlePageChange(pageNum)}
        className={`btn btn-xs sm:btn-md join-item border-none ${
          activeClass ? "bg-accent-focus" : ""
        } `}
      >
        {pageNum}
      </button>
    );
  };

  const renderPageButton = () => {
    const pageButtons = [];
    //first btn
    pageButtons.push(addPageButton({ pageNum: 1, activeClass: page === 1 }));

    // dot btns
    if (page > 2) {
      pageButtons.push(
        <button className="btn btn-xs sm:btn-md join-item" key="dots-1">
          ....
        </button>
      );
    }

    //current page btn
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNum: page, activeClass: true }));
    }

    // dot btns
    if (page < pageCount - 1) {
      pageButtons.push(
        <button className="btn btn-xs sm:btn-md join-item" key="dots-2">
          ....
        </button>
      );
    }

    //last btn
    pageButtons.push(
      addPageButton({ pageNum: pageCount, activeClass: page === pageCount })
    );
    return pageButtons;
  };

  if (pageCount < 2) return null;

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {renderPageButton()}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage >= pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ComplexPagination;
