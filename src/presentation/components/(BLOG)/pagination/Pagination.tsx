interface PaginationProps {
    currentPage: number
    totalItems: number
    itemsPerPage: number
    onPageChange: (page: number) => void
  }
  
  export default function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
  
    if (totalPages <= 1) return null
  
    return (
      <div className="flex justify-center items-center space-x-2">
        {currentPage > 1 && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Precedente
          </button>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 border rounded-md ${
              currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Successiva
          </button>
        )}
      </div>
    )
  }
  
  