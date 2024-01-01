"use client"

import React from 'react';
import useCartInfo from '../../hooks/use-cart-info';
import { useSelector } from 'react-redux';
import getStripePromise from '../../app/api/stripe';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';


const OrderSummery = () => {

	const { cartCourses } = useSelector(state => state.cart);
  	const { total } = useCartInfo();
	const route = useRouter()
	  let uid; 
	  const handleCheckoutButtonClick = async () => {
    
		const auth = getAuth();
		const user = await new Promise((resolve) => {
			onAuthStateChanged(auth, (user) => {
			  resolve(user);
			});
		  });

		  if(user){
		try {
		  // Make a POST request to the /api/checkout_sessions endpoint
		  const stripe = await getStripePromise();
		  const response = await fetch('/api/checkout_sessions', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({ data: cartCourses,user:user.uid}),
		  });
	
		  const data = await response.json();
		  if(data.session){
			stripe?.redirectToCheckout({sessionId:data.session.id})
		  }
		 
		} catch (error) {
		  // Handle any network or other errors
		  console.error('An error occurred:', error);
		}
	}
	else{
		route.push("/sign-in")
	}
	  };
  	return (
		<div className="order-summery">
			<h4 className="title">Cart Totals</h4>
			<table className="table summery-table">
				<tbody>
					<tr className="order-subtotal">
						<td>Subtotal</td>
						<td>${(total).toFixed(2)}</td>
					</tr>
					<tr className="order-total">
						<td>Order Total</td>
						<td>${(total).toFixed(2)}</td>
					</tr>
				</tbody>
			</table>
			<button className="edu-btn btn-medium checkout-btn" onClick={handleCheckoutButtonClick}>
      Process to Checkout <i className="icon-4"></i>
    </button>
		</div>
  	)
}

export default OrderSummery;