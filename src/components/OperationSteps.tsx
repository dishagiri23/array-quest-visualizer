import { motion } from "framer-motion";

interface OperationStepsProps {
  steps: string[];
  currentStep: number;
}

export const OperationSteps = ({ steps, currentStep }: OperationStepsProps) => {
  return (
    <div className="space-y-2 p-6 rounded-xl glass-panel animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">Operation Steps</h3>
      <div className="space-y-2">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`
              p-3 rounded-lg
              ${currentStep === index ? 'bg-primary/20 text-primary' : 'bg-secondary'}
            `}
          >
            {step}
          </motion.div>
        ))}
      </div>
    </div>
  );
};