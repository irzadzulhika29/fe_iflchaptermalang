import Container from "../../components/container";

const Medpart = () => {
  return (
    <section id="medpart" className=" bg-light-1 text-center">
      <Container>
        {/* Header */}
        <h2 className="text-2xl font-bold tracking-wide sm:text-3xl text-primary-1 mb-20">
          Our Media Partner
        </h2>

        {/* Kotak Media Partner */}
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-full place-items-center">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="w-20 h-16 bg-primary-1 rounded-md hover:scale-110 transition transform duration-300"
                ></div>
              ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Medpart;