import { motion } from "framer-motion";

const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-6">
            
            <motion.div
                className="relative mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            >
                
                <motion.div
                    className="absolute inset-0 w-32 h-32 bg-gray-100 rounded-full -z-10"
                    animate={{
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute inset-0 w-32 h-32 bg-gray-50 rounded-full -z-20"
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                    }}
                />

                
                <motion.div
                    className="w-32 h-32 flex items-center justify-center"
                    animate={{
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <Icon className="w-16 h-16 text-gray-400" strokeWidth={1.5} />
                </motion.div>
            </motion.div>

            
            <motion.div
                className="text-center max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 mb-6">{description}</p>

                {actionLabel && onAction && (
                    <motion.button
                        onClick={onAction}
                        className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {actionLabel}
                    </motion.button>
                )}
            </motion.div>
        </div>
    );
};

export default EmptyState;
