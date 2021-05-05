import React, { useState } from 'react';

const CandidatesTable = ({ candidates }) => {
    const [showNotes, setShowNotes] = useState(true);

    const toggleNotesClick = () => {
        setShowNotes(!showNotes);
    }

    return (
        <div>
            <button className="btn btn-success" onClick={toggleNotesClick}>Toggle Notes</button>
            <table className="table table-hover table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        {showNotes && <th>Notes</th>}
                    </tr>
                </thead>
                <tbody>
                    {candidates.map(c => {
                        return (
                            <tr key={c.id}>
                                <td>{c.firstName}</td>
                                <td>{c.lastName}</td>
                                <td>{c.phoneNumber}</td>
                                <td>{c.email}</td>
                                {showNotes && <td>{c.notes}</td>}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default CandidatesTable;