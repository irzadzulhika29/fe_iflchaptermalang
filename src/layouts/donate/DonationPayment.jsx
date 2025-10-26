import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CaretLeft } from "@phosphor-icons/react";
import Background from "../../components/background";
import { Button } from "../../components/button";
import Container from "../../components/container";
import Loading from "../../components/loader";
import API from "../../libs/api";
import { addDonationForCampaign } from "../../features/donation/hooks";


const amounts = [5000, 10000, 20000, 25000, 50000, 100000];

const InputAmount = ({ value, setAmount }) => (
  <input
    type="number"
    value={value || ""}
    placeholder="RP 0"
    className="w-full py-4 px-4 text-2xl font-semibold text-right border-2 text-black border-gray-300 bg-gray-100 rounded-xl sm:py-6 sm:text-3xl md:py-10 md:px-6 md:text-4xl"
    min="2000"
    required
    onChange={(e) => setAmount(e.target.value)}
  />
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
  const [amount, setAmount] = useState(null);
  const [isAnonymous, setAnonymous] = useState(false);
  const [isError, setError] = useState({
    name: false,
    email: false,
    phone: false,
  });
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    donation_message: "",
  });
  const [methods, setMethods] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const amountRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle anonymous checkbox change
  const handleAnonymousChange = (e) => {
    const checked = e.target.checked;
    setAnonymous(checked);
    if (checked) {
      setInput(prev => ({
        ...prev,
        name: "Good Person"
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
    const fetchPaymentMethods = async () => {
      if (dataCampaign.dataCampaign?.id) {
        try {
          const response = await API.get(`/campaign/${dataCampaign.dataCampaign.id}/donation`);
          setMethods(response.data);
        } catch (error) {
          console.error("Error fetching payment methods", error);
        }
      }
    };
    fetchPaymentMethods();
  }, [dataCampaign]);

  useEffect(() => {
    if (amount !== '') {  // Hanya validasi jika amount tidak kosong
      if (Number(amount) < 2000) {
        setError(prev => ({ ...prev, amount: true }));
      } else {
        setError(prev => ({ ...prev, amount: false }));
      }
    }
  }, [amount]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) < 2000) {
      setError(prev => ({ ...prev, amount: true }));
      scrollToRef = amountRef;
    }

    let scrollToRef = null;
    
      if (!input.email) {
        setError((prev) => ({ ...prev, email: true }));
        if (!scrollToRef) scrollToRef = emailRef;
      }
      if (!input.phone) {
        setError((prev) => ({ ...prev, phone: true }));
        if (!scrollToRef) scrollToRef = phoneRef;
      }
  
  

    if (scrollToRef) {
      scrollToRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    const body = {
      donation_amount: amount,
      slug,
      name: input.name || dataProfile?.username,
      email: input.email || dataProfile?.email,
      phone: input.phone || dataProfile?.phone,
      donation_message: input.donation_message,
      method: paymentMethod,
    };

    try {
      await addDonationForCampaign(body);
    } catch (error) {
      console.error("Error processing donation", error);
    }
  };

  const handlePaymentChange = (e) => setPaymentMethod(e.target.value);

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
              You’re donating to <strong>{dataCampaign.dataCampaign?.title}</strong>. The
              fund will benefit <strong>{dataCampaign.dataCampaign?.receiver}</strong>.
            </p>
          </div>
        </div>

        <hr className="border-gray-300 my-5" />

        {/* Donation Form */}
        <form onSubmit={onSubmit} className="space-y-6">
          <InputPaymentDonation
            name="name"
            title="Name"
            placeholder="Enter your name"
            handleChange={handleChange}
            type="text"
            value={input.name || dataProfile?.username}
            required={!isAnonymous}
            ref={nameRef}
            readOnly = {isAnonymous}
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

          <div className="space-y-4">
            <h4 className="text-black text-center font-semibold text-lg">
              Enter Donation Amount
            </h4>
            <InputAmount value={amount} setAmount={setAmount} ref={amountRef} />
            {isError.amount && (
              <small className="text-red-600">
                The minimum donation amount is Rp 2000
              </small>
            )}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4">
              {amounts.map((item) => (
                <Button
                  key={item}
                  type="button"
                  className="bg-zinc-200 py-2 rounded-lg hover:bg-white hover:border hover:border-primary-1 hover:text-primary-1 w-full text-black text-sm"
                  onClick={() => setAmount(item)}
                >
                  Rp {item.toLocaleString()}
                </Button>
              ))}
            </div>
          </div>

          <hr className="border-gray-300 my-5" />

          {/* Donation Form */}
          {/* <form onSubmit={onSubmit} className='space-y-6'> */}
          {/* Other Input Fields */}
          <div className="space-y-4">
            <h4 className="text-black text-center font-semibold text-lg">
              Select Payment Method
            </h4>

            {methods.map((method, index) => (
              <label
                key={index}
                className="flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer mt-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={method.icon_url}
                    alt={method.name}
                    className="w-10 h-10 object-contain"
                  />
                  <span className="text-gray-700 text-sm">{method.name}</span>
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.code}
                  checked={paymentMethod === method.code}
                  onChange={handlePaymentChange}
                  className="form-radio text-primary-1 focus:ring-primary-1"
                  style={{ width: "1.5rem", height: "1.5rem" }}
                />
              </label>
            ))}
          </div>


          <div className="mt-8">
          <Button
  variant="primary"
  type="submit"
  className="w-full py-3 bg-primary-1 text-white border-2 border-transparent hover:bg-white hover:border-primary-1 hover:text-primary-1"
  disabled={isPending}
>
  Donate Now
</Button>


          </div>
        </form>
      </Container>
    </Background>
  );
};

export default DonationPayment;