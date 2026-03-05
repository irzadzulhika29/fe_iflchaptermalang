import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

import HelmetLayout from "../../layouts/helmet";
import ProjectSection from "../../layouts/project";

const ProjectPage = () => {
  return (
    <div className="inner_body">
      <HelmetLayout
        title="Project | Indonesian Future Leaders Chapter Malang"
        description="Indonesian Future Leaders Chapter Malang memiliki kegiatan bernama 'project' yang berkaitan dengan poin-poin SDGs yaitu no poverty; gender equality; reduced inequalities; sustainable cities and communities; peace, justice, and strong institutions dan partnership for the goals. Pada kegiatan ini memiliki beberapa agenda yaitu close the gap, grow them great, youthquake, ifl take action"
        pageLink="/project"
        keywords="indonesian future leaders, ifl malang, ifl chapter malang, ifl, close the gap, grow them great, youth quake, youthquake, ifl take action, project, ifl project"
      />
      <Navbar />
      <ProjectSection />
      <Footer />
    </div>
  );
};

export default ProjectPage;
