import { describe, expect, it } from "vitest";
import {
  getCategoryRouteParams,
  getCollectionRouteParams,
  getProductRouteParams,
  getSubcategoryRouteParams
} from "./catalog-routes";

describe("catalog route params", () => {
  it("creates one route for each main category", () => {
    expect(getCategoryRouteParams()).toHaveLength(6);
    expect(getCategoryRouteParams()).toContainEqual({ category: "homemade-semi-finished" });
  });

  it("creates nested routes only for declared subcategories", () => {
    const params = getSubcategoryRouteParams();
    expect(params).toContainEqual({ category: "homemade-semi-finished", subcategory: "semi-manti" });
    expect(params).not.toContainEqual({ category: "meat", subcategory: "semi-manti" });
  });

  it("keeps product URLs nested and collection URLs separate", () => {
    expect(getProductRouteParams()).toEqual([]);
    expect(getCollectionRouteParams()).toEqual([
      { collection: "soup" },
      { collection: "frying" },
      { collection: "stewing" },
      { collection: "grill" },
      { collection: "quick-dinner" },
      { collection: "national-dishes" }
    ]);
  });
});
