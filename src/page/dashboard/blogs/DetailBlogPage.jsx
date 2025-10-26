import { useParams } from "react-router-dom";

import { useGetBlogBySlug } from "../../../features/blog";

import Dashboard from "../../../layouts/dashboard";

import Container from "../../../components/container";
import Loading from "../../../components/loader";

import { formatDateAndTime } from "../../../utils/formatDate";

const DetailBlogPage = () => {
  const { slug } = useParams();

  const { data: dataBlog, isLoading: blogLoading } = useGetBlogBySlug(slug);
  return (
    <Dashboard title="Detail Blog">
      {blogLoading ? (
        <Loading className="m-10" height={100} width={100} />
      ) : (
        <Container className="leading-loose !max-w-screen-md text-dark-1">
          <div className="pb-2 mb-4 space-y-6 tracking-wide border-b-4 border-b-gray-200">
            <menu className="flex items-center">
              <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">{dataBlog?.title}</h1>
            </menu>
            <menu className="flex flex-col justify-between sm:flex-row">
              <h1 className="text-base font-bold sm:text-lg">IFL Chapter Malang</h1>
              <p className="text-sm font-medium tracking-normal text-gray-500 sm:text-base">
                Published at : {formatDateAndTime(dataBlog?.created_at)}
              </p>
            </menu>
          </div>
          <div className="dangerous_html" dangerouslySetInnerHTML={{ __html: dataBlog?.content }} />
        </Container>
      )}
    </Dashboard>
  );
};

export default DetailBlogPage;
