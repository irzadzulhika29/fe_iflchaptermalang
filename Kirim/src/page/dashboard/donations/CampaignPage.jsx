import * as React from "react";

import {
  useAddCampaignByAdmin,
  useDeleteCampaignByAdmin,
  useEditCampaignByAdmin,
  useGetAllCampaign,
  useGetAllCategoriesCampaign,
} from "../../../features/campaign";

import { Link } from "react-router-dom";

import { Funnel } from "@phosphor-icons/react";

const Image = React.lazy(() => import("../../../components/image"));

import Dashboard from "../../../layouts/dashboard";

import AddCampaignModal from "./AddCampaignModal";
import EditCampaignModal from "./EditCampaignModal";
import DetailCampaignModal from "./DetailCampaignModal";
import DeleteCampaignModal from "./DeleteCampaignModal";

import { Button } from "../../../components/button";
import ProgressBar from "../../../components/progressbar";
import Loading from "../../../components/loader";
import ImageSkeleton from "../../../components/skeleton/ImageSkeleton";
import FilterDropdown from "../../../components/dropdown/Filter";

import { formatDateAndTime } from "../../../utils/formatDate";

const stylesOptions = {
  control: (_, state) => ({
    display: "inline-flex",
    borderBottom: "2px solid #313335b5",
    borderColor: state.isFocused ? "#0096C7" : "#313335b5",
    fontSize: "15px",
    width: "100%",
  }),
};

const CardDonation = ({ dataCampaigns, dataCategories, editCampaign, editPending, deleteCampaign, deletePending }) => {
  return (
    <menu className="flex flex-wrap justify-center gap-4 mt-4 sm:justify-start">
      {!dataCampaigns?.length ? (
        <h1 className="w-full m-8 text-3xl font-semibold text-center text-gray-400">The campaigns is not found</h1>
      ) : (
        dataCampaigns?.map((item, index) => {
          const percentDonation = Math.round((item?.total_collected / item?.target_donation) * 100);
          return (
            <article key={index} className="card max-w-300 !rounded-2xl">
              <React.Suspense fallback={ImageSkeleton}>
                <Image src={item?.image} className="w-full rounded-lg aspect-video" description={item?.title} />
              </React.Suspense>
              <div className="flex items-center justify-between gap-4">
                <div className="w-full space-y-1">
                  {item?.categories?.map((category, categoryId) => (
                    <span className="text-xs font-bold" key={categoryId}>
                      {(categoryId ? ", " : "") + category}
                    </span>
                  ))}
                  <Link to={`/admin/dashboard/donation/${item?.slug}`} aria-label="navigate-detail-donation">
                    <h1 className="font-semibold text-primary-1 line-clamp-2">{item?.title}</h1>
                  </Link>
                </div>
                <DeleteCampaignModal slug={item?.slug} deleteCampaign={deleteCampaign} deletePending={deletePending} />
              </div>
              <p className="text-sm line-clamp-3">{item?.short_description}</p>
              <div className="relative flex items-center w-full gap-2 pb-4">
                <ProgressBar current_donation={item?.total_collected} target_donation={item?.target_donation} />
              </div>
              <div className="relative flex">
                <EditCampaignModal
                  stylesOptions={stylesOptions}
                  slug={item?.slug}
                  dataCategories={dataCategories}
                  dataCampaign={item}
                  editPending={editPending}
                  editCampaign={editCampaign}
                />
                <DetailCampaignModal slug={item?.slug} />
              </div>
            </article>
          );
        })
      )}
    </menu>
  );
};

const CampaignPage = () => {
  const [isPopoverOpen, setPopoverOpen] = React.useState(false);
  const [filteredDonation, setFilteredDonation] = React.useState("All");
  const [showModal, setShowModal] = React.useState(false);

  const { mutate: addCampaign, isPending: addPending } = useAddCampaignByAdmin();

  const { mutate: editCampaign, isPending: editPending } = useEditCampaignByAdmin();

  const { mutate: deleteCampaign, isPending: deletePending } = useDeleteCampaignByAdmin();

  const { data: dataCampaigns, isLoading: campaignsLoading } = useGetAllCampaign();

  const { data: dataCategories, isLoading: categoriesLoading } = useGetAllCategoriesCampaign();

  const filteredDonations =
    dataCampaigns?.campaigns?.length >= 1 &&
    dataCampaigns?.campaigns?.filter((item) => {
      return item?.categories?.includes(filteredDonation);
    });

  const detail = <p className="text-sm text-gray-500">Last updated at: {formatDateAndTime(dataCampaigns?.latest_update || new Date())}</p>;

  return (
    <Dashboard title="Campaigns Management" detail={detail}>
      <div className="flex flex-col items-center justify-between gap-4 my-4 sm:flex-row">
        <div className="flex items-center h-full gap-4 border border-gray-300 rounded-lg sm:divide-x sm:divide-gray-300">
          <span className="hidden py-2 pl-4 sm:block">
            <Funnel size={20} />
          </span>
          <span className="hidden py-2 pl-4 font-bold sm:block">Filter By</span>
          <FilterDropdown
            isPopoverOpen={isPopoverOpen}
            setFiltered={setFilteredDonation}
            setPopoverOpen={setPopoverOpen}
            filtered={filteredDonation}
            title="Campaign Type"
            typeList={dataCategories?.categories}
            loading={categoriesLoading}
          />
        </div>
        <Button onClick={() => setShowModal(true)} ariaLabel="navigate-add-campaign" intent="secondary">
          Add New Campaign
        </Button>
        <AddCampaignModal
          dataCategories={dataCategories?.categories}
          addPending={addPending}
          addCampaign={addCampaign}
          showModal={showModal}
          setShowModal={setShowModal}
          stylesOptions={stylesOptions}
        />
      </div>
      {campaignsLoading ? (
        <Loading height={100} width={100} />
      ) : (
        <CardDonation
          deleteCampaign={deleteCampaign}
          deletePending={deletePending}
          editCampaign={editCampaign}
          editPending={editPending}
          dataCategories={dataCategories?.categories}
          dataCampaigns={filteredDonation === "All" ? dataCampaigns?.campaigns : filteredDonations}
        />
      )}
    </Dashboard>
  );
};

export default CampaignPage;
