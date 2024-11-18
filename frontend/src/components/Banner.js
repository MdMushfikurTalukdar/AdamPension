import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div>
      <div
        className="bg-cover bg-center h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px]"
        style={{
          backgroundImage: `url('https://i.ibb.co.com/423pxtz/IMG-20241112-WA0013.jpg')`,
        }}
      >
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-white md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
            Willkommen in Adam's Pension
            </h1>
            <p className="mt-2 text-base text-white md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl">
            Buchen Sie hier Ihren Aufenthalt
            </p>

            <div className="mt-4">
              <Link to="/room-book">
                <button className="px-6 py-3 text-white bg-red-500 rounded-md hover:bg-red-600">
                Jetzt buchen
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
