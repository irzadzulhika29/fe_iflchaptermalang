import { useState } from "react";

import Modal from "react-responsive-modal";

import { useForm } from "react-hook-form";

import Loading from "../../../components/loader";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";

const AddProposalModal = ({ showModal, setShowModal, addProposal, addPending }) => {
  const [pdfFile, setPdfFile] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const handlePdfChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const onSubmit = (data) => {
    const { namaProgram, tema, waktuPelaksanaan, tujuanKegiatan, landasanSDGs } = data;

    const formData = new FormData();
    formData.append("nama_program", namaProgram);
    formData.append("tema", tema);
    formData.append("waktu_pelaksanaan", waktuPelaksanaan);
    formData.append("tujuan_kegiatan", tujuanKegiatan);
    formData.append("landasan_sdgs", landasanSDGs);
    if (pdfFile) {
      formData.append("dokumentasi", pdfFile);
    }

    addProposal(formData);
    reset();
    setPdfFile(null);
  };

  return (
    <Modal open={showModal} onClose={() => setShowModal(false)} center classNames={{ modal: "customModal w-full max-w-4xl" }}>
      {addPending ? (
        <Loading height={80} width={80} className="m-10" />
      ) : (
        <form className="space-y-6 w-full p-6" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="border-b border-gray-200 pb-4">
            <h1 className="text-2xl font-bold text-primary-1">
              Tambah Proposal Baru
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Isi formulir di bawah ini untuk menambahkan proposal program/kegiatan
            </p>
          </div>
          
          <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {/* Nama Program - Full Width */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-dark-1 mb-2">
                Nama Program/Project <span className="text-red-500">*</span>
              </label>
              <Input 
                register={register} 
                name="namaProgram" 
                placeholder="Contoh: Program Pendidikan untuk Semua" 
                type="text" 
                required
                className="w-full"
              />
            </div>
            
            {/* Tema */}
            <div>
              <label className="block text-sm font-semibold text-dark-1 mb-2">
                Tema <span className="text-red-500">*</span>
              </label>
              <Input 
                register={register} 
                name="tema" 
                placeholder="Contoh: Pendidikan, Lingkungan, Ekonomi" 
                type="text" 
                required
                className="w-full"
              />
            </div>
            
            {/* Waktu Pelaksanaan */}
            <div>
              <label className="block text-sm font-semibold text-dark-1 mb-2">
                Waktu Pelaksanaan <span className="text-red-500">*</span>
              </label>
              <Input 
                register={register} 
                name="waktuPelaksanaan" 
                placeholder="Contoh: Januari - Maret 2024" 
                type="text" 
                required
                className="w-full"
              />
            </div>
            
            {/* Tujuan Kegiatan - Full Width */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-dark-1 mb-2">
                Tujuan Kegiatan <span className="text-red-500">*</span>
              </label>
              <textarea 
                {...register("tujuanKegiatan")} 
                rows="2" 
                className="text_area_input_description w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-1 focus:border-transparent" 
                placeholder="Jelaskan tujuan dari kegiatan/program ini secara detail..." 
                required 
              />
            </div>
            
            {/* Landasan SDGs - Full Width */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-dark-1 mb-2">
                Landasan SDGs <span className="text-red-500">*</span>
              </label>
              <Input 
                register={register} 
                name="landasanSDGs" 
                placeholder="Contoh: SDG 4: Quality Education, SDG 8: Decent Work and Economic Growth" 
                type="text" 
                required
                className="w-full"
              />
            </div>

            {/* Upload PDF - Full Width */}
            <div className="md:col-span-2 space-y-3">
              <label className="block text-sm font-semibold text-dark-1">
                Upload Dokumentasi PDF <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-1 transition-colors">
                <input
                  type="file"
                  id="pdf-file"
                  accept=".pdf"
                  onChange={handlePdfChange}
                  className="block w-full text-sm text-gray-500 
                    file:mr-4 file:py-3 file:px-6 
                    file:rounded-lg file:border-0 
                    file:text-sm file:font-semibold 
                    file:bg-primary-1 file:text-white 
                    hover:file:bg-primary-2 
                    file:cursor-pointer cursor-pointer"
                  required
                />
                {pdfFile && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700 font-medium">
                      ✓ File dipilih: {pdfFile.name}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      Ukuran: {(pdfFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button 
              type="button" 
              intent="primary" 
              onClick={() => setShowModal(false)}
              className="px-6 py-2"
            >
              Batal
            </Button>
            <Button type="submit" intent="secondary" className="px-6 py-2">
              Simpan Proposal
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default AddProposalModal;

