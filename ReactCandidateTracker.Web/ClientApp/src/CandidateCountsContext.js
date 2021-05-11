import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';

const CandidateCountsContext = React.createContext();

const CandidateCountsContextComponent = ({children}) => {
    const [candidateCounts, setCandidateCounts] = useState({
        pending: 0,
        confirmed: 0,
        refused: 0
    });


    const updateCandidateCounts = async () => {
        const { data } = await axios.get('/api/candidates/getcounts');
        setCandidateCounts(data);
    }

    useEffect(() => {
        updateCandidateCounts();
    }, []);

    const value = {
        candidateCounts,
        updateCandidateCounts
    }
    return (
        <CandidateCountsContext.Provider value={value}>
            {children}
        </CandidateCountsContext.Provider>
    )
}

const useCandidateContext = () => useContext(CandidateCountsContext);

export { useCandidateContext, CandidateCountsContextComponent }