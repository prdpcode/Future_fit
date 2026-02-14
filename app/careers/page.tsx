import { ArrowRight } from "lucide-react";

const POSITIONS = [
    { title: "Senior AI Engineer", department: "Engineering", location: "Remote" },
    { title: "Product Designer", department: "Design", location: "San Francisco" },
    { title: "Growth Marketing Manager", department: "Marketing", location: "New York" },
];

export default function CareersPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">JOIN THE FUTURE</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    We're building the next generation of fashion technology.
                    Help us bridge the gap between AI and apparel.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
                {POSITIONS.map((job) => (
                    <div key={job.title} className="flex items-center justify-between p-6 border border-border rounded-lg hover:border-foreground transition-colors group cursor-pointer">
                        <div>
                            <h3 className="text-xl font-bold group-hover:underline">{job.title}</h3>
                            <p className="text-muted-foreground">{job.department} • {job.location}</p>
                        </div>
                        <ArrowRight className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                    </div>
                ))}
            </div>
        </div>
    );
}
