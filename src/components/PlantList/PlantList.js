import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function PlantList() {
    const dispatch = useDispatch();
    const history = useHistory();

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

    // view plant details
    function viewDetails(id) {
        console.log(`viewing details of plant id:`, id);

        history.push(`/details/${id}`);

        dispatch({ type: 'FETCH_PLANT_DETAILS', payload: id });

    }

    return (
        <div>
            <h3>This is the plant list</h3>
                {plantList.map(plant => (
                    <div>
                        <p key={plant.name}>{plant.name}</p>
                        <button key={plant.id} onClick={ () => deletePlant(plant.id) } >Delete</button>
                        <button key={plant.id} onClick={ () => viewDetails(plant.id) } >View Details</button>
                    </div>
                ))
                }


            <pre>{JSON.stringify(reduxState)}</pre>
        </div>
    );
}

export default PlantList;
