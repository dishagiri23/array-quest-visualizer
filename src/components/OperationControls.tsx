import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  RotateCcw,
  Plus,
  Minus,
  Search,
  RefreshCw,
  ArrowUpDown,
  MoveRight
} from "lucide-react";

interface OperationControlsProps {
  onOperation: (operation: string) => void;
  onSpeedChange: (value: number) => void;
  speed: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onReset: () => void;
}

export const OperationControls = ({
  onOperation,
  onSpeedChange,
  speed,
  isPlaying,
  onPlayPause,
  onReset,
}: OperationControlsProps) => {
  return (
    <div className="flex flex-col gap-6 p-6 rounded-xl glass-panel animate-slide-up">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onOperation("insert")}
          className="flex gap-2"
        >
          <Plus size={16} /> Insert
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onOperation("delete")}
          className="flex gap-2"
        >
          <Minus size={16} /> Delete
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onOperation("traverse")}
          className="flex gap-2"
        >
          <MoveRight size={16} /> Traverse
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onOperation("search")}
          className="flex gap-2"
        >
          <Search size={16} /> Search
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onOperation("update")}
          className="flex gap-2"
        >
          <RefreshCw size={16} /> Update
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onOperation("sort")}
          className="flex gap-2"
        >
          <ArrowUpDown size={16} /> Sort
        </Button>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onPlayPause}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onReset}
          >
            <RotateCcw size={16} />
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Speed</span>
          <Slider
            value={[speed]}
            onValueChange={([value]) => onSpeedChange(value)}
            max={2000}
            min={100}
            step={100}
            className="w-[200px]"
          />
        </div>
      </div>
    </div>
  );
};