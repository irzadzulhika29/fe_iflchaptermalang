import { BookOpenText, NewspaperClipping, Users } from "@phosphor-icons/react";
import Container from "../../components/container";

const dataList = [
  {
    icon: <Users weight="bold" size={32} />,
    title: "400+",
    desc: (
      <>
        Jumlah <strong>alumni dan anggota IFL Chapter Malang</strong> dari awal
        berdiri sampai sekarang.
      </>
    ),
  },
  {
    icon: <NewspaperClipping weight="bold" size={32} />,
    title: "70+",
    desc: (
      <>
        Jumlah <strong>pihak yang sudah diberdayakan oleh IFL Chapter Malang</strong>{" "}
        dari awal berdiri sampai sekarang terdiri dari individu, komunitas,
        sekolah, dan lembaga.
      </>
    ),
  },
  {
    icon: <BookOpenText weight="bold" size={32} />,
    title: "10",
    desc: (
      <>
        <strong>Nilai SDGs</strong> yang dilakukan dari awal berdiri sampai sekarang.
      </>
    ),
  },
];

const Data = () => {
  return (
    <Container className="grid grid-cols-1 md:grid-cols-3 gap-10 my-32"> {/* Jarak antar card diperbesar */}
      {dataList.map((item, index) => (
        <div
          key={index}
          className="relative bg-white shadow-md p-8 flex flex-col items-center text-center"
          style={{
            position: "relative",
            borderRadius: "20px",
          }}
        >
          {/* Border untuk kanan atas */}
          <div
            className="absolute top-0 right-0 border-t-8 border-r-8 border-primary-1"
            style={{
              width: "100px",
              height: "100px",
              borderTopRightRadius: "20px",
            }}
          ></div>

          {/* Border untuk kiri bawah */}
          <div
            className="absolute bottom-0 left-0 border-b-8 border-l-8 border-primary-1"
            style={{
              width: "100px",
              height: "100px",
              borderBottomLeftRadius: "20px",
            }}
          ></div>

          {/* Ikon dan Angka Bersebelahan dengan Jarak */}
          <div className="flex items-center space-x-6 mb-4">
            <div className="bg-primary-1 w-16 h-16 flex items-center justify-center text-white">
              {item.icon}
            </div>
            <h4 className="text-4xl font-extrabold text-primary-1">{item.title}</h4> 
          </div>

          <p className="text-lg text-gray-600 ">{item.desc}</p> 
        </div>
      ))}
    </Container>
  );
};

export default Data;
