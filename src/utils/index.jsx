import axios from "axios";

const productionUrl = "https://strapi-store-server.onrender.com/api";

// ! axios cutsom instance
export const customFetch = axios.create({
  baseURL: productionUrl,
});

// ! func. to format price to a particular currency format
export const formatPrice = (price) => {
  const dollarsAmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));
  return dollarsAmt;
};

//! func. to generate options for a select input dynamically
export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};
