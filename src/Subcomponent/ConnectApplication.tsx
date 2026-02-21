import React,{useEffect} from 'react'
import FileDownloadIcon from "@/assets/svg/Filedownload.svg";
import { Check } from "lucide-react";

import  ApplicationData from "../Store/ApplicationData"

const ConnectApplication = ({ CIndex, ApplicationList, isLoading }: 
  { CIndex: number, ApplicationList: any[], isLoading: boolean }) => {
    
    const {toggleSelectedApp, SelectedApps} = ApplicationData();
    
  return (
    <>
     <div className="p-6 bg-gray-50 rounded-xl shadow-md border-2 border-gray-200">
         <h2 className="text-xl font-semibold flex items-center gap-3 mb-5">
        <span className="h-7 w-7 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm font-medium">
          {CIndex}
        </span>
        Connect Your Applications
      </h2>


      <div className="flex gap-3 items-center bg-blue-50 border border-blue-200 p-4 rounded-lg mb-2">
        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-500 text-white">
          <img src={FileDownloadIcon} alt="file download" className="h-5 w-5" />
        </div>
        <div className="">
        <p className="text-[14px] text-gray-500">
          Which applications do you use? Select one or many to connect with Thunai for seamless integration and workflow automation.
        </p>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Select Applications to Connect</h3>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 h-[calc(35vh)] overflow-y-auto">
        {ApplicationList.length === 0 && !isLoading && (
          <p className="text-center text-gray-500 col-span-full">No applications found.</p>
        )}
        {isLoading && (
          <p className="text-center text-gray-500 col-span-full">Loading applications...</p>
        )}
  {ApplicationList.map((app: any) => {
    const isSelected = SelectedApps.some((a: any) => a.id === app.id);
    return (
      <div
        key={app.id}
        className={`flex items-center justify-between p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer border-2 ${
          isSelected
            ? "bg-blue-50 border-blue-400"
            : "bg-white border-gray-200"
        }`}
        onClick={() => toggleSelectedApp(app)}
      >
        <div className="flex items-center gap-3 flex-1">
          <img
            src={app.logo}
            alt={app.name}
            className="h-10 w-10 object-contain"
          />
          <div>
            <h3 className="font-medium text-gray-800">{app.name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2 truncate">
              {app.description}
            </p>
          </div>
        </div>
        {isSelected && (
          <div className="ml-2 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
            <Check size={16} className="text-white" />
          </div>
        )}
      </div>
    );
  })}
</div>

        </div>
    </>
  )
}

export default ConnectApplication