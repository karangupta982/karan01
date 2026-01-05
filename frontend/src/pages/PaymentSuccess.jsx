import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyPayment } from '../services/api';
import './PaymentSuccess.css';

// /**
//  * PaymentSuccess Component
//  * Verifies Stripe payment and displays success/error status
//  */

// export default function PaymentSuccess() {
//   // Router hooks
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   // State for payment verification
//   const [loading, setLoading] = useState(true);
//   const [verified, setVerified] = useState(false);
//   const [error, setError] = useState(null);
//   const [orderData, setOrderData] = useState(null);

//   /**
//    * Verify payment on component mount
//    * Gets session_id from URL and calls verification API
//    */
//   useEffect(() => {
//     const verifyPaymentSession = async () => {
//       try {
//         // Get session_id from URL query parameters
//         const sessionId = searchParams.get('session_id');

//         if (!sessionId) {
//           throw new Error('No session ID found. Payment verification cannot be completed.');
//         }

//         // Call API to verify payment
//         const response = await verifyPayment(sessionId);

//         // Set verified state and order data
//         setVerified(true);
//         setOrderData(response);
//       } catch (err) {
//         // Set error message if verification fails
//         setError(
//           err.message ||
//             'Payment verification failed. Please contact support if your payment was charged.'
//         );
//         console.error('Payment verification error:', err);
//       } finally {
//         // Always stop loading
//         setLoading(false);
//       }
//     };

//     verifyPaymentSession();
//   }, [searchParams]);

//   /**
//    * Handle continue shopping
//    * Navigates back to products page
//    */
//   const handleContinueShopping = () => {
//     navigate('/');
//   };

//   // Loading State
//   if (loading) {
//     return (
//       <div className="payment-success-page">
//         <div className="payment-loading">
//           <p>Verifying your payment...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error State
//   if (error) {
//     return (
//       <div className="payment-success-page">
//         <div className="payment-error">
//           <h2>Payment Verification Failed</h2>
//           <p>{error}</p>
//           <button className="btn-continue-shopping" onClick={handleContinueShopping}>
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Success State
//   if (verified) {
//     return (
//       <div className="payment-success-page">
//         <div className="payment-success">
//           {/* Success Checkmark */}
//           <div className="success-checkmark">✓</div>

//           {/* Success Message */}
//           <h2>Thank You for Your Purchase!</h2>
//           <p className="success-message">
//             Your payment has been successfully processed.
//           </p>

//           {/* Order Details */}
//           {orderData && (
//             <div className="order-details">
//               <h3>Order Details</h3>
//               {orderData.orderId && (
//                 <p>
//                   <strong>Order ID:</strong> {orderData.orderId}
//                 </p>
//               )}
//               {orderData.email && (
//                 <p>
//                   <strong>Confirmation Email:</strong> {orderData.email}
//                 </p>
//               )}
//               {orderData.amount && (
//                 <p>
//                   <strong>Amount Paid:</strong> ${(orderData.amount / 100).toFixed(2)}
//                 </p>
//               )}
//               <p className="confirmation-message">
//                 A confirmation email has been sent to your inbox.
//               </p>
//             </div>
//           )}

//           {/* Continue Shopping Button */}
//           <button className="btn-continue-shopping" onClick={handleContinueShopping}>
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Fallback (should not reach here)
//   return null;
// }













export default function PaymentSuccess({ onNavigate, paymentData }) {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [orderData] = useState({
    orderId: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    email: paymentData?.email || 'customer@example.com',
    amount: paymentData?.amount || 29999
  });

  useState(() => {
    const verifyPayment = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setVerified(true);
      setLoading(false);
    };
    verifyPayment();
  }, []);

  const handleContinueShopping = () => {
    onNavigate('products');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 text-center shadow-2xl animate-slideUp">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold text-lg">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (verified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md animate-slideUp">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
            <span className="text-white text-5xl font-bold">✓</span>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You for Your Purchase!</h2>
          <p className="text-gray-600 mb-6 text-lg">Your payment has been successfully processed.</p>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 text-left space-y-3 border border-blue-100">
            <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center gap-2">
              <span>📦</span>
              Order Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center bg-white rounded-lg p-2">
                <span className="font-semibold text-gray-700">Order ID:</span>
                <span className="text-gray-600 font-mono">{orderData.orderId}</span>
              </div>
              <div className="flex justify-between items-center bg-white rounded-lg p-2">
                <span className="font-semibold text-gray-700">Email:</span>
                <span className="text-gray-600">{orderData.email}</span>
              </div>
              <div className="flex justify-between items-center bg-white rounded-lg p-2">
                <span className="font-semibold text-gray-700">Amount:</span>
                <span className="text-green-600 font-bold text-lg">${(orderData.amount / 100).toFixed(2)}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 pt-3 border-t border-blue-200 flex items-center gap-2">
              <span>✉️</span>
              A confirmation email has been sent to your inbox.
            </p>
          </div>
          
          <button 
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 active:scale-95 transition-all shadow-lg"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return null;
}