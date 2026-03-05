/**
 * Initialize Midtrans Snap Payment
 * @param {string} snapToken - Token from backend
 * @param {function} onSuccess - Callback when payment success
 * @param {function} onPending - Callback when payment pending
 * @param {function} onError - Callback when payment error/failed
 * @param {function} onClose - Callback when user close popup
 */
export const initMidtransSnap = (snapToken, callbacks = {}) => {
    const {
      onSuccess = () => {},
      onPending = () => {},
      onError = () => {},
      onClose = () => {},
    } = callbacks;
  
    if (!window.snap) {
      console.error("Midtrans Snap is not loaded");
      return;
    }
  
    window.snap.pay(snapToken, {
      onSuccess: function (result) {
        console.log("Payment success:", result);
        onSuccess(result);
      },
      onPending: function (result) {
        console.log("Payment pending:", result);
        onPending(result);
      },
      onError: function (result) {
        console.log("Payment error:", result);
        onError(result);
      },
      onClose: function () {
        console.log("Payment popup closed");
        onClose();
      },
    });
  };