import { useEffect, useState } from "react"
import axios from "axios";

// Custom Hooks
const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    console.log(url)
    useEffect(()=>{
        const fetchData = async ()=>{
            setLoading(true);
            try{               
                const res = await axios.get(url);
                setData(res.data);
            }catch(error){
                setError(error);
            }
            setLoading(false);
        };
        fetchData();
    },[url])  


    const reFetch = async ()=>{
        setLoading(true);
        try{               
            const res = await axios.get(url);
            setData(res.data);
        }catch(error){
            setError(error);
        }
        setLoading(false);
    };
    console.log(data);
    return {data,loading,error,reFetch};
}

export default useFetch;

