
export default function LoadMoreButton() {

  return (
    <button 
    onClick={() => console.log("load more")}
    className="bg-white rounded-lg shadow h-12 hover:bg-gray-50 hover:shadow-md transition w-full"
    >
      Показать еще
    </button>
  );
}