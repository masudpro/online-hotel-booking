import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import placeData from '../place';

import rattingImage from '../Images/star_1_.png'

const RoomDetails = () => {

    
    

    const {roomdetail} = useParams();
    const [room, setRoom] = useState([]);
    const [findMap, setFindMap] = useState([]);
    
    useEffect(()=> {
         const findRoom = placeData.filter( pd => pd.place === roomdetail);
         setRoom(findRoom.slice(0, 4))
    }, []);

    useEffect(()=> {
        const map = placeData.filter( pd => pd.place === roomdetail);
        setFindMap(map.slice(4, 5))
   }, []);
   

    
  
    

    return (
        <div className="mt-5 pt-5 roomDetails container-fluid ">
            <div className="row">
                <div key ={ room.name} className="col-sm-7" >
                {
                    room.map ( room => 
                        <div key ={ room.id} className="roomdetails row pl-3 pl-lg-5">
                            <div className="col-md-5 mb-4 pr-2">
                                <img className="img-fluid roomImage" src={room.image} alt=""/>
                            </div>

                            <div className="col-md-7 mb-4 pl-3">
                                <h1> {room.name}</h1>
                                <div className="roominfo"> <span> {room.guests}</span> guests <span> {room.bedrooms}</span> beedrooms  <span> {room.bed}</span> beeds  <span> {room.bathrooms}</span> baths</div>
                                <p> {room.description}</p>
                                <div className="roominfo"> <img className="starLogo" src={rattingImage} alt=""/> <span> {room.ratting}({room.rattingNumber})</span> <div className="roomCost">{room.cost}</div>/night </div>
                            </div>
                        
                        
                    </div>
                    )
                } 
                </div>

                <div  className="col-sm-5" >
                        {
                            findMap.map ( findMap => 
                                <div key ={ findMap.placeName} className=" googlemap px-md-3 px-lg-5" >
                                        <iframe src={findMap.googleMap} ></iframe>
                    
                                    </div>
                                )
                        }
                </div>
                
            </div>
        </div>
    );
};

export default RoomDetails;