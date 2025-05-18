import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dashboard } from "@/components/Dashboard";
import { Header } from "@/components/Header";
import { CertificationsList } from "@/components/CertificationsList";
import { ProductCatalogUpload } from "@/components/ContractUpload";
import { TaskAssignment } from "@/components/TaskAssignment";
import { CalendarView } from "@/components/CalendarView";
import { ChatDrawer } from "@/components/ChatDrawer";
import { Button } from "@/components/ui/button";
import { MessageSquare, Upload } from "lucide-react";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {showUpload ? (
            <div className="h-full">
              <div className="flex justify-between items-center mb-6">
                
                <Button 
                  variant="outline"
                  onClick={() => setShowUpload(false)}
                >
                  Back to Dashboard
                </Button>
              </div>
              <ProductCatalogUpload onClose={() => setShowUpload(false)} />
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Contract Management</h1>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                    onClick={() => setShowUpload(true)}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Contract
                  </Button>
                  <Button 
                    onClick={() => setIsChatOpen(true)}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Ask the AI Agent
                  </Button>
                </div>
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="certifications">Certifications</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                </TabsList>
                <TabsContent value="dashboard" className="space-y-4">
                  <Dashboard />
                </TabsContent>
                <TabsContent value="certifications">
                  <CertificationsList />
                </TabsContent>
                <TabsContent value="calendar">
                  <CalendarView />
                </TabsContent>
              </Tabs>
            </>
          )}
        </main>
      </div>
      <ChatDrawer isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
};

export default Index;
