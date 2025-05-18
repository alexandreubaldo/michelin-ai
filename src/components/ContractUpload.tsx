import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { File, Upload, X, Edit, Calendar, DollarSign, Building2, User, UserCheck, MessageSquare, AlertCircle, Blocks, Plus, CheckCircle2 } from "lucide-react";
import { certifications, tireModels, users } from "@/utils/mockData";
import { formatDate } from "@/utils/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ProductCatalogUpload({ onClose }: { onClose: () => void }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCertifications, setShowCertifications] = useState(false);
  const [showSalesforceSync, setShowSalesforceSync] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [localCertifications, setLocalCertifications] = useState(certifications.filter(cert => cert.tireModelId === "tire-001"));
  const { toast } = useToast();

  // Get certifications for the first tire model (Pilot Sport 5)
  const tireModelCertifications = certifications.filter(cert => cert.tireModelId === "tire-001");
  const tireModel = tireModels.find(t => t.id === "tire-001");

  const simulateUpload = () => {
    if (!fileName) return;
    
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          simulateAnalysis();
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowCertifications(true);
      toast({
        title: "Product Catalog Analyzed Successfully",
        description: `${tireModelCertifications.length} certifications have been identified for the tire model.`,
      });
    }, 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeFile = () => {
    setFileName(null);
    setShowCertifications(false);
  };

  const handleEditCertification = (certificationId: string) => {
    toast({
      title: "Edit Certification",
      description: `Editing certification ${certificationId}`,
    });
  };

  const handleSyncWithSalesforce = () => {
    setIsSyncing(true);
    setSyncProgress(0);
    
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          setShowSalesforceSync(true);
          toast({
            title: "Salesforce Sync Complete",
            description: "All certifications have been synchronized with Salesforce.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getCertificationCountByRegion = () => {
    const regionCounts = new Map<string, { count: number; standards: string[] }>();
    
    tireModelCertifications.forEach(certification => {
      const current = regionCounts.get(certification.region) || { count: 0, standards: [] };
      regionCounts.set(certification.region, {
        count: current.count + 1,
        standards: [...new Set([...current.standards, ...certification.standards])]
      });
    });

    return Array.from(regionCounts.entries())
      .map(([region, data]) => ({ region, ...data }))
      .sort((a, b) => b.count - a.count);
  };

  const handleSaveCertification = () => {
    const descriptionInput = document.getElementById("certification-description") as HTMLInputElement;
    const dueDateInput = document.getElementById("certification-due-date") as HTMLInputElement;
    const priorityInput = document.getElementById("certification-priority") as HTMLSelectElement;
    const assignedToInput = document.getElementById("certification-assigned-to") as HTMLSelectElement;
    const regionInput = document.getElementById("certification-region") as HTMLInputElement;
    const certificationBodyInput = document.getElementById("certification-body") as HTMLInputElement;
    const standardsInput = document.getElementById("certification-standards") as HTMLInputElement;
    const taskDescriptionInput = document.getElementById("task-description") as HTMLInputElement;
    const taskDueDateInput = document.getElementById("task-due-date") as HTMLInputElement;
    const taskAssignedToInput = document.getElementById("task-assigned-to") as HTMLSelectElement;

    if (!descriptionInput.value || !dueDateInput.value || !taskDescriptionInput.value || !taskDueDateInput.value) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const tireModel = tireModels.find(t => t.id === "tire-001");
    if (!tireModel) return;

    const newCertification = {
      id: `cert-${Date.now()}`,
      tireModelId: "tire-001",
      tireModelName: tireModel.name,
      description: descriptionInput.value,
      dueDate: new Date(dueDateInput.value),
      status: "pending" as const,
      assignedTo: assignedToInput.value,
      priority: priorityInput.value as "low" | "medium" | "high",
      type: "homologation" as const,
      region: regionInput.value,
      certificationBody: certificationBodyInput.value,
      standards: standardsInput.value.split(',').map(s => s.trim()),
      tasks: [{
        id: `task-${Date.now()}`,
        description: taskDescriptionInput.value,
        dueDate: new Date(taskDueDateInput.value),
        completed: false,
        assignedTo: taskAssignedToInput.value
      }]
    };

    setLocalCertifications(prev => [...prev, newCertification]);

    // Clear form
    descriptionInput.value = "";
    dueDateInput.value = "";
    priorityInput.value = "low";
    assignedToInput.value = "";
    regionInput.value = "";
    certificationBodyInput.value = "";
    standardsInput.value = "";
    taskDescriptionInput.value = "";
    taskDueDateInput.value = "";
    taskAssignedToInput.value = "";

    toast({
      title: "Certification Added",
      description: "New certification has been added successfully",
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-2">Upload Product Catalog</h2>
        <p className="text-muted-foreground">
          Upload a product catalog to identify required certifications and standards
        </p>
      </div>

      <div className="space-y-8">
        {!showCertifications ? (
          <>
            {fileName ? (
              <div className="mb-4">
                <div className="flex items-center p-2 border rounded-md bg-muted">
                  <File className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="text-sm flex-1 truncate">{fileName}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={removeFile}
                    disabled={isUploading || isAnalyzing}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {isUploading && (
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                )}
                {isAnalyzing && (
                  <div className="mt-4 py-2 text-center text-sm text-muted-foreground">
                    Analyzing product catalog and identifying certifications...
                  </div>
                )}
              </div>
            ) : (
              <div
                className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <div className="mb-2 text-lg font-medium">Drop your file here or click to browse</div>
                <div className="text-sm text-muted-foreground">
                  Supports XLSX, CSV (Max 15MB)
                </div>
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".xlsx,.csv"
                />
              </div>
            )}

            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button 
                disabled={!fileName || isUploading || isAnalyzing}
                onClick={simulateUpload}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {isUploading ? "Uploading..." : isAnalyzing ? "Analyzing..." : "Process Catalog"}
              </Button>
            </div>
          </>
        ) : showSalesforceSync ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Salesforce Sync Report</h3>
                <p className="text-sm text-muted-foreground">Overview of certification synchronization status</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Certification Distribution</CardTitle>
                <CardDescription>Certifications by region and standards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getCertificationCountByRegion().map((region) => (
                    <div key={region.region} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{region.region}</p>
                        <p className="text-sm text-muted-foreground">
                          {region.count} certifications
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {region.standards.map((standard, index) => (
                            <Badge key={index} variant="secondary">
                              {standard}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-sm text-green-600">Synced</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" onClick={onClose}>Close</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Tire Model Information</h3>
                <p className="text-sm text-muted-foreground">Details extracted from the catalog</p>
              </div>
              <Button
                onClick={handleSyncWithSalesforce}
                disabled={isSyncing}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white"
              >
                <Blocks className="h-4 w-4" />
                {isSyncing ? "Syncing with Salesforce..." : "Sync with Salesforce"}
              </Button>
            </div>

            {isSyncing && (
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Synchronizing certifications with Salesforce...</span>
                  <span>{syncProgress}%</span>
                </div>
                <Progress value={syncProgress} />
              </div>
            )}

            {tireModel && (
              <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/30">
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{tireModel.name}</p>
                      <p className="text-xs text-muted-foreground">Tire Model</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{tireModel.manufacturer}</p>
                      <p className="text-xs text-muted-foreground">Manufacturer</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">
                        {formatDate(tireModel.launchDate)} - {formatDate(tireModel.endOfLifeDate)}
                      </p>
                      <p className="text-xs text-muted-foreground">Launch - End of Life</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">
                        ${tireModel.value.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Value</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h4 className="text-lg font-medium">Identified Certifications</h4>
              {localCertifications.map((certification) => {
                const assignedUser = users.find(u => u.id === certification.assignedTo);
                return (
                  <div
                    key={certification.id}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h4 className="font-medium">{certification.description}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Due: {formatDate(certification.dueDate)}</span>
                          <Badge variant={certification.priority === 'high' ? 'destructive' : 'secondary'}>
                            {certification.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <UserCheck className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Responsible:</span>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={assignedUser?.avatar} />
                              <AvatarFallback>{assignedUser?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{assignedUser?.name}</span>
                            <span className="text-muted-foreground">({assignedUser?.department})</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="outline">{certification.region}</Badge>
                          <Badge variant="outline">{certification.certificationBody}</Badge>
                          {certification.standards.map((standard, index) => (
                            <Badge key={index} variant="secondary">
                              {standard}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditCertification(certification.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {certification.tasks.map((task) => {
                        const taskAssignee = users.find(u => u.id === task.assignedTo);
                        return (
                          <div
                            key={task.id}
                            className="flex items-center justify-between text-sm bg-muted/50 p-3 rounded"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span>{task.description}</span>
                                <span className="text-muted-foreground">
                                  Due: {formatDate(task.dueDate)}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                <User className="h-3 w-3 text-muted-foreground" />
                                <span className="text-muted-foreground">Assigned to:</span>
                                <div className="flex items-center gap-1">
                                  <Avatar className="h-5 w-5">
                                    <AvatarImage src={taskAssignee?.avatar} />
                                    <AvatarFallback>{taskAssignee?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">{taskAssignee?.name}</span>
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditCertification(task.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* New Certification Form */}
              <div className="border rounded-lg p-4 space-y-4">
                <h4 className="font-medium">Add New Certification</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="certification-description">Description</Label>
                      <Input 
                        id="certification-description" 
                        placeholder="Enter certification description"
                        defaultValue="EU Type Approval Certification"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="certification-due-date">Due Date</Label>
                      <Input 
                        id="certification-due-date" 
                        type="date"
                        defaultValue={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="certification-region">Region</Label>
                      <Input 
                        id="certification-region" 
                        placeholder="Enter region"
                        defaultValue="European Union"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="certification-body">Certification Body</Label>
                      <Input 
                        id="certification-body" 
                        placeholder="Enter certification body"
                        defaultValue="TÜV SÜD"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certification-standards">Standards (comma-separated)</Label>
                    <Input 
                      id="certification-standards" 
                      placeholder="Enter standards"
                      defaultValue="ECE R30, ECE R54"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="certification-priority">Priority</Label>
                      <select
                        id="certification-priority"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        defaultValue="high"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="certification-assigned-to">Assigned To</Label>
                      <select
                        id="certification-assigned-to"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        defaultValue="user-002"
                      >
                        {users.map(user => (
                          <option key={user.id} value={user.id}>
                            {user.name} ({user.department})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Tasks Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium">Tasks</h5>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Task
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="task-description">Task Description</Label>
                            <Input 
                              id="task-description" 
                              placeholder="Enter task description"
                              defaultValue="Submit technical documentation"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="task-due-date">Due Date</Label>
                            <Input 
                              id="task-due-date" 
                              type="date"
                              defaultValue={new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="task-assigned-to">Assigned To</Label>
                          <select
                            id="task-assigned-to"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            defaultValue="user-002"
                          >
                            {users.map(user => (
                              <option key={user.id} value={user.id}>
                                {user.name} ({user.department})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button variant="outline">Cancel</Button>
                    <Button 
                      onClick={handleSaveCertification}
                      className="bg-primary hover:bg-primary/90 text-white"
                    >
                      Save Certification
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" onClick={onClose}>Close</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
