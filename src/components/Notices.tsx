"use client"

import { PiWarningCircle } from "react-icons/pi"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useEffect } from "react"
import { useNotices } from "@/store/notices"
import { useShiftData } from "@/store/shift-data"

const Notices = () => {
  const { getNotices, isNotices, notices } = useNotices()
  const { user } = useShiftData()

  const fetchData = async () => {
    try {
      await getNotices(user?._id as string)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (isNotices)
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-yellow-600 flex flex-col items-start w-full gap-2 p-4 rounded-2xl overflow-hidden"
      >
        <div className="flex items-center gap-2 w-full">
          <h1 className="text-black font-medium text-lg">Avisos</h1>
          <PiWarningCircle className="w-6 h-6 text-black" />
        </div>
        <ul className="flex flex-col items-start gap-2">
          {notices?.map((notice) => {
            return (
              <li key={notice._id} className="text-black text-sm">
                {notice.title}
              </li>
            )
          })}
        </ul>
      </motion.section>
    )
  else return <></>
}

export default Notices
