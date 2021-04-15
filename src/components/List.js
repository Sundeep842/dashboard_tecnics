import React from 'react'
import { useParams,useLocation } from 'react-router-dom';

function List({route}) {
    const location = useLocation();

    return (
        <div>
             <div>
             {location.state.id}
           
           </div>
           
        </div>
    )
}

export default List
