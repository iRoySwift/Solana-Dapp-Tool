import { motion } from "framer-motion";
import React from "react";

interface Props {
    children: React.ReactNode;
}
const AnimateButton: React.FC<Props> = props => {
    const { children } = props;
    return (
        <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
            {children}
        </motion.div>
    );
};
export default AnimateButton;
