import { Outlet, useNavigation } from "react-router-dom";
import { Header, Loading, NavBar } from "../components";

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  return (
    <>
      <Header />
      <NavBar />
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-20">
          {/* 'Outlet' m jo layout har page m common hga vo rhta hai */}
          <Outlet />
        </section>
      )}
    </>
  );
};

export default HomeLayout;
