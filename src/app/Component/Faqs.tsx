'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import FaqsBackground from '../assets/HeroBg.jpg'; // Adjust the path based on your actual file location

const Container = styled.div`
  margin: 0 auto;
  padding: 50px;
  max-width: 800px;
`;
const AccordionBackgroundImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
`; 
const FAQHeading = styled.h2`
  text-align: center;
  margin-bottom: 40px;
  font-size: 32px;
  color: #333;
`;

const AccordionItem = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AccordionTitle = styled.div<{ isOpen: boolean }>`
  padding: 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: #333;
  background-color: ${props => (props.isOpen ? '#e5e5e5' : '#f9f9f9')};
`;

const AccordionContent = styled.div<{ isOpen: boolean }>`
  max-height: ${props => (props.isOpen ? '200px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding: ${props => (props.isOpen ? '20px' : '0 20px')};
  font-size: 16px;
  color: #555;
  background-color: #fff;
`;

const PlusMinusIcon = styled.span<{ isOpen: boolean }>`
  font-size: 24px;
  transition: transform 0.3s ease;
  transform: rotate(${props => (props.isOpen ? '45deg' : '0')});
`;

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container>
        <AccordionBackgroundImage src={FaqsBackground} alt="FAQs Background" layout="fill" />
      <FAQHeading>FAQs</FAQHeading>
      <AccordionItem>
        <AccordionTitle isOpen={openIndex === 0} onClick={() => toggleAccordion(0)}>
          What is SnipLink URL Shortener and how does it work?
          <PlusMinusIcon isOpen={openIndex === 0}>+</PlusMinusIcon>
        </AccordionTitle>
        <AccordionContent isOpen={openIndex === 0}>
          SnipLink URL Shortener is a tool that allows you to create short, easy-to-share links from long URLs. Simply enter the long URL, and SnipLink generates a shorter version that redirects to the original link when clicked.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTitle isOpen={openIndex === 1} onClick={() => toggleAccordion(1)}>
          What is a QR code and what can it do?
          <PlusMinusIcon isOpen={openIndex === 1}>+</PlusMinusIcon>
        </AccordionTitle>
        <AccordionContent isOpen={openIndex === 1}>
          A QR code is a type of barcode that can be scanned using a smartphone or QR code reader to quickly access information, such as a website URL, contact details, or product information.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTitle isOpen={openIndex === 2} onClick={() => toggleAccordion(2)}>
          Are the shortened links permanent? Will they expire?
          <PlusMinusIcon isOpen={openIndex === 2}>+</PlusMinusIcon>
        </AccordionTitle>
        <AccordionContent isOpen={openIndex === 2}>
          Shortened links are typically permanent unless the URL shortener service has a policy for link expiration or deletion. Most services offer persistent links, but some may have expiration dates or limitations based on account settings or subscription plans. Always check the specific terms and conditions of the URL shortener you use.
        </AccordionContent>
      </AccordionItem>
    </Container>
  );
};

export default Accordion;
// // Container for the accordion
// const AccordionContainer = styled.section`
//   position: relative;
//   padding: 50px 20px;
//   color: #fff;
//   text-align: center;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// // Background image styling for the accordion


// // Content container styling for the accordion
// const AccordionContent = styled.div`
//   max-width: 800px;
//   margin: 0 auto;
// `;

// // Individual accordion item styling
// const AccordionItem = styled.div`
//   margin-bottom: 10px;
//   border-bottom: 1px solid #ddd;
// `;

// // Title styling for each accordion item
// const AccordionTitle = styled.h3`
//   cursor: pointer;
//   padding: 10px;
//   background-color: #b9cccc;
//   color: #fff;
//   margin: 0;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// // Text styling for each accordion item, controlled by the `isOpen` prop
// const AccordionText = styled.p<{ isOpen: boolean }>`
//   padding: 10px;
//   background-color: #444;
//   color: #fff;
//   margin: 0;
//   display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
// `;

// // Heading styling for the FAQ section
// const FAQsHeading = styled.h2`
//   font-size: 36px;
//   margin-bottom: 20px;
// `;

// // Accordion component definition
// const Accordion: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);

//   // Function to toggle accordion item based on index
//   const toggleAccordion = (index: number) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <AccordionContainer>
//       <AccordionBackgroundImage
//         src={FaqsBackground}
//         alt="FAQs Background"
//         layout="fill"
//       />
//       <AccordionContent>
//         <FAQsHeading>FAQs</FAQsHeading>
//         <AccordionItem>
//           <AccordionTitle onClick={() => toggleAccordion(0)}>
//             What is SnipLink URL Shortener and how does it work?
//           </AccordionTitle>
//           <AccordionText isOpen={activeIndex === 0}>
//             SnipLink is a URL shortening service that converts long URLs into
//             short, manageable links. Users paste a long URL into the input
//             field, and SnipLink generates a shorter URL that redirects to the
//             original page.
//           </AccordionText>
//         </AccordionItem>
//         <AccordionItem>
//           <AccordionTitle onClick={() => toggleAccordion(1)}>
//             What is a QR code and what can it do?
//           </AccordionTitle>
//           <AccordionText isOpen={activeIndex === 1}>
//             A QR code is a type of barcode that can store various types of data,
//             such as URLs, contact information, or text. When scanned with a QR
//             code reader, it quickly directs users to the encoded information or
//             webpage.
//           </AccordionText>
//         </AccordionItem>
//         <AccordionItem>
//           <AccordionTitle onClick={() => toggleAccordion(2)}>
//             Are the shortened links permanent? Will they expire?
//           </AccordionTitle>
//           <AccordionText isOpen={activeIndex === 2}>
//             SnipLink shortened links are permanent and do not expire. Users can
//             rely on these links to remain active and accessible as long as the
//             service is operational.
//           </AccordionText>
//         </AccordionItem>
//       </AccordionContent>
//     </AccordionContainer>
//   );
// };

// export default Accordion;
