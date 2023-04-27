import { motion } from 'framer-motion';

export const authButtonAnimations = ({ children, type }) => {
	switch (type) {
		default:
			return (
				<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
					{children}
				</motion.div>
			);
	}
};