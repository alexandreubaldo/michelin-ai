import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { 
  certifications, 
  formatDate, 
  getDaysLeft, 
  users, 
  Certification,
  tireModels
} from "../utils/mockData";
import { Clock, CheckCircle2, AlertCircle, AlertTriangle, ArrowLeft } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function CertificationsList() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tireModelId = searchParams.get("tireModelId");
  const [filteredCertifications, setFilteredCertifications] = useState(certifications);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [groupByRegion, setGroupByRegion] = useState(false);
  const [currentTireModel, setCurrentTireModel] = useState<typeof tireModels[0] | null>(null);

  useEffect(() => {
    if (tireModelId) {
      // Filter certifications by tire model ID
      const tireModelCertifications = certifications.filter(cert => cert.tireModelId === tireModelId);
      setFilteredCertifications(tireModelCertifications);
      
      // Find the tire model to set the search term and model info
      const tireModel = tireModels.find(t => t.id === tireModelId);
      if (tireModel) {
        setSearchTerm(tireModel.name);
        setCurrentTireModel(tireModel);
      }
    } else {
      setFilteredCertifications(certifications);
      setCurrentTireModel(null);
    }
  }, [tireModelId]);

  const applyFilters = () => {
    let filtered = certifications;
    
    if (tireModelId) {
      filtered = filtered.filter(cert => cert.tireModelId === tireModelId);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(cert => 
        cert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.tireModelName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter(cert => cert.status === statusFilter);
    }
    
    if (priorityFilter && priorityFilter !== "all") {
      filtered = filtered.filter(cert => cert.priority === priorityFilter);
    }
    
    if (typeFilter && typeFilter !== "all") {
      filtered = filtered.filter(cert => cert.type === typeFilter);
    }
    
    setFilteredCertifications(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setTypeFilter("all");
    setFilteredCertifications(certifications);
  };

  const groupedCertifications = groupByRegion
    ? filteredCertifications.reduce((acc, certification) => {
        const region = certification.region;
        if (!acc[region]) {
          acc[region] = [];
        }
        acc[region].push(certification);
        return acc;
      }, {} as Record<string, Certification[]>)
    : null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl">Certifications</CardTitle>
            {currentTireModel && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => navigate("/certifications")}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <span>Viewing certifications for {currentTireModel.name}</span>
              </div>
            )}
          </div>
          <Button onClick={() => navigate("/certifications/new")}>New Certification</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search by description or tire model"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="at-risk">At Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="homologation">Homologation</SelectItem>
                  <SelectItem value="warranty">Warranty</SelectItem>
                  <SelectItem value="testing">Testing</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="renewal">Renewal</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="group-by-region"
                checked={groupByRegion}
                onCheckedChange={setGroupByRegion}
              />
              <Label htmlFor="group-by-region">Group by Region</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
              <Button onClick={applyFilters}>Apply Filters</Button>
            </div>
          </div>

          <Separator />

          {filteredCertifications.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold">No certifications found</h3>
              <p className="text-muted-foreground">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="space-y-6">
              {groupByRegion ? (
                Object.entries(groupedCertifications!).map(([region, certifications]) => (
                  <div key={region} className="space-y-4">
                    <h3 className="text-lg font-semibold">{region}</h3>
                    <div className="space-y-4">
                      {certifications.map((certification) => (
                        <CertificationCard key={certification.id} certification={certification} />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                filteredCertifications.map((certification) => (
                  <CertificationCard key={certification.id} certification={certification} />
                ))
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function CertificationCard({ certification }: { certification: Certification }) {
  const daysLeft = getDaysLeft(certification.dueDate);
  const assignedUser = users.find(user => user.id === certification.assignedTo);
  
  return (
    <div className="certification-card flex items-center justify-between rounded-lg border p-4">
      <div className="space-y-1">
        <div className="font-medium">{certification.description}</div>
        <div className="text-sm text-muted-foreground">
          {certification.tireModelName}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="mr-2">Due: {formatDate(certification.dueDate)}</span>
          {daysLeft < 0 ? (
            <span className="text-destructive font-medium">Overdue</span>
          ) : daysLeft === 0 ? (
            <span className="text-amber-500 font-medium">Due today</span>
          ) : daysLeft <= 7 ? (
            <span className="text-amber-500 font-medium">Due in {daysLeft} days</span>
          ) : null}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {certification.status === 'completed' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : certification.status === 'overdue' ? (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                ) : certification.status === 'at-risk' ? (
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                ) : (
                  <Clock className="h-5 w-5 text-blue-500" />
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p>{certification.status.charAt(0).toUpperCase() + certification.status.slice(1)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
            certification.priority === 'high' ? 'bg-red-100 text-red-800' :
            certification.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
            'bg-green-100 text-green-800'
          }`}>
            {certification.priority.charAt(0).toUpperCase() + certification.priority.slice(1)}
          </span>
          <span className="inline-flex items-center rounded-full px-2 py-1 text-xs bg-purple-100 text-purple-800">
            {certification.type.charAt(0).toUpperCase() + certification.type.slice(1)}
          </span>
        </div>
        <div className="mt-3 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Task Progress</span>
            <span className="font-medium">
              {certification.tasks.filter(t => t.completed).length} / {certification.tasks.length} tasks
            </span>
          </div>
          <Progress 
            value={(certification.tasks.filter(t => t.completed).length / certification.tasks.length) * 100} 
            className="h-1.5"
          />
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-4">
          <div className="text-sm flex items-center">
            <span className="text-muted-foreground mr-2">Assigned to:</span>
            {assignedUser && (
              <span className="font-medium">{assignedUser.name}</span>
            )}
          </div>
          <Button size="sm">View</Button>
        </div>
      </div>
    </div>
  );
}
