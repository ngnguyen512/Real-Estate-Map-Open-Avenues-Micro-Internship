'use client'
import Image from "next/image";
import MapBox from "@/components/map/map";
import Sidebar from "@/components/Sidebar";
import { ApolloWrapper } from "@/data/apollo";

function App() {
  return (
    <ApolloWrapper>
    <div className='main-container'>
      <div className="sidebar-container">
        <Sidebar/>
      </div>
      <div className="map"> <MapBox/></div>
    </div>
    </ApolloWrapper>
  );
}
export default App;
