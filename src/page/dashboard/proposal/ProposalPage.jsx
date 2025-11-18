import * as React from "react";

import Dashboard from "../../../layouts/dashboard";

import AddProposalModal from "./AddProposalModal";
import EditProposalModal from "./EditProposalModal";
import DeleteProposalModal from "./DeleteProposalModal";

import { Button } from "../../../components/button";
import Loading from "../../../components/loader";

// Data dummy - nanti akan diganti dengan API call
const dummyProposals = [
  {
    id: 1,
    namaProgram: "Program Pendidikan untuk Semua",
    tema: "Pendidikan",
    waktuPelaksanaan: "Januari - Maret 2024",
    tujuanKegiatan: "Meningkatkan akses pendidikan bagi anak-anak kurang mampu di wilayah Malang",
    landasanSDGs: "SDG 4: Quality Education",
    dokumentasi: "proposal-pendidikan.pdf"
  },
  {
    id: 2,
    namaProgram: "Kampanye Lingkungan Hijau",
    tema: "Lingkungan",
    waktuPelaksanaan: "April - Juni 2024",
    tujuanKegiatan: "Meningkatkan kesadaran masyarakat tentang pentingnya menjaga lingkungan",
    landasanSDGs: "SDG 13: Climate Action, SDG 15: Life on Land",
    dokumentasi: "proposal-lingkungan.pdf"
  },
  {
    id: 3,
    namaProgram: "Pemberdayaan UMKM Lokal",
    tema: "Ekonomi",
    waktuPelaksanaan: "Juli - September 2024",
    tujuanKegiatan: "Memberikan pelatihan dan pendampingan kepada pelaku UMKM lokal",
    landasanSDGs: "SDG 8: Decent Work and Economic Growth",
    dokumentasi: "proposal-umkm.pdf"
  }
];

const Table = ({ proposals, editProposal, editPending, deleteProposal, deletePending }) => {
  const handleDownload = (pdfUrl, namaProgram) => {
    // Fungsi untuk download PDF
    const link = document.createElement('a');
    link.href = `/files/${pdfUrl}`;
    link.download = pdfUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative mt-4 overflow-x-auto border rounded-lg shadow-md">
      {!proposals?.length ? (
        <h1 className="m-8 text-3xl font-semibold text-center text-gray-400">
          Belum ada data proposal
        </h1>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-dark-1">
          <thead className="uppercase text-white bg-[#00b4d8]">
            <tr className="text-base">
              <th scope="col" className="px-6 py-4">
                No
              </th>
              <th scope="col" className="px-6 py-4">
                Nama Program/Project
              </th>
              <th scope="col" className="px-6 py-4">
                Tema
              </th>
              <th scope="col" className="px-6 py-4">
                Waktu Pelaksanaan
              </th>
              <th scope="col" className="px-6 py-4">
                Tujuan Kegiatan
              </th>
              <th scope="col" className="px-6 py-4">
                Landasan SDGs
              </th>
              <th scope="col" className="px-6 py-4">
                Dokumentasi
              </th>
              <th scope="col" className="px-6 py-4">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {proposals?.map((item, index) => (
              <tr key={item.id} className="border-b bg-light-1 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  {index + 1}
                </td>
                <th scope="row" className="px-6 py-4 font-semibold text-dark-2">
                  {item.namaProgram}
                </th>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.tema}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.waktuPelaksanaan}
                </td>
                <td className="px-6 py-4 max-w-md">
                  {item.tujuanKegiatan}
                </td>
                <td className="px-6 py-4">
                  {item.landasanSDGs}
                </td>
                <td className="px-6 py-4">
                  <Button
                    intent="outline"
                    size="small"
                    onClick={() => handleDownload(item.dokumentasi, item.namaProgram)}
                    ariaLabel={`download-${item.namaProgram}`}
                  >
                    Download PDF
                  </Button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <EditProposalModal
                      proposalData={item}
                      editProposal={editProposal}
                      editPending={editPending}
                    />
                    <DeleteProposalModal
                      proposalId={item.id}
                      deleteProposal={deleteProposal}
                      deletePending={deletePending}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const ProposalManagementPage = () => {
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [proposals, setProposals] = React.useState(dummyProposals);
  const [isLoading, setIsLoading] = React.useState(false);

  // Dummy functions - nanti akan diganti dengan API hooks
  const addProposal = (data) => {
    console.log("Add proposal:", data);
    // TODO: Implement API call
    setShowAddModal(false);
  };

  const editProposal = (data) => {
    console.log("Edit proposal:", data);
    // TODO: Implement API call
  };

  const deleteProposal = (id) => {
    console.log("Delete proposal:", id);
    // TODO: Implement API call
    setProposals(proposals.filter(p => p.id !== id));
  };

  const detail = (
    <p className="text-sm text-gray-500">
      Total Proposal: {proposals.length}
    </p>
  );

  return (
    <Dashboard title="Manajemen Proposal" detail={detail}>
      <div className="flex flex-col items-center justify-between gap-4 my-4 sm:flex-row">
        <div className="text-dark-1">
          <p className="text-sm">Kelola proposal program dan kegiatan IFL Chapter Malang</p>
        </div>
        <Button 
          onClick={() => setShowAddModal(true)} 
          ariaLabel="add-proposal" 
          intent="secondary"
        >
          Tambah Proposal
        </Button>
        <AddProposalModal
          showModal={showAddModal}
          setShowModal={setShowAddModal}
          addProposal={addProposal}
          addPending={false}
        />
      </div>

      {isLoading ? (
        <Loading height={100} width={100} className="m-10" />
      ) : (
        <Table
          proposals={proposals}
          editProposal={editProposal}
          editPending={false}
          deleteProposal={deleteProposal}
          deletePending={false}
        />
      )}
    </Dashboard>
  );
};

export default ProposalManagementPage;
