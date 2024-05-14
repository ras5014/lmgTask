import { useEffect, useState } from "react";
import { IconButton, Button, Input } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
const HOST = import.meta.env.VITE_HOST;
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const ToolBar = ({ lastSelectedItem, selectedItem }) => {
  const [val, setVal] = useState("");
  const [editVal, setEditVal] = useState(selectedItem);
  const [addSubCategory, setAddSubCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [createNewCategory, setCreateNewCategory] = useState(false);

  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries("getData");
  }, [createNewCategory, deleteCategory, editCategory, addSubCategory]);

  useEffect(() => {
    setEditVal(selectedItem);
  }, [selectedItem]);

  const handleCreateCategory = async () => {
    try {
      const response = await axios.post(`${HOST}/category/createCategory`, {
        label: val,
        children: [],
      });
      if (response.status === 200) {
        toast.success("Category Created Successfully", {
          duration: 4000,
        });
      } else {
        toast.error("Error Creating Category", {
          duration: 4000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error Creating Category", {
        duration: 4000,
      });
    }

    setCreateNewCategory(false);
    setVal("");
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${HOST}/category/deleteCategory`, {
        data: { id: lastSelectedItem },
      });
      if (response.status === 200) {
        toast.success("Category Deleted Successfully", {
          duration: 4000,
        });
      } else {
        toast.error("Error Deleting Category", {
          duration: 4000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error Deleting Category", {
        duration: 4000,
      });
    }

    setDeleteCategory((prevState) => !prevState);
  };

  const handleSubCategory = async () => {
    console.log("Adding Sub Category to Category with ID: ", lastSelectedItem);
    try {
      const response = await axios.post(`${HOST}/category/createSubCategory`, {
        id: lastSelectedItem,
        label: val,
      });
      if (response.status === 200) {
        toast.success("Sub Category Added Successfully", {
          duration: 4000,
        });
      } else {
        toast.error("Error Adding Sub Category", {
          duration: 4000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error Adding Sub Category", {
        duration: 4000,
      });
    }

    setAddSubCategory((prevState) => !prevState);
    setVal("");
  };

  const handleEditCategory = async () => {
    try {
      const response = await axios.put(`${HOST}/category/editCategory`, {
        id: lastSelectedItem,
        label: editVal,
      });
      if (response.status === 200) {
        toast.success("Category Edited Successfully", {
          duration: 4000,
        });
      } else {
        toast.error("Error Editing Category", {
          duration: 4000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error Editing Category", {
        duration: 4000,
      });
    }

    setEditCategory((prevState) => !prevState);
  };

  return (
    <div className="row">
      <IconButton
        aria-label="add"
        onClick={() => setAddSubCategory((prevState) => !prevState)}
      >
        <AddBoxIcon style={{ color: "#1565C0" }} />
      </IconButton>
      {addSubCategory && (
        <>
          <Input
            placeholder="Add Sub Category"
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
            }}
          />
          <Button variant="contained" size="small" onClick={handleSubCategory}>
            Add
          </Button>
        </>
      )}
      <IconButton
        aria-label="edit"
        onClick={() => setEditCategory((prevState) => !prevState)}
      >
        <EditIcon style={{ color: "#1565C0" }} />
      </IconButton>
      {editCategory && (
        <>
          <Input
            // placeholder="Edit Category"
            defaultValue={editVal}
            value={editVal}
            onChange={(e) => {
              setEditVal(e.target.value);
            }}
          />
          <Button variant="contained" size="small" onClick={handleEditCategory}>
            Update
          </Button>
        </>
      )}
      <IconButton aria-label="delete" onClick={handleDelete}>
        <DeleteIcon style={{ color: "red" }} />
      </IconButton>
      <Button
        variant="contained"
        size="small"
        onClick={() => setCreateNewCategory((prevState) => !prevState)}
      >
        Create New Category
      </Button>{" "}
      {createNewCategory && (
        <>
          <Input
            placeholder="Add New Category"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <Button
            variant="contained"
            size="small"
            onClick={handleCreateCategory}
          >
            Add
          </Button>
        </>
      )}
    </div>
  );
};

export default ToolBar;
