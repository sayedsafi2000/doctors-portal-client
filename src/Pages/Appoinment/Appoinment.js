import React, { useState } from 'react';
import AppoinmentBanner from './AppoinmentBanner';
import AvailableAppoinments from './AvailableAppoinments';

const Appoinment = () => {
    const [selectedDAte, setSelectedDAte] = useState(new Date());
    return (
        <div>
            <AppoinmentBanner
                selectedDAte={selectedDAte}
                setSelectedDAte={setSelectedDAte}
            ></AppoinmentBanner>
            <AvailableAppoinments
                selectedDAte={selectedDAte}
                setSelectedDAte={setSelectedDAte}
            ></AvailableAppoinments>
        </div>
    );
};

export default Appoinment;