import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

import Proposal from "../../layouts/about/Proposal";
import HelmetLayout from "../../layouts/helmet";

import React from 'react'

const ProposalPage = () => {
  return (
    <div className="inner_body">
      <HelmetLayout
        title="Proposal | Indonesian Future Leaders Chapter Malang"
        description="Indonesian Future Leaders Chapter Malang memiliki kegiatan bernama 'proposal' yang berkaitan dengan pengajuan proposal untuk kegiatan berkarakter sosial IFL Chapter Malang"
        pageLink="/proposal"
        keywords="indonesian future leaders, ifl malang, ifl chapter malang, ifl, proposal, ifl proposal"
      />
      <Navbar />
      <Proposal />
      <Footer />
    </div>
  );
};

export default ProposalPage;