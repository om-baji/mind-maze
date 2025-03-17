import { ArrowUpDown, Filter, Table, Users } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card"
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table"

const ResultsPage = () => {
    const recentAttempts = [
      { id: 1, user: "Alex Johnson", quiz: "JavaScript Basics", score: "85%", time: "4m 32s", date: "Feb 15, 2025" },
      { id: 2, user: "Sarah Miller", quiz: "React Fundamentals", score: "92%", time: "6m 15s", date: "Feb 14, 2025" },
      { id: 3, user: "David Chen", quiz: "CSS Mastery", score: "78%", time: "5m 45s", date: "Feb 14, 2025" },
      { id: 4, user: "Emma Wilson", quiz: "JavaScript Basics", score: "65%", time: "7m 20s", date: "Feb 13, 2025" },
      { id: 5, user: "Michael Brown", quiz: "React Fundamentals", score: "88%", time: "5m 10s", date: "Feb 13, 2025" },
    ]
    
    return (
        <div>
            <Card>
                <CardHeader className="flex flex-row items-center">
                    <div>
                        <CardTitle>Recent Attempts</CardTitle>
                        <CardDescription>Latest quiz completions</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto gap-1">
                        <Filter className="h-3.5 w-3.5" />
                        Filter
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Quiz</TableHead>
                                <TableHead>
                                    <div className="flex items-center gap-1">
                                        Score
                                        <ArrowUpDown className="h-3.5 w-3.5" />
                                    </div>
                                </TableHead>
                                <TableHead>Time Taken</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentAttempts.map((attempt) => (
                                <TableRow key={attempt.id}>
                                    <TableCell>{attempt.user}</TableCell>
                                    <TableCell>{attempt.quiz}</TableCell>
                                    <TableCell>{attempt.score}</TableCell>
                                    <TableCell>{attempt.time}</TableCell>
                                    <TableCell>{attempt.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="flex justify-center border-t px-6 py-4">
                    <Button variant="outline" className="gap-1">
                        <Users className="h-3.5 w-3.5" />
                        View All Users
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ResultsPage
