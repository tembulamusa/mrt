import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
// import {FaFacebook, FaInstagram, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons"
import { Link } from 'react-router-dom';
import { RiFacebookBoxLine } from "react-icons/ri";
import Logo from '../../assets/img/logo.png';
import Storage from '../../assets/img/posts/storage.jpg';
import PostConstruction from '../../assets/img/posts/construction.jpg';
import Tips from '../../assets/img/posts/tips.jpg';
import { CiMail } from "react-icons/ci";
import { FaPhoneAlt, FaFacebook, FaHome, FaWhatsapp, FaMapMarkerAlt, FaTwitter, FaInstagram, FaPinterest } from "react-icons/fa";
import { MdEmail } from "react-icons/md";





const Footer = (props) => {

    return (
        <section className="mt-4">
            <section className='bg-dark-2 py-6 border-b border-gray-700' id='site-sumary'>
                <div className='container my-4 block text-center md:text-left md:flex flex-row'>
                    <div className='single-footer-widget w-full md:w-3/12 flex-col pr-3 md:text-left border-b border-gray-300 mb-3 md:border-none md'>
                        {/* <img src={Logo} className='w-60'/> */}
                        <h4 className='capitalize !font-medium'>MART Systems</h4>
                        <div className='my-3'>
                            Experience the delight of having a great system to the best of standards, all without breaking a sweat!
                            <div className="block py-2 std-block">
                                <div className="mb-2">
                                    <FaHome size={20} className="inline-block primary-text-color mr-2"/> Milestone Building,B3 –Ridgeways, Kiambu Road, Nairobi
                                </div>
                                <div className="mb-2">
                                    <FaPhoneAlt size={20} className="inline-block primary-text-color mr-2"/> 254722833402
                                </div>
                                <div className="mb-2">
                                    <MdEmail size={20} className="inline-block primary-text-color mr-2"/> info@pastoralistfoundation.org
                                </div>
                            </div>
                            <div className='mt-2'><a href='martsystems.com'>Follow us</a></div>
                        </div>

                    </div>
                    <div className='single-footer-widget w-full md:w-2/12 flex-col px-2 text-left border- border-gray-300 mb-3'>
                        <h4 className='capitalize !font-medium'>Useful links</h4>
                        <ul className='list-disc leading-8 font-bol'>
                            <li className='leading-5 mb-3'><Link to={"/web-design"} >Web design</Link></li>
                            <li className='leading-5 mb-3'><Link to={"/web-design"} >System Development</Link></li>
                            <li className='leading-5 mb-3'><Link to={"/web-design"} >Deployment</Link></li>
                            <li className='leading-5 mb-3'><Link to={"/web-design"} >CMS</Link></li>
                            <li className='leading-5 mb-3'><Link to={"/web-design"} >Corporate </Link></li>
                            <li className='leading-5 mb-3'><Link to={"/web-design"} >SME </Link></li>
                        </ul>
                    </div>
                    <div className='single-footer-widget w-full text-left md:w-4/12 flex-col px-2 border- border-gray-300 mb-3'>
                        <h4 className='capitalize !font-medium'>recent posts</h4>
                        <ul className='dis leading-8 font-bol'>
                            <li className='leading-5 mb-2 flex'>
                                <Link to={"/posts/"}>
                                    <img src={Storage} className='w-20 mr-3 inline-block'/>
                                    <div className='inline-block w-70'>
                                        
                                        <div>mart system the #1 Software developers in the region</div>
                                        <span></span>
                                    </div>
                                </Link>
                            </li>
                            <li className='leading-5 mb-2 flex'>
                                <img src={PostConstruction} className='w-20 mr-3 inline-block'/>
                                <div className='inline-block w-70'>
                                    <div>Getting the most perfect ERP solution</div>
                                    <span></span>
                                </div>
                            </li>
                            <li className='leading-5 mb-2 flex'>
                                <img src={Tips} className='w-20 mr-3 inline-block'/>
                                <div className='inline-block w-70'>
                                    <div>New Tips to Make System ownership easier with MARTsystems</div>
                                    <span></span>
                                </div>
                            </li>
                            <li className='leading-5 mb-2 flex'>
                                <img src={Tips} className='w-20 mr-3 inline-block'/>
                                <div className='inline-block w-70'>
                                    <div>Top Language or top knowledge?! Get it from MARTsystems</div>
                                    <span></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='single-footer-widget w-full text-left md:w-3/12 flex-col px-2'>
                        <h4 className='capitalize !font-medium'>MART Note</h4>
                        <div className='mt-3'>
                            At mart, we create great solutions with lasting impact to our clients and the society.<span className='mt-3 block'>Mart; making the society better through top notch technology. We value automation and that's what we do best.</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-black text-gray-400'>
            <div className="container text-left py-3">
                <div className="inline-block uppercase w-full md:w-1/3">
                    
                    <Link to={"/"} className='mr-3 opacity-70 hover:opacity-100'>Home</Link>
                    <Link to={"/contact-us"} className='mr-3 opacity-70 hover:opacity-100'>Contact Us</Link>
                    <Link to={"/about"} className='mr-3 opacity-70 hover:opacity-100'>About</Link>
                    <Link to={"/services"} className='mr-3 opacity-70 hover:opacity-100'>Services</Link>
                </div>

                <div className="inline-block w-full pt-2 md:w-1/3 text-center">
                    <Link to={"https://www.instagram.com/mrt?igsh=YzljYTk1ODg3Zg=="} target='_blank' className='mr-2 opacity-70 hover:opacity-100 ' ><FaInstagram className='inline-block' size={30}/></Link>
                    <Link to={"https://www.facebook.com/profile.php?id=100094662474097"} target="_blank" rel="noopener noreferrer" className='mr-2 opacity-70 hover:opacity-100 '><RiFacebookBoxLine className='inline-block' size={30}/></Link>
                    <Link to={"/#"} className='mr-2 opacity-70 hover:opacity-100'><FaTwitter className='inline-block' size={30}/></Link>
                </div>

                <div className="pt-2 inline-block w-full md:w-1/3 opacity-80">
                    &copy;2020 martsystems.com <span className='opacity-60'>MART Systems Site</span>
                </div>
                
                <a className='fixed bottom-5 left-3 bg-green-500 text-white p-1 px-3 rounded-3xl text-xl' href={ `https://wa.me/254717506069?text=Hello%mrt.%20I%20would%20like%you%20to%20help.` } target="_blank">
                    <FaWhatsapp size={25} className='mr-3 inline-block' />
                    chat Now
                </a>
            </div>
            </section>
        </section>
    )
}

export default Footer
