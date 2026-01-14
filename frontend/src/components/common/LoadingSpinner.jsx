import { motion } from "framer-motion";

const LoadingSpinner = ({ size = "md", text }) => {
    const sizes = {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16"
    };

    return (
        <div className="flex flex-col items-center justify-center py-12">
            
            <div className="relative">
                
                <motion.div
                    className={`${sizes[size]} border-4 border-gray-200 rounded-full`}
                />

                
                <motion.div
                    className={`absolute inset-0 ${sizes[size]} border-4 border-gray-900 border-t-transparent rounded-full`}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <div className="w-2 h-2 bg-gray-900 rounded-full" />
                </motion.div>
            </div>

            
            {text && (
                <motion.p
                    className="mt-4 text-gray-600 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {text}
                </motion.p>
            )}
        </div>
    );
};

export default LoadingSpinner;
