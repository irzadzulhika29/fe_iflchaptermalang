import { Helmet } from "react-helmet-async";

const HelmetLayout = ({ pageLink, description, title, keywords }) => {
  return (
    <Helmet prioritizeSeoTags>
      <meta charset="UTF-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`https://iflchaptermalang.org${pageLink}`} />

      {/* keyword planner */}
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Indonesian Future Leaders Chapter Malang" />
    </Helmet>
  );
};

export default HelmetLayout;
