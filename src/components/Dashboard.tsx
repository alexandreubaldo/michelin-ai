import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, Calendar, Clock, FileCheck, Upload, CheckCircle2, AlertCircle, AlertTriangle } from "lucide-react";
import { 
  certifications,
  getCertificationsByStatus,
  getCertificationsByType,
  getUpcomingDeadlines,
  formatDate,
  getDaysLeft,
  users,
  tireModels
} from "../utils/mockData";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

export function Dashboard() {
  const navigate = useNavigate();
  const [periodTab, setPeriodTab] = useState("today");
  const statusCounts = getCertificationsByStatus();
  const typeCounts = getCertificationsByType();
  const upcomingDeadlines = getUpcomingDeadlines(30);

  const handleViewTireModel = (tireModelId: string) => {
    navigate(`/certifications?tireModelId=${tireModelId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Button onClick={() => navigate("/certifications/new")}>
          <Upload className="mr-2 h-4 w-4" />
          New Certification
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Certifications</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certifications.length}</div>
            <p className="text-xs text-muted-foreground">
              Across {tireModels.length} tire models
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.pending}</div>
            <p className="text-xs text-muted-foreground">
              {statusCounts.atRisk} at risk
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.completed}</div>
            <p className="text-xs text-muted-foreground">
              {((statusCounts.completed / certifications.length) * 100).toFixed(1)}% completion rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.overdue}</div>
            <p className="text-xs text-muted-foreground">
              {statusCounts.atRisk} at risk
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Certification Types</CardTitle>
            <CardDescription>
              Distribution of certifications by type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(typeCounts).map(([type, count]) => (
                <div key={type} className="flex items-center">
                  <div className="w-32 text-sm font-medium">{type}</div>
                  <div className="flex-1">
                    <Progress value={(count / certifications.length) * 100} className="h-2" />
                  </div>
                  <div className="w-12 text-right text-sm font-medium">{count}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>
              Certifications due in the next 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.slice(0, 3).map((certification) => {
                const daysLeft = getDaysLeft(certification.dueDate);
                const assignedUser = users.find(user => user.id === certification.assignedTo);
                
                return (
                  <div key={certification.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {certification.status === 'completed' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : certification.status === 'overdue' ? (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      ) : certification.status === 'at-risk' ? (
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-base text-black">{certification.description}</div>
                      <div className="text-sm text-muted-foreground mb-1">{certification.tireModelName}</div>
                      <div className="flex items-center text-sm text-muted-foreground gap-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        Due: {formatDate(certification.dueDate)}
                      </div>
                      <div className="text-sm text-muted-foreground">Assigned to: {assignedUser ? assignedUser.name : 'Unassigned'}</div>
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
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
