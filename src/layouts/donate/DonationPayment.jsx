import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CaretLeft, UploadSimple } from "@phosphor-icons/react";
import Background from "../../components/background";
import { Button } from "../../components/button";
import Container from "../../components/container";
import Loading from "../../components/loader";
import API from "../../libs/api";
import qrisImage from "../../assets/image/donation/qrs_donasi.jpg";
import { addDonationWithQRIS } from "../../features/donation/hooks";

const QRISDisplay = () => (
  <div className="flex flex-col items-center justify-center space-y-4 py-6">
    <h3 className="text-lg font-semibold text-gray-800">Scan QRIS Code</h3>
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img 
        src={qrisImage} 
        alt="QRIS Code" 
        className="w-80 h-80 object-contain"
      />
    </div>
    <p className="text-sm text-gray-600 text-center">
      Scan kode QRIS di atas menggunakan aplikasi mobile banking atau e-wallet Anda
    </p>
  </div>
);

const UploadProof = ({ onFileChange, fileName, error }) => (
  <div className="space-y-2">
    <label className="text-black text-sm font-semibold">
      Upload Bukti Transfer <span className="text-red-500">*</span>
    </label>
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-1 transition-colors">
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="hidden"
        id="proof-upload"
      />
      <label htmlFor="proof-upload" className="cursor-pointer flex flex-col items-center gap-2">
        <UploadSimple size={48} className="text-gray-400" />
        <span className="text-sm text-gray-600">
          {fileName ? fileName : "Click untuk upload bukti transfer"}
        </span>
        <span className="text-xs text-gray-500">Format: JPG, PNG (Max 5MB)</span>
      </label>
    </div>
    {error && <small className="text-red-600">Bukti transfer wajib diupload</small>}
  </div>
);

const BorderedImage = ({ src, alt }) => (
  <div className="relative w-60 h-40 sm:w-72 sm:h-48 md:w-full md:h-48 rounded-lg overflow-hidden mx-auto">
    <img src={src} alt={alt} className="w-full h-full object-cover" />
    <div className="absolute top-0 right-0 w-20 h-20 border-t-8 border-r-8 border-primary-1 md:w-24 md:h-24"></div>
    <div className="absolute bottom-0 left-0 w-20 h-20 border-b-8 border-l-8 border-primary-1 md:w-24 md:h-24"></div>
  </div>
);

const ReturnButton = () => {
  const navigate = useNavigate();
  const goBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/campaign");
    }
  };

  return (
    <button
      className="flex items-center gap-2 text-primary-1 text-base font-medium mb-10 md:text-lg"
      onClick={goBack}
    >
      <div className="w-7 h-7 flex items-center justify-center bg-primary-1 text-white rounded-full">
        <CaretLeft size={18} weight="bold" className="text-white" />
      </div>
      <span className="font-semibold">Return</span>
    </button>
  );
};

