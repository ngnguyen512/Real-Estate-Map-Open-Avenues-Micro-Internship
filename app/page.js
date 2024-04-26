'use client'
import Image from "next/image";
import MapBox from "@/components/map/map";
import Sidebar from "@/components/map/sidebar/Sidebar";
import { ApolloWrapper } from "@/data/apollo";
import { useState } from "react";
import Header from "@/components/Header";


function App() {
  const [parcelId, setParcelId] = useState('b212362412772c74601bda6c6a1478c9');

    const handleParcelClick = (id) => {
        setParcelId(id);
    }

  return (
    <ApolloWrapper>
      <div className="header-container">
          <Header onParcelIdChange={setParcelId}/>
        </div>
    <div className='main-container'>
        
      <div className="sidebar-container">
      <Sidebar parcelId ={parcelId}
      />
      </div>
      <div className="map"> <MapBox onParcelClick={handleParcelClick} parclebytype = {parcelId}/></div>
    </div>
    
    </ApolloWrapper>
  );
}
export default App;
