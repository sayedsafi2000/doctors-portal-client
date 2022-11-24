import React, { useState, useEffect } from 'react';
import { CardElement, useElements, useStripe, } from "@stripe/react-stripe-js";
const CheckOutForm = ({ booking }) => {
    const [cardError, setcardError] = useState("");
    const [success, setSuccess] = useState("");
    const [transactionID, setTransactionID] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();


    const { price, email, patient,_id } = booking;

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://doctors-portal-server-two-omega.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);




    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        });
        if (error) {
            setcardError(error.message)
            console.error(error)
        }
        else {
            setcardError(" ")
        }
        setSuccess("")
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patient,
                        email: email
                    },
                },
            },
        );
        if (confirmError) {
            setcardError(confirmError.message)
            return;
        }
        if (paymentIntent.status === "succeeded") {
            setSuccess("Congress! Your Payment Completed")
            setTransactionID(paymentIntent.id);
            const payment = {
                price,
                transactionID : paymentIntent.id,
                email,
                bookingId:_id
            }
            fetch("https://doctors-portal-server-two-omega.vercel.app/payments", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: `bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.insertedID) {
                        setSuccess("Congress! Your Payment Completed")
                        setTransactionID(paymentIntent.id);
                    }
                })
        }
        console.log("paymentIntent", paymentIntent)
        setProcessing(false);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-sm mt-4 btn-secondary text-white' type="submit"
                    disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className="text-red-600">{cardError}</p>
            {
                success &&
                <div>
                    <p className='text-green-600'>{success}</p>
                    <p className="">Your Transactioon Id is : <span className='text-yellow-600 '>{transactionID}|</span></p>
                </div>
            }
        </div>
    );
};

export default CheckOutForm;