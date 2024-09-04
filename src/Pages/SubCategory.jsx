
import Navbar from '../Components/Headers/Navbar'
import SubCategoryPage from '../Components/Event/SubCategoryPage';
import Category from '../Components/Headers/Category'

const SubCategory = () => {
  console.log("entered")
  return (
    <div>
        <div className="flex justify-center w-full lg:w-[80%] mx-auto">
        <Navbar />
      </div>
      <div className="flex justify-center w-full lg:w-[80%]  mx-auto">
        <Category />
      </div>
      <div className="flex justify-center w-full lg:w-[83%] mt-2  mx-auto">
        
        <SubCategoryPage/>
      </div>
        </div>
  )
}

export default SubCategory