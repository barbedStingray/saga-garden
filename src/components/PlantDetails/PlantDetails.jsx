
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function PlantDetails() {

    const plantDetails = useSelector(store => store.plantDetails);
    const dispatch = useDispatch();

    // console.log(`plantDetails id:`, plantDetails[0].id);


    // useEffect(() => {
    //     dispatch({ type: 'FETCH_PLANT_DETAILS', payload: plantDetails.id });
    // }, []);


    return (
        <div id="plant-details">

            <p>Plant Details will be displayed here!</p>

            <p>Name: {plantDetails[0].name}</p>
            <p>Kingdom: {plantDetails[0].kingdom}</p>
            <p>Clade: {plantDetails[0].clade}</p>

            {/* {plantDetails.map((plant) => 
            <div>
                <p>Name: {plant.name}</p>
                <p>Kingdom: {plant.kingdom}</p>
                <p>Clade: {plant.clade}</p>
                <p>Order: {plant.order}</p>
                <p>Family: {plant.family}</p>
                <p>Subfamily: {plant.subfamily}</p>
                <p>Genus: {plant.genus}</p>
                </div>
            )} */}
            <button>Return to Garden</button>
        </div>
    )
}

export default PlantDetails;