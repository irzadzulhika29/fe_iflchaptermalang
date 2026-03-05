import Container from "../../components/container";
import Image from "../../components/image";
import { pillarsActionList } from "../../static/data";

const Action = () => {
  return (
    <div className="bg-primary-1 min-h-screen py-12 flex flex-col items-center">
      <Container className="text-center text-white">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-wide">
            3 Pilar Aksi
          </h2>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 sm:gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {pillarsActionList.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 sm:gap-6 text-center transition-transform transform hover:scale-105 bg-white shadow-lg p-6 sm:p-8 rounded-2xl hover:shadow-2xl"
            >
              <Image
                isLazy
                src={item.icon}
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                description={item.title}
              />
              <h3 className="text-lg sm:text-xl font-semibold text-primary-1">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-black">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Action;
