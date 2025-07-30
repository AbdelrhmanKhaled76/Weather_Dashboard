const Footer = () => {
  return (
    <footer className="container border-t border-black/10 grid grid-cols-3 p-5">
      <div className="flex flex-col items-center">
        <span className="font-bold text-2xl">4</span>
        <p className="text-md capitalize text-black/60">cities tracked</p>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-bold text-2xl">
          22<sup>o</sup>c
        </span>
        <p className="text-md capitalize text-black/60">Average Temperature</p>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-bold text-2xl">
          {new Date().toLocaleDateString()}
        </span>
        <p className="text-md capitalize text-black/60">last updated</p>
      </div>
    </footer>
  );
};

export default Footer;