const InputPaymentDonation = ({
  name,
  title,
  placeholder,
  handleChange,
  type,
  value,
  required,
  ref,
  readOnly = false
}) => {
  return (
    <div className="space-y-1" ref={ref}>
      <label className="text-black text-sm font-semibold">
        {title} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full py-2 px-4 border border-gray-300 rounded-lg text-black ${
          readOnly ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        } focus:outline-none focus:ring-2 focus:ring-primary-1`}
      />
    </div>
  );
};

const DonationPayment = ({
  dataCampaign,
  dataProfile,
  mutate,
  isPending,
  isLoading,
  slug,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnonymous, setAnonymous] = useState(false);
  const [isError, setError] = useState({
    name: false,
    email: false,
    phone: false,
    proof: false,
  });
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    donation_message: "",
  });
  const [proofFile, setProofFile] = useState(null);
  const [proofFileName, setProofFileName] = useState("");
  const [qrisUrl, setQrisUrl] = useState("");

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAnonymousChange = (e) => {
    const checked = e.target.checked;
    setAnonymous(checked);
    if (checked) {
      setInput(prev => ({
        ...prev,
        name: "Hamba Allah"
      }));
      setError(prev => ({
        ...prev,
        name: false
      }));
    } else {
      setInput(prev => ({
        ...prev,
        name: dataProfile?.username || ""
      }));
    }
  };

  useEffect(() => {
    const fetchQRIS = async () => {
      if (dataCampaign.dataCampaign?.id) {
        try {
          const response = await API.get(`/campaign/${dataCampaign.dataCampaign.id}/qris`);
          setQrisUrl(response.data?.qris_url || "");
        } catch (error) {
          console.error("Error fetching QRIS", error);
        }
      }
    };
    fetchQRIS();
  }, [dataCampaign]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { 
        setError(prev => ({ ...prev, proof: true }));
        return;
      }
      setProofFile(file);
      setProofFileName(file.name);
      setError(prev => ({ ...prev, proof: false }));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    
    let scrollToRef = null;
    
    if (!isAnonymous && !input.name && !dataProfile?.username) {
      setError((prev) => ({ ...prev, name: true }));
      if (!scrollToRef) scrollToRef = nameRef;
    }
    if (!input.email && !dataProfile?.email) {
      setError((prev) => ({ ...prev, email: true }));
      if (!scrollToRef) scrollToRef = emailRef;
    }

    if (scrollToRef) {
      scrollToRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!proofFile) {
      setError((prev) => ({ ...prev, proof: true }));
      return;
    }

    const formData = new FormData();
    formData.append("slug", slug);
    formData.append("name", input.name || dataProfile?.username);
    formData.append("email", input.email || dataProfile?.email);
    formData.append("phone", input.phone || dataProfile?.phone);
    formData.append("donation_message", input.donation_message);
    formData.append("payment_proof", proofFile);
    formData.append("is_anonymous", isAnonymous);

    try {
      await addDonationWithQRIS(formData);
    } catch (error) {
      console.error("Error processing donation", error);
    }
  };

  if (isLoading) {
    return <Loading height={100} width={100} className="min-h-screen" />;
  }

  return (
    <Background
      src="https://ik.imagekit.io/iflmalang/constant-image/backdrop-main.webp"
      className="min-h-screen flex justify-center items-center bg-gray-50"
      description="Backdrop Program and Project"
    >
      <Container className="max-w-lg lg:max-w-3xl py-6 px-4 sm:py-8 sm:px-6 md:py-10 md:px-8 space-y-6 bg-white shadow-lg rounded-lg">
        <ReturnButton />
        
        {/* Header Campaign Info */}
        <div className="flex flex-col items-start gap-4 md:flex-row md:gap-8">
          <BorderedImage src={dataCampaign.dataCampaign?.image} alt={dataCampaign.dataCampaign?.title} />
          <div className="flex-grow">
            <h1 className="text-lg font-bold text-gray-800 sm:text-xl md:text-2xl">
              Our hands extended in kindness could reach millions of hearts!
            </h1>
            <div className="flex gap-2 my-2">
              {dataCampaign.dataCampaign?.categories?.map((category, index) => (
                <span
                  key={index}
                  className={`${
                    {
                      kemanusiaan: "bg-orange-200 text-orange-600",
                      kesehatan: "bg-green-200 text-green-600",
                      pendidikan: "bg-purple-200 text-purple-600",
                      "tanggap bencana": "bg-blue-200 text-blue-600",
                    }[category] || "bg-gray-200 text-gray-600"
                  } px-3 py-2 rounded-full text-sm font-medium`}
                >
                  {category}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 sm:text-base">
              You're donating to <strong>{dataCampaign.dataCampaign?.title}</strong>. The
              fund will benefit <strong>{dataCampaign.dataCampaign?.receiver}</strong>.
            </p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 py-4">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
              currentStep === 1 ? 'bg-primary-1 text-white' : 'bg-green-500 text-white'
            }`}>
              {currentStep === 1 ? '1' : '✓'}
            </div>
            <span className="text-sm font-medium text-gray-700">Data Diri</span>
          </div>
          <div className="w-12 h-1 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
              currentStep === 2 ? 'bg-primary-1 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              2
            </div>
            <span className="text-sm font-medium text-gray-700">QRIS & Bukti</span>
          </div>
        </div>

        <hr className="border-gray-300 my-5" />

        {currentStep === 1 && (
          <form onSubmit={handleNext} className="space-y-6">
            <InputPaymentDonation
              name="name"
              title="Name"
              placeholder="Enter your name"
              handleChange={handleChange}
              type="text"
              value={input.name || dataProfile?.username}
              required={!isAnonymous}
              ref={nameRef}
              readOnly={isAnonymous}
            />
            {isError.name && (
              <small className="text-red-600">Please enter your name</small>
            )}

            <InputPaymentDonation
              name="email"
              title="Email"
              placeholder="Enter your email"
              handleChange={handleChange}
              type="email"
              value={input.email || dataProfile?.email}
              required={!isAnonymous}
              ref={emailRef}
            />
            {isError.email && (
              <small className="text-red-600">Please enter your email</small>
            )}

            <InputPaymentDonation
              name="phone"
              title="Phone"
              placeholder="Enter your phone"
              handleChange={handleChange}
              type="number"
              value={input.phone || dataProfile?.phone}
              required={!isAnonymous}
              ref={phoneRef}
            />
            {isError.phone && (
              <small className="text-red-600">Please enter your phone</small>
            )}

            <InputPaymentDonation
              name="donation_message"
              title="Good Prayers"
              placeholder="Enter your prayer"
              handleChange={handleChange}
              type="text"
              value={input.donation_message}
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={handleAnonymousChange}
                className="w-4 h-4 text-primary-1 rounded border-gray-300 focus:ring-primary-1"
              />
              <label className="text-sm text-black font-semibold">
                Donate as anonymous
              </label>
            </div>

            <div className="mt-8">
              <Button
                variant="primary"
                type="submit"
                className="w-full py-3 bg-primary-1 text-white border-2 border-transparent hover:bg-white hover:border-primary-1 hover:text-primary-1"
              >
                Next
              </Button>
            </div>
          </form>
        )}

        {currentStep === 2 && (
          <form onSubmit={onSubmit} className="space-y-6">
            <QRISDisplay qrisUrl={qrisUrl} />
            
            <hr className="border-gray-300 my-5" />
            
            <UploadProof 
              onFileChange={handleFileChange}
              fileName={proofFileName}
              error={isError.proof}
            />

            <div className="flex gap-4 mt-8">
              <Button
                type="button"
                onClick={handleBack}
                className="w-1/3 py-3 bg-gray-300 text-gray-700 border-2 border-transparent hover:bg-gray-400"
              >
                Back
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="w-2/3 py-3 bg-primary-1 text-white border-2 border-transparent hover:bg-white hover:border-primary-1 hover:text-primary-1"
                disabled={isPending}
              >
                {isPending ? "Processing..." : "Submit Donation"}
              </Button>
            </div>
          </form>
        )}
      </Container>
    </Background>
  );
};

export default DonationPayment;