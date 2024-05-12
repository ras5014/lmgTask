import { useState } from "react";
import { IconButton, Button, Input } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ToolBar = () => {
  const [val, setVal] = useState("");
  const [addSubCategory, setAddSubCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [createNewCategory, setCreateNewCategory] = useState(false);
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
          <Input placeholder="Add Sub Category" />
          <Button variant="contained" size="small">
            Add
          </Button>
        </>
      )}
      <IconButton aria-label="edit">
        <EditIcon style={{ color: "#1565C0" }} />
      </IconButton>
      <IconButton aria-label="delete">
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
          <Input placeholder="Add New Category" />
          <Button
            variant="contained"
            size="small"
            // onClick={handleCreateCategory}
          >
            Add
          </Button>
        </>
      )}
    </div>
  );
};

export default ToolBar;
