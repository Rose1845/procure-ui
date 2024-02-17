import Accordion from "./Accordion";
import { accordionType } from "../../types/index.js";
import { accordions } from "../../data/accordion.js";

type Props = {
  title: string;
};

const FAQs = ({ title }: Props) => {
  return (
    <section className="flex justify-center items-center">
      <div className="drop-shadow-xl rounded-2xl bg-white w-full">
        <div className="text-black  text-5xl flex items-center">
          <span className="px-6"></span>
          {title}
        </div>
        <div className="px-10">
          {accordions.map((accordion: accordionType, index: number) => {
            const { titles, details } = accordion;
            return <Accordion key={index} titles={titles} details={details} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
