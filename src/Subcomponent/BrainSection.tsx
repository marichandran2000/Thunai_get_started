import {useState,useRef} from 'react';
// import { Info, Download } from "lucide-react";
import SchoolIcon from "@/assets/svg/School.svg";
import { requestApiFromData } from "@/Service/MeetingService";

const BrainSection = ({ CIndex }: { CIndex: number }) => {

   const fileInputRef = useRef<HTMLInputElement | null>(null);
   const tenantId = localStorage.getItem("tenant_id") || "";
   const [showWeblinkInput, setShowWeblinkInput] = useState(false);
   const [crawlWebsite, setCrawlWebsite] = useState(false);
   const [webLinkInput, setWebLinkInput] = useState("");
   const [crawlDepth, setCrawlDepth] = useState(1);

    
   const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
// /knowledge-base/
    try {
      const response = await requestApiFromData(
        "POST",
        `${tenantId}/knowledgebase/`,
        formData,
        "authService"
      );

      console.log("Upload success:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const SendWebLink = async () => {
     if(webLinkInput.trim() === "") return;
    try {
      const response = await requestApiFromData(
        "POST",
        `${tenantId}/knowledge-base/`,
        {
          links: webLinkInput,
          crawl: crawlWebsite,
          crawl_level: crawlDepth,
        },
        "authService"
      );
      console.log("Web link added successfully:", response.data);
      // Reset form
      setWebLinkInput("");
      setCrawlWebsite(false);
      setCrawlDepth(1);
      setShowWeblinkInput(false);
    } catch (err) {
      console.error("Error adding web link:", err);
    }
  };
  return (
    <>
     <div className="p-6 bg-gray-50 rounded-xl shadow-md border-2 border-gray-200">
      
      {/* Header */}
      <h2 className="text-xl font-semibold flex items-center gap-3 mb-5">
        <span className="h-7 w-7 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm font-medium">
          {CIndex}
        </span>
        Brain
      </h2>


      <div className="flex gap-3 items-center bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-500 text-white">
          <img src={SchoolIcon} alt="school" className="h-5 w-5" />
        </div>
        <div className="flex flex-col gap-1">
            <p className="font-medium text-gray-700">Brain is where you add all your information</p>
        <p className="text-[14px] text-gray-500">
          Upload files or add web links to get started. Connect your knowledge sources to make Thunai even smarter.
        </p>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Add Your First Content to Brain</h3>
      </div>
      <div className="flex gap-2 flex-col md:flex-row items-center justify-between rounded-lg">
        <div className="flex flex-col items-center justify-center gap-1 border-2 border-dashed border-gray-300 rounded-lg p-10 w-full md:w-[48%]">
            <span className="h-10 w-10 rounded-full bg-blue-200"> <img src={SchoolIcon} alt="school" className="h-12 w-12" /></span>
            <h6 className="text-gray-700 font-medium">Upload Documents</h6>
            <p className="text-sm text-gray-500">PDFs, Docs, Sheets & more. 100MB max</p>
            <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
            <button className="px-4 py-2 w-full mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors" onClick={handleButtonClick}>Selected File</button>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 border-2 border-dashed border-gray-300 rounded-lg p-10 w-full md:w-[48%]">
            <span className="h-10 w-10 rounded-full bg-blue-200"> <img src={SchoolIcon} alt="school" className="h-12 w-12" /></span>
            <h6 className="text-gray-700 font-medium">Add Web Link</h6>
            <p className="text-sm text-gray-500">Articles, blogs, documentation and more</p>
           {!showWeblinkInput && (
               <button className="px-4 py-2 w-full mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors" onClick={()=>{setShowWeblinkInput(!showWeblinkInput)}}>Add Link</button>
           )
           } 
            {showWeblinkInput && (
                <div  className=" w-full">
                <input type="text" onChange={(e) => setWebLinkInput(e.target.value)} placeholder="https://example.com" className="mt-4 p-2 border-2 border-gray-300 rounded-md w-full outline-none" />
                <div  className="mt-4 flex justify-between items-center gap-4 w-full">
                    <div>
                    <img src="" alt="" />
                    <span>Crawl Website</span>
                    </div>
                    <button
              onClick={() => setCrawlWebsite(!crawlWebsite)}
              className={`relative  w-[35px] h-[20px]
                rounded-full transition-colors duration-300 cursor-pointer
                ${crawlWebsite ? "bg-blue-600" : "bg-gray-300"}`}
                >
              <span
                className={`absolute top-1 left-1  w-[13px] h-[13px] bg-white rounded-full
                  shadow-md transform transition-transform duration-300
                  ${crawlWebsite ? "translate-x-[15px]" : ""}`}
                  ></span>
            </button>
                </div>
                {crawlWebsite && (
                    <div className="mt-2 flex items-center justify-between gap-4">
                        <p>Depth:</p>
                        <div className="flex items-center justify-between gap-4 text-black">
                            <button
                              onClick={() => setCrawlDepth(1)}
                              className={`h-7 w-7 rounded-full border-2 cursor-pointer transition-colors ${
                                crawlDepth === 1
                                  ? "bg-blue-500 border-blue-500 text-white"
                                  : "bg-gray-200 border-gray-300"
                              }`}
                            >
                              1
                            </button>
                            <button
                              onClick={() => setCrawlDepth(2)}
                              className={`h-7 w-7 rounded-full border-2 cursor-pointer transition-colors ${
                                crawlDepth === 2
                                  ? "bg-blue-500 border-blue-500 text-white"
                                  : "bg-gray-200 border-gray-300"
                              }`}
                            >
                              2
                            </button>
                            <button
                              onClick={() => setCrawlDepth(3)}
                              className={`h-7 w-7 rounded-full border-2 cursor-pointer transition-colors ${
                                crawlDepth === 3
                                  ? "bg-blue-500 border-blue-500 text-white"
                                  : "bg-gray-200 border-gray-300"
                              }`}
                            >
                              3
                            </button>
                        </div>
                    </div>
                )}

                <div className="mt-4 flex justify-end items-center gap-4 w-full">
                    <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors" onClick={() => setShowWeblinkInput(false)}>Cancel</button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors" 
                    onClick={SendWebLink}
                    >Add Link</button>
                </div>
            </div>
            )}
        </div>
       
      </div>
      
      </div>
      
    </>
  )
}

export default BrainSection