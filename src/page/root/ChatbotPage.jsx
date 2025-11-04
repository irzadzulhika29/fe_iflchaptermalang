import Navbar from "../../components/navbar";

import Chatbot from "../../layouts/event/chatbot";
import HelmetLayout from "../../layouts/helmet";

const ChatbotPage = () => {
    return (
        <div className="inner_body">
            <HelmetLayout
                title="Tentang Kami | Indonesian Future Leaders Chapter Malang"
                description="Indonesian Future Leaders berdiri secara resmi sebagai sebuah Lembaga Swadaya Masyarakat yang digerakkan oleh kaum muda, pada tahun 2009, oleh sekelompok anak muda berusia 17-18 tahun."
                pageLink="/chatbot/:slug"
                keywords="indonesian future leaders, ifl malang, ifl chapter malang, ifl, tentang kami, about, comper, communication and cooperation"
            />
            <Navbar />
            <Chatbot />
        </div>
    );
};

export default ChatbotPage;
