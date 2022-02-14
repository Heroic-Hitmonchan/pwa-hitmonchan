import './aboutus.css'
import React from 'react';
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"

const Aboutus = () => {


    return (
        <motion.div className='aboutus-div'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
        >
            <div className='logo-div'>
                <Link to="/home" className="player-home-link" >
                    <img src="/logo.png" className="player-home-link-logo" />
                </Link>
            </div>

            <div className='team-div'>
                <p className='Meet-Our-Team-Members'>
                    Meet Our Team Members
                </p>
                <div className='members-div'>
                    <p>Kishn Parbadia</p>
                    <a href='https://github.com/kishnparbadia1' target="_blank">
                        <img src='/PikPng.com_black-spade-png_3846649.png' className='click-icons' />
                    </a>
                    <a href='https://www.linkedin.com/in/kishn-parbadia/' target="_blank">
                        <img src='/PikPng.com_linkedin-icon-png_1026392.png' className='click-icons' />
                    </a>


                </div >
                <div className='members-div'>
                    <p>Jinyoung Kim</p>
                    <a href='https://github.com/jinyk226' target="_blank">
                        <img src='/PikPng.com_black-spade-png_3846649.png' className='click-icons' />
                    </a>
                    <a href='https://www.linkedin.com/in/jinyk226/' target="_blank">
                        <img src='/PikPng.com_linkedin-icon-png_1026392.png' className='click-icons' />
                    </a>

                </div>
                <div className='members-div'>
                    <p>Brendon A Sylvestre</p>
                    <a href='https://github.com/Sbrendon98' target="_blank">
                        <img src='/PikPng.com_black-spade-png_3846649.png' className='click-icons' />
                    </a>
                    <a href='https://www.linkedin.com/in/brendon-ashton-sylvestre/' target="_blank">
                        <img src='/PikPng.com_linkedin-icon-png_1026392.png' className='click-icons' />
                    </a>

                </div>
                <div className='members-div'>
                    <p>Rafet Abdalgalil</p>
                    <a href='https://github.com/RafetAbd' target="_blank">
                        <img src='/PikPng.com_black-spade-png_3846649.png' className='click-icons' />
                    </a>
                    <a href='https://www.linkedin.com/in/rafet-abdalgalil-46606a1a1/' target="_blank">
                        <img src='/PikPng.com_linkedin-icon-png_1026392.png' className='click-icons' />
                    </a>


                </div>
            </div>
        </motion.div>

    )
}

export default Aboutus
