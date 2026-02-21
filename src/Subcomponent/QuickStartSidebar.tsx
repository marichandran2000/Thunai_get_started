import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Check } from "lucide-react";

const QuickStartSidebar = ({ selectedApps,activeStep,featureSets, selectedAgentType }: { selectedApps: any[], activeStep: number, featureSets: any, selectedAgentType?: string }) => {
  const [activeAppIndex, setActiveAppIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeApp = selectedApps[activeAppIndex];
  // console.log("selectedApps==>",selectedApps);
  
  // Map agent type display names to feature set keys
  const getAgentFeatureKey = (agentType: string): string => {
    const mapping: { [key: string]: string } = {
      "Chat Agent": "CHAT_AGENT",
      "Voice Agent": "VOICE_AGENT",
      "Mail Agent": "EMAIL_AGENT",
    };
    return mapping[agentType] || "CHAT_AGENT";
  };
  

  const handleCopyDocLink = () => {
    if (activeApp?.docs_uri) {
      navigator.clipboard.writeText(activeApp.docs_uri);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  // console.log("selectedApps",selectedApps);
  

  return (
    <>
    <div className="md:flex-col lg:flex sm:px-[150px] md:px-[80px] lg:px-[10px] lg:w-[400px] bg-white border-l border-gray-200 p-6 overflow-y-auto">
      <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-200">
        <div className="h-10 w-10 rounded-lg bg-blue-500 text-white flex items-center justify-center">
          <Menu size={20} />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">Quick Start Guide</h2>
      </div>
      {activeStep === 3 && (
        <div>
        {selectedApps.length> 0 ? (
        <div>
      <p className="text-sm text-gray-600 mb-8">
        Your selected applications will be available for setup under{" "}
        <span className="font-semibold">Integrations → Applications</span> in the left menu.
      </p>

      {selectedApps.length > 1 && (
        <div className="mb-8 pb-8 border-b border-gray-200">
          <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wider">Applications</p>
          <div className="flex flex-col gap-2">
            {selectedApps.map((app, index) => (
              <button
                key={app.id}
                onClick={() => setActiveAppIndex(index)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition ${
                  activeAppIndex === index
                    ? "bg-blue-100 border border-blue-400"
                    : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                <img src={app.logo} alt={app.display_name} className="h-5 w-5 object-contain" />
                <span className="text-sm font-medium text-gray-800 truncate">
                  {app.display_name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      
      <div className="mb-8 pb-8 border-b border-gray-200">
      <div className="flex items-center gap-3">
          <img
            src={activeApp?.logo}
            alt={activeApp?.display_name}
            className="h-12 w-12 object-contain"
            />
          <h3 className="text-lg font-semibold text-gray-800">
            {activeApp?.display_name}
          </h3>
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="mb-8 pb-8 border-b border-gray-200">
      <h4 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
      Setup Instructions:
      </h4>
      <div className="space-y-3">
      <div className="flex gap-3">
      <span className="text-sm font-medium text-gray-800 min-w-fit">1.</span>
      <p className="text-sm text-gray-700">Navigate to Integrations → Applications</p>
      </div>
      <div className="flex gap-3">
            <span className="text-sm font-medium text-gray-800 min-w-fit">2.</span>
            <p className="text-sm text-gray-700">
              Select {activeApp?.display_name} from the list
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-sm font-medium text-gray-800 min-w-fit">3.</span>
            <p className="text-sm text-gray-700">
            Follow the on-screen instructions to authorize access
            </p>
            </div>
            <div className="flex gap-3">
            <span className="text-sm font-medium text-gray-800 min-w-fit">4.</span>
            <a
              // href={activeApp?.docs_uri}
              onClick={()=>window.open("https://docs.thunai.ai/?_gl=1*1ak8tud*_gcl_au*MjEzNzc4MzcxNC4xNzcwNjIwNTUx","_blank")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
            >
              View Documentation →
            </a>
          </div>
        </div>
      {/* Support Section */}
      <div className="flex items-center justify-between pt-4 mt-auto">
        <p className="text-sm text-gray-600">
          Need help?{" "}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium"
          onClick={()=>window.open("https://www.thunai.ai/?_gl=1*1lpw2ct*_gcl_au*MjEzNzc4MzcxNC4xNzcwNjIwNTUx","_blank")}>
          Contact support
          </a>
          </p>
          <button
          onClick={handleCopyDocLink}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            copied
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
        {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      </div>
        </div>
      ):(<div className="flex justify-center items-center h-[50vh] border-2 border-dashed border-gray-300 rounded-lg">
        <div className="flex flex-col justify-center items-center text-center gap-2">
        
        <h6 className="text-sm text-gray-600">
        No applications selected
        </h6>
        <p className="text-gray-400">Select applications from the main panel to see their setup guides.</p>
        </div>
        </div>)}
        </div>
      )}
      {activeStep === 4 && selectedAgentType && (
        <div className="">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{selectedAgentType}</h3>
            <h6 className="text-md text-gray-700">Thunai AI offers AI-powered voice agents that enable AI-driven interactions within various applications.</h6>
          </div>

          {featureSets[getAgentFeatureKey(selectedAgentType)]?.length > 0 ? (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Key Features:</h4>
              <ul className="space-y-3 max-h-[60vh] overflow-y-auto">
                {featureSets[getAgentFeatureKey(selectedAgentType)]?.map((feature: string, index: number) => (
                  <li key={index} className="flex gap-2">
                    <Check size={14} className="text-blue-700 mt-1 font-bold min-w-fit" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              

              {/* Support Section */}
              <div className="flex items-center justify-between pt-4 mt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Need help?{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium"
                  onClick={()=>window.open("https://docs.thunai.ai/category/65-voice-agents","_blank")}>
                  Learn more about {selectedAgentType}
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600">No features available for this agent type.</p>
          )}
        </div>
      )}
    </div>


        </>
  );
};

export default QuickStartSidebar;
