import Button from "./Button";


// eslint-disable-next-line react/prop-types
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          className="mr-2"
          disabled={currentPage === 1}
        >
          <i className="arrow left"></i>
        </Button>
        <span className="flex items-center px-4">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          className="ml-2"
          disabled={currentPage === totalPages}
        >
          <i className="arrow right"></i>
        </Button>
      </div>
    </>
  )
}

export default Pagination