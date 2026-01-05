import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../utils/mockData';
import ProductCard from '../components/ProductCard';
import CartIcon from '../components/CartIcon';
import CartModal from '../components/CartModal';
import './ProductsPage.css';

// /**
//  * ProductsPage Component
//  * Main shopping page with product listing and shopping cart functionality
//  */

// export default function ProductsPage() {
//   // Router hook for navigation
//   const navigate = useNavigate();

//   // Cart state: array of items with id, name, price, quantity, image
//   const [cart, setCart] = useState([]);

//   // Cart modal visibility state
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   /**
//    * Handle adding product to cart
//    * If product already in cart, increment quantity
//    * Otherwise, add product with quantity 1
//    */
//   const handleAddToCart = (product) => {
//     setCart((prevCart) => {
//       // Check if product already exists in cart
//       const existingItem = prevCart.find((item) => item.id === product.id);

//       if (existingItem) {
//         // Product exists, increase quantity
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         // Product doesn't exist, add with quantity 1
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });

//     console.log(`Added ${product.name} to cart`);
//   };

//   /**
//    * Handle removing item from cart
//    * Filters out the item by id
//    */
//   const handleRemoveItem = (productId) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
//   };

//   /**
//    * Toggle cart modal visibility
//    */
//   const toggleCart = () => {
//     setIsCartOpen(!isCartOpen);
//   };

//   /**
//    * Handle checkout process
//    * Closes cart modal and navigates to checkout page with cart data
//    */
//   const handleCheckout = () => {
//     setIsCartOpen(false);
    
//     // Calculate total amount
//     const totalAmount = cart.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );
    
//     // Navigate to checkout page with cart data in state
//     navigate('/checkout', {
//       state: {
//         items: cart,
//         totalAmount,
//       },
//     });
//   };

//   /**
//    * Calculate total number of items in cart
//    * Sums up quantities of all items
//    */
//   const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <div className="products-page">
//       {/* Cart Icon - Fixed position in top-right corner */}
//       <CartIcon itemCount={cartItemCount} onClick={toggleCart} />

//       {/* Page Title */}
//       <h1>Products</h1>

//       {/* Products Grid */}
//       <div className="products-grid">
//         {products.map((product) => (
//           <ProductCard
//             key={product.id}
//             product={product}
//             onAddToCart={handleAddToCart}
//           />
//         ))}
//       </div>

//       {/* Cart Modal */}
//       <CartModal
//         isOpen={isCartOpen}
//         onClose={toggleCart}
//         cartItems={cart}
//         onCheckout={handleCheckout}
//         onRemoveItem={handleRemoveItem}
//       />
//     </div>
//   );
// }







// import CartIcon from '../components/CartIcon';
// import ProductCard from '../components/ProductCard';
// import CartModal from '../components/CartModal'
export default function ProductsPage({ onNavigate }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    onNavigate('checkout', { items: cart, totalAmount });
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <CartIcon itemCount={cartItemCount} onClick={toggleCart} />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Our Products</h1>
          <p className="text-gray-600 text-lg">Discover our amazing collection</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>

      <CartModal
        isOpen={isCartOpen}
        onClose={toggleCart}
        cartItems={cart}
        onCheckout={handleCheckout}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}