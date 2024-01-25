import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import * as React from "react";
import UserForm1 from "./UserForm1.tsx";
import UserForm2 from "./UserForm2.tsx";

const steps = [
    "Personal details",
    "Personal Address",
];

export default function User() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
    }>({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    return (
        <Box sx={{width: "100%"}}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton color='inherit' onClick={handleStep(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <div>
                <React.Fragment>
                    {activeStep === 0 ? <UserForm1 onClick={handleNext}/> : <UserForm2/>}
                </React.Fragment>

            </div>
        </Box>
    );
}
