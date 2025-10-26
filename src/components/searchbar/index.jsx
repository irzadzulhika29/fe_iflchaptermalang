import { MagnifyingGlass } from "@phosphor-icons/react";

const SearchBar = ({ className }) => {
  return (
    <form className={className ?? ""}>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
        Search
      </label>
      <div className="relative w-full sm:w-80">
        <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-2">
          <MagnifyingGlass size={24} className="text-gray-400" />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-1 sm:p-2 text-sm bg-gray-100 border border-gray-400 rounded-full outline-none text-dark-1 !ps-10 focus:ring-primary-1 focus:border-primary-1"
          placeholder="Search ...."
          required
        />
      </div>
    </form>
  );
};

export default SearchBar;
