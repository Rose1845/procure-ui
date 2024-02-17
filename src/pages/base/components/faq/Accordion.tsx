import { motion } from "framer-motion";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

type Props = {
  titles: string;
  details: string;
};

const Accordion = ({ titles, details }: Props) => {
  const [show, setShow] = React.useState<boolean>(false);
  return (
    <div className="py-4">
      <details className="group outline-none">
        <summary className="flex justify-between items-center font-medium cursor-pointer text-black">
          <span>{titles}</span>
          <span className="transition  content-iconPlus">
            {show ? <FaPlus/> : <FaPlus />}
          </span>
        </summary>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.4 }}
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0 },
          }}
          className="mt-3 group-open:animate-fadeIn text-black  text-sm"
        >
          {details}
        </motion.p>
      </details>
    </div>
  );
};

export default Accordion;
