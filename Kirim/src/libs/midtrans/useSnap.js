import { useState, useEffect } from "react";

const MIDTRANS_CLIENT_ID = import.meta.env.VITE_MIDTRANS_CLIENT_ID;

const useSnap = () => {
  const [snap, setSnap] = useState(null);

  useEffect(() => {
    const myMidtransClientKey = MIDTRANS_CLIENT_ID;
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", myMidtransClientKey);
    script.onload = () => {
      setSnap(window.snap);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const snapEmbed = (snap_token, action) => {
    if (snap) {
      snap.pay(snap_token, {
        onSuccess: function (result) {
          action.onSuccess(result);
        },
        onPending: function (result) {
          action.onPending(result);
        },
        onClose: function () {
          action.onClose();
        },
      });
    }
  };

  return { snapEmbed };
};

export default useSnap;
