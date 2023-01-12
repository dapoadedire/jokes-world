import { useState } from "react";
import "normalize.css";
import "./App.css";
import ctl from "@netlify/classnames-template-literals";
import Jokes from "./Jokes";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import arrow up and arrow down


import {faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [activeIndex, setActiveIndex] = useState([]);
  const [jokesToShow, setJokesToShow] = useState(5);

  const handleShowMore = () => {
    setJokesToShow(jokesToShow + 5);
  }


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
        <h2 className={titleStyles}>Jokes World :)</h2>
        {
          Jokes.slice(0, jokesToShow).map((data, index) => (
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
          <button onClick={handleShowMore} className={showMoreStyles}>Show More</button>
        )}
      </div>
    </div>
  );
}

function Item({ question, children, active, onShow }) {
  return (
    <div className={containerChildStyles}>
      <div className={itemStyles}>
        <p className={questionStyles}>{question}</p>
        <button
          onClick={onShow}
          className={`${buttonStyles} ${
            active ? "bg-red-500" : "bg-green-500"
          }`}
        >
          <FontAwesomeIcon icon={active ? faAngleUp : faAngleDown} />
        </button>
        
      </div>

      <div>
        <p className={answerStyles}>{active && children}</p>
      </div>
    </div>
  );
}

const sectionStyles = ctl(`
  bg-gray-100
  p-4
  rounded
  border-2

  `);

const itemStyles = ctl(`
  flex
  justify-between
  items-center
  `);

const containerChildStyles = ctl(`
  bg-gray-100
  p-4
  rounded
  border-2
  mb-4
  `);

const accordionStyles = ctl(`
  bg-gray-100
  w-8/10
  md:w-2/3
  lg:w-2/3
  xl:w-3/5
  // mobile screen


  p-4
  rounded
  border-2
  mx-auto
  `);

const titleStyles = ctl(`
  text-3xl
  text-center
  mb-5
  text-green-700
  font-bold
  
  `);

const buttonStyles = ctl(`
  text-white
  px-4
  py-2
  rounded
  text-2xl
  ml-1
  my-0
  
  `);

const questionStyles = ctl(`
  text-base
  text-gray
  `);

const answerStyles = ctl(`
py-5
  text-base
  text-gray-700
  `);


const showMoreStyles = ctl(`
  bg-green-500
  text-white
  px-4
  py-2
  rounded

`);

export default App;
