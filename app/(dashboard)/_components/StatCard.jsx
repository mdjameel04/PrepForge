import { ReactNode } from "react";



const StatCard = ({ label, value, desc, icon }) => {
  return (
    <div className="flex flex-col gap-3 p-5 rounded-xl border border-border bg-muted/20 hover:border-orange-500/30 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">
          {label}
        </span>
        <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div>
        <div className="text-3xl font-bold text-orange-500">{value}</div>
        <div className="text-xs text-muted-foreground mt-1">{desc}</div>
      </div>
    </div>
  );
};

export default StatCard;