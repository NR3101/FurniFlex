import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import { OrdersList, ComplexPagination, SectionTitle } from "../components";

const ordersQuery = (params, user) => {
  return {
    queryKey: [
      "orders",
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetch.get("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  };
};

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if (!user) {
      toast.warn("You must be logged in to see orders");
      return redirect("/login");
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const res = await queryClient.ensureQueryData(ordersQuery(params, user));
      return { orders: res.data.data, meta: res.data.meta };
    } catch (error) {
      const errorMsg =
        error?.response?.data?.error?.message ||
        "there was an error placing your order";
      toast.error(errorMsg);

      if (error?.response?.status === 401 || 403) return redirect("/login");
      return null;
    } 
  };

const Orders = () => {
  const { meta } = useLoaderData();

  if (meta.pagination.total < 1) {
    return <SectionTitle text="Please make an order" />;
  }

  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrdersList />
      <ComplexPagination />
    </>
  );
};

export default Orders;
