
import bannerImg from "../Assets/banner/bannerImg.webp"
const MobileBanner = () => {
  return (
    <div className="flex justify-center  h-48 mb-3 mx-2 pr-1/2">
  <div className="w-full max-w-7xl bg-white relative rounded-lg overflow-hidden">
    <img
      src={bannerImg}
      alt="Banner"
      className="object-cover "
    />
    
  </div>
</div>

  );
};

export default MobileBanner;