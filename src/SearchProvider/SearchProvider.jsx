// import { createContext, useState } from "react";

import { createContext, useState } from "react";

export const SearchContext = createContext(null);
const SearchProvider = ({ children }) => {
  const [searchItem, setSearchItem] = useState("");

  return (
    <SearchContext.Provider value={{ searchItem, setSearchItem }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
