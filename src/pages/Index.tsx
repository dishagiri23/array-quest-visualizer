import { useState, useEffect } from "react";
import { ArrayBlock } from "@/components/ArrayBlock";
import { OperationControls } from "@/components/OperationControls";
import { OperationSteps } from "@/components/OperationSteps";
import { toast } from "sonner";
import { AnimatePresence } from "framer-motion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";

const Index = () => {
  const [array, setArray] = useState<number[]>([1, 5, 3, 8, 4]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const [currentOperation, setCurrentOperation] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);

  const operationSteps = {
    insert: [
      "First, we find where to insert the new item",
      "Then, we make space by shifting items to the right",
      "Finally, we insert the new item at the chosen position"
    ],
    delete: [
      "First, we find which item to delete",
      "Then, we remove that item",
      "Finally, we shift remaining items to fill the gap"
    ],
    traverse: [
      "We start at the beginning of the array",
      "We visit each item one by one",
      "We can perform an action on each item we visit"
    ],
    search: [
      "We start looking from the beginning",
      "We check each item one by one",
      "We stop when we find what we're looking for"
    ],
    update: [
      "First, we find which item to update",
      "Then, we replace it with the new value",
      "The update is now complete!"
    ],
    sort: [
      "We look at two items side by side",
      "We compare them to see which is bigger",
      "We swap them if they're in the wrong order",
      "We repeat until everything is in order"
    ]
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleOperation = async (operation: string) => {
    setCurrentOperation(operation);
    setCurrentStep(0);
    setIsPlaying(true);
    
    switch (operation) {
      case "insert":
        await insertAnimation();
        break;
      case "delete":
        await deleteAnimation();
        break;
      case "traverse":
        await traverseAnimation();
        break;
      case "search":
        await searchAnimation();
        break;
      case "update":
        await updateAnimation();
        break;
      case "sort":
        await sortAnimation();
        break;
    }
  };

  const insertAnimation = async () => {
    const newValue = Math.floor(Math.random() * 10);
    const position = Math.floor(Math.random() * (array.length + 1));
    
    setTargetIndex(position);
    toast.info(`Inserting ${newValue} at position ${position}`);
    await sleep(speed);
    setCurrentStep(1);
    
    const newArray = [...array];
    newArray.splice(position, 0, newValue);
    setArray(newArray);
    await sleep(speed);
    
    setCurrentStep(2);
    setTargetIndex(null);
    toast.success("Insertion completed!");
  };

  const deleteAnimation = async () => {
    const position = Math.floor(Math.random() * array.length);
    
    setTargetIndex(position);
    toast.info(`Deleting item at position ${position}`);
    await sleep(speed);
    setCurrentStep(1);
    
    const newArray = [...array];
    newArray.splice(position, 1);
    setArray(newArray);
    await sleep(speed);
    
    setCurrentStep(2);
    setTargetIndex(null);
    toast.success("Deletion completed!");
  };

  const traverseAnimation = async () => {
    toast.info("Starting array traversal");
    for (let i = 0; i < array.length; i++) {
      setHighlightedIndex(i);
      await sleep(speed / 2);
    }
    setHighlightedIndex(null);
    toast.success("Traversal completed!");
  };

  const searchAnimation = async () => {
    const target = array[Math.floor(Math.random() * array.length)];
    toast.info(`Searching for value: ${target}`);
    
    for (let i = 0; i < array.length; i++) {
      setHighlightedIndex(i);
      await sleep(speed / 2);
      
      if (array[i] === target) {
        setTargetIndex(i);
        toast.success(`Found ${target} at index ${i}!`);
        await sleep(speed);
        setTargetIndex(null);
        break;
      }
    }
    setHighlightedIndex(null);
  };

  const updateAnimation = async () => {
    const position = Math.floor(Math.random() * array.length);
    const newValue = Math.floor(Math.random() * 10);
    
    setTargetIndex(position);
    toast.info(`Updating position ${position} to ${newValue}`);
    await sleep(speed);
    setCurrentStep(1);
    
    const newArray = [...array];
    newArray[position] = newValue;
    setArray(newArray);
    await sleep(speed);
    
    setCurrentStep(2);
    setTargetIndex(null);
    toast.success("Update completed!");
  };

  const sortAnimation = async () => {
    const newArray = [...array];
    
    for (let i = 0; i < newArray.length - 1; i++) {
      for (let j = 0; j < newArray.length - i - 1; j++) {
        setHighlightedIndex(j);
        setTargetIndex(j + 1);
        await sleep(speed / 2);
        
        if (newArray[j] > newArray[j + 1]) {
          const temp = newArray[j];
          newArray[j] = newArray[j + 1];
          newArray[j + 1] = temp;
          setArray([...newArray]);
        }
      }
    }
    
    setHighlightedIndex(null);
    setTargetIndex(null);
    toast.success("Sorting completed!");
  };

  const handleReset = () => {
    setArray([1, 5, 3, 8, 4]);
    setHighlightedIndex(null);
    setTargetIndex(null);
    setCurrentOperation(null);
    setCurrentStep(0);
    setIsPlaying(false);
    toast.info("Reset completed!");
  };

  return (
    <div className="min-h-screen p-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold animate-fade-in">
            Array Operations Visualizer
          </h1>
          <p className="text-muted-foreground">
            Learn how array operations work through interactive visualizations
          </p>
          <HoverCard>
            <HoverCardTrigger asChild>
              <button className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <Info size={16} /> How to use
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">Getting Started</h4>
                <p className="text-sm text-muted-foreground">
                  1. Choose an operation from the buttons below
                  2. Watch the visualization step by step
                  3. Adjust the speed using the slider
                  4. Reset anytime to start over
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        
        <div className="flex justify-center py-16">
          <div className="flex gap-4">
            <AnimatePresence>
              {array.map((value, index) => (
                <ArrayBlock
                  key={`${index}-${value}`}
                  value={value}
                  index={index}
                  isHighlighted={index === highlightedIndex}
                  isTarget={index === targetIndex}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <OperationControls
            onOperation={handleOperation}
            onSpeedChange={setSpeed}
            speed={speed}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onReset={handleReset}
          />
          
          {currentOperation && (
            <OperationSteps
              steps={operationSteps[currentOperation as keyof typeof operationSteps]}
              currentStep={currentStep}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;