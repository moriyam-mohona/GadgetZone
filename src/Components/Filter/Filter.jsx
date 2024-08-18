import { useState } from "react";

const Filter = ({ setBrand, setCategory, setPriceRange, refetch }) => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    setBrand(brand === "All Brands" ? "" : brand);
    refetch();
  };
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setCategory(category === "All Category" ? "" : category);
    refetch();
  };
  const handlePriceRangeChange = (e) => {
    const priceRange = e.target.value;
    setSelectedPriceRange(priceRange);
    setPriceRange(priceRange === "All Prices" ? "" : priceRange);
    refetch();
  };
  return (
    <div className="flex flex-col justify-between md:flex-row gap-3 w-full">
      <select
        className="select select-info w-full floating-label"
        value={selectedBrand}
        onChange={handleBrandChange}
      >
        <option value="All Brands">All Brands</option>
        <option value="Apple">Apple</option>
        <option value="Samsung">Samsung</option>
        <option value="Dell">Dell</option>
        <option value="Samsung">Microsoft</option>
        <option value="Xiaomi">Xiaomi</option>
        <option value="Bose">Bose</option>
        <option value="Sony">Sony</option>
        <option value="Asus">Asus</option>
        <option value="HP">HP</option>
        <option value="Acer">Acer</option>
      </select>
      <select
        className="select select-info w-full"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="All Category">All Category </option>
        <option value="Smartphones">Smartphones</option>
        <option value="Laptops">Laptops</option>
        <option value="Tablets">Tablets</option>
        <option value="Smartwatches">Smartwatches</option>
        <option value="Monitors">Monitors</option>
      </select>
      <select
        className="select select-info w-full"
        value={selectedPriceRange}
        onChange={handlePriceRangeChange}
      >
        <option value="All Prices">All Prices</option>
        <option value="0-100">$0 - $100</option>
        <option value="101-500">$101 - $500</option>
        <option value="501-1000">$501 - $1000</option>
        <option value="1001-5000">$1001 - $5000</option>
      </select>
      {/* <div className="form-control">
    
      </div> */}
      {/* <div className="form-control"></div>
      <div className="form-control"></div> */}
    </div>
  );
};

export default Filter;
