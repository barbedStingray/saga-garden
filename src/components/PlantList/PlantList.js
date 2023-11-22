import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();

    const reduxState = useSelector(store => store);
    const plantList = useSelector(store => store.plantList);

    const getPlantList = () => {

        dispatch({ type: 'FETCH_PLANT_LIST' });
    }


    useEffect(() => {
        console.log('component did mount');
        // dispatch an action to request the plantList from the API
        getPlantList();
    }, []); 

    return (
        <div>
            <h3>This is the plant list</h3>
            <ul>
                {plantList.map((plant) => 
                <li key={plant.id}>{plant.name}</li>)}
            </ul>


            <pre>{JSON.stringify(reduxState)}</pre>
        </div>
    );
}

export default PlantList;
