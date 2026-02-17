import React from "react";
import { Info, Download } from "lucide-react";
import AndroidIcon from "@/assets/svg/AppStoreIcon.svg"; 
import PlayStoreIcon from "@/assets/svg/PlayStoreIcon.svg";
import ChromeIcon from "@/assets/svg/ChromeIcon.svg";

import { useNavigate } from "react-router-dom";

const IntegrationSection = ({ CIndex }: { CIndex: number }) => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-md border-2 border-gray-200">
      
      {/* Header */}
      <h2 className="text-xl font-semibold flex items-center gap-3 mb-5">
        <span className="h-7 w-7 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm font-medium">
          {CIndex}
        </span>
        Integrations
      </h2>

      {/* Info Box */}
      <div className="flex gap-3 bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-500 text-white">
          <Info size={16} />
        </div>
        <p className="text-[14px] text-gray-500">
          Experience seamless access to powerful features on the go with our mobile app.
          Whether you're using Android or iOS, stay connected, manage tasks, and
          enhance productivity anytime, anywhere.
        </p>
      </div>

      {/* Mobile Apps Section */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">

        {/* Android Card */}
        <div className="flex items-center justify-between p-4 bg-white border-2 border-gray-100 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <img src={PlayStoreIcon} alt="android" className="h-10 w-10" />
            <div>
              <h3 className="font-medium">Android App</h3>
              <p className="text-sm text-gray-500">Get it on Google Play</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg text-sm font-medium hover:opacity-90"
         onClick={() =>
  window.open(
    "https://play.google.com/store/apps/details?id=com.thunai.ai",
    "_blank"
  )
}
           >
            Downloads
          </button>
        </div>

        {/* iOS Card */}
        <div className="flex items-center justify-between p-4 bg-white border-2 border-gray-100 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <img src={AndroidIcon} alt="ios" className="h-10 w-10" />
            <div>
              <h3 className="font-medium">iOS App</h3>
              <p className="text-sm text-gray-500">Download on App Store</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg text-sm font-medium hover:opacity-90"
          onClick={() =>
  window.open(
    "https://apps.apple.com/us/app/thunai-ai/id6740311760",
    "_blank"
  )
}
>
            Download
          </button>
        </div>
      </div>

      {/* Chrome Extension */}
      <div className="flex items-center justify-between p-4 bg-white border-2 border-gray-100 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <img src={ChromeIcon} alt="chrome" className="h-10 w-10" />
          <div>
            <h3 className="font-medium">Chrome Extension</h3>
            <p className="text-sm text-gray-500">Add to your browser</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600"
          onClick={() =>
        window.open(
        "https://chromewebstore.google.com/detail/thunai-ai/dobjjhfjgnijncinkbjkbgfndlgjlkab",
        "_blank"
        )
        }
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default IntegrationSection;
