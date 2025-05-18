
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { users, certifications } from "../utils/mockData";

export function TaskAssignment() {
  const [date, setDate] = useState<Date>();
  const [selectedCertification, setSelectedCertification] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const { toast } = useToast();

  const handleTaskAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCertification || !selectedUser || !date) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Task Assigned",
      description: "The obligation has been successfully assigned.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assign Task</CardTitle>
        <CardDescription>Create a new obligation and assign it to a team member</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleTaskAssignment} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="certification">Certification</Label>
            <Select value={selectedCertification} onValueChange={setSelectedCertification}>
              <SelectTrigger id="certification">
                <SelectValue placeholder="Select certification" />
              </SelectTrigger>
              <SelectContent>
                {certifications.map((certification) => (
                  <SelectItem key={certification.id} value={certification.id}>
                    {certification.tireModelName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Obligation Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the obligation or task"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="payment">Payment</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                  <SelectItem value="reporting">Reporting</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="renewal">Renewal</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label>Assign To</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user.id)}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-md cursor-pointer border-2 transition-all",
                    selectedUser === user.id
                      ? "border-primary bg-primary/5"
                      : "border-transparent hover:border-muted"
                  )}
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="mt-2 text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.department}</span>
                </div>
              ))}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleTaskAssignment}>Assign Task</Button>
      </CardFooter>
    </Card>
  );
}
