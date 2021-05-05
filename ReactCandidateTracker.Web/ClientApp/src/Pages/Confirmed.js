import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CandidatesTable from '../components/CandidatesTable';

const Confirmed = () => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const loadConfirmed = async () => {
            const { data } = await axios.get('/api/candidates/confirmed');
            setCandidates(data);
        }

        loadConfirmed();
    }, []);

    return (
        <div>
            <h1>Confirmed</h1>
            <CandidatesTable candidates={candidates} />
        </div>
    )
}

export default Confirmed;