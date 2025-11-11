import React from 'react'
import Container from '../../components/container'
import { Button } from '../../components/button'

// Data dummy untuk proposal - nanti bisa diganti dengan API call
const proposalData = [
  {
    id: 1,
    namaProgram: "Program Pendidikan untuk Semua",
    tema: "Pendidikan",
    waktuPelaksanaan: "Januari - Maret 2024",
    tujuanKegiatan: "Meningkatkan akses pendidikan bagi anak-anak kurang mampu di wilayah Malang",
    landasanSDGs: "SDG 4: Quality Education",
    dokumentasi: "/files/proposal-pendidikan.pdf"
  },
  {
    id: 2,
    namaProgram: "Kampanye Lingkungan Hijau",
    tema: "Lingkungan",
    waktuPelaksanaan: "April - Juni 2024",
    tujuanKegiatan: "Meningkatkan kesadaran masyarakat tentang pentingnya menjaga lingkungan",
    landasanSDGs: "SDG 13: Climate Action, SDG 15: Life on Land",
    dokumentasi: "/files/proposal-lingkungan.pdf"
  },
  {
    id: 3,
    namaProgram: "Pemberdayaan UMKM Lokal",
    tema: "Ekonomi",
    waktuPelaksanaan: "Juli - September 2024",
    tujuanKegiatan: "Memberikan pelatihan dan pendampingan kepada pelaku UMKM lokal",
    landasanSDGs: "SDG 8: Decent Work and Economic Growth",
    dokumentasi: "/files/proposal-umkm.pdf"
  }
]

const Proposal = () => {
  const handleDownload = (pdfUrl, namaProgram) => {
    // Fungsi untuk download PDF
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = `${namaProgram}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Container className="!my-12">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary-1">
            Proposal Program & Kegiatan
          </h1>
          <p className="text-lg text-dark-1 leading-relaxed max-w-3xl mx-auto">
            Berikut adalah daftar proposal program dan kegiatan yang telah dilaksanakan 
            oleh Indonesian Future Leaders Chapter Malang
          </p>
        </div>

        {/* Table Section */}
        <div className="relative overflow-x-auto border rounded-lg shadow-md">
          <table className="w-full text-sm text-left rtl:text-right text-dark-1">
            <thead className="uppercase text-white bg-[#00b4d8]">
              <tr className="text-base">
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
              </tr>
            </thead>
            <tbody>
              {proposalData.map((item, index) => (
                <tr key={item.id} className="border-b bg-light-1 hover:bg-gray-50 transition-colors">
                  <th scope="row" className="px-6 py-4 font-semibold text-dark-2 whitespace-nowrap">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Info Section */}
        <div className="text-center text-sm text-gray-600 mt-4">
          <p>
            Untuk informasi lebih lanjut atau pengajuan proposal baru, 
            silakan hubungi kami melalui email atau media sosial kami.
          </p>
        </div>
      </div>
    </Container>
  )
}

export default Proposal