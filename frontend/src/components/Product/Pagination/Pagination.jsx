import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Pagination({ currentPage, lastPage, setCurrentPage }) {
  // console.log(`Pagination: ${new Date().toLocaleTimeString()}`);

	const renderPageNumbers = () => {
		const pageNumbers = [];
		const totalPages = lastPage;

		// Добавляем первые три страницы
		for (let i = 1; i <= Math.min(totalPages, 3); i++) {
			pageNumbers.push(renderPageLink(i));
		}

		// Добавляем страницы вокруг текущей страницы
		const leftBoundary = Math.max(4, currentPage - 2);
		const rightBoundary = Math.min(totalPages - 3, currentPage + 2);
		if (leftBoundary > 4) {
			pageNumbers.push(renderEllipsis("left"));
		}
		for (let i = leftBoundary; i <= rightBoundary; i++) {
			pageNumbers.push(renderPageLink(i));
		}
		if (rightBoundary < totalPages - 3) {
			pageNumbers.push(renderEllipsis("right"));
		}

		// Добавляем последние три страницы
		for (let i = Math.max(totalPages - 2, 1); i <= totalPages; i++) {
			if (!pageNumbers.some((page) => parseInt(page.key) === i)) { // Проверяем, что страница еще не добавлена
				pageNumbers.push(renderPageLink(i));
			}
		}

		return pageNumbers;
	};


	// Функция для генерации ссылки на страницу
	const renderPageLink = (pageNumber) => {
      
		return (
			<button
				key={pageNumber}
				className={`relative inline-flex items-center text-sm font-semibold h-full w-[50px] justify-center ${
				currentPage === pageNumber
					? 'text-orange-500 border-b-2 border-orange-500'
					: 'text-gray-400 hover:bg-orange-400 hover:text-white'
				}`}
				onClick={(e) => {
					e.preventDefault();
					if (currentPage !== pageNumber) {
						setCurrentPage(pageNumber);
					}
					
				}}
			>
				{pageNumber}
			</button>
		);
	};

	// Функция для рендеринга многоточия
	const renderEllipsis = (position) => {

		return (
			<span
				key={`ellipsis-${position}`}
				className="
					relative inline-flex items-center px-4 py-2 text-sm font-semibold 
					text-gray-700 focus:outline-offset-0
				"
			>
				...
			</span>
		);
	};


	return (
		<div className="flex flex-col items-center justify-between h-12 outline-1 bg-white rounded-lg shadow w-full outline-gray-200">

			<div className='h-full flex justify-center items-center'>

				<button
					className='
						relative inline-flex items-center rounded-l-md justify-center 
						text-gray-400 focus:z-20 focus:outline-offset-0
						hover:bg-orange-50 hover:text-orange-500 h-full w-[50px] transition
					'
					onClick={(e) => {
						e.preventDefault();
						if (currentPage > 1) {
							setCurrentPage(1);
						}
					}}
				>
					<span className='sr-only'>Start</span>
					<ChevronDoubleLeftIcon className='h-5 w-5' aria-hidden="true" />
				</button>

				<button
					className="
						relative inline-flex items-center justify-center
						text-gray-400 focus:z-20 focus:outline-offset-0
						hover:bg-orange-50 hover:text-orange-500 h-full w-[50px] transition
					"
					onClick={(e) => {
						e.preventDefault();
						if (currentPage > 1) {
							setCurrentPage(currentPage - 1);
						}
					}}
				>
					<span className="sr-only">Previous</span>
					<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
				</button>

				{ renderPageNumbers() }

				<button
					className="
						relative inline-flex items-center justify-center
						text-gray-400 focus:z-20 focus:outline-offset-0
						hover:bg-orange-50 hover:text-orange-500 h-full w-[50px] transition
					"
					onClick={(e) => {
						e.preventDefault();
						if (currentPage < lastPage) {
							setCurrentPage(currentPage + 1);
						}
					}}
				>
					<span className="sr-only">Next</span>
					<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
				</button>

				<button
					className="
						relative inline-flex items-center rounded-r-md justify-center
						text-gray-400 focus:z-20 focus:outline-offset-0
						hover:bg-orange-50 hover:text-orange-500 h-full w-[50px] transition
					"
					onClick={(e) => {
						e.preventDefault();
						if (currentPage < lastPage) {
							setCurrentPage(lastPage);
						}
					}}
				>
					<span className="sr-only">End</span>
					<ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
				</button>

			</div>
		</div>
  );
}