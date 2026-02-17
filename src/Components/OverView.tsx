import React from "react";
import { Check } from "lucide-react";
import { GrIntegration } from "react-icons/gr";
import { LuBrainCog } from "react-icons/lu";
import { MdOutlineAppSettingsAlt, MdOutlineSupportAgent } from "react-icons/md";

const steps = [
  {
    label: "Integrations",
    icon: <GrIntegration size={18} />,
  },
  {
    label: "Brain",
    icon: <LuBrainCog size={18} />,
  },
  {
    label: "App Setup",
    icon: <MdOutlineAppSettingsAlt size={18} />,
  },
  {
    label: "Agents",
    icon: <MdOutlineSupportAgent size={18} />,
  },
  {
    label: "Complete",
    icon: <Check size={18} />,
  },
];

const OverView = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNextClick = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-[100vh] sm:px-[100px] md:px-[150px] lg:px-[200px]">
    
      {/* ===== Main Content ===== */}
      <div className="flex-1 p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2 mb-8">
          <h1 className="text-2xl md:text-4xl font-semibold">
            Get Started With{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-bold">
              Thunai!
            </span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Complete these steps to set up your Thunai experience.
          </p>
        </div>

        {/* ===== Desktop View ===== */}
        <div className="hidden sm:flex items-center justify-between mt-12 relative">
          {steps.map((step, index) => {
            const isCompleted = index < activeStep;
            const isActive = index === activeStep;

            return (
              <div
                key={index}
                className="flex flex-col items-center flex-1 relative"
              >
                {/* Line */}
                {index !== steps.length - 1 && (
                  <div className="absolute top-5 left-1/2 w-full h-[2px] bg-gray-300 -z-10">
                    <div
                      className={`h-[2px] ${
                        index < activeStep
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 w-full"
                          : "w-0"
                      }`}
                    ></div>
                  </div>
                )}

                {/* Circle */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-blue-500 text-white ring-4 ring-blue-200"
                      : isCompleted
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                  onClick={() => handleStepClick(index)}
                >
                  {isCompleted ? <Check size={20} /> : step.icon}
                </div>

                <p
                  
                  className="mt-3 text-sm text-gray-700 cursor-pointer hover:text-blue-500"
                >
                  {step?.label}
                </p>
              </div>
            );
          })}
        </div>

       {/* ===== Sidebar (Small devices) ===== */}
      <div className="sm:hidden w-full p-2">
        <div className="text-center mb-4">
          <p className="text-sm text-gray-500">Step {activeStep + 1} of {steps.length}: {steps[activeStep]?.label}</p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(activeStep / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
        <div>
          <button
            onClick={handleNextClick}
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default OverView;
