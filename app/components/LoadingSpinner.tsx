"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function LoadingSpinner() {
  return (
    <motion.div
      className="flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
    </motion.div>
  )
}
