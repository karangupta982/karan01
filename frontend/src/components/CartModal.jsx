// import './CartModal.css';

// /**
//  * CartModal Component
//  * Displays shopping cart items in a modal overlay
//  */

// export default function CartModal({
//   isOpen,
//   onClose,
//   cartItems,
//   onCheckout,
//   onRemoveItem,
// }) {
//   // Return nothing if modal is not open
//   if (!isOpen) return null;

//   // Calculate total amount
//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       {/* Modal Content */}
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         {/* Modal Header */}
//         <div className="modal-header">
//           <h2>Your Cart</h2>
//           <button className="close-button" onClick={onClose}>
//             ✕
//           </button>
//         </div>

//         {/* Cart Items or Empty Message */}
//         <div className="modal-body">
//           {cartItems.length === 0 ? (
//             <p className="empty-cart-message">Your cart is empty</p>
//           ) : (
//             <div className="cart-items-list">
//               {/* Render each cart item */}
//               {cartItems.map((item) => (
//                 <div key={item.id} className="cart-item">
//                   {/* Item Image */}
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="cart-item-image"
//                   />

//                   {/* Item Details */}
//                   <div className="cart-item-details">
//                     <h4 className="cart-item-name">{item.name}</h4>
//                     <p className="cart-item-price">
//                       ${item.price.toFixed(2)} × {item.quantity}
//                     </p>
//                   </div>

//                   {/* Item Total */}
//                   <div className="cart-item-total">
//                     <span>${(item.price * item.quantity).toFixed(2)}</span>
//                   </div>

//                   {/* Remove Button */}
//                   <button
//                     className="btn-remove"
//                     onClick={() => onRemoveItem(item.id)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Modal Footer */}
//         {cartItems.length > 0 && (
//           <div className="modal-footer">
//             {/* Total Amount */}
//             <div className="total-amount">
//               <span className="total-label">Total:</span>
//               <span className="total-value">${total.toFixed(2)}</span>
//             </div>

//             {/* Action Buttons */}
//             <div className="modal-buttons">
//               <button className="btn-continue" onClick={onClose}>
//                 Continue Shopping
//               </button>
//               <button className="btn-checkout" onClick={onCheckout}>
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }












export default function CartModal({ isOpen, onClose, cartItems, onCheckout, onRemoveItem }) {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
          <button 
            className="text-gray-500 hover:text-gray-700 text-3xl leading-none transition-colors hover:rotate-90 duration-300"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">🛒</span>
              <p className="text-gray-500 text-lg">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 truncate">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-lg text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  <button
                    className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 active:scale-95 transition-all"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-200 space-y-4 bg-gray-50 rounded-b-2xl">
            <div className="flex items-center justify-between text-xl font-bold">
              <span className="text-gray-700">Total:</span>
              <span className="text-blue-600 text-2xl">${total.toFixed(2)}</span>
            </div>
            <div className="flex gap-3">
              <button 
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 active:scale-95 transition-all"
                onClick={onClose}
              >
                Continue Shopping
              </button>
              <button 
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 active:scale-95 transition-all shadow-lg"
                onClick={onCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}