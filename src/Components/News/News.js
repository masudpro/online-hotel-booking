import React, { useState } from 'react';
import placeData from '../place';
import './News.css'
import coximage from '../Images/Sajek.png'
import sreemongol from '../Images/Sreemongol.png'
import sundorbon from '../Images/sundorbon.png'
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import { Link } from 'react-router-dom';



const News = () => {
    const [place, setPlace] = useState(placeData);

    console.log('place', place);
    return (
       
        <div className="newsPage container-fluid">
            
            <div className="row align-items-center topPadding">
                <div className="col-lg-6  pl-md-3 order-2 order-lg-1">
                    <div className="placeDescription p-3 px-md-5 ml-lg-5 ">
                        <h1 > Cox's Bazar   </h1>
                        <p className="pt-3 pb-4">Cox’s Bazar is a town on the southeast coast of Bangladesh. It’s known for its very long, sandy beachfront, stretching from Sea Beach in the north to Kolatoli Beach in the south. Aggameda Khyang monastery is home to bronze statues and centuries-old Buddhist manuscripts. South of town, the tropical rainforest of Himchari National Park has waterfalls and many birds. North, sea turtles breed on nearby Sonadia Island.</p>
                        <Link className="bookingBtn" to={"/placedetails/placeCoxbazar"}>Booking</Link>
                    </div>
                </div>

                <div className="col-lg-6 order-1 order-lg-2">
                    <div className="row  place-section ">
                        <div className="col-sm-4 p-3">
                        <Link to={"/placedetails/placeCoxbazar"}>
                            <div className="place">
                                <img className="img-fluid" src={coximage} alt=""/>
                                <div className="placeName pl-2">
                                   Cox's Bazar
                                </div>
                            </div>
                        </Link>    
                        </div>
                        <div className="col-sm-4 p-3">
                        <Link to={"/placedetails/placeSreeMangal"}>
                            <div className="place ">
                                <img className="img-fluid" src={sreemongol} alt=""/>
                                <div className="placeName pl-2">
                                  sreemongol
                                </div>
                            </div>
                        </Link>  
                        </div>
                        <div className="col-sm-4 p-3">

                            <Link to={"/placedetails/placeSundarBans"}>
                                <div className="place">
                                    <img className="img-fluid" src={sundorbon} alt=""/>
                                    <div className="placeName pl-2">
                                    sundorbons
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    );
};

export default News;