import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { createCheckoutSession } from '../services/api';

// /**
//  * CheckoutPage Component
//  * Handles checkout form and Stripe payment session creation
//  */

// export default function CheckoutPage() {
//   // Router hooks
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get cart data from navigation state
//   const cartData = location.state;

//   // State for loading and error handling
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   /**
//    * Handle checkout process
//    * Creates a Stripe checkout session and redirects to Stripe Checkout
//    * @param {Object} checkoutData - Contains email, items, and totalAmount
//    */
//   const handleCheckout = async (checkoutData) => {
//     setLoading(true);
//     setError(null);

//     try {
//       // Validate cart items exist
//       if (!checkoutData.items || checkoutData.items.length === 0) {
//         throw new Error('Your cart is empty. Please add items before checking out.');
//       }

//       // Call API to create checkout session
//       const response = await createCheckoutSession({
//         items: checkoutData.items,
//         customerEmail: checkoutData.email,
//       });

//       // Check if session was created successfully
//       if (!response.url) {
//         throw new Error('Failed to create checkout session. Please try again.');
//       }

//       // Redirect to Stripe Checkout using the session URL
//       window.location.href = response.url;
//     } catch (err) {
//       // Set error message to display to user
//       setError(err.message || 'An error occurred during checkout. Please try again.');
//       console.error('Checkout error:', err);
//       setLoading(false);
//     }
//   };

//   /**
//    * Handle cancel action
//    * Navigates back to products page
//    */
//   const handleCancel = () => {
//     navigate('/');
//   };

//   // If no cart data, show empty message
//   if (!cartData || !cartData.items || cartData.items.length === 0) {
//     return (
//       <div className="checkout-page">
//         <div className="empty-cart-container">
//           <h2>Your Cart is Empty</h2>
//           <p>You need to add items before checking out.</p>
//           <button className="btn-back-to-products" onClick={handleCancel}>
//             Back to Products
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="checkout-page">
//       {/* Loading State */}
//       {loading && (
//         <div className="loading-overlay">
//           <div className="loading-spinner">
//             <p>Processing your checkout...</p>
//           </div>
//         </div>
//       )}

//       {/* Error Message */}
//       {error && (
//         <div className="error-banner">
//           <p>{error}</p>
//           <button
//             className="close-error"
//             onClick={() => setError(null)}
//           >
//             ✕
//           </button>
//         </div>
//       )}

//       {/* Checkout Form */}
//       <CheckoutForm
//         cartItems={cartData.items}
//         totalAmount={cartData.totalAmount}
//         onSubmit={handleCheckout}
//         onCancel={handleCancel}
//       />
//     </div>
//   );
// }










export default function CheckoutPage({ onNavigate, cartData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async (checkoutData) => {
    setLoading(true);
    setError(null);

    try {
      if (!checkoutData.items || checkoutData.items.length === 0) {
        throw new Error('Your cart is empty. Please add items before checking out.');
      }

      await new Promise(resolve => setTimeout(resolve, 1500));
      onNavigate('success', { email: checkoutData.email, amount: checkoutData.totalAmount * 100 });
    } catch (err) {
      setError(err.message || 'An error occurred during checkout. Please try again.');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onNavigate('products');
  };

  if (!cartData || !cartData.items || cartData.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md animate-slideUp">
          <span className="text-6xl mb-4 block">🛒</span>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">You need to add items before checking out.</p>
          <button 
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 active:scale-95 transition-all shadow-lg"
            onClick={handleCancel}
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl animate-slideUp">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-700 font-semibold text-lg">Processing your checkout...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-2xl mx-auto mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center justify-between shadow-lg animate-slideDown">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <p className="text-red-700 font-medium">{error}</p>
          </div>
          <button 
            className="text-red-500 hover:text-red-700 text-2xl transition-colors"
            onClick={() => setError(null)}
          >
            ✕
          </button>
        </div>
      )}

      <CheckoutForm
        cartItems={cartData.items}
        totalAmount={cartData.totalAmount}
        onSubmit={handleCheckout}
        onCancel={handleCancel}
      />
    </div>
  );
}
