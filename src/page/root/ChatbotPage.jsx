import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import Chatbot from "../../layouts/event/chatbot";
import HelmetLayout from "../../layouts/helmet";

const ChatbotPage = () => {
    const { state } = useLocation();
    const program = state?.program;
    
    // Sekarang bisa akses data event
    console.log('Event Name:', program?.title);
    console.log('Event Slug:', program?.slug);
    
    return (
        <div className="inner_body">
            <HelmetLayout
                title={`Daftar ${program?.title || 'Event'} | Indonesian Future Leaders Chapter Malang`}
                description={program?.description || "Daftar program Indonesian Future Leaders Chapter Malang"}
                pageLink={`/chatbot/${program?.slug || program?.id}`}
                keywords={`indonesian future leaders, ifl malang, ${program?.title}, pendaftaran`}
            />
            <Navbar />
            <Chatbot />
        </div>
    );
};

export default ChatbotPage;