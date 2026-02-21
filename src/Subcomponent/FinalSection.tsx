import React from "react";
import {
  Check,
  ArrowRight,
  Folder,
  MessageSquare,
  Link,
  Users,
  Video,
} from "lucide-react";

const FinalSection = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="text-green-600" size={36} />
          </div>
        </div>

        <h1 className="text-3xl font-semibold text-center text-gray-800">
          Setup Complete!
        </h1>

        <p className="text-center text-gray-600 mt-3 max-w-xl mx-auto">
          You've successfully set up Thunai. You're now ready to experience the
          full power of AI assistance.
        </p>

        <div className="mt-10 bg-blue-100/60 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <ArrowRight className="text-blue-600" size={20} />
            <h2 className="text-lg font-semibold text-gray-800">
              What's Next?
            </h2>
          </div>

          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-3">
              <Folder className="text-blue-500" size={18} />
              <p>Explore your Brain to organize and access your knowledge</p>
            </div>

            <div className="flex items-center gap-3">
              <MessageSquare className="text-blue-500" size={18} />
              <p>Chat with your agents to get assistance on specific tasks</p>
            </div>

            <div className="flex items-center gap-3">
              <Link className="text-blue-500" size={18} />
              <p>Connect more applications to enhance your workflow</p>
            </div>

            <div className="flex items-center gap-3">
              <Users className="text-blue-500" size={18} />
              <p>Invite team members to collaborate with Thunai</p>
            </div>
          </div>
        </div>

        <div className="mt-2 p-6 sm:p-8 text-center">
          <div className="bg-gray-50 rounded-lg  rounded-2xl shadow-md p-4">
            <div className="flex justify-start items-center gap-2 mb-4 px-[100px]">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white">
                <Video size={20} />
              </div>

              <div className="flex flex-col items-center gap-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  Schedule a Demo
                </h3>

                <p className="text-gray-600 mt-2 capitalize">
                  Get a personalized walkthrough of Thunai's advanced features
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                window.open(
                  "https://meetings-na2.hubspot.com/thunai/demo",
                  "_blank",
                )
              }
              className="mt-6 w-full sm:w-auto px-20 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition"
            >
              Book Demo
            </button>

            <div className="flex justify-center items-center">
                <button className="mt-1 w-full sm:w-auto px-20  py-3 rounded-lg text-white font-medium bg-blue-500 hover:opacity-90 transition flex gap-1" onClick={() => window.open("https://app.thunai.ai/salesEnablement/meetingAssistants")}> Go to Dashboard <ArrowRight className="text-white mt-1" size={20} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalSection;
