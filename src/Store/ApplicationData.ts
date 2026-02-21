import { create } from "zustand";
import { requestApi } from "@/Service/MeetingService";


const url = new URL(window.location.href);

const getTenantId = (): string => {
  const tenantId =
    url.searchParams.get("tenant_id") ||
    localStorage.getItem("tenant_id");

  if (!tenantId) throw new Error("Tenant ID not found");
  return tenantId;
};

const ApplicationData = create((set)=>({
    ApplicationList:[],
    SelectedApps: [],
    isLoading: false,
    error:null,

    fetchApplications: async () => {
        set({ isLoading: true, error: null });
        const payload={
            page:{size:50,page_number:1},
            sort:"asc",
            sortby:"created",
            filter:[]
        }
        try {
            const tenantId = getTenantId();
            const response = await requestApi(
                "POST",
                `${tenantId}/oauth2/app/connected/filter/`,
                payload,
                "authService"
            );
            // console.log("Fetched Applications:==>", response);
            set({ ApplicationList: response.data.data, isLoading: false });
        } catch (err) {
            set({ error: err, isLoading: false });
        }
    },
    toggleSelectedApp: (app: any) => {
        set((state: any) => {
            const isSelected = state.SelectedApps.some((a: any) => a.id === app.id);
            if (isSelected) {
                return {
                    SelectedApps: state.SelectedApps.filter((a: any) => a.id !== app.id)
                };
            } else {
                return {
                    SelectedApps: [...state.SelectedApps, app]
                };
            }
        });
    },
    isAppSelected: (appId: string) => {
        return (state: any) => state.SelectedApps.some((a: any) => a.id === appId);
    }

}))

export default ApplicationData;
