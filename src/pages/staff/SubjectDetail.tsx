import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { staffSubjects, assignments, submissions } from "@/data/mock";
import {
  ArrowLeft, Plus, Play, Clock, FileCode, Upload, Users,
  CheckCircle, Timer, Square
} from "lucide-react";

const SubjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const subject = staffSubjects.find((s) => s.id === id);
  const subjectAssignments = assignments.filter((a) => a.subjectId === id);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    name: "",
    allowedType: ".cpp",
    timeLimit: "120",
  });

  if (!subject) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container flex items-center gap-4 h-16 px-6">
          <Button variant="ghost" size="icon" onClick={() => navigate("/staff/dashboard")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold">{subject.name}</h1>
              <span className="font-mono text-xs px-2 py-0.5 bg-secondary rounded">
                {subject.code}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {subject.studentCount} students enrolled
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold">Assignments</h2>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Create Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Assignment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Assignment Name</Label>
                  <Input
                    placeholder="e.g. Linked List Implementation"
                    value={newAssignment.name}
                    onChange={(e) =>
                      setNewAssignment({ ...newAssignment, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Upload Sample File</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-foreground/30 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Drop your sample file here
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      .cpp, .py files only
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Allowed File Types</Label>
                    <Select
                      value={newAssignment.allowedType}
                      onValueChange={(v) =>
                        setNewAssignment({ ...newAssignment, allowedType: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value=".cpp">.cpp</SelectItem>
                        <SelectItem value=".py">.py</SelectItem>
                        <SelectItem value=".cpp,.py">.cpp & .py</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Time Limit</Label>
                    <Select
                      value={newAssignment.timeLimit}
                      onValueChange={(v) =>
                        setNewAssignment({ ...newAssignment, timeLimit: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="180">3 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  className="w-full gap-2"
                  onClick={() => setDialogOpen(false)}
                >
                  <Play className="w-4 h-4" />
                  Create & Start Lab
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {subjectAssignments.map((assignment) => (
            <Card key={assignment.id} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{assignment.name}</h3>
                      {assignment.isActive ? (
                        <Badge className="bg-primary text-primary-foreground gap-1 text-xs">
                          <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full animate-pulse-dot" />
                          LIVE
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          Inactive
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                      <span className="flex items-center gap-1">
                        <FileCode className="w-3.5 h-3.5" />
                        {assignment.sampleFileName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {assignment.timeLimitMinutes} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {assignment.submissionCount}/{assignment.totalStudents} submitted
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {assignment.isActive ? (
                      <Button variant="outline" size="sm" className="gap-1 text-destructive border-destructive/30 hover:bg-destructive/10">
                        <Square className="w-3.5 h-3.5" />
                        End Lab
                      </Button>
                    ) : (
                      <Button size="sm" className="gap-1">
                        <Play className="w-3.5 h-3.5" />
                        Start Lab
                      </Button>
                    )}
                  </div>
                </div>

                {/* Submissions for active assignment */}
                {assignment.isActive && (
                  <div className="mt-6 border-t border-border pt-4">
                    <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Submissions ({submissions.length})
                    </h4>
                    <div className="space-y-2">
                      {submissions.map((sub) => (
                        <div
                          key={sub.id}
                          className="flex items-center justify-between py-2 px-3 bg-secondary/50 rounded-md"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground font-medium">
                              {sub.studentName.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{sub.studentName}</p>
                              <p className="text-xs text-muted-foreground font-mono">
                                {sub.fileName}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Timer className="w-3 h-3" />
                            {new Date(sub.submittedAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {subjectAssignments.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <FileCode className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-sm">No assignments yet</p>
              <p className="text-xs mt-1">Create your first assignment to get started</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SubjectDetail;
