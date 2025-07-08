import React from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import Contact from '../Contact/Contact'
import Footer from '../Footer/Footer'
import Features from '../Features/Features'
import Cta from '../Cta/Cta'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'

function Home() {
    return (
        <>
            <Header />
            <Features />
            <FeaturedProducts />
            <Cta />
            {/* <Contact /> */}
        </>
    )
}

export default Home
