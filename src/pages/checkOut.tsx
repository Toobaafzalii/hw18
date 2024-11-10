import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../reducer/reducer";

const checkoutSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(10, "Address is required"),
  city: z.string().min(3, "City is required"),
  code: z.string().min(5, "Postal Code is required"),
  phoneNumber: z.string().regex(/^09\d{9,}$/, "Phone Number is not valid"),
});

type IFormValues = z.infer<typeof checkoutSchema>;

const CheckOut: React.FC = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<IFormValues | null>(null);
  const cartItems = useSelector((state: IRootState) => state.cart.cartItems);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
  });

  // const name = watch("name");
  // const email = watch("email");
  // const address = watch("address");
  // const city = watch("city");
  // const code = watch("code");
  const phoneNumber = watch("phoneNumber");

  const onSubmit = (data: IFormValues) => {
    setFormData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData(null);
    dispatch(clearCart());
  };
  return (
    <>
      <div className="sticky top-0 w-full inline-flex justify-between items-center gap-10 bg-slate-700 py-7 px-10">
        <h1 className="text-gray-200 text-3xl font-bold text-nowrap">
          CHECKOUT FORM
        </h1>
      </div>
      <div className="container mx-auto p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-xl font-medium mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-600 text-md mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-xl font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-600 text-md mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="address" className="text-xl font-medium mb-2">
              Address:
            </label>
            <input
              type="text"
              id="address"
              {...register("address")}
              className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.address && (
              <p className="text-red-600 text-md mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="city" className="text-xl font-medium mb-2">
              City:
            </label>
            <input
              type="text"
              id="city"
              {...register("city")}
              className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.city && (
              <p className="text-red-600 text-md mt-1">{errors.city.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="code" className="text-xl font-medium mb-2">
              Postal Code:
            </label>
            <input
              type="number"
              id="code"
              {...register("code")}
              className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                errors.code ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.code && (
              <p className="text-red-600 text-md mt-1">{errors.code.message}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="text-xl font-medium mb-2">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              {...register("phoneNumber")}
              className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phoneNumber ? (
              <p className="text-red-600 text-md mt-1">
                {errors.phoneNumber.message}
              </p>
            ) : (
              phoneNumber &&
              !/^09\d{9,}$/.test(phoneNumber) && (
                <p className="text-yellow-600 text-md mt-1">
                  Phone Number is not valid
                </p>
              )
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`font-bold py-2 px-4 rounded mt-4 ${
              isValid
                ? "bg-blue-500 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </form>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">YOUR INFORMATION</h2>
            <div className="text-gray-700 space-y-2">
              <p>
                <strong className="text-lg">Name:</strong> {formData?.name}
              </p>
              <p>
                <strong className="text-lg">Email:</strong> {formData?.email}
              </p>
              <p>
                <strong className="text-lg">Address:</strong>{" "}
                {formData?.address}
              </p>
              <p>
                <strong className="text-lg">City:</strong> {formData?.city}
              </p>
              <p>
                <strong className="text-lg">Postal Code:</strong>{" "}
                {formData?.code}
              </p>
              <p>
                <strong className="text-lg">Phone Number:</strong>{" "}
                {formData?.phoneNumber}
              </p>
            </div>
            {cartItems.map((item: ICartProduct) => {
              return (
                <div className="bg-white rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center mb-1 p-2">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-lg mr-4">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex flex-col">
                      <h2 className="text-lg font-bold mb-2 text-center">
                        {item.title}
                      </h2>
                    </div>
                    <div className="flex flex-col items-end sm:items-start">
                      <p className="text-lg font-bold text-gray-700">
                        ${item.quantity}
                      </p>
                      <p className="text-lg font-bold text-gray-700">
                        {`$${item.quantity * item.price}`}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <Link to={"/"}>
              <button
                onClick={closeModal}
                className="mt-6 bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
              >
                Return to Home
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckOut;
