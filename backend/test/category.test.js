const mongoose = require("mongoose");
const Category = require("../models/category.model");
const {
  deleteCategory,
  getData,
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
