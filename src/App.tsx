import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";
import {
  Header,
  Footer,
  SideBar,
  VideoModal,
  ScrollToTop,
  Loader,
} from "./common";

//Dynamically import components. Ensures that only the components needed for current route are loaded
const Catalog = lazy(() => import("./pages/Catalog"));
const Home = lazy(() => import("./pages/Home"));
const Detail = lazy(() => import("./pages/Detail"));
const NotFound = lazy(() => import("./pages/NotFound"));

//The root component
const App = () => {
  return (
    <>
      <VideoModal />
      <SideBar />
      <Header />
      <main className="dark:bg-black bg-mainColor lg:pb-14 md:pb-4 sm:pb-2 xs:pb-1 pb-0">
        <ScrollToTop>
          {/*The Loader component is rendered as a fallback when any of the dynamically imported components are loading.*/}
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:category/:id" element={<Detail />} />
              <Route path="/:category" element={<Catalog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ScrollToTop>
      </main>
      <Footer />
    </>
  );
};

export default App;
