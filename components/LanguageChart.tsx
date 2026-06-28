"use client";

import { GitHubRepo } from "@/types/github";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#7c3aed", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];

export default function LanguageChart({ repos }: { repos: GitHubRepo[] }) {
  const languageCounts = repos.reduce((acc: Record<string, number>, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {});

  const totalLanguages = Object.values(languageCounts).reduce((a, b) => a + b, 0);

  const data = Object.entries(languageCounts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: ((count / totalLanguages) * 100).toFixed(1),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  if (data.length === 0) {
    return <div className="text-gray-500 py-8 text-center">No language data</div>;
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 20 }}>
          <XAxis type="number" hide />
          <YAxis
            dataKey="name"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 14 }}
            width={100}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
            contentStyle={{
              backgroundColor: "#0d1117",
              borderColor: "#30363d",
              borderRadius: "8px",
              color: "#fff",
            }}
            formatter={(value: any, name: string, props: any) => [
              `${props.payload.percentage}%`,
              "Usage",
            ]}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
