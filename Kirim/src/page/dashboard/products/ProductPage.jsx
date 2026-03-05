import * as React from "react";

import { Funnel, Trash } from "@phosphor-icons/react";

import Dashboard from "../../../layouts/dashboard";

import { Button } from "../../../components/button";
import Background from "../../../components/background";
import FilterDropdown from "../../../components/dropdown/Filter";

import { formatDate } from "../../../utils/formatDate";
import { dataProduct } from "../../../static/temp";

const CardProduct = ({ data }) => {
  return (
    <menu className="flex flex-wrap gap-4 mt-4">
      {data.map((item, index) => (
        <article key={index} className="card max-w-300">
          <Background src={item.picture} className="w-full rounded-sm cursor-pointer min-h-300">
            <p className="absolute top-0 right-0 p-2 text-sm font-medium bg-dark-fade text-light-1 rounded-es-lg">{item.category}</p>
          </Background>
          <div className="flex items-center justify-between">
            <div className="space-y-1 cursor-pointer">
              <p className="text-sm font-semibold ">{item.title}</p>
              <h1 className="text-lg font-semibold text-primary-1">{item.price}</h1>
            </div>
            <button className="p-2 duration-300 bg-gray-200 border rounded-md hover:bg-red-100">
              <Trash size={20} className="text-red-500" />
            </button>
          </div>
          <Button ariaLabel="navigate-edit-product" className="mx-auto mt-2 !text-sm" intent="secondary">
            Edit Product
          </Button>
        </article>
      ))}
    </menu>
  );
};

const ProductPage = () => {
  const [isPopoverOpen, setPopoverOpen] = React.useState(false);
  const [filteredProduct, setFilteredProduct] = React.useState("All");

  const product = ["All", "Tumblr", "ToteBag", "Jacket"];

  const filteredProducts = dataProduct.filter((item) => {
    return item.category === filteredProduct;
  });

  const detail = <p className="text-xs text-gray-500">Last updated at: {formatDate(new Date())}</p>;

  return (
    <Dashboard title="Products Management" detail={detail}>
      <div className="flex justify-between mt-4">
        <div className="flex items-center h-full gap-4 border border-gray-300 divide-x divide-gray-300 rounded-lg">
          <span className="hidden py-2 pl-4 sm:block">
            <Funnel size={20} />
          </span>
          <span className="hidden py-2 pl-4 font-bold sm:block">Filter By</span>
          <FilterDropdown
            isPopoverOpen={isPopoverOpen}
            setFiltered={setFilteredProduct}
            setPopoverOpen={setPopoverOpen}
            filtered={filteredProduct}
            title="Product Type"
            typeList={product}
            loading={true}
          />
        </div>
        <Button ariaLabel="navigate-add-product" intent="secondary">
          Add New Product
        </Button>
      </div>
      <CardProduct data={filteredProduct === "All" ? dataProduct : filteredProducts} />
    </Dashboard>
  );
};

export default ProductPage;
