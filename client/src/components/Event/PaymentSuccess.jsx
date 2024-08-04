import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("Payment completed successfully!");

    const timer = setTimeout(() => {
      navigate("/event-list");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <h1>Payment Success</h1>
      <p>Thank you for your purchase! You will be redirected shortly.</p>
    </div>
  );
};

export default PaymentSuccess;
