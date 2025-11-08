import React from 'react';
import Category from '../../Category/Category';
import DiscountProducts from '../../DiscountPage/DiscountProducts';
import SliderSection from '../../Components/Home/SliderSection';
import FAQ from '../../Components/Home/ExtraSection/FAQ';
import Team from '../../Components/Home/ExtraSection/Team';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <div className="bg-white">
      <Helmet>
        <title>CareNest Pharmacy | Home</title>
      </Helmet>

      {/* Hero Slider Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white">
        <SliderSection />
      </div>

      {/* Medicine Categories */}
      <section className="py-12 bg-gradient-to-b from-white to-blue-100">
        
        <Category />
      </section>

      {/* Discount Products */}
      <section className="py-12 bg-gradient-to-b from-blue-100 to-white glass">
       
        <DiscountProducts />
      </section>

      {/* Team Section */}
      <section className="py-12 bg-white">
    
        <Team />
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
      
        <FAQ />
      </section>
    </div>
  );
};

export default Home;
