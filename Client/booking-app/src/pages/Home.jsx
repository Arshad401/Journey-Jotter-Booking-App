import Featured from "../components/Featured";
import FeaturedProperties from "../components/FeaturedProperties";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MailList from "../components/MailList";
import Navbar from "../components/Navbar";
import PropertyList from "../components/PropertyList";
import Coupon from "./Coupon";
import "./home.css";


function Home() {
  return (
    <div>
     <Navbar />
     <Header />
     <div className="homeContainer">
     <Featured />
     <h1 className="homeTitle">Browse by property type</h1>
     <PropertyList />
     <h1 className="homeTitle">Offers and Coupons</h1>
     <Coupon />
     <h1 className="homeTitle">Homes guests love</h1>
     <FeaturedProperties />
     <MailList />
  
     <Footer />
     </div>
    </div>
  )
}

export default Home
