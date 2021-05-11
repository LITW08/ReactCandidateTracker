import React, { useState, useEffect } from 'react';
import axios from 'axios';
import produce from 'immer';
import { useCandidateContext } from '../CandidateCountsContext';
import { useParams } from 'react-router-dom';

const PendingDetails = () => {
    const { candidateId } = useParams();
    const [candidate, setCandidate] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        notes: '',
        status: ''
    });

    const {updateCandidateCounts} = useCandidateContext();

    useEffect(() => {
        const loadCandidate = async () => {
            const { data } = await axios.get(`/api/candidates/get?id=${candidateId}`);
            setCandidate(data);
        }
        loadCandidate();
    }, []);

    const onUpdateStatusClick = async status => {
        await axios.post('/api/candidates/updatestatus', { id: candidateId, status });
        const nextState = produce(candidate, draft => {
            draft.status = status;
        });
        setCandidate(nextState);
        await updateCandidateCounts();
    }

    const { firstName, lastName, email, phoneNumber, status, notes } = candidate;
    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card card-body bg-light">
                    <h4>Name: {firstName} {lastName}</h4>
                    <h4>Email: {email}</h4>
                    <h4>Phone: {phoneNumber}</h4>
                    <h4>Status: {status}</h4>
                    <h4>Notes:</h4>
                    <p>{notes}</p>
                    {status === 'Pending' && <div>
                        <button onClick={() => onUpdateStatusClick('Confirmed')} className="btn btn-primary">Confirm</button>
                        <button onClick={() => onUpdateStatusClick('Refused')} className="btn btn-danger">Refuse</button>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default PendingDetails;