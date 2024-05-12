import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import axios from "axios";
const HOST = import.meta.env.VITE_HOST;
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ToolBar from "./ToolBar";

import Typography from "@mui/material/Typography";

function convertData(inputData) {
  const dataMap = inputData.reduce((acc, item) => {
    acc[item._id] = { id: item._id, label: item.label, children: [] };
    return acc;
  }, {});

  const childIds = new Set(inputData.flatMap((item) => item.children));

  inputData.forEach((item) => {
    item.children.forEach((childId) => {
      if (dataMap[childId]) {
        dataMap[item._id].children.push(dataMap[childId]);
      }
    });
  });

  // return Object.values(dataMap);

  return Object.values(dataMap).filter((item) => !childIds.has(item.id));
}

export default function TrackItemSelectionToggle() {
  const [lastSelectedItem, setLastSelectedItem] = useState(null);
  // const [data1, setData1] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${HOST}/category/getData`);
  //       const formattedData = convertData(response.data);
  //       setData(formattedData);
  //       console.log("Formatted data: ", formattedData);
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // React-Query to fetch Data
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["getData"],
    queryFn: async () => {
      const response = await axios.get(`${HOST}/category/getData`);
      return convertData(response.data);
    },
  });

  const handleItemSelectionToggle = (event, itemId, isSelected) => {
    if (isSelected) {
      setLastSelectedItem(itemId);
    }
  };

  return (
    <>
      {isLoading && <Typography>Loading...</Typography>}
      {data && (
        <div>
          <ToolBar lastSelectedItem={lastSelectedItem} />
          <Stack spacing={2}>
            <Box sx={{ minHeight: 200, minWidth: 300, flexGrow: 1 }}>
              <RichTreeView
                items={data ? data : []}
                onItemSelectionToggle={handleItemSelectionToggle}
              />
            </Box>
          </Stack>
        </div>
      )}
    </>
  );
}
