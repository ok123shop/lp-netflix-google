import Footer from "./Footer";
export default function Body({children}) {
  return (
    <div className="w-full h-full overflow-hidden overflow-y-auto pt-16">
      <div className="mb-40">
        {children}
      </div>
      <div className="mb-40">
      </div>

      <div className="bg-base-200 bg-opacity-80" >
        <div className="container mx-auto flex flex-col">
          <Footer/>
        </div>
      </div>

      
    </div>
  );
}
