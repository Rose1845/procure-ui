import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
interface IconProps {
  id: number;
  open: number;
}
import { faqs } from "../../data/accordion";
function Icon({ id, open }:IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

function FAQS() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: React.SetStateAction<number>) => setOpen(open === value ? 0 : value);

  return (
    <section id="faqs" className="max-w-7xl mx-auto">
      <h1 className="text-center text-3xl font-black m-4">Frequently Asked Questions(FAQS)</h1>
      {
        faqs.map((faq,i)=>(
          <Accordion key={1} placeholder={""} open={open === i} icon={<Icon id={1} open={open} />}>
            <AccordionHeader placeholder={
              ""
            } onClick={() => handleOpen(i)}>{faq.question}</AccordionHeader>
            <AccordionBody>
              {faq.answer}
            </AccordionBody>
          </Accordion>
        ))
      }
    </section>
  );
}
export default FAQS;