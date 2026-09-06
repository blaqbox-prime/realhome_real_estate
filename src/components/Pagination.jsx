/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

function Pagination({
  items = [],
  itemsPerPage = 16,
  renderItem,
  itemKey = (_, index) => index,
  listClassName = "",
  ariaLabel = "Pages",
  renderItems,
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const visibleItems = items.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages))
  }, [totalPages])

  if (items.length === 0) {
    return null
  }

  return (
    <>
      {renderItems ? (
        renderItems(visibleItems, startIndex)
      ) : (
        <div className={listClassName}>
          {visibleItems.map((item, index) => (
            <div key={itemKey(item, startIndex + index)}>
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-4 mt-12">
        <p className="text-gray-400 text-center mb-2">
          Showing <span className="font-bold text-gray-900">{startIndex + 1}-{Math.min(startIndex + itemsPerPage, items.length)}</span> of {items.length} items
        </p>
        <nav className="flex items-center justify-center gap-4" aria-label={ariaLabel}>
          <button
            type="button"
            className="rounded border border-gray-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-900 hover:text-white transition-colors duration-300"
            onClick={() => setCurrentPage((page) => page - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-sm text-gray-500" aria-live="polite">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            className="rounded border border-gray-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-900 hover:text-white transition-colors duration-300"
            onClick={() => setCurrentPage((page) => page + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </nav>
      </div>
    </>
  )
}

export default Pagination