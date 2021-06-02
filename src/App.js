import { Button } from "@chakra-ui/button";
import { Flex, Stack, Text } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { FaSyncAlt } from "react-icons/fa";
import "./App.css";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  ChakraProvider,
  Input,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useRef, useState, useEffect, useCallback } from "react";
import AccordionFormatter from "./AccordionFormatter";
import TableFormatter from "./TableFormatter";

const ContentDisplay = ({ view, elements }) => {
  switch (view) {
    case "accordion":
      return <AccordionFormatter elements={elements} />;
    case "table":
      return <TableFormatter elements={elements} />;
    default:
      return <Alert>List not implemented yet!</Alert>;
  }
};

function App() {
  const [data, setData] = useState(false);
  const [idCard, setIdCard] = useState("");
  const [status, setStatus] = useState("No data, please update!");
  const [view, setView] = useState("table");
  const [lastUpdate, setLastUpdate] = useState(false);
  const cardInput = useRef(null);

  const fetchData = useCallback(() => {
    setData(false);
    idCard === undefined || idCard === null
      ? setIdCard("")
      : setIdCard(cardInput.current.value);
    if (idCard.length !== 11) {
      setStatus("Incorrect ID card, must have 11 digits!");
    } else {
      setStatus("Fetching data...");
      fetch(
        `https://www.solvebigtech.com/bordoy/service/index.php?funcname=status&enterprise=bordoy&identity=${idCard}&apikey=bcURfJhHPCNBT4i7ANhVKQDw62e32W`
      )
        .then((response) => response.json())
        .then((jsonData) => {
          if (jsonData[idCard].length) {
            setStatus("Data received!");
            setData(jsonData);
            setLastUpdate(new Date());
          } else {
            setStatus("No data received for that ID, please check!");
            setData(false);
          }
        })
        .catch((error) => {
          // handle your errors here
          console.error(error);
        });
    }
  }, [idCard]);

  useEffect(() => {
    const interval = setInterval(fetchData, 300_000);
    return () => {
      clearInterval(interval);
    };
  }, [fetchData]);

  const queryData = (key, value) => {
    if (key === "Enter") {
      setIdCard(value);
      fetchData();
    }
  };

  let elements = [];
  if (data) {
    for (let index = 0; index < data[idCard]?.length; index++) {
      elements.push(data[idCard][index]);
    }
  }

  return (
    <ChakraProvider>
      <Box className='App' w={{ base: "100%", md: "50%" }} m='auto' p={5}>
        <Text fontSize='2xl' fontWeight='bold' mb={5}>
          Bordoy Group Tracking Numbers
        </Text>
        <Flex flexWrap={{ base: "wrap", md: "nowrap" }}>
          <Input
            placeholder='Enter your ID card'
            onChange={(e) => setIdCard(e.target.value)}
            onKeyPress={(e) => queryData(e.key, e.target.value)}
            mr={5}
            ref={cardInput}
          />
          <Button
            onClick={fetchData}
            leftIcon={<FaSyncAlt />}
            marginTop={{ base: 3, md: 0 }}
          >
            Refresh
          </Button>
        </Flex>
        {data && status !== "Fetching data..." ? (
          <>
            <RadioGroup onChange={setView} value={view} my={3}>
              <Stack direction='row'>
                <Radio value='accordion'>Accordion</Radio>
                <Radio value='table'>Table</Radio>
                <Radio value='list'>List</Radio>
              </Stack>
            </RadioGroup>
            {lastUpdate ? (
              <Alert mb={5} status='success' variant='left-accent'>
                <AlertIcon />
                <AlertTitle>
                  Last update: {lastUpdate.toLocaleTimeString()}
                </AlertTitle>
              </Alert>
            ) : null}
            <ContentDisplay view={view} elements={elements} />
          </>
        ) : (
          <Alert mt={5}>
            <AlertTitle>{status}</AlertTitle>
          </Alert>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
