import {useCallback, useEffect, useState} from "react";

const Test = ()=>{
    const [search, setSearch] = useState('')

    const handleChange = useCallback((e) => {
        setSearch(e.target.value)
    }, []) // no need for 'search' in the dependency array

    useEffect(()=> {
        const getResponse = async () => {
            try {
                // actual api request goes here
            } catch(e) {
                console.error(e.response);
            }
        }
        getResponse();
    }, [search])

    return <div>
        <input type='text' value={search} onChange={handleChange}/>
        <div>{search}</div>
    </div>
}

export default Test;