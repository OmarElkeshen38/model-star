import React from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import Contact from '../Contact/Contact'
import Footer from '../Footer/Footer'
import Features from '../Features/Features'
import Cta from '../Cta/Cta'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import ExclusiveOffers from '../ExclusiveOffers/ExclusiveOffers'
import PromoBanner from '../PromoBanner/PromoBanner'

function Home() {
    return (
        <>
            <Header />
            <CategoriesSlider />
            <Features />
            <FeaturedProducts />
            <PromoBanner />
            <ExclusiveOffers />
            <Cta />
        </>
    )
}

export default Home
