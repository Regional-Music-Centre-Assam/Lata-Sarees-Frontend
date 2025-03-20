import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, CheckCircle, Clock, XCircle, Download } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Invoice } from './Invoice'; // Import the Invoice component

// Mock order data (replace with API data later)
const mockOrders = [
    {
      id: 1,
      date: '2023-10-15',
      products: [
        {
          id: 1,
          name: 'Cotton Embroidery Fabric',
          image: 'https://saroj.in/cdn/shop/files/WhatsAppImage2025-02-20at17.02.22_370c320d.jpg',
          quantity: 2,
          price: '₹1,999',
        },
        {
          id: 2,
          name: 'Silk Printed Fabric',
          image: 'https://saroj.in/cdn/shop/files/WhatsAppImage2024-04-19at7.49.57PM_f16b0018-d64e-447b-a413-f38cbc3cde60.jpg',
          quantity: 1,
          price: '₹1,499',
        },
      ],
      total: '₹3,498',
      status: 'Delivered',
    },
    {
      id: 2,
      date: '2023-10-10',
      products: [
        {
          id: 3,
          name: 'Linen Blend Fabric',
          image: 'https://saroj.in/cdn/shop/files/rn-image_picker_lib_temp_12f57afc-5bf3-4797-927e-efbd9250fdca.jpg',
          quantity: 3,
          price: '₹2,999',
        },
      ],
      total: '₹8,997',
      status: 'Processing',
    },
    {
      id: 3,
      date: '2023-10-05',
      products: [
        {
          id: 4,
          name: 'Leather Handbag',
          image: 'https://saroj.in/cdn/shop/files/WhatsAppImage2025-02-20at17.21.20_5429d655.jpg',
          quantity: 1,
          price: '₹2,500',
        },
      ],
      total: '₹2,500',
      status: 'Cancelled',
    },
  ];

export function MyOrders() {
  const [orders, setOrders] = useState([]); // State to store orders
  const [loading, setLoading] = useState(true); // Loading state

  // Simulate fetching orders (replace with API call later)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Replace with actual API call
        const data = mockOrders;
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading orders...</div>;
  }

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">You have no orders yet.</p>
            <Link
              to="/"
              className="mt-4 inline-block bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {order.status === 'Delivered' && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {order.status === 'Processing' && (
                      <Clock className="h-5 w-5 text-yellow-600" />
                    )}
                    {order.status === 'Cancelled' && (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <p className="text-sm font-medium">{order.status}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  {order.products.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">
                          {product.quantity} x {product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center border-t pt-4">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-lg font-semibold">{order.total}</p>
                </div>

                {/* Download Invoice Button */}
                <div className="mt-4">
                  <PDFDownloadLink
                    document={<Invoice order={order} />}
                    fileName={`invoice_${order.id}.pdf`}
                  >
                    {({ loading }) =>
                      loading ? (
                        'Loading invoice...'
                      ) : (
                        <button className="flex items-center gap-2 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors">
                          <Download className="h-5 w-5" />
                          <span>Download Invoice</span>
                        </button>
                      )
                    }
                  </PDFDownloadLink>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}