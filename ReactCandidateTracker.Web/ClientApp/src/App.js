import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './Pages/Home';
import AddCandidate from './Pages/AddCandidate';
import Pending from './Pages/Pending';
import PendingDetails from './Pages/PendingDetails';
import Confirmed from './Pages/Confirmed';
import Refused from './Pages/Refused';
import { CandidateCountsContextComponent } from './CandidateCountsContext';

const App = () => {
    return (
        <CandidateCountsContextComponent>
            <Layout>
                <Route exact path='/' component={Home} />
                <Route exact path='/addcandidate' component={AddCandidate} />
                <Route exact path='/pending' component={Pending} />
                <Route exact path='/pending/details/:candidateId' component={PendingDetails} />
                <Route exact path='/confirmed' component={Confirmed} />
                <Route exact path='/refused' component={Refused} />
            </Layout>
        </CandidateCountsContextComponent>
    );
}

export default App;