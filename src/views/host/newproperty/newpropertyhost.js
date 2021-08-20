import HostNewPropertyStepOne from 'components/host/newproperty/step1';
import HostNewPropertyStepTwo from 'components/host/newproperty/step2';
import HostNewPropertyStepThree from 'components/host/newproperty/step3';
import StepsComponent from 'components/host/newproperty/steps';
import React from 'react';
import StepWizard from "react-step-wizard";

function HostCreateNewPropertypage() {
    return (
        <div className="bg-gray-100">
            <div className="mx-auto max-w-7xl px-2 py-5 sm:py-16 sm:px-5">
                <StepsComponent/>
                <div className="mt-3">
                    <StepWizard 
                        isHashEnabled
                    >
                        <HostNewPropertyStepOne/>
                        <HostNewPropertyStepTwo/>
                        <HostNewPropertyStepThree/>
                    </StepWizard>
                </div>
            </div>
        </div>
    )
}

export default HostCreateNewPropertypage;
