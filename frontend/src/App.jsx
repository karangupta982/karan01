import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import './App.css';

// /**
//  * Main App Component
//  * Sets up routing for the entire application
//  */

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Products listing page */}
//         <Route path="/" element={<ProductsPage />} />

//         {/* Checkout form page */}
//         <Route path="/checkout" element={<CheckoutPage />} />

//         {/* Payment success page (after Stripe redirect) */}
//         <Route path="/payment-success" element={<PaymentSuccess />} />

//         {/* Payment failed page (if payment is cancelled or fails) */}
//         <Route path="/payment-failed" element={<PaymentFailed />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }









export default function App() {
  const [currentPage, setCurrentPage] = useState('products');
  const [pageData, setPageData] = useState(null);

  const handleNavigate = (page, data = null) => {
    setCurrentPage(page);
    setPageData(data);
  };

  return (
    <div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
        .animate-shake {
          animation: shake 0.3s ease-out;
        }
      `}</style>

      {currentPage === 'products' && (
        <ProductsPage onNavigate={handleNavigate} />
      )}
      
      {currentPage === 'checkout' && (
        <CheckoutPage onNavigate={handleNavigate} cartData={pageData} />
      )}
      
      {currentPage === 'success' && (
        <PaymentSuccess onNavigate={handleNavigate} paymentData={pageData} />
      )}
      
      {currentPage === 'failed' && (
        <PaymentFailed onNavigate={handleNavigate} />
      )}
    </div>
  );
}
