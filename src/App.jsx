import { useState } from "react";
import "normalize.css";
import "./App.css";
import ctl from "@netlify/classnames-template-literals";
import Jokes from "./Jokes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [activeIndex, setActiveIndex] = useState([]);
  const [jokesToShow, setJokesToShow] = useState(5);
  
  const handleShowMore = () => {
    setJokesToShow(jokesToShow + 5);
  };

  const handleShow = (index) => {
    if (activeIndex.includes(index)) {
      setActiveIndex(activeIndex.filter((i) => i !== index));
    } else {
      setActiveIndex([...activeIndex, index]);
    }
  };

  return (
    <div className={sectionStyles}>
     
      <div className={accordionStyles}>
        <h2 className={titleStyles}>Jokes World :D</h2>
        {Jokes.slice(0, jokesToShow).map((data, index) => (
          <Item
            key={data.id}
            question={data.question}
            active={activeIndex.includes(index)}
            onShow={() => handleShow(index)}
          >
            {data.answer}
          </Item>
        ))}
        {Jokes.length > jokesToShow && (
          <button onClick={handleShowMore} className={showMoreStyles}>
            Show More
          </button>
        )}
      </div>
    </div>
  );
}

function Item({ question, children, active, onShow }) {
  // eslint-disable-next-line no-unused-vars
  const [parent, enableAnimations] = useAutoAnimate(
    { duration: 400 }
  )
  return (
    <div className={containerChildStyles} ref={parent}>
      <div className={itemStyles}>
        <p className={questionStyles}>{question}</p>
        
          <FontAwesomeIcon icon={active ? faAngleUp : faAngleDown} onClick={onShow}
            className={`${buttonStyles} ${active ? "bg-red-500" : "bg-green-500"
              }`} />
      
      </div>

      
      {active && <p className={answerStyles}>{children}</p>}
    </div>
  );
}

const sectionStyles = ctl(`
  my-10
  px-3
  `);

const itemStyles = ctl(`
  flex
  items-center
  justify-between
  `);

const containerChildStyles = ctl(`
  my-5
  rounded
  border-2
  border-gray-300
   bg-gray-100
  p-3
  `);

const accordionStyles = ctl(`
  mx-auto
  rounded
  border-2
  border-gray-300
  bg-gray-100
  p-4

  md:w-2/3
  lg:w-2/3
  xl:w-3/5
  2xl:w-3/5
  `);

const titleStyles = ctl(`
  mb-5
  text-center
  text-3xl
  font-bold
  text-green-700
  
  `);

const buttonStyles = ctl(`
  my-0
  ml-1
  cursor-pointer
  rounded
  px-4
  py-2
  text-2xl
  text-white
  
  `);

const questionStyles = ctl(`
  mb-0
  text-base
  font-semibold
  text-black
  `);

const answerStyles = ctl(`
py-5
  text-base
  text-gray-700
  `);

const showMoreStyles = ctl(`
  mt-3
  rounded
  bg-green-500
  px-4
  py-2
  text-white
  

`);

export default App;
