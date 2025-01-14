import React, { useContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import { albumsDataca4, assets, songsData ,initializeSongsData} from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

import Apiplaylist from "../Api/Apiplaylist";

const DisplayAlbum = () => {

    const { id } = useParams();
    const selectedAlbum = albumsDataca4.find(album => album.id === id);

    const { playWithId } = useContext(PlayerContext)
    const [dataitem,setDataitem]=useState([])
    useEffect(()=>{
        const fetchDataitem = async () => {
            try {
              const response = await Apiplaylist.apigetallsonginplaylist(id);
              setDataitem(response.data.result);
              
            } catch (err) {}
          };
          fetchDataitem()
          console.log("albumdata", selectedAlbum);
    },[])
    const setupsong=(index)=>{
        initializeSongsData(dataitem)
        console.log("song data là:",songsData)
        playWithId(index)
    }

    return (
        <>
            <NavBar />
            
            
            <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
                <img className="w-48 rounded "src={selectedAlbum.image}  alt="" />
                <div className=" flex flex-col">
                    <p>Playlist</p>
                    <h2 className="text-5xl font-bold mb-4 md:text-7xl">{selectedAlbum.name}</h2>
                    <h4>{selectedAlbum.desc}</h4>
                    <p className="mt-1">
                        <img className="inline-block " src={assets.spotify_logo} alt="" /> 
                         <b>Spotify</b>
                        .1,323,154 likes
                        .<b>{dataitem.length} songs</b> about 2 hr 30 min
                    </p>
                </div>
            </div> 
            <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
                <p><b className="mr-4">#</b>Title</p>
                <p>Album</p>
                <p className="hidden sm:block ">Date Added</p>
                <img className="m-auto w-4 " src={assets.clock_icon} alt="" />
            </div>
            <hr />
            {
                dataitem.map((item, index) => (
                    <div onClick={()=>{setupsong(index)}} key={index} className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer">
                        {/* <p className="text-white">
                            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                            <img className="inline w-10 mr-5 " src={item.image} alt="" />
                            {item.name}
                        </p>
                        <p className="text-[15px]">{ }albumData.name</p>
                        <p className="text-[15px] hidden sm:block ">5 days ago</p>
                        <p className="text-[15px] text-center ">{item.duration}</p> */}
                        <p className="text-white">
                            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                            <img className="inline w-10 mr-5 " src={item.image}  alt="" />
                            {item.name}
                        </p>
                        <p className="text-[15px]">{ selectedAlbum.name}</p>
                        <p className="text-[15px] hidden sm:block ">5 days ago</p>
                        <p className="text-[15px] text-center ">5.00</p>
                    </div>
                ))
            }
        </>
    )
}

export default DisplayAlbum