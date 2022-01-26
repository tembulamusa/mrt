import React, {useEffect} from 'react';
import useAxios from "../../hooks/axios.hook";
import { 
    getFromLocalStorage, 
    setLocalStorage 
} from '../utils/local-storage';

const useCategories = (props) => {

    const {response, makeRequest} = useAxios();

    const getCategories = () => {
        let categories = getFromLocalStorage('categories');
        console.log("Getting form localstorage has ", categories);
        if(categories) {
           return categories;
        }

        let endpoint = "/v1/categories";     
        
        makeRequest({url:endpoint, method:"get", data:null }).then((response) => {
            let {status, result} = response;                     
            if(status = 200) {
                setLocalStorage('categories', result, 5*60*1000);
                return result;
            } else {
                return [];
            }
        });                                                                     
    }
    return getCategories;                                                                            
}

export default useCategories;
