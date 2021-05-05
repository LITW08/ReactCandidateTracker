import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CandidatesTable from '../components/CandidatesTable';

const Refused = () => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const loadRefused = async () => {
            const { data } = await axios.get('/api/candidates/refused');
            setCandidates(data);
        }

        loadRefused();
    }, []);

    return (
        <div>
            <h1>Refused</h1>
            <CandidatesTable candidates={candidates} />
        </div>
    )
}

export default Refused;