"use client"

import { Calendar, ChevronDown, Download } from "lucide-react"
import { useState } from "react"
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const quizzes = [
    { id: 1, name: "JavaScript Basics" },
    { id: 2, name: "React Fundamentals" },
    { id: 3, name: "CSS Mastery" },
]

const scoreDistribution = [
    { score: "0-20%", count: 5, fill: "#f87171" },
    { score: "21-40%", count: 12, fill: "#fb923c" },
    { score: "41-60%", count: 25, fill: "#facc15" },
    { score: "61-80%", count: 30, fill: "#a3e635" },
    { score: "81-100%", count: 18, fill: "#4ade80" },
]

const timePerformance = [
    { date: "Jan 1", avgScore: 65 },
    { date: "Jan 8", avgScore: 68 },
    { date: "Jan 15", avgScore: 72 },
    { date: "Jan 22", avgScore: 75 },
    { date: "Jan 29", avgScore: 71 },
    { date: "Feb 5", avgScore: 78 },
    { date: "Feb 12", avgScore: 82 },
]

export default function QuizAnalytics() {
    const [selectedQuiz, setSelectedQuiz] = useState(quizzes[0])
    const [dateRange, setDateRange] = useState("Last 7 days")

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col">
                <div className="ml-auto flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <Calendar className="h-4 w-4" />
                                {dateRange}
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setDateRange("Today")}>Today</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setDateRange("Last 7 days")}>Last 7 days</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setDateRange("Last 30 days")}>Last 30 days</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setDateRange("Last 90 days")}>Last 90 days</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                </div>
                <main className="flex-1 p-6 space-y-6">
                    <div className="flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="gap-2">
                                    {selectedQuiz.name}
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {quizzes.map((quiz) => (
                                    <DropdownMenuItem key={quiz.id} onClick={() => setSelectedQuiz(quiz)}>
                                        {quiz.name}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div className="text-sm text-muted-foreground">
                            Showing analytics for <span className="font-medium text-foreground">{selectedQuiz.name}</span>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Average Score</CardTitle>
                                <CardDescription>Across all attempts</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">76%</div>
                                <p className="text-xs text-muted-foreground">
                                    <span className="text-emerald-500">↑ 5%</span> from previous period
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Total Attempts</CardTitle>
                                <CardDescription>Number of quiz completions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">142</div>
                                <p className="text-xs text-muted-foreground">
                                    <span className="text-emerald-500">↑ 12%</span> from previous period
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Average Time</CardTitle>
                                <CardDescription>Time to complete quiz</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">5m 24s</div>
                                <p className="text-xs text-muted-foreground">
                                    <span className="text-rose-500">↑ 18s</span> from previous period
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <Tabs defaultValue="overview">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="users">User Performance</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Score Distribution</CardTitle>
                                        <CardDescription>Breakdown of scores by percentage range</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-80">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={scoreDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="score" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                                        {scoreDistribution.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                                        ))}
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Performance Over Time</CardTitle>
                                        <CardDescription>Average score trends</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-80">
                                            <ChartContainer
                                                config={{
                                                    avgScore: {
                                                        label: "Average Score",
                                                        color: "hsl(var(--chart-1))",
                                                    },
                                                }}
                                            >
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart data={timePerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="date" />
                                                        <YAxis domain={[0, 100]} />
                                                        <ChartTooltip content={<ChartTooltipContent />} />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="avgScore"
                                                            stroke="var(--color-avgScore)"
                                                            strokeWidth={2}
                                                            dot={{ r: 4 }}
                                                            activeDot={{ r: 6 }}
                                                        />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </ChartContainer>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>


                        </TabsContent>

                        <TabsContent value="users" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Top Performers</CardTitle>
                                    <CardDescription>Users with highest average scores</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>User</TableHead>
                                                <TableHead>Attempts</TableHead>
                                                <TableHead>Avg. Score</TableHead>
                                                <TableHead>Avg. Time</TableHead>
                                                <TableHead>Last Attempt</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="font-medium">Sarah Miller</TableCell>
                                                <TableCell>8</TableCell>
                                                <TableCell>92%</TableCell>
                                                <TableCell>4m 45s</TableCell>
                                                <TableCell>Feb 14, 2025</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Michael Brown</TableCell>
                                                <TableCell>6</TableCell>
                                                <TableCell>88%</TableCell>
                                                <TableCell>5m 10s</TableCell>
                                                <TableCell>Feb 13, 2025</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Alex Johnson</TableCell>
                                                <TableCell>12</TableCell>
                                                <TableCell>85%</TableCell>
                                                <TableCell>4m 32s</TableCell>
                                                <TableCell>Feb 15, 2025</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                            <div className="grid gap-6 md:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>User Engagement</CardTitle>
                                        <CardDescription>Quiz attempts by time of day</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-80">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart
                                                    data={[
                                                        { time: "Morning", attempts: 45 },
                                                        { time: "Afternoon", attempts: 67 },
                                                        { time: "Evening", attempts: 30 },
                                                    ]}
                                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="time" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Bar dataKey="attempts" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Completion Rate</CardTitle>
                                        <CardDescription>Percentage of users who complete the quiz</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-80 flex items-center justify-center">
                                            <ResponsiveContainer width="80%" height="80%">
                                                <PieChart>
                                                    <Pie
                                                        data={[
                                                            { name: "Completed", value: 85, fill: "hsl(var(--primary))" },
                                                            { name: "Abandoned", value: 15, fill: "hsl(var(--muted))" },
                                                        ]}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={60}
                                                        outerRadius={80}
                                                        paddingAngle={5}
                                                        dataKey="value"
                                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                    />
                                                    <Tooltip />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    )
}

