import React, {useRef} from 'react';
import CreateAgentIcon from "@/assets/svg/CreateAgent.svg";
import ChatIcon from "@/assets/svg/ChatIcon.svg";
import VoiceAgentIcon from "@/assets/svg/VoiceAgent.svg";
import MailIcon from "@/assets/svg/MailIcon.svg";
import StarIcon from "@/assets/svg/StarIcon.svg";
import { requestApi } from "@/Service/MeetingService";

const AgentSection = ({CIndex, selectedAgentType, onAgentTypeChange}:{CIndex: number, selectedAgentType: string, onAgentTypeChange: (type: string) => void}) => {
  const tenantId = localStorage.getItem("tenantId") || "";

  console.log("Selected Agent Type:", selectedAgentType);

  // const[inputValue, setInputValue]=useState({
  //   name:"",
  //   initial_message:"",
  // })
  const inputRef = useRef<HTMLInputElement>(null);
  const inputMessageRef = useRef<HTMLInputElement>(null);

    const AgentType=[
        {TapName:"Chat Agent",
        icon: ChatIcon},
      {TapName:"Voice Agent",
      icon: VoiceAgentIcon},
      {
       TapName:"Mail Agent",
       icon: MailIcon,
        }
    ]

   const handleCreateAgent = async () => {
  try {
    let payload = {};
    let url = "";

    if (selectedAgentType === "Chat Agent") {
      payload = {
        name: inputRef.current?.value,
        intial_message: inputMessageRef.current?.value,
        agent_type: "kb_agent",
      };

      url = `${tenantId}/widget/`;

    } else if (selectedAgentType === "Voice Agent") {
      payload = {
        agent_name: inputRef.current?.value,
        agent_type: "kb_agent",
      };

      url = `${tenantId}/voice/agent/config/`;
    }

    const response = await requestApi(
      url,
      "POST",
      payload,
      "authService"
    );

    console.log("Agent created:", response);

  } catch (error) {
    console.error("Error creating agent:", error);
  }
};
  return (
    <>
    <div className="p-6 bg-gray-50 rounded-xl shadow-md border-2 border-gray-200">
      
      <h2 className="text-xl font-semibold flex items-center gap-3 mb-5">
        <span className="h-7 w-7 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm font-medium">
          {CIndex}
        </span>
        Create Your First Agent
      </h2>


      <div className="flex gap-3 items-center bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-500 text-white min-w-fit">
          <img src={CreateAgentIcon} alt="create agent" className="h-4 w-4" />
        </div>
        <div className="">
            <p className="text-[14px] text-gray-500">Create a personalized AI agent to assist you with specific tasks. Choose the type that best fits your needs.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 rounded-lg">
        {AgentType.map((agentType, index)=>(
            <div key={index} className="mb-4 rounded-lg" onClick={()=>onAgentTypeChange(agentType.TapName)}>
              <div className={`flex justify-between items-center gap-2 p-2 text-black border-2 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer ${selectedAgentType === agentType.TapName ? ' bg-gradient-to-r from-blue-600 to-blue-400 border text-white' : ''}`}>
               <img src={agentType.icon} alt={agentType.TapName} className="h-5 w-5 mt-0.5 object-contain" />
                <span className="text-sm font-light">{agentType.TapName}</span>
              </div>
            </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-center bg-green-50 border border-green-200 p-4 rounded-lg mt-6 w-[100%]">
        <div  className="flex flex-col items-center gap-1 w-full md:w-[40%]">
          <div className="h-18 w-18 flex items-center justify-center rounded-md bg-blue-300 text-white">
            <img src={AgentType.find(agent => agent.TapName === selectedAgentType)?.icon || ""} alt={selectedAgentType} className="h-10 w-10 object-contain" />
          </div>
            <h5 className="text-sm font-medium text-black">{selectedAgentType}</h5>
            {selectedAgentType === "Chat Agent" && <p className="text-[14px] text-gray-500">Personalized AI assistants that can help with specific tasks through chat.</p>}
            {selectedAgentType === "Voice Agent" && <p className="text-[14px] text-gray-500">Talk to your AI assistant with natural voice conversations.</p>}
            {selectedAgentType === "Mail Agent" && <p className="text-[14px] text-gray-500">AI assistants that handle your email communications automatically.</p>}
        </div>
        <div className="w-full md:w-[60%] flex flex-col gap-2">
      {selectedAgentType === "Chat Agent" && (
        <div>

          <div>
            <label htmlFor="agentName" className="block text-sm font-medium text-gray-700 mb-1">Agent Name</label>
          <input type="text" placeholder="Agent Name" className="border border-gray-300 rounded-md p-2 w-full mb-2" ref={inputRef} />
          </div>
        <div className="mt-2">
        <label htmlFor="agentDescription" className="block text-sm font-medium text-gray-700 mb-1">Welcome Message</label>
      <textarea placeholder="Agent Description" className="border border-gray-300 rounded-md p-2 w-full" ref={inputMessageRef} />
        </div>
      </div>)}

      {selectedAgentType === "Voice Agent" && (
        <div className="mt-2">
          <label htmlFor="voiceAgentName" className="block text-sm font-medium text-gray-700 mb-1">Voice Agent Name</label>
          <input type="text" placeholder="Voice Agent Name" className="border border-gray-300 rounded-md p-2 w-full mb-2" ref={inputRef} />
        </div>
      )}

      {selectedAgentType === "Mail Agent" && (<div className="mt-2 flex flex-col lg:flex-row gap-2 items-center justify-between border border-yellow-300 bg-yellow-50 p-3 rounded-md">
        <div className="flex items-center justify-center">
          <span className="flex items-center h-10 w-10 pl-1 bg-yellow-300 rounded-full text-white">
          <img src={StarIcon} alt="Premium Feature" className="h-8 w-8 object-contain" />
          </span>
        </div>
        <div className="flex flex-col items-start gap-2 ">
          <span className="text-sm font-medium text-gray-500">Premium Feature</span>
          <p className="text-gray-600 text-xs mb-2 sm:mb-3">Email agents are available in the AGENTS  EMAIL AGENTS section of your dashboard. You can create and manage your email agents there.</p>
        </div>
      </div>)}
        </div>
      </div>
      </div>
    </>
  )
}

export default AgentSection