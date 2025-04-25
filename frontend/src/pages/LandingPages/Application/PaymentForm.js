import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

export default function PaymentForm({ applicationId, payment }) {
    console.log("payment component id");
    // console.log(applicationId)
    // console.log(payment)
    const price=payment;
    const appId = applicationId;

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();


    const handlePayment = async () => {


        if (!stripe || !elements) {
            alert("Stripe has not been loaded yet. Please try again later.");
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
            console.error("Payment Error:", error);
            alert(error.message);
            return;
        }

        // Send the token to the backend for processing
        try {
            await axios.post(
                "http://localhost:5001/api/visa/payID",
                {
                    visaApplicationId: appId,
                    amount: price,
                    currency: "LKR",
                    token: token.id,
                },
                {
                    headers: {
                        'Content-Type': 'application/json', 
                    }
                }
            );
            alert("payment success")
     
            navigate('/view/payment-success', {
                state: {
                    appId: appId,
                    payment:price
                   
                }})


        } catch (err) {
            console.error("Payment request failed:", err);
            alert("Payment failed. Please try again.");
        }
    };

    return (
        <div
            style={{
                width: '100%',              
                maxWidth: '1200px',          
                margin: '0 auto',            
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                background: '#fff',
            }}
        >
            <h3 style={{ marginBottom: '20px', fontSize: '20px', color: '#333', textAlign: 'center' }}>
                Enter Payment Details
            </h3>

            <div
                style={{
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    marginBottom: '20px',
                }}
            >
                <CardElement />
            </div>

            <button
                onClick={handlePayment}
                style={{
                    width: '100%',
                    padding: '12px',
                    background: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.background = '#0056b3')}
                onMouseOut={(e) => (e.target.style.background = '#007bff')}
            >
                Pay Now
            </button>
        </div>


    )
}


PaymentForm.propTypes = {
    applicationId: PropTypes.string.isRequired,
};

PaymentForm.propTypes = {
    applicationId: PropTypes.string.isRequired,
    payment: PropTypes.number.isRequired, 
};
