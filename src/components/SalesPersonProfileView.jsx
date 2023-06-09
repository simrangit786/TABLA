import React, {Component} from 'react';
import ProfileView from "./Profiles/distributors/ViewDistributorProfile/ProfileView";

class SalesPersonProfileView extends Component {
    render() {
        return (
            <div id="main-content" className="main-content-div float-right position-relative mt-5">
                <div className="container-fluid h-100">
                    <div className="row clearfix all-common-steps-row h-100">
                        <div className="steps-right-side-div dashboard-inner-second bg-white float-right">
                            <ProfileView {...this.props}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SalesPersonProfileView;
