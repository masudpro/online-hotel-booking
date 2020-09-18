import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import placeData from '../place';
import { useForm } from "react-hook-form";


const PlaceDetails = () => {

   
        const {placedetail} = useParams();
        const placeInfo = placeData.find( pd => pd.placeId === placedetail);
        const history = useHistory()
         const [form, setForm] = useState('')

      
        const handleAdd = () => {

            

            form && history.push("/roomdetails/"+placeInfo.place)
        }
        console.log(placeInfo)

//   const {placedetail} = useParams();
   // const placeInfo = placeData.find( pd => pd.placeId === placedetail);
   // console.log(placeInfo)
// const { register, handleSubmit, watch, errors } = useForm();
//             const onSubmit = data => console.log(data);

   


    return (
         <div className="placeDetails container-fluid">
            
            <div className="row topPadding p-3">
                <div className="col-md-6 col-xl-7 ">
                    <div className="placeDescription align-self-center  p-lg-5 col-xl-10 ">
                        <div className="px-md-3">
                                <h1 >{placeInfo.placeName}  </h1>
                                <p className="pt-3 pb-4">{placeInfo.placeDescription}</p>
                        </div>
                        
                    </div>
                </div>

                <div className="col-md-6 col-xl-5 align-content-center place-section  ">
                <div className="p-lg-5  pb-5">
                    <form className="bookingForm  p-4 py-5" >

                 
                        <label className="pb-1">Origin</label>

                        <select className="formInput mb-3" name="selectPlace" >
                            <option >DHAKA</option>
                            <option >RAJSHHI</option>
                            <option >BOGURA</option>
                            <option >PABNA</option>
                            <option >SIRAJGANJ</option>
                            <option >RANGPUR</option>
                            <option >MYMENSIGN</option>
                        </select>

                        <label className="pb-1">Destination</label>   
                        <input className="formInput mb-3" value={placeInfo.placeName}  type="text" name="masud"  disabled />
                        
                        <div className="calender mb-3 row">
                            <div className="datefrom col-6 pr-2" >
                                <label className="pb-1">From</label>  
                                <br/> 
                                <input className="formInput" onChange={(e)=> setForm(e.target.value)} required type="date" />
                               
                            </div>
                            
                            <div className="datefrom col-6 pl-2" >
                                <label className="pb-1">To</label>     
                                <input className="formInput" type="date" />
                            </div>
                        </div>

                        <button type="submit" onClick={handleAdd}  >  Start Booking </button>
                    </form>
                </div>

               
                    <Link to={"/roomdetails/"+placeInfo.place}>Room Details</Link>
                   
                </div>
            </div>
        </div>
    );
};

export default PlaceDetails;