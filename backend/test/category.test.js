const mongoose = require("mongoose");
const Category = require("../models/category.model");
const {
  deleteCategory,
  getData,
  createCategory,
  createSubCategory,
} = require("../controllers/category.controller");

jest.mock("../models/category.model");

// Delete category
// Tests Done
// When the category is found and deleted successfully.
// When the category is not found.
// When an error occurs during the deletion process.

describe("deleteCategory", () => {
  it("should delete a category successfully", async () => {
    const mockCategory = {
      _id: new mongoose.Types.ObjectId(),
      deleteOne: jest.fn(),
    };
    Category.findById.mockResolvedValue(mockCategory);

    const req = { body: { id: mockCategory._id } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await deleteCategory(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Category deleted successfully",
    });
  });

  it("should return 404 when category is not found", async () => {
    Category.findById.mockResolvedValue(null);

    const req = { body: { id: new mongoose.Types.ObjectId() } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await deleteCategory(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Category not found" });
  });

  it("should return 500 when an error occurs during deletion", async () => {
    const error = new Error("Error");
    Category.findById.mockRejectedValue(error);

    const req = { body: { id: new mongoose.Types.ObjectId() } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await deleteCategory(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: error.message });
  });
});

// Get data
// Tests Done
// When the data is found and returned successfully.
// When the data is not found.
// When an error occurs during the retrieval process.
describe("getData", () => {
  it("should retrieve data successfully", async () => {
    const mockData = [
      { _id: new mongoose.Types.ObjectId(), label: "Test", children: [] },
    ];
    Category.find.mockResolvedValue(mockData);

    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getData(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it("should return 404 when data is not found", async () => {
    Category.find.mockResolvedValue([]);

    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getData(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "No categories found" });
  });

  it("should return 500 when an error occurs during retrieval", async () => {
    const error = new Error("Error");
    Category.find.mockRejectedValue(error);

    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getData(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: error.message });
  });
});

describe("createCategory", () => {
  it("should create a category successfully", async () => {
    const mockCategory = {
      _id: new mongoose.Types.ObjectId(),
      label: "Test",
      children: [],
    };

    const req = { body: { label: "Test", children: [] } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await createCategory(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should return 500 when an error occurs during creation", async () => {
    const error = new Error("Error");
    Category.mockImplementation(() => {
      throw error;
    });

    const req = { body: { label: "Test" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await createCategory(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: error.message });
  });
});

describe("createSubCategory", () => {
  it("should create a subcategory successfully", async () => {
    const mockCategory = {
      _id: new mongoose.Types.ObjectId(),
      label: "Test",
      children: [],
      save: jest.fn(),
    };
    const mockParentCategory = {
      _id: new mongoose.Types.ObjectId(),
      label: "Parent",
      children: [],
      save: jest.fn(),
    };
    Category.mockReturnValueOnce(mockCategory);
    Category.findById = jest.fn().mockResolvedValueOnce(mockParentCategory);

    const req = { body: { id: mockParentCategory._id, label: "Test" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await createSubCategory(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockParentCategory);
  });

  it("should return 404 when the parent category is not found", async () => {
    const req = { body: { id: new mongoose.Types.ObjectId(), label: "Test" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await createSubCategory(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: expect.any(String),
    });
  });

  it("should return 500 when an error occurs during creation", async () => {
    const error = new Error("Error");
    Category.mockImplementation(() => {
      throw error;
    });

    const req = { body: { id: new mongoose.Types.ObjectId(), label: "Test" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await createSubCategory(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: error.message });
  });
});
