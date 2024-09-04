import banner from '../../Assets/Frame.png'

const Banner = () => {
  return (
    <div className="flex justify-center w-full mb-3 px-2">
  <div className="w-full max-w-7xl bg-white relative rounded-xl overflow-hidden">
    <img
      src={banner}
      alt="Banner"
      className="lg:w-full h-48 sm:h-64 md:h-[270px] object-cover"
    />
  </div>
</div>

  );
};

export default Banner;