import LazyNavbarContainer from "./LazyNavbarContainer";
import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <nav className="lg:px-0 py-4 px-4 border-b border-[var(--border)]">
      <div className=" md:max-w-2xl lg:max-w-3xl xl:max-w-6xl xl:px-6 mx-auto flex justify-between items-center font-medium relative">
        <h2 className="text-xl md:text-2xl font-semibold">Example</h2>

        <ul className="hidden md:flex items-center gap-8 font-normal text-title-text/80">
          <NavItems />
        </ul>

        <LazyNavbarContainer />
      </div>
    </nav>
  );
};

export default Navbar;
