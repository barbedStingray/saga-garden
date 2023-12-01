
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

function PlantDetails() {

    const plantDetails = useSelector(store => store.plantDetails);
    console.log(`store details:`, plantDetails);
    const dispatch = useDispatch();

    // const [ plantID, setPlantID ] = useState('');

    // console.log(`plantDetails id:`, plantDetails[0].id);

    // function escapeRefresh() {
    //     console.log(`escaping refresh`);
    //     console.log(`plantID BEFORE:`, plantDetails[0].id);
    //     setPlantID(plantDetails[0].id);
    //     console.log(`plantID AFTER:`, plantDetails[0].id);

    // }


    // useEffect(() => {
    //     escapeRefresh();
    // }, []);
    // dispatch({ type: 'FETCH_PLANT_DETAILS', payload: plantID });

    return (
        <div id="plant-details">

            <p>Plant Details will be displayed here!</p>

            {/* <p>Name: {plantDetails[0].name}</p>
            <p>Kingdom: {plantDetails[0].kingdom}</p>
            <p>Clade: {plantDetails[0].clade}</p> */}

            {plantDetails.map((plant) => 
            <div>
                <p>ID: {plant.id}</p>
                <p>Name: {plant.name}</p>
                <p>Kingdom: {plant.kingdom}</p>
                <p>Clade: {plant.clade}</p>
                <p>Order: {plant.order}</p>
                <p>Family: {plant.family}</p>
                <p>Subfamily: {plant.subfamily}</p>
                <p>Genus: {plant.genus}</p>
                </div>
            )}
            <button>Return to Garden</button>
        </div>
    )
}

export default PlantDetails;