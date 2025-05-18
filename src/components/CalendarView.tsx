import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { certifications, formatDate, getDaysLeft, users } from "../utils/mockData";
import { DateFormatter } from "react-day-picker";
import { CheckCircle2, AlertCircle, AlertTriangle, Clock, Calendar as CalendarIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function CalendarView() {
  const [month, setMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Create a map of dates with certifications
  const certificationDates = certifications.reduce<Record<string, typeof certifications>>((acc, cert) => {
    const dateStr = cert.dueDate.toDateString();
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(cert);
    return acc;
  }, {});
  
  // Custom render function for calendar days
  const renderDay: DateFormatter = (date) => {
    const dateStr = date.toDateString();
    const dayCertifications = certificationDates[dateStr] || [];
    const hasCertifications = dayCertifications.length > 0;
    
    return (
      <div className="flex flex-col items-center">
        <div>{date.getDate()}</div>
        {hasCertifications && (
          <div className="mt-1 flex justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-xs">
                    <div className="font-semibold mb-1">{formatDate(date)}</div>
                    <ul className="space-y-1">
                      {dayCertifications.map((cert) => (
                        <li key={cert.id}>{cert.description}</li>
                      ))}
                    </ul>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Certification Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <Calendar
              mode="single"
              month={month}
              onMonthChange={setMonth}
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border mx-auto"
              formatters={{ formatDay: renderDay }}
            />
          </div>
          <div className="md:w-1/2">
            <div className="rounded-md border p-4 h-full">
              <h3 className="font-semibold mb-4">Certifications for {formatDate(selectedDate)}</h3>
              <div className="space-y-6">
                {certifications
                  .filter(cert => cert.dueDate.toDateString() === selectedDate.toDateString())
                  .map((certification, idx) => {
                    const daysOverdue = getDaysLeft(certification.dueDate);
                    const assignedUser = users.find(u => u.id === certification.assignedTo);
                    const isOverdue = daysOverdue < 0;
                    const overdueDays = Math.abs(daysOverdue);
                    
                    return (
                      <div key={certification.id} className={idx !== 0 ? 'pt-6 border-t' : ''}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
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
                            <div>
                              <div className="font-semibold text-base text-black">{certification.description}</div>
                              <div className="text-sm text-muted-foreground mb-1">{certification.tireModelName}</div>
                              <div className="flex items-center text-sm text-muted-foreground gap-2">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                Due: {formatDate(certification.dueDate)}
                              </div>
                              <div className="text-sm text-muted-foreground">Assigned to: {assignedUser ? assignedUser.name : 'Unassigned'}</div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                <Badge variant="outline">{certification.region}</Badge>
                                <Badge variant="outline">{certification.certificationBody}</Badge>
                                {certification.standards.map((standard, index) => (
                                  <Badge key={index} variant="secondary">
                                    {standard}
                                  </Badge>
                                ))}
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
                          </div>
                          <div className="flex flex-col items-end gap-2 min-w-[120px]">
                            <span className={`text-xs px-2 py-1 rounded-md font-medium ${certification.priority === 'high' ? 'bg-red-100 text-red-700' : certification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                              {certification.priority.charAt(0).toUpperCase() + certification.priority.slice(1)}
                            </span>
                            {isOverdue && (
                              <span className="text-xs text-red-600 font-medium">Overdue by {overdueDays} days</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {certifications.filter(cert => cert.dueDate.toDateString() === selectedDate.toDateString()).length === 0 && (
                  <p className="text-sm text-muted-foreground">No certifications due on {formatDate(selectedDate)}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
