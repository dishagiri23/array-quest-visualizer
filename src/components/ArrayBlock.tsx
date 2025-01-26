import { motion } from "framer-motion";

interface ArrayBlockProps {
  value: number;
  index: number;
  isHighlighted?: boolean;
  isTarget?: boolean;
}

export const ArrayBlock = ({ value, index, isHighlighted, isTarget }: ArrayBlockProps) => {
  return (
    <motion.div
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        relative flex items-center justify-center
        w-16 h-16 rounded-lg glass-panel
        ${isHighlighted ? 'ring-2 ring-primary' : ''}
        ${isTarget ? 'bg-primary/20' : ''}
      `}
    >
      <span className="text-lg font-semibold">{value}</span>
      <span className="absolute -bottom-6 text-sm text-muted-foreground">
        {index}
      </span>
    </motion.div>
  );
};