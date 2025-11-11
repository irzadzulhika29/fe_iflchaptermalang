import { useState } from "react";
import { Link } from "react-router-dom";
import Hero from "../../components/hero";
import Container from "../../components/container";
import Loading from "../../components/loader";
import ProgressBar from "../../components/progressbar";
import Image from "../../components/image";
import { Button } from "../../components/button";
import { headDonate } from "../../static/data";
import ovoIcon from "../../assets/icons/ovo.svg";
import danaIcon from "../../assets/icons/dana.svg";
import shopeepayIcon from "../../assets/icons/shopeepay.svg";
import qrisIcon from "../../assets/icons/qris.svg";

const categories = [
  { label: "Kemanusiaan" },
  { label: "Kesehatan" },
  { label: "Pendidikan" },
  { label: "Tanggap Bencana" },
];

const sortOptions = [{ label: "Newest" }, { label: "Most Donated" }];

const paymentMethods = [
  { name: "Qris", image: qrisIcon },
  { name: "OVO", image: ovoIcon },
  { name: "Dana", image: danaIcon },
  { name: "ShopeePay", image: shopeepayIcon },
];

const Card = ({ campaignData }) => {
  return (
    <div className="grid grid-cols-1 gap-12 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 place-items-center">
      {console.log(campaignData)}
      {campaignData?.map((item, index) => {
        const percentDonation = Math.round(
          (item?.total_collected / item?.target_donation) * 100
        );
        return (
          <article key={index} className="card group !rounded-2xl">
            <div className="relative overflow-hidden rounded-lg -mx-4 -mt-4 mb-2">
              <Image
                isLazy
                src={item?.image}
                className="w-full group-hover:scale-110 transition-transform duration-500 ease-out aspect-video"
                description={item?.title}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-xl mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {item?.title}
                </h3>
                <p className="text-white/90 text-sm line-clamp-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {item?.description || "Bantu mereka yang membutuhkan dengan donasi Anda"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex gap-1">
                  {item?.categories?.map((category, categoryId) => (
                    <p
                      className="text-sm font-bold text-primary-1"
                      key={categoryId}
                    >
                      {category}
                      {item?.categories?.length > 1 &&
                        categoryId < item.categories.length - 1
                        ? ","
                        : ""}
                    </p>
                  ))}
                </div>
                <h3 className="font-bold text-xl line-clamp-2">
                  {item?.title}
                </h3>
              </div>
            </div>

            <div className="relative flex items-center w-full gap-2">
              <ProgressBar
                progress={percentDonation}
                target_donation={item?.target_donation}
                current_donation={item?.current_donation}
              />
            </div>

            <Link
              className="mx-auto cursor-pointer w-max"
              aria-label="navigate-donate"
              to={`/donasi/${item?.slug}`}
            >
              <Button
                intent="outline"
                size="small"
                className="mt-2"
                ariaLabel={`donate-${item?.title}`}
              >
                Donasi Sekarang
              </Button>
            </Link>
          </article>
        );
      })}
    </div>
  );
};

const PaymentSection = () => {
  return (
    <section className="my-8 mx-4 md:mx-8 lg:mx-12 text-center">
      {/* <h2 className="text-2xl font-bold text-primary-1 mt-24 mb-16">
        Our Payment Method
      </h2>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-8">
          {paymentMethods.map((method, index) => (
            <div
              key={index}
              className="w-24 h-24 flex items-center justify-center"
            >
              <img
                src={method.image}
                alt={method.name}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
};

const DonateSection = ({ campaignData, isLoading }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const filteredCampaigns = campaignData?.filter((campaign) => {
    if (!selectedCategory) {
      return true;
    }
    return campaign.categories.some((category) =>
      category.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  });

  const sortedCampaigns = filteredCampaigns?.sort((a, b) => {
    if (selectedSort === "Newest") {
      return new Date(b.publish_date) - new Date(a.publish_date);
    } else if (selectedSort === "Most Donated") {
      return b.current_donation - a.current_donation;
    }
    return 0;
  });

  const toggleCategoryDropdown = () => {
    setCategoryDropdownOpen(!categoryDropdownOpen);
  };

  const toggleSortDropdown = () => {
    setSortDropdownOpen(!sortDropdownOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategoryDropdownOpen(false);
  };

  const handleSortSelect = (sort) => {
    setSelectedSort(sort);
    setSortDropdownOpen(false);
  };

  if (isLoading) {
    return <Loading height={100} width={100} className="min-h-screen" />;
  }

  if (!campaignData?.length) {
    return (
      <h3 className="text-2xl font-semibold text-center text-gray-400 mt-32">
        Tidak ada acara donasi untuk sekarang
      </h3>
    );
  }

  return (
    <section className="relative text-dark-1">
      <div className="relative">
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "75vh" }}
        >
          <Hero
            image={headDonate.image}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-start text-white p-8 md:p-16 lg:p-24 space-y-4 bg-gradient-to-r from-primary-1/75 via-primary-1/50 to-transparent">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold max-w-4xl">
            {headDonate.title}
          </h1>
          <p className="text-lg md:text-xl lg:text-xl leading-relaxed max-w-3xl">
            {headDonate.description}
          </p>
        </div>
      </div>

      <Container className="my-8 flex flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-auto">
          <button
            onClick={toggleCategoryDropdown}
            className="bg-white p-4 text-gray-900 font-semibold w-full md:w-56 rounded-md flex items-center justify-between"
          >
            <span className="w-full text-left">
              {selectedCategory || "Kategori"}
            </span>
            <span
              className={`ml-2 transform transition-transform duration-300 ${categoryDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
            >
              ▲
            </span>
          </button>
          {categoryDropdownOpen && (
            <ul className="absolute mt-2 w-full md:w-56 bg-white border rounded-md shadow-lg z-10">
              {categories.map((category) => (
                <li
                  key={category.label}
                  className={`p-4 cursor-pointer text-center ${category.label === selectedCategory
                    ? "bg-blue-500 text-white font-bold"
                    : "text-gray-900"
                    }`}
                  onClick={() => handleCategorySelect(category.label)}
                >
                  {category.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative w-full md:w-auto">
          <button
            onClick={toggleSortDropdown}
            className="bg-white p-4 text-gray-900 font-semibold w-full md:w-56 rounded-md flex items-center justify-between"
          >
            <span className="w-full text-left">{selectedSort || "Sort"}</span>
            <span
              className={`ml-2 transform transition-transform duration-300 ${sortDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
            >
              ▲
            </span>
          </button>
          {sortDropdownOpen && (
            <ul className="absolute mt-2 w-full md:w-56 bg-white border rounded-md shadow-lg z-10">
              {sortOptions.map((option) => (
                <li
                  key={option.label}
                  className={`p-4 cursor-pointer text-center ${option.label === selectedSort
                    ? "bg-primary-1 text-white font-bold"
                    : "text-gray-900"
                    }`}
                  onClick={() => handleSortSelect(option.label)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>

      <Container>
        <Card campaignData={sortedCampaigns} />
      </Container>

      <PaymentSection />
    </section>
  );
};

export default DonateSection;