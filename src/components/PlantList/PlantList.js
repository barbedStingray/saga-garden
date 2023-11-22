import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


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


    // delete plant item
    function deletePlant(id) {
        console.log('deleting plant...');
        dispatch({ type: 'DELETE_PLANT', payload: id });
    }

    return (
        <div>
            <h3>This is the plant list</h3>
            <ul>
                {plantList.map(plant => (
                    <div>
                        <li key={plant.name}>{plant.name}</li>
                        <button key={plant.id} onClick={deletePlant(plant.id)} >Delete</button>
                    </div>
                ))
                }
            </ul>


            <pre>{JSON.stringify(reduxState)}</pre>
        </div>
    );
}

export default PlantList;
