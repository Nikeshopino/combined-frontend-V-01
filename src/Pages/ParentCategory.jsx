import Navbar from '../Components/Headers/Navbar'
import ParentCategoryPage from '../Components/Event/ParentCategoryPage'
import Category from '../Components/Headers/Category'

const ParentCategory = () => {
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
        <ParentCategoryPage />
      </div>
        </div>
  )
}

export default ParentCategory