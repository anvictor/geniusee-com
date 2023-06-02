import React, { useEffect, useState } from "react";
import { ReactComponent as ListIcon } from "../assets/svg/list.svg";
import { ReactComponent as HeadingSquare } from "../assets/svg/heading-square.svg";
import { ReactComponent as ParagraphSquare } from "../assets/svg/paragraph-square.svg";
import { ReactComponent as List1Icon } from "../assets/svg/list-1.svg";
import { ReactComponent as Lightbulb } from "../assets/svg/lightbulb-02.svg";
import { ReactComponent as InfoCircle } from "../assets/svg/info-circle.svg";
import { ReactComponent as Mail } from "../assets/svg/mail-02.svg";
import { ReactComponent as Menu } from "../assets/svg/menu-05.svg";
import { ReactComponent as ChevronDown } from "../assets/svg/chevron-down.svg";
import { ReactComponent as ZapFast } from "../assets/svg/zap-fast.svg";
import { ReactComponent as HelpIcon } from "../assets/svg/help-icon.svg";

import { ReactComponent as ListMultiParagraphSquareIcon } from "../assets/svg/multi-paragraph-square.svg";
import ComposeLogo from "../assets/svg/ComposeLogo.png";

interface ListOption {
  text: string;
  iconUri: JSX.Element;
}

const listOptions: ListOption[] = [
  { text: "outline for a", iconUri: <ListIcon /> },
  { text: "bullet list of", iconUri: <List1Icon /> },
  { text: "headline for a", iconUri: <HeadingSquare /> },
  { text: "paragraph about", iconUri: <ParagraphSquare /> },
  {
    text: "couple paragraphs about",
    iconUri: <ListMultiParagraphSquareIcon />,
  },
  { text: "sentence about", iconUri: <Menu /> },
  { text: "few ideas for", iconUri: <Lightbulb /> },
  { text: "bit of information about", iconUri: <InfoCircle /> },
  { text: "email to", iconUri: <Mail /> },
];

export interface InlineTextProps {
  /**
   * DOM Id of the element
   */
  id?: string;
}

export const InlineText: React.FC<InlineTextProps> = ({ id }) => {
  const ImmortalPrefix = "Write a";
  const [searchTerm, setSearchTerm] = useState(ImmortalPrefix);

  const [isOpen, setIsOpen] = useState(true);
  const filteredOptions = listOptions.filter(
    (option) =>
      option.text.toLowerCase().indexOf(searchTerm.slice(9).toLowerCase()) > -1
  );
  const isVowel = (letter: string) => {
    return ["a", "e", "i", "o", "u"].includes(letter.toLowerCase());
  };

  const handleInput = (e: any) => {
    e.target.style.height = "1px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleOptionClick = (e: any) => {
    const firstLetter = e.target.innerText[0]
    let isN = ' ';
    if (isVowel(firstLetter)) {
      isN = 'n ';
    }
    setSearchTerm(`${ImmortalPrefix}${isN}${e.target.innerText}`);
console.log(firstLetter);
    setIsOpen(false);
  };

  useEffect(() => {
    const textarea = document.getElementById("textarea&dynamicalID");
    if (textarea) {
      textarea.addEventListener("input", handleInput);
    }
    return () => {
      if (textarea) {
        textarea.removeEventListener("input", handleInput);
      }
    };
  }, []);
  useEffect(() => {
    if (searchTerm.length < 8) {
      setSearchTerm(ImmortalPrefix);
      setIsOpen(true)
    }
  }, [searchTerm]);

  return (
    <div id={id} className="inlineTextPlace">
      <div className="promptPlaceholder">
        <img className="imgComposeLogo" src={ComposeLogo} alt="ComposeLogo" />
        <textarea
          id="textarea&dynamicalID"
          className="promptInput"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <HelpIcon />
      </div>
      {isOpen && (
        <ul className="optionsDrop">
          {filteredOptions.map((option, index) => (
            <li
              key={option.text}
              onClick={handleOptionClick}
              className="option"
            >
              {option.iconUri}
              <span>{option.text}</span> {"..."}
            </li>
          ))}
        </ul>
      )}
      {!isOpen && (
        <div className="ProTipPlace">
          <button className="ProTipButton">Pro Tip</button>
          <p className="tip">Make sure to be specific in your prompt. The more detail you give, the better the results will be!</p>
          <p className="hitLine">Hit <button className="enterButton">enter</button> to submit your prompt</p>
        </div>
      )}
      <div className="advancedOptions">
        <ZapFast />
        <span>Advanced Options</span>
        <ChevronDown />
      </div>
    </div>
  );
};
