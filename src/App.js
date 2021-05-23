import { Button } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { FaSyncAlt } from "react-icons/fa";
import "./App.css";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  ChakraProvider,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

const userID = "83062323229";
const URL =
  "https://www.solvebigtech.com/bordoy/service/index.php?funcname=status&enterprise=bordoy&identity=83062323229&apikey=bcURfJhHPCNBT4i7ANhVKQDw62e32W";

function App() {
  const [data, setData] = useState(false);
  const [idCard, setIdCard] = useState("");

  const fetchData = () => {
    fetch(
      `https://www.solvebigtech.com/bordoy/service/index.php?funcname=status&enterprise=bordoy&identity=${idCard}&apikey=bcURfJhHPCNBT4i7ANhVKQDw62e32W`
    )
      .then((response) => response.json())
      .then((jsonData) => {
        // jsonData is parsed json object received from url
        setData(jsonData);
      })
      .catch((error) => {
        // handle your errors here
        console.error(error);
      });
  };

  let elements = [];
  if (data) {
    for (let index = 0; index < data[idCard]?.length; index++) {
      elements.push(data[idCard][index]);
    }
  }

  return (
    <ChakraProvider>
      <Box className='App' w={"50%"} margin='auto'>
        <Text fontSize='2xl' fontWeight='bold'>
          Bordoy Group Tracking Numbers
        </Text>
        <Flex>
          <Input
            placeholder='Enter your ID card'
            onChange={(e) => setIdCard(e.target.value)}
          />
          <Button onClick={fetchData} leftIcon={<FaSyncAlt />}>
            Refresh
          </Button>
        </Flex>
        <Accordion py={8}>
          {elements.map((parcel, index) => {
            return (
              <AccordionItem key={index}>
                <Text color={parcel.depdate ? "green" : null} fontWeight='bold'>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      {parcel.hbl}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </Text>
                <AccordionPanel pb={4}>
                  <Box>Status: {parcel.status}</Box>
                  <Box>Bill: {parcel.noorder}</Box>
                  <Box>
                    Departure Date:{" "}
                    {parcel.depdate
                      ? parcel.depdate
                      : "No departed date yet for this item!"}
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Box>
    </ChakraProvider>
  );
}

export default App;
