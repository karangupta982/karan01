// import './ProductCard.css';

// /**
//  * ProductCard Component
//  * Displays a single product with image, details, and add to cart button
//  */

// export default function ProductCard({ product, onAddToCart }) {
//   return (
//     <div className="product-card">
//       {/* Product Image */}
//       <img
//         src={product.image}
//         alt={product.name}
//         className="product-image"
//       />

//       {/* Product Information */}
//       <div className="product-info">
//         {/* Product Name */}
//         <h3 className="product-name">{product.name}</h3>

//         {/* Product Description */}
//         <p className="product-description">{product.description}</p>

//         {/* Product Price */}
//         <div className="product-footer">
//           <span className="product-price">
//             ${product.price.toFixed(2)}
//           </span>

//           {/* Add to Cart Button */}
//           <button
//             className="btn-add-to-cart"
//             onClick={() => onAddToCart(product)}
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }











export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 h-10">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
          <button
            className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 active:scale-95 transition-all shadow-md"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}