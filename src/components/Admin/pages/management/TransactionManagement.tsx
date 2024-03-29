import AdminSidebar from "../../components/AdminSidebar";
import { OrderItemType, OrderType } from "../../../../types/api_types";
import { Link } from "react-router-dom";
import img from "../../../../assets/images/slide-2.png";
import { useState } from "react";

const orderItems: OrderItemType[] = [
  {
    name: "Puma Shoes",
    photo: img,
    _id: "asdsaasdas",
    quantity: 4,
    price: 2000,
  },
];

const TransactionManagement = () => {
  const [order, setOrder] = useState<OrderType>({
    name: "Abhishek Singh",
    address: "77 Black Street",
    city: "Neyword",
    state: "Nevada",
    country: "India",
    pinCode: 2434341,
    status: "Processing",
    subtotal: 4000,
    discount: 1200,
    shippingCharges: 0,
    tax: 200,
    total: 4000 + 200 + 0 - 1200,
    orderItems,
    _id: "asdnasjdhbn",
  });

  const {
    name,
    address,
    city,
    country,
    state,
    pinCode,
    subtotal,
    shippingCharges,
    tax,
    discount,
    total,
    status,
  } = order;

  const updateHander = () => {
    setOrder((prev) => ({
      ...prev,
      status: prev.status === "Processing" ? "Shipped" : "Delivered",
    }));
  };

  return (
    <div>
      <AdminSidebar>
        <main className="flex flex-col justify-center items-center w-full">
          <section className="bg-white shadow-md py-8 sm:px-10 px-2 my-10 max-w-5xl ">
            <h2 className="mb-4 font-medium">Order Items</h2>
            {order.orderItems.map((i: any) => (
              <ProductCard
                name={i.name}
                photo={i.photo}
                _id={i._id}
                quantity={i.quantity}
                price={i.price}
              />
            ))}
            <article className="flex flex-col items-start gap-3 text-sm">
              <h2 className="mt-8 font-medium">Order Info</h2>
              <h5 className="font-medium">User Info</h5>
              <p>Name: {name}</p>
              <p>
                Address:{" "}
                {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
              </p>

              <h5 className="font-medium mt-4">Amount Info</h5>
              <p>Subtotal: {subtotal}</p>
              <p>Shipping Charges: {shippingCharges}</p>
              <p>Tax: {tax}</p>
              <p>Discount: {discount}</p>
              <p>Total: {total}</p>

              <h5 className="font-medium mt-4">Status Info</h5>
              <p>
                Status:{" "}
                <span
                  className={
                    status === "Delivered"
                      ? "text-purple-700 font-semibold"
                      : status === "Shipped"
                      ? "text-green-700 font-semibold"
                      : "text-red-700 font-semibold"
                  }
                >
                  {status}
                </span>
              </p>

              <button onClick={updateHander} className="px-8 py-2 rounded-md border-[1px] border-slate-600 hover:bg-slate-50 font-medium">Process Status</button>
            </article>
          </section>
        </main>
      </AdminSidebar>
    </div>
  );
};

const ProductCard = ({ name, photo, price, quantity, _id }: OrderItemType) => (
  <div className="flex items-center justify-between text-sm w-full">
    <img src={photo} alt={name} className="w-20" />
    <Link to={`/product/${_id}`}>{name}</Link>
    <span>
    ₹{price} X {quantity} = ₹{price * quantity}
    </span>
  </div>
);

export default TransactionManagement;
