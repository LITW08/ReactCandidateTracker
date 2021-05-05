import React, { useState, useContext } from 'react';
import produce from 'immer';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { CandidateCountsContext } from '../CandidateCountsContext';

const AddCandidate = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        notes: ''
    });
    const { updateCandidateCounts } = useContext(CandidateCountsContext);;

    const history = useHistory();

    const onTextChange = e => {
        const nextState = produce(formData, draft => {
            draft[e.target.name] = e.target.value;
        });
        setFormData(nextState);
    }

    const onFormSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/candidates/add', formData);
        await updateCandidateCounts();
        history.push('/');
    }

    return (
        <div className="row" style={{ marginTop: 20 }}>
            <div className="col-md-6 offset-md-3">
                <div className="card card-body bg-light">
                    <h4>Add Candidate</h4>
                    <form onSubmit={onFormSubmit}>
                        <input type="text" onChange={onTextChange} name="firstName" placeholder="First Name" className="form-control" />
                        <br />
                        <input type="text" onChange={onTextChange} name="lastName" placeholder="Last Name" className="form-control" />
                        <br />
                        <input type="text" onChange={onTextChange} name="email" placeholder="Email" className="form-control" />
                        <br />
                        <input type="text" onChange={onTextChange} name="phoneNumber" placeholder="Phone Number" className="form-control" />
                        <br />
                        <textarea rows="5" onChange={onTextChange} className="form-control" name="notes"></textarea>
                        <br />
                        <button className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default AddCandidate;