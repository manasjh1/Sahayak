
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, BookOpen, Users, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RegistrationPage = () => {
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [useCase, setUseCase] = useState<string>("");
  const [gradeLevel, setGradeLevel] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // const useCases = [
  //   "General Purpose",
  //   "Grade IV",
  //   "Grade V",
  //   "Grade VI",
  //   "Grade VII",
  //   "Grade VIII",
  //   "Grade IX",
  //   "Grade X",
  //   "Grade XI",
  //   "Grade XII"
  // ];

  const gradeLevels = [
    
    "Grade 7",
    
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!role || !name || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (role === "Student" && !gradeLevel) {
      toast({
        title: "Error",
        description: "Please select your grade level",
        variant: "destructive"
      });
      return;
    }

    // Store user data in localStorage for demo purposes
    localStorage.setItem('userData', JSON.stringify({
      role,
      name,
      email,
      useCase,
      gradeLevel: role === "Student" ? gradeLevel : null
    }));

    toast({
      title: "Registration Successful!",
      description: `Welcome to Sahayak, ${name}!`
    });

    // Navigate to appropriate dashboard
    if (role === "Teacher") {
      navigate("/teacher-dashboard");
    } else {
      // For now, redirect to teacher dashboard as student dashboard is not implemented yet
      navigate("/teacher-dashboard");
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Sahayak</h1>
          <p className="text-muted-foreground">Your AI-powered education assistant</p>
        </div>

        <Card className="shadow-xl border-0 animate-fade-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Join Sahayak</CardTitle>
            <CardDescription className="text-center">
              Create your account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">I am a:</Label>
                <RadioGroup value={role} onValueChange={setRole} className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Student" id="student" />
                    <Label htmlFor="student" className="flex items-center space-x-2 cursor-pointer">
                      <BookOpen className="h-4 w-4" />
                      <span>Student</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Teacher" id="teacher" />
                    <Label htmlFor="teacher" className="flex items-center space-x-2 cursor-pointer">
                      <Users className="h-4 w-4" />
                      <span>Teacher</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* /<div className="space-y-2">
                <Label htmlFor="useCase">Use Case</Label>
                <Select value={useCase} onValueChange={setUseCase}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your use case" />
                  </SelectTrigger>
                  <SelectContent>
                    {useCases.map((useCase) => (
                      <SelectItem key={useCase} value={useCase}>
                        {useCase}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}

              {role === "Student" && (
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade Level</Label>
                  <Select value={gradeLevel} onValueChange={setGradeLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your grade level" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradeLevels.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Button type="submit" className="w-full">
                <Sparkles className="h-4 w-4 mr-2" />
                Create Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationPage;
