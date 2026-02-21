import React,{useEffect, useState} from "react";
import { Check } from "lucide-react";
import { GrIntegration } from "react-icons/gr";
import { LuBrainCog } from "react-icons/lu";
import { MdOutlineAppSettingsAlt, MdOutlineSupportAgent } from "react-icons/md";
import LeftArrow from "../assets/svg/Arrow_back.svg";
import IntegrationSection from "@/Subcomponent/IntegrationSection";
import BrainSection from "@/Subcomponent/BrainSection";
import ConnectApplication from "@/Subcomponent/ConnectApplication";
import QuickStartSidebar from "@/Subcomponent/QuickStartSidebar";
import  ApplicationData from "../Store/ApplicationData";
import  AgentSection from "@/Subcomponent/AgentSection";
import  FinalSection from "@/Subcomponent/FinalSection";

import { requestApi } from "@/Service/MeetingService";

const steps = [
  { id:1,
    label: "Integrations",
    icon: <GrIntegration size={18} />,
  },
  {  id:2,
    label: "Brain",
    icon: <LuBrainCog size={18} />,
  },
  {  id:3,
    label: "App Setup",
    icon: <MdOutlineAppSettingsAlt size={18} />,
  },
  {  id:4,
    label: "Agents",
    icon: <MdOutlineSupportAgent size={18} />,
  },
  {  id:5,
    label: "Complete",
    icon: <Check size={18} />,
  },
];

const OverView = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [currentCount, setCurrentCount] = React.useState("");
  const [selectedAgentType, setSelectedAgentType] = useState<string>("Chat Agent");
  
  const {ApplicationList,fetchApplications,isLoading,SelectedApps} = ApplicationData();
  
  useEffect(()=>{
      fetchApplications();
  },[])
  console.log("inside overview SelectedApps",SelectedApps);
  

  const CurrentStep = 0;
  const tenantId = localStorage.getItem("tenant_id") || "";

  useEffect(()=>{
    const FetchCurrentCount = async() => {
      try{
        const res = await requestApi(
          "GET",
          `getting-started/fields/`,
          {},
          "accountService"
        )
        const stepNumber = res.data.completed_status || 1;
        setCurrentCount(stepNumber);
        setActiveStep(stepNumber);
      }catch(err){
        console.error("Error fetching current count:", err);
      }
    }
    FetchCurrentCount();
  },[])
  

  const handleNextClick = async () => {
    if (activeStep < steps.length) {
      const nextStep = activeStep + 1;
      try {
        await requestApi(
          "POST",
          `getting-started/fields/`,
          { completed_status: nextStep },
          "accountService"
        );
        setActiveStep(nextStep);
        setCurrentCount(nextStep);
      } catch (err) {
        console.error("Error updating step:", err);
      }
    }
  };

  const handleStepClick = (index: number) => {
    setActiveStep(index + 1);
  };

 const featureSets: { [key: string]: string[] } = {
    CHAT_AGENT: [
      'Customizable Widget Appearance: You can customize the appearance and behavior of the chat widget through basic settings like widget name and allowed domains, ensuring it aligns with your brand and operational needs.',
      'Agent Language Selection: Choose the language in which the agent will communicate, ensuring effective communication with your target audience.',
      'Workflow Automation: Automate repetitive tasks and workflows to improve efficiency.',
      'Seamless Communication: Facilitate automated responses via text, ensuring consistent communication across channels.',
      'Integration Capabilities: Seamlessly integrate with other applications to automate workflows and enhance productivity.'
    ],
    VOICE_AGENT: [
      'Customizable Widget Appearance: You can customize the appearance and behavior of the chat widget through basic settings like widget name and allowed domains, ensuring it aligns with your brand and operational needs.',
      'Agent Language Selection: Choose the language in which the agent will communicate, ensuring effective communication with your target audience.',
      'Multi-Language Support: Supports multiple languages in a single voice bot and handle any language on the go.',
      'Screen-Share Support: Ability to understand and view the screen and troubleshoot problems effectively.',
      'Workflow Automation: Automate repetitive tasks and workflows to improve efficiency.',
      'Seamless Communication: Facilitate automated responses via voice, ensuring consistent communication across channels.',
      'Integration Capabilities: Seamlessly integrate with other applications to automate workflows and enhance productivity.'
    ],
    EMAIL_AGENT: [
      'Thunai Email Agents are intelligent automation tools that handle email communications for support and sales workflows.',
      'They provide automated responses to common queries, reducing manual effort and improving response times.',
      'The agents integrate with platforms like Gmail, Outlook, Slack, and CRM systems to trigger actions based on email content.',
      'Setup involves creating an agent, defining its persona and behavior, setting an email prefix, and configuring workflow integrations.',
      'Support agents automatically create tickets from user emails and respond with ticket details.',
      'Sales agents handle product inquiries by offering meeting slots, scheduling appointments, handling first level questions and managing calendar invites.',
      'The system includes smart actionable insights from email content analysis.',
      'Both agent types feature inbox sections for monitoring communications and system logs.',
      'Email agents can create new CRM contacts or update existing records based on interactions.',
      'Overall, they streamline operations, ensure consistent communication, and enhance user engagement across support and sales channels.'
    ]
  };

  return (
    <div className="flex flex-col lg:flex-row h-full lg:h-[100vh]">
    
      {/* Main Content Area */}
      <div className={`flex-1 ${activeStep === 3 && SelectedApps.length > 0 ? "" : ""} transition-all`}>
        <div className="sm:px-[50px] md:px-[100px] lg:px-[200px]">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2 mb-5 pt-4">
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
        <div className="hidden sm:flex items-center justify-between mt-5 relative">
          {steps.map((step, index) => {
            const isCompleted = index + 1 < activeStep;
            const isActive = index + 1 === activeStep;

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
          <p className="text-sm text-gray-500">Step {activeStep} of {steps.length}: {steps[activeStep - 1]?.label}</p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((activeStep - 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-2">
      {activeStep > 1 && (
        <button className="flex text-blue-700" onClick={()=>{
          if (activeStep > 1){
            setActiveStep(activeStep - 1)
          }
        }}><img src={LeftArrow} alt="" />Back</button>
      )}
      </div>
      <section className="h-[calc(68vh)] overflow-y-auto">
        {activeStep === 1 && (
           <IntegrationSection CIndex={activeStep} />
          )}
        {activeStep === 2 && (
           <BrainSection CIndex={activeStep} />
          )}
        {activeStep === 3 && (
          <ConnectApplication CIndex={activeStep} ApplicationList={ApplicationList} isLoading={isLoading} />
        )}
        {activeStep === 4 && (
          <AgentSection CIndex={activeStep} selectedAgentType={selectedAgentType} onAgentTypeChange={setSelectedAgentType} />
        )}

        {activeStep === 5 && (
           <FinalSection CIndex={activeStep} />
          )}
          <div className="flex justify-end gap-2">
            {activeStep === 4 && (
              <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Create Agent</button>
            )}
            
            <button
              onClick={handleNextClick}
              className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              {activeStep === 4 ? "Skip and Continue" : "Next"}
            </button>
          </div>

        
      </section>

        </div>
      </div>

      {(activeStep === 3 || activeStep === 4) && <QuickStartSidebar selectedApps={SelectedApps} 
      activeStep={activeStep} featureSets={featureSets} selectedAgentType={selectedAgentType}/>}
      
    </div>
  );
};

export default OverView;
