const Footer = () => {
  return (
    <footer>
      <div className="mb-2 border-b border-[var(--border)] py-16">
        <div className="flex flex-col md:flex-row justify-between gap-2 md:max-w-2xl lg:max-w-3xl xl:max-w-6xl xl:px-6 mx-auto px-6 gap-y-10">
          <section className="max-w-80 lg:max-w-[419px]">
            <h2 className="mb-6 text-xl md:text-2xl font-semibold">Example</h2>
            <p className="text-sm ">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry{"'"}s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book.
            </p>
          </section>

          <section className="">
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="text-sm  space-y-2">
              <li className="">Home</li>
              <li className="">About us</li>
              <li className="">Contact us</li>
              <li className="">Privacy policy</li>
            </ul>
          </section>

          <section className="">
            <h3 className="font-medium mb-4">Get in touch</h3>
            <ul className="text-sm ">
              <li className="">+1-234-567-890</li>
              <li className="">ontact@greatstack.dev</li>
            </ul>
          </section>
        </div>
      </div>

      <p className="text-center text-xs py-3">
        Copyright 2025 © GreatStack.dev All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
