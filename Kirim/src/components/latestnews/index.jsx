import { useState, useEffect, useRef } from "react";
import { CaretRight, CaretDown, CaretUp } from "@phosphor-icons/react";
import donationProofImage from "../../assets/image/donationhero.png";

const LatestNews = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState({});
  const popupRef = useRef(null);


  const newsData = [
    {
      date: "28 October 2024",
      status: "Distributed",
      amount: "Rp300.000",
      recipient: "Ibu Ijah - Komunitas Omah Gembira",
      proofImage: donationProofImage,
    },
    {
      date: "30 October 2024",
      status: "Distributed",
      amount: "Rp900.000",
      recipient: "Bapak Sarman - Yayasan Asa Cerah",
      proofImage: donationProofImage,
    },
  ];

  const latestNewsDate = "15 October 2024";

 
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };


  const toggleDropdown = (index) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    };
    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen]);

  return (
    <div className="space-y-6">
      <hr className="border-gray-300" />

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">Latest News</h2>
          <p className="text-sm text-gray-500">Last Update | {latestNewsDate}</p>
        </div>
        <span
          className="text-gray-400 text-lg cursor-pointer"
          onClick={togglePopup}
        >
          <CaretRight size={24} />
        </span>
      </div>

      <hr className="border-gray-300" />

      {isPopupOpen && (
        <div className="popup-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="popup-content bg-white shadow-lg rounded-xl p-4 w-96"
            ref={popupRef}
          >
            <h3 className="text-lg font-semibold mb-4">Latest Updates</h3>
            <div className="space-y-4">
              {newsData.map((news, index) => (
                <div key={index} className="border-b pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p>{news.date}</p>
                      <p className="text-sm text-green-500">{news.status}</p>
                    </div>
                    <p className="text-blue-600">{news.amount}</p>
                    <span
                      className="text-gray-400 cursor-pointer"
                      onClick={() => toggleDropdown(index)}
                    >
                      {isDropdownOpen[index] ? (
                        <CaretUp size={20} />
                      ) : (
                        <CaretDown size={20} />
                      )}
                    </span>
                  </div>
                  {isDropdownOpen[index] && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Recipient | {news.recipient}
                      </p>
                      <img
                        src={news.proofImage}
                        alt="Donation Proof"
                        className="mt-4 rounded-md"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .popup-content {
          max-width: 400px;
          width: 100%;
          border-radius: 8px;
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default LatestNews;
