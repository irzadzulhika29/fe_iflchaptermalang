import { Links } from "../components/button";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-8 bg-slate-200 backdrop-blur-sm">
      <h1 className="font-bold text-7xl">404</h1>
      <p className="text-4xl italic font-semibold text-primary-1">Page not found</p>
      <Links to="/" intent="secondary" ariaLabel="home">
        Back to home
      </Links>
    </div>
  );
};

export default NotFoundPage;
