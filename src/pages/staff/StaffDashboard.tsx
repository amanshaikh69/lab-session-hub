import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { staffSubjects } from "@/data/mock";
import { BookOpen, Users, LogOut, Plus } from "lucide-react";

const StaffDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight">LabFlow</h1>
              <p className="text-xs text-muted-foreground">Staff Portal</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">My Subjects</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Select a subject to manage assignments
            </p>
          </div>
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            New Subject
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staffSubjects.map((subject) => (
            <Card
              key={subject.id}
              className="border-border hover:border-foreground/20 transition-colors cursor-pointer group"
              onClick={() => navigate(`/staff/subject/${subject.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded">
                    {subject.code}
                  </span>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-3.5 h-3.5" />
                    <span className="text-xs">{subject.studentCount}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                  {subject.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-2">
                  Click to manage assignments →
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
