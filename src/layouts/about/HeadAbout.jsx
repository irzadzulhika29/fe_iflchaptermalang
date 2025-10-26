import { andhyta, imam_usman, niwa } from "../../assets";
import Container from "../../components/container";
import Image from "../../components/image";

const founder = [
  { name: "M. Imam usman", image: imam_usman },
  { name: "Andhyta F. Utami", image: andhyta },
  { name: "Niwa R. Dwitama", image: niwa },
];

const HeadAbout = () => {
  return (
    <Container className="text-dark-1 !my-8 space-y-10">
      <h1 className="text-4xl font-bold text-center text-primary-1">
        Tentang Kami
      </h1>
      <p className="text-lg leading-relaxed">
        Indonesian Future Leaders merupakan lembaga swadaya masyarakat dari
        pemuda, oleh pemuda, dan untuk pemuda yang didedikasikan untuk
        mengembangkan kualitas dan kapabilitas pemuda dalam menciptakan
        perubahan sosial untuk Indonesian yang lebih baik. Indonesian Future
        Leaders berdiri secara resmi sebagai sebuah Lembaga Swadaya Masyarakat
        yang digerakkan oleh kaum muda, pada tahun 2009, oleh sekelompok anak
        muda berusia 17-18 tahun yang terdiri atas :
      </p>
      <div className="flex flex-wrap items-center justify-center gap-16">
        {founder.map((item, index) => {
          const { name, image } = item;
          return (
            <div key={index} className="space-y-2 text-center text-dark-1">
              <Image src={image} className="w-60" description={name} />
              <h3 className="font-bold">{name}</h3>
            </div>
          );
        })}
      </div>
      <p className="text-lg leading-relaxed">
        Serta 3 pemuda lainnya yaitu Dian Aditya Ning Lestari, Stephanie Herdjo,
        dan Audry Maulana. Mereka percaya bahwa untuk memajukan Indonesia, bukan
        hanya menjadi tanggung jawab pemerintah, tetapi seluruh elemen
        masyarakat, termasuk pemuda. Melalui Indonesian Future Leaders,
        diharapkan akan lahir generasi muda Indonesian yang capable dan
        berdampak bagi perubahan positif di masyarakat. Sehingga kaum muda,
        tidak hanya menjadi objek dari pembangunan, tetapi juga menjadi motor
        penggerak dari pembangunan itu sendiri.
      </p>
    </Container>
  );
};

export default HeadAbout;
