
import { NeoGraph } from "./NeoVisTool";
import { useEffect,useState } from "react";
import axios from "axios";


function App() {
  const [KGInfo,setKGInfo] = useState({status:"OK",labels:[],relations:[]})
  useEffect(()=>{
    const getInfo=async()=>{
      
        let res=await axios.get("/graphBackend/LoginNeo4j");
        let tmp = res.data;
        await setKGInfo({...tmp,labels:tmp.labels,relations:tmp.relations});
        
        // console.log(KGInfo);
    }
    getInfo()
},[])
  // console.log(KGInfo)
  return (
    <div className="App">
     <NeoGraph
      neo4jUrl="bolt://localhost:7687"
      neo4jAccount="neo4j"
      neo4jPassword="123456"
      labels = {KGInfo.labels}
      relationships = {KGInfo.relations}
      cypher="MATCH(N)-[R]-(M) RETURN * LIMIT 50"
     />
     {/* <h1>{KGInfo.labels}</h1> */}
    </div>
  );
}

export default App;
