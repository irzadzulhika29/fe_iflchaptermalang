import { instagram, shopee } from "../../assets/icons";
import { Button } from "../../components/button";
import Container from "../../components/container";
import Image from "../../components/image";
import Icon from "../../components/icon";

const iconsList = [
  {
    title: "Instagram",
    icon: instagram,
    path: "https://www.instagram.com/buyndonate.id/",
  },
  { title: "Shopee", icon: shopee, path: "https://shopee.co.id/buyndonate" },
];

const Shop = () => {
  return (
    <section id="shop">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Container Gambar */}
          <div className="relative w-full max-w-md mx-auto md:mx-0">
            <div
              className="relative w-full h-full rounded-2xl overflow-hidden"
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                isLazy
                src="https://ik.imagekit.io/iflmalang/constant-image/shop"
                className="absolute inset-0 w-full h-full object-fill rounded-2xl z-10"
                description="tumblr-ifl-malang"
              />
            </div>
          </div>

          {/* Konten */}
          <div className="flex flex-col gap-4 sm:gap-6 text-center md:text-left">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-1">
                Catalog
              </h2>
              <i className="w-24 sm:w-36 h-1 bg-primary-1 mx-auto md:mx-0"></i>
            </div>
            <p className="text-sm sm:text-base lg:text-xl text-gray-500">
              Penjualan merch dari IFL Chapter Malang yang 100% keuntungan akan
              diberikan untuk charity melalui Program-Project IFL Chapter
              Malang.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {iconsList.map((item, index) => (
                <Button
                  onClick={() => window.open(item.path, "_blank")}
                  key={index}
                  intent="secondary"
                  className="flex items-center gap-1 sm:gap-2 px-10"
                >
                  <Icon src={item.icon} description={item.title} />
                  {item.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Shop;
